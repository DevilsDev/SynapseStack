# API Versioning Policy – SynapseStack

## Purpose

This document defines how SynapseStack versions and deprecates CLI commands, pipeline schema fields, and API exports.

---

## Semantic Versioning (SemVer)

SynapseStack follows `MAJOR.MINOR.PATCH[-label]`:

| Level | Description                       |
| ----- | --------------------------------- |
| MAJOR | Breaking changes to schema or CLI |
| MINOR | New commands, schema fields       |
| PATCH | Bugfixes or non-breaking cleanup  |
| -pre  | Unstable experimental builds      |

---

## Deprecation Policy

- Deprecated fields are marked with `@deprecated` in schema or TS docblocks
- CLI commands will warn on use (`console.warn`) before removal
- Deprecated items must remain for ≥ 1 minor release unless otherwise justified

---

## Schema Field Lifecycle

| Stage      | Indicator               |
| ---------- | ----------------------- |
| Stable     | Available + tested      |
| Deprecated | `@deprecated` in docs |
| Removed    | Eliminated entirely     |

---

## CLI Contracts

- Commands follow positional + named argument rules
- All public CLI args must be documented in `README.md`
- Breaking CLI changes bump `MAJOR`

---

## File Locations

- `pipeline.schema.json`: Active schema
- `rag-cli.ts`: CLI contract
- `CHANGELOG.md`: Declared changes
- `PHASE_TRACKER.md`: Roadmap references
