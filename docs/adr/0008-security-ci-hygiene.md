# ADR 0008: Security & CI Hygiene

## Status
Accepted

## Context

Phase 8 introduced first-class security tooling to ensure source hygiene, secret safety, and automated dependency updates.

## Decision

- Integrate Snyk CLI in `ci.yml` for dependency scanning
- Run `npm audit --audit-level=high` in CI as a backup scanner
- Enable Renovate bot with `.github/renovate.json`
- Add pre-commit hooks via Lefthook:
  - `gitleaks`: detects secrets before commit
  - `dotenv-linter`: validates .env example hygiene
- Add `SECURITY.md` to disclose policy and contacts
- Add OWASP ZAP script for optional passive scan

## Consequences

- All PRs and commits pass through secret and dependency scans
- Contributors have clear hooks + policy metadata
- Audit logs and disclosures are managed formally

## References

- `ci.yml`
- `lefthook.yml`
- `scripts/zap-passive-scan.sh`
- `scripts/install-security-tools.sh`
- `SECURITY.md`

---

Last updated: Phase 8 completion
Author: Ali Kahwaji
