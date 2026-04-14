---
name: osd-build
description: "Use to build a new feature, component, or subsystem from scratch. Full pipeline: spec → plan → implement → validate. For significant changes that need design decisions and structured development."
---

# Build — Feature Development Pipeline

Full lifecycle: spec → plan → implement → validate.
Each phase is a skill — activate it, follow its procedure, then get user approval before moving to the next phase (unless the user said not to ask).

## Pipeline

1. **Spec** → activate skill `/osd-spec`.
2. **Plan** → activate skill `/osd-plan`.
3. **Implement** → activate skill `/osd-implement`.
4. **Validate** → activate skill `/osd-validate`. On failure → loop back to implement (or plan if the plan was wrong).

## Rules

1. **Do not skip phases.** Even simple features go through all four.
2. **Be honest throughout.** Challenge decisions, surface problems, don't rubber-stamp.

<!-- platform: copilot -->
When asking questions, use `ask_user` tool with choices. Batch independent questions as multiple parallel `ask_user` calls in one response. For dependent questions (where the answer affects the next question), wait for the answer first.
<!-- /platform: copilot -->

<!-- platform: claude -->
When asking questions, always use the user-input tool — don't ask questions in plain text output. Batch independent questions together. For dependent questions, wait for the answer first.
<!-- /platform: claude -->

<!-- platform: codex -->
When asking questions in plan mode, use `ask_user_question` tool with choices. Batch independent questions as multiple calls. In text-only mode, ask one question at a time and wait for the answer.
<!-- /platform: codex -->
