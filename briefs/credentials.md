# Credentials needed before activation

Do not send passwords, API keys, OAuth codes, recovery codes, or credit-card details in chat. Add them through the connector authorization screens or GitHub encrypted secrets.

## Required from the owner

1. Private GitHub repository URL, owner/org name, and default branch.
2. GitHub authorization with repository read/write, Issues/Pull Requests, Actions, and Secrets access only for this repository.
3. The 12 AI account identities mapped to the names in `agents/team.yaml`.
4. Confirmation that each plan permits the intended commercial and automated use; do not use account rotation to bypass limits.
5. A sender email address and domain you control, plus authenticated SPF/DKIM/DMARC through your email provider.
6. Business legal name, postal address, privacy contact, and unsubscribe destination for outreach emails.
7. CRM/workspace choice and account authorization.
8. Calendar and booking account authorization.
9. Website/domain and analytics account authorization.
10. Payment/checkout account authorization; keep charges and refunds behind human approval.
11. Instagram professional account and Meta app authorization only if eligible; YouTube channel authorization; any other social accounts you explicitly want connected.
12. Target country/regions and industries so compliance, language, and outreach rules can be scoped.

## Never put in the repository

Passwords, raw API keys, OAuth refresh tokens, recovery codes, payment card data, client personal data, scraped personal-data lists, or unredacted customer exports.

## GitHub secrets suggested names

`DIGEST_EMAIL_TO`, `EMAIL_PROVIDER_TOKEN`, `CRM_TOKEN`, `CALENDAR_TOKEN`, `ANALYTICS_TOKEN`, `CHECKOUT_TOKEN`, `SOCIAL_PUBLISH_TOKEN`, and `WEBHOOK_SIGNING_SECRET`.

Use environment-scoped secrets and separate draft/test credentials from production credentials.
