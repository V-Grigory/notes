#!/usr/bin/env bash

# запускать регулярно через cron, например каждый день в 03:00
# 0 3 * * * bash /путь/к/проекту/infra/renew-certificate.sh >> /var/log/notes-certbot.log 2>&1

set -Eeuo pipefail

DOMAIN="grigoryvolchok.ru"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILES=(-f docker-compose.yml -f docker-compose.server.yml)

log() {
  echo "========= [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

command -v docker >/dev/null 2>&1 || {
  echo "ERROR: docker is not installed" >&2
  exit 1
}

cd "$SCRIPT_DIR"

# Сертификат выпущен с методом standalone, поэтому порт 80 на время проверки
# должен быть свободен.
log "Stopping Nginx for Let's Encrypt renewal"
docker compose "${COMPOSE_FILES[@]}" stop nginx

log "Renewing certificates"
docker compose "${COMPOSE_FILES[@]}" run --rm --service-ports certbot renew

log "Starting Nginx"
docker compose "${COMPOSE_FILES[@]}" up -d nginx
