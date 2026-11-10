# AI Revenue OS
A checkpointed operating system run by **8 AI accounts** across two revenue tracks:
1. B2B automation services.
2. Content creation and digital-product sales.

The active team is 3 Google AI accounts, 4 Manus accounts, and 1 MiniMax account. Claude accounts have been removed; their strategy, editorial, technical architecture, and coded-video responsibilities are reassigned in `agents/team.yaml` and `agents/account-map.md`.

## Operating rule
Agents do not run forever. Every task has an owner, reviewer, timebox, acceptance tests, retry limit, and blocked state. External side effects require the approval policy in `briefs/approval-policy.md`.

## Start order
1. Keep this GitHub repository private or intentionally public.
2. Add repository secrets listed in `briefs/credentials.md`; never commit credentials.
3. Connect the eight AI accounts to the roles in `agents/team.yaml`.
4. Connect only the role-specific integrations in `agents/connectors.yaml`.
5. Configure each account's 12-hour schedule using `agents/account-map.md`; keep the 24-hour digest separate.
6. Run the eight-account dry-run checklist in `briefs/connection-checklist.md`.
7. Start with D1. Do not enable outbound sending or auto-publishing until the approval gates pass.

## Repository layout
- `agents/`: fixed names, responsibilities, account assignment, schedules, and connector assignments. See `agents/legacy-role-migration.md` before reassigning existing issues.
- `backlog/`: day-by-day tasks.
- `briefs/`: offer, ICP, policies, prompts, and connection instructions.
- `research/`: cited research and experiments.
- `sales/`: source-aware prospect and pipeline records.
- `delivery/`: client implementation evidence.
- `content/` and `products/`: approved content and digital-product assets.
- `metrics/` and `reports/`: daily measurements and digest inputs.
- `.github/workflows/`: coordinator, video renderer, and daily digest schedules.

## Human approvals
CEO approval is required for cold outreach, publishing, client access, payments/refunds, contracts, claims about client outcomes, deletion, and any task involving uncertain privacy or copyright rights.
