#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
source "$PROJECT_ROOT/deploy/config.sh"
source "$PROJECT_ROOT/deploy/functions.sh"
source "$PROJECT_ROOT/deploy/check-infra.sh"
source "$PROJECT_ROOT/deploy/build-app.sh"
source "$PROJECT_ROOT/deploy/add-cert.sh"

trap 'on_error $LINENO' ERR

check_infra
build_app
add_cert

log "Starting docker compose services"
docker compose "${COMPOSE_FILES[@]}" up -d

log "Deploy completed successfully"
log "Dist directory: $DIST_DIR"