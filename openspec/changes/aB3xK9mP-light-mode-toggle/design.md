# Tech Plan — Light Mode Toggle

## Overview

A small, self-contained client-only theming layer. Theme is a React state value in
`App.jsx` that drives a `data-theme` attribute on `document.documentElement`. All theme
work is done in CSS via custom-property overrides — no component restyling.

## CSS approach

File: `playground/src/index.css`

1. Keep the current `:root { ... }` block untouched. It represents the **dark** palette
   and is the default.
2. Add a new selector `:root[data-theme="light"] { ... }` that overrides **only the
   surface and ink variables**. Accent and priority hues are intentionally left alone so
   priority signaling stays consistent across themes.

Proposed light palette (paper-white surfaces, near-black ink, soft grey lines):

```css
:root[data-theme="light"] {
  --bg: #f7f7fb;        /* page background — was #131319 */
  --surface: #ffffff;   /* cards, header gradient top — was #1c1c26 */
  --surface-2: #eef0f6; /* nested surfaces, chips, ghost buttons — was #23232f */
  --line: #d8dae3;      /* borders / dividers — was #303040 */
  --ink: #1a1a26;       /* primary text — was #ececf2 */
  --muted: #5d6173;     /* secondary text — was #9595ab */
}
```

Rationale:
- `--bg` is the lightest non-white tone so cards (`--surface: #ffffff`) lift above the
  page. Mirrors the dark theme where `--bg` is darker than `--surface`.
- `--surface-2` stays slightly cooler than `--surface` so chips/ghost buttons read as a
  recessed layer, matching the dark-theme ordering (`bg < surface < surface-2` in
  perceived weight inversion).
- `--line` is a low-contrast neutral so borders don't dominate.
- `--muted` keeps a ~4.7:1 contrast ratio against `#f7f7fb` for accessible secondary text.
- `--ink` against `--surface` is ~16:1. Against `--bg` ~15:1.

The existing `.empty` rule uses a hard-coded `#56566b` and the `input::placeholder` uses
`#5d5d72`. These are dim grey on dark and would be acceptable on light but borderline; we
will leave them alone for this change (out of scope: "background surfaces and buttons
only") and note them in the PR body as a follow-up.

## Theme state

File: `playground/src/App.jsx`

Add a small hook `useTheme` colocated in `playground/src/hooks/useTheme.js` (new file, new
folder) so `App.jsx` stays focused:

```js
// playground/src/hooks/useTheme.js
import { useEffect, useState, useCallback } from "react";

const DARK = "dark";
const LIGHT = "light";

export function useTheme() {
  const [theme, setTheme] = useState(DARK);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === DARK ? LIGHT : DARK));
  }, []);

  return { theme, toggle };
}
```

Notes:
- Uses immutable update via setter — no direct mutation.
- No `localStorage` read/write per requirement: reloads reset to dark.
- The `useEffect` sets the attribute on mount with the initial `"dark"` value, which is a
  no-op visually but makes the attribute explicit so CSS selectors work consistently.

In `App.jsx`:
- Call `const { theme, toggle } = useTheme();`.
- Pass `theme` and `toggle` down to `Header` as props.

## Header & ThemeToggle component

Files:
- `playground/src/components/Header.jsx` — modified.
- `playground/src/components/ThemeToggle.jsx` — new.

`Header` accepts `theme` and `onToggleTheme`. It renders `<ThemeToggle theme={theme}
onToggle={onToggleTheme} />` inside `.masthead-inner` so the icon sits at the top-right of
the masthead row that currently holds the brand mark.

Layout change in `Header.jsx`: wrap the existing `.brand` + the new toggle in a flex row
so the toggle is pushed to the right. Keep `.masthead-sub` on its own line beneath. The
existing CSS for `.masthead-inner` is already `display: flex; flex-direction: column;
gap: 0.25rem;` — we add an inner row div for `.brand` + toggle.

`ThemeToggle.jsx`:

```jsx
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      className="btn ghost theme-toggle"
      aria-label={label}
      title={label}
      aria-pressed={!isDark}
      onClick={onToggle}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

Icons: inline SVG (no new dependency). 18px square, `currentColor` stroke so they pick up
`--muted` and the existing `.btn.ghost:hover` accent rule.

- `SunIcon`: a circle + 8 small rays.
- `MoonIcon`: a crescent (single `<path>` clipping a circle).

CSS additions to `index.css`:

```css
.masthead-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  line-height: 0;
}
```

The toggle reuses `.btn.ghost` so it picks up the existing focus ring and hover behavior
in both themes.

## Behavior contract

- `theme` is one of `"dark" | "light"`. No other values are valid.
- On mount, `document.documentElement` has `data-theme="dark"`.
- Clicking the toggle flips `data-theme` between `"dark"` and `"light"`.
- The icon shown is the **destination** theme: sun while in dark mode, moon while in
  light mode (so the button reads as "switch to X").
- The toggle is reachable by Tab (it's a `<button>`), and Enter/Space activate it.
- No persistence: a page reload resets to dark.

## Tests

New file `playground/src/components/ThemeToggle.test.jsx`:

- Clicking the toggle once sets `document.documentElement.getAttribute("data-theme")` to
  `"light"`.
- Clicking again sets it back to `"dark"`.
- The toggle exposes an accessible name ("Switch to light mode" initially).

The test renders `<App />` (not the bare toggle) so we exercise the wiring through
`useTheme` and the `data-theme` attribute on `documentElement`. Use
`@testing-library/react` `screen.getByRole("button", { name: /switch to light mode/i })`.

Reset between tests: `afterEach(() => document.documentElement.removeAttribute("data-theme"));`
in the file (or rely on jsdom isolation if tests run in their own document — confirm in
implementation).

## Out of scope

- Persisting theme across reloads.
- Reacting to `prefers-color-scheme`.
- Re-coloring priority badges, accent buttons, or the `.empty` / placeholder greys.
- Animating the theme transition.
