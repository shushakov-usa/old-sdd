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
