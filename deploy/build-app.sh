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

  log "Removing old dist directory"
  rm -rf "$DIST_DIR"

  if [[ "${1:-}" == "with-ci" ]]; then
    log "Building with npm ci and npm run build"
    BUILD_COMMAND="npm ci && npm run build && chown -R $(id -u):$(id -g) /app/dist"
  else
    log "Building with npm run build only"
    BUILD_COMMAND="npm run build && chown -R $(id -u):$(id -g) /app/dist"
  fi

  docker run --rm \
    -v "$FRONT_DIR:/app" \
    -w /app \
    "$NODE_IMAGE" \
    sh -c "$BUILD_COMMAND"

  [[ -d "$DIST_DIR" ]] || fail "Build finished, but dist directory was not created: $DIST_DIR"
  [[ -f "$DIST_DIR/index.html" ]] || fail "Build finished, but index.html was not found in dist: $DIST_DIR/index.html"

  echo "#### build_app [OK]"
  echo ""
}