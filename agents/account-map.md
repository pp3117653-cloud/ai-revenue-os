# Final account assignment map
Owner: Saksham
Repository: https://github.com/pp3117653-cloud/ai-revenue-os
Timezone: Asia/Kolkata

This operating system uses **8 AI accounts total**: 3 Google AI, 4 Manus, and 1 MiniMax. Claude accounts and their separate schedules are removed. Former strategy, editorial, architecture, and coded-video responsibilities are reassigned below.

Use these labels in your own password manager. Never share credentials between accounts.

## Google AI — 3 accounts

### Google-1 — Market and Offer Scout (GA-01)
Owns ICP and market research, recurring pains, buying signals, competitors, cited evidence, offer positioning, scope, pricing hypotheses, proof plans, and objections.

Schedule: **09:15 and 21:15 Asia/Kolkata**.

### Google-2 — Pipeline Scout (GA-02)
Owns permitted prospect research, fit scoring, public business contact/source records, suppression checks, and personalized outreach drafts. It never sends outreach.

Schedule: **09:25 and 21:25 Asia/Kolkata**.

### Google-3 — Audience and Editorial Desk (GA-03)
Owns audience and search-demand research, content themes/calendar, long-form drafts, scripts, video briefs, hooks, and calls to action. Factual claims require sources or explicit labeling as opinion/example/hypothesis.

Schedule: **09:35 and 21:35 Asia/Kolkata**.

## Manus — 4 accounts

### Manus-1 — Automation and Demo Builder (MN-01)
Owns safe workflow architecture, synthetic-data demos, tests, implementation documentation, and the former Motion Code Lab work: deterministic HTML/CSS/JavaScript/SVG/Canvas animation source, captions, metadata, render instructions, and video QA records. GitHub Actions renders code-generated videos. This role does not use a video-generation model and does not publish.

Schedule: **09:45 and 21:45 Asia/Kolkata**.

### Manus-2 — Client Success Desk (MN-02)
Owns discovery preparation, proposals, onboarding, delivery QA, handoff documents, renewal/referral drafts, and review of B2B lead records.

Schedule: **09:55 and 21:55 Asia/Kolkata**.

### Manus-3 — Product Workshop (MN-03)
Owns digital product templates, SOPs, checklists, mini-courses, sales-page drafts, delivery instructions, and support FAQs.

Schedule: **10:05 and 22:05 Asia/Kolkata**.

### Manus-4 — Distribution Analyst (MN-04)
Owns platform packaging, publishing drafts, analytics summaries, experiment tracking, and distribution recommendations. All publishing remains CEO-approved.

Schedule: **10:15 and 22:15 Asia/Kolkata**.

## MiniMax — 1 account

### MiniMax-1 — Thumbnail and Visual QA (MM-01)
Owns thumbnails, poster frames, diagrams, alt text, visual packaging, rights notes, and QA. It supports but does not generate the underlying code-animated video or publish it.

Schedule: **10:25 and 22:25 Asia/Kolkata**.

## Operating safeguards

All eight accounts work in bounded runs of at most 45 minutes, retry a task no more than twice, save a checkpoint, and stop. If blocked, they record the exact reason rather than looping. GitHub Actions is the coordinator, not an additional AI account. External actions remain CEO-approved, including outreach, publishing, client production access, contracts, and payments.

## Connection order

Connect Google-1 through Google-3, then Manus-1 through Manus-4, then MiniMax-1. For each account, use the matching prompt in `briefs/master-prompts.md`, create its assigned recurring schedule, and run a read-only dry run. Enable external-action connectors only after all eight dry runs pass and the owner explicitly approves.
