area: frontend

# Tasks — Light Mode Toggle

## 1. CSS palette

- [x] 1.1 In `playground/src/index.css`, leave the existing `:root { ... }` block as the
      default dark palette. Do not change any current values.
- [x] 1.2 Add a new block `:root[data-theme="light"] { ... }` immediately after the
      `:root` block with these overrides only:
      ```css
      --bg: #f7f7fb;
      --surface: #ffffff;
      --surface-2: #eef0f6;
      --line: #d8dae3;
      --ink: #1a1a26;
      --muted: #5d6173;
      ```
      Do not override `--accent`, `--accent-ink`, `--p-low`, `--p-medium`, `--p-high`,
      `--radius`, `--mono`, or `--sans`.
- [x] 1.3 Add CSS rules for `.masthead-row` and `.theme-toggle` (see design.md "CSS
      additions"). Place them near the `/* ---- masthead ---- */` section.

## 2. Theme state

- [x] 2.1 Create `playground/src/hooks/useTheme.js` exporting a `useTheme` hook:
      - state initialized to `"dark"`,
      - `useEffect` sets `document.documentElement.setAttribute("data-theme", theme)`
        whenever `theme` changes,
      - returns `{ theme, toggle }` where `toggle` flips between `"dark"` and `"light"`
        using a functional `setTheme` (no mutation).
- [x] 2.2 In `playground/src/App.jsx`, call `useTheme()` and pass `theme` and `toggle` to
      `<Header>` as props (`theme`, `onToggleTheme`).

## 3. Components

- [x] 3.1 Create `playground/src/components/ThemeToggle.jsx`:
      - props: `theme` (`"dark" | "light"`), `onToggle` (function),
      - renders a `<button type="button" className="btn ghost theme-toggle">`,
      - `aria-label` and `title` reflect the destination theme:
        - in dark mode: "Switch to light mode",
        - in light mode: "Switch to dark mode",
      - `aria-pressed={theme === "light"}`,
      - shows an inline SVG sun icon in dark mode, moon icon in light mode,
      - icons are 18×18, `stroke="currentColor"`, `fill="none"` (sun) /
        `fill="currentColor"` (moon crescent), no external deps.
- [x] 3.2 Modify `playground/src/components/Header.jsx`:
      - accept `theme` and `onToggleTheme` props (keep existing `count`),
      - inside `.masthead-inner`, wrap `.brand` and `<ThemeToggle>` in a new
        `<div className="masthead-row">` so the icon sits on the right,
      - `.masthead-sub` remains directly below the row,
      - import `ThemeToggle` from `./ThemeToggle.jsx`.

## 4. Tests

- [x] 4.1 Create `playground/src/components/ThemeToggle.test.jsx`:
      - render `<App />`,
      - `afterEach` clears `data-theme` from `document.documentElement`,
      - test 1: button with accessible name `/switch to light mode/i` exists on initial
        render and `document.documentElement.getAttribute("data-theme") === "dark"`,
      - test 2: clicking the toggle once → `data-theme === "light"` and the button's
        accessible name becomes `/switch to dark mode/i`,
      - test 3: clicking again → `data-theme === "dark"`.
- [x] 4.2 Run `npm test` from `playground/` and confirm all tests pass (existing tests
      must continue to pass). Paste output in the PR.

## 5. Ship

- [ ] 5.1 Create branch `feature/cfXvuuHp-light-mode-toggle`.
- [ ] 5.2 Commit with message: `cfXvuuHp: add light/dark theme toggle in header`.
- [ ] 5.3 Push and open a PR with `gh pr create`. PR body links the Trello card and
      summarizes: new light palette, header toggle, no persistence, tests added.
