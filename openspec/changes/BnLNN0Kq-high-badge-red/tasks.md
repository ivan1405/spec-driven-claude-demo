area: frontend

# Tasks: High-Priority Badge Color Change

## Frontend

- [x] 1.1 In `playground/src/index.css`, update the `.badge-high` rule so its
       `background` is `#ef4444` (replacing `var(--p-high)`). Do **not** modify
       `--p-high` in `:root`, and do **not** touch `.badge-low` or `.badge-medium`.

## Tests

- [x] 2.1 Add a test (e.g. `playground/src/components/TaskItem.test.jsx` or a dedicated
       CSS test file) that asserts `.badge-high` resolves to a red background
       (`#ef4444` / `rgb(239, 68, 68)`). The test must fail if the rule reverts to
       `var(--p-high)`.
- [x] 2.2 Run `npm test` in `playground/` and confirm all tests pass.

## PR

- [ ] 3.1 Create branch `feature/BnLNN0Kq-high-badge-red`, commit with message
       `BnLNN0Kq: change high-priority badge background to red`, push, and open a PR
       with `gh pr create`. Post the PR URL back to the Trello card.
