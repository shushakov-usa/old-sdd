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

### Quick Install (recommended)

```bash
git clone https://github.com/shushakov-usa/old-sdd ~/.old-sdd
~/.old-sdd/install.sh
```

The installer auto-detects which CLIs you have (`~/.copilot/`, `~/.codex/`, `~/.claude/`) and symlinks the skills. Run `git pull` inside `~/.old-sdd/` to update.

### Install for a Specific Platform

```bash
~/.old-sdd/install.sh copilot   # GitHub Copilot CLI only
~/.old-sdd/install.sh codex     # OpenAI Codex CLI only
~/.old-sdd/install.sh claude    # Claude Code CLI only
```

### Manual Install

If you prefer not to use the installer:

**GitHub Copilot CLI:**
```bash
git clone https://github.com/shushakov-usa/old-sdd /tmp/old-sdd
cp -r /tmp/old-sdd/copilot/skills/osd-* ~/.copilot/skills/
mkdir -p ~/.copilot/old-sdd
cp -r /tmp/old-sdd/shared ~/.copilot/old-sdd/shared
```

**OpenAI Codex CLI:**
```bash
cp -r /tmp/old-sdd/codex/skills/osd-* ~/.codex/skills/
mkdir -p ~/.codex/old-sdd
cp -r /tmp/old-sdd/shared ~/.codex/old-sdd/shared
```

**Claude Code CLI:**
```bash
cp -r /tmp/old-sdd/claude/skills/osd-* ~/.claude/skills/
mkdir -p ~/.claude/old-sdd
cp -r /tmp/old-sdd/shared ~/.claude/old-sdd/shared
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
| Plans | `.osd/plan.md` | No (usually) |
| Bug investigations | `docs/old-sdd/investigations/<topic>.md` | Yes (complex bugs) |
| Tests | Your project's test directory | Yes |

## Platforms

- **GitHub Copilot CLI** — Full support
- **OpenAI Codex CLI** — Full support (adapts to suggest mode)
- **Claude Code CLI** — Full support

## License

MIT
