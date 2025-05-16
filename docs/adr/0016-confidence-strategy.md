# ADR 0016: Retrieval Scoring & Confidence Strategy

## Status
Accepted

## Context

RAG systems often return nearest-neighbor documents with opaque or raw vector scores. Phase 16 introduces a confidence scoring mechanism to normalize and rank retrieval outputs with better interpretability.

## Decision

- Defined `ScoreStrategy` interface with:
  - `marginScoring`
  - `cosineScoring`
  - `hybridScoring`
- Created `ConfidenceCalculator` to apply scoring strategy and rerank
- Patched `createRagPipeline()` to accept `scoringStrategy` in config
- CLI now supports:
  - `--scoring=hybrid|margin|cosine`
  - `--rerank` to enable confidence pipeline
- Normalized confidence values surfaced alongside document IDs

## Consequences

- Downstream consumers (LLMs, users) can trust ranked documents
- Enables future auditability and feedback loops
- Makes benchmark comparisons interpretable by confidence value

## References

- `ScoreStrategy.ts`, `ConfidenceCalculator.ts`
- `createRagPipeline.ts` (scoring support)
- `rag-cli.ts` with new flags
- `test-confidence-pipeline.ts`

---

Last updated: Phase 16 completion  
Author: Ali Kahwaji
