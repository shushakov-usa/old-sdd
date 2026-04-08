---
name: osd-build
description: "Use for significant new features or major changes — full pipeline from brainstorming through spec, planning, implementation, and validation"
argument-hint: <feature description>
---

# osd-build

Full feature development pipeline: brainstorm → spec → plan → implement → validate.

## When to Use

- User wants to **build something new** (feature, component, subsystem)
- User wants a **significant change** to existing behavior
- Scope is non-trivial — multiple files, design decisions needed

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| Bug fix or test failure | `/osd-fix` |
| Just exploring an idea, no commitment to build | `/osd-brainstorm` |
| Spec already written, ready to plan | `/osd-plan` |
| Plan already exists, ready to implement | `/osd-implement` |
| Code written, need to verify | `/osd-validate` |
| Trivial change (< 5 min, obvious fix) | Just do it directly |

## Decision Flow

```
User request
    │
    ├─ Bug/failure? ──────────> /osd-fix
    ├─ Just exploring? ───────> /osd-brainstorm
    ├─ Spec exists? ──────────> /osd-plan
    ├─ Plan exists? ──────────> /osd-implement
    ├─ Code done, verify? ───> /osd-validate
    └─ New feature/change ───> THIS SKILL ✓
```

## Context Budget

This is the longest flow — it uses significant context.

| Phase | Context % | Quality |
|-------|-----------|---------|
| Brainstorm | 0-20% | Peak — thorough questioning |
| Spec | 20-35% | Good — detailed writing |
| Plan | 35-45% | Good — structured decomposition |
| Implement | 45-70% | Standard — delegate to subagents |
| Validate | 70-85% | Sufficient — run checks |

If context pressure is high before planning completes, checkpoint to user and suggest continuing with `/osd-plan` in a fresh session.

@~/.claude/old-sdd/shared/build-flow.md
@~/.claude/old-sdd/shared/colleague-mode.md
