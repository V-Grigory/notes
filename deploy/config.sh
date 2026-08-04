FRONT_DIR="$PROJECT_ROOT/front-vue3"
INFRA_DIR="$PROJECT_ROOT/infra"
DIST_DIR="$FRONT_DIR/dist"
BRANCH="master"
NODE_IMAGE="node:23-alpine"
COMPOSE_FILES=(-f docker-compose.yml -f docker-compose.server.yml)

DOMAIN="grigoryvolchok.ru"
LETSENCRYPT_EMAIL="grigoryvolchok@gmail.com"
CERTIFICATE_PATH="$INFRA_DIR/certbot/conf/live/$DOMAIN/fullchain.pem"

source "$PROJECT_ROOT/deploy/config-env.sh"