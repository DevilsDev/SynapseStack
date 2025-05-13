# ADR 0014: Pipeline Graph Visualizer & CLI Export

## Status
Accepted

## Context

Understanding RAG pipeline structure is critical for maintainers and users. Phase 14 introduces a CLI-based visualization engine to generate Mermaid syntax from config files and optionally render SVG previews.

## Decision

- Created `renderPipelineGraph.ts` to generate Mermaid graph syntax
- CLI `visualize` command supports:
  - No flag → STDOUT with Mermaid code block
  - `--output mygraph.md` → saves as Markdown with Mermaid
  - `--output mygraph.svg` → calls `@mermaid-js/mermaid-cli` to render SVG
- SVG export is CLI-compatible and integrates with documentation flows

## Consequences

- Pipeline structure is now human-readable
- Easy to preview changes or embed diagrams in Markdown/docs
- Lays groundwork for future visual editors

## References

- `src/utils/renderPipelineGraph.ts`
- `src/cli/rag-cli.ts` (`visualize` command)
- `@mermaid-js/mermaid-cli` integration

---

Last updated: Phase 14 completion  
Author: Ali Kahwaji
