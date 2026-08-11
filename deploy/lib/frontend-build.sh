#!/usr/bin/env bash
# Shared frontend build helpers for local hooks and Hostinger deploy.
set -euo pipefail

frontend_root() {
  if [ -n "${FRONTEND_ROOT:-}" ]; then
    echo "$FRONTEND_ROOT"
    return 0
  fi

  local script_dir
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  echo "$(cd "$script_dir/../.." && pwd)"
}

frontend_prepare_path() {
  export PATH="/opt/alt/alt-nodejs22/root/usr/bin:/opt/alt/alt-nodejs20/root/usr/bin:${PATH:-}"
}

frontend_assets_ok() {
  local root
  root="$(frontend_root)"
  cd "$root"

  if [ ! -f public/build/manifest.json ]; then
    return 1
  fi

  php -r '
    $manifest = json_decode(file_get_contents("public/build/manifest.json"), true);
    if (!is_array($manifest)) {
        exit(1);
    }

    $entry = $manifest["resources/js/app.tsx"] ?? null;
    if (!is_array($entry) || empty($entry["file"])) {
        exit(1);
    }

    $files = [$entry["file"]];
    foreach ($entry["css"] ?? [] as $css) {
        $files[] = $css;
    }

    foreach ($files as $file) {
        if (!is_file("public/build/" . $file)) {
            exit(1);
        }
    }

    exit(0);
  ' >/dev/null 2>&1
}

frontend_build_production() {
  local root
  root="$(frontend_root)"
  cd "$root"

  frontend_prepare_path

  if ! command -v npm >/dev/null 2>&1; then
    echo "ERROR: npm not found."
    return 1
  fi

  echo "    npm ci"
  npm ci --legacy-peer-deps
  echo "    npm run build"
  npm run build

  if frontend_assets_ok; then
    echo "    public/build OK"
    return 0
  fi

  echo "ERROR: Frontend build finished but public/build assets are incomplete."
  return 1
}

frontend_ensure_production() {
  local mode="${1:-verify}"

  if [ "$mode" = "always" ] || ! frontend_assets_ok; then
    frontend_build_production
    return $?
  fi

  echo "    public/build assets OK"
}
