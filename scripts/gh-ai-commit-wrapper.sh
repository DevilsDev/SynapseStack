#!/bin/bash

# ----------------------------------------------
# File: scripts/gh-ai-commit-wrapper.sh
# Description: Wrapper to invoke AI commit suggestion using tsx.
# Version: 0.3.0
# Author: Ali Kahwaji
# ----------------------------------------------

echo "Generating commit message suggestion..."

SUGGESTION=$(npx tsx scripts/suggest-commit-message.ts)

if [[ -z "$SUGGESTION" ]]; then
  echo "No suggestion returned. Aborting."
  exit 1
fi

echo
echo "$SUGGESTION"
echo

read -p "Use this commit message? (y = commit / e = edit / n = cancel): " choice

if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
  git commit -m "$SUGGESTION"
elif [[ "$choice" == "e" || "$choice" == "E" ]]; then
  git commit -m "$SUGGESTION" -e
else
  echo "Cancelled. You may run git commit manually."
fi
