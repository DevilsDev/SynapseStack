# ADR 0001: Core Interface Definitions

## Status
Accepted

## Context

To enable a pluggable, adapter-driven architecture for SynapseStack, it is essential to define core abstraction boundaries for embeddings, vector storage, and LLM clients. These abstractions will decouple the orchestration logic from specific third-party providers like OpenAI, Cohere, Pinecone, etc.

## Decision

Define the following TypeScript interfaces under `src/core`:

### IEmbeddingProvider
Responsible for converting input strings into numerical vectors.
```ts
export interface IEmbeddingProvider {
  embed(texts: string[]): Promise<number[][]>;
  getModelName(): string;
}
```

### IVectorStore
Responsible for storing and retrieving vectors via similarity search.
```ts
export interface IVectorStore {
  addDocuments(documents: { id: string; embedding: number[] }[]): Promise<void>;
  similaritySearch(queryEmbedding: number[], topK: number): Promise<{ id: string; score: number }[]>;
  delete(ids: string[]): Promise<void>;
}
```

### ILLMClient
Responsible for generating completions and optionally streaming token-by-token output.
```ts
export interface ILLMClient {
  generate(prompt: string, context?: string[]): Promise<string>;
  stream(prompt: string, context?: string[], onToken: (token: string) => void): Promise<void>;
  getModelName(): string;
}
```

All three interfaces follow the Interface Segregation and Dependency Inversion principles of SOLID.

## Alternatives Considered

- Using a single unified `IProvider` abstraction. Rejected due to overly broad responsibility and unclear separation of concerns.
- Embedding return type as `Float32Array`. Rejected due to JSON serialization friction and inconsistent library support.

## Consequences

- Facilitates drop-in replacements for any embedding model, vector DB, or LLM.
- Promotes clean separation of orchestration logic and third-party tooling.
- Enables strong typing and mockability for testing.
- Future adapters must conform to these interfaces to integrate correctly.

All interface versions begin at `0.1.0` and may evolve via semver-driven ADR updates.
