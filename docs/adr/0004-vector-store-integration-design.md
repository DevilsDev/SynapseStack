# ADR 0004: Vector Store Integration Design

## Status
Accepted

## Context

In Phase 3, we introduced modular vector store adapters to allow seamless integration with external vector databases and in-memory search engines. The goal is to make retrieval logic replaceable, testable, and configuration-driven.

Vector store interface defined:
- `IVectorStore` (core)
  - `addDocuments(documents: { id: string; embedding: number[] }[])`
  - `similaritySearch(queryEmbedding: number[], topK: number)`
  - `delete(ids: string[])`

## Decision

- Place each adapter under `src/adapters/vectorstore/<provider>/`
- Adapters implement `IVectorStore`
- Include test scaffolds for each:
  - `Pinecone`
  - `Chroma`
  - `Redis`
  - `Weaviate`
- `docker-compose.yml` included for Chroma/Redis dev environment
- CLI script `dev-start.sh` created for local container bootstrap

## Alternatives Considered

- Unified SDK abstraction across all vector engines (rejected for complexity)
- Skip stubs for Redis/Weaviate (rejected to maintain parity in structure)

## Consequences

- Each adapter can be independently tested, swapped, or extended
- Enables hybrid vector fusion logic in Phase 16
- Simplifies integration test orchestration in future E2E phases

## References

- [IVectorStore.ts](../../src/core/IVectorStore.ts)
- [PineconeVectorStore.ts](../../src/adapters/vectorstore/pinecone/PineconeVectorStore.ts)
- [ChromaVectorStore.ts](../../src/adapters/vectorstore/chroma/ChromaVectorStore.ts)
- [docker-compose.yml](../../docker-compose.yml)

---

Last updated: Phase 3 completion  
Author: Ali Kahwaji
