# ADR 0010: Dockerization & Metrics Deployment Strategy

## Status
Accepted

## Context

Phase 10 introduced containerization and local deployment infrastructure to ensure reproducibility, observability, and developer parity with CI. The system needed a Docker-based way to:

- Run the CLI interactively
- Expose Prometheus metrics for observability
- Compose vector store dependencies like Redis and Chroma

## Decision

- Multi-stage Dockerfile built for CLI with minimal runtime footprint
- Docker Compose stack includes:
  - `redis` (in-memory vector fallback)
  - `chroma` (test vector store)
  - `cli` (from Dockerfile)
  - `prometheus` (scrapes CLI metrics)
- Prometheus config file lives in `config/prometheus.yml`
- Metrics emitted to `/metrics` via `metrics-server.ts`
- `.dockerignore` ensures clean, secure image context

## Consequences

- CLI can be tested via container or live with bind mount
- Prometheus can monitor real token and latency data
- Metrics integration now verified end-to-end
- Docker Compose enables local benchmarking and service orchestration

## References

- `Dockerfile`
- `docker-compose.yml`
- `scripts/metrics-server.ts`
- `src/utils/telemetry.ts`
- `config/prometheus.yml`
- `scripts/emit-metrics.ts`
- `scripts/audit-functional.ts`

---

Last updated: Phase 10 completion  
Author: Ali Kahwaji
