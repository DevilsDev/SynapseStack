# Contributing Guidelines – SynapseStack

Welcome to SynapseStack! We follow clean architecture, SOLID principles, and scalable monorepo discipline.

---

## Code Style & Quality Enforcement

All contributions must comply with the following rules:

| Rule Type                  | Tool                  | Enforcement Point                 |
| -------------------------- | --------------------- | --------------------------------- |
| **Linting**          | ESLint (Flat Config)  | `npm run lint`, `lint:strict` |
| **Formatting**       | Prettier              | `npx prettier --check .`        |
| **Test coverage**    | Jest + ts-jest        | Required in CI & pre-push         |
| **Filename casing**  | unicorn/filename-case | PascalCase for class files        |
| **Clean Code rules** | unicorn, sonarjs      | Enforced by ESLint config         |
| **Git hooks**        | Lefthook              | `.lefthook.yml` validated       |

---

## Local Validation

Before submitting a PR:

```bash
npm run lint:strict
npm run test
```

Git hooks will also enforce:

- Lint on commit
- Prettier formatting
- Full test and lint check before push

---

## Branch Strategy

Use conventional branching aligned to the roadmap:

- `phase/*` for roadmap phases
- `feature/*`, `bugfix/*`, `release/*` for tactical work

All PRs should:

- Link to a roadmap phase or ADR
- Be labeled via PR labeler
- Include test coverage where applicable

---

## Want to Contribute AI Features?

We use OpenAI for internal roadmap assistance. Secrets are handled via `.env` and `dotenv`.

---

Thank you for contributing to SynapseStack!
