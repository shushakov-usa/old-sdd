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
                            └─ Write to .osd/plan.md
                               Suggest /osd-implement
```

## What This Produces

`.osd/plan.md` — NOT committed by default. Contains tasks grouped into waves with model hints.

## What Happens Next

After planning, suggest `/osd-implement` to execute the plan.

## Context Budget

Planning should complete within 20% of context. If the spec is huge, this is a signal to split into multiple plans.

@~/.claude/old-sdd/shared/plan.md
@~/.claude/old-sdd/shared/colleague-mode.md
