## 1. Theme state & toggle control (REQ-001, REQ-002, REQ-004)

- [x] 1.1 Write failing tests: toggle renders in the header with an
      accessible name (REQ-001); app is in light mode on first render
      (REQ-002)
- [x] 1.2 Add theme state (`useState("light")`) to `App.jsx`; pass `theme`
      and a toggle handler down to `Header`
- [x] 1.3 Add the toggle `<button>` to `Header.jsx`, wired to flip the theme
      on click, so 1.1's tests pass (REQ-004)

## 2. Icon swap (REQ-005)

- [x] 2.1 Write a failing test asserting the sun icon is shown in light mode
      and the moon icon is shown in dark mode
- [x] 2.2 Add inline SVG sun/moon icon components next to `Header.jsx`;
      render the one matching the active theme, `aria-hidden`, so 2.1 passes

## 3. No persistence (REQ-003)

- [x] 3.1 Write a failing test: switch to dark mode, remount `App` (simulating
      a reload), assert light mode is active again
- [x] 3.2 Confirm the implementation never reads/writes `localStorage`,
      `sessionStorage`, or cookies for theme; 3.1 passes because state is
      plain in-memory `useState`

## 4. Dark theme styling (REQ-006)

- [ ] 4.1 Add a `[data-theme="dark"]` override block in `index.css` for
      `--bg`, `--surface`, `--surface-2`, `--line`, `--ink`, `--muted`,
      keeping contrast ratios comparable to the light palette
- [ ] 4.2 Apply the `data-theme` attribute to the app's root element from
      `App.jsx` state
- [ ] 4.3 Run the existing Vitest suite (task create/update/delete/filter)
      unchanged and confirm it still passes with dark mode active — no
      functional regression from the theme change

## 5. E2E & verification

- [ ] 5.1 Extend Playwright e2e coverage: clicking the toggle switches the
      theme and the icon, and a reload after switching resets to light mode
- [ ] 5.2 Run `npm test`, `npm run test:e2e`, and `asdlc verify`; fix
      anything reported before opening the PR
