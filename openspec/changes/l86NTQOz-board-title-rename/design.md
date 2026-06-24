# Design: Board Title Rename

## Affected files

| File | Line | Change |
|------|------|--------|
| `playground/index.html` | 6 | `<title>` text: `Spec Workflow · Task Board` → `Spec Workflow · My Spec Driven Board` |
| `playground/src/components/Header.jsx` | 9 | `<span className="brand-name">` text: `Task Board` → `My Spec Driven Board` |

## No data / API / state changes

This is a pure text-content change. No props, state, API calls, or data shape is affected.

## Testing

Update the existing component snapshot / text-assertion test for `Header.jsx` if one
exists. If not, add a test that renders `<Header />` and asserts the brand name text equals
"My Spec Driven Board".
