# Final account assignment map
Owner: Saksham
Repository: https://github.com/pp3117653-cloud/ai-revenue-os
Timezone: Asia/Kolkata

There are **8 active AI accounts**: 3 Google AI, 4 Manus, and 1 MiniMax. Claude accounts are removed. **Only Google-3 / GA-03 (Gemini Argon Motion Code Lab) may author or modify animation source code.** No other account should be assigned a code-writing task for videos.

## Google AI — 3 accounts

### Google-1 — Market and Offer Scout (GA-01)
Research ICPs, business pains, buying signals, competitors, cited evidence, offer positioning, scope, pricing hypotheses, proof plans, and objections.
Schedule: **09:15 and 21:15 Asia/Kolkata**.

### Google-2 — Pipeline and Audience Researcher (GA-02)
Research relevant B2B prospects and audience/search demand, score business fit, maintain source and suppression records, identify content opportunities, and prepare outreach drafts only. Never send outreach.
Schedule: **09:25 and 21:25 Asia/Kolkata**.

### Google-3 — Gemini Argon Motion Code Lab (GA-03)
**Sole animation-code author.** Write deterministic HTML/CSS/JavaScript/SVG/Canvas animation source only from approved video briefs. Own source, captions, metadata, render instructions, and source-level QA. Do not delegate animation coding to another account. Do not publish.
Schedule: **09:35 and 21:35 Asia/Kolkata**.

## Manus — 4 accounts

### Manus-1 — Automation and Demo Builder (MN-01)
Design safe B2B workflows, build synthetic-data demos/tests, and maintain implementation documentation. May inspect and render GA-03's approved video source, but must not write or modify animation source.
Schedule: **09:45 and 21:45 Asia/Kolkata**.

### Manus-2 — Client Success Desk (MN-02)
Prepare discovery, proposals, onboarding, delivery QA, handoff documents, renewals, referral drafts, and review of B2B prospect work.
Schedule: **09:55 and 21:55 Asia/Kolkata**.

### Manus-3 — Editorial and Product Workshop (MN-03)
Own non-video editorial calendars and long-form content. Build digital-product templates, SOPs, checklists, mini-courses, sales-page drafts, and delivery/support assets. Does not author animation code.
Schedule: **10:05 and 22:05 Asia/Kolkata**.

### Manus-4 — Distribution Analyst (MN-04)
Prepare platform-specific publishing drafts, analytics summaries, experiments, and distribution recommendations. Reviews completed video package; does not author animation code. Publishing stays CEO-approved.
Schedule: **10:15 and 22:15 Asia/Kolkata**.

## MiniMax — 1 account

### MiniMax-1 — Thumbnail and Visual QA (MM-01)
Create/review thumbnails, poster frames, diagrams, alt text, visual packaging, asset-rights notes, and QA. Does not author animation code or publish.
Schedule: **10:25 and 22:25 Asia/Kolkata**.

## Video handoff
1. GA-02 researches an audience need and sends the evidence to MN-03 for the editorial brief/script.
2. MN-03 prepares a complete video brief; Saksham approves it.
3. Only GA-03 writes or changes the animation source.
4. MN-01 may run tests/render the approved source but cannot edit the animation code. GitHub Actions creates the MP4.
5. MM-01 handles visual assets/QA; MN-04 prepares upload drafts.
6. Saksham approves any public upload.

All accounts use bounded 45-minute runs, at most two retries, and checkpoint before stopping. GitHub Actions is the coordinator, not another AI account. External actions require CEO approval.
