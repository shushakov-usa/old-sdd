---
name: osd-build
description: "Use to build a new feature, component, or subsystem from scratch. Full pipeline: spec → plan → implement → validate. For significant changes that need design decisions and structured development."
---

# Build — Feature Development Pipeline

Full lifecycle: spec → plan → implement → validate.
Each phase is a skill — activate it, follow its procedure, then ask the user before moving on.

## Pipeline

1. **Spec** → `/osd-spec`. When done → ask: "Spec committed. Ready to plan?"
2. **Plan** → `/osd-plan`. When done → ask: "Plan ready. Start implementing?"
3. **Implement** → `/osd-implement`. When done → ask: "Implementation complete. Run validation?"
4. **Validate** → `/osd-validate`. On success → done. On failure → loop back to implement (or plan if the plan was wrong).

## Rules

1. **Do not skip phases.** Even simple features go through all four.
2. **Be honest throughout.** Challenge decisions, surface problems, don't rubber-stamp.

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
