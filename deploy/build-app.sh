build_app() {
  echo "############################## BUILD_APP ..."

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

  CHOWN_DIST="chown -R $(id -u):$(id -g) /app/dist"
  CHOWN_MODULES="chown -R $(id -u):$(id -g) /app/node_modules"

  BUILD_COMMAND="npm run build && $CHOWN_DIST && $CHOWN_MODULES"

  if [[ "${1:-}" == "with-ci" ]]; then
    log "Building with npm ci and npm run build"
    BUILD_COMMAND="npm ci && $BUILD_COMMAND"
  else
    log "Building with npm run build only"
  fi

  docker run --rm \
    -v "$FRONT_DIR:/app" \
    -w /app \
    "$NODE_IMAGE" \
    sh -c "$BUILD_COMMAND"

  [[ -d "$DIST_DIR" ]] || fail "Build finished, but dist directory was not created: $DIST_DIR"
  [[ -f "$DIST_DIR/index.html" ]] || fail "Build finished, but index.html was not found in dist: $DIST_DIR/index.html"

  echo "############################## BUILD_APP [OK]"
  echo ""
}