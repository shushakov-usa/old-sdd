# Build Flow — Feature Development Orchestrator

You MUST execute all five phases in sequence: brainstorm → spec → plan → implement → validate.

**Do not stop between phases.** Do not ask "should I continue?" after a phase completes. The user invoked `/osd-build` — they want the full pipeline. Proceed automatically unless the user interrupts you.

The only pause point is the transition gate after brainstorming (where the user chooses review-together or go-straight-to-work). After that choice, execute every remaining phase without stopping.

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

**When done → immediately start Phase 2.**

## Phase 2: Spec

Do this now. Follow the spec procedure:
1. Write the spec to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`
2. Self-review: fix placeholders, contradictions, ambiguity, scope creep
3. If user chose "review together": present for approval, iterate on feedback
4. If user chose "straight to work": self-review is sufficient
5. Commit the spec

**When done → immediately start Phase 3.**

## Phase 3: Plan

Do this now. Follow the plan procedure:
1. Read the spec you just wrote
2. List all concrete tasks needed
3. Map dependencies between tasks
4. Group independent tasks into parallel waves
5. Add model hints (cheap vs standard) per task
6. Write plan to `docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` and commit

**When done → immediately start Phase 4.**

## Phase 4: Implement

Do this now. Follow the implement procedure:
1. Read the plan you just wrote
2. Execute wave by wave — parallel subagents for independent tasks within each wave
3. Use cheaper model for straightforward tasks, standard for complex ones
4. Atomic commit per task (code + tests together)
5. Handle deviations: minor → proceed; major → stop and report to user

**When done → immediately start Phase 5.**

## Phase 5: Validate

Do this now. Follow the validate procedure:
1. Run tests + linter + type checker in parallel
2. If UI was touched, verify visually
3. Check spec compliance — walk through each requirement
4. On failure: loop back to Phase 4 (or Phase 3 if the plan was wrong)
5. On success: report summary — you're done

## Rules

1. **Do not stop between phases** unless the user interrupts or a major deviation blocks you.
2. **Do not skip phases.** Even simple features go through all five.
3. **Loop on failure.** Validation fails → implement again. Plan was wrong → replan. Spec was wrong → surface to user.
4. **Colleague mode throughout.** Challenge decisions, surface problems, don't rubber-stamp.
