# old-sdd

Simple spec-driven development for AI coding agents.

old-sdd is a set of markdown skills that teach your AI agent to brainstorm thoroughly, write specs, plan with parallelism, implement ambitiously, and validate honestly. The agent acts as a senior colleague — it has opinions and isn't afraid to disagree with you.

## Skills

| Skill | Description |
|-------|-------------|
| `/osd-build` | Full feature pipeline: brainstorm → spec → plan → implement → validate |
| `/osd-fix` | Bug fix pipeline: understand → plan → implement → validate |
| `/osd-brainstorm` | Standalone brainstorming with integrated research |
| `/osd-spec` | Write a specification document |
| `/osd-plan` | Break a spec into parallelizable tasks |
| `/osd-implement` | Execute a plan with parallel subagents |
| `/osd-validate` | Verify implementation quality and spec compliance |

## Installation

### GitHub Copilot CLI

```bash
git clone https://github.com/shushakov-usa/old-sdd /tmp/old-sdd
cp -r /tmp/old-sdd/copilot/skills/osd-* ~/.copilot/skills/
mkdir -p ~/.copilot/old-sdd
cp -r /tmp/old-sdd/shared ~/.copilot/old-sdd/shared
```

### Codex CLI

```bash
git clone https://github.com/shushakov-usa/old-sdd /tmp/old-sdd
cp -r /tmp/old-sdd/codex/skills/osd-* ~/.codex/skills/
mkdir -p ~/.codex/old-sdd
cp -r /tmp/old-sdd/shared ~/.codex/old-sdd/shared
```

After installation, restart your agent CLI. The skills will appear in the command list.

## Usage

### Build a Feature

```
/osd-build
```

The agent will:
1. Ask you questions to understand what you want (batching independent questions for speed)
2. Research options and present findings with opinions
3. Write a spec and ask you to review it (or go straight to work)
4. Create a task plan with parallelizable waves
5. Implement using subagents where possible
6. Validate with tests, lint, type checks, and UI verification

### Fix a Bug

```
/osd-fix
```

Lighter flow: understand the bug → plan a fix → implement with regression tests → validate.

### Individual Phases

You can invoke any phase directly:

- `/osd-brainstorm` — Explore ideas without committing to build
- `/osd-spec` — Write a spec from existing context
- `/osd-plan` — Plan from an existing spec
- `/osd-implement` — Execute an existing plan
- `/osd-validate` — Validate recent changes

## Philosophy

**The agent is a colleague, not a tool.** It will:
- Challenge your ideas when it sees a better approach
- Push back on vague requirements
- Surface problems honestly instead of working around them
- Have genuine opinions about technical decisions

It won't be contrarian for the sake of it, and if you insist after hearing its counter-argument, it'll do it your way.

## Artifacts

| What | Where | Committed? |
|------|-------|-----------|
| Specs | `docs/old-sdd/specs/YYYY-MM-DD-<topic>.md` | Yes |
| Plans | `.osd/plan.md` | No (usually) |
| Bug investigations | `docs/old-sdd/investigations/<topic>.md` | Yes (complex bugs) |
| Tests | Your project's test directory | Yes |

## Platforms

- **GitHub Copilot CLI** — Full support
- **OpenAI Codex CLI** — Full support (interactive skills require suggest mode)

## License

MIT
