# old-sdd: Spec-Driven Development Tool

## Problem

AI coding agents behave like obedient tools — they implement the first idea without pushing back, take minimal approaches afraid to modify existing code, and skip important design decisions. Existing SDD tools (GSD, Superpowers, OpenSpec, spec-kit) solve parts of this but are complex (40–556 files) and opinionated in ways that don't fit every workflow.

We need a simpler SDD tool that:
- Asks thorough questions before building (agent should deeply understand the feature)
- Acts as a colleague who challenges decisions, not a tool that rubber-stamps everything
- Handles the full lifecycle: brainstorm → spec → plan → implement → validate
- Works on both GitHub Copilot CLI and OpenAI Codex CLI
- Is simple enough to understand and modify (pure markdown skills, no runtime)

## Solution

**old-sdd** is a set of markdown skill files for AI coding agents. It provides two orchestrated workflows (`build` for features, `fix` for bugs) and five individual phase skills that can be invoked standalone. The agent behaves as an opinionated senior colleague throughout.

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Architecture | Phase graph with orchestrator | Handles real-world non-linear workflows (loops, skips) |
| Delivery | Pure markdown skills | Zero runtime, zero dependencies, easy to modify |
| Brainstorm + Research | Merged into one phase | Research is needed during questioning, not as a separate step |
| Spec storage | `docs/old-sdd/specs/` (committed) | Visible, part of project docs, survives sessions |
| Plan storage | `.osd/plan.md` (not committed) | Ephemeral working document, derivable from spec |
| Agent personality | "Colleague mode" shared include | Consistent opinionated behavior across all phases |
| Platform support | Shared core + platform-specific wrappers | 90%+ shared logic, thin adapters for Copilot/Codex differences |
| Questions | Batch independent, sequential dependent | Saves tokens and time without sacrificing depth |
| Bug fixes | Lighter workflow, no spec | Bugs don't need formal specs — understand, plan, fix, validate |

## Architecture

### File Structure

```
old-sdd/
├── shared/                            # Core logic (90%+ of content)
│   ├── brainstorm.md                  # Questions + integrated research
│   ├── spec.md                        # Specification writing
│   ├── plan.md                        # Task breakdown + wave planning
│   ├── implement.md                   # Parallel execution
│   ├── validate.md                    # Testing + UI verification
│   ├── build-flow.md                  # Orchestrator: feature pipeline
│   ├── fix-flow.md                    # Orchestrator: bug fix pipeline
│   └── colleague-mode.md             # Shared personality/behavior
├── copilot/skills/                    # GitHub Copilot CLI wrappers
│   ├── osd-build/SKILL.md
│   ├── osd-fix/SKILL.md
│   ├── osd-brainstorm/SKILL.md
│   ├── osd-spec/SKILL.md
│   ├── osd-plan/SKILL.md
│   ├── osd-implement/SKILL.md
│   └── osd-validate/SKILL.md
├── codex/skills/                      # OpenAI Codex CLI wrappers
│   ├── osd-build/SKILL.md
│   ├── osd-fix/SKILL.md
│   ├── osd-brainstorm/SKILL.md
│   ├── osd-spec/SKILL.md
│   ├── osd-plan/SKILL.md
│   ├── osd-implement/SKILL.md
│   └── osd-validate/SKILL.md
├── README.md
└── LICENSE
```

### Platform Separation

Each platform wrapper is a thin SKILL.md with:
- YAML frontmatter (name, description, allowed-tools)
- Reference to the shared core file (`@shared/<phase>.md`)
- Platform-specific adaptations (e.g., Codex: check suggest mode before `ask_user`)

The shared files contain all the logic. Platform wrappers add only what differs.

### Skills Overview

| Skill | Type | Purpose |
|-------|------|---------|
| `osd-build` | Orchestrator | Full feature pipeline: brainstorm → spec → plan → implement → validate |
| `osd-fix` | Orchestrator | Bug fix pipeline: understand → plan → implement → validate |
| `osd-brainstorm` | Phase | Interactive questioning with integrated research |
| `osd-spec` | Phase | Write and commit specification document |
| `osd-plan` | Phase | Break spec into tasks with wave-based parallelism |
| `osd-implement` | Phase | Execute plan with parallel subagents |
| `osd-validate` | Phase | Run tests, check UI, verify spec compliance |

### Skill Communication

- **Within a session:** Agent context carries everything. No special state mechanism.
- **Between sessions:** Spec file (committed) and plan file (on disk) serve as handoff points.
- **Standalone invocation:** Each phase can find its inputs (look for recent spec, ask user if missing).
- **No custom state format.** Just files the agent reads naturally.

## Orchestrator: `osd-build`

The full feature development pipeline.

```
brainstorm ←→ (internal research)
    ↓
  spec → plan → implement ←→ validate
                    ↑              |
                    └──────────────┘ (on failure)
```

### Flow

**1. Brainstorm** (shared/brainstorm.md)
- Batch independent questions (parallel `ask_user`)
- Dependent questions asked sequentially
- Research integrated: web search for community recommendations, codebase analysis
- Colleague mode active at decision points
- Depth adapts to feature complexity

**2. Transition Gate**
Final brainstorming question:
> "I'm ready to write the spec. How would you like to proceed?"
> - Write spec, then review together
> - Write spec and go straight to work
> - I have more questions or feedback

**3. Spec** (shared/spec.md)
- Write spec to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`
- Self-review for gaps, contradictions, ambiguity
- If user chose "review together": present, iterate, approve
- If user chose "straight to work": self-review only, commit, continue
- Commit spec to repo

**4. Plan** (shared/plan.md)
- Break spec into tasks with dependencies
- Group into parallelizable waves
- Write plan to `.osd/plan.md` (not committed)
- Agent may commit plan for complex multi-phase features

**5. Implement** (shared/implement.md)
- Execute wave by wave
- Parallel subagents for independent tasks within a wave
- Cheaper model for straightforward tasks
- Atomic commit per task (code + tests together)

**6. Validate** (shared/validate.md)
- Batch baseline checks (tests + lint + types — all parallel)
- UI verification if changes touched UI
- Spec compliance check
- On failure: loop to implement (or plan if design-level issue)

### No Resume Logic

The orchestrator starts fresh every time. To continue interrupted work, the user invokes the appropriate phase skill directly (`/osd-plan`, `/osd-implement`, etc.).

## Orchestrator: `osd-fix`

Lighter pipeline for bug fixes.

**1. Brainstorm** (lighter)
- Understand the bug: reproduction steps, symptoms
- Investigate codebase
- Colleague mode: question user's assumptions about root cause
- No spec produced

**2. Plan** (ephemeral)
- Brief task list in agent context
- For complex/deep bugs: write root-cause analysis to `docs/old-sdd/investigations/`

**3. Implement** — Same as `osd-build`

**4. Validate** — Same as `osd-build`

## Phase: Brainstorm

Combines interactive questioning and research in one flow.

### Behavior

1. **Assess scope** — Is this one feature or multiple subsystems? If too large, decompose first.

2. **Batch independent questions** — Group questions that don't depend on each other. Use parallel `ask_user` calls. Example: "Target audience?" + "Tech stack?" + "Deadlines?" asked simultaneously.

3. **Sequential dependent questions** — When Q1's answer changes Q2, ask one at a time.

4. **Integrated research** — Agent researches during brainstorming:
   - Before asking "which database?", search for popular options and community recommendations
   - Date-aware: prioritize current solutions, filter out stale/deprecated options
   - Present research findings as part of the question, not as a separate phase

5. **Colleague mode active** — Challenge decisions, propose alternatives, don't rubber-stamp.

6. **Adaptive depth** — Simple feature: 3-5 questions. Complex system: 15-20. Always aim for excellence.

7. **Transition gate** — Final question: review spec, straight to work, or more discussion.

### What It Produces

Nothing persisted. Shared understanding in agent context, consumed by the spec phase.

## Phase: Spec

Crystallizes brainstorming into a committed document.

### Spec Format

```markdown
# <Feature Name>

## Problem
What we're solving and why.

## Solution
What we're building. High-level approach.

## Architecture
Components, data flow, key interfaces.
(Skip for simple features.)

## Behavior
How it works from the user's perspective.
Edge cases, error handling.

## Decisions & Rationale
For each significant decision made during brainstorming:
- What alternatives were considered
- Why this option was chosen over others
- What trade-offs were accepted
This is the most valuable section for future readers. It captures the *why*, not just the *what*.

## Out of Scope
What we explicitly decided NOT to build, and why.

## Validation Criteria
How we'll know it works. What to test. What UI checks to perform.
```

Sections are scaled to complexity. A simple feature might only have Problem, Solution, Behavior, and Validation Criteria.

### Process

1. Write spec in one pass from brainstorming context.
2. Self-review: scan for TBD, contradictions, ambiguity, scope creep — fix inline.
3. If "review together" chosen: present to user, iterate until approved.
4. If "straight to work" chosen: self-review only, commit, move on.
5. Commit to git.

## Phase: Plan

Breaks the spec into executable tasks grouped by dependency.

### Plan Format

```markdown
# Plan: <Feature Name>
Spec: docs/old-sdd/specs/YYYY-MM-DD-<topic>.md

## Tasks

### Wave 1 (parallel)
- [ ] Task A: <description>
      Files: <file list>
- [ ] Task B: <description>
      Files: <file list>

### Wave 2 (depends on Wave 1)
- [ ] Task C: <description>
      Files: <file list>

## Notes
- Why tasks are grouped this way
- Model selection hints (straightforward vs complex tasks)
```

### Key Properties

- **Wave-based parallelism** — Independent tasks grouped into waves. Parallel within a wave, sequential between waves.
- **File-level dependency tracking** — Different files → can be parallel. Same files → sequential.
- **Agent judgment** — No algorithm. Agent decides grouping based on understanding.
- **Atomic commits** — One commit per task. Each includes code and its tests.
- **Model hints** — Agent notes which tasks are simple enough for a cheaper model.

### Storage

Written to `.osd/plan.md`. Not committed by default. Agent commits for complex multi-phase features where the plan captures decisions beyond the spec.

## Phase: Implement

Executes the plan.

### Process

1. **Read plan** — Load `.osd/plan.md`.

2. **Execute wave by wave:**
   - Single task in wave → execute directly (no subagent overhead)
   - Multiple tasks in wave → dispatch parallel subagents via `task` tool
   - Each subagent receives: relevant spec excerpt, task description, files to touch
   - Cheaper model (e.g., `claude-haiku-4.5`) for straightforward tasks

3. **Atomic commits** — Each task = one commit. Code + tests committed together.

4. **Deviation handling:**
   - Minor deviation: fix and note in commit
   - Major deviation: stop, explain to user, propose spec/plan update
   - Don't silently work around problems

5. **Tests as part of implementation** — Each task writes tests for the code it produces. Tests are committed alongside the code, not generated later.

### Subagent Context

Each parallel worker receives:
- The relevant spec section
- Its specific task from the plan
- Files it should modify
- Any relevant context from completed waves
- Instruction to stop and report if something doesn't make sense
- Colleague-mode excerpt: aim for excellent solutions, don't take shortcuts

## Phase: Validate

Verifies implementation quality and spec compliance.

### Process

1. **Batch baseline checks** (all parallel):
   - Run existing tests (including newly written ones)
   - Run linter
   - Run type checker
   - Report combined results

2. **UI verification** (only when changes could affect UI):
   - Web UI: Playwright — layout, user flows, UX best practices
   - CLI UI: run tool, verify output formatting and UX
   - **UX quality is the top priority** — not just "works" but "is good"
   - Agent decides whether changes touched UI

3. **Spec compliance check:**
   - Walk through each spec section
   - Verify implementation matches what was promised
   - Flag anything missing or different

4. **Report:**
   - All pass → done, summary to user
   - Test failures → loop to implement
   - Design-level failures → loop to plan (or escalate to user)

## Colleague Mode

Shared behavior included by all phase skills. Defines the agent as a senior colleague, not a tool.

### When It Activates

- Decision points during brainstorming
- Spec review (is the spec ambitious enough?)
- Implementation (surfacing problems, not working around them)
- Validation (honest quality assessment)
- **NOT** during routine exchanges (file paths, confirmations, simple questions)

### Techniques

**Forced counter-argument at decisions:**
Before agreeing with a user's design choice, generate at least one genuine alternative. Present it as your own opinion. If the user's choice truly is best, explain why the alternative is worse — don't just agree.

**Anti-sycophancy examples:**
```
❌ "Great idea! Let's use PostgreSQL."
❌ "Excellent observation about caching!"
✅ "PostgreSQL works, but have you considered SQLite? Your data is
    small and single-user. PostgreSQL adds ops overhead for no benefit."
✅ "I disagree with caching here. The bottleneck is the API call,
    not data access. Caching masks the real problem."
```

**Challenge weak specifications:**
If a spec says "make it fast" or "good UX", push for specifics. What does fast mean? Sub-200ms? What does good UX mean? Accessible? Mobile-first?

**Surface problems honestly:**
During implementation, if the approach feels wrong, stop and say so. Don't implement a solution you believe is bad. Propose a better one.

**No overhead on routine:**
This doesn't apply to every message. "What's the file path?" → just answer. "Which database should we use?" → decision point, engage colleague mode.

### What It Is NOT

- Not contrarian for the sake of it
- Not blocking — if user insists after hearing the counter-argument, do it their way
- Not condescending — peer-to-peer, not teacher-to-student

## Artifacts

| Artifact | Location | Committed | When Created |
|----------|----------|-----------|--------------|
| Spec | `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md` | Yes | Feature builds only |
| Plan | `.osd/plan.md` | No (usually) | Every build, agent may commit for complex features |
| Investigation | `docs/old-sdd/investigations/<topic>.md` | Yes | Complex/deep bugs only (agent's judgment) |
| Tests | Project test directories | Yes | During implementation |

## Installation

Copy the platform-specific skill directories to the agent's skill location:

**Copilot CLI:**
```bash
cp -r copilot/skills/osd-* ~/.copilot/skills/
cp -r shared/ ~/.copilot/old-sdd/shared/
```

**Codex CLI:**
```bash
cp -r codex/skills/osd-* ~/.codex/skills/
cp -r shared/ ~/.codex/old-sdd/shared/
```

Detailed installation instructions in README.md.

## Codex CLI Adaptations

The Codex CLI wrapper skills include these platform-specific behaviors:

- **Mode check before `ask_user`:** Brainstorming skill checks if the user is in suggest/plan mode. If in auto-edit mode, prompts the user to switch to suggest mode for interactive questioning.
- **Implementation in auto-edit mode:** The implement and validate phases work best in auto-edit mode where the agent can modify files without confirmation.

## Out of Scope

- Central marketplace or registry (future, if demand exists)
- Database or custom state management
- CLI installer tool
- Web dashboard or UI
- Integration with CI/CD
- Support for agents beyond Copilot CLI and Codex CLI (future)
