---
name: osd-fix
description: "Use when a bug is reported or tests fail — investigates root cause, plans fix, implements with regression tests, and validates"
argument-hint: <bug description or error message>
---

# osd-fix

Bug fix pipeline: understand → plan → implement → validate.

## When to Use

- User reports a **bug** or unexpected behavior
- **Tests are failing** and need investigation
- Something **broke** after a recent change
- Error messages or stack traces need diagnosis

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| New feature request | `/osd-build` |
| Code works but needs improvement | Refactor directly |
| Just investigating, no fix planned | Use tools directly (grep, view) |

## Investigation Mindset

**You = Investigator.** The user = Reporter. The user knows symptoms; you find the root cause.

- Don't trust the user's diagnosis — verify independently
- Don't fix the symptom — find and fix the root cause
- Don't guess — gather evidence (logs, stack traces, reproduction steps)

### When You Have Enough to Act

All four must be YES:
1. ☐ Understand the mechanism? (why it happens, not just that it happens)
2. ☐ Can reproduce reliably? (or understand the trigger)
3. ☐ Have evidence? (observed, not guessing)
4. ☐ Ruled out alternatives? (this IS the cause, not a red herring)

## After Fixing

Every bug fix MUST include a regression test that:
1. Would have failed before the fix
2. Passes after the fix

<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>

@~/.codex/old-sdd/shared/fix-flow.md
@~/.codex/old-sdd/shared/colleague-mode.md
