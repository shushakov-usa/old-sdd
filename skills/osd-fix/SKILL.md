---
name: osd-fix
description: "Use when something is broken — bugs, test failures, errors, crashes, or unexpected behavior. Investigates root cause, plans the fix, implements with regression tests, and validates."
---

# Fix — Bug Fix Pipeline

Understand → plan → implement → validate. No spec needed — the fix and its regression test are the deliverable.
Each phase is inline or a skill — follow its procedure, then ask the user before moving on.

## Iron Law

**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.** Understand WHY the bug happens before writing a single line of fix code. Fixing symptoms creates new bugs.

### Anti-Rationalization Table

| Temptation | Reality |
|-----------|---------|
| "The fix is obvious" | Obvious fixes for non-obvious causes create new bugs. Verify the cause. |
| "I can see exactly what's wrong in the code" | Can you explain WHY it's wrong? What assumption failed? What else shares that assumption? |
| "Let me just try this quick fix" | Quick fixes that work by coincidence break under different conditions. |
| "The user told me what's wrong" | The user told you the symptom. The cause may be elsewhere. Verify independently. |
| "I've seen this pattern before" | This codebase may be different. Read the actual code, don't assume. |

## Pipeline

1. **Understand** → investigate the bug yourself (no separate skill — see procedure below). When done → present findings and ask: "Here's what I found. Ready to plan the fix?"
2. **Plan** → activate `/osd-plan`. Adapt for bugfix: brief task list in memory (not saved to disk), what code to change, what regression test to write. For complex/deep bugs: write root-cause analysis to `docs/agents/investigations/<topic>.md`. When done → ask: "Here's the fix plan. Shall I implement it?"
3. **Implement** → activate `/osd-implement`. Adapt for bugfix: fix + mandatory regression test, atomic commit. When done → ask: "Fix implemented with regression test. Run validation?"
4. **Validate** → activate `/osd-validate`. Also reproduce the original steps to confirm the bug is actually fixed. On failure → loop back to implement. On success → done.

## Phase 1: Understand the Bug

This phase has no separate skill — do it inline. You are the investigator.

1. **Clarify if needed** — if the bug report is unclear, ask before diving in:
   - What behavior did you expect vs what happened?
   - When did it start? What changed recently?
   - Steps to reproduce?
   Don't ask if the report already answers these.
2. **Gather evidence** — read error logs, stack traces, relevant code. Do not trust the user's diagnosis blindly.
3. **Reproduce** — find the steps or trigger. If you can't reproduce, understand why from the code.
4. **Investigate** — trace the code path. Read actual source, don't guess.
5. **Challenge assumptions** — the user might be wrong about where the bug is. Ask more questions if something doesn't add up.

**Ready to fix?** All four must be YES:
- ☐ Understand the mechanism (why, not just that it happens)
- ☐ Can reproduce reliably (or understand the trigger)
- ☐ Have evidence (observed, not guessing)
- ☐ Ruled out alternatives (this IS the cause, not a red herring)

## Escalation to Build

If investigation reveals the bug requires significant rework — architectural changes, new subsystems, or redesign of existing ones — this is not a fix, it's a feature.

Stop and tell the user: "This is bigger than a bugfix. I recommend switching to `/osd-build` to handle this properly with spec and plan." Let the user decide.

## Rules

1. **Ask when unclear.** If you're unsure about expected behavior, edge cases, or priorities — ask the user. Don't guess.
2. **Regression tests are mandatory.** No fix ships without a test that would have caught it.
3. **Be honest about root cause.** If the real problem is deeper than the reported bug, surface it.

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
