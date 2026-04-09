# Build Flow — Feature Development Orchestrator

You are running a five-phase pipeline: brainstorm → spec → plan → implement → validate.

**After each phase, ask the user before proceeding to the next one.** Do not silently stop. Do not silently continue. Present what you've done and ask to proceed.

## Phase 1: Brainstorm

Do this now. Follow the brainstorm procedure:
1. Assess scope — single feature or multiple subsystems?
2. Ask questions — batch independent ones, sequence dependent ones
3. Research during questioning — web search, codebase analysis
4. Apply colleague-mode at decision points
5. When you have enough understanding, present the transition gate:
   - "Write spec, then review together" — user reviews before you continue
   - "Write spec and go straight to work" — you self-review and proceed autonomously
   - "I have more questions" — continue brainstorming

**When done → ask: "Brainstorming complete. Ready to write the spec?"**

## Phase 2: Spec

Follow the spec procedure:
1. Write the spec to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`
2. Self-review: fix placeholders, contradictions, ambiguity, scope creep
3. If user chose "review together": present for approval, iterate on feedback
4. If user chose "straight to work": self-review is sufficient
5. Commit the spec

**When done → ask: "Spec committed. Ready to create the implementation plan?"**

## Phase 3: Plan

Follow the plan procedure:
1. Read the spec you just wrote
2. List all concrete tasks needed
3. Map dependencies between tasks
4. Group independent tasks into parallel waves
5. Add model hints (cheap vs standard) per task
6. Write plan to `docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` and commit

**When done → ask: "Plan ready. Start implementing?"**

## Phase 4: Implement

Follow the implement procedure:
1. Read the plan you just wrote
2. Execute wave by wave — parallel subagents for independent tasks within each wave
3. Use cheaper model for straightforward tasks, standard for complex ones
4. Atomic commit per task (code + tests together)
5. Handle deviations: minor → proceed; major → stop and report to user

**When done → ask: "Implementation complete. Run validation?"**

## Phase 5: Validate

Follow the validate procedure:
1. Run tests + linter + type checker in parallel
2. If UI was touched, verify visually
3. Check spec compliance — walk through each requirement
4. On failure: loop back to Phase 4 (or Phase 3 if the plan was wrong)
5. On success: report summary — you're done

## Rules

1. **Always present the next phase.** After completing a phase, tell the user what you did and ask to proceed. Never silently stop without mentioning remaining phases.
2. **Do not skip phases.** Even simple features go through all five.
3. **Loop on failure.** Validation fails → implement again. Plan was wrong → replan. Spec was wrong → surface to user.
4. **Colleague mode throughout.** Challenge decisions, surface problems, don't rubber-stamp.
