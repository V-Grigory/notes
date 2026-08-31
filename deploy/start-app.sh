start_app() {
  echo "#### start_app ..."
  log "Starting docker compose services"

  cd "$INFRA_DIR"

  if [[ "$IS_PRODUCTION" == true ]]; then
    docker compose "${SERVER_COMPOSE_FILES[@]}" down && docker compose "${SERVER_COMPOSE_FILES[@]}" up -d
  else
    docker compose "${LOCAL_COMPOSE_FILES[@]}" down && docker compose "${LOCAL_COMPOSE_FILES[@]}" up -d
  fi

  log "Deploy completed successfully"
  log "Dist directory: $DIST_DIR"

  echo "#### start_app [OK]"
}