# Build Flow — Feature Development Orchestrator

Full pipeline for feature development: brainstorm → spec → plan → implement → validate.

## Flow

```
brainstorm ←→ (internal research)
    ↓
  spec → plan → implement ←→ validate
                    ↑              |
                    └──────────────┘ (on failure)
```

## Phase Execution

### Phase 1: Brainstorm

Execute the brainstorm phase (shared/brainstorm.md):
- Ask questions (batched when independent, sequential when dependent)
- Research as needed during questioning
- Apply colleague-mode at decision points
- End with the transition gate

### Phase 2: Spec

Execute the spec phase (shared/spec.md):
- Write specification to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`
- Self-review the spec
- If user chose "review together": present for approval
- If user chose "straight to work": self-review only, proceed
- Commit the spec

### Phase 3: Plan

Execute the plan phase (shared/plan.md):
- Break spec into tasks with wave-based parallelism
- Write plan to `.osd/plan.md`
- Identify what can run in parallel and what needs sequencing

### Phase 4: Implement

Execute the implement phase (shared/implement.md):
- Execute wave by wave
- Dispatch parallel subagents for independent tasks
- Use cheaper model for straightforward tasks
- Atomic commit per task (code + tests)

### Phase 5: Validate

Execute the validate phase (shared/validate.md):
- Batch baseline checks (tests + lint + types in parallel)
- UI verification if changes touched UI
- Spec compliance check
- On failure: loop to Phase 4 (or Phase 3 if design-level issue)

## Behavior Rules

1. **Start fresh.** Don't look for existing state or try to resume. If the user wants to continue interrupted work, they invoke a phase skill directly.
2. **Flow forward.** Don't skip phases. Even if the feature seems simple, go through brainstorm → spec → plan → implement → validate.
3. **Loop on failure.** If validation fails, loop back to implement. If the plan was wrong, loop back to plan. If the spec was wrong, surface it to the user — don't try to fix the spec unilaterally.
4. **Colleague mode throughout.** Apply shared/colleague-mode.md behavior in every phase, especially at decision points.
