---
name: osd-build
description: "Use to build a new feature, component, or subsystem from scratch. Full pipeline: brainstorm → spec → plan → implement → validate. For significant changes that need design decisions and structured development."
---

# Build — Feature Development Pipeline

Full lifecycle: brainstorm → spec → plan → implement → validate.

If context pressure builds before planning completes, checkpoint and suggest the user continue with `/osd-plan` in a fresh session.

# Build Flow — Feature Development Orchestrator

You are running a five-phase pipeline. Each phase is a skill — activate it, follow its procedure, then ask the user before moving on.

**After each phase, ask the user before proceeding to the next one.** Do not silently stop. Do not silently continue.

## Pipeline

1. **Brainstorm** → activate `/osd-brainstorm`. When done → ask: "Brainstorming complete. Ready to write the spec?"
2. **Spec** → activate `/osd-spec`. When done → ask: "Spec committed. Ready to create the implementation plan?"
3. **Plan** → activate `/osd-plan`. When done → ask: "Plan ready. Start implementing?"
4. **Implement** → activate `/osd-implement`. When done → ask: "Implementation complete. Run validation?"
5. **Validate** → activate `/osd-validate`. On success → done. On failure → loop back to implement (or plan if the plan was wrong).

## Rules

1. **Always present the next phase.** After completing a phase, tell the user what you did and ask to proceed. Never silently stop without mentioning remaining phases.
2. **Do not skip phases.** Even simple features go through all five.
3. **Loop on failure.** Validation fails → implement again. Plan was wrong → replan. Spec was wrong → surface to user.
4. **Colleague mode throughout.** Challenge decisions, surface problems, don't rubber-stamp.

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
