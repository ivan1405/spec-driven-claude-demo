---
description: Take a Jira issue or Trello card from URL to a tested pull request, gated by a tech-lead review.
argument-hint: <jira-or-trello-ticket-url>
allowed-tools: Read, Grep, Glob, Edit, Write, Bash, mcp__atlassian, mcp__trello, Task
---

You are the **orchestrator** for the spec-driven ticket workflow. Follow CLAUDE.md.

Ticket URL: **$1**

If `$1` is empty, ask the user for a Jira or Trello ticket URL and stop.

**Detect the provider now, before doing anything else:**
- If `$1` contains `trello.com/c/` → `PROVIDER=trello`, MCP tools: `mcp__trello__*`
- If `$1` contains `atlassian.net` or `/browse/` → `PROVIDER=jira`, MCP tools: `mcp__atlassian__*`
- Otherwise → ask the user which provider it is and stop.

Run the pipeline below. Narrate each step briefly so the user can follow along.

## Step 1 — Tech-lead review (gate)
Use the **tech-lead** subagent. Pass it the ticket URL **and explicitly state the
detected `PROVIDER`** so it uses the correct MCP tools without having to re-detect.
Ask it to read the ticket, read `playground/`, apply the Definition of Ready, and return a verdict.

## Step 2 — Branch on the verdict

**If `VERDICT: NEEDS_CLARIFICATION`:**
- Confirm the tech-lead posted the clarifying comment on the ticket. If it didn't, post
  it now (Jira add-comment / Trello `add_comment_to_card`) using the CLAUDE.md template.
- Show the user the questions that were asked and the ticket link.
- **Stop here.** Do not write code.

**If `VERDICT: READY`:**
- Confirm the OpenSpec change exists at `openspec/changes/<change-id>/`.
- Continue to Step 3.

## Step 3 — Implement
Based on `AREA`:
- `frontend` → use the **frontend-dev** subagent.
- `backend` → use the **backend-dev** subagent.
- `fullstack` → use **backend-dev** first (settle the data/api contract), then
  **frontend-dev**.

Give each dev subagent the change id. Require that tests are written and **pass** and the
build succeeds before moving on. If a dev reports it cannot make tests pass, stop and
report to the user — do not open a PR for failing work.

## Step 4 — Pull request
Once all dev work is green:
1. `cd playground` checks are done; from repo root create the branch
   `feature/<TICKET-KEY>-<slug>` (derive `<slug>` from the change id).
2. Stage and commit: `<TICKET-KEY>: <imperative summary>`.
3. Push the branch. (This may prompt per settings.json — that's expected.)
4. Open the PR:
   ```
   gh pr create --title "<TICKET-KEY>: <summary>" \
     --body "<summary>\n\nTicket: <ticket-url>\nChange: openspec/changes/<change-id>\n\n## What changed\n- ...\n\n## Tests\n- ..."
   ```
5. Capture the PR URL from the command output.

If `gh` isn't authenticated, tell the user to run `gh auth login` and stop before pushing.

## Step 5 — Close the loop
1. Post a comment on the **same** ticket (same provider) with the PR link, using the
   PR-ready template in CLAUDE.md.
2. Show the user: the PR URL, the change folder, the tests added, and a one-line summary.
3. Optionally suggest `openspec archive <change-id>` once the PR is merged.

## Guardrails
- Never skip the tech-lead gate.
- Never push to `main`; always a feature branch + PR.
- One ticket → one OpenSpec change → one PR.
- If anything fails mid-pipeline, stop and report exactly where and why.
