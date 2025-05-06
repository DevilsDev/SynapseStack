#!/bin/bash

# ----------------------------------------------
# File: scripts/dev-start.sh
# Description: Spins up local vector store services via Docker Compose v2.
# Version: 0.2.0
# Author: Ali Kahwaji
# ----------------------------------------------

set -e

COMPOSE_FILE="./docker-compose.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "docker-compose.yml not found at project root."
  exit 1
fi

echo "Starting local vector services: Chroma and Redis..."
docker compose up -d

echo "Services started. Performing basic health checks..."

# Chroma: port 8000
if curl -s http://localhost:8000 | grep -q "Chroma"; then
  echo "Chroma is running on http://localhost:8000"
else
  echo "Chroma may not be ready on port 8000. Check container logs."
fi

# Redis: port 6379
if docker compose exec redis redis-cli ping | grep -q "PONG"; then
  echo "Redis is alive on port 6379"
else
  echo "Redis did not respond to PING. Check logs."
fi

echo "Dev services are ready. You can now run adapter tests or pipelines."
