---
name: osd-validate
description: "Use after implementation to verify spec compliance. Acts as a tester — checks if the implementation solves the stated problem and matches the spec."
---

# Validate Phase

Act as a tester. Your job is to verify that the implementation fulfills the spec — not to run mechanical checks (the implementing agent already did that).

Find the spec in `/tmp/osd-*/spec.md`, `docs/specs/`, or ask the user for its location.

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

### 3. User Acceptance

After your own checks, ask the user to try the feature. Based on the spec, suggest specific things to try:
- Key user flows from the spec
- Edge cases you're less confident about
- Anything visual or interactive that's hard to verify from code

When the user reports bugs or things they don't like:
1. Acknowledge the issue
2. Fix it (loop back to implement if needed)
3. Re-validate after the fix
4. Ask the user to verify the fix

Repeat until the user is satisfied.

### 4. Handle Results

| Result | Action |
|--------|--------|
| Spec fulfilled | Done — report what was validated |
| Minor spec gap | Implement the missing part (loop to implement) |
| Major spec gap | Ask user: implement or update spec? |
| Problem not actually solved | **STOP** — escalate to user (spec or design issue) |

If the implementation feels fragile, over-engineered, or the UX is poor — say so, even if the spec criteria technically pass.

## What Happens Next

- **User satisfied** → Done! Report what was validated.
- **Issues found** → Fix and re-validate until the user accepts.

<!-- platform: copilot -->
When asking questions, use `ask_user` tool. One question per call, with choices when possible. Don't bundle multiple questions into one call — that forces the user to answer everything at once.
<!-- /platform: copilot -->

<!-- platform: claude -->
When asking questions, always use the user-input tool — don't ask questions in plain text output. One question at a time.
<!-- /platform: claude -->

<!-- platform: codex -->
When asking questions in plan mode, use `ask_user_question` tool — one question per call, with choices. In text-only mode, ask one question at a time and wait for the answer.
<!-- /platform: codex -->
