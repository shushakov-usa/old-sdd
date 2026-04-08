---
name: osd-brainstorm
description: "Use before committing to a spec — explore user needs, challenge assumptions, research options, and align on requirements through interactive questioning"
argument-hint: <topic or idea to explore>
---

# osd-brainstorm

Standalone brainstorming phase. Interactive questioning + research + critical thinking.

## When to Use

- **Exploring an idea** before deciding to build it
- **Gathering requirements** for a new feature
- **Evaluating options** (tech stack, architecture, approach)
- User is unsure **what** to build, not just how

## When NOT to Use

| Situation | Use Instead |
|-----------|-------------|
| Ready to build (requirements clear) | `/osd-build` |
| Spec already written | `/osd-plan` |
| Bug or failure | `/osd-fix` |
| User knows exactly what they want | `/osd-build` (will brainstorm as Phase 1) |

## What Happens Next

After brainstorming, suggest the next step:
- **Ready to formalize?** → `/osd-spec` to write the spec
- **Ready to build end-to-end?** → `/osd-build` (which includes spec + plan + implement)
- **Need more exploration?** → Continue brainstorming

## Context Budget

Brainstorming should use 30-50% of context max. If the topic is huge, suggest decomposing into sub-topics.

<codex_adapter>
Before interactive questioning, check if Codex is in suggest mode:
- If suggest mode: batch all questions into a single structured response. Do not use interactive ask_user.
- If full-auto mode: proceed normally with interactive questioning.
</codex_adapter>

@~/.codex/old-sdd/shared/brainstorm.md
@~/.codex/old-sdd/shared/colleague-mode.md
