---
name: osd-spec
description: "Use when brainstorming is complete and decisions need to be formalized into a committed specification document"
argument-hint: <topic> (or omit to use current session context)
---

# osd-spec

Write and commit a specification document.

## When to Use

- **Brainstorming is done** — decisions are made, requirements are clear
- User explicitly asks to **write a spec** or **formalize decisions**
- Context holds enough understanding to write a complete spec

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| Still exploring / requirements unclear | `/osd-brainstorm` |
| Spec exists, need a plan | `/osd-plan` |
| Want the full pipeline | `/osd-build` (includes spec phase) |
| Bug fix | `/osd-fix` (no spec needed) |

## Prerequisites

This skill needs brainstorming context. If invoked with no context:
1. Check if the user provided a topic via argument
2. If yes — ask focused questions to build enough understanding
3. If no — suggest `/osd-brainstorm` first

## What This Produces

`docs/old-sdd/specs/YYYY-MM-DD-<topic>.md` — committed to git.

## What Happens Next

After the spec is committed, suggest:
- `/osd-plan` to create an implementation plan
- Or `/osd-build` to continue the full pipeline (if not already in one)

<!-- include: shared/spec.md -->

<!-- include: shared/colleague-mode.md -->

<!-- platform: codex -->
<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>
<!-- /platform: codex -->
