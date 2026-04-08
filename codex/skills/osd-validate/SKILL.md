---
name: osd-validate
description: "Use when implementation is complete — runs tests, linter, type checks, and verifies spec compliance before shipping"
---

# osd-validate

Run validation checks: tests, linter, type checker (all in parallel), UI verification if relevant, and spec compliance check.

<codex_adapter>
Validation runs commands and checks output — works well in auto-edit mode. Interactive mode is only needed if spec compliance issues require user decision.
</codex_adapter>

@~/.codex/old-sdd/shared/validate.md
@~/.codex/old-sdd/shared/colleague-mode.md
