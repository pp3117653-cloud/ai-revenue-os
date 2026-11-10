# Automated publishing, lead capture, and sales: credentials and readiness

Last checked: 2026-11-10. This checklist is for the eight roles in `agents/team.yaml`. **Do not paste secrets into chat or commit them to Git.** Put them in GitHub Actions environment/repository secrets or authorize through the provider's OAuth screen. Prefer a `production` GitHub Environment with required reviewers until test publishing is proven.

## What is already automated in this repository

The scheduled coordinator workflow currently makes a checkpoint Issue; it does not invoke the eight AI accounts, research leads, or execute a sales sequence. The video workflow is manually triggered and uploads MP4s as GitHub artifacts. It does not post to YouTube or Instagram. The daily digest workflow creates a text report, but its email-delivery step is still a placeholder. **No social posting, email outreach, lead capture, or CRM send is currently active.** Credentials alone will not activate these missing steps; the workflows and integration code must also be implemented and tested.

## Required authorizations and secrets by capability

### YouTube publishing

Authorize the channel owner through Google OAuth for the YouTube Data API v3 using the upload scope `https://www.googleapis.com/auth/youtube.upload`. A static API key is not enough to upload to the owner's channel. Create a Google Cloud OAuth client and save these as GitHub Actions secrets:

- `YOUTUBE_CLIENT_ID`
- `YOUTUBE_CLIENT_SECRET`
- `YOUTUBE_REFRESH_TOKEN` — created only after the channel owner completes the OAuth consent flow.

Store `YOUTUBE_CHANNEL_ID` as a GitHub Actions variable if the publishing workflow needs to verify the destination. Start with `private` or `unlisted` uploads and switch to public only after a successful test and an explicit publishing-policy decision. [1]

### Instagram publishing

The destination must be an Instagram **professional** account (Business or Creator). For this repo's own account, configure a Meta developer app and choose an Instagram API login path; newer Instagram Login does not require linking a Facebook Page. Authorize the account with the content-publishing permissions. Save credentials as GitHub Actions secrets and nonsecret IDs/URLs as variables:

- Secrets: `META_APP_SECRET`, `META_IG_ACCESS_TOKEN` (long-lived token, refreshed before expiry).
- Variables: `META_APP_ID`, `META_IG_USER_ID`, `META_API_VERSION`.
- Required permissions for Instagram Login publishing: `instagram_business_basic`, `instagram_business_content_publish`.

For accounts not owned or managed by the app, Meta requires Advanced Access/App Review and business verification. An account with Page Publishing Authorization must complete it before publishing. Instagram's API fetches the media from a publicly reachable URL when using the `video_url`/`image_url` publishing flow. The current GitHub Actions artifact is not such a URL, so provide a controlled public media bucket/CDN or implement an eligible resumable upload flow. A bucket option such as S3/R2 requires `MEDIA_S3_ENDPOINT`, `MEDIA_S3_BUCKET`, `MEDIA_S3_ACCESS_KEY_ID`, `MEDIA_S3_SECRET_ACCESS_KEY`, and `MEDIA_PUBLIC_BASE_URL`. Do not publish source code or private files from that bucket. [2] [3]

### Instagram inbound-message automation

Do **not** automate unsolicited cold DMs. Meta's messaging API conversation starts only after the Instagram user messages the professional account; the normal messaging window is 24 hours for most user actions. Use it for timely replies to inbound questions, with a clear bot disclosure and a human escalation path. [4]

If you want inbound DM/comment webhooks, also configure the Meta app's webhook subscription and a public HTTPS callback endpoint. Store `META_WEBHOOK_VERIFY_TOKEN` and `META_APP_SECRET` as secrets; set `META_WEBHOOK_URL` and subscribed event names as variables. Request `instagram_business_manage_messages` (and any additional permission specifically required by the chosen login/API flow). GitHub Actions cron alone is not a webhook receiver; this needs a continuously available HTTPS endpoint such as a small serverless function or WebDev backend.

For an Instagram-to-email funnel, the person must actively request the resource or opt in on a form. Capture the email, consent wording/version, timestamp, source, and opt-out status. Do not harvest addresses from profile bios or export follower lists into a cold-email campaign.

### Email outreach and opted-in nurture

Pick one transactional/marketing email provider. Verify a domain you control and configure the provider's requested SPF, DKIM, and DMARC DNS records. Gmail's guidelines require SPF or DKIM for all senders and all three for bulk senders; they also recommend sending to people who opted in and providing an easy unsubscribe. [5]

Store the provider key as `EMAIL_PROVIDER_API_KEY`. Store `EMAIL_FROM`, `EMAIL_REPLY_TO`, `BUSINESS_NAME`, and `UNSUBSCRIBE_BASE_URL` as Actions variables or secrets as appropriate. Use provider-managed suppression, unsubscribe, bounce, and complaint handling. Only send automated nurture/outreach to contacts with documented permission or another reviewed lawful basis for the relevant jurisdiction. Keep a suppression list and enforce a conservative per-day cap.

### Sales pipeline and human payment

No payment credential is needed because Saksham handles payment. The automation can source and score public business prospects, send approved email sequences within the configured policy, answer routine questions from a preapproved FAQ, draft proposals, and notify Saksham when a lead agrees to scope/price or asks for a commitment. The workflow must stop before accepting payment or making a nonstandard promise. If using an external CRM, add its scoped OAuth/API credential as `CRM_API_TOKEN`; this is optional if GitHub Issues or a local repository ledger is enough. Calendar booking can be added separately with an OAuth connector or booking-provider API key.

Before any campaign is enabled, record these nonsecret operating settings in `briefs/`:

- Approved offer, deliverables, exclusions, fixed price/range, refund/contract terms, and claims the system may make.
- Target industries/countries and permitted source types.
- Sender identity, website, privacy contact, business address where required, and unsubscribe link.
- Maximum initial emails and follow-ups per prospect, spacing, daily send cap, quiet hours, and stop conditions.
- What the agent can answer autonomously and which questions must be escalated.

### Invoking the eight AI accounts

Connecting provider accounts to GitHub does not by itself give GitHub Actions an API to start those accounts. Pick one orchestration route:

1. **Provider-native schedules:** create recurring tasks inside the Google AI, Manus, and MiniMax accounts using the eight prompts. This does not require model API keys in GitHub, but does not guarantee a GitHub event can immediately wake an account.
2. **Repo-driven invocation:** requires supported task-launch/API access for each provider and appropriate API credentials. Gemini API, MiniMax API, and Manus API access are separate from chat-account subscriptions and may have separate limits/billing. Do not add `GEMINI_API_KEY`, `MINIMAX_API_KEY`, or a Manus token until the exact supported API/plan and usage cost are confirmed.

## Safer activation sequence

1. Finish OAuth for YouTube and Meta and test destination identity.
2. Render one approved video and publish it privately/unlisted; verify metadata, media, and logs.
3. Test Instagram publishing with one owner-approved post; add a scheduled publish step only after success.
4. Configure opt-in capture and test one inbound Instagram message and one permissioned email confirmation.
5. Verify unsubscribe/suppression handling before any nurture sequence.
6. Enable lead research and limited email outreach only after the owner has approved the target market, offer, wording boundaries, and sending caps.
7. Keep payment, contract exceptions, unsupported claims, and unusual negotiation with Saksham.

## References

[1]: https://developers.google.com/youtube/data/guides/uploading_a_video "YouTube Data API video upload guide"
[2]: https://developers.facebook.com/documentation/instagram-platform/overview "Instagram Platform overview and access levels"
[3]: https://developers.facebook.com/documentation/instagram-platform/content-publishing "Instagram content publishing"
[4]: https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api "Instagram messaging API"
[5]: https://support.google.com/mail/answer/81126?hl=en "Gmail email sender guidelines"
