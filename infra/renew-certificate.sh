#!/usr/bin/env bash

# запускать регулярно через cron, например каждый день в 03:00
# 0 3 * * * bash /путь/к/проекту/infra/renew-certificate.sh >> /var/log/notes-certbot.log 2>&1

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")"/.. && pwd)"
source "$PROJECT_ROOT/deploy/config.sh"
source "$PROJECT_ROOT/deploy/functions.sh"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Сертификат выпущен с методом standalone, поэтому порт 80 на время проверки
# должен быть свободен.
log "Stopping Nginx for Let's Encrypt renewal"
docker compose "${SERVER_COMPOSE_FILES[@]}" stop nginx

log "Renewing certificates"
docker compose "${SERVER_COMPOSE_FILES[@]}" run --rm --service-ports certbot renew

log "Starting Nginx"
docker compose "${SERVER_COMPOSE_FILES[@]}" up -d nginx
