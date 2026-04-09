---
name: osd-validate
description: "Use when implementation is complete — runs tests, linter, type checks in parallel, verifies spec compliance, and checks UI if applicable"
argument-hint: <path to spec> (or omit to find latest)
---

# osd-validate

Verify implementation quality and spec compliance.

## When to Use

- **Implementation is complete** (or a significant chunk is done)
- Want to **verify before shipping** — tests, lint, types, spec compliance
- After `/osd-implement` finishes
- Standalone check on any recent changes

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| Still implementing | Finish first, then validate |
| No code written yet | `/osd-plan` → `/osd-implement` |
| Bug investigation | `/osd-fix` (includes validation) |
| Just want to run tests | Run `test` command directly |

## Verification Checklist

All checks run in parallel:
- ☐ **Tests** — full test suite passes
- ☐ **Linter** — no new warnings/errors
- ☐ **Type checker** — no type errors (if applicable)
- ☐ **Spec compliance** — every requirement in the spec is implemented
- ☐ **UI quality** — if UI was changed, verify visually

## Escalation Rules

| Result | Action |
|--------|--------|
| Tests fail | Fix → re-validate (loop to implement) |
| Lint/type errors | Fix inline → re-run |
| Spec gap found | Ask user: implement missing part or update spec? |
| UI looks wrong | Fix → re-validate |
| Fundamental design issue | **STOP** — escalate to user, don't patch |

## What Happens Next

- **All pass** → Done! Report success summary.
- **Failures** → Fix loop (implement → validate) until clean.
- **Design issue** → Escalate. May need plan or spec revision.

<!-- include: shared/validate.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
