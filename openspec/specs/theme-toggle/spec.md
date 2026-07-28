**Capability:** theme-toggle

## Purpose

Lets a user switch the task board between a light and a dark color theme via
a single header control. The theme is session-only (in-memory state, not
persisted) and light is always the default on a fresh load.

## Requirements

### Requirement: REQ-001 Theme toggle control is present and accessible
The header SHALL render a single theme toggle control in its top-right area,
and the control SHALL have an accessible name describing the action it
performs.

#### Scenario: Toggle renders in the header
- **WHEN** the app loads
- **THEN** a toggle control is visible in the top-right of the header

#### Scenario: Toggle has an accessible name
- **WHEN** the toggle is queried by assistive technology (e.g. `getByRole("button")`)
- **THEN** it exposes a non-empty accessible name describing the switch action
  (not just a bare icon with no label)

### Requirement: REQ-002 Light mode is the default theme
The application SHALL render in light mode on every fresh load, before any
user interaction with the toggle.

#### Scenario: Fresh load is light mode
- **WHEN** the app is loaded for the first time in a session
- **THEN** the light theme is active and the toggle shows its light-mode state

### Requirement: REQ-003 Theme selection is not persisted
The application SHALL NOT persist the selected theme across a page reload;
the theme SHALL NOT be read from or written to `localStorage`,
`sessionStorage`, cookies, or any other persistent store.

#### Scenario: Reload after switching to dark mode resets to light
- **GIVEN** the user has switched the app to dark mode
- **WHEN** the page is reloaded
- **THEN** the app renders in light mode again, not dark mode

### Requirement: REQ-004 Toggle switches the active theme
Clicking the toggle SHALL switch the active theme to the other mode, in
either direction.

#### Scenario: Light to dark
- **GIVEN** the app is in light mode
- **WHEN** the user clicks the toggle
- **THEN** the app switches to dark mode

#### Scenario: Dark back to light
- **GIVEN** the app is in dark mode
- **WHEN** the user clicks the toggle again
- **THEN** the app switches back to light mode

### Requirement: REQ-005 Toggle icon reflects the active theme
The toggle SHALL display a sun icon while light mode is active and a moon
icon while dark mode is active.

#### Scenario: Light mode shows the sun icon
- **GIVEN** the app is in light mode
- **WHEN** the toggle is rendered
- **THEN** the sun icon is shown and the moon icon is not

#### Scenario: Dark mode shows the moon icon
- **GIVEN** the app is in dark mode
- **WHEN** the toggle is rendered
- **THEN** the moon icon is shown and the sun icon is not

### Requirement: REQ-006 Dark mode restyles the whole app without changing behavior
When dark mode is active, the dark color scheme SHALL apply across the whole
application (not only the header), and existing task board behavior
(create, update, delete, filter) SHALL be unaffected by the active theme.

#### Scenario: Dark colors apply outside the header
- **GIVEN** the app is in dark mode
- **WHEN** the main task board area is rendered
- **THEN** its background, surface, and text colors use the dark palette, not
  the light one

#### Scenario: Task operations still work in dark mode
- **GIVEN** the app is in dark mode
- **WHEN** the user creates, updates, deletes, or filters a task
- **THEN** the operation behaves identically to how it behaves in light mode
