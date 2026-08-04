log() {
  echo "=== log === [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

fail() {
  echo "=== fail === [$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
  exit 1
}

on_error() {
  local exit_code=$?
  local line_number=$1
  echo "=== ERROR === [$(date '+%Y-%m-%d %H:%M:%S')] ERROR: command failed with exit code ${exit_code} at line ${line_number}" >&2
  exit "$exit_code"
}