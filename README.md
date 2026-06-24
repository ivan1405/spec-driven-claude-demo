# Spec-Driven Claude Code — Ticket → PR

Give Claude Code a **Jira issue or Trello card URL** and it will:

1. **Read the ticket** over MCP.
2. **Tech-lead agent** judges whether there's enough context to build.
   - **Missing context →** it posts a comment on the ticket asking the reporter the
     specific questions, tells you, and stops.
   - **Enough context →** it writes an **OpenSpec change** (proposal + tech plan + tasks +
     spec delta) translating the ticket into concrete code changes.
3. A **frontend** and/or **backend** agent implements the change and **writes tests**.
4. It opens a **PR** (`gh`) and posts the PR link back as a **ticket comment** + shows it
   to you.

A small **React playground** (`playground/`) is included so you can file real tickets
against it and watch the loop run.

```
/ticket https://your.atlassian.net/browse/ABC-123
/ticket https://trello.com/c/AbCdEf…
```

---

## What's in here

```
.
├── .mcp.json                     # Jira (Atlassian Rovo) + Trello MCP servers
├── .env.example                  # Trello creds (Jira uses OAuth, GitHub uses gh)
├── CLAUDE.md                     # the workflow rules every agent follows
├── .claude/
│   ├── settings.json             # enables project MCP servers + scoped permissions
│   ├── agents/
│   │   ├── tech-lead.md          # the gatekeeper (Definition of Ready)
│   │   ├── frontend-dev.md       # implements UI + tests
│   │   └── backend-dev.md        # implements data layer + tests
│   └── commands/
│       ├── ticket.md             # /ticket <url> — the orchestrator
│       └── changes.md            # /changes — list in-flight work
├── openspec/
│   ├── project.md                # stack + conventions OpenSpec reads
│   └── changes/
│       └── example-add-due-dates/  # a worked example of what tech-lead produces
└── playground/                   # React + Vite task board (the app under development)
```

---

## Prerequisites

- **Claude Code** installed (`npm i -g @anthropic-ai/claude-code`, then `claude`).
- **Node.js 20.19+** (required by OpenSpec and Vite).
- **`gh` CLI** authenticated (`gh auth login`) for opening PRs.
- A **Jira Cloud** site and/or a **Trello** account.
- This folder pushed to a **GitHub repo** (PRs are opened against it).

---

## Setup (about 5 minutes)

### 1. OpenSpec
```bash
npm install -g @fission-ai/openspec@latest
cd <this-folder>
openspec init --tools claude      # adds the /opsx:* commands + AGENTS.md
```
`openspec init` adds its own slash commands alongside the files here; it won't clobber the
provided `openspec/project.md` or the example change. The `/ticket` workflow uses the
OpenSpec **change format** as its source of truth, so this step is what makes the pipeline
"spec-driven."

### 2. Trello credentials (skip if Jira-only)
Copy `.env.example` → `.env` and fill in:
```bash
cp .env.example .env
```
- Get a key + token at <https://trello.com/power-ups/admin> (create a Power-Up → **API
  key** → generate a **token** with `read,write` scope).
- Claude Code reads `.env` for the Trello MCP server defined in `.mcp.json`.

### 3. Jira — nothing to paste
The Atlassian Rovo MCP server uses **interactive OAuth**. The first time you start Claude
Code in this folder, a browser opens to approve access to your site. Claude only ever sees
what your account can see.

> **Note:** the legacy `/sse` Atlassian endpoint is being retired after **June 30, 2026**.
> `.mcp.json` already points at the current `/mcp` endpoint via `mcp-remote`.

### 4. Start Claude Code and trust the servers
```bash
claude
```
On first run, approve the project MCP servers (`atlassian`, `trello`) when prompted, then
run `/mcp` to confirm both show **connected**.

### 5. Run the playground
```bash
cd playground
npm install
npm run dev      # open the printed localhost URL
npm test         # Vitest — should pass out of the box
```

---

## Using it

1. Create a ticket that targets the playground, e.g. *"Add a due date field to tasks and
   flag overdue ones."*
2. In Claude Code:
   ```
   /ticket <paste the Jira or Trello URL>
   ```
3. Watch the pipeline:
   - tech-lead reads the ticket + code and decides READY / NEEDS_CLARIFICATION.
   - If clarification is needed, check your ticket — there's a comment with questions.
     Answer them, then run `/ticket <url>` again.
   - If ready, an OpenSpec change appears under `openspec/changes/`, a dev agent
     implements + tests it, and a PR is opened with the link commented back on the ticket.
4. `/changes` shows what's in flight. After a PR merges, `openspec archive <change-id>`
   folds the spec delta into `openspec/specs/`.

### Try the failure path on purpose
File a deliberately vague ticket (*"make the board better"*). The tech-lead should refuse
to build and instead comment asking what "better" means — that gate is the whole point.

---

## How the pieces fit

- **OpenSpec** is the spec layer. Every ticket becomes one change folder; `design.md` is
  the tech plan, `tasks.md` drives implementation, the spec delta drives review and tests.
- **Subagents** (`.claude/agents/`) are separate Claude instances with their own context
  and scoped tools, so the tech-lead's judgment doesn't bleed into implementation.
- **MCP** is how Claude reads/writes tickets: the official Atlassian Rovo server for Jira,
  the `@delorenj/mcp-server-trello` server for Trello.
- **`gh`** opens the PR; the PR URL is captured and posted back to the ticket.

Provider detection, the Definition of Ready, comment templates, and branch/commit/PR
conventions all live in `CLAUDE.md` — edit that file to tune the behavior.

---

## Customizing

- **Different stack?** Replace `playground/` and update `openspec/project.md` with your
  conventions. The agents read it before planning and implementing.
- **Stricter/looser gate?** Edit the Definition of Ready in `CLAUDE.md` and `tech-lead.md`.
- **Add a QA agent / extra reviewer?** Drop another file in `.claude/agents/` and reference
  it from `commands/ticket.md`.
- **Self-hosted Jira (Server/DC)?** The Rovo MCP server is Cloud-only — use a
  Jira-Data-Center MCP server instead and swap the `atlassian` entry in `.mcp.json`.

---

## Troubleshooting

- **MCP not connected:** run `/mcp`. For Trello, confirm `.env` has a valid key+token. For
  Jira, re-run the OAuth flow (it may have expired).
- **Jira OAuth keeps dropping:** as a fallback, switch to API-token auth — see the
  Atlassian MCP server README; the alternative is the `acli` CLI driven via a Claude skill.
- **`gh` errors:** run `gh auth login` and `gh repo view` to confirm the remote.
- **OpenSpec commands missing:** restart Claude Code after `openspec init` (slash commands
  load at startup), or run `openspec update`.
- **Tests fail in CI but pass locally:** make sure Node is 20.19+.

---

*Tools referenced: [OpenSpec](https://github.com/Fission-AI/OpenSpec),
[Atlassian Rovo MCP](https://github.com/atlassian/atlassian-mcp-server),
[mcp-server-trello](https://github.com/delorenj/mcp-server-trello). These are third-party/
official integrations that evolve — check their docs if a flag or endpoint has moved.*
