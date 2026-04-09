---
name: osd-plan
description: "Use after a spec is written to break requirements into executable tasks. Creates wave-based task decomposition with dependency tracking, model hints, and parallel execution groups."
---

# Plan Phase

Break a spec into executable tasks. Needs a spec — check session context, then `docs/old-sdd/specs/`, then ask the user. If no spec exists, suggest `/osd-spec` first.

Produces `docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` — committed alongside the spec. After planning, suggest `/osd-implement`.

<!-- include: shared/plan.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
