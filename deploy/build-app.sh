build_app() {
  echo "#### build_app ..."

  cd "$PROJECT_ROOT"

    log "Fetching latest changes"
    git fetch origin

    log "Checking out branch: $BRANCH"
    git checkout "$BRANCH"

    log "Pulling latest code from origin/$BRANCH"
    git pull origin "$BRANCH"

  cd "$FRONT_DIR"

  echo "Removing old dist directory"
  rm -rf "$DIST_DIR"

  log "Installing dependencies and building frontend in Docker"
  # идея: всегда ли ci (npm ci && npm run build) ?
  # как сделать: если передали флаг при запуске ./deploy, то с ci
  docker run --rm \
    -v "$FRONT_DIR:/app" \
    -w /app \
    "$NODE_IMAGE" \
    sh -c "npm run build && chown -R $(id -u):$(id -g) /app/dist"

  [[ -d "$DIST_DIR" ]] || fail "Build finished, but dist directory was not created: $DIST_DIR"
  [[ -f "$DIST_DIR/index.html" ]] || fail "Build finished, but index.html was not found in dist: $DIST_DIR/index.html"

  echo "#### build_app [OK]"
  echo ""
}