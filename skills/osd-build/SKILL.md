---
name: osd-build
description: "Use to build a new feature, component, or subsystem from scratch. Full pipeline: brainstorm → plan → implement → validate. For significant changes that need design decisions and structured development."
---

# Build — Feature Development Pipeline

Full lifecycle: spec → plan → implement → validate.

# Build Flow — Feature Development Orchestrator

You are running a four-phase pipeline. Each phase is a skill — activate it, follow its procedure, then ask the user before moving on.

**After each phase, ask the user before proceeding to the next one.** Do not silently stop. Do not silently continue.

## Pipeline

1. **Spec** → activate `/osd-spec`. This phase explores requirements AND writes the spec incrementally. When done → ask: "Spec committed. Ready to create the implementation plan?"
2. **Plan** → activate `/osd-plan`. When done → ask: "Plan ready. Start implementing?"
3. **Implement** → activate `/osd-implement`. When done → ask: "Implementation complete. Run validation?"
4. **Validate** → activate `/osd-validate`. On success → done. On failure → loop back to implement (or plan if the plan was wrong).

## Rules

1. **Always present the next phase.** After completing a phase, tell the user what you did and ask to proceed. Never silently stop without mentioning remaining phases.
2. **Do not skip phases.** Even simple features go through all four.
3. **Loop on failure.** Validation fails → implement again. Plan was wrong → replan. Spec was wrong → surface to user.
4. **Be honest throughout.** Challenge decisions, surface problems, don't rubber-stamp.

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
