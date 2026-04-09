---
name: osd-validate
description: "Use after implementation to verify quality — runs tests, linter, type checks in parallel, verifies spec compliance, and checks UI if applicable. Also useful as a standalone quality check on recent changes."
---

# Validate Phase

Verify implementation quality and spec compliance. Find the spec in `docs/old-sdd/specs/` or session context.

<!-- include: shared/validate.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
