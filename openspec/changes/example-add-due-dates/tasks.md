area: fullstack

# Tasks — Add due dates to tasks

## 1. Data layer (backend-dev)
- [ ] 1.1 Add `dueDate` to the task shape and `createTask`, with YYYY-MM-DD validation
- [ ] 1.2 Support patching `dueDate` in `updateTask`
- [ ] 1.3 Add `isOverdue(task, today)` helper
- [ ] 1.4 Add `sortByDueDate(tasks)` helper (nulls last, stable)
- [ ] 1.5 Unit tests for validation, `isOverdue`, and `sortByDueDate`

## 2. UI (frontend-dev)
- [ ] 2.1 Add a date input to `TaskForm`
- [ ] 2.2 Show due date + accessible "Overdue" badge in `TaskItem`
- [ ] 2.3 Add "Sort: Due date" to `FilterBar` and wire it in `App`
- [ ] 2.4 Component tests: submit a due date, overdue badge shows, done+past-due hides badge

## 3. Ship
- [ ] 3.1 `npm test` and `npm run build` pass in `playground/`
- [ ] 3.2 Open PR referencing DEMO-1 and comment the link back on the ticket
