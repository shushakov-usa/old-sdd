# Implement Phase

Execute the plan. This is where code gets written.

## Process

### 1. Read the Plan

Load `.osd/plan.md`. Understand the waves, tasks, and dependencies.

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
- A clear commit message referencing the feature

```
feat(<scope>): <what this task does>

Part of <feature name>. <Brief description of what was implemented.>
```

### 5. Tests as Part of Implementation

Every task writes tests alongside the code it produces:
- Unit tests for new functions/modules
- Integration tests for new endpoints/flows
- Tests are committed in the same commit as the code they test

Do not defer test writing to a later phase.

### 6. Deviation Handling

Things won't always go according to plan.

**Minor deviation** (implementation detail differs from plan):
- Proceed with the better approach
- Note the deviation in the commit message

**Major deviation** (plan assumption was wrong, spec is insufficient):
- **Stop.** Do not proceed.
- Explain what's wrong and why
- Propose a plan or spec update
- Wait for user direction

**Problem discovered during implementation:**
- Apply colleague-mode: surface the problem honestly
- Don't implement a workaround for a design flaw
- Propose fixing the root cause

## Colleague Mode

During implementation:
- Don't take shortcuts. If the "easy" solution is worse, do the right thing.
- If you see a better approach than what the plan says, propose it.
- Don't silently work around problems in the spec or plan.
