# ADR 0013: Multi-Embedding Strategy & Registry

## Status
Accepted

## Context

As SynapseStack scales to support multilingual and domain-specific use cases, a single static embedding provider is insufficient. Phase 13 introduces a registry and strategy pattern to dynamically select embedding providers based on metadata such as language or domain.

## Decision

- Created `EmbeddingRegistry` to register and route named embedding providers
- Developed `EmbeddingStrategy` with sample `byLanguage` and `byDomain` selectors
- Extended `createRagPipeline()` to accept:
  - Static `embedder` OR
  - A registry with selection metadata + fallback
- Ensures runtime routing and observability flexibility

## Consequences

- Developers can mix and match embedder backends
- Allows easy fallback or prioritization based on domain relevance
- Embedder logic now reusable across documents and phases

## References

- `src/registry/EmbeddingRegistry.ts`
- `src/strategies/EmbeddingStrategy.ts`
- `createRagPipeline.ts` (registry support)

---

Last updated: Phase 13 completion  
Author: Ali Kahwaji
