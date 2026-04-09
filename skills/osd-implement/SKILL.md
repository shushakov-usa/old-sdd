---
name: osd-implement
description: "Use when you have a written plan to execute — dispatches parallel subagents per task wave with model selection and progress tracking"
argument-hint: <path to plan> (or omit to find latest in docs/old-sdd/plans/)
---

# osd-implement

Execute an implementation plan wave by wave.

## When to Use

- **Plan exists** (in `docs/old-sdd/plans/` or provided path)
- Ready to **write code** based on the plan
- Tasks are defined with files, dependencies, and model hints

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| No plan yet | `/osd-plan` |
| No spec yet | `/osd-brainstorm` → `/osd-spec` → `/osd-plan` |
| Want full pipeline | `/osd-build` |
| Quick fix, no plan needed | `/osd-fix` |
| Code done, need verification | `/osd-validate` |

## Prerequisites

Needs a plan. Resolution order:
1. Argument: path to plan file
2. Auto-find: most recent file in `docs/old-sdd/plans/`
3. None found → ask user, suggest `/osd-plan`

## Deviation Rules

During implementation, things diverge from the plan. Handle systematically:

| Deviation | Action | Example |
|-----------|--------|---------|
| **Minor** — better implementation detail | Proceed, note in commit | Different function name |
| **Medium** — missing dependency | Fix it, continue | Forgot a type definition |
| **Major** — plan assumption wrong | **STOP**, report to user | API doesn't support needed operation |
| **Blocked** — can't proceed | **STOP** after 3 attempts | Circular dependency, missing tool |

**Attempt limit:** 3 fix attempts per task. After 3, stop and escalate.

## Context Budget

Implementation is the most context-intensive phase. Subagents get fresh context, but the orchestrator tracks progress.

If you've completed 60%+ of tasks and context is pressured, commit progress and suggest the user invoke `/osd-implement` again — it will pick up remaining tasks.

## What Happens Next

After all tasks complete, suggest `/osd-validate` to verify.

<!-- include: shared/implement.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
