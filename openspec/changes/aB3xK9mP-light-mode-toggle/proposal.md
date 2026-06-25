## Why

Ticket: [Trello cfXvuuHp](https://trello.com/c/cfXvuuHp)

The task board currently only renders in dark mode. Users want a light-mode option so the
board is usable in bright environments and matches OS-level preferences when desired. The
goal is to exercise a light palette alongside the existing dark one and let the user flip
between them from the header.

## What Changes

- Add a light theme palette in `playground/src/index.css` activated by
  `:root[data-theme="light"]`. Existing dark palette stays the default on `:root`.
- Light/dark toggle changes only **background surfaces** and **buttons** (the variables
  `--bg`, `--surface`, `--surface-2`, `--line`, `--ink`, `--muted`). Priority/accent hues
  do not change.
- Add a `ThemeToggle` icon-only button (sun/moon SVG) in the top-right of the `Header`.
- Theme state lives in `App.jsx` (or a small `useTheme` hook). On toggle, the value of
  `data-theme` on `document.documentElement` flips between `"dark"` and `"light"`.
- Default theme is `"dark"`. **No persistence** — page reload resets to dark.
- Tests: clicking the toggle sets `data-theme="light"` on the root; clicking again returns
  it to `"dark"`. Toggle is keyboard-operable and has an accessible name.
