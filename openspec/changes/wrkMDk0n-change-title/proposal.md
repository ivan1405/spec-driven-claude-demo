---
change-id: wrkMDk0n-change-title
ticket: https://trello.com/c/wrkMDk0n
ticket-key: wrkMDk0n
area: frontend
status: READY
---

# Change Title from "My Spec Driven Board" to "hola Antonio"

## Goal
Update the app brand name displayed in the header and browser tab from
"My Spec Driven Board" to "hola Antonio".

## Scope
- Update the `<span class="brand-name">` text in `Header.jsx`
- Update the `<title>` tag in `index.html`
- Update the corresponding unit test in `Header.test.jsx`

Out of scope: no backend changes, no routing changes, no other UI changes.

## Acceptance Criteria
- The header displays "hola Antonio" instead of "My Spec Driven Board"
- The browser tab title reads "Spec Workflow · hola Antonio"
- The Header unit test passes with the new title
