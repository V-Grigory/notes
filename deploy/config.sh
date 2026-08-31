source "$PROJECT_ROOT/deploy/config-env.sh"

FRONT_DIR="$PROJECT_ROOT/front-vue3"
INFRA_DIR="$PROJECT_ROOT/infra"
DIST_DIR="$FRONT_DIR/dist"
BRANCH="master"
NODE_IMAGE="node:23-alpine"
LOCAL_COMPOSE_FILES=(-f docker-compose.yml)
SERVER_COMPOSE_FILES=(-f docker-compose.yml -f docker-compose.server.yml)
CERTIFICATE_PATH="$INFRA_DIR/certbot/conf/live/$DOMAIN/fullchain.pem"