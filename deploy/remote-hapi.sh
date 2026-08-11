#!/usr/bin/env bash
set -euo pipefail
TOKEN="$(tr -d '\r\n' < "$HOME/.api_token")"
BASE="https://developers.hostinger.com/api"

hapi() {
  curl -sS -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" "$@"
}

echo "==> Websites"
hapi "${BASE}/hosting/v1/websites"
echo ""
echo "==> Orders"
hapi "${BASE}/billing/v1/orders" 2>/dev/null || true
