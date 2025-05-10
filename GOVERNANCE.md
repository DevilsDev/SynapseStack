# Governance Policy – SynapseStack

## Roles

### Core Maintainers

- Lead roadmap and phase planning
- Approve phase-level merges
- Publish releases

### Committers

- Trusted contributors with PR merge rights
- Must adhere to guidelines

### Contributors

- Anyone submitting code, docs, or reviews
- Welcome via PR or issue

---

## Decision-Making Process

- Small PRs: Merge after 2 reviewer approvals
- Phase PRs: Must be tied to `PHASE_TRACKER.md`
- Breaking changes: Require RFC or ADR + consensus

---

## Voting (For Proposals > 100 LoC or Architectural Impact)

- Quorum: ≥ 2 core maintainers
- Voting: 👍 or 👎 on PR or ADR thread
- Pass threshold: ≥ 66% of votes within 5 business days

---

## Roadmap

See [`PHASE_TRACKER.md`](./PHASE_TRACKER.md) for current milestone status.

---

## Releases

- All tags must follow SemVer: `MAJOR.MINOR.PATCH-label`
- Pre-releases use `-pre`, `-rc` suffixes
- Changelogs are required for all public tags

---

## Disputes

Handled by Core Maintainers via GitHub discussion or direct outreach. Escalate to `governance@synapsestack.dev`.
