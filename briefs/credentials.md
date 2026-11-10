# Credentials needed before activation

Do not send passwords, API keys, OAuth codes, recovery codes, or payment-card details in chat. Add secrets only through GitHub Actions Secrets/Environments or the provider's official OAuth authorization screen. Never commit secrets or tokens to this repository.

This system has eight active AI accounts. For the current exact platform requirements, publishing/outreach boundaries, and secret names, see [`briefs/automation-credentials.md`](automation-credentials.md).

## Core setup

1. GitHub access to this repository with Actions enabled. Existing Actions use GitHub's generated `GITHUB_TOKEN`; do not create a broad personal access token unless a specific integration requires it.
2. Confirm each of the eight connected AI accounts maps to one role in `agents/team.yaml`. A GitHub connection alone does not necessarily let Actions invoke that AI account; choose provider-native schedules or supported provider API invocation.
3. For YouTube publishing, complete owner OAuth to the intended YouTube channel and store only the scoped OAuth credentials in GitHub Actions secrets.
4. For Instagram publishing, use an Instagram professional account, Meta app authorization, publish permission, and media reachable to Meta at publish time.
5. For automated emails, choose an email provider, verify your sender domain, and configure SPF/DKIM/DMARC as required.
6. For Instagram inbound messaging, deploy a public HTTPS webhook endpoint and request the messaging permission. Do not automate cold outbound DMs.

## Secret handling

Keep live credentials in repository/environment Actions secrets, not source files, commit history, Issues, or this checklist. Use test/private publishing first. Limit tokens to the required scopes, separate test and production environments, rotate/revoke credentials if exposed, and keep payments under Saksham's direct control.

## Not yet implemented in workflows

The scheduled coordinator currently creates checkpoint Issues; it does not invoke all eight AI providers. The video workflow is manually dispatched and produces a downloadable artifact; it does not publish. The daily digest email step is a placeholder. Publishing, inbound lead capture, email outreach, and CRM automation require implementation in addition to OAuth/API credentials. Do not enable external sends or public posts until the end-to-end test and approval policy are complete.
