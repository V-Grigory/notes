add_cert() {
  echo "#### add_cert ..."

  cd "$INFRA_DIR"

  if [[ "$IS_PRODUCTION" == true ]] && [[ ! -f "$CERTIFICATE_PATH" ]]; then
    mkdir -p certbot/www certbot/conf
    log "Stopping Nginx before the initial certificate issue"
    docker compose "${COMPOSE_FILES[@]}" stop nginx || true

    log "Requesting a Let's Encrypt certificate for $DOMAIN"
    docker compose "${COMPOSE_FILES[@]}" run --rm --service-ports certbot certonly \
      --standalone \
      --non-interactive \
      --agree-tos \
      --no-eff-email \
      --email "$LETSENCRYPT_EMAIL" \
      -d "$DOMAIN"

      echo "#### add_cert [OK]"
  fi

  echo "#### add_cert [NO NEED]"
  echo ""
}