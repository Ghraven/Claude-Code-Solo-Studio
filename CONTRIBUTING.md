# Contributing to Claude Code Solo Studio

Thanks for your interest! This is a Claude Code-first template that also documents a portable Codex/GPT adaptation path. Contributions should make it more useful for solo game developers without adding bloat.

## What fits this project

- **New slash commands** — practical commands that solo devs actually need (e.g. `/performance`, `/localization`, `/save-system`)
- **Agent improvements** — better prompts for existing agents, or a new specialist that covers a real gap
- **Portable agent instructions** — improvements to `AGENTS.md` that help Codex/GPT-style coding agents follow the same lean workflow
- **Engine support** — extending templates for Godot / Unity edge cases, or adding another engine (Defold, Bevy, etc.)
- **Bug fixes** — if a hook, skill, or agent prompt has a mistake or gives bad advice

## What doesn't fit

- Adding more agents just to have more agents — token efficiency is a core design principle
- Coordination layers, director agents, or approval chains — the whole point is to avoid these
- Hard dependencies on one provider beyond the Claude Code-first template files

## Local setup

```bash
git clone https://github.com/Ghraven/Claude-Code-Solo-Studio my-test
cd my-test
npm install -g @anthropic-ai/claude-code   # if not already installed
claude
```

Then run `/setup` to verify the flow works.

If you are testing the portable path with Codex/GPT, inspect `AGENTS.md` and verify the README instructions still make sense without Claude-specific command support.

## Adding a slash command

1. Create `.claude/skills/<command-name>/prompt.md`
2. Add the command to the table in `README.md`
3. Reference it in the `/help` skill if appropriate
4. Keep the prompt focused — one command, one job

## Adding an agent

1. Create `.claude/agents/<agent-name>.md` with YAML frontmatter:
   ```yaml
   ---
   name: agent-name
   description: One sentence explaining when Claude Code should use this agent.
   ---
   ```
2. Write a clear, focused system prompt — no inter-agent delegation
3. Add it to the agents table in `CLAUDE.md` and `README.md`

## Updating Codex/GPT support

1. Keep `AGENTS.md` aligned with the important project-brain sections in `CLAUDE.md`
2. Avoid promising that Claude-only hooks or slash commands work natively in other tools
3. Explain adaptation steps plainly when a feature is Claude-specific

## Pull requests

1. Fork and create a branch from `main`
2. Test your change by running `/setup` and the affected commands in a fresh clone
3. Open a PR with a short description of what you added and why

## Credits

Inspired by [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) by Donchitos.
