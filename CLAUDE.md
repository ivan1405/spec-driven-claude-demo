# Spec-Driven Ticket Workflow — Project Rules

This repo turns a **ticket** (Jira issue or Trello card) into a reviewed, tested **pull
request**, driven by OpenSpec and a small team of Claude Code subagents.

## The pipeline

```
/ticket <url>
   │
   ▼
[ tech-lead ] ── reads ticket via MCP ──► enough context?
   │                                         │
   │ NO  ──► post a comment on the ticket    │ YES
   │         asking the author for the        ▼
   │         missing details, tell the    creates an OpenSpec change
   │         user, and STOP.              (proposal + design + tasks + spec delta)
   │                                          │
   │                                          ▼
   │                                  routes to frontend-dev / backend-dev
   │                                          │
   │                                          ▼
   │                          implement → write tests → run them
   │                                          │
   │                                          ▼
   │                      create branch, commit, push, `gh pr create`
   │                                          │
   │                                          ▼
   │                   post PR link as a ticket comment + show it to the user
```

## Source of truth

The **OpenSpec change** is the source of truth for what gets built, not the chat.
Every ticket becomes a change folder under `openspec/changes/<change-id>/`. Code is
derived from `tasks.md`; reviewers read the spec delta, not just the diff.

## Ticket detection (Jira vs Trello)

Decide the provider from the URL, then use the matching MCP server:

- **Jira** — URL contains `atlassian.net` or looks like `.../browse/ABC-123`.
  Use the `atlassian` MCP tools. The ticket key is the `ABC-123` segment.
  - Read: `getJiraIssue` / search tools.
  - Comment back: the Atlassian "add comment to issue" tool.
- **Trello** — URL contains `trello.com/c/`.
  Use the `trello` MCP tools. The card id is the segment after `/c/`.
  - Read: `get_card` / `get_card_by_id`.
  - Comment back: `add_comment_to_card`.

Never guess the provider — if the URL matches neither, ask the user which it is.

## Definition of Ready (tech-lead gate)

A ticket has **enough context** only if all of these are answerable from the ticket
(title, description, comments, attachments, acceptance criteria):

1. **Goal** — what user-visible outcome is wanted, and why.
2. **Scope** — which screen/feature/endpoint changes; what is explicitly out of scope.
3. **Acceptance criteria** — at least one concrete, testable condition.
4. **Affected area** — enough to tell whether it is frontend, backend, or both.
5. **No blocking unknowns** — no "TBD", no contradictory requirements, no missing
   design/API that the work depends on.

If any of these cannot be answered, the ticket is **NOT READY**. Do not invent
requirements to fill the gap — that is exactly the failure mode this workflow prevents.

## When a ticket is NOT READY

1. Do **not** write code or create an OpenSpec change.
2. Post **one** comment on the ticket, addressed to the reporter, that:
   - says the work is blocked pending clarification,
   - lists the specific missing items as a short numbered list,
   - asks concrete questions (not "please clarify").
3. Tell the user in chat that you posted the comment, and paste what you asked.
4. Stop.

Comment template:

> 👋 Picking this up for implementation, but I'm blocked on a few details before I can
> start safely:
> 1. <missing item — concrete question>
> 2. <missing item — concrete question>
>
> Once these are confirmed I'll start work and link the PR here. — automated dev workflow

## When a ticket is READY

1. tech-lead creates the OpenSpec change and a **tech plan** that translates each
   requirement into concrete code changes (files, components, endpoints, data shape).
2. tech-lead tags the change `area: frontend | backend | fullstack`.
3. Route to `frontend-dev` and/or `backend-dev` per the tag.
4. Devs implement `tasks.md`, **write tests**, and run them. Tests must pass.
5. Create a branch `feature/<TICKET-KEY>-<slug>`, commit referencing the ticket key,
   push, and open a PR with `gh pr create`. The PR body links the ticket and summarizes
   the change.
6. Post the PR URL as a ticket comment and show it to the user.

PR-ready comment template:

> ✅ Implemented and opened a PR: <pr-url>
> - Summary: <one line>
> - Tests: <what was added / result>
> Ready for review. — automated dev workflow

## Conventions

- Branch: `feature/<TICKET-KEY>-<kebab-slug>` (e.g. `feature/ABC-123-add-due-dates`).
- Commit: `<TICKET-KEY>: <imperative summary>` (e.g. `ABC-123: add due date field to tasks`).
- The app under test lives in `playground/`. See `openspec/project.md` for stack details.
- Keep changes scoped to the ticket. If you discover unrelated issues, note them in the
  PR body — don't fix them silently.
- Never push to `main`. Always work on a feature branch and open a PR.
