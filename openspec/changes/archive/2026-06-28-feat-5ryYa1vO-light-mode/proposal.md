---
change-id: feat-5ryYa1vO-light-mode
ticket: https://trello.com/c/5ryYa1vO
status: READY
area: frontend
---

# Light Mode Toggle

## Goal

Add a toggle button in the top-right corner of the app header that switches the entire UI between dark mode (default) and light mode.

## Requirements (clarified in chat)

- Button toggles immediately on click
- No persistence — resets to dark mode on page reload
- Scope: all UI elements (backgrounds, surfaces, text, priority badges, accent colors)

## Out of scope

- localStorage persistence
- OS-level `prefers-color-scheme` detection
- Backend changes
