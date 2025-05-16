# ADR 0017: Audit Logging, Feedback Loop & Privacy Controls

## Status
Accepted

## Context

To improve transparency and traceability in RAG pipelines, Phase 17 introduced structured audit logging for prompt-to-output execution. Phase 18 introduced a moonshot path for feedback capture, privacy enforcement, and serverless deployment futures.

## Decision

- Added `AuditLogger.ts` to log each prompt, output, retrieved context, confidence, and tokens to `audit-log.json`
- Added `FeedbackTracker.ts` to log up/down signals to `feedback.csv`
- CLI flags added:
  - `--audit`: enables structured logging per benchmark run
  - `--feedback up|down`: appends feedback signal per prompt
  - `--sanitize`: placeholder for vector PII filtering
- `createRagPipeline()` patched to write audit logs conditionally
- CLI patched to integrate all new audit and feedback hooks

## Consequences

- Each pipeline run is now traceable (opt-in)
- RAG systems can be observed and adapted from real-world feedback
- Foundation laid for:
  - privacy-preserving vectors
  - feedback-trained rerankers
  - serverless pipeline deployment

## References

- `AuditLogger.ts`
- `FeedbackTracker.ts`
- `rag-cli.ts benchmark`
- `createRagPipeline.ts` (v0.5.0)

---

Last updated: Phase 17–18 completion  
Author: Ali Kahwaji
