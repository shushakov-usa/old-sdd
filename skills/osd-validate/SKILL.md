---
name: osd-validate
description: "Use after implementation to verify quality — runs tests, linter, type checks in parallel, verifies spec compliance, and checks UI if applicable. Also useful as a standalone quality check on recent changes."
---

# Validate Phase

Verify implementation quality and spec compliance. Find the spec in `docs/agents/specs/` (or `docs/superpowers/specs/`) or session context.

## Iron Law

**NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.** Run the actual checks. Read the actual output. "It should work" is not evidence.

### Anti-Rationalization Table

| Temptation | Reality |
|-----------|---------|
| "Tests passed earlier" | Code changed since then. Run them again. |
| "I wrote the code correctly" | Prove it. Run the tests. Show the output. |
| "The linter would have caught that" | Did you run the linter? Show the output. |
| "This change is too small to break anything" | Small changes break big systems. Verify. |
| "I checked manually" | Manual checks miss things. Run automated checks AND manual verification. |

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

## Be Honest

During validation:
- If tests pass but the implementation feels fragile, say so
- If the UI works but the UX is poor, flag it
- Don't rubber-stamp "all green" if you have concerns about quality

## Escalation Rules

| Result | Action |
|--------|--------|
| Tests fail | Fix → re-validate (loop to implement) |
| Lint/type errors | Fix inline → re-run |
| Spec gap: minor | Implement missing part |
| Spec gap: major | Ask user: implement or update spec? |
| UI broken | Fix → re-validate |
| Design-level failure | **STOP** — escalate to user |

**Design-level failure** = the implementation fundamentally doesn't achieve the spec's goals. This isn't a test fix — it's a plan or spec issue.

## What Happens Next

- **All pass** → Done! Report success with brief summary of what was validated.
- **Failures** → Fix loop until clean.
- **In a pipeline** → validation passing = pipeline complete.

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
