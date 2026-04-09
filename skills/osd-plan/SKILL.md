---
name: osd-plan
description: "Use after you have a spec but before implementation — breaks requirements into executable task waves with dependency tracking and model hints"
argument-hint: <path to spec> (or omit to find latest in docs/old-sdd/specs/)
---

# osd-plan

Create an implementation plan from a specification.

## When to Use

- **Spec exists** and is committed (or held in session context)
- Ready to **decompose into tasks** before implementing
- Need to figure out **what can run in parallel**

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| No spec yet / requirements unclear | `/osd-brainstorm` then `/osd-spec` |
| Plan exists, ready to execute | `/osd-implement` |
| Want full pipeline from scratch | `/osd-build` |
| Bug fix (lightweight, no formal plan) | `/osd-fix` |

## Prerequisites

Needs a spec. Resolution order:
1. Spec in current session context
2. Argument: path to spec file
3. Auto-find: most recent file in `docs/old-sdd/specs/`
4. None found → ask user, suggest `/osd-spec`

## Decision Flow

```
Spec found?
    ├─ NO → suggest /osd-spec
    └─ YES → Spec clear enough to plan?
                ├─ NO → ask clarifying questions
                └─ YES → Create wave-based plan
                            │
                            └─ Write to docs/old-sdd/plans/
                               Suggest /osd-implement
```

## What This Produces

`docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` — committed alongside the spec.

## What Happens Next

After planning, suggest `/osd-implement` to execute the plan.

## Context Budget

Planning should complete within 20% of context. If the spec is huge, this is a signal to split into multiple plans.

<!-- include: shared/plan.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
