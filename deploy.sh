#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
FRONT_DIR="$PROJECT_ROOT/front-vue3"
INFRA_DIR="$PROJECT_ROOT/infra"
DIST_DIR="$FRONT_DIR/dist"
BRANCH="master"
NODE_IMAGE="node:23-alpine"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

fail() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
  exit 1
}

on_error() {
  local exit_code=$?
  local line_number=$1
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: command failed with exit code ${exit_code} at line ${line_number}" >&2
  exit "$exit_code"
}

trap 'on_error $LINENO' ERR

[[ -d "$PROJECT_ROOT" ]] || fail "Project root not found: $PROJECT_ROOT"
[[ -d "$FRONT_DIR" ]] || fail "Frontend directory not found: $FRONT_DIR"
[[ -d "$INFRA_DIR" ]] || fail "Infra directory not found: $INFRA_DIR"
[[ -f "$INFRA_DIR/docker-compose.yml" ]] || fail "docker-compose.yml not found in: $INFRA_DIR"
[[ -f "$INFRA_DIR/docker-compose.server.yml" ]] || fail "docker-compose.server.yml not found in: $INFRA_DIR"

command -v git >/dev/null 2>&1 || fail "git is not installed"
command -v docker >/dev/null 2>&1 || fail "docker is not installed"

log "Project root: $PROJECT_ROOT"
log "Frontend dir: $FRONT_DIR"
log "Infra dir: $INFRA_DIR"
log "Target branch: $BRANCH"
log "Node image: $NODE_IMAGE"

cd "$PROJECT_ROOT"

log "Fetching latest changes"
git fetch origin

log "Checking out branch: $BRANCH"
git checkout "$BRANCH"

log "Pulling latest code from origin/$BRANCH"
git pull origin "$BRANCH"

cd "$FRONT_DIR"

log "Removing old dist directory"
rm -rf "$DIST_DIR"

log "Installing dependencies and building frontend in Docker"
docker run --rm \
  -v "$FRONT_DIR:/app" \
  -w /app \
  "$NODE_IMAGE" \
  sh -c "npm ci && npm run build"

[[ -d "$DIST_DIR" ]] || fail "Build finished, but dist directory was not created: $DIST_DIR"
[[ -f "$DIST_DIR/index.html" ]] || fail "Build finished, but index.html was not found in dist: $DIST_DIR/index.html"

log "Frontend build completed successfully"

cd "$INFRA_DIR"

log "Starting docker compose services"
docker compose -f docker-compose.yml -f docker-compose.server.yml up -d

log "Deploy completed successfully"
log "Dist directory: $DIST_DIR"