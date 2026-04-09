---
name: osd-implement
description: "Use when a plan exists and you're ready to write code. Executes tasks wave by wave with parallel subagents, model selection, atomic commits, and deviation handling."
---

# Implement Phase

Execute an implementation plan. Needs a plan file — look in `docs/old-sdd/plans/` or ask the user. If no plan exists, suggest `/osd-plan` first.

After all tasks complete, suggest `/osd-validate` to verify.

<!-- include: shared/implement.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
