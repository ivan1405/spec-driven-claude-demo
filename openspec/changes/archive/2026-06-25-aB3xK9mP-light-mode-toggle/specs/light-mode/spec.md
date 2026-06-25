# Capability: light-mode

The task board supports two visual themes — dark (default) and light — selectable from a
single icon button in the header. The selected theme controls background, surface, line,
ink, and muted colors. Priority/accent hues are theme-independent.

## ADDED Requirements

### Requirement: Default theme is dark

The application MUST render in dark mode on initial load.

#### Scenario: First load applies dark theme

- **GIVEN** the user opens the application for the first time (or after a page reload)
- **WHEN** the application finishes mounting
- **THEN** `document.documentElement` has `data-theme="dark"`
- **AND** the page background uses the dark `--bg` value.

### Requirement: Theme toggle is present in the header

The header MUST contain a single icon-only button that toggles between dark and light
themes. The button MUST have an accessible name and be reachable via keyboard.

#### Scenario: Toggle is rendered on the right of the masthead

- **GIVEN** the application is mounted
- **WHEN** the header is rendered
- **THEN** there is a `<button>` element inside the masthead with an accessible name
  matching `/switch to (light|dark) mode/i`
- **AND** the button is positioned at the right side of the brand row.

#### Scenario: Toggle is keyboard-operable

- **GIVEN** the toggle is rendered
- **WHEN** the user focuses it with Tab and presses Enter (or Space)
- **THEN** the theme flips, identically to a mouse click.

### Requirement: Clicking the toggle flips the theme

Clicking the toggle MUST switch `data-theme` on `document.documentElement` between
`"dark"` and `"light"`. The visible background and button surfaces MUST update to reflect
the new theme on the next paint.

#### Scenario: Dark → light

- **GIVEN** `data-theme="dark"` on `document.documentElement`
- **WHEN** the user clicks the theme toggle
- **THEN** `data-theme="light"` on `document.documentElement`
- **AND** the toggle's accessible name becomes "Switch to dark mode"
- **AND** the toggle displays a moon icon.

#### Scenario: Light → dark

- **GIVEN** `data-theme="light"` on `document.documentElement`
- **WHEN** the user clicks the theme toggle
- **THEN** `data-theme="dark"` on `document.documentElement`
- **AND** the toggle's accessible name becomes "Switch to light mode"
- **AND** the toggle displays a sun icon.

### Requirement: Theme is not persisted

The selected theme MUST NOT be written to `localStorage`, `sessionStorage`, cookies, or
the URL. A page reload MUST return the user to the default (dark) theme.

#### Scenario: Reload resets to dark

- **GIVEN** the user has toggled to light mode so `data-theme="light"`
- **WHEN** the page is reloaded
- **THEN** `data-theme="dark"` on `document.documentElement` on the next render
- **AND** no entry named `theme` exists in `localStorage` or `sessionStorage`.

### Requirement: Light palette overrides surface and ink variables only

The light palette MUST override only the surface and ink CSS custom properties. When
`data-theme="light"` is set on `:root`, the CSS custom properties `--bg`, `--surface`,
`--surface-2`, `--line`, `--ink`, and `--muted` MUST take their light values. The
variables `--accent`, `--accent-ink`, `--p-low`, `--p-medium`, and `--p-high` MUST NOT
change between themes.

#### Scenario: Priority badges keep their hues in light mode

- **GIVEN** `data-theme="light"`
- **WHEN** a high-priority task is rendered
- **THEN** its priority badge background color is the same value as in dark mode
  (currently `#ef4444`).

#### Scenario: Backgrounds and ink follow the active theme

- **GIVEN** `data-theme="light"`
- **WHEN** any element using `var(--bg)`, `var(--surface)`, `var(--surface-2)`,
  `var(--line)`, `var(--ink)`, or `var(--muted)` is rendered
- **THEN** the computed color resolves to the light palette value defined under
  `:root[data-theme="light"]` in `playground/src/index.css`.
