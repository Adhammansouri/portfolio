#!/usr/bin/env bash
# First deploy on a NEW empty site (production only).
#   bash deploy/hostinger-first-boot.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ ! -f .env ]; then
  if [ -f .hostinger.env.example ]; then
    cp .hostinger.env.example .env
    echo "Created .env from .hostinger.env.example — edit APP_URL and run: php artisan key:generate"
  else
    echo "ERROR: .env missing."
    exit 1
  fi
fi

APP_ENV="$(grep -E '^APP_ENV=' .env | head -1 | cut -d= -f2- | sed $'s/\r//g;s/^["\']//;s/["\']$//' | xargs || true)"
if [ "${APP_ENV:-local}" != "production" ]; then
  echo "WARN: Set APP_ENV=production in .env before going live."
fi

echo "==> Deploy (composer + migrate)"
bash deploy/hostinger.sh

if ! grep -qE '^APP_KEY=base64:' .env 2>/dev/null; then
  echo "==> Generate APP_KEY"
  php artisan key:generate --force
fi

echo "==> Seed portfolio content"
php artisan db:seed --class=Database\\Seeders\\PortfolioSeeder --force

echo "==> Done. Open APP_URL/en in your browser."
