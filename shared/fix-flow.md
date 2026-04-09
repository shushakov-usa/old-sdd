# Fix Flow — Bug Fix Orchestrator

You are running a four-phase pipeline. Activate each skill, follow its procedure, then ask the user before moving on.

**After each phase, ask the user before proceeding to the next one.** Do not silently stop. Do not silently continue.

No spec is produced. The fix and its regression test are the deliverable.

## Pipeline

1. **Understand** → investigate the bug yourself (no separate skill — see procedure below). When done → present findings and ask: "Here's what I found. Ready to plan the fix?"
2. **Plan** → activate `/osd-plan`. Adapt for bugfix: brief task list in memory (not saved to disk), what code to change, what regression test to write. For complex/deep bugs: write root-cause analysis to `docs/old-sdd/investigations/<topic>.md`. When done → ask: "Here's the fix plan. Shall I implement it?"
3. **Implement** → activate `/osd-implement`. Adapt for bugfix: fix + mandatory regression test, atomic commit. When done → ask: "Fix implemented with regression test. Run validation?"
4. **Validate** → activate `/osd-validate`. Also reproduce the original steps to confirm the bug is actually fixed. On failure → loop back to implement. On success → done.

## Phase 1: Understand the Bug

This phase has no separate skill — do it inline. You are the investigator.

1. **Gather evidence** — read error logs, stack traces, relevant code. Do not trust the user's diagnosis.
2. **Reproduce** — find the steps or trigger. If you can't reproduce, understand why from the code.
3. **Investigate** — trace the code path. Read actual source, don't guess.
4. **Challenge assumptions** — the user might be wrong about where the bug is.

**Ready to fix?** All four must be YES:
- ☐ Understand the mechanism (why, not just that it happens)
- ☐ Can reproduce reliably (or understand the trigger)
- ☐ Have evidence (observed, not guessing)
- ☐ Ruled out alternatives (this IS the cause, not a red herring)

## Rules

1. **Always present the next phase.** After completing a phase, tell the user what you found/did and ask to proceed. Never silently stop.
2. **Don't fix symptoms.** Find and fix the root cause.
3. **Regression tests are mandatory.** No fix ships without a test that would have caught it.
4. **Colleague mode on root cause.** If the real problem is deeper than the reported bug, surface it.
