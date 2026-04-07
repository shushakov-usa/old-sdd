# Plan Phase

Break the spec into executable tasks grouped into parallelizable waves.

## Plan Location

`.osd/plan.md` — written to disk but NOT committed by default.

For complex multi-phase features where the plan captures decisions beyond the spec, the agent may commit the plan at its discretion.

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
6. **Write plan** — Save to `.osd/plan.md`.

## Colleague Mode

During planning, apply colleague-mode:
- Is the task decomposition sensible? Are tasks too large or too small?
- Are there tasks that should be parallel but aren't?
- Does the plan actually achieve the spec's goals, or does it miss something?
