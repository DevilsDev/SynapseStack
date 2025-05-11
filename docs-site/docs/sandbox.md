---
id: sandbox
title: Developer Sandbox
sidebar_label: Sandbox
---
# Developer Sandbox

Welcome to the SynapseStack sandbox. Use the YAML editor below to modify a pipeline and instantly preview the Mermaid graph.

> This interactive tool allows you to experiment with `pipeline.yaml` before installing the CLI.

<!-- Embed a React component or iframe here in future -->

```yaml
pipeline:
  name: try-me-pipeline
  embedder: OpenAI
  vectorStore: Pinecone
  llm: OpenAI
```

```mermaid
graph TD
    input["User Prompt"] --> E["OpenAI"]
    E --> V["Pinecone"]
    V --> L["OpenAI"]
    L --> output["Final Response"]
```
