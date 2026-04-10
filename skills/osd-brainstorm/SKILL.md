---
name: osd-brainstorm
description: "Use to explore ideas, gather requirements, or make design decisions before building. Discusses interactively and writes the spec incrementally as decisions are made. Handles questioning, research, critical thinking, and spec writing in one flow."
---

# Brainstorm Phase

Explore what to build through interactive questioning — AND write the spec as you go. Decisions become spec sections immediately, so nothing is lost to context compaction.

After brainstorming, suggest `/osd-plan` to create an implementation plan, or `/osd-build` to run the full pipeline.

## Iron Law

**DO NOT RUSH TO SPEC.** The problem is never "too many questions" — it's "not enough questions." You are not done exploring until you can answer every section of the spec from memory.

### Anti-Rationalization Table

| Temptation | Reality |
|-----------|---------|
| "I have a good enough picture" | You don't. List what you'd write in each spec section — any blanks? |
| "The user seems impatient" | They'll be more impatient when you build the wrong thing. Ask. |
| "This is simple, I can figure it out" | Simple features have the most implicit assumptions. Surface them. |
| "I'll handle details during implementation" | That's where silent wrong decisions happen. Ask now. |
| "We can iterate later" | Iteration costs 10x more than getting it right the first time. |

## Process

### 1. Assess Scope

Before asking detailed questions, evaluate the request:

- **Single feature or small change?** → Proceed normally.
- **Multiple independent subsystems?** → Flag immediately. Help decompose into sub-projects. Brainstorm the first sub-project through the normal flow.

### 2. Create the Spec File

Create `/tmp/osd-spec-<topic>.md` immediately with the skeleton:

```markdown
# <Feature Name>

## Problem
<!-- Why are we building this? What pain point exists? -->

## Solution
<!-- High-level approach -->

## Architecture
<!-- Components, data flow, key interfaces (skip for simple features) -->

## Behavior
<!-- How it works from the user's perspective, edge cases, error handling -->

## Decisions & Rationale
<!-- For each significant decision: alternatives considered, why this option, trade-offs -->

## Out of Scope
<!-- What we explicitly decided NOT to build, and why -->

## Validation Criteria
<!-- How we'll know it works: tests, UI checks, success definition -->
```

Tell the user: "I've started the spec at `/tmp/osd-spec-<topic>.md`. I'll fill it in as we discuss."

### 3. Ask Questions — Write Spec Incrementally

As each topic is discussed and decisions are made, **immediately write the corresponding spec section.** Don't wait until the end.

**Batch independent questions** — ask multiple at once when answers don't depend on each other.

**Sequential for dependent questions** — when one answer determines the next.

**After each batch of answers:** update the spec file with what you learned. Tell the user which section you updated.

**Adaptive depth — match question depth to complexity:**

| Complexity | Questions | Examples |
|-----------|-----------|---------|
| Trivial | 2-4 | Config change, simple utility function |
| Small | 5-8 | New API endpoint, UI component |
| Medium | 8-15 | Feature with multiple moving parts |
| Large | 15-25 | New subsystem, architectural change |

### 4. Detail Discovery

After high-level questions, drill into implementation details. These are the questions that prevent wrong assumptions during implementation:

- **Data:** What's the shape? Where does it come from? What are the constraints?
- **Error cases:** What happens when X fails? What does the user see?
- **Edge cases:** Empty state? Maximum limits? Concurrent access?
- **Integration:** What existing code does this touch? What APIs does it call?
- **UX:** What does the user see at each step? What feedback do they get?

### 5. Research During Brainstorming

Research happens naturally during questioning:

- **Before forming opinions:** Research current community recommendations before answering "which X should we use?"
- **During discussion:** Research unfamiliar technology before continuing.
- **Date awareness:** Check the current date. Filter out stale solutions and deprecated libraries.

**Research methods:**
- Web search for community recommendations and recent discussions
- Codebase analysis to understand existing patterns and constraints
- Clone reference repos to /tmp when deeper analysis helps

**Present findings inline** — weave into the conversation, don't dump a report.

### 6. Colleague Mode

You are a senior colleague, not a tool. You have opinions and you defend them.

**At decision points:**

1. Generate at least one genuine alternative or counter-argument
2. Present it as your own opinion, not a hypothetical
3. If the user's choice is best, explain specifically why the alternative is worse

**Anti-sycophancy — never respond with empty praise:**

| Bad | Good |
|-----|------|
| "Great idea! Let's go with PostgreSQL." | "PostgreSQL works, but have you considered SQLite? Your data is small and single-user." |
| "That's a solid approach." | "That works, but I'd push for X instead because [reason]. Your call." |

**Challenge weak requirements:**

- "Make it fast" → "Fast how? Sub-200ms API response? Sub-1s page load? For what percentile?"
- "Scalable" → "Scale to what? 100 users? 10K? 1M? The architecture changes depending on the answer."

**Boundaries:** Not contrarian for its own sake. Not blocking — if the user insists, do it their way. Not condescending. Not on every message — only at decision points.

### 7. Readiness Checklist

Before transitioning, verify completeness. Read the spec file and check:

- [ ] **Problem** section filled — clear pain point, not vague
- [ ] **Solution** section filled — concrete approach, not hand-wavy
- [ ] **Behavior** section filled — covers happy path AND error/edge cases
- [ ] **Decisions** section filled — each significant choice has alternatives + rationale
- [ ] **Validation Criteria** filled — specific, testable criteria
- [ ] **No TODO/TBD markers** remaining in the spec
- [ ] **No open questions** you know about but haven't asked

If ANY checkbox fails, go back and ask more questions. Show the user the checklist with what's missing.

### 8. Transition Gate

When the checklist passes, ask:

> "The spec is complete at `/tmp/osd-spec-<topic>.md`. How would you like to proceed?"

Choices:
1. **"Review together"** — User reviews spec, iterates on feedback.
2. **"Commit and continue"** — Commit spec to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md` and proceed to planning.
3. **"More questions"** — Continue brainstorming.

## Committing the Spec

When the user is ready:
1. Copy from `/tmp/osd-spec-<topic>.md` to `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`
2. Commit:
```bash
git add docs/old-sdd/specs/YYYY-MM-DD-<topic>.md
git commit -m "spec: <topic>

<brief description>"
```

## What Happens Next

- **In a `/osd-build` pipeline** → transition to plan phase
- **Standalone** → suggest `/osd-plan` to create implementation plan, or `/osd-build` for full pipeline

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
