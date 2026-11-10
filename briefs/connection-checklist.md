# Connection sequence
## Connect before D1
1. GitHub connector.
2. Owner email for the daily digest.
3. This private or intentionally public repository.
4. Secret manager or GitHub encrypted secrets.

## Connect before D2 account audit
Map exactly eight active accounts to `agents/team.yaml`:
- Google AI: GA-01 (market and offer), GA-02 (pipeline and audience research), GA-03 (sole animation-code author).
- Manus: MN-01 (automation/demos), MN-02 (client success), MN-03 (editorial/products), MN-04 (distribution).
- MiniMax: MM-01 (visual QA).

**Only Google-3 / GA-03 may write or modify animation source code.** No other account may author or edit files under `content/video/src/`. Manus-1 can render approved code without editing it. The GitHub Actions coordinator is not an additional AI identity.

Before creating new tasks, reassign open legacy issues using `agents/legacy-role-migration.md`. Disable old Claude schedules manually in Claude; repository changes cannot cancel schedules stored by an external provider.

## Connect after D4, when the ICP and offer are selected
CRM, calendar, forms, website analytics, Google Drive/Sheets, and the selected zero-cost-first automation tool.

## Connect after D9, before outreach and distribution
Email sending, newsletter, YouTube, Instagram professional publishing, website CMS, and content storage. Start in draft-only mode.

## Connect after the first paid client
Client-specific systems, client mailbox, client automation platform, payment access, and production webhooks. Use separate client credentials and revoke them at project end.

## Schedule gate
The owner confirms all eight accounts have fixed roles/schedules, connectors have least privilege, the repository has no secrets, external actions are approval-gated, and every D1 dry run passed.
