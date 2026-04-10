---
name: osd-spec
description: "Use to explore ideas, gather requirements, and write a spec. Interactively discusses what to build and writes the specification incrementally as decisions are made. Handles everything from vague ideas to formal specs."
---

# Spec — Interactive Specification

Explore what to build AND write the spec as you go. Decisions become spec sections immediately, so nothing is lost to context compaction.

## Write as You Go

After each phase, write (or update) the corresponding spec sections to the file before asking the next round of questions. If context gets compacted, the spec file preserves everything.

**Don't rush to write either.** Every section you write should be backed by actual answers, not assumptions. If you'd have to guess — ask first.

## Mode Detection

When invoked, assess **what kind of task** and **how much the user already knows**.

### Task Type

- **Feature** → Full exploration pipeline, all phases
- **Bug fix** → Lightweight: what's broken, repro steps, expected behavior. Write a minimal spec (Problem + Behavior + Validation). Skip Architecture and detailed edge-case exploration.
- **Small change** (config, rename, refactor) → Quick: Problem + Solution + Validation. May not even need a spec file — ask the user.

### User Knowledge

- **Vague idea** ("I want to add notifications") → Full exploration flow, all phases
- **Clear requirements** ("Add email notifications via SendGrid when orders ship, with retry logic") → Quick clarification (2-4 questions), then write spec
- **Complete brief** (user provides detailed requirements) → Write spec directly, present for review

Combine both: a vague feature gets the full pipeline; a clear bug fix gets 2-3 questions and a minimal spec.

## Spec File

Create `/tmp/osd-<topic>/spec.md` at the start with a skeleton. Fill sections as understanding forms.

### Spec Template

```markdown
# <Feature Name>

## Problem
<!-- What's broken or missing? Who has this pain? What happens today? -->

## Solution
<!-- High-level approach. What are we building? -->

## Architecture
<!-- Components, data flow, key interfaces. Skip for simple features. -->

## Behavior
<!-- How it works from the user's perspective. Edge cases. Error handling. -->

## Decisions & Rationale
<!-- For each significant choice: alternatives considered, why this option, trade-offs -->

## Out of Scope
<!-- What we explicitly decided NOT to build, and why -->

## Validation Criteria
<!-- How we'll know it works: tests, UI checks, success definition -->
```

Scale each section to complexity. Skip sections that don't apply. A config change might only need Problem, Solution, Behavior, and Validation.

## Exploration Pipeline

### Phase 1: Understand (always)

1. Ask about the problem and context:
   - What's broken or missing? Why does it matter?
   - Who uses this? What do they do today?
   - What triggered this — a user complaint, a technical need, a new requirement?
2. **Write `## Problem` to the spec file.** Don't proceed to Phase 2 until it's written.

### Phase 2: Approach (always)

1. Ask about the solution direction:
   - What approach are you leaning toward? Or should we explore options?
   - What existing code/systems does this touch?
   - Are there constraints (tech stack, timeline, compatibility)?
2. **Write `## Solution` to the spec file.** Start `## Decisions & Rationale` if choices were made. Don't proceed to Phase 3 until it's written.

### Phase 3: Details (adaptive depth)

This is where depth scales with complexity. Ask about whatever the feature needs — the spec sections emerge from the conversation:

**Data & integration:**
- What's the data shape? Where does it come from?
- What APIs does this call or expose?
- What existing code gets modified?

**Behavior & UX:**
- Walk me through the happy path step by step
- What does the user see at each step?
- What happens when X fails? What does the user see?

**Edge cases & errors:**
- Empty state? Maximum limits? Concurrent access?
- What if the input is invalid? What if the service is down?
- What are the security considerations?

**Architecture (if needed):**
- What are the components?
- How do they communicate?
- What are the key interfaces?

**After each batch of answers, write or update the relevant spec sections** (`## Architecture`, `## Behavior`, more `## Decisions`) to the file before asking the next batch.

Continue until all relevant details are covered. Don't stop at the surface.

### Phase 4: Boundaries (always)

1. Ask about scope and testing:
   - What's explicitly NOT included in this work?
   - How should we test this? What automated tests?
   - What does "done" look like?
2. **Write `## Out of Scope` and `## Validation Criteria` to the spec file.**

## Honest Feedback

Have opinions and defend them. At decision points:

1. Generate at least one genuine alternative or counter-argument
2. Present it as your own opinion, not a hypothetical
3. If the user's choice is best, explain specifically why the alternative is worse

**Never respond with empty praise:**

| Bad | Good |
|-----|------|
| "Great idea! Let's go with PostgreSQL." | "PostgreSQL works, but have you considered SQLite? Your data is small and single-user." |
| "That's a solid approach." | "That works, but I'd push for X instead because [reason]. Your call." |

**Challenge weak requirements:**

- "Make it fast" → "Fast how? Sub-200ms API response? Sub-1s page load? For what percentile?"
- "Scalable" → "Scale to what? 100 users? 10K? 1M? Architecture changes depending on the answer."

Not contrarian for its own sake. Not blocking — if the user insists, do it their way. Not condescending. Only at decision points.

## Readiness Checklist

Before transitioning, read the spec file and verify:

- [ ] **Problem** section filled — clear pain point, not vague
- [ ] **Solution** section filled — concrete approach, not hand-wavy
- [ ] **Behavior** section filled — covers happy path AND error/edge cases
- [ ] **Decisions** section filled — each significant choice has alternatives + rationale
- [ ] **Validation Criteria** filled — specific, testable criteria
- [ ] **No TODO/TBD markers** remaining
- [ ] **No open questions** you know about but haven't asked

If ANY fails, ask more questions. Show the checklist with what's missing.

When everything passes, get user approval to move to planning.

## Saving the Spec

Ask the user whether to save the spec to the project. For features, recommend saving. For bug fixes and small changes, mention it's optional.

If yes, detect the docs folder:
1. If `docs/superpowers/` exists → use `docs/superpowers/specs/`
2. Otherwise → use `docs/agents/specs/`

Copy to `<docs-folder>/specs/YYYY-MM-DD-<topic>.md`.

## What Happens Next

Get user approval, then activate skill `/osd-plan` to create an implementation plan.

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
