---
name: osd-build
description: "Use to build a new feature, component, or subsystem from scratch. Full pipeline: brainstorm → spec → plan → implement → validate. For significant changes that need design decisions and structured development."
---

# Build — Feature Development Pipeline

Full lifecycle: brainstorm → spec → plan → implement → validate.

If context pressure builds before planning completes, checkpoint and suggest the user continue with `/osd-plan` in a fresh session.

<!-- include: shared/build-flow.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
