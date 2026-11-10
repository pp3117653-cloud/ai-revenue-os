# Connection sequence

## Connect now, before D1

1. GitHub connector.
2. One owner email address for the daily digest.
3. One private or intentionally public GitHub repository.
4. Secret manager or GitHub encrypted secrets.

## Connect before D2 account audit

Map the 12 AI accounts to the fixed names in `agents/team.yaml`:

- Google AI: B2B-01, B2B-05, and CONTENT-01.
- Claude: B2B-02, B2B-03, CONTENT-02, and CONTENT-03.
- Manus: B2B-04, B2B-06, CONTENT-05, and CONTENT-06.
- MiniMax: CONTENT-04.

The GitHub Actions coordinator is not an additional AI identity. Do not connect one account to multiple active roles until its plan limits and commercial-use permissions are verified. If a provider cannot run a role concurrently, keep the role but run it in a queue.

## Connect after D4, when the ICP and offer are selected

CRM, calendar, forms, website analytics, Google Drive/Sheets, and the selected zero-cost-first automation tool. These are not needed for initial market research.

## Connect after D9, before outreach and distribution

Email sending, newsletter, YouTube, Instagram professional publishing, website CMS, and content storage. Start in draft-only mode.

## Connect after the first paid client

Client-specific systems, client mailbox, client automation platform, payment access, and production webhooks. Use a separate client credential and revoke it at project end.

## Start schedules only after this gate

The owner must confirm that every account has a fixed role, every connector has least privilege, the repository has no secrets, external side effects are approval-gated, and the D1 dry run passed.
