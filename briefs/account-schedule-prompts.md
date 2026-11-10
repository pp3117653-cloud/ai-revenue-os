# Eight-account schedule setup
Use one account per role and paste its exact matching prompt from `briefs/master-prompts.md`. Match `agents/team.yaml` and `agents/account-map.md` exactly.

| Account | Role | Schedule |
|---|---|---|
| Google-1 | GA-01 — Market and Offer Scout | 09:15 and 21:15 Asia/Kolkata |
| Google-2 | GA-02 — Pipeline and Audience Researcher | 09:25 and 21:25 Asia/Kolkata |
| Google-3 | GA-03 — Gemini Argon Motion Code Lab; sole animation-code author | 09:35 and 21:35 Asia/Kolkata |
| Manus-1 | MN-01 — Automation and Demo Builder | 09:45 and 21:45 Asia/Kolkata |
| Manus-2 | MN-02 — Client Success Desk | 09:55 and 21:55 Asia/Kolkata |
| Manus-3 | MN-03 — Editorial and Product Workshop | 10:05 and 22:05 Asia/Kolkata |
| Manus-4 | MN-04 — Distribution Analyst | 10:15 and 22:15 Asia/Kolkata |
| MiniMax-1 | MM-01 — Thumbnail and Visual QA | 10:25 and 22:25 Asia/Kolkata |

Each run is limited to 45 minutes, with at most two retries. Save a checkpoint and stop. Report blockers. Do not send outreach, publish, charge/refund, sign contracts, access client production, or delete data without CEO approval. Never commit secrets or private client data.

**Video code restriction:** only Google-3 / GA-03 may write or modify animation code. All other accounts are explicitly unauthorized to do so.

After a read-only dry run, report:
```text
ROLE_ID=<role ID>
ACCOUNT=<provider account>
REPOSITORY_ACCESS=connected|blocked
SCHEDULE=created|blocked
SCHEDULE_TIME=<time and timezone>
DRY_RUN=passed|failed|not_run
ANIMATION_CODE_AUTHOR=yes for GA-03; no for all others
EXTERNAL_ACTIONS=approval_gated
LAST_CHECKPOINT=<GitHub Issue or commit URL>
BLOCKER=<none or exact reason>
```
Disable any old Claude schedules manually in Claude; repository edits cannot cancel schedules stored there.
