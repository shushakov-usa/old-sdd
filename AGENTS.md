# Repository Guidelines

## Project Structure & Module Organization

This repository is a small Node.js CLI that installs AI-agent skills and agents.

- `cli.js`: main entrypoint for `old-sdd`; handles `install`, `uninstall`, and `list`
- `skills/<name>/SKILL.md`: source skill definitions such as `osd-spec`, `osd-plan`, and `osd-brainstorm`
- `skills/<name>/agents/openai.yaml`: optional UI metadata for a skill
- `agents/<name>/agent.md`: source agent templates compiled for each platform
- `README.md`: user-facing overview and installation instructions

Keep new skills self-contained. Put platform-specific guidance behind `<!-- platform: ... -->` blocks so `cli.js` can strip non-target sections during install.

## Build, Test, and Development Commands

- `node cli.js`: show CLI usage
- `node cli.js install codex`: install compiled skills for Codex locally
- `node cli.js uninstall codex`: remove installed Codex artifacts
- `node cli.js list`: show currently installed skills and agents
- `npm pack`: create a local package tarball for smoke-testing publish contents

There is no dedicated build step; packaging is driven by `package.json` and `cli.js`.

## Coding Style & Naming Conventions

Use CommonJS in JavaScript (`require`, not ESM). Follow the existing style in `cli.js`:

- 2-space indentation
- double quotes
- semicolons
- small, single-purpose functions

Name skills and agents with the `osd-` prefix, for example `skills/osd-review/SKILL.md` or `agents/osd-reviewer/agent.md`.

## Testing Guidelines

No automated test suite is configured in this repository. Validate changes with targeted manual checks:

- run `node cli.js install <platform>`
- run `node cli.js list`
- run `node cli.js uninstall <platform>`

For skill changes, verify the installed `SKILL.md` output on at least one platform and confirm platform-specific blocks are stripped correctly.

## Commit & Pull Request Guidelines

Recent history uses short, imperative subjects, often with prefixes like `feat:` or `fix:`. Match that style, for example `feat: add brainstorm skill` or `fix: preserve codex agent metadata`.

PRs should include:

- a concise summary of the user-visible change
- affected paths, such as `cli.js` or `skills/osd-spec/`
- manual verification steps and results
- screenshots only if UI-facing metadata or rendered skill listings changed
