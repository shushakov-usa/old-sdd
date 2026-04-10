---
name: osd-implement
description: "Use when a plan exists and you're ready to write code. Executes tasks with parallel subagents, model selection, atomic commits, and deviation handling."
---

# Implement Phase

Execute an implementation plan. Needs a plan file — check `/tmp/osd-plan-*.md`, then `docs/agents/plans/` (or `docs/superpowers/plans/`), or ask the user. If no plan exists, suggest the user activate skill `/osd-plan` first.

Also read the spec (referenced in the plan) for full context on what's being built.

## Testing

Write tests alongside code. Prefer test-first: write a failing test, then make it pass. This catches mistakes early and proves your code actually works.

Not everything needs a test (trivial config, one-line wrappers), but when in doubt — write the test.

Execute the plan. This is where code gets written.

## Process

### 1. Read the Plan

Load the plan (check `/tmp/osd-plan-*.md` or `docs/agents/plans/`). Understand the tasks and dependencies.

### 2. Execute Tasks

**Single task:** Execute directly. No subagent overhead.

**Multiple independent tasks:** Dispatch parallel subagents via the `task` tool. Each subagent works on one task.

### 3. Subagent Dispatch

When dispatching a subagent, provide:

1. **The relevant spec section** — not the whole spec, just what this task needs
2. **The task description** from the plan
3. **Files to modify** — exact paths
4. **Context from completed tasks** — any types, interfaces, or APIs created in prior tasks that this task depends on
5. **Project conventions** — coding style, testing patterns observed in the codebase
6. **Clear instruction:** "If something doesn't make sense or you're unsure, STOP and report back instead of guessing."

**Model selection:** Use the plan's model hint:
- `cheap` tasks → cheaper model (e.g., `claude-haiku-4.5`)
- `standard` tasks → capable model (e.g., `claude-sonnet-4`)

### 4. Atomic Commits

Each task = one commit. Each commit includes:
- The implementation code
- Tests for that code
- A clear commit message matching the project's existing commit style

### 5. Run Checks

After all tasks are done, run the project's checks:
- **Tests** (full suite, including newly written tests)
- **Linter** (if configured)
- **Type checker** (if configured)

Fix any failures before moving to validation.

### 6. Deviation Handling

Things won't always go according to plan.

| Deviation | Action |
|-----------|--------|
| **Undiscussed detail** — gap in spec | **STOP and ask the user.** Don't decide silently. |
| **Minor** — better implementation detail | Proceed, note in commit message |
| **Major** — plan assumption was wrong | **STOP**, explain what's wrong, propose update |
| **Blocked** — can't proceed after 3 attempts | **STOP**, report to user |

Don't implement workarounds for design flaws — propose fixing the root cause.

## What Happens Next

Get user approval, then activate skill `/osd-validate` to verify.

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
