# Fix Flow — Bug Fix Orchestrator

Lighter pipeline for bug fixes: understand → plan → implement → validate.

No spec is produced. The fix itself is the deliverable.

## Flow

```
brainstorm (understand bug)
    ↓
  plan (ephemeral) → implement ←→ validate
                         ↑              |
                         └──────────────┘ (on failure)
```

## Phase Execution

### Phase 1: Understand the Bug

Use brainstorm-phase questioning, but focused on understanding the bug:

- **Reproduction:** What are the steps to reproduce? What is the expected vs actual behavior?
- **Root cause investigation:** Explore the codebase. Read error logs, stack traces, relevant code.
- **Colleague mode:** Question the user's assumptions about the cause. The user might be wrong about where the bug is.

This phase is lighter than feature brainstorming — fewer questions, more investigation.

### Phase 2: Plan

Create a brief task list. This is ephemeral — it stays in agent context, not saved to disk.

For **complex/deep bugs** (agent's judgment): write a root-cause analysis to `docs/old-sdd/investigations/<topic>.md` and commit it. This helps if the same area breaks again.

### Phase 3: Implement

Same as the build flow's implement phase:
- Execute tasks
- Write tests that reproduce the bug and verify the fix
- Atomic commits

**Key difference:** Every bug fix MUST include a regression test that:
1. Would have failed before the fix
2. Passes after the fix

### Phase 4: Validate

Same as the build flow's validate phase:
- Batch baseline checks
- UI verification if relevant
- Confirm the bug is actually fixed — reproduce the original steps

## Behavior Rules

1. **No spec.** Bug fixes don't need formal specs. The fix and its test are the documentation.
2. **Investigation notes for deep bugs.** If the bug took significant investigation, document the root cause in `docs/old-sdd/investigations/`.
3. **Regression tests are mandatory.** Every fix must include a test that would have caught the bug.
4. **Colleague mode on root cause.** Don't just fix the symptom. If the real problem is deeper, surface it.
