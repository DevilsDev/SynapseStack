# ADR 0003: Embedding Adapter Design

## Status

Accepted

## Context

In SynapseStack Phase 2, we introduce adapter modules to abstract embedding functionality from
LLM and vector-store orchestration. The goal is to allow plug-and-play support for multiple
embedding providers with minimal integration friction.

The interface contract for all embedding adapters is defined in:
`src/core/IEmbeddingProvider.ts`

## Decision

We will implement one adapter per provider, each conforming to `IEmbeddingProvider`. Each adapter:

- Must expose `embed(texts: string[]): Promise<number[][]>`
- Must implement `getModelName(): string`
- Will be located under `src/adapters/<provider>/`
- Must be independently testable with `__tests__/unit/adapters/`

Initial providers:

- OpenAI (text-embedding-ada-002)
- Cohere (embed-english-light-v3.0)

## Alternatives Considered

- **Unified adapter class with runtime switches**: Rejected due to bloated responsibilities
- **Generic embedding registry**: Deferred to Phase 4 when orchestration routing is added

## Consequences

- Test coverage for each adapter is enforced via Jest unit tests
- Integration is decoupled from model-specific SDK differences (OpenAI, fetch-based, etc.)
- Future providers (e.g., HuggingFace, Google) can be dropped in with minimal refactor

## References

- [IEmbeddingProvider.ts](../../src/core/IEmbeddingProvider.ts)
- [OpenAIEmbeddingProvider.ts](../../src/adapters/openai/OpenAIEmbeddingProvider.ts)
- [CohereEmbeddingProvider.ts](../../src/adapters/cohere/CohereEmbeddingProvider.ts)

---

Last updated: Phase 2 completion
Author: Ali Kahwaji
