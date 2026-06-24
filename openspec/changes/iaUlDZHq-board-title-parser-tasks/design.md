# Design: Board Title Rename → Parser Tasks Board

## Affected files

| File | Line | Change |
|------|------|--------|
| `playground/index.html` | 6 | `<title>` text: `Spec Workflow · My Spec Driven Board` → `Spec Workflow · Parser Tasks Board` |
| `playground/src/components/Header.jsx` | 9 | `<span className="brand-name">` text: `My Spec Driven Board` → `Parser Tasks Board` |

## No data / API / state changes

Pure text-content change. No props, state, API calls, or data shape affected.

## Testing

Update `playground/src/components/Header.test.jsx` — the existing brand name assertion
must be updated from "My Spec Driven Board" to "Parser Tasks Board".
