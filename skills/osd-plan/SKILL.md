---
name: osd-plan
description: "Use after a spec is written to break requirements into executable tasks with dependency tracking and model hints."
---

# Plan Phase

Break a spec into executable tasks. Needs a spec — check session context, then `docs/agents/specs/` (or `docs/superpowers/specs/`), then ask the user. If no spec exists, suggest the user activate skill `/osd-spec` first.

Break the spec into executable tasks.

## Plan Location

Detect the docs folder: if `docs/superpowers/` exists → use it, otherwise → `docs/agents/`.

Save the plan to `<docs-folder>/plans/YYYY-MM-DD-<topic>.md`.

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
5. **Write plan** — Save to `<docs-folder>/plans/YYYY-MM-DD-<topic>.md`.

## Self-Check

Before finishing the plan, verify:
- Is the task decomposition sensible? Are tasks too large or too small?
- Are there tasks that should be parallel but aren't?
- Does the plan actually achieve the spec's goals, or does it miss something?

## What Happens Next

Get user approval, then activate skill `/osd-implement` to execute the plan.

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
