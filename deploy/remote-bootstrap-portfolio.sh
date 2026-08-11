#!/usr/bin/env bash
set -euo pipefail

DOMAIN="paleturquoise-hedgehog-868163.hostingersite.com"
ROOT="/home/u358087675/domains/${DOMAIN}/public_html"
APP_URL="https://${DOMAIN}"
REPO="https://github.com/Adhammansouri/portfolio.git"

cd "$ROOT"
rm -f default.php

if [ ! -d .git ]; then
  git clone "$REPO" .
else
  git fetch origin main
  git reset --hard origin/main
fi

if [ ! -f .env ]; then
  cp .hostinger.env.example .env
  sed -i "s|APP_URL=.*|APP_URL=${APP_URL}|" .env
fi

mkdir -p bootstrap/cache storage/framework/{cache,sessions,views} storage/logs database
chmod +x deploy/*.sh 2>/dev/null || true

bash deploy/hostinger-first-boot.sh

echo "==> Live: ${APP_URL}/en"
