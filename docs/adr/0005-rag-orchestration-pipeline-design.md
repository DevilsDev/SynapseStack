# ADR 0005: RAG Orchestration Pipeline Design

## Status
Accepted

## Context

As part of Phase 4, SynapseStack introduces an orchestrated Retrieval-Augmented Generation (RAG) engine to unify the interaction between embeddings, vector stores, and LLM clients. This component forms the core execution engine of the framework.

## Decision

- Introduced `createRagPipeline(config: RagPipelineConfig)` function
  - Accepts `IEmbeddingProvider`, `IVectorStore`, `ILLMClient`, and optional `ContextManager`
  - Returns an object with a `query(input: string): Promise<string>` method

- Introduced `ContextManager` class
  - Manages conversational or session-level history
  - Supports append, retrieve, and reset behaviors

- All components injected for extensibility and isolation
- Coverage is enforced with unit and E2E mocks

## Alternatives Considered

- Chain-based builder abstraction (deferred to future phases)
- Separate pipeline for contextless vs. context-aware queries (unified for now)

## Consequences

- Enables clean separation of concern between embedding, retrieval, and generation
- Compatible with tracing and observability integrations in Phase 7
- Supports plugin-driven orchestration routing in future

## References

- [createRagPipeline.ts](../../src/engines/createRagPipeline.ts)
- [ContextManager.ts](../../src/engines/ContextManager.ts)
- [pipeline.e2e.test.ts](../../__tests__/integration/pipeline.e2e.test.ts)

---

Last updated: Phase 4 completion  
Author: Ali Kahwaji
