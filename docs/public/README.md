# SynapseStack

## Overview
SynapseStack is a modular, pluggable framework that unifies Context-Augmented Generation (CAG) and Retrieval-Augmented Generation (RAG) into a production-ready Node.js/TypeScript package. It is built for enterprise-scale applications that require structured context management, customizable pipelines, and vector-store interoperability.

## Key Features
- Adapter-based architecture for embeddings, vector stores, and LLMs
- Plug-and-play modules for OpenAI, Cohere, HuggingFace, Pinecone, Chroma
- CLI support (`rag-cli`) for local development and orchestration
- Support for pipeline definition via YAML/JSON DSL
- Observability hooks (OpenTelemetry, Prometheus)
- Security scanning and compliance-first CI/CD setup

## Installation
```bash
npm install synapsestack
```

## Quickstart
```ts
import { createRagPipeline } from 'synapsestack';

const pipeline = createRagPipeline({
  embeddingProvider: new OpenAIEmbeddings(),
  vectorStore: new PineconeStore(),
  llmClient: new OpenAIClient(),
});

const result = await pipeline.query("What is vector search?");
console.log(result);
```

##  Public Docs – SynapseStack

Welcome to the public documentation portal for **SynapseStack**.

To get started with the CLI, see the main project README:

 [Main CLI Guide and Setup](../../README.md)

You may also explore:
- `docs/public/` for Docusaurus-ready guides
- `docs/internal/` for maintainers (if authorized)

---

For installation, benchmarking, and visualization:
```bash
npx tsx src/cli/rag-cli.ts --help
```

## Documentation
- [Getting Started](./QUICKSTART.md)
- [API Reference](./API_REFERENCE.md)
- [Contribution Guide](../CONTRIBUTING.md)

## Roadmap
For internal roadmap and progress, see `docs/internal/PHASE_TRACKER.md`.

## License
Apache-2.0

---
© Ali Kahwaji – SynapseStack Project Lead
