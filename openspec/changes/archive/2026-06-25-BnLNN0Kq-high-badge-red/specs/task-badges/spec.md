# Spec Delta: Task Badges

## ADDED Requirements

### Requirement: High-priority badge is visually red

The high-priority badge on task cards must use a red background so high-priority tasks
are clearly and immediately distinguishable from medium- and low-priority tasks and
from other orange-accented surfaces in the app.

#### Scenario: Badge for a high-priority task renders red

GIVEN a task whose `priority` is `"high"`
WHEN the task card is rendered
THEN the element with class `badge-high` has a background color of `#ef4444`
  (equivalent to `rgb(239, 68, 68)`)

#### Scenario: Global high-priority accent is unchanged

GIVEN the application stylesheet is loaded
WHEN any surface other than `.badge-high` consumes `var(--p-high)`
  (for example, the left border of `.task.priority-high`, `.field-error` text, or
  `.btn.ghost:hover`)
THEN that surface continues to resolve to the original orange accent (`#ff7a5c`)
