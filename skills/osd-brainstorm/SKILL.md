---
name: osd-brainstorm
description: "Use to explore ideas, gather requirements, or make design decisions before building. Handles interactive questioning, research, and critical thinking for new features, architecture decisions, or technology choices."
---

# Brainstorm Phase

Standalone brainstorming — explore what to build before committing to a spec.

After brainstorming, suggest `/osd-spec` to formalize decisions, or `/osd-build` to run the full pipeline.

<!-- include: shared/brainstorm.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
