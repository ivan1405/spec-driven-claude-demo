---
change-id: feat-5ryYa1vO-light-mode
---

# Design

## Approach

Use a CSS `data-theme` attribute on `<html>` toggled by React state in `App.jsx`.
Light mode overrides the `:root` CSS variables under `[data-theme="light"]`.

## Light Mode Palette

```css
[data-theme="light"] {
  --bg: #f4f4f8;
  --surface: #ffffff;
  --surface-2: #eaeaf0;
  --line: #d0d0de;
  --ink: #1a1a26;
  --muted: #6b6b80;
  --accent: #e05a40;
  --accent-ink: #ffffff;
  --p-low: #1a9e93;
  --p-medium: #c98a00;
  --p-high: #e05a40;
}
```

## Files Changed

### `playground/src/index.css`
- Add `[data-theme="light"]` block with the light palette above.

### `playground/src/App.jsx`
- Add `isDark` boolean state (default `true`).
- On toggle: flip state, set `document.documentElement.dataset.theme` to `"light"` or remove the attribute (dark is the `:root` default).
- Pass `isDark` and `onToggleTheme` props to `<Header>`.

### `playground/src/components/Header.jsx`
- Accept `isDark` and `onToggleTheme` props.
- Render a `<button>` in the top-right of `.masthead-inner` (use `margin-left: auto` / flexbox).
- Button label: `☀ Light` / `☾ Dark` (or sun/moon emoji) with `aria-label`.
- Minimal styling: ghost button that inherits the current theme colors.

### `playground/src/components/Header.test.jsx`
- Test: button renders with correct label in dark mode.
- Test: clicking button calls `onToggleTheme`.
- Test: button label flips when `isDark` changes.
