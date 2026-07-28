# spec-driven-claude-demo — Agent Context

<!--
This is the context contract: what spec-driven-claude-demo is, its stack, and the rules
agents must follow. Claude Code reads this file directly and never reads AGENTS.md — since no other selected tool needs a shared AGENTS.md hub, this is the one and only copy of this content.

Rules for maintaining it:
  - Commands and constraints first. Agents re-read those constantly.
  - Skip the architecture essay. It costs tokens and changes agent behaviour
    less than a precise "do not touch" list.
  - Pin versions. Unpinned, the agent writes whatever its training data favours.
  - If an agent gets something wrong twice, that is a bug in this file, not a
    model bug. Fix it here, not in your prompt.
-->

## What this is
spec-driven-claude-demo — a demo of a ticket-to-PR spec-driven workflow for
Claude Code. A tech-lead agent judges whether a Jira/Trello ticket is ready to
build; if so, it drafts an OpenSpec change (proposal + design + tasks + spec
delta), a frontend/backend agent implements it against `demo/`, and a PR is
opened and linked back to the ticket. `demo/` is the React + Vite task-board
app the pipeline is exercised against — a small in-browser task board
(create/update/delete/filter tasks) backed by localStorage.

## Stack (pinned)
React 18.3 + Vite 5.4, plain JS (no TypeScript). Vitest 2.0 + Testing Library
for unit/component tests, Playwright 1.62 for e2e. Node.js 20.19+ (per
README prerequisites). No linter or formatter is configured in this repo.

## Commands
```bash
cd demo
npm install                # install
npm run dev                # run (dev) — http://localhost:5173
npm test                   # test (Vitest) <- agents must run this before claiming done
npm run test:e2e           # Playwright e2e (starts the dev server itself)
# lint / format             — none configured
# typecheck                 — none (plain JS, no TS)
asdlc verify               # the gates. If this fails, the work is not done.
```

## The workflow you must follow
This repo uses a spec-first, gated workflow. Do not improvise around it.
The paths below are asdlc's own artifact contract (see `.asdlc/policy.yaml`'s `artifact_dirs`) — its own thing, independent of OpenSpec, which this repo also has installed. OpenSpec runs alongside this workflow, not instead of it; `asdlc verify` only ever checks the paths below.

1. **No code without a change folder.** Every change lives in
   `openspec/changes/<change-id>/` with proposal.md, spec.md, design.md, tasks.md.
   Create one with `asdlc new <change-id>` if it does not exist — or start from a
   Jira ticket with `/jira-import <ticket-key>`, which drafts the change (in the
   installed SDD's shape) and asks for clarification on the ticket if it's thin.
2. **Stop after design.md.** A human reviews and approves the design before you
   write implementation code. Do not skip ahead because the task seems obvious.
3. **Implement task by task**, ticking `tasks.md` as you go. Before the first
   commit, create a branch named after the change-id — implementation never
   commits or pushes directly to `main`/the default branch. One task, one
   logical commit, pushed to that branch. If a task turns out to need a
   decision that is not in the spec, stop and ask — do not infer.
4. **Tests reference requirement IDs.** Every test that covers REQ-00X must name
   `REQ-00X` in its name or docstring. The traceability gate enforces this.
5. **Run `asdlc verify` before opening a PR.** Red gates are not "mostly done".
6. **Update the living spec** in `openspec/specs/<capability>/` when behaviour
   changes. Stale specs are worse than no specs — you will read them next time.

## MCP servers
Project-scoped MCP servers live in `.mcp.json` (empty by default — most agent
tools that support MCP read this file). Run `asdlc mcp list` to see asdlc's
curated catalog (Jira/Confluence, GitHub, Slack, ...) and `asdlc mcp add
<name>` to wire one up; add only what this repo actually needs, and commit
the file so every agent gets the same servers. `/implement` picks these up
automatically once configured — opens the PR via a `github` server, and
syncs a linked Jira ticket via `atlassian`/`atlassian-self-hosted` — see
`/implement` for exactly what.

## Conventions
- The UI never touches storage directly — it only calls the functions
  exported by `demo/src/api/tasks.js` (`getTasks`/`createTask`/`updateTask`/
  `deleteTask`), which owns persistence (localStorage today). See the header
  comment in that file and its usage in `demo/src/App.jsx`.
- Validate and normalize inside the api layer, not the components: `createTask`
  trims the title and throws on an empty title or invalid priority;
  `updateTask` throws on an invalid status/priority and re-trims a changed
  title. Components only render the error message the api layer produced.
- Accessible-first markup: every input has a real `<label htmlFor>` (see
  `TaskForm.jsx`), and icon/action-only controls get an explicit `aria-label`
  or `sr-only` label (see the delete button and status `<select>` in
  `TaskItem.jsx`). Playwright tests assert against these roles/labels
  (`getByRole`, `getByLabel`), not test ids — see `demo/e2e/task-board.spec.js`.
- Tests are colocated with source (`Header.jsx` + `Header.test.jsx`,
  `tasks.js` + `tasks.test.js`), using Vitest + Testing Library for
  unit/component and Playwright for e2e under `demo/e2e/`.
- Deeper architecture, module map, rationale: [docs/architecture.md](docs/architecture.md).

## Practices

How code is written in this repo. Read the relevant one before you act — these are standards, not suggestions.

**Foundations**
- [Validate at the boundaries](docs/practices/boundary-validation.md) — Validate and parse untrusted input at system edges; trust internal code.
- [Clarify before coding](docs/practices/clarify-before-coding.md) — Surface assumptions and ask on ambiguity; be honest about uncertainty; check current docs.
- [Immutability](docs/practices/immutability.md) — Prefer new values over in-place mutation; mutation hides where state changed.
- [Small, focused units](docs/practices/small-units.md) — Small files and functions, low nesting, organized by feature; handle errors; no hardcoded values.
- [Surgical changes](docs/practices/surgical-changes.md) — Change only what the task requires; match existing style; don't clean up adjacent code.

**Testing & QA**
- [Evidence-based completion](docs/practices/evidence-based-completion.md) — No completion claim without fresh verification evidence you produced this run.
- [Test first](docs/practices/test-first.md) — Write the failing test first; RED to GREEN to REFACTOR; cover the failure paths.

**Security & Data**
- [Secure by default](docs/practices/secure-by-default.md) — Secrets in env vars; validate inputs; parameterize queries; check authz; don't leak errors.

**Product & Interface**
- [Accessibility](docs/practices/accessibility.md) — Semantic markup, keyboard operable, sufficient contrast, labelled controls, ARIA only when needed.

<!-- Claude Code auto-loads these: -->
@docs/practices/boundary-validation.md
@docs/practices/clarify-before-coding.md
@docs/practices/evidence-based-completion.md
@docs/practices/immutability.md
@docs/practices/secure-by-default.md
@docs/practices/small-units.md
@docs/practices/surgical-changes.md
@docs/practices/test-first.md
@docs/practices/accessibility.md

## Do not touch
- `demo/node_modules/`, `demo/package-lock.json` (generated — regenerate via
  `npm install`, don't hand-edit).
- `openspec/changes/archive/` — completed changes; folded into
  `openspec/specs/` and kept for history, not for editing in place.
- Anything under `infra/` or `**/migrations/` without an approved design.md.
- Secrets, `.env`, credentials. Never inline a credential, even in a test.

## Stop and ask a human when
- The spec is ambiguous or contradicts the code.
- The change would touch auth, payments, PII, a public API contract, or a data
  migration.
- You would need to add a new production dependency.
- The scope is growing beyond what `proposal.md` said was in scope.

## Boundaries
- Never commit or push directly to `main` (or the repo's default branch) —
  implementation always happens on a branch named after the change-id; open
  the PR yourself once tests pass, no need to ask first.
- Never force-push, never rewrite shared history, never merge your own PR.
- Never disable, skip, or weaken a test to make it pass. Fix the code or say
  the requirement is wrong.
- Never edit `.asdlc/policy.yaml` to make a gate pass.
