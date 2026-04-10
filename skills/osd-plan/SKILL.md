---
name: osd-plan
description: "Use after a spec is written to break requirements into executable tasks. Creates wave-based task decomposition with dependency tracking, model hints, and parallel execution groups."
---

# Plan Phase

Break a spec into executable tasks. Needs a spec — check session context, then `docs/old-sdd/specs/`, then ask the user. If no spec exists, suggest `/osd-spec` first.

Produces `docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` — committed alongside the spec. After planning, suggest `/osd-implement`.

Break the spec into executable tasks grouped into parallelizable waves.

## Plan Location

`docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` — committed alongside the spec.

## Plan Format

```
# Plan: <Feature Name>
Spec: docs/old-sdd/specs/YYYY-MM-DD-<topic>.md

## Tasks

### Wave 1 (parallel)
- [ ] Task A: <description>
      Files: <file list>
      Model: standard|cheap
- [ ] Task B: <description>
      Files: <file list>
      Model: cheap

### Wave 2 (depends on Wave 1)
- [ ] Task C: <description>
      Files: <file list>
      Model: standard

## Notes
- Why tasks are grouped this way
- Any risks or things to watch for
```

## Wave-Based Parallelism

Group tasks into waves based on dependencies:

- **Within a wave:** All tasks are independent and can execute in parallel.
- **Between waves:** Execute sequentially — Wave 2 starts after Wave 1 completes.

### Determining Independence

Two tasks are independent if they:
1. Touch different files
2. Don't depend on each other's output
3. Don't need to read what the other writes

If unsure, make them sequential. Wrong parallelism causes merge conflicts; wrong sequencing only costs time.

## Task Granularity

Each task should:
- Produce a self-contained, working change
- Include both code and tests for that code
- Be committable on its own
- Take a capable agent 5-15 minutes

## Model Hints

Mark tasks as `cheap` when they are straightforward:
- Database migrations
- Type definitions / interfaces
- Boilerplate scaffolding
- Simple CRUD operations
- Copying established patterns

Mark tasks as `standard` when they require judgment:
- Core business logic
- Complex algorithms
- Architecture decisions
- Error handling design

The implementing agent uses these hints to select models (e.g., `claude-haiku-4.5` for cheap, `claude-sonnet-4` for standard).

## Process

1. **Read the spec** — Understand what needs to be built.
2. **List all tasks** — What concrete changes are needed?
3. **Map dependencies** — What depends on what?
4. **Group into waves** — Independent tasks in the same wave.
5. **Add model hints** — Cheap vs standard for each task.
6. **Write plan** — Save to `docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` and commit.

## Colleague Mode

During planning, apply colleague-mode:
- Is the task decomposition sensible? Are tasks too large or too small?
- Are there tasks that should be parallel but aren't?
- Does the plan actually achieve the spec's goals, or does it miss something?

## Context Budget

Planning should complete within **15-20% of context**. If the spec is so large that planning alone consumes more, this is a signal to:
1. Split into multiple plans (Phase 1, Phase 2, etc.)
2. Or reduce scope per plan

## What Happens Next

After the plan is written:
- **In a `/osd-build` pipeline** → transition to implement phase automatically
- **Standalone** → suggest `/osd-implement` to execute the plan

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
