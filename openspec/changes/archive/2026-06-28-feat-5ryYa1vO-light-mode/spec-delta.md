---
change-id: feat-5ryYa1vO-light-mode
---

# Spec Delta

## Added

- Light mode CSS palette via `[data-theme="light"]` attribute on `<html>`.
- Theme toggle button in the app header (top-right).
- `isDark` state and `toggleTheme` handler in `App.jsx`.
- `Header` now accepts `isDark` and `onToggleTheme` props.

## Behaviour

- Default theme: dark (`:root` palette, no `data-theme` attribute).
- Light mode: set `data-theme="light"` on `document.documentElement`.
- No persistence — resets to dark on page reload.
