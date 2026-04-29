# Contributing to Claude Code Solo Studio

Thanks for your interest! This is a Claude Code template — contributions should make it more useful for solo game developers without adding bloat.

## What fits this project

- **New slash commands** — practical commands that solo devs actually need (e.g. `/performance`, `/localization`, `/save-system`)
- **Agent improvements** — better prompts for existing agents, or a new specialist that covers a real gap
- **Engine support** — extending templates for Godot / Unity edge cases, or adding another engine (Defold, Bevy, etc.)
- **Bug fixes** — if a hook, skill, or agent prompt has a mistake or gives bad advice

## What doesn't fit

- Adding more agents just to have more agents — token efficiency is a core design principle
- Coordination layers, director agents, or approval chains — the whole point is to avoid these
- Dependencies on external tools beyond Claude Code itself

## Local setup

```bash
git clone https://github.com/Ghraven/Claude-Code-Solo-Studio my-test
cd my-test
npm install -g @anthropic-ai/claude-code   # if not already installed
claude
```

Then run `/setup` to verify the flow works.

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

## Pull requests

1. Fork and create a branch from `main`
2. Test your change by running `/setup` and the affected commands in a fresh clone
3. Open a PR with a short description of what you added and why

## Credits

Inspired by [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) by Donchitos.
