# Add due dates to tasks

## Why
Ticket **DEMO-1** ([Jira](https://your-domain.atlassian.net/browse/DEMO-1)) asks for due
dates so users can see what's time-sensitive. Today a task has no date, so the board can't
surface anything as urgent or overdue.

## What Changes
- A task can have an optional **due date**.
- The create form has a date input.
- A task card shows its due date, and visually flags **overdue** tasks (date in the past
  and status not `done`).
- Tasks can be sorted by due date (soonest first; tasks without a date sort last).
