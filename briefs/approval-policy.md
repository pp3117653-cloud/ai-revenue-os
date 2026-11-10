# Approval policy

Automatic without owner approval: research, drafts, synthetic-data tests, repository commits, internal metrics, and reports.

Owner approval required: cold outreach sends, email campaigns, social publishing, client access, production mutations, claims about results, contracts, payments, refunds, deletion, public launches, and any uncertain legal/privacy/copyright action.

A task may be marked complete only with an artifact link, reviewer sign-off, acceptance-test results, and an audit record. A failed task is requeued at most twice. Then it becomes `blocked` with a reason and owner decision request.

Emergency kill switches should independently disable: outreach, publishing, payments, client production writes, and all scheduled runs.
