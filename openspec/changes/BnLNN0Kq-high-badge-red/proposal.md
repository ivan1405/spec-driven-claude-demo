# Proposal: High-Priority Badge Color Change

## Why

The high-priority task badge (`.badge-high`) currently uses the warm-orange accent
(`--p-high: #ff7a5c`) shared with other UI surfaces. Users have reported that the
high-priority badge does not feel visually urgent enough — it reads as the same family
as the medium badge and the global app accent. The product owner wants the badge to
appear red so high-priority tasks are clearly distinguished at a glance.

Ticket: https://trello.com/c/BnLNN0Kq
Card ID: BnLNN0Kq

## What Changes

- The background color of `.badge-high` changes from `var(--p-high)` (orange `#ff7a5c`)
  to red (`#ef4444`).
- The change is scoped to the `.badge-high` selector only. The global `--p-high`
  custom property is **not** modified, so other surfaces that depend on it
  (`.task.priority-high` left border, `.field-error`, `.btn.ghost:hover`) keep their
  current orange treatment.
