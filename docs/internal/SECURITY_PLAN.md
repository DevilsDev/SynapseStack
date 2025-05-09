# Security Policy

## Project: SynapseStack

### Supported Versions
We actively maintain the latest `main` and `develop` branches. Only the latest pre-release (`v0.x`) is supported unless otherwise specified in a release tag.

| Version       | Supported | Notes                            |
|---------------|-----------|----------------------------------|
| `v0.3.x-pre`  | ✅        | Actively developed and secured   |
| `v0.2.x-pre`  | ❌        | No longer actively maintained    |

---

### Reporting a Vulnerability

If you discover a vulnerability or security flaw in SynapseStack:

1. **Do not open a public issue.**
2. Instead, contact the project maintainer directly:

   **Ali Kahwaji** — [@alikahwaji](https://github.com/alikahwaji)  
   Email: security@synapsestack.dev

3. Provide the following:
   - Clear reproduction steps
   - Affected modules or versions
   - Proof-of-concept (if safe to share)

We will acknowledge and respond to valid reports within **72 hours**.

---

### Disclosure Policy

We follow a **coordinated disclosure** model:

- You report a vulnerability privately
- We verify, patch, and publish a fix
- You are credited (unless anonymity requested)

---

### Security Measures in Place

- [x] Pre-commit secret scanning (`gitleaks` via Lefthook)
- [x] CI-based dependency scanning (Snyk)
- [x] Renovate bot for automated dependency updates
- [x] `.env.example` is PII-safe
- [x] Telemetry sandboxed from sensitive tokens

---

### Contact
For urgent security concerns:  
Email: **security@synapsestack.dev**  
GitHub: [https://github.com/DevilsDev/SynapseStack](https://github.com/DevilsDev/SynapseStack)
