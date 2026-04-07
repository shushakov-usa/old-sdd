---
name: osd-implement
description: "Execute a plan with parallel subagents"
---

# osd-implement

Execute an implementation plan wave by wave. Dispatches parallel subagents for independent tasks, uses cheaper models for straightforward work.

If no plan exists in the current session, check `.osd/plan.md`. If not found, ask the user what to implement.

<codex_adapter>
This skill works best in auto-edit mode where the agent can modify files without confirmation. If in suggest mode, the agent may need repeated approvals.
</codex_adapter>

@~/.codex/old-sdd/shared/implement.md
@~/.codex/old-sdd/shared/colleague-mode.md
