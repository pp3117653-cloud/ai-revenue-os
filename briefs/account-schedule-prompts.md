# Eight-account schedule setup
Use one account and one role per section. The active role, provider account, time, and timezone must match `agents/team.yaml` and `agents/account-map.md`. Paste the matching full role prompt from `briefs/master-prompts.md` into that account before creating its schedule.

## Schedule matrix
| Account | Role ID and name | Run times |
|---|---|---|
| Google-1 | GA-01 — Market and Offer Scout | 09:15 and 21:15 Asia/Kolkata |
| Google-2 | GA-02 — Pipeline Scout | 09:25 and 21:25 Asia/Kolkata |
| Google-3 | GA-03 — Audience and Editorial Desk | 09:35 and 21:35 Asia/Kolkata |
| Manus-1 | MN-01 — Automation and Demo Builder | 09:45 and 21:45 Asia/Kolkata |
| Manus-2 | MN-02 — Client Success Desk | 09:55 and 21:55 Asia/Kolkata |
| Manus-3 | MN-03 — Product Workshop | 10:05 and 22:05 Asia/Kolkata |
| Manus-4 | MN-04 — Distribution Analyst | 10:15 and 22:15 Asia/Kolkata |
| MiniMax-1 | MM-01 — Thumbnail and Visual QA | 10:25 and 22:25 Asia/Kolkata |

## Common schedule instructions
- Repository: `https://github.com/pp3117653-cloud/ai-revenue-os`
- Frequency: every 12 hours at the times assigned above.
- Do not create duplicate schedules. If the platform cannot schedule recurring runs, report that limitation instead of pretending a schedule exists.
- Read the current day and only your assigned open tasks.
- Work for one bounded run, no more than 45 minutes; retry no more than twice; checkpoint and stop. Mark blocked work with the exact reason.
- Never send outreach, publish content, charge/refund money, sign contracts, access client production, or delete data without explicit CEO approval.
- Never commit secrets, passwords, tokens, personal-data exports, or private client data.

## Dry-run confirmation
After creating the schedule, run one read-only dry run and report:
```text
ROLE_ID=<your role ID>
ACCOUNT=<Google-1|Google-2|Google-3|Manus-1|Manus-2|Manus-3|Manus-4|MiniMax-1>
REPOSITORY_ACCESS=connected|blocked
SCHEDULE=created|blocked
SCHEDULE_TIME=<time and timezone>
DRY_RUN=passed|failed|not_run
EXTERNAL_ACTIONS=approval_gated
LAST_CHECKPOINT=<GitHub Issue or commit URL>
BLOCKER=<none or exact reason>
```
There are eight accounts to configure, not twelve. The retired Claude accounts and their old schedules must be disabled; do not assign new work to their former role IDs.
