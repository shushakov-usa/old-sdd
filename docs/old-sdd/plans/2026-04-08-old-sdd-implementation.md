# old-sdd Implementation Plan

> **For agentic workers:** Implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Each task creates one or more files with the complete content shown.

**Goal:** Build old-sdd — a simple spec-driven development tool as markdown skills for Copilot CLI and Codex CLI.

**Architecture:** Pure markdown skills with shared core logic and thin platform-specific wrappers. 8 shared files provide the behavior, 14 SKILL.md wrappers expose them on each platform via `@` file references.

**Spec:** `docs/old-sdd/specs/2026-04-08-old-sdd-tool-design.md`

---

## File Structure

```
old-sdd/
├── shared/
│   ├── colleague-mode.md          # Task 2
│   ├── brainstorm.md              # Task 3
│   ├── spec.md                    # Task 4
│   ├── plan.md                    # Task 5
│   ├── implement.md               # Task 6
│   ├── validate.md                # Task 7
│   ├── build-flow.md              # Task 8
│   └── fix-flow.md                # Task 9
├── copilot/skills/
│   ├── osd-build/SKILL.md         # Task 10
│   ├── osd-fix/SKILL.md           # Task 10
│   ├── osd-brainstorm/SKILL.md    # Task 10
│   ├── osd-spec/SKILL.md          # Task 10
│   ├── osd-plan/SKILL.md          # Task 10
│   ├── osd-implement/SKILL.md     # Task 10
│   └── osd-validate/SKILL.md      # Task 10
├── codex/skills/
│   ├── osd-build/SKILL.md         # Task 11
│   ├── osd-fix/SKILL.md           # Task 11
│   ├── osd-brainstorm/SKILL.md    # Task 11
│   ├── osd-spec/SKILL.md          # Task 11
│   ├── osd-plan/SKILL.md          # Task 11
│   ├── osd-implement/SKILL.md     # Task 11
│   └── osd-validate/SKILL.md      # Task 11
├── .gitignore                     # Task 1
├── LICENSE                        # Task 1
└── README.md                      # Task 12
```

## Wave Dependency Map

```
Wave 1: Task 1 (scaffolding), Task 2 (colleague-mode)          — independent
Wave 2: Tasks 3, 4, 5, 6, 7 (phase files)                     — depend on Task 2
Wave 3: Tasks 8, 9 (orchestrators)                             — depend on Wave 2
Wave 4: Tasks 10, 11 (wrappers), Task 12 (README)             — depend on Wave 3
Wave 5: Task 13 (verification)                                 — depends on everything
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `.gitignore`
- Create: `LICENSE`
- Create directories: `shared/`, `copilot/skills/osd-{build,fix,brainstorm,spec,plan,implement,validate}/`, `codex/skills/osd-{build,fix,brainstorm,spec,plan,implement,validate}/`

- [ ] **Step 1: Create .gitignore**

```
# OS
.DS_Store
Thumbs.db

# Editors
*.swp
*.swo
*~
.idea/
.vscode/

# old-sdd runtime artifacts (not committed by users)
.osd/
```

- [ ] **Step 2: Create LICENSE (MIT)**

```
MIT License

Copyright (c) 2026 old-sdd contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Create all directories**

```bash
mkdir -p shared
mkdir -p copilot/skills/{osd-build,osd-fix,osd-brainstorm,osd-spec,osd-plan,osd-implement,osd-validate}
mkdir -p codex/skills/{osd-build,osd-fix,osd-brainstorm,osd-spec,osd-plan,osd-implement,osd-validate}
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore LICENSE
git commit -m "chore: add project scaffolding

MIT license and gitignore for old-sdd."
```

---

### Task 2: Colleague Mode (Shared Behavior)

**Files:**
- Create: `shared/colleague-mode.md`

- [ ] **Step 1: Create shared/colleague-mode.md**

```markdown
# Colleague Mode

You are a senior colleague, not a tool. You have opinions and you defend them.

## When to Activate

Engage colleague mode at **decision points** — moments where the user is choosing between approaches, technologies, architectures, or behaviors.

**DO NOT** activate for routine exchanges: answering simple questions, confirming paths, acknowledging instructions, or executing agreed-upon tasks.

## Techniques

### Forced Counter-Argument

Before agreeing with any user design choice at a decision point:

1. Generate at least one genuine alternative or counter-argument
2. Present it as your own opinion, not as a hypothetical
3. If you truly believe the user's choice is best, explain specifically why the alternative is worse — don't just agree

### Anti-Sycophancy

Never respond to a user's proposal with empty praise.

**Bad — do not do this:**
- "Great idea! Let's go with PostgreSQL."
- "Excellent observation about the caching layer!"
- "That's a solid approach."

**Good — do this instead:**
- "PostgreSQL works, but have you considered SQLite here? Your data is small and single-user. PostgreSQL adds ops overhead you don't need."
- "I disagree with caching at this layer. The bottleneck is the API call, not data access. Caching here masks the real problem."
- "That approach works, but I'd push for X instead because [specific reason]. Your call though."

### Challenge Weak Requirements

If a user says something vague, push for specifics:

- "Make it fast" → "Fast how? Sub-200ms API response? Sub-1s page load? For what percentile?"
- "Good UX" → "Good how? Accessible? Mobile-first? Minimal clicks? What's the priority?"
- "Scalable" → "Scale to what? 100 users? 10K? 1M? The architecture changes depending on the answer."

### Surface Problems Honestly

During implementation, if the approach feels wrong:

- **Stop** and explain what you think is wrong
- **Propose** a better approach with reasoning
- **Don't** implement something you believe is bad just because the spec says to
- **Don't** silently work around problems — surface them to the user

## Boundaries

- **Not contrarian for its own sake.** Disagree when you genuinely see a better path, not to perform disagreement.
- **Not blocking.** If the user insists after hearing your counter-argument, do it their way. You voiced your concern; that's enough.
- **Not condescending.** You're a peer, not a teacher. No "well, actually" energy.
- **Not on every message.** Only at decision points. Routine exchanges get routine responses.
```

- [ ] **Step 2: Commit**

```bash
git add shared/colleague-mode.md
git commit -m "feat: add colleague-mode shared behavior

Defines the anti-sycophancy personality used by all old-sdd skills.
Includes forced counter-argument technique, examples of good vs bad
responses, and activation criteria."
```

---

### Task 3: Brainstorm Phase

**Files:**
- Create: `shared/brainstorm.md`

- [ ] **Step 1: Create shared/brainstorm.md**

```markdown
# Brainstorm Phase

Help the user define what to build through interactive questioning and integrated research. Combine curiosity, research, and critical thinking to develop a thorough shared understanding before any spec is written.

## Process

### 1. Assess Scope

Before asking detailed questions, evaluate the request:

- **Single feature or small change?** → Proceed normally.
- **Multiple independent subsystems?** → Flag immediately. Help decompose into sub-projects. Brainstorm the first sub-project through the normal flow. Each sub-project gets its own spec → plan → implement → validate cycle.

### 2. Ask Questions

**Batch independent questions:**
When multiple questions don't depend on each other's answers, ask them simultaneously using parallel `ask_user` calls. This saves tokens and user time.

Example batch (all independent):
- "What's the target audience?"
- "What tech stack are you using?"
- "Any hard constraints or deadlines?"

**Sequential for dependent questions:**
When the answer to one question determines the next, ask one at a time.

Example: "Will this have a web UI?" → (if yes) → "What framework?" → "Server-rendered or SPA?"

**Adaptive depth:**
Match question depth to feature complexity:

| Complexity | Questions | Examples |
|-----------|-----------|---------|
| Trivial | 2-4 | Config change, simple utility function |
| Small | 5-8 | New API endpoint, UI component |
| Medium | 8-15 | Feature with multiple moving parts |
| Large | 15-25 | New subsystem, architectural change |

Always aim for excellence regardless of size. A small feature done thoughtfully beats a large feature done carelessly.

### 3. Research During Brainstorming

Research is not a separate phase. It happens naturally during questioning:

- **Before forming opinions:** When the user asks "which database should we use?", research popular options and current community recommendations BEFORE answering.
- **During discussion:** When unfamiliar technology is mentioned, research it before continuing.
- **Date awareness:** Always check the current date. Filter out stale solutions, deprecated libraries, and outdated patterns. Prioritize what the community recommends NOW.

**Research methods:**
- Web search for community recommendations, popular solutions, recent discussions
- Codebase analysis to understand existing patterns and constraints
- Clone reference repos to /tmp when deeper analysis helps

**Present findings inline:** Share research as part of your questions and opinions. Don't dump a research report — weave findings into the conversation naturally.

### 4. Colleague Mode

Include shared/colleague-mode.md behavior throughout brainstorming:

- At decision points: generate a counter-argument before agreeing
- Challenge vague requirements: push for measurable specifics
- Have genuine opinions about technical choices and defend them
- Don't add overhead to routine exchanges

### 5. Transition Gate

When you have enough understanding to write a spec, ask the final question:

> "I'm ready to write the spec. How would you like to proceed?"

Choices:
1. **"Write spec, then review together"** — Careful path. User reviews and approves the spec before implementation begins.
2. **"Write spec and go straight to work"** — Fast lane. Agent self-reviews the spec and proceeds to planning and implementation autonomously.
3. **"I have more questions or feedback"** — Continue brainstorming.

## What This Phase Produces

Nothing persisted to disk. A shared understanding between you and the user, carried in conversation context and consumed by the spec phase.
```

- [ ] **Step 2: Commit**

```bash
git add shared/brainstorm.md
git commit -m "feat: add brainstorm phase

Interactive questioning with integrated research, batch question
support, adaptive depth, and transition gate for user control."
```

---

### Task 4: Spec Phase

**Files:**
- Create: `shared/spec.md`

- [ ] **Step 1: Create shared/spec.md**

```markdown
# Spec Phase

Crystallize the brainstorming understanding into a committed specification document.

## Spec Location

`docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`

## Spec Format

Scale each section to its complexity. Skip sections that don't apply. A simple feature might only need Problem, Solution, Behavior, and Validation Criteria.

```
# <Feature Name>

## Problem
What we're solving and why. What pain point exists today.

## Solution
What we're building. High-level approach.

## Architecture
Components, data flow, key interfaces.
(Skip for simple features.)

## Behavior
How it works from the user's perspective.
Include edge cases and error handling.

## Decisions & Rationale
For each significant decision made during brainstorming:
- What alternatives were considered
- Why this option was chosen over others
- What trade-offs were accepted

This is the most valuable section for future readers.

## Out of Scope
What we explicitly decided NOT to build, and why.

## Validation Criteria
How we'll know it works:
- What tests to write
- What UI checks to perform
- What success looks like
```

## Process

### 1. Write the Spec

Write the spec in one pass. You have full context from brainstorming — use it. Don't hold back details.

### 2. Self-Review

After writing, scan the spec for:

1. **Placeholders:** Any "TBD", "TODO", or vague sections? Fix them.
2. **Contradictions:** Do any sections disagree with each other? Resolve them.
3. **Ambiguity:** Could any requirement be interpreted two ways? Pick one and be explicit.
4. **Scope creep:** Did anything sneak in that wasn't discussed? Remove it.

Fix issues inline. No need to flag them — just fix.

### 3. User Review (if chosen)

If the user chose "Write spec, then review together" at the transition gate:
- Present the spec to the user
- Iterate on feedback until the user approves
- The user may edit the file directly — always re-read before proceeding

If the user chose "Write spec and go straight to work":
- Self-review is sufficient
- Commit and proceed to planning

### 4. Commit

```bash
git add docs/old-sdd/specs/YYYY-MM-DD-<topic>.md
git commit -m "spec: <topic>

<brief description of what was specified>"
```

## Colleague Mode

Apply colleague-mode during self-review:
- Is this spec ambitious enough? Or did we settle for a mediocre approach?
- Are the validation criteria actually testable?
- Would a future reader understand WHY decisions were made?
```

- [ ] **Step 2: Commit**

```bash
git add shared/spec.md
git commit -m "feat: add spec phase

Specification writing with structured format, self-review checklist,
user review gate, and Decisions & Rationale section."
```

---

### Task 5: Plan Phase

**Files:**
- Create: `shared/plan.md`

- [ ] **Step 1: Create shared/plan.md**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add shared/plan.md
git commit -m "feat: add plan phase

Wave-based task planning with dependency tracking, model hints
for cost optimization, and structured plan format."
```

---

### Task 6: Implement Phase

**Files:**
- Create: `shared/implement.md`

- [ ] **Step 1: Create shared/implement.md**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add shared/implement.md
git commit -m "feat: add implement phase

Wave-based execution with parallel subagent dispatch, model
selection hints, atomic commits, and deviation handling."
```

---

### Task 7: Validate Phase

**Files:**
- Create: `shared/validate.md`

- [ ] **Step 1: Create shared/validate.md**

```markdown
# Validate Phase

Verify the implementation works and matches the spec.

## Process

### 1. Batch Baseline Checks

Run all baseline checks **in parallel** — they are independent:

- **Tests:** Run the project's test suite (including newly written tests)
- **Linter:** Run the project's linter (if configured)
- **Type checker:** Run the project's type checker (if configured)

Dispatch these simultaneously. Report combined results.

If any fail, fix the issues before proceeding. Loop back to the implement phase if code changes are needed.

### 2. UI Verification

**Only when changes could affect UI.** The agent decides based on what files were modified.

Changes that likely affect UI:
- Frontend components, templates, stylesheets
- CLI output formatting, help text, command handlers
- API responses consumed by a frontend

Changes that don't affect UI:
- Database migrations, backend-only logic
- Test files, configuration, documentation

**Web UI verification (Playwright):**
If Playwright or a browser tool is available:
- Navigate to affected pages
- Verify layout renders correctly
- Walk through key user flows end-to-end
- Check UX best practices: accessibility, responsiveness, visual hierarchy, loading states

**CLI UI verification:**
- Run the command with expected inputs
- Verify output formatting, colors, alignment
- Check help text is clear and accurate
- Test error messages for unhappy paths

**UX quality is the top priority.** Not just "does it render" but "is it well-designed and intuitive."

### 3. Spec Compliance Check

Walk through each section of the spec:

1. **Problem** — Does the implementation solve the stated problem?
2. **Solution** — Does it match the described approach?
3. **Behavior** — Does it handle the documented edge cases and error scenarios?
4. **Validation Criteria** — Are all listed criteria met?

Flag anything that was specced but not implemented, or implemented differently than specified.

### 4. Report Results

**All pass:**
Report success with a brief summary of what was validated.

**Test/lint/type failures:**
Loop back to implement phase. Fix the issues, re-validate.

**Spec compliance gaps:**
Surface the gap to the user. Options:
- Implement the missing part (loop to implement)
- Update the spec to reflect reality (if the change was intentional)

**Design-level failure:**
If the implementation fundamentally doesn't achieve the spec's goals, this isn't a test fix — it's a plan or spec issue. Escalate to the user.

## Colleague Mode

During validation, be honest:
- If tests pass but the implementation feels fragile, say so
- If the UI works but the UX is poor, flag it
- Don't rubber-stamp "all green" if you have concerns about quality
```

- [ ] **Step 2: Commit**

```bash
git add shared/validate.md
git commit -m "feat: add validate phase

Parallel baseline checks, conditional UI verification with UX
priority, and spec compliance checking."
```

---

### Task 8: Build Orchestrator

**Files:**
- Create: `shared/build-flow.md`

- [ ] **Step 1: Create shared/build-flow.md**

```markdown
# Build Flow — Feature Development Orchestrator

Full pipeline for feature development: brainstorm → spec → plan → implement → validate.

## Flow

```
brainstorm ←→ (internal research)
    ↓
  spec → plan → implement ←→ validate
                    ↑              |
                    └──────────────┘ (on failure)
```

## Phase Execution

### Phase 1: Brainstorm

Execute the brainstorm phase (shared/brainstorm.md):
- Ask questions (batched when independent, sequential when dependent)
- Research as needed during questioning
- Apply colleague-mode at decision points
- End with the transition gate

### Phase 2: Spec

Execute the spec phase (shared/spec.md):
- Write specification to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`
- Self-review the spec
- If user chose "review together": present for approval
- If user chose "straight to work": self-review only, proceed
- Commit the spec

### Phase 3: Plan

Execute the plan phase (shared/plan.md):
- Break spec into tasks with wave-based parallelism
- Write plan to `.osd/plan.md`
- Identify what can run in parallel and what needs sequencing

### Phase 4: Implement

Execute the implement phase (shared/implement.md):
- Execute wave by wave
- Dispatch parallel subagents for independent tasks
- Use cheaper model for straightforward tasks
- Atomic commit per task (code + tests)

### Phase 5: Validate

Execute the validate phase (shared/validate.md):
- Batch baseline checks (tests + lint + types in parallel)
- UI verification if changes touched UI
- Spec compliance check
- On failure: loop to Phase 4 (or Phase 3 if design-level issue)

## Behavior Rules

1. **Start fresh.** Don't look for existing state or try to resume. If the user wants to continue interrupted work, they invoke a phase skill directly.
2. **Flow forward.** Don't skip phases. Even if the feature seems simple, go through brainstorm → spec → plan → implement → validate.
3. **Loop on failure.** If validation fails, loop back to implement. If the plan was wrong, loop back to plan. If the spec was wrong, surface it to the user — don't try to fix the spec unilaterally.
4. **Colleague mode throughout.** Apply shared/colleague-mode.md behavior in every phase, especially at decision points.
```

- [ ] **Step 2: Commit**

```bash
git add shared/build-flow.md
git commit -m "feat: add build orchestrator flow

Full feature pipeline: brainstorm → spec → plan → implement → validate
with failure looping and colleague-mode throughout."
```

---

### Task 9: Fix Orchestrator

**Files:**
- Create: `shared/fix-flow.md`

- [ ] **Step 1: Create shared/fix-flow.md**

```markdown
# Fix Flow — Bug Fix Orchestrator

Lighter pipeline for bug fixes: understand → plan → implement → validate.

No spec is produced. The fix itself is the deliverable.

## Flow

```
brainstorm (understand bug)
    ↓
  plan (ephemeral) → implement ←→ validate
                         ↑              |
                         └──────────────┘ (on failure)
```

## Phase Execution

### Phase 1: Understand the Bug

Use brainstorm-phase questioning, but focused on understanding the bug:

- **Reproduction:** What are the steps to reproduce? What is the expected vs actual behavior?
- **Root cause investigation:** Explore the codebase. Read error logs, stack traces, relevant code.
- **Colleague mode:** Question the user's assumptions about the cause. The user might be wrong about where the bug is.

This phase is lighter than feature brainstorming — fewer questions, more investigation.

### Phase 2: Plan

Create a brief task list. This is ephemeral — it stays in agent context, not saved to disk.

For **complex/deep bugs** (agent's judgment): write a root-cause analysis to `docs/old-sdd/investigations/<topic>.md` and commit it. This helps if the same area breaks again.

### Phase 3: Implement

Same as the build flow's implement phase:
- Execute tasks
- Write tests that reproduce the bug and verify the fix
- Atomic commits

**Key difference:** Every bug fix MUST include a regression test that:
1. Would have failed before the fix
2. Passes after the fix

### Phase 4: Validate

Same as the build flow's validate phase:
- Batch baseline checks
- UI verification if relevant
- Confirm the bug is actually fixed — reproduce the original steps

## Behavior Rules

1. **No spec.** Bug fixes don't need formal specs. The fix and its test are the documentation.
2. **Investigation notes for deep bugs.** If the bug took significant investigation, document the root cause in `docs/old-sdd/investigations/`.
3. **Regression tests are mandatory.** Every fix must include a test that would have caught the bug.
4. **Colleague mode on root cause.** Don't just fix the symptom. If the real problem is deeper, surface it.
```

- [ ] **Step 2: Commit**

```bash
git add shared/fix-flow.md
git commit -m "feat: add fix orchestrator flow

Lightweight bug fix pipeline with mandatory regression tests and
optional root-cause investigation notes."
```

---

### Task 10: Copilot CLI Skill Wrappers

**Files:**
- Create: `copilot/skills/osd-build/SKILL.md`
- Create: `copilot/skills/osd-fix/SKILL.md`
- Create: `copilot/skills/osd-brainstorm/SKILL.md`
- Create: `copilot/skills/osd-spec/SKILL.md`
- Create: `copilot/skills/osd-plan/SKILL.md`
- Create: `copilot/skills/osd-implement/SKILL.md`
- Create: `copilot/skills/osd-validate/SKILL.md`

Each wrapper is a thin SKILL.md with YAML frontmatter and `@` references to shared files.

- [ ] **Step 1: Create copilot/skills/osd-build/SKILL.md**

```markdown
---
name: osd-build
description: "Full feature development: brainstorm → spec → plan → implement → validate"
---

# osd-build

Full feature development pipeline. Starts with brainstorming questions, produces a spec, plans the work, implements with parallel subagents, and validates the result.

Invoke this when the user wants to build a new feature or make a significant change.

@~/.copilot/old-sdd/shared/build-flow.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 2: Create copilot/skills/osd-fix/SKILL.md**

```markdown
---
name: osd-fix
description: "Bug fix pipeline: understand → plan → implement → validate"
---

# osd-fix

Lightweight bug fix pipeline. Understands the bug through investigation and questions, plans a fix, implements with regression tests, and validates.

Invoke this when the user reports a bug or wants to fix unexpected behavior.

@~/.copilot/old-sdd/shared/fix-flow.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 3: Create copilot/skills/osd-brainstorm/SKILL.md**

```markdown
---
name: osd-brainstorm
description: "Interactive brainstorming with integrated research"
---

# osd-brainstorm

Standalone brainstorming phase. Ask questions, research options, challenge assumptions, and build shared understanding.

Use this when you want brainstorming without the full build pipeline — for exploration, ideation, or early-stage thinking.

@~/.copilot/old-sdd/shared/brainstorm.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 4: Create copilot/skills/osd-spec/SKILL.md**

```markdown
---
name: osd-spec
description: "Write a specification document from brainstorming context"
---

# osd-spec

Write and commit a specification document. Use after brainstorming to formalize decisions.

If no brainstorming context exists in the current session, ask the user what to specify — or suggest running osd-brainstorm first.

@~/.copilot/old-sdd/shared/spec.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 5: Create copilot/skills/osd-plan/SKILL.md**

```markdown
---
name: osd-plan
description: "Break a spec into executable tasks with wave-based parallelism"
---

# osd-plan

Create an implementation plan from a specification. Produces wave-based task breakdown with dependency tracking and model hints.

If no spec exists in the current session, look for the most recent spec in `docs/old-sdd/specs/`. If none found, ask the user what to plan.

@~/.copilot/old-sdd/shared/plan.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 6: Create copilot/skills/osd-implement/SKILL.md**

```markdown
---
name: osd-implement
description: "Execute a plan with parallel subagents"
---

# osd-implement

Execute an implementation plan wave by wave. Dispatches parallel subagents for independent tasks, uses cheaper models for straightforward work.

If no plan exists in the current session, check `.osd/plan.md`. If not found, ask the user what to implement — or suggest running osd-plan first.

@~/.copilot/old-sdd/shared/implement.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 7: Create copilot/skills/osd-validate/SKILL.md**

```markdown
---
name: osd-validate
description: "Verify implementation quality and spec compliance"
---

# osd-validate

Run validation checks: tests, linter, type checker (all in parallel), UI verification if relevant, and spec compliance check.

Can be invoked standalone to validate any recent changes, or as part of the build/fix pipeline.

@~/.copilot/old-sdd/shared/validate.md
@~/.copilot/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 8: Commit**

```bash
git add copilot/
git commit -m "feat: add Copilot CLI skill wrappers

Thin SKILL.md wrappers for all 7 skills (2 orchestrators + 5 phases)
referencing shared core logic via @ file includes."
```

---

### Task 11: Codex CLI Skill Wrappers

**Files:**
- Create: `codex/skills/osd-build/SKILL.md`
- Create: `codex/skills/osd-fix/SKILL.md`
- Create: `codex/skills/osd-brainstorm/SKILL.md`
- Create: `codex/skills/osd-spec/SKILL.md`
- Create: `codex/skills/osd-plan/SKILL.md`
- Create: `codex/skills/osd-implement/SKILL.md`
- Create: `codex/skills/osd-validate/SKILL.md`

Same structure as Copilot wrappers, but with Codex-specific adaptations:
- Interactive skills check that the user is in suggest/plan mode (not auto-edit)
- Paths use `~/.codex/` instead of `~/.copilot/`

- [ ] **Step 1: Create codex/skills/osd-build/SKILL.md**

```markdown
---
name: osd-build
description: "Full feature development: brainstorm → spec → plan → implement → validate"
---

# osd-build

Full feature development pipeline. Starts with brainstorming questions, produces a spec, plans the work, implements with parallel subagents, and validates the result.

Invoke this when the user wants to build a new feature or make a significant change.

<codex_adapter>
This skill requires interactive mode for the brainstorming phase. If you are in auto-edit mode, tell the user:

"osd-build starts with brainstorming, which needs interactive mode. Please restart with: codex --suggest"

Once past brainstorming and spec, the implement and validate phases work well in auto-edit mode.
</codex_adapter>

@~/.codex/old-sdd/shared/build-flow.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 2: Create codex/skills/osd-fix/SKILL.md**

```markdown
---
name: osd-fix
description: "Bug fix pipeline: understand → plan → implement → validate"
---

# osd-fix

Lightweight bug fix pipeline. Understands the bug through investigation and questions, plans a fix, implements with regression tests, and validates.

<codex_adapter>
The bug understanding phase benefits from interactive mode. If in auto-edit mode, suggest switching:

"osd-fix works best in suggest mode for the investigation phase. Consider: codex --suggest"

If the user provides enough context in their initial message, you may proceed in auto-edit mode.
</codex_adapter>

@~/.codex/old-sdd/shared/fix-flow.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 3: Create codex/skills/osd-brainstorm/SKILL.md**

```markdown
---
name: osd-brainstorm
description: "Interactive brainstorming with integrated research"
---

# osd-brainstorm

Standalone brainstorming phase. Ask questions, research options, challenge assumptions, and build shared understanding.

<codex_adapter>
**REQUIRED: Interactive mode.**

Brainstorming requires asking questions and getting answers. This only works in suggest or plan mode. If you are in auto-edit mode, tell the user:

"Brainstorming needs interactive mode. Please restart with: codex --suggest"

Do not attempt to brainstorm without user interaction.
</codex_adapter>

@~/.codex/old-sdd/shared/brainstorm.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 4: Create codex/skills/osd-spec/SKILL.md**

```markdown
---
name: osd-spec
description: "Write a specification document from brainstorming context"
---

# osd-spec

Write and commit a specification document. Use after brainstorming to formalize decisions.

If no brainstorming context exists in the current session, ask the user what to specify — or suggest running osd-brainstorm first.

<codex_adapter>
Writing a spec benefits from interactive mode (user review). If in auto-edit mode, the agent can write the spec but cannot ask for user review — it will self-review only.
</codex_adapter>

@~/.codex/old-sdd/shared/spec.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 5: Create codex/skills/osd-plan/SKILL.md**

```markdown
---
name: osd-plan
description: "Break a spec into executable tasks with wave-based parallelism"
---

# osd-plan

Create an implementation plan from a specification. Produces wave-based task breakdown with dependency tracking and model hints.

If no spec exists in the current session, look for the most recent spec in `docs/old-sdd/specs/`. If none found, ask the user what to plan.

@~/.codex/old-sdd/shared/plan.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 6: Create codex/skills/osd-implement/SKILL.md**

```markdown
---
name: osd-implement
description: "Execute a plan with parallel subagents"
---

# osd-implement

Execute an implementation plan wave by wave. Dispatches parallel subagents for independent tasks, uses cheaper models for straightforward work.

If no plan exists in the current session, check `.osd/plan.md`. If not found, ask the user what to implement.

<codex_adapter>
This skill works best in auto-edit mode where the agent can modify files without confirmation. If in suggest mode, the agent may need repeated approvals.
</codex_adapter>

@~/.codex/old-sdd/shared/implement.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 7: Create codex/skills/osd-validate/SKILL.md**

```markdown
---
name: osd-validate
description: "Verify implementation quality and spec compliance"
---

# osd-validate

Run validation checks: tests, linter, type checker (all in parallel), UI verification if relevant, and spec compliance check.

<codex_adapter>
Validation runs commands and checks output — works well in auto-edit mode. Interactive mode is only needed if spec compliance issues require user decision.
</codex_adapter>

@~/.codex/old-sdd/shared/validate.md
@~/.codex/old-sdd/shared/colleague-mode.md
```

- [ ] **Step 8: Commit**

```bash
git add codex/
git commit -m "feat: add Codex CLI skill wrappers

Thin SKILL.md wrappers with codex_adapter sections for mode
awareness. Interactive skills prompt user to switch to suggest mode."
```

---

### Task 12: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

```markdown
# old-sdd

Simple spec-driven development for AI coding agents.

old-sdd is a set of markdown skills that teach your AI agent to brainstorm thoroughly, write specs, plan with parallelism, implement ambitiously, and validate honestly. The agent acts as a senior colleague — it has opinions and isn't afraid to disagree with you.

## Skills

| Skill | Description |
|-------|-------------|
| `/osd-build` | Full feature pipeline: brainstorm → spec → plan → implement → validate |
| `/osd-fix` | Bug fix pipeline: understand → plan → implement → validate |
| `/osd-brainstorm` | Standalone brainstorming with integrated research |
| `/osd-spec` | Write a specification document |
| `/osd-plan` | Break a spec into parallelizable tasks |
| `/osd-implement` | Execute a plan with parallel subagents |
| `/osd-validate` | Verify implementation quality and spec compliance |

## Installation

### GitHub Copilot CLI

```bash
git clone https://github.com/<your-user>/old-sdd /tmp/old-sdd
cp -r /tmp/old-sdd/copilot/skills/osd-* ~/.copilot/skills/
mkdir -p ~/.copilot/old-sdd
cp -r /tmp/old-sdd/shared ~/.copilot/old-sdd/shared
```

### Codex CLI

```bash
git clone https://github.com/<your-user>/old-sdd /tmp/old-sdd
cp -r /tmp/old-sdd/codex/skills/osd-* ~/.codex/skills/
mkdir -p ~/.codex/old-sdd
cp -r /tmp/old-sdd/shared ~/.codex/old-sdd/shared
```

After installation, restart your agent CLI. The skills will appear in the command list.

## Usage

### Build a Feature

```
/osd-build
```

The agent will:
1. Ask you questions to understand what you want (batching independent questions for speed)
2. Research options and present findings with opinions
3. Write a spec and ask you to review it (or go straight to work)
4. Create a task plan with parallelizable waves
5. Implement using subagents where possible
6. Validate with tests, lint, type checks, and UI verification

### Fix a Bug

```
/osd-fix
```

Lighter flow: understand the bug → plan a fix → implement with regression tests → validate.

### Individual Phases

You can invoke any phase directly:

- `/osd-brainstorm` — Explore ideas without committing to build
- `/osd-spec` — Write a spec from existing context
- `/osd-plan` — Plan from an existing spec
- `/osd-implement` — Execute an existing plan
- `/osd-validate` — Validate recent changes

## Philosophy

**The agent is a colleague, not a tool.** It will:
- Challenge your ideas when it sees a better approach
- Push back on vague requirements
- Surface problems honestly instead of working around them
- Have genuine opinions about technical decisions

It won't be contrarian for the sake of it, and if you insist after hearing its counter-argument, it'll do it your way.

## Artifacts

| What | Where | Committed? |
|------|-------|-----------|
| Specs | `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md` | Yes |
| Plans | `.osd/plan.md` | No (usually) |
| Bug investigations | `docs/old-sdd/investigations/<topic>.md` | Yes (complex bugs) |
| Tests | Your project's test directory | Yes |

## Platforms

- **GitHub Copilot CLI** — Full support
- **OpenAI Codex CLI** — Full support (interactive skills require suggest mode)

## License

MIT
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README

Installation instructions, skill overview, usage guide, and
philosophy section."
```

---

### Task 13: Local Verification

**Purpose:** Verify the skills install correctly and are discoverable by the agent.

- [ ] **Step 1: Install to Copilot CLI**

```bash
# Create shared directory
mkdir -p ~/.copilot/old-sdd
cp -r shared/ ~/.copilot/old-sdd/shared

# Copy skill wrappers
cp -r copilot/skills/osd-* ~/.copilot/skills/
```

- [ ] **Step 2: Verify files are in place**

```bash
# Check shared files exist
ls ~/.copilot/old-sdd/shared/
# Expected: brainstorm.md  build-flow.md  colleague-mode.md  fix-flow.md  implement.md  plan.md  spec.md  validate.md

# Check skill wrappers exist
ls ~/.copilot/skills/osd-*/SKILL.md
# Expected: 7 SKILL.md files
```

- [ ] **Step 3: Verify @ references resolve**

```bash
# Check that all @~/.copilot/old-sdd/shared/ references in SKILL.md files point to existing files
for skill in ~/.copilot/skills/osd-*/SKILL.md; do
  echo "=== $skill ==="
  grep '@~/' "$skill" | while read -r line; do
    ref=$(echo "$line" | sed 's/@//' | sed "s|~|$HOME|")
    if [ -f "$ref" ]; then
      echo "  ✓ $ref"
    else
      echo "  ✗ MISSING: $ref"
    fi
  done
done
```

Expected: All references show ✓.

- [ ] **Step 4: Commit verification script (optional)**

If desired, save the verification script as `scripts/verify-install.sh` for future use.
