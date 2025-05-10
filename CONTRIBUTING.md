# Contributing to SynapseStack

Thank you for your interest in contributing to **SynapseStack**! This guide outlines the process for proposing changes, contributing code, and participating in governance.

## Repository Setup

```bash
git clone https://github.com/DevilsDev/SynapseStack.git
cd SynapseStack
npm install
```

To run tests:

```bash
npm test
```

To run the CLI:

```bash
npx tsx src/cli/rag-cli.ts --help
```

---

## Contribution Guidelines

### Branch Naming

- `feature/<topic>` — New feature or module
- `bugfix/<topic>` — Fixes
- `phase/<X>` — Phase roadmap implementation

### Commit Format (Conventional Commits)

```
<type>(<scope>): <message>
```

Examples:

- `feat(cli): add rag-cli init command`
- `fix(lint): resolve sonar warning`

### Pull Request Checklist

- Lint passes (`npm run lint`)
- Tests pass (`npm test`)
- CLA signed (if applicable)
- Linked to a GitHub Issue or Phase in `PHASE_TRACKER.md`

---

## Pre-Commit Hooks

We use [Lefthook](https://github.com/evilmartians/lefthook) to enforce local hygiene.

```bash
npx lefthook install
```

Hooks run:

- `eslint`
- `prettier`
- `gitleaks`
- `dotenv-linter`

---

## Security

Please report vulnerabilities privately via `security@synapsestack.dev`.

---

## Related Docs

- [SECURITY.md](./SECURITY.md)
- [GOVERNANCE.md](./GOVERNANCE.md)
- [PHASE_TRACKER.md](./PHASE_TRACKER.md)
- [docs/internal/API_VERSIONING.md](./docs/internal/API_VERSIONING.md)
