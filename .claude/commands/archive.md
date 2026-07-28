---
description: Fold a merged change into the living spec and archive it
argument-hint: <change-id>
---

Archive the merged change: $ARGUMENTS

Use the **drift-reconciliation** skill. Confirm the change is merged to main
first. Best suited to **solutions-architect** if your tool supports subagent
delegation — folding a delta into the living spec is a spec-accuracy task,
the same kind of judgment call it already makes when drafting one.

1. Fold the delta into `openspec/specs/<capability>/spec.md`:
   ADDED → append (keep IDs) · MODIFIED → replace in place (keep IDs) → REMOVED → delete and record why.
2. Confirm any ADR is in `docs/adr/` with status `accepted`. ADRs outlive the
   change folder — that reasoning is what the next agent will need.
3. Move the folder to `openspec/changes/archive/<YYYY-MM-DD>-<change-id>/`.
4. Run `asdlc verify` on the result.
