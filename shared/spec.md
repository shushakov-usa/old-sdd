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
