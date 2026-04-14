---
name: osd-plan
description: "Use after a spec is written to break requirements into executable tasks with dependency tracking and model hints."
---

# Plan Phase

Break a spec into executable tasks. Needs a spec — check session context, then `docs/specs/`, then `docs/agents/specs/` (or `docs/superpowers/specs/`), then ask the user. If no spec exists, suggest the user activate skill `/osd-spec` first.

Break the spec into executable tasks.

## Plan Location

Save the plan next to the spec:
- If the spec is in the project (e.g., `docs/specs/`) → save `plan.md` in the same folder as the spec
- If the spec is in `/tmp/osd-<topic>/` → save to `/tmp/osd-<topic>/plan.md`

## Plan Format

The plan should list all tasks with enough detail to execute them. For each task, include:
- What to do (specific and actionable)
- Which files to touch
- Model hint (cheap or standard)
- Dependencies on other tasks (if any)

Independent tasks can run in parallel. If unsure whether tasks are independent, make them sequential — wrong parallelism causes merge conflicts; wrong sequencing only costs time.

## Task Granularity

### Good vs Bad Tasks

**Bad — too vague:**
```
- [ ] Task: Set up the database
      Files: src/db/
      Model: standard
```

**Good — specific and actionable:**
```
- [ ] Task: Create User model with email/password fields, add migration, add unit tests for validation
      Files: src/models/user.ts, src/migrations/001_users.ts, tests/models/user.test.ts
      Model: cheap
```

**Bad — too large:**
```
- [ ] Task: Implement authentication system
      Files: src/auth/
      Model: standard
```

**Good — decomposed into independent pieces:**
```
- [ ] Task: Create password hashing utility (bcrypt wrapper + tests)
      Files: src/auth/password.ts, tests/auth/password.test.ts
      Model: cheap
- [ ] Task: Create JWT token service (sign/verify/refresh + tests)
      Files: src/auth/token.ts, tests/auth/token.test.ts
      Model: cheap
- [ ] Task: Create login endpoint (POST /auth/login, uses password + token services, integration test)
      Files: src/routes/auth.ts, tests/routes/auth.test.ts
      Model: standard
```

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
3. **Map dependencies** — What depends on what? What can run in parallel?
4. **Add model hints** — Cheap vs standard for each task.
5. **Write plan** — Save next to the spec.

## Self-Check

Before finishing the plan, verify:
- Is the task decomposition sensible? Are tasks too large or too small?
- Are there tasks that should be parallel but aren't?
- Does the plan actually achieve the spec's goals, or does it miss something?

## What Happens Next

Ask the user what to do next:
- **Continue to implement** — activate skill `/osd-implement`
- **Go all the way** (recommended) — activate `/osd-implement`, then `/osd-validate` in sequence without stopping between phases

<!-- platform: copilot -->
When asking questions, use `ask_user` tool with choices. Batch independent questions as multiple parallel `ask_user` calls in one response. For dependent questions (where the answer affects the next question), wait for the answer first.
<!-- /platform: copilot -->

<!-- platform: claude -->
When asking questions, always use the user-input tool — don't ask questions in plain text output. Batch independent questions together. For dependent questions, wait for the answer first.
<!-- /platform: claude -->

<!-- platform: codex -->
When asking questions in plan mode, use `ask_user_question` tool with choices. Batch independent questions as multiple calls. In text-only mode, ask one question at a time and wait for the answer.
<!-- /platform: codex -->
