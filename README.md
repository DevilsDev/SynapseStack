# SynapseStack

> Modular Context-Augmented Generation (CAG) + Retrieval-Augmented Generation (RAG) pipeline toolkit

[![CI](https://github.com/DevilsDev/SynapseStack/actions/workflows/ci.yml/badge.svg)](https://github.com/DevilsDev/SynapseStack/actions/workflows/ci.yml)
![Version](https://img.shields.io/badge/version-v0.3.2--pre-blue)

---

## About

**SynapseStack** is a CLI-first, modular framework for building and evaluating CAG + RAG pipelines with:

- Plug-and-play embeddings, vector stores, and LLM adapters
- YAML/JSON pipeline config support
- Benchmarks, observability, and structured governance

> Designed for open AI research and production LLM orchestration.

---

## Getting Started

```bash
git clone https://github.com/DevilsDev/SynapseStack.git
cd SynapseStack
npm install
```

### Use the CLI

```bash
npx tsx src/cli/rag-cli.ts --help
```

Initialize a pipeline config:

```bash
npx tsx src/cli/rag-cli.ts init
```

Run validation:

```bash
npx tsx src/cli/rag-cli.ts run
```

Render graph:

```bash
npx tsx src/cli/rag-cli.ts visualize --output graph.md
```

Run benchmark:

```bash
npx tsx src/cli/rag-cli.ts benchmark --output metrics.csv
```

Generate types:

```bash
npx tsx src/cli/rag-cli.ts generate-types
```

---

## Folder Structure

```
SynapseStack/
├── src/
│   ├── cli/                 # CLI commands (rag-cli.ts)
│   ├── engines/             # Pipeline orchestrators
│   ├── core/                # Shared interfaces
│   ├── adapters/            # Embeddings, vector stores, LLM clients
│   └── utils/               # Observability, helpers
├── scripts/                 # CI tools, dev servers
├── benchmarks/              # YAML prompt sets for benchmarking
├── schemas/                 # JSON schemas and generated types
├── docs/public              # User docs
├── docs/internal            # Maintainer docs (PHASE, API versioning)
```

---

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [GOVERNANCE.md](./GOVERNANCE.md)
- [SECURITY.md](./SECURITY.md)
- [PHASE_TRACKER.md](./PHASE_TRACKER.md)
- [docs/internal/API_VERSIONING.md](./docs/internal/API_VERSIONING.md)

---

## Security

Please report vulnerabilities to `security@synapsestack.dev`

---

## Roadmap

See [`PHASE_TRACKER.md`](./PHASE_TRACKER.md) for milestone status.
