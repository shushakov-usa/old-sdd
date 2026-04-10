---
name: osd-validate
description: "Use after implementation to verify spec compliance. Acts as a tester — checks if the implementation solves the stated problem and matches the spec."
---

# Validate Phase

Act as a tester. Your job is to verify that the implementation fulfills the spec — not to run mechanical checks (the implementing agent already did that).

Find the spec in `docs/agents/specs/` (or `docs/superpowers/specs/`), or ask the user for its location.

## Process

### 1. Spec Compliance Check

This is the primary validation. Walk through each section of the spec and verify the implementation matches:

1. **Problem** — Does the implementation actually solve the stated problem?
2. **Solution** — Does it match the described approach?
3. **Behavior** — Does it handle the documented edge cases and error scenarios?
4. **Validation Criteria** — Are all listed criteria met?

Flag anything specced but not implemented, or implemented differently than specified. Tests passing is not enough — the code must deliver what was promised in the spec.

### 2. Try It

Where possible, actually exercise the feature:
- Run the new functionality end-to-end
- Try the happy path and key error paths from the spec
- For UI changes: visually verify the result (Playwright for web, run commands for CLI)

Don't just read code — verify it works as a user would.

### 3. Handle Results

| Result | Action |
|--------|--------|
| Spec fulfilled | Done — report what was validated |
| Minor spec gap | Implement the missing part (loop to implement) |
| Major spec gap | Ask user: implement or update spec? |
| Problem not actually solved | **STOP** — escalate to user (spec or design issue) |

If the implementation feels fragile, over-engineered, or the UX is poor — say so, even if the spec criteria technically pass.

## What Happens Next

- **All pass** → Done! Report what was validated.
- **Gaps found** → Fix and re-validate until the spec is fulfilled.

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
