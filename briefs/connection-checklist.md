# Connection sequence

## Connect now, before D1

1. GitHub connector.
2. One owner email address for the daily digest.
3. One private GitHub repository.
4. Secret manager or GitHub encrypted secrets.

## Connect before D2 account audit

Map the 12 accounts to fixed names in `agents/team.yaml`:

- Google AI: B2B-01, CONTENT-01, and one reserve/reviewer identity.
- Claude: B2B-02, B2B-03, B2B-06, and CONTENT-02/03/05 as the available Claude identities permit.
- Manus: OPS-01 plus the remaining Manus identities for B2B-04, CONTENT-05, and CONTENT-06.
- MiniMax: CONTENT-04 only.

Do not connect an account to more than one role until its plan and concurrency limits are verified. If you have fewer than 12 separately usable identities, keep the roster but run roles in a queue rather than pretending they are concurrent.

## Connect after D4, when the ICP and offer are selected

CRM, calendar, forms, website analytics, Google Drive/Sheets, and the approved automation builder. These are not needed for initial market research.

## Connect after D9, before D10 outreach/content distribution

Email sending, newsletter, YouTube, Instagram professional publishing, website CMS, and content storage. Start in draft-only mode.

## Connect after the first paid client

Client-specific systems, client CRM, client mailbox, client automation platform, payment access, and production webhooks. Use a separate client credential and revoke it at project end.

## Start schedule only after this gate

The owner must confirm:

- Every account has a fixed role.
- Every connector has the least privilege required.
- The repository is private.
- Secrets are not in files or commits.
- Outbound, publishing, payment, and client-production actions are approval-gated.
- The D1 dry run passed.
