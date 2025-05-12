# SynapseStack – Integration Audit Checklist (Phase 10)

> Ensure all critical systems are functional before Phase 11 (CI/CD Publishing)

---

##  CLI System

- [ ] `src/cli/rag-cli.ts` exists and runs `--help`
- [ ] `init`, `run`, `benchmark`, `visualize`, `generate-types` work from CLI

##  Pipeline Orchestration

- [ ] `createRagPipeline.ts` calls `latencyHistogram.observe()`
- [ ] `tokenCounter.inc()` is wired to `llm.generate()` response
- [ ] End-to-end run (`npx tsx src/cli/rag-cli.ts run`) triggers real pipeline

##  Observability

- [ ] `metrics-server.ts` binds metrics using `registers: [client.register]`
- [ ] `emit-metrics.ts` emits histogram + counter on manual run
- [ ] `metrics-server.ts` keeps process open or emits from request
- [ ] `/metrics` returns non-empty custom metrics
- [ ] Prometheus target is UP (via http://localhost:9090/targets)

##  Prometheus

- [ ] `config/prometheus.yml` targets `localhost:9464` or `host.docker.internal`
- [ ] Prometheus container runs and scrapes metrics every 10s
- [ ] Query `pipeline_latency_ms` returns data

##  Docker

- [ ] `Dockerfile` builds CLI
- [ ] `.dockerignore` excludes node_modules, coverage, .env
- [ ] `docker-compose.yml` includes `cli`, `prometheus`, `redis`, `chroma`

##  Docs Site (DX)

- [ ] `Sandbox.tsx` renders YAML + Mermaid
- [ ] `BenchmarkViewer.tsx` renders CSV as bar chart
- [ ] Docusaurus site runs: `cd docs-site && npm run start`
- [ ] Homepage buttons work for: Sandbox, CLI, Benchmark

---

To run automated check:
```bash
npx tsx scripts/integration-check.ts
```