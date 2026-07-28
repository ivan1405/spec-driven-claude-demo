## Context

The task board (`demo/src/App.jsx`) renders a single light color scheme,
driven entirely by CSS custom properties declared once under `:root` in
`demo/src/index.css` (`--bg`, `--surface`, `--surface-2`, `--line`, `--ink`,
`--muted`, plus the priority accent colors). `Header.jsx` currently only
takes a `count` prop and has no interactive controls; it uses a plain text
brand-mark (`▟▙`) rather than any icon library. `package.json` has no icon
dependency (`react`/`react-dom` only), and CLAUDE.md's boundaries call for
stopping to ask before adding a new production dependency — so icons must be
hand-rolled, not imported.

## Goals / Non-Goals

**Goals:**
- A single toggle in the header switches the entire app between a light and
  dark palette, in-memory only, satisfying REQ-001 through REQ-006.
- Reuse the existing CSS-custom-property architecture — no per-component
  color logic.

**Non-Goals:**
- Persisting the theme (explicitly out of scope per the ticket — REQ-003).
- Respecting the OS/browser `prefers-color-scheme` setting — the ticket
  specifies light-by-default regardless of system preference.
- A general theming system (more than two themes, user-defined palettes).

## Decisions

**Theme state lives in `App.jsx`, not in the DOM or storage.**
`useState("light")` in `App`, passed down to `Header` as a `theme` prop plus
an `onToggle` handler. Rejected: reading `localStorage` on mount — would
violate REQ-003 (no persistence) the first time it was tempting to "improve"
it later, so keeping the state deliberately ephemeral (component state only)
makes non-persistence structural rather than a rule someone has to remember.

**Theme is applied via a `data-theme` attribute on the app's root element**
(`<div className="app" data-theme={theme}>`), with a `[data-theme="dark"]`
override block in `index.css` redefining the same custom properties already
used everywhere (`--bg`, `--surface`, `--surface-2`, `--line`, `--ink`,
`--muted`). Rejected: a second full stylesheet or a CSS-in-JS theme object —
the existing app already threads all color through these variables, so an
attribute-scoped override is the smallest change that reaches every consumer
(REQ-006) and needs no changes outside `index.css`.

**Icons are inline SVG components defined next to `Header.jsx`**, sized and
colored via `currentColor`/CSS so they follow the same palette variables.
Rejected: adding `lucide-react` or similar — introduces a new production
dependency for two glyphs, which CLAUDE.md's boundaries flag as something to
stop and ask about first; not worth it here.

**Accessibility:** the toggle is a real `<button>` with an `aria-label` that
states the action ("Switch to dark mode" / "Switch to light mode"), computed
from the *current* theme so it always describes what clicking it will do;
the icon itself is `aria-hidden`. This follows the repo's existing pattern in
`TaskItem.jsx`'s delete button and status `<select>`.

## Risks / Trade-offs

- **No persistence surprises returning users** (theme resets every reload) →
  Mitigation: this is an explicit, ticket-stated requirement (REQ-003), not
  an oversight; call it out in the PR description so it isn't "fixed" later
  without a spec change.
- **Hand-rolled dark palette could fail contrast guidelines** → Mitigation:
  pick dark values that keep the same relative contrast ratios as the
  existing light palette (task 4.1 in tasks.md), and spot-check with the
  browser's accessibility inspector before merging.

---
Approved-by: Ivan Perez <iperezfernande@expediagroup.com>
