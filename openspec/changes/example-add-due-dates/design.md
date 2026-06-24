# Design — Add due dates to tasks

The tech plan: how each requirement maps to concrete code in `playground/`.

## Data layer — `src/api/tasks.js` (backend)
- Extend the task shape with `dueDate: string | null` (ISO `YYYY-MM-DD`, or `null`).
- `createTask({ title, priority, dueDate })`: accept and store `dueDate` (default `null`).
  Validate: if provided, must match `^\d{4}-\d{2}-\d{2}$`; otherwise throw
  `Error("dueDate must be YYYY-MM-DD")`.
- `updateTask(id, patch)`: allow patching `dueDate` with the same validation.
- Add `isOverdue(task, today = new Date())`: returns `true` when `dueDate` is set, parses
  to before `today` (date-only compare), and `task.status !== 'done'`.
- Add `sortByDueDate(tasks)`: ascending by `dueDate`; `null` dates sort last; stable.
- Migration: existing stored tasks without `dueDate` are read as `dueDate: null`.

## UI (frontend)
- `src/components/TaskForm.jsx`: add a labelled `<input type="date">` bound to form state;
  pass `dueDate` into the `createTask` call. Empty input → `null`.
- `src/components/TaskItem.jsx`: render the due date (formatted) when present. When
  `isOverdue(task)`, add an `is-overdue` class and a visible "Overdue" badge (not color
  alone — include the text badge for accessibility).
- `src/components/FilterBar.jsx`: add a "Sort: Due date" control; when active, App applies
  `sortByDueDate` before rendering.
- `App.jsx`: hold the sort mode in state; apply `sortByDueDate` when selected.

## Edge cases
- No due date set → no badge, sorts last, never "overdue".
- Due date is today → not overdue (only strictly-past dates are overdue).
- Completed task with a past due date → not overdue.

## Test plan
- api: validation pass/fail, `isOverdue` (past/today/future/done/null), `sortByDueDate`
  ordering incl. nulls-last.
- UI: form submits a due date; an overdue task shows the badge; a `done` past-due task does
  not.
