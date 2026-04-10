---
name: osd-implement
description: "Use when a plan exists and you're ready to write code. Executes tasks wave by wave with parallel subagents, model selection, atomic commits, and deviation handling."
---

# Implement Phase

Execute an implementation plan. Needs a plan file — look in `docs/agents/plans/` (or `docs/superpowers/plans/`) or ask the user. If no plan exists, suggest `/osd-plan` first.

After all tasks complete, suggest `/osd-validate` to verify.

## Iron Law

**NO CODE WITHOUT A FAILING TEST FIRST.** Write the test, watch it fail, then write the code that makes it pass. No exceptions.

### Anti-Rationalization Table

| Temptation | Reality |
|-----------|---------|
| "This is too simple to need a test" | Simple code breaks too. The test takes 30 seconds. Write it. |
| "I'll add tests after" | You won't. And without a failing test, you don't know if your code actually works. |
| "The existing tests cover this" | Do they? Run them. If none fail when you break the new code, you need a new test. |
| "This is just a refactor, no new behavior" | Then existing tests should still pass. Run them first. If they don't cover the refactored path, add tests. |
| "Testing this requires too much setup" | That's a design smell. Simplify the interface or use dependency injection. |

Execute the plan. This is where code gets written.

## Process

### 1. Read the Plan

Load the plan from `docs/agents/plans/` (or `docs/superpowers/plans/`). Understand the waves, tasks, and dependencies.

### 2. Execute Wave by Wave

For each wave:

**Single task in wave:**
Execute directly. No subagent overhead.

**Multiple tasks in wave:**
Dispatch parallel subagents via the `task` tool. Each subagent works on one task independently.

### 3. Subagent Dispatch

When dispatching a subagent, provide:

1. **The relevant spec section** — not the whole spec, just what this task needs
2. **The task description** from the plan
3. **Files to modify** — exact paths
4. **Context from completed waves** — any types, interfaces, or APIs created in prior waves that this task depends on
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

### 5. Tests as Part of Implementation

Every task writes tests alongside the code it produces:
- Unit tests for new functions/modules
- Integration tests for new endpoints/flows
- Tests are committed in the same commit as the code they test

Do not defer test writing to a later phase.

### 6. Deviation Handling

Things won't always go according to plan.

**Undiscussed details — ASK, don't decide:**
If you encounter something not covered in the spec — an edge case, a UX decision, an integration detail — **STOP and ask the user.** Do not make silent decisions. The spec exists to capture decisions; gaps in the spec are questions, not permissions to decide alone.

**Minor deviation** (implementation detail differs from plan):
- Proceed with the better approach
- Note the deviation in the commit message

**Major deviation** (plan assumption was wrong, spec is insufficient):
- **Stop.** Do not proceed.
- Explain what's wrong and why
- Propose a plan or spec update
- Wait for user direction

**Problem discovered during implementation:**
- Surface the problem honestly
- Don't implement a workaround for a design flaw
- Propose fixing the root cause

## Quality Standards

During implementation:
- Don't take shortcuts. If the "easy" solution is worse, do the right thing.
- If you see a better approach than what the plan says, propose it.
- Don't silently work around problems in the spec or plan.

## Deviation Rules

| Deviation | Action | Attempt Limit |
|-----------|--------|---------------|
| **Minor** — better implementation detail | Proceed, note in commit | — |
| **Medium** — missing dependency or tool | Fix it, continue | 3 attempts |
| **Major** — plan assumption was wrong | **STOP**, report to user | Immediate |
| **Blocked** — can't proceed | **STOP** after 3 attempts | 3 attempts |

After 3 failed fix attempts on any task: stop, report what's wrong, and let the user decide.

## What Happens Next

After all tasks complete:
- **In a `/osd-build` or `/osd-fix` pipeline** → transition to validate phase automatically
- **Standalone** → suggest `/osd-validate` to verify

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
