# AI Revenue OS

A checkpointed 12-agent operating system for two revenue tracks:

1. B2B automation services.
2. Content creation and digital-product sales.

## Operating rule
Agents do not run forever. Every task has an owner, reviewer, timebox, acceptance tests, retry limit, and blocked state. External side effects require the approval policy in `briefs/approval-policy.md`.

## Start order

1. Create a **private** GitHub repository from this folder.
2. Add the repository secrets listed in `briefs/credentials.md`; never commit credentials.
3. Connect each AI account to the named role in `agents/team.yaml`.
4. Connect only the role-specific integrations in `agents/connectors.yaml`.
5. Add the 12-hour and 24-hour schedules in `.github/workflows/`.
6. Run the dry-run checklist in `briefs/connection-checklist.md`.
7. Start with D1. Do not enable outbound sending or auto-publishing until the approval gates pass.

## Repository layout

- `agents/`: fixed names, responsibilities, model routing, and connector assignments.
- `backlog/`: day-by-day tasks.
- `briefs/`: offer, ICP, policies, and connection instructions.
- `research/`: cited research and experiments.
- `sales/`: consent/source-aware prospect and pipeline records.
- `delivery/`: client implementation evidence.
- `content/` and `products/`: approved content and digital-product assets.
- `metrics/` and `reports/`: daily measurements and digest inputs.
- `.github/workflows/`: coordinator and daily digest schedules.

## Human approvals

The CEO approval queue is required for: cold outreach, publishing, client access, payments/refunds, contracts, claims about client outcomes, deletion, and any task involving uncertain privacy or copyright rights.
