#!/bin/bash

# ----------------------------------------------
# File: scripts/zap-passive-scan.sh
# Description: Runs OWASP ZAP in passive scan mode against a target URL.
# Version: 0.1.0
# Author: Ali Kahwaji
# ----------------------------------------------

set -e

TARGET_URL=${1:-http://localhost:3000}

echo " Starting OWASP ZAP Passive Scan on: $TARGET_URL"

docker run --rm -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py \
  -t "$TARGET_URL" \
  -r zap-report.html \
  -d

echo " ZAP passive scan completed. Report saved to zap-report.html"
