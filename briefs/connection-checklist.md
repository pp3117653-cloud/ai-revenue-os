# Connection sequence
## Connect now, before D1
1. GitHub connector.
2. One owner email address for the daily digest.
3. The private or intentionally public GitHub repository.
4. Secret manager or GitHub encrypted secrets.

## Connect before D2 account audit
Map exactly eight active AI accounts to `agents/team.yaml`:
- Google AI: GA-01, GA-02, and GA-03.
- Manus: MN-01, MN-02, MN-03, and MN-04.
- MiniMax: MM-01.

There are no Claude accounts or Claude schedules in the current team. Former Claude offer strategy is part of GA-01; architecture and coded-video source work are part of Manus-1/MN-01; editorial and long-form work are part of Google-3/GA-03.

The GitHub Actions coordinator is not an additional AI identity. Do not connect an account to more than one active role until its plan limits and commercial-use permissions are verified. If a provider cannot run a role concurrently, queue its work rather than creating overlapping runs.

Before creating new issues, reassign any open task using `agents/legacy-role-migration.md`.

## Connect after D4, when the ICP and offer are selected
CRM, calendar, forms, website analytics, Google Drive/Sheets, and the selected zero-cost-first automation tool. These are not needed for initial market research.

## Connect after D9, before outreach and distribution
Email sending, newsletter, YouTube, Instagram professional publishing, website CMS, and content storage. Start in draft-only mode.

## Connect after the first paid client
Client-specific systems, client mailbox, client automation platform, payment access, and production webhooks. Use separate client credentials and revoke them at project end.

## Start schedules only after this gate
The owner must confirm all eight accounts have fixed roles and schedules, each connector has least privilege, the repository has no secrets, external side effects are approval-gated, and each D1 dry run passed. Use the exact schedule times in `agents/account-map.md` and the matching prompt in `briefs/master-prompts.md`.
