---
name: osd-validate
description: "Use after implementation to verify quality — runs tests, linter, type checks in parallel, verifies spec compliance, and checks UI if applicable. Also useful as a standalone quality check on recent changes."
---

# Validate Phase

Verify implementation quality and spec compliance. Find the spec in `docs/agents/specs/` (or `docs/superpowers/specs/`) or session context.

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

Flag anything specced but not implemented, or implemented differently than specified.

### 4. Handle Results

| Result | Action |
|--------|--------|
| All checks pass | Done — report what was validated |
| Tests / lint / type failures | Fix → re-validate |
| Minor spec gap | Implement the missing part |
| Major spec gap | Ask user: implement or update spec? |
| UI broken | Fix → re-validate |
| Design-level failure | **STOP** — escalate to user (plan or spec issue, not a code fix) |

If the implementation feels fragile or the UX is poor even though tests pass — say so.

## What Happens Next

- **All pass** → Done! Report what was validated.
- **Failures** → Fix and re-validate until clean.

<!-- platform: codex -->
<codex_adapter>
Codex interaction depends on the mode:
- **Plan mode** (ask_user_question tool available): batch related questions into one structured questionnaire with choices.
- **Any other mode** (text only): ask one question at a time. Wait for the answer before asking the next.
</codex_adapter>
<!-- /platform: codex -->
