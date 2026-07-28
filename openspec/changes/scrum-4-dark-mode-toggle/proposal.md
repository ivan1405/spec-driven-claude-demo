**Ticket:** SCRUM-4

## Why

The task board only renders in one light color scheme. Ticket
[SCRUM-4](https://ivanpf89.atlassian.net/browse/SCRUM-4) asks for a way to
switch to a dark appearance for users who prefer it, via a single header
control.

## What Changes

- Add a theme toggle button to the header, top-right, that switches the whole
  app between a light and a dark color scheme.
- The button shows a sun icon while light mode is active and a moon icon
  while dark mode is active.
- Light mode is the default on every load; the chosen theme is **not**
  persisted — a page refresh always returns to light mode.
- No new production dependency: icons are inline SVG, matching the existing
  brand-mark style in `Header.jsx` (the repo has no icon library installed).

## Capabilities

### New Capabilities
- `theme-toggle`: switching the task board's color theme between light and
  dark via a header control, session-only (no persistence across reload).

### Modified Capabilities
(none — no existing capability's requirements change; the task CRUD/filter
behavior itself is unaffected, only its color presentation)

## Impact

- `demo/src/components/Header.jsx` — add the toggle button and icons.
- `demo/src/App.jsx` — hold theme state (`useState`, default `"light"`),
  apply it to the root element.
- `demo/src/index.css` — add a `[data-theme="dark"]` override block for the
  existing CSS custom properties (`--bg`, `--surface`, `--ink`, etc.).
- Tests: `Header.test.jsx` (unit), `demo/e2e/task-board.spec.js` or a new e2e
  spec file (toggle + reload behavior).
