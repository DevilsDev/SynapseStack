#!/bin/bash

# ----------------------------------------------
# File: scripts/git-ai-commit.sh
# Description: Prompts OpenAI-based commit message and optionally uses it.
# Version: 0.1.1
# Author: Ali Kahwaji
# ----------------------------------------------

echo "Generating commit message suggestion..."

SUGGESTION=$(npx ts-node scripts/suggest-commit-message.ts)

echo
echo "$SUGGESTION"
echo

read -p "Use this commit message? (y/n): " choice

if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
  git commit -m "$SUGGESTION"
else
  echo "Cancelled. You may run git commit manually."
fi
