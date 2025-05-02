#!/bin/bash

# Usage: ./scripts/branch.sh <phase-number> "<task-description>"

PHASE=$1
TASK=$2

if [ -z "$PHASE" ] || [ -z "$TASK" ]; then
  echo "Usage: ./scripts/branch.sh <phase-number> \"<task description>\""
  exit 1
fi

# Convert task to kebab-case
KEBAB_TASK=$(echo "$TASK" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')

BRANCH_NAME="phase/${PHASE}-${KEBAB_TASK}"

git checkout -b "$BRANCH_NAME"

echo "✅ Branch created: $BRANCH_NAME"
