---
name: osd-fix
description: "Use when a bug is reported or tests fail — investigates root cause, plans fix, implements with regression tests, and validates"
---

# osd-fix

Lightweight bug fix pipeline. Understands the bug through investigation and questions, plans a fix, implements with regression tests, and validates.

<codex_adapter>
The bug understanding phase benefits from interactive mode. If in auto-edit mode, suggest switching:

"osd-fix works best in suggest mode for the investigation phase. Consider: codex --suggest"

If the user provides enough context in their initial message, you may proceed in auto-edit mode.
</codex_adapter>

@~/.codex/old-sdd/shared/fix-flow.md
@~/.codex/old-sdd/shared/colleague-mode.md
