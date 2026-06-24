# Delta for Tasks capability

## ADDED Requirements

### Requirement: Task due dates
A task SHALL support an optional due date stored as an ISO `YYYY-MM-DD` string or null.

#### Scenario: Create with a due date
- GIVEN the create form
- WHEN the user picks a date and submits
- THEN the new task is stored with that `dueDate`

#### Scenario: Create without a due date
- GIVEN the create form with the date left empty
- WHEN the user submits
- THEN the task is stored with `dueDate` equal to null

#### Scenario: Reject malformed dates
- GIVEN a call to create or update a task
- WHEN `dueDate` is a non-empty value not matching `YYYY-MM-DD`
- THEN the operation throws a validation error and nothing is stored

### Requirement: Overdue indication
The board SHALL flag a task as overdue when its due date is strictly in the past and its
status is not `done`.

#### Scenario: Past-due active task
- GIVEN a task with a due date before today and status not done
- WHEN the board renders
- THEN the task shows a visible "Overdue" badge

#### Scenario: Past-due completed task
- GIVEN a task with a due date before today and status done
- WHEN the board renders
- THEN the task does NOT show an overdue badge

#### Scenario: Due today
- GIVEN a task whose due date is today and status not done
- WHEN the board renders
- THEN the task is NOT flagged overdue

### Requirement: Sort by due date
The board SHALL offer sorting by due date, soonest first, with undated tasks last.

#### Scenario: Ordering
- GIVEN tasks with due dates and some without
- WHEN the user selects "Sort: Due date"
- THEN tasks appear earliest-date first and undated tasks appear last
