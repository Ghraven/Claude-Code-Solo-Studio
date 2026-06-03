<h1 align="center">🎮 Claude Code Solo Studio</h1>

<p align="center">
  A lightweight Claude Code template for solo game developers.<br/>
  <strong>Build your game — not your framework.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude%20Code-required-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Godot-4.x-478CBF?style=flat-square&logo=godot-engine" />
  <img src="https://img.shields.io/badge/Unity-6-black?style=flat-square&logo=unity" />
  <img src="https://img.shields.io/badge/Agents-6-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

> **v1.2** — Session-stop hook now warns about uncommitted changes. GDD gains a monetization section for mobile devs. `game-designer` gets mobile interruption design guidance. `new-feature` skill scans Known Issues before starting work. `qa-check` cross-references Known Issues to avoid duplicate bug reports.

---

## The Problem

Most AI coding templates burn your token budget on coordination before a single line of code gets written. 49 agents debating with directors and leads just to decide what to do next works great for a studio with unlimited API credits.

For a solo dev on a weekly limit, it burns your cap with nothing to show.

---

## The Solution

This template strips everything down to what actually matters:

| | Typical multi-agent | Solo Studio |
|---|---|---|
| Agents | 20–49 | **6** |
| Hierarchy | Director → Lead → Worker | **None — direct specialists** |
| Inter-agent calls | Constant | **Zero** |
| Slash commands | 20+ | **10 practical ones** |
| Token overhead | High | **Near zero** |
| Token budget going to code | ~30–50% | **~95%** |

**6 specialists. No hierarchy. No coordination overhead. Nearly 100% of your tokens go to actual game code.**

---

## Quick Start

### Prerequisites
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — `npm install -g @anthropic-ai/claude-code`
- Godot 4 or Unity installed
- Git

### Setup

```bash
git clone https://github.com/Ghraven/Claude-Code-Solo-Studio my-game
cd my-game
claude
```

Then in Claude Code:
```
/setup
```

Answer 4 questions. Your project is ready in seconds.

---

## /setup — What It Does

The setup command asks:

1. **Platform** — Android · PC · Web
2. **Dimension** — 2D · 3D
3. **Genre** — Platformer · RPG · Puzzle · Shooter · Other
4. **Engine** — Godot 4 · Unity (with a tip card to help you choose)

Then generates in one shot:
- `CLAUDE.md` filled with your project config
- Full folder structure (`src/` · `assets/` · `design/` · `docs/` · `tests/`)
- Starter scene and script files for your engine
- `design/gdd.md` — Game Design Document stub ready to fill in

---

## Slash Commands

| Command | What it does |
|---|---|
| `/setup` | Initialize project — platform · genre · engine · starter files |
| `/new-feature` | Start a feature (breaks into max 5 focused tasks) |
| `/level-design` | Design a level with scene structure |
| `/ui-design` | Design a menu · HUD · screen |
| `/code-review` | Review code for bugs, engine-specific patterns, quality |
| `/qa-check` | Full quality check before moving on |
| `/bug-report` | Log a bug with severity, diagnosis, and regression test |
| `/performance` | Profiling check, bottleneck diagnosis, and optimization strategy |
| `/build` | Export/build checklist for your target platform |
| `/status` | Sprint snapshot — tasks, open bugs, next focus |
| `/help` | Show all commands with descriptions |

---

## Agents

Use agents when you want deep focused work on a single domain. Slash commands handle most everyday tasks — agents are for when you need a specialist to go all-in on one area.

| Agent | Use for |
|---|---|
| `game-designer` | Mechanics · balancing · GDD updates |
| `programmer` | All code — GDScript or C# |
| `level-designer` | Level layouts · scene structure |
| `ui-designer` | Menus · HUD · screen design |
| `qa` | Code review · bugs · test cases |
| `release` | Builds · exports · versioning |

Every agent reads `CLAUDE.md` for project context — no re-explaining your engine, platform, or genre every session.

---

## Project Structure

```
my-game/
├── CLAUDE.md                Your project brain — update this as you build
├── .claude/
│   ├── agents/              6 specialist agent prompts
│   ├── skills/              10 slash commands
│   ├── hooks/               3 hooks (session start/stop, commit check)
│   └── settings.json        Hook wiring and permissions
├── design/
│   └── gdd.md               Game Design Document
├── src/                     Game source code
├── assets/                  Art · audio · fonts
├── docs/                    Technical notes
└── tests/                   Test cases
```

---

## How the Token Efficiency Works

**Agents don't talk to each other.** Each one has full context baked into its prompt and reads `CLAUDE.md` for project state. There's no coordination layer, no approval chains, no "consulting" step.

You stay in control. Claude starts coding immediately.

- Hooks only fire when relevant (commit hook exits instantly if not a commit)
- `CLAUDE.md` carries context across sessions — no context re-setup
- Specialists go straight to work — no meta-discussion about what to build

---

## Customization

Everything is plain Markdown — edit freely:

```bash
# Add a new agent
touch .claude/agents/my-agent.md

# Edit a slash command
nano .claude/skills/new-feature/prompt.md

# Add a hook
touch .claude/hooks/my-hook.sh
# Wire it in .claude/settings.json
```

The default Claude Code permissions allow common read-only navigation tools, including `rg`, so agents can search the project quickly without broad shell access.

---

## Credits

Inspired by [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) by Donchitos.  
Rebuilt from scratch for solo devs on limited API budgets.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) — adding a slash command or agent is straightforward.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

---

## AI Assistance Transparency

I use AI-assisted development tools, including Codex and Claude, while building and maintaining this project. All code, design decisions, testing, commits, and releases are reviewed and shipped by me as the repository owner; AI tools are not listed as project contributors.
## License

MIT — see [LICENSE](LICENSE)
