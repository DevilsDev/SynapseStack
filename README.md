# SynapseStack

SynapseStack is a lightweight framework for building retrieval-augmented generation (RAG) services. It aims to simplify data ingestion, embedding, querying, and serverless deployment for LLM-powered applications.

## Objectives

- Provide an easy-to-use toolkit for RAG pipelines.
- Support serverless export with minimal configuration.
- Encourage architectural experimentation via ADRs.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (bundled with Node.js) or Yarn

```bash
node --version
```

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourorg/SynapseStack.git
cd SynapseStack
npm install
```

## Basic Usage

### rag-cli

Use the command line interface to manage data and run queries locally:

```bash
npx rag-cli ingest ./data
npx rag-cli query "What is SynapseStack?"
```

### Serverless export

Build a deployable package for AWS Lambda:

```bash
npx rag-cli export --provider lambda --output dist
```

## Contributing

Contributions are welcome! Please open issues to discuss features or fixes, then submit a pull request from your fork.

1. Fork this repository.
2. Create a feature branch.
3. Commit your changes and open a pull request.

Documentation lives in the `docs/` directory, and Architecture Decision Records can be found in `docs/adr/`.

## License

Released under the [Apache 2.0](LICENSE) license.

