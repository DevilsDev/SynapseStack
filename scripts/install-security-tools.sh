#!/bin/bash

# ----------------------------------------------
# File: scripts/install-security-tools.sh
# Description: Installs CLI tools for Phase 8: security and secret scanning
# Version: 0.1.0
# Author: Ali Kahwaji
# ----------------------------------------------

set -e

echo " Installing Snyk CLI and Gitleaks for security hygiene..."

npm install -g snyk

if ! command -v gitleaks &> /dev/null; then
  echo " Installing Gitleaks..."
  curl -s https://api.github.com/repos/gitleaks/gitleaks/releases/latest \
    | grep "browser_download_url.*linux.*amd64.tar.gz" \
    | cut -d '"' -f 4 \
    | xargs curl -L | tar xz -C /usr/local/bin
  echo " Gitleaks installed."
else
  echo " Gitleaks already installed."
fi

echo " Tools installed. You can now run 'snyk test' or 'gitleaks detect'."
