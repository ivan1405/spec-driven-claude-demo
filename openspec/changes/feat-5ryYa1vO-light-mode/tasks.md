---
change-id: feat-5ryYa1vO-light-mode
---

# Implementation Tasks

1. **CSS — add light theme variables** ✅
   - In `playground/src/index.css`, add `[data-theme="light"]` block with the palette from `design.md`.

2. **App.jsx — add theme state and toggle handler** ✅
   - Import `useState` from React.
   - Add `const [isDark, setIsDark] = useState(true)`.
   - Add handler: `function toggleTheme() { setIsDark(v => !v); document.documentElement.dataset.theme = isDark ? 'light' : ''; }` — note: when going light, set `data-theme="light"`; when going dark, remove the attribute (empty string removes it, or use `delete`).
   - Pass `isDark` and `onToggleTheme={toggleTheme}` to `<Header>`.

3. **Header.jsx — add toggle button** ✅
   - Accept `{ count, isDark, onToggleTheme }` props.
   - Add a `<button>` as the last child of `.masthead-inner`.
   - Label: `isDark ? '☀ Light' : '☾ Dark'` with `aria-label="Toggle colour theme"`.
   - Style: ghost button (transparent background, border: 1px solid var(--line), color: var(--muted), padding: 0.35rem 0.75rem, border-radius: var(--radius), cursor: pointer). Add `margin-left: auto` so it sits in the top-right.

4. **Header.test.jsx — write tests (TDD: write first, then implement)** ✅
   - Test 1: renders toggle button with label "☀ Light" when `isDark={true}`.
   - Test 2: renders toggle button with label "☾ Dark" when `isDark={false}`.
   - Test 3: clicking the button calls `onToggleTheme` once.

5. **Verify** ✅
   - Run `npm test` inside `playground/` — all tests must pass.
   - Run `npm run build` inside `playground/` — build must succeed with 0 errors.
