# old-sdd

Simple spec-driven development for AI coding agents.

old-sdd is a set of markdown skills that teach your AI agent to brainstorm thoroughly, write specs, plan with parallelism, implement ambitiously, and validate honestly. The agent acts as a senior colleague — it has opinions and isn't afraid to disagree with you.

## Skills

| Skill | When to Use |
|-------|-------------|
| `/osd-build` | New feature or major change — full pipeline |
| `/osd-fix` | Bug reported or tests failing |
| `/osd-brainstorm` | Exploring ideas before committing to build |
| `/osd-spec` | Formalizing brainstorming into a committed spec |
| `/osd-plan` | Breaking a spec into parallelizable task waves |
| `/osd-implement` | Executing a written plan with subagents |
| `/osd-validate` | Verifying implementation before shipping |

## Installation

```bash
git clone https://github.com/shushakov-usa/old-sdd ~/.old-sdd
~/.old-sdd/install.sh
```

The installer auto-detects which CLIs you have (`~/.copilot/`, `~/.codex/`, `~/.claude/`) and compiles self-contained SKILL.md files with all shared content inlined. To update:

```bash
cd ~/.old-sdd && git pull && ./install.sh
```

### Install for a Specific Platform

```bash
~/.old-sdd/install.sh copilot   # GitHub Copilot CLI only
~/.old-sdd/install.sh codex     # OpenAI Codex CLI only
~/.old-sdd/install.sh claude    # Claude Code CLI only
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
3. Write a spec and ask you to review it (or go straight to work)
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
| Plans | `docs/old-sdd/plans/YYYY-MM-DD-<topic>.md` | Yes |
| Bug investigations | `docs/old-sdd/investigations/<topic>.md` | Yes (complex bugs) |
| Tests | Your project's test directory | Yes |

## Architecture

```
skills/          ← 7 universal SKILL.md templates (routing + include markers)
shared/          ← shared content (inlined at install time)
install.sh       ← compiles templates → self-contained installed files
```

The installer expands `<!-- include: shared/file.md -->` markers and handles platform-specific blocks (`<!-- platform: codex -->`) so each installed SKILL.md is fully self-contained with no external dependencies.

## Platforms

- **GitHub Copilot CLI** — Full support
- **OpenAI Codex CLI** — Full support (adapts to suggest mode)
- **Claude Code CLI** — Full support

## License

MIT
