# ADR 0011: Release Automation and Publishing Strategy

## Status
Accepted

## Context

In Phase 11, SynapseStack transitioned from local tagging and manual publishing to a fully automated CI/CD release system. This includes semantic versioning, changelog generation, and optional package deployment.

## Decision

- Use `semantic-release` with a multi-plugin setup:
  - GitHub release integration
  - Changelog generation
  - Optional NPM + Git tagging
- Use GitHub Actions (`release.yml`) to trigger on:
  - Push to `main` (actual release)
  - Push to `release/*` (dry-run for testing)
- Allow renaming of tokens to avoid collision with other projects
  - `SYNAPSESTACK_GITHUB_TOKEN`
  - `SYNAPSESTACK_NPM_TOKEN`
- Provide `.releaserc.json` for version and plugin configuration

## Consequences

- Phase-based development can simulate releases via dry-run
- Real tags like `v1.0.0` can be issued from `main`
- CI will publish and changelog automatically
- Future phases can release independently by tagging and merging to `main`

## References

- `.releaserc.json`
- `.github/workflows/release.yml`
- `CHANGELOG.md`
- `phase/11-publish-launch` dry-run output

---

Last updated: Phase 11 completion  
Author: Ali Kahwaji
