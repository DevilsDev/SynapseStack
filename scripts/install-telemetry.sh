#!/bin/bash

# ----------------------------------------------
# File: scripts/install-telemetry.sh
# Description: Installs all dependencies for Phase 7 observability and metrics
# Version: 0.1.0
# Author: Ali Kahwaji
# ----------------------------------------------

set -e

echo " Installing OpenTelemetry and Prometheus dependencies..."
npm install \
  @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/sdk-trace-base \
  @opentelemetry/sdk-metrics \
  @opentelemetry/exporter-prometheus \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions \
  prom-client \
  express

echo " Telemetry dependencies installed. Ready for Phase 7."
