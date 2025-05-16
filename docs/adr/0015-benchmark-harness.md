# ADR 0015: Benchmark Harness and Snapshot Comparison

## Status
Accepted

## Context

Evaluating RAG pipelines requires repeatable and structured performance testing. Phase 15 introduces a benchmark harness that executes a pipeline over a prompt suite, records metrics, and optionally compares against a previous baseline.

## Decision

- Implemented `BenchmarkRunner.ts` to:
  - Load structured prompt suites (YAML/JSON)
  - Execute queries via `createRagPipeline()`
  - Record latency, token usage, and timestamp
- Extended CLI with:
  - `--suite`, `--output`, `--baseline`, `--mode` flags
- Wrote results to CSV or JSON snapshot
- Added comparison output when a baseline is present

## Consequences

- RAG pipelines are now quantitatively testable
- Results can be visualized or used in CI to track regressions
- Benchmark artifacts are versionable and diffable

## References

- `BenchmarkRunner.ts`
- `rag-cli.ts benchmark`
- `benchmarks/prompts.yaml`
- `benchmarks/results.csv`
- `BenchmarkViewer.tsx`

---

Last updated: Phase 15 completion  
Author: Ali Kahwaji
