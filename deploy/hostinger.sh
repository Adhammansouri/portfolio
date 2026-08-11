#!/usr/bin/env bash
# Adham Mansour Portfolio — Hostinger post-deploy (run from public_html / project root)
#
#   ssh hostinger-smash
#   cd ~/domains/YOUR-DOMAIN.hostingersite.com/public_html
#   bash deploy/hostinger.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

hostinger_php() {
  for bin in /opt/alt/php84/usr/bin/php /opt/alt/php83/usr/bin/php /opt/alt/php82/usr/bin/php; do
    if [ -x "$bin" ]; then
      echo "$bin"
      return 0
    fi
  done
  command -v php
}

PHP_BIN="$(hostinger_php)"
echo "==> PHP: $($PHP_BIN -v | head -1)"

if ! "$PHP_BIN" -r 'exit(version_compare(PHP_VERSION, "8.2.0", ">=") ? 0 : 1);'; then
  echo "ERROR: PHP 8.2+ required. hPanel → Advanced → PHP Configuration → 8.2 or 8.3."
  exit 1
fi

php() { "$PHP_BIN" -d memory_limit=-1 "$@"; }

composer_cmd() {
  if command -v composer2 >/dev/null 2>&1; then
    "$PHP_BIN" -d memory_limit=-1 "$(command -v composer2)" "$@"
  elif [ -x /usr/local/bin/composer2 ]; then
    "$PHP_BIN" -d memory_limit=-1 /usr/local/bin/composer2 "$@"
  elif command -v composer >/dev/null 2>&1; then
    "$PHP_BIN" -d memory_limit=-1 "$(command -v composer)" "$@"
  else
    echo "ERROR: composer not found."
    exit 1
  fi
}

if [ ! -f .env ]; then
  echo "ERROR: .env missing. Copy .hostinger.env.example to .env and set APP_URL + APP_KEY."
  exit 1
fi

echo "==> Clear bootstrap cache"
find bootstrap/cache -maxdepth 1 -type f -name '*.php' -delete 2>/dev/null || true

echo "==> Composer (production)"
export COMPOSER_MEMORY_LIMIT=-1
composer_cmd install --no-dev --optimize-autoloader --no-interaction --no-scripts

find bootstrap/cache -maxdepth 1 -type f -name '*.php' -delete 2>/dev/null || true

echo "==> Package discovery"
php artisan package:discover --ansi

echo "==> Config clear"
php artisan config:clear

DB_CONNECTION="$(grep -E '^DB_CONNECTION=' .env | cut -d= -f2- | tr -d "\"'" | tr -d '\r' || true)"
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
  mkdir -p database
  touch database/database.sqlite
  chmod 664 database/database.sqlite 2>/dev/null || true
fi

echo "==> Migrations"
php artisan migrate --force

echo "==> Storage link"
php artisan storage:link 2>/dev/null || ln -sfn "${ROOT}/storage/app/public" "${ROOT}/public/storage" 2>/dev/null || true

echo "==> Web entry (Document Root = public_html)"
if [ ! -f index.php ] || [ ! -f .htaccess ]; then
  echo "ERROR: index.php or .htaccess missing at repo root. git pull main."
  exit 1
fi

echo "==> Frontend build"
# shellcheck source=lib/frontend-build.sh
source "${ROOT}/deploy/lib/frontend-build.sh"
FRONTEND_ROOT="$ROOT"
frontend_ensure_production verify

echo "==> Permissions"
chmod -R ug+rwx storage bootstrap/cache 2>/dev/null || true

echo "==> Cache"
php artisan route:clear
php artisan view:clear

echo "==> Done. Verify:"
echo "    APP_ENV=production APP_DEBUG=false"
echo "    APP_URL matches your HTTPS domain"
php artisan about --only=environment 2>/dev/null || true
