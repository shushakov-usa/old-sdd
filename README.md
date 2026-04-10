# old-sdd

Simple spec-driven development for AI coding agents.

old-sdd is a set of markdown skills that teach your AI agent to explore requirements thoroughly, write specs incrementally, plan with parallelism, implement ambitiously, and validate honestly. The agent acts as a senior colleague — it has opinions and isn't afraid to disagree with you.

## Skills

| Skill | When to Use |
|-------|-------------|
| `/osd-build` | New feature or major change — full pipeline |
| `/osd-fix` | Bug reported or tests failing |
| `/osd-spec` | Exploring ideas AND writing a spec interactively |
| `/osd-plan` | Breaking a spec into parallelizable task waves |
| `/osd-implement` | Executing a written plan with subagents |
| `/osd-validate` | Verifying implementation before shipping |

## Installation

```bash
npx old-sdd install
```

Auto-detects which CLIs you have (Copilot, Codex, Claude) and compiles self-contained skills for each.

```bash
npx old-sdd install copilot   # specific platform only
npx old-sdd uninstall          # remove all osd-* skills
npx old-sdd list               # show what's installed
```

### From Source

```bash
git clone https://github.com/shushakov-usa/old-sdd ~/.old-sdd
cd ~/.old-sdd && node cli.js install
```

After installation, restart your agent CLI. The skills will appear in the command list.

## Usage

### Build a Feature

```
/osd-build add user authentication
```

The agent will:
1. Ask you questions to understand what you want (batching independent questions for speed)
2. Research options and present findings with opinions
3. Write the spec incrementally as decisions are made
4. Create a task plan with parallelizable waves
5. Implement using subagents where possible
6. Validate with tests, lint, type checks, and UI verification

### Fix a Bug

```
/osd-fix login fails with 500 error after password reset
```

Lighter flow: investigate the bug → plan a fix → implement with regression tests → validate.

### Individual Phases

You can invoke any phase directly:

- `/osd-spec` — Explore ideas and write a spec interactively
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
| Specs | `docs/agents/specs/YYYY-MM-DD-<topic>.md` | Yes |
| Plans | `docs/agents/plans/YYYY-MM-DD-<topic>.md` | Yes |
| Bug investigations | `docs/agents/investigations/<topic>.md` | Yes (complex bugs) |
| Tests | Your project's test directory | Yes |

Uses `docs/superpowers/` instead if that directory already exists in the project.

## Architecture

```
cli.js           ← Node.js CLI (npx old-sdd install/uninstall/list)
skills/          ← 6 self-contained SKILL.md files
```

The installer handles platform-specific blocks (`<!-- platform: codex -->`) so each installed SKILL.md is fully self-contained with no external dependencies.

## Platforms

- **GitHub Copilot CLI** — Full support
- **OpenAI Codex CLI** — Full support (adapts to suggest mode)
- **Claude Code CLI** — Full support

## License

MIT
