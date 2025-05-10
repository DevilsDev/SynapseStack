# ADR 0007: Observability & Metrics Strategy

## Status
Accepted

## Context

In Phase 7, SynapseStack introduced metrics to quantify performance, latency, and LLM token usage. Rather than use full OpenTelemetry SDKs, we pivoted to a lighter `prom-client` strategy due to complexity, limited span usage, and higher CI reliability.

## Decision

- Use `prom-client` instead of full OpenTelemetry SDKs for metrics
- Register default process metrics and two custom metrics:
  - `pipeline_latency_ms`: histogram of query execution time
  - `pipeline_tokens_used`: counter for LLM output tokens
- Metrics collected in `telemetry.ts`, exposed via Express at `/metrics`
- CLI benchmarking logs per-prompt latency and tokens to CSV

## Consequences

- Direct Prometheus compatibility with no sidecar required
- Easy testability and local metrics server (`metrics-server.ts`)
- No distributed tracing yet — to be revisited post-Phase 10+

## References

- `src/utils/telemetry.ts`
- `scripts/metrics-server.ts`
- `src/engines/createRagPipeline.ts`
- `src/cli/rag-cli.ts`

---

Last updated: Phase 7 completion
Author: Ali Kahwaji
