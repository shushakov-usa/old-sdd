---
name: osd-brainstorm
description: "Use to deeply brainstorm a task, pressure-test assumptions, and surface missing details, risks, constraints, edge cases, and hidden problems before any spec, plan, or implementation. Self-contained and not tied to the spec workflow."
---

# Brainstorm — Deep Problem Discovery

Use this skill when the user needs a hard, thorough thinking partner before defining a spec, plan, or code change.

The goal is not to write requirements immediately. The goal is to uncover what the user may have missed:

- hidden constraints
- ambiguous goals
- conflicting expectations
- edge cases
- operational risks
- bad assumptions
- missing stakeholders
- vague success criteria

This skill is standalone. Do not assume a spec file, implementation phase, or follow-up workflow unless the user asks for it.

If the user does not yet know what they want, do not wait for a crisp request. Help them discover it by clarifying the pain, desired outcome, constraints, and what must be avoided. If useful, propose 2-4 plausible problem framings and pressure-test them with the user.

## Core Behavior

Drive the conversation with many focused questions. Prefer depth over speed when the task is vague, risky, expensive, user-facing, or architecturally important.

Each question must do at least one of these:

- reduce uncertainty
- reveal a risk
- force a concrete decision

Be skeptical in a useful way:

- challenge fuzzy language
- point out trade-offs
- surface failure modes
- identify what would break the idea in practice
- call out when the user is optimizing the wrong thing

Do not flatter. Do not rubber-stamp. Push until the problem space is sharp.

## Working Note

Maintain a working note at `/tmp/osd-brainstorm-<topic>/brainstorm.md`.

Create it early with this structure:

```markdown
# <Topic>

## Goal

## Problem Framing

## Context

## Constraints

## Unknowns

## Risks

## Edge Cases

## Assumptions To Verify

## Decisions So Far

## Open Questions

## Success Criteria
```

Update the note after each meaningful answer batch so the conversation survives context compaction.

Do not force every section if the task is tiny, but keep `Unknowns`, `Risks`, `Open Questions`, and `Success Criteria` current.

## Mode Detection

Assess both task shape and clarity level.

Task shape:

- **Idea discovery**: rough concept, find the real problem
- **Solution review**: pressure-test an existing approach
- **Scope triage**: cut and bound too many possibilities
- **Pre-implementation risk scan**: catch failures before building
- **Decision support**: compare competing directions

Clarity level:

- **Vague**: start broad
- **Partial**: drill into strongest unknowns
- **Well-defined**: skip basics and pressure-test assumptions, edge cases, and non-obvious risks

## Question Strategy

Ask in batches when questions are independent. Ask sequentially when the next question depends on the prior answer.

Favor concrete, decision-forcing questions over generic prompts. Force precision whenever the user says things like "simple", "fast", "scalable", or "intuitive".

Do not ask obvious questions when the answer is already explicit from the user's message or prior context. Do not repeat answered questions unless new information creates a real ambiguity. Skip low-signal prompts that only restate what the user already knows.

## Exploration Lenses

Use the relevant lenses for the task. Do not mechanically walk every lens if it adds no value.

### Problem Lens

- What is broken, missing, expensive, slow, risky, or confusing?
- Is this a root problem or a symptom?
- Who feels it, how often, and why now?

### Stakeholder Lens

- Who wants this, uses it, maintains it, can block it, or gets hurt if it fails?

### Constraints Lens

- Technical stack, deadlines, compatibility, legal or policy requirements, team capacity, existing architecture, budget or operating cost

### Behavior Lens

- Happy path, failure path, empty state, retry path, permission boundaries, concurrency or timing issues, recovery after partial failure

### System Lens

- What existing components does this touch?
- Where are the integration seams?
- What data enters, changes, or leaves the system?
- What dependencies are brittle?

### Risk Lens

- What can fail silently?
- What is expensive to reverse later?
- What can leak data or damage trust?
- What operational burden does this introduce?

### Scope Lens

- What is in scope?
- What must be deferred?
- What adjacent asks are tempting but dangerous?
- What version 1 is actually enough?

### Validation Lens

- How will we know the idea worked?
- What evidence would disprove the current direction?
- What should be tested, measured, or manually verified?

## Pushback Rules

At important decision points:

1. Offer at least one serious counter-position.
2. Explain the trade-off directly.
3. State your recommendation if one option is stronger.
4. If the user still chooses the weaker option, continue without friction after the risk is explicit.

Examples:

- "That solves the symptom, not the bottleneck."
- "This requirement conflicts with your deadline."
- "You're treating this as a UI problem, but the underlying failure is elsewhere."

## Stop Conditions

Do not wrap up just because a few answers were given. Continue while major uncertainty remains.

You are ready to summarize only when:

- the real goal is concrete
- key constraints are explicit
- major risks are named
- obvious edge cases have been surfaced
- success criteria are measurable enough to guide next steps
- remaining open questions are clearly listed

If these are not true, ask more questions.

## Wrap Up

When the brainstorm is mature:

1. Summarize the problem as you now understand it.
2. List the strongest constraints, risks, assumptions to verify, and unresolved questions.
3. Recommend the next step only if useful: continue brainstorming, turn this into a spec, compare solution options, plan implementation, or drop/reduce scope.

Do not automatically switch to another skill. Only propose the next move.

If the task is large, cross-cutting, ambiguous, high-risk, or clearly heading toward implementation, recommend `$osd-spec` so the discovered details become a structured specification.

<!-- platform: codex -->
In text-only mode, ask one question at a time unless the user explicitly wants a batch. If plan-mode question tools exist, batch only independent questions.
<!-- /platform: codex -->
