# ADR 0006: LLM Abstraction Strategy

## Status
Accepted

## Context

As part of Phase 5, SynapseStack introduces a clean abstraction layer for large language model (LLM) providers.
This enables modular orchestration, provider switching, and simplified pipeline construction.

The primary interface is:
- `ILLMClient`: defines `generate()`, `stream()`, and `getModelName()`

## Decision

- Created `OpenAIClient` as the default LLM implementation
  - Uses OpenAI's ChatCompletion API
  - Supports streaming via `stream: true`

- Scaffolded `AnthropicClient` for Claude-based models
  - Uses REST API structure with placeholders
  - Mocks streaming with `onToken()` fallback

- All clients must conform to `ILLMClient`
- Adapters reside in `src/adapters/llm/`

- `createRagPipeline()` accepts `llm: ILLMClient` for runtime injection

## Alternatives Considered

- Single factory-based client (not selected for now)
- Extending LLM client with usage reporting (deferred to Phase 7)

## Consequences

- Multiple LLM providers can be swapped or injected without code changes
- Future providers (Google, Cohere, Mistral) can reuse the interface
- Full unit test coverage validates abstraction consistency

## References

- [ILLMClient.ts](../../src/core/ILLMClient.ts)
- [OpenAIClient.ts](../../src/adapters/llm/OpenAIClient.ts)
- [AnthropicClient.ts](../../src/adapters/llm/AnthropicClient.ts)
- [createRagPipeline.ts](../../src/engines/createRagPipeline.ts)

---

Last updated: Phase 5 completion  
Author: Ali Kahwaji
