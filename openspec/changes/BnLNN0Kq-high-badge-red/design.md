# Design: High-Priority Badge Color Change

## Scope

A single-selector CSS change. No JavaScript, no component, no API, and no data
changes are required. The DOM structure rendered by `TaskItem.jsx`
(`<span className="badge badge-high">`) is already correct.

## Affected files

| File | Selector | Change |
|------|----------|--------|
| `playground/src/index.css` | `.badge-high` (currently lines 281–283) | `background: var(--p-high);` → `background: #ef4444;` |

## Explicit non-changes

- `:root { --p-high: #ff7a5c; }` (line 14) — **must not change**. The CSS variable
  is still consumed by:
  - `.task.priority-high` (left border accent)
  - `.field-error` (form error text color)
  - `.btn.ghost:hover` (ghost button hover color)
  These surfaces are out of scope for this ticket and must keep their current orange
  appearance.
- `.badge-low`, `.badge-medium` — out of scope.
- `TaskItem.jsx` and any other JSX — no markup changes.

## Color choice

`#ef4444` (Tailwind `red-500`) — confirmed by the reporter. Sufficient contrast against
the white-ish badge text color (`var(--bg) = #131319`) is preserved because the
badge already uses dark ink on a saturated background.

## Testing

Add a Vitest + Testing Library test that:

1. Renders a `<TaskItem />` (or a minimal fixture containing `<span class="badge badge-high">`)
   with a task whose `priority` is `"high"`.
2. Asserts the rendered element has class `badge-high`.
3. Asserts the computed `background-color` resolves to red. Because jsdom returns the
   raw CSS value rather than a fully-resolved color, prefer asserting on either:
   - the inline/computed style string (`getComputedStyle(el).backgroundColor`) matching
     `rgb(239, 68, 68)` after loading `index.css`, or
   - a snapshot of the relevant CSS rule, or
   - the literal CSS source containing `.badge-high { background: #ef4444 }`.

The frontend-dev should pick whichever assertion is most reliable in the current
Vitest + jsdom setup. The intent of the test is to guard against the badge silently
reverting to `var(--p-high)`.

## Data / API / state

None.
