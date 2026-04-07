---
name: osd-build
description: "Full feature development: brainstorm → spec → plan → implement → validate"
---

# osd-build

Full feature development pipeline. Starts with brainstorming questions, produces a spec, plans the work, implements with parallel subagents, and validates the result.

Invoke this when the user wants to build a new feature or make a significant change.

<codex_adapter>
This skill requires interactive mode for the brainstorming phase. If you are in auto-edit mode, tell the user:

"osd-build starts with brainstorming, which needs interactive mode. Please restart with: codex --suggest"

Once past brainstorming and spec, the implement and validate phases work well in auto-edit mode.
</codex_adapter>

@~/.codex/old-sdd/shared/build-flow.md
@~/.codex/old-sdd/shared/colleague-mode.md
