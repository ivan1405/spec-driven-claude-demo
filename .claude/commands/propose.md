---
description: Turn an idea or ticket into a reviewed change folder (proposal + spec)
argument-hint: <change-id> [context, ticket link, or description]
---

Start a new change: $ARGUMENTS

Use the **spec-authoring** skill (`.asdlc/skills/spec-authoring/SKILL.md`). Read it now.

The paths below are asdlc's own artifact contract — its own thing,
independent of whatever SDD front-end (if any) `--sdd` also installed. See
`.asdlc/policy.yaml`'s `artifact_dirs` for exactly where they point in this repo.

Steps:
1. Read `CLAUDE.md` and `.asdlc/policy.yaml`. If the change touches an existing
   capability, read `openspec/specs/<capability>/spec.md` first.
2. Run `asdlc new <change-id>` to scaffold `openspec/changes/<change-id>/`.
3. **Interview me** before drafting. Ask the questions the skill lists. Do not
   guess at scope, and do not fill the template with plausible-sounding content.
4. Draft `proposal.md`, then `spec.md`. Requirements get stable REQ- IDs,
   SHALL statements, and Given/When/Then scenarios including failure paths.
   If `$ARGUMENTS` or the interview surfaced a Jira ticket, record its key/link
   in `proposal.md`'s `Ticket:` field — `/implement` uses it to sync that
   ticket back once a PR is raised. No ticket, leave it blank.
5. Run `asdlc verify --stage spec` and fix what it reports.
6. Stop. Show me the spec and wait. **Do not write design.md or any code yet.**
