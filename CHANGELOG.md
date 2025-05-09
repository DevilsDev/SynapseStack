# Changelog

Next: [v0.4.0-pre] → Launch Phase 7: Observability & Tracing

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

Next: [v0.3.0-pre] → Launch Phase 4: Core Pipeline Implementation
