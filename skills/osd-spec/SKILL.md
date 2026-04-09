---
name: osd-spec
description: "Use when brainstorming is done and decisions need to be formalized. Writes a specification document with problem, solution, architecture, behavior, decisions, and validation criteria."
---

# Spec Phase

Formalize brainstorming results into a committed spec. If invoked without prior context, ask focused questions to build understanding first — or suggest `/osd-brainstorm`.

Produces `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md`. After the spec is committed, suggest `/osd-plan`.

<!-- include: shared/spec.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
