---
description: Show active OpenSpec changes (tickets in flight) and their task progress.
allowed-tools: Read, Grep, Glob, Bash
---

List the work currently in flight.

1. If the `openspec` CLI is available, run `openspec list` and show the output.
2. Also scan `openspec/changes/` (excluding `archive/`) and for each change print:
   - the change id,
   - the ticket key/URL from `proposal.md`,
   - the `area:` tag,
   - task progress counted from `tasks.md` (e.g. `4/7 done`).
3. End with a one-line hint: run `/ticket <url>` to start a new one, or
   `openspec archive <change-id>` to file a merged one.
