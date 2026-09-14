add_cert() {
  echo "############################## ADD_CERT ..."

  cd "$INFRA_DIR"

  if [[ "$IS_PRODUCTION" == true ]] && [[ ! -f "$CERTIFICATE_PATH" ]]; then
    mkdir -p certbot/www certbot/conf

    log "Stopping Nginx before the initial certificate issue"
    docker compose "${SERVER_COMPOSE_FILES[@]}" stop nginx || true

    log "Requesting a Let's Encrypt certificate for $DOMAIN"
    docker compose "${SERVER_COMPOSE_FILES[@]}" run --rm --service-ports certbot certonly \
      --standalone \
      --non-interactive \
      --agree-tos \
      --no-eff-email \
      --email "$LETSENCRYPT_EMAIL" \
      -d "$DOMAIN"

      echo "############################## ADD_CERT [OK]"
  else
    echo "############################## ADD_CERT [NO NEED]"
  fi

  echo ""
}