#!/usr/bin/env bash
# One-time: cron safety net so composer/migrate run after hPanel Git auto-deploy.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MARKER="${HOME}/.portfolio-deploy-head"
mkdir -p "${HOME}/logs"
git rev-parse HEAD > "$MARKER"

CRON_LINE="*/3 * * * * flock -n /tmp/portfolio-deploy.lock -c 'cd ${ROOT} && bash deploy/hostinger-cron.sh >> ${HOME}/logs/portfolio-cron-deploy.log 2>&1'"

( crontab -l 2>/dev/null | grep -v 'portfolio-deploy.lock' || true
  echo "$CRON_LINE"
) | crontab -

echo "Cron installed (every 3 min). Marker: $MARKER"
crontab -l | grep portfolio-deploy || true
