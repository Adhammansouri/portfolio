#!/usr/bin/env bash
# Safety net: run hostinger.sh when git HEAD changes (e.g. after hPanel auto-deploy pull).
# Install via: bash deploy/install-hostinger-cron.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MARKER="${HOME}/.portfolio-deploy-head"
HEAD="$(git rev-parse HEAD 2>/dev/null || true)"
PREV="$(cat "$MARKER" 2>/dev/null || true)"

if [ -z "$HEAD" ] || [ "$HEAD" = "$PREV" ]; then
  exit 0
fi

echo "[$(date -Iseconds)] New commit detected ($PREV -> $HEAD), running hostinger.sh"
bash deploy/hostinger.sh
echo "$HEAD" > "$MARKER"
