---
name: osd-review
description: "Use to review code for bugs, security issues, and code quality problems. Reviews current branch by default, or whatever the user specifies."
---

# Review — Code Review

Review code changes for bugs, security issues, and code cleanliness. By default reviews the current branch diff, but the user can specify files, commits, or a PR.

## Process

1. **Determine scope:**
   - Default: diff of the current branch against `main` (or `master`)
   - User can specify: files, commit range, or PR

2. **Gather context:**
   - Get the diff or changed files
   - Find the spec if available — check `/tmp/osd-*/spec.md`, `docs/specs/`, or ask the user
   - Note project conventions (coding style, patterns)

3. **Dispatch review subagent** — use the prompt below. The subagent is **read-only** — it must NOT modify files. Use `general-purpose` agent type (or equivalent on your platform).

4. **Present findings** to the user, grouped by severity.

## Review Agent Prompt

Pass this to the subagent, filling in the placeholders:

~~~
You are a code reviewer. Your job is to find real problems — bugs, security issues, and code quality issues. You must NOT modify any files.

**Review scope:** {diff or file list}

**Spec (if available):** {spec content or "no spec provided"}

**Project conventions:** {coding style, patterns observed}

## What to Check

**Bugs:**
- Logic errors, off-by-one, null/undefined access
- Race conditions, missing error handling
- Incorrect API usage, wrong assumptions

**Security:**
- Injection vulnerabilities (SQL, XSS, command)
- Hardcoded secrets, insecure defaults
- Missing input validation, auth bypasses

**Code cleanliness:**
- Duplication — same logic in multiple places
- Large functions or classes — should be split
- Unclear naming — intent not obvious from the name
- Dead code, unused imports
- Inconsistency with existing project patterns

**Spec compliance** (if spec provided):
- Does the code do what the spec says?
- Missing edge cases described in the spec
- Over-building — code does more than the spec asked for

## Output Format

Group findings by severity:

- **Critical** — bugs, security vulnerabilities, data loss risks
- **Important** — logic issues, missing error handling, spec mismatches
- **Suggestion** — code cleanliness, naming, style improvements

Each finding: file, line(s), what's wrong, and why it matters.

No findings = say so. Don't invent issues to look thorough.
~~~

<!-- platform: copilot -->
When asking questions, use `ask_user` tool with choices. Batch independent questions as multiple parallel `ask_user` calls in one response. For dependent questions (where the answer affects the next question), wait for the answer first.
<!-- /platform: copilot -->

<!-- platform: claude -->
When asking questions, always use the user-input tool — don't ask questions in plain text output. Batch independent questions together. For dependent questions, wait for the answer first.
<!-- /platform: claude -->

<!-- platform: codex -->
When asking questions in plan mode, use `ask_user_question` tool with choices. Batch independent questions as multiple calls. In text-only mode, ask one question at a time and wait for the answer.
<!-- /platform: codex -->
