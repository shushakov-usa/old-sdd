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
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
