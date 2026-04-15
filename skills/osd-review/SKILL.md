---
name: osd-review
description: "Use to review code for bugs, security issues, and code quality. Reviews current branch diff by default, or files/commits/PR the user specifies. Dispatches osd-reviewer agent."
---

# Review — Code Review

Dispatch the `osd-reviewer` agent to review code changes.

## Steps

1. **Determine scope** — default: diff of current branch vs `main`/`master`. User can specify files, commit range, or PR.
2. **Gather context** — get the diff, find the spec if available (`/tmp/osd-*/spec.md`, `docs/specs/`), note project conventions.
3. **Dispatch `osd-reviewer` agent** with the scope, spec (if any), and project conventions.
4. **Present findings** grouped by severity.

<!-- platform: copilot -->
When asking questions, use `ask_user` tool with choices. Batch independent questions as parallel calls.
<!-- /platform: copilot -->

<!-- platform: claude -->
When asking questions, use user-input tool. Batch independent questions together.
<!-- /platform: claude -->

<!-- platform: codex -->
When asking questions, use `ask_user_question` tool with choices.
<!-- /platform: codex -->
