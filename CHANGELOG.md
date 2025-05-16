# Changelog

## [v1.1.6-pre] - Phase 16: Retrieval Scoring & Confidence Modeling

### Added
- `ScoreStrategy.ts` with margin, cosine, and hybrid scoring models
- `ConfidenceCalculator.ts` to normalize and rerank document scores
- Patched `createRagPipeline()` to inject scoring strategy and surface confidence
- CLI: `rag-cli benchmark` now supports:
  - `--scoring=hybrid|margin|cosine`
  - `--rerank` toggle for scoring activation
- Confidence values appear in document context shown to LLM
- CLI reranking tested with `test-confidence-pipeline.ts`

## [v1.1.5-pre] - Phase 15: Benchmark Harness

### Added
- Created `BenchmarkRunner.ts` to run prompt suites and record performance
- CLI: `rag-cli benchmark` supports:
  - `--suite <file>` for YAML/JSON input
  - `--output <file>` to save CSV/JSON results
  - `--baseline <file>` to compare against previous runs
- Metrics tracked:
  - `latency_ms`
  - `tokens`
  - `timestamp`
- CSV + JSON snapshot support
- Delta comparison output to console
- Safe handling of missing baseline file

## [v1.1.0-pre] - Phase 13 & Phase 14

### Phase 14: Pipeline Graph Visualizer & DSL Preview

- Created `renderPipelineGraph.ts` to convert pipeline.yaml → Mermaid syntax
- CLI `visualize` command extended:
  - `--output mygraph.md` → Mermaid code block
  - `--output mygraph.svg` → rendered SVG via `@mermaid-js/mermaid-cli`
- CLI graph rendering now works for both stdout and file export
- Visual pipeline structure now supports documentation-ready embedding

### Phase 13: Multi-Embedding Strategy & Registry

- Added `EmbeddingRegistry.ts` to register and route embedding providers
- Introduced `EmbeddingStrategy.ts` for selection by `language`, `domain`
- Patched `createRagPipeline()` to support registry or static embedder fallback
- Enabled dynamic provider selection and failover logic


## [Unreleased] - Patch on develop

### Fixed
- test: Fully mocked `embedder` in `test-real-pipeline.ts` to eliminate reliance on OpenAI API
- Ensures the test runs offline and telemetry is still observed

## [v1.0.0] - Phase 11: Publish & Launch

### Added
- Semantic-release configured via `.releaserc.json`
- `release.yml` GitHub Action triggers on `main` and `release/*`
- Supports dry-run preview before full release
- Custom token support for multi-project secrets:
  - `SYNAPSESTACK_GITHUB_TOKEN`
  - `SYNAPSESTACK_NPM_TOKEN`
- Full plugin stack enabled:
  - `commit-analyzer`
  - `release-notes-generator`
  - `changelog`, `npm`, `github`, `git`

### Validated
- CLI release workflow tested via `--dry-run`
- Phase tagged and prepared with `v1.0.0`
- Confirmed GitHub release + changelog automation path

---

## [v0.5.0-pre] - Phase 10: Dockerization & Metrics Deployment

### Added
- Multi-stage `Dockerfile` for SynapseStack CLI runtime
- `.dockerignore` for secure and efficient image context
- `docker-compose.yml` with services:
  - `redis`, `chroma`, `cli`, `prometheus`
- `config/prometheus.yml` for scraping `/metrics` endpoint
- Prometheus integration for `pipeline_latency_ms`, `pipeline_tokens_used`
- `scripts/metrics-server.ts` exposes `/metrics` endpoint via Express
- `scripts/emit-metrics.ts` manually emits test telemetry
- `scripts/audit-functional.ts` tests CLI, metrics, telemetry, and CLI execution

### Observability Validated
- Prometheus target confirmed `UP`
- Custom metrics appear via functional audit
- Metrics persist and scrape across sessions

### CLI + Metrics Integration
- CLI pipeline execution emits latency + token metrics
- Auditable via Prometheus queries
- Phase now fully observability-ready

---

## [v0.4.0-pre] - Phase 9: Documentation & Developer Experience

### Added

- Launched Docusaurus site at `docs-site/`
- Created sidebar structure: CLI Reference, Sandbox, Benchmark Visualizer, CLI Simulator
- Home page reworked with project intro and interactive links
- Created DX components:
  - `Sandbox.tsx` for YAML → Mermaid preview
  - `BenchmarkViewer.tsx` for CSV → bar chart rendering
- CLI docs (`cli-reference.md`) and page stubs (`cli-sim.md`, `benchmark-visual.md`)
- Developer documentation and governance:
  - `CONTRIBUTING.md`
  - `GOVERNANCE.md`
  - `API_VERSIONING.md`
  - `docs/public/README.md` as doc entry pointer
- Added ADR 0009: Developer Experience Interface Strategy

### Developer Experience Summary

- Complete-  Core Developer Simulation (CLI + sandbox)
- Complete-  Schema UX (validate, generate-types)
- Complete-  CSV feedback loop (benchmark viewer)
- Next-      Type explorer, drag-drop composer (future DX track)

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
  - `gitleaks` for credential scanning (pre-commit)
  - `dotenv-linter` for `.env` files (pre-commit)
  - Strict lint, test, and commit message checks

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
