# Architecture

## Module map

```
.
├── .asdlc/policy.yaml     asdlc's gate configuration (which checks run, thresholds)
├── .github/workflows/     CI: agentic-sdlc.yml runs the spec/code gates on every PR
├── .claude/               agents, slash commands, and skills that drive the pipeline
│   ├── agents/            tech-lead, solutions-architect, frontend-dev, backend-dev,
│   │                      qa-engineer, security-engineer, technical-leader
│   └── commands/          /propose, /design, /implement, /jira-import, /archive, /verify, ...
├── openspec/              the spec layer (OpenSpec front-end, see asdlc's sdd: "openspec")
│   ├── config.yaml        OpenSpec project config (context/rules shown to agents)
│   ├── changes/           in-flight change folders: proposal.md, spec.md, design.md, tasks.md
│   │   └── archive/       changes that have been merged and folded into specs/
│   └── specs/             the living spec, one folder per capability, kept in sync with code
├── docs/practices/        the engineering-practice packs (boundary validation, TDD, etc.)
└── demo/                  the React + Vite task-board app the pipeline is exercised against
    ├── src/api/           the only module allowed to touch storage (tasks.js)
    ├── src/components/    presentational React components (Header, TaskForm, FilterBar, TaskItem)
    ├── src/App.jsx        wires api + components together, owns top-level state
    └── e2e/               Playwright specs, driven through the rendered UI only
```

## Domain concepts

- **Task** — `{ id, title, priority: low|medium|high, status: todo|doing|done, createdAt }`.
  The whole app's domain model; defined once in `demo/src/api/tasks.js` and never
  re-shaped downstream.
- **Change folder** (`openspec/changes/<change-id>/`) — the unit of work asdlc gates on:
  a proposal, a spec delta, a design, and a task list. One ticket becomes one change
  folder; it is archived into `openspec/specs/` once merged.
- **Capability** — a named slice of the spec (`openspec/specs/<capability>/`) mapped to
  source globs in `.asdlc/policy.yaml`'s `capabilities:` map. Currently unset — see the
  CONFIRM note below.

## How the pieces talk to each other

1. A ticket (Jira/Trello) arrives via `/ticket` (see the root `README.md`); the
   tech-lead agent reads it over MCP (`.mcp.json` → `atlassian`) and judges
   readiness against the Definition of Ready in `CLAUDE.md`.
2. If ready, `solutions-architect`/the `/design` flow drafts `design.md` inside a new
   `openspec/changes/<change-id>/` folder; a human must approve it before code is
   written (`CLAUDE.md` step 2).
3. `frontend-dev`/`backend-dev` implement `tasks.md` item by item against `demo/`,
   always through the api-layer boundary (`demo/src/api/tasks.js`) — components never
   read or write storage directly.
4. `qa-engineer` and the existing Vitest/Playwright suites verify the change;
   `asdlc verify` (wired into `.github/workflows/agentic-sdlc.yml`) is the gate a PR
   must pass.
5. Once merged, `/archive` folds the change's spec delta into `openspec/specs/`, so the
   living spec always reflects what `demo/` actually does.

## Why the Conventions in CLAUDE.md are the way they are

- **API-layer-only storage access** exists so the persistence mechanism
  (localStorage today) can be swapped for a real backend by changing one file —
  the comment at the top of `demo/src/api/tasks.js` states this as the design intent.
- **Validation lives in the api layer, not components** so every entry point
  (UI, a future HTTP handler, tests) gets the same guarantees for free instead of
  re-implementing checks per caller.
- **Accessible-first markup and role/label-based Playwright selectors** keep the
  UI and its tests coupled to user-facing semantics rather than incidental
  structure, so refactors that don't change behavior don't break tests.

<!-- CONFIRM: .asdlc/policy.yaml's source_globs (src/**, lib/**, app/**, internal/**,
     cmd/**) and the empty capabilities: map don't match this repo's actual layout,
     where source lives under demo/src/**. Confirm the intended capability
     boundaries (e.g. a single "task-board" capability over demo/src/**) before the
     drift gate is relied on — see the /onboard summary for a proposed diff. -->
