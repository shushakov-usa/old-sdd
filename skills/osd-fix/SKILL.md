---
name: osd-fix
description: "Use when something is broken — bugs, test failures, errors, crashes, or unexpected behavior. Investigates root cause, plans the fix, implements with regression tests, and validates."
---

# Fix — Bug Fix Pipeline

Understand → plan → implement → validate. No spec needed — the fix and its regression test are the deliverable.

<!-- include: shared/fix-flow.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
