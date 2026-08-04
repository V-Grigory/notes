check_infra() {
  echo "#### check_infra ..."

  [[ -d "$PROJECT_ROOT" ]] || fail "Project root not found: $PROJECT_ROOT"
  [[ -d "$FRONT_DIR" ]] || fail "Frontend directory not found: $FRONT_DIR"
  [[ -d "$INFRA_DIR" ]] || fail "Infra directory not found: $INFRA_DIR"
  [[ -f "$INFRA_DIR/docker-compose.yml" ]] || fail "docker-compose.yml not found in: $INFRA_DIR"
  [[ -f "$INFRA_DIR/docker-compose.server.yml" ]] || fail "docker-compose.server.yml not found in: $INFRA_DIR"

  command -v git >/dev/null 2>&1 || fail "git is not installed"
  command -v docker >/dev/null 2>&1 || fail "docker is not installed"

  log "Deployment mode: $(if [[ "$IS_PRODUCTION" == true ]]; then echo "production"; else echo "development"; fi)"
  log "Project root: $PROJECT_ROOT"
  log "Frontend dir: $FRONT_DIR"
  log "Infra dir: $INFRA_DIR"
  log "Target branch: $BRANCH"
  log "Node image: $NODE_IMAGE"
  log "HTTPS domain: $DOMAIN"

  echo "#### check_infra [OK]"
  echo ""
}