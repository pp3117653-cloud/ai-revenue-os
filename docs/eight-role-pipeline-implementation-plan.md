# Eight-Role AI Revenue OS Pipeline — Implementation Plan

- **Prepared:** 2026-11-11
- **Repository:** `pp3117653-cloud/ai-revenue-os`
- **Status:** Plan only; no provider credentials were read or added.

## The architecture decision

There are two different ways to use the eight roles:

1. **API-driven runner — recommended for one local/GitHub pipeline.** A Node.js runner reads each role prompt and daily task, calls provider APIs, validates the result, and stores a run record. This creates eight *logical workers* across three provider APIs. It does not automatically mean that each call uses the exact consumer chat login called Google-1, Manus-2, and so on.
2. **Provider-native schedules.** Each of the eight signed-in accounts runs its own saved prompt and puts its result into GitHub. This can preserve the individual login accounts, but GitHub cannot orchestrate those schedules unless each provider exposes an API or event integration for that account.

The repository currently follows neither end-to-end route. Its GitHub coordinator checks repo files and creates a checkpoint; it does not launch models. The API path is feasible in principle: Google provides a Gemini API and JavaScript SDK; Manus exposes task creation and result retrieval; MiniMax offers an OpenAI-compatible text API. Those are separate API credentials and usage/billing paths from simply connecting chat accounts to GitHub. [1] [2] [3] [4]

**Recommended mapping:** GA-01, GA-02, and GA-03 use Gemini API calls with different role prompts; MN-01 through MN-04 use Manus API tasks with different role prompts; MM-01 uses MiniMax API. Initially, one provider key per provider can be used for its roles. For Manus, that means tasks run under the Manus account that owns that API key—not automatically under four separate Manus web-app logins. If using those exact four accounts is mandatory, verify that each account has API access and use separate credentials, or use their provider-native schedules instead.

No email-provider key is needed for the current rule: **create outreach drafts only; Saksham sends them manually.** Keep email-send, public-post, payment, contract, and client-production actions disabled.

## Current repo facts and blockers

- `agents/team.yaml` contains eight role definitions, role permissions, and two daily time slots per role.
- The coordinator schedule is now aligned to 09:15 and 21:15 Asia/Kolkata. Claude’s proposed plan, however, used one daily sequence beginning at 16:48 IST. Pick one cadence before enabling model calls; do not run both by accident.
- The attached 60-day table currently covers Days 1–36. Complete Days 37–60, then convert all 480 role/day cells into machine-readable task records and validate that there are exactly 60 × 8 unique tasks.
- The repo is public. Do not put private prospect contact data, client material, tokens, or confidential model outputs in it. Before using real lead data, either move operations to a private repo and publish only sanitized dashboard data, or keep this repo public and limit it to public-safe/synthetic content.
- The Actions secret-name listing could not be verified in this session. Treat provider credentials as **not yet verified**, not as confirmed missing or present.

## Step-by-step build sequence

### 1. Choose the execution identity, privacy boundary, and cadence

Record these three decisions in `briefs/pipeline-settings.md` before adding credentials:

- **Execution identity:** accept API-driven logical roles, or require the exact eight connected chat logins and use separate provider-native schedules.
- **Data boundary:** private operations repo, or public-safe-only data in the existing repo. Recommended for real prospect work: private operational storage, with a separate sanitized dashboard if it must remain public.
- **Cadence:** choose either the existing twice-daily staggered schedule or the proposed once-daily 16:48 IST sequence. Add a timezone explicitly and keep task IDs idempotent so a delayed/replayed schedule cannot duplicate work. GitHub schedule events run on the default branch and can be delayed under load, so treat the schedule as a trigger rather than a guaranteed exact-time execution service. [5]

### 2. Finish and validate the task plan

Save the normalized plan as `planning/day-plan.json` (or YAML), with one record per role per day:

`task_id`, `day`, `role_id`, `objective`, `inputs`, `dependencies`, `output_path`, `acceptance_checks`, `approval_required`, and `max_runtime_minutes`.

Use stable IDs such as `D01-GA-01`. Validate: days 1–60 exist for every role; there are 480 unique IDs; dependencies refer only to existing IDs; GA-03 is the only role allowed to edit animation source; GA-02 creates outreach drafts but cannot send; publishing and payment stay approval-gated. Do not start the scheduled pipeline while Days 37–60 are missing.

### 3. Add one shared local runner in Node.js

Keep the existing repository’s Node workflow and video QA tools. Add a small runner under `runner/` rather than duplicating automation logic inside GitHub Actions:

- `runner/src/cli.ts` — accepts `--day`, `--role`, `--dry-run`, and `--all`.
- `runner/src/orchestrator.ts` — loads team/task configuration, resolves dependencies, creates idempotency keys, invokes the chosen adapter, and records status.
- `runner/src/providers/gemini.ts`, `manus.ts`, and `minimax.ts` — isolated provider adapters.
- `runner/src/validate-result.ts` — validates model output against JSON Schema and role-specific path/action constraints.
- `runner/src/store.ts` — writes status and outputs.
- `.env.example` — names only, never values; add `.env.local` to `.gitignore` before creating it.

Target commands to implement are `npm run pipeline:validate`, `npm run pipeline:dry-run -- --day 1`, and `npm run pipeline:run -- --day 1 --role GA-01`. These commands do not exist until this runner is implemented.

Use a mock provider mode for tests so validation and handoffs can be proven without spending API credits. Save each output to `runs/YYYY-MM-DD/D01-GA-01/` with `result.json`, `result.md` or other declared deliverable, and a metadata record containing provider task/request ID, model ID, timestamps, status, retry count, and usage/cost fields when returned.

### 4. Implement provider adapters behind a common interface

Define one internal call contract, such as `runRole({role, task, inputs, limits}) -> {status, text, structuredOutput, providerRequestId, usage}`. Keep provider-specific authentication and response parsing out of the coordinator.

- **Gemini:** use the official `@google/genai` JavaScript SDK with `GEMINI_API_KEY`; use JSON-schema structured output where supported. The API key belongs to a Google AI Studio project. Its API billing and usage are separate from the consumer Google AI plan, and quotas apply at the project level. Set a model ID per role in config rather than hard-coding it into code. [1] [6]
- **Manus:** create a task through the Manus API using `MANUS_API_KEY` in the documented `x-manus-api-key` header, then retrieve progress/results through the task API. Manus task creation is asynchronous; the first version can use bounded polling with backoff and persist the Manus task ID if it does not finish before the runner timeout. A later production version can use Manus webhooks and a stable HTTPS receiver. [2] [7]
- **MiniMax:** use `MINIMAX_API_KEY` and the official OpenAI-compatible endpoint/client, with a configurable model ID. MiniMax documents its pay-as-you-go API key separately from its M Plan subscription key. Treat visual/image generation as a separate capability test; a text endpoint alone does not deliver thumbnail files. [3] [4]

Start with one short, harmless integration smoke test per provider. Add per-provider timeouts, one bounded retry for transient errors, `429` backoff, max output tokens, daily spend/task limits, and a circuit breaker. A missing secret must stop the run before any paid request.

### 5. Define output storage and review rules

Use `runs/` only inside private storage if outputs can include lead/client information. Each role writes only to its assigned path. A completed run should contain a short GitHub Actions summary and downloadable artifact bundle; code or media changes should go to a run branch and pull request, never directly to `main`.

Keep the authority boundaries in code as well as prompts:

- GA-03 alone may modify `content/video/src/`, and only for an approved brief.
- MN-01 may render/test animation source but may not edit it.
- GA-02 can write sourced, personalized outreach drafts but cannot send email.
- MN-04 can prepare upload packets but cannot publish.
- No automated payment, contract acceptance, cold Instagram DM, or client production-system mutation.

Do not expose secrets in logs or command-line arguments. Put local keys in `.env.local`; put CI keys in GitHub Actions Secrets or a restricted environment. GitHub documents encrypted repository/environment secrets and warns against printing or passing secrets through process command lines. [8]

### 6. Add GitHub Actions as a thin scheduled launcher

Create `.github/workflows/run-day.yml` that calls the same runner as local execution. It should:

1. Trigger manually for `day`/`role` smoke tests and on the chosen schedule.
2. Use a concurrency group so the same day/role cannot run twice simultaneously.
3. Use least-privilege `GITHUB_TOKEN`; start with `contents: read`. Grant `contents: write` only if a job must create a branch or pull request, and `issues: write` only if it must create a summary issue.
4. Read API credentials from Actions secrets; do not copy keys into repo files.
5. Validate the day-plan and role permissions before making any provider call.
6. Upload sanitized run artifacts and make the run URL/result location easy to find.
7. Fail visibly on missing credentials, malformed output, or provider errors. Never use `|| true` around required steps.

Because GitHub Actions schedules run from the default branch and may be delayed, retain `workflow_dispatch` for manual tests and an idempotency ledger for reruns. If exact minute-level timing or reliable webhooks become necessary, move the scheduler/receiver to a persistent service rather than relying on a cron runner alone. [5]

### 7. Test in stages before enabling the whole roster

1. **Offline test:** run schema validation and all provider adapters in mock mode. Confirm no network call, email, public post, payment, or model-cost event occurs.
2. **One call per provider:** run one low-cost test each for GA-01, MN-01, and MM-01. Check model IDs, returned usage, structured output, timeouts, and logs.
3. **One complete day, dry-run:** execute all eight role tasks for Day 1 with test fixtures and verify dependencies, uniqueness, file paths, and role boundaries.
4. **One complete day, live:** run Day 1 once with real APIs, review all eight outputs manually, and inspect model usage/cost dashboards.
5. **Small scheduled pilot:** enable one day at a time for several days. Keep retry caps and budget ceilings low. Review failures and outputs before enabling the next days.
6. **Full cycle:** only after acceptance checks pass, enable the selected schedule and all 60 days. Review the daily run summary; retain a manual pause/kill switch.

### 8. Definition of “working”

Call the pipeline operational only when one manual local run and one GitHub Actions run each complete all eight configured roles for the same test day; produce eight uniquely named validated results; record provider task IDs/status/usage; respect handoffs and role file permissions; prevent duplicate execution on rerun; and produce zero external sends/posts/payments. A green repository-check job alone is not an end-to-end model run.

## Credentials required for the recommended API route

Create these in the providers’ official developer/API settings, then put them in `.env.local` for local testing and GitHub Actions Secrets for CI:

- `GEMINI_API_KEY`
- `MANUS_API_KEY`
- `MINIMAX_API_KEY`

Do not paste the values into chat or commit them. API access and billing/quotas are provider-specific; verify model availability and costs in each provider console before enabling live runs. No email service key is required while the system only drafts messages.

## References

[1]: https://ai.google.dev/gemini-api/docs/quickstart?lang=node "Gemini API JavaScript quickstart"
[2]: https://open.manus.ai/docs/v2/introduction "Manus API introduction"
[3]: https://platform.minimax.io/docs/api-reference/api-overview "MiniMax API overview"
[4]: https://platform.minimax.io/docs/api-reference/text-openai-api "MiniMax OpenAI-compatible text API"
[5]: https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows "GitHub Actions workflow triggers and scheduled events"
[6]: https://ai.google.dev/gemini-api/docs/google-ai-plans "Google AI plans and Gemini API usage"
[7]: https://open.manus.ai/docs/v2/task.create "Manus asynchronous task creation"
[8]: https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions "GitHub Actions secret management"
