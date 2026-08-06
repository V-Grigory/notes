#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
source "$PROJECT_ROOT/deploy/config.sh"
source "$PROJECT_ROOT/deploy/functions.sh"
source "$PROJECT_ROOT/deploy/check-infra.sh"
source "$PROJECT_ROOT/deploy/build-app.sh"
source "$PROJECT_ROOT/deploy/add-cert.sh"
source "$PROJECT_ROOT/deploy/start-app.sh"

trap 'on_error $LINENO' ERR

check_infra "$@"
build_app "$@"
add_cert "$@"
start_app "$@"