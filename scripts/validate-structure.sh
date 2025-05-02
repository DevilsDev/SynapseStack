#!/bin/bash

PROJECT_ROOT="."

REQUIRED_PATHS=(
  "$PROJECT_ROOT/LICENSE"
  "$PROJECT_ROOT/.gitignore"
  "$PROJECT_ROOT/README.md"
  "$PROJECT_ROOT/package.json"
  "$PROJECT_ROOT/.github/workflows"
  "$PROJECT_ROOT/.env.example"
  "$PROJECT_ROOT/.eslintrc.js"
  "$PROJECT_ROOT/.prettierrc"
  "$PROJECT_ROOT/tsconfig.json"
  "$PROJECT_ROOT/commitlint.config.js"
  "$PROJECT_ROOT/src/core"
  "$PROJECT_ROOT/src/adapters"
  "$PROJECT_ROOT/src/engines"
  "$PROJECT_ROOT/src/infrastructure"
  "$PROJECT_ROOT/src/cli"
  "$PROJECT_ROOT/src/app.ts"
  "$PROJECT_ROOT/__tests__/unit"
  "$PROJECT_ROOT/__tests__/integration"
  "$PROJECT_ROOT/__tests__/contract"
  "$PROJECT_ROOT/scripts/setup.sh"
  "$PROJECT_ROOT/scripts/dev.sh"
  "$PROJECT_ROOT/scripts/branch.sh"
  "$PROJECT_ROOT/scripts/add-header.sh"
  "$PROJECT_ROOT/scripts/ci-runner.js"
  "$PROJECT_ROOT/docs/public"
  "$PROJECT_ROOT/docs/internal"
  "$PROJECT_ROOT/docs/adr/000X-template.md"
  "$PROJECT_ROOT/benchmarks"
  "$PROJECT_ROOT/public"
  "$PROJECT_ROOT/CHANGELOG.md"
)

echo "Validating SynapseStack project structure..."

MISSING=0

for path in "${REQUIRED_PATHS[@]}"; do
  if [ ! -e "$path" ]; then
    echo "Missing: $path"
    MISSING=$((MISSING + 1))
  else
    echo "Found: $path"
  fi
done

echo

if [ "$MISSING" -eq 0 ]; then
  echo "Structure validation passed. All required files and directories exist."
else
  echo "Validation failed. $MISSING required items are missing."
  exit 1
fi
