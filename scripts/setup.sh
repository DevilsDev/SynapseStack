#!/bin/bash

mkdir -p synapsestack/{src/{core,adapters,engines,infrastructure,cli},__tests__/{unit,integration,contract},scripts,docs/{public,internal,adr},benchmarks,public}

# Base source file
touch synapsestack/src/app.ts

# Scripts
touch synapsestack/scripts/dev.sh
touch synapsestack/scripts/ci-runner.js
touch synapsestack/scripts/branch.sh
touch synapsestack/scripts/add-header.sh

# Configuration files
touch synapsestack/.eslintrc.js
touch synapsestack/.prettierrc
touch synapsestack/tsconfig.json
touch synapsestack/commitlint.config.js
touch synapsestack/.env.example

# Docs
touch synapsestack/docs/adr/000X-template.md
touch synapsestack/CHANGELOG.md

echo "Project structure created successfully (excluding LICENSE, .gitignore, README.md, package.json, .github/workflows)"

