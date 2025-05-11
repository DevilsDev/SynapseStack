# ADR 0009: Developer Experience Interface Strategy

## Status
Accepted

## Context

In Phase 9, we committed to turning SynapseStack into a CLI-first, simulation-driven developer framework with interactive docs. Rather than rely solely on Markdown or code-only usage, we integrated a live documentation site backed by Docusaurus.

The goal was to provide a frictionless path for new contributors, CLI testers, and visual learners.

## Decision

- Use Docusaurus v2 as the DX portal under `docs-site/`
- Create a structured sidebar including:
  - `CLI Reference`
  - `Sandbox`
  - `Benchmark Visualizer`
  - `CLI Simulator`
- Add Monaco + Mermaid-based sandbox for pipeline YAML editing
- Add CSV-powered `BenchmarkViewer` chart with Recharts
- Omit complex visual widgets like adapter composer for future expansion

## Consequences

- Docs are interactive, navigable, and install-optional
- Maintainers can evolve DX separately from CLI codebase
- Contributors can simulate pipelines before cloning or building

## References

- `docs-site/src/components/Sandbox.tsx`
- `docs-site/src/components/BenchmarkViewer.tsx`
- `docs-site/docs/sandbox.md`
- `docs-site/docs/benchmark-visual.md`
- `docs-site/sidebars.js`
- `docs-site/src/pages/index.js`

---

Last updated: Phase 9 completion
Author: Ali Kahwaji
