add_cert() {
  echo "############################## ADD_CERT ..."

  cd "$INFRA_DIR"

  if [[ "$IS_PRODUCTION" == true ]] && [[ ! -f "$CERTIFICATE_PATH" ]]; then
    # Создаем папки, если их нет
    mkdir -p certbot/www certbot/conf

    log "Stopping Nginx before the initial certificate issue"
    docker compose "${SERVER_COMPOSE_FILES[@]}" stop nginx || true

    log "Requesting a Let's Encrypt certificate for $DOMAIN"
    # 1. Запускаем certbot как обычно (от root), чтобы у него были права внутри контейнера
    docker compose "${SERVER_COMPOSE_FILES[@]}" run --rm --service-ports certbot certonly \
      --standalone \
      --non-interactive \
      --agree-tos \
      --no-eff-email \
      --email "$LETSENCRYPT_EMAIL" \
      -d "$DOMAIN"

    log "Fixing permissions for certbot files"
    # 2. Используем Docker для смены владельца на хосте. Пароль sudo НЕ потребуется!
    docker compose "${SERVER_COMPOSE_FILES[@]}" run --rm --entrypoint chown certbot \
      -R "$(id -u):$(id -g)" /etc/letsencrypt /var/lib/letsencrypt

    echo "############################## ADD_CERT [OK]"
  else
    echo "############################## ADD_CERT [NO NEED]"
  fi

  echo ""
}