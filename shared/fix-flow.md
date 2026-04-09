# Fix Flow — Bug Fix Orchestrator

You MUST execute all four phases in sequence: understand → plan → implement → validate.

**Do not stop between phases.** The user invoked `/osd-fix` — they want the bug fixed, not just investigated. Proceed automatically unless blocked.

No spec is produced. The fix and its regression test are the deliverable.

## Phase 1: Understand the Bug

Do this now. You are the investigator — the user reports symptoms, you find the root cause.

1. **Gather evidence** — read error logs, stack traces, relevant code. Do not trust the user's diagnosis.
2. **Reproduce** — find the steps or trigger. If you can't reproduce, understand why it happens from the code.
3. **Investigate** — trace the code path. Read the actual source, don't guess.
4. **Challenge assumptions** — the user might be wrong about where the bug is. Question their diagnosis.

**Ready to fix?** All four must be YES:
- ☐ Understand the mechanism (why, not just that it happens)
- ☐ Can reproduce reliably (or understand the trigger)
- ☐ Have evidence (observed, not guessing)
- ☐ Ruled out alternatives (this IS the cause, not a red herring)

**When done → immediately start Phase 2.**

## Phase 2: Plan

Do this now. Create a brief task list in your working memory (not saved to disk).

- What code to change and why
- What regression test to write
- For complex/deep bugs: write a root-cause analysis to `docs/old-sdd/investigations/<topic>.md` and commit it

**When done → immediately start Phase 3.**

## Phase 3: Implement

Do this now. Execute the fix:

1. Write the fix
2. Write a regression test that would have FAILED before the fix and PASSES after
3. Atomic commit: fix + test together

Regression tests are mandatory. Every bug fix must include one. No exceptions.

**When done → immediately start Phase 4.**

## Phase 4: Validate

Do this now. Verify the fix:

1. Run the full test suite (including the new regression test)
2. Run linter + type checker if available
3. Confirm the original bug is actually fixed — reproduce the original steps
4. On failure: loop back to Phase 3
5. On success: report summary — you're done

## Rules

1. **Do not stop between phases** unless blocked by a major discovery.
2. **Don't fix symptoms.** Find and fix the root cause.
3. **Regression tests are mandatory.** No fix ships without a test that would have caught it.
4. **Colleague mode on root cause.** If the real problem is deeper than the reported bug, surface it.
