# ADR 0002: Project Scaffolding and CI Architecture

## Status
Accepted

## Context

In Phase 1 of SynapseStack, we established the foundational infrastructure for scalable
TypeScript development, test automation, and release workflows. This decision defines the
architecture for:
- Git branch strategy
- CI workflows (lint, test, release, strategist)
- Linting and formatting
- Environment and secret management

## Decision

- Adopt Node.js v20+, ESM-compatible monorepo
- All modules written in TypeScript with `strict: true` mode
- Use ESLint with Flat Config and `typescript-eslint`, `unicorn`, `sonarjs` plugins
- Format code with Prettier; check on pre-commit
- Add Lefthook for local git hooks:
  - `pre-commit`: lint + format
  - `commit-msg`: `commitlint`
  - `pre-push`: `lint:strict`, `test`
- Enforce Conventional Commits via `commitlint`
- Structure GitHub Actions:
  - `.github/workflows/ci.yml`: Lint, test, coverage
  - `.github/workflows/release.yml`: Semantic-release with dry-run for release/
  - `.github/workflows/next-task.yml`: AI roadmap strategist
  - `.github/workflows/pr-label.yml`: Auto labeler
- Secrets handled via `.env` for local and `OPENAI_API_KEY` via GitHub Secrets for CI
- Push protection enabled to prevent accidental commits with secrets

## Alternatives Considered

- Husky for git hooks (replaced with Lefthook for parallel support + config clarity)
- Single GitHub workflow with conditionals (split for modular visibility and fail isolation)
- Lax commit rules (discarded to ensure traceability + automation compliance)

## Consequences

- All commits must pass local and CI validation
- Contributors benefit from early failure detection
- OpenAI usage is now modular, observable, and tightly controlled

## References
- [ci.yml](../../.github/workflows/ci.yml)
- [lefthook.yml](../../lefthook.yml)
- [eslint.config.js](../../eslint.config.js)
- [package.json scripts](../../package.json)
- [CONTRIBUTING.md](../../docs/public/CONTRIBUTING.md)

---
Last updated: Phase 1 completion
Author: Ali Kahwaji
