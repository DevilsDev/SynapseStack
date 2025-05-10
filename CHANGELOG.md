# Changelog

## [v0.3.2-pre] - Phase 8: Security & Dependency Hygiene

### Added
- Integrated `snyk` CLI into CI for vulnerability detection
- Enabled `npm audit` with high+ severity scan in `ci.yml`
- Added `.github/renovate.json` to configure Renovate bot:
  - Scheduled nightly
  - Groups dev/runtime dependencies
- Introduced OWASP ZAP passive scan script (`zap-passive-scan.sh`)
- Created security tool installer (`install-security-tools.sh`)
- Created `SECURITY.md` for GitHub Security tab compliance

### Hooks & Linting
- `lefthook.yml` v0.4.1:
  -  `gitleaks` for credential scanning (pre-commit)
  -  `dotenv-linter` for `.env` files (pre-commit)
  -  Strict lint, test, and commit message checks

### Observability
- Switched from OpenTelemetry SDK to `prom-client`
- Updated `telemetry.ts` and `metrics-server.ts` for Prometheus-native metrics
- Metrics available at `/metrics` via lightweight Express

### Coverage Note
- Adjusted pipeline to exclude scaffolding files from Jest thresholds
- Observability code excluded until integration tests added

---


## [v0.3.1-pre] - Phase 7: Observability & Performance

### Added
- Introduced Prometheus-based metrics using `prom-client`
- Metrics: `pipeline_latency_ms` (histogram), `pipeline_tokens_used` (counter)
- Created lightweight `/metrics` endpoint via `scripts/metrics-server.ts`
- Hooked latency/tokens into `createRagPipeline.ts`
- Collected default process/system metrics

### CLI Enhancements
- `benchmark` command writes latency + token usage per prompt to CSV
- Optional benchmark fallback prompts generated
- Visual CLI logs simulate realistic performance behavior

### Developer Tooling
- `scripts/install-telemetry.sh` installs OpenTelemetry and Prometheus stack
- Metrics safe to expose in dev/local CI

### Removed
- Full OpenTelemetry SDK span processing in favor of direct Prometheus instrumentation

---


## [v0.3.0-pre] - Phase 4–6 Completion: Pipeline, LLM, CLI System

### Phase 6: Developer Experience Enhancements

- Introduced `rag-cli.ts` with 5 CLI commands:
  - `init`: Scaffold pipeline.yaml
  - `run`: Validate and simulate pipeline.yaml
  - `visualize`: Render Mermaid graph to stdout or file
  - `benchmark`: Run structured prompts and export CSV metrics
  - `generate-types`: Emit TypeScript from schema via json-schema-to-typescript
- Added YAML + JSON support using js-yaml
- Schema located in `schemas/pipeline.schema.json`
- Mermaid output verified, CSV written to disk
- CLI versioned as `0.6.0` in tracker


### Phase 5: LLM Client Abstraction

- Implemented `OpenAIClient` with full `ILLMClient` support
- Added `stream()` and `generate()` methods with mock test coverage
- Scaffolded `AnthropicClient` with placeholder logic and mocks
- Unit tests added for both clients
- ADR 0006 logged to capture LLM abstraction design decisions


### Phase 4: Core Pipeline Implementation

- Implemented `createRagPipeline()` orchestration with injected `IEmbeddingProvider`, `IVectorStore`, and `ILLMClient`
- Introduced `ContextManager` for prompt memory management
- Created E2E test: `pipeline.e2e.test.ts` with full mocked flow
- Added dependency-injection-ready config for future DSL support
- ADR 0005 created to document orchestration strategy

---

## [v0.2.0-pre] - Phase 3 Completion & CI Stabilization

### Added
- Vector store adapter stubs: Pinecone, Chroma, Redis, Weaviate
- Docker Compose setup for Chroma/Redis integration testing
- dev-start.sh with health checks
- Unit test scaffold for Pinecone adapter
- ADR 0004: Vector Store Integration Design

### Changed
- eslint.config.js updated to allow _-prefixed unused arguments
- All vector store adapters now use _param naming convention to satisfy strict lint rules
- Commitlint step removed from CI and migrated to Lefthook pre-push
- Updated lefthook.yml to enforce commitlint, lint:strict, and test on push
- gh ai-commit now generates commitlint-safe messages

### Fixed
- ESM compatibility issues with @commitlint/config-conventional
- Commitlint false negatives from CI due to shallow clone history

---

## [v0.1.1-pre] - Phase 2: Embedding Adapters

### Added
- OpenAIEmbeddingProvider implementing IEmbeddingProvider
- CohereEmbeddingProvider with full REST mock
- Unit tests with mocking for OpenAI and Cohere
- commitlint-safe formatting in AI-generated messages
- ADR 0003: Embedding Adapter Design
- Phase 2 entries in PHASE_TRACKER.md and docs

### Changed
- suggest-commit-message.ts script now adds fallback prefixes
- gh ai-commit formatted for commitlint compliance
- eslint.config.js updated with adapter rules (unicorn/sonarjs)

---

## [v0.1.0-pre] - Phase 1 Infrastructure and Interface Baseline

### Added
- Core interface contracts: IEmbeddingProvider, IVectorStore, ILLMClient
- ESLint, Prettier, TypeScript strict config
- GitHub Actions: ci.yml, release.yml, next-task.yml
- Lefthook setup: pre-commit, commit-msg, pre-push hooks
- env-validator.ts script for runtime key validation
- CONTRIBUTING.md and PHASE_TRACKER.md initial structure
- ADR 0001 and 0002: interface and scaffolding architecture

### Changed
- Initial CLI, AI strategist, and commit assistant tools integrated
- commitlint enforced across all hooks and commits
- Public/private doc segregation structure created

### Fixed
- Path resolution for Jest and TypeScript
- ESM import compatibility for OpenAI SDK

---

