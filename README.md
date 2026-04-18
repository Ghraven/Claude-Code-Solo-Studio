# Claude-Code-Solo-Studio

A lightweight Claude Code template for solo game developers.

**Build your game — not your framework.**

---

## Why this exists

Most multi-agent AI repos burn your token budget on agent coordination before a single line of code gets written. 49 agents talking to directors talking to leads just to decide what to do next is a great idea for a studio with unlimited API credits. For a solo dev on a weekly limit, it's a fast way to hit your cap with nothing to show.

This template is different:

- **6 agents** instead of 49 — one per domain, no hierarchy
- **Self-contained prompts** — every agent has full context baked in, no inter-agent consultation
- **3 hooks** instead of 12 — only what actually saves you time
- **10 slash commands** — one for each real workflow step
- **Smart starter** — pick your platform, genre, and engine, get a working project scaffold in seconds

The result: nearly 100% of your token budget goes to actual game development.

---

## Quick Start

### Prerequisites
- [Git](https://git-scm.com/)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — `npm install -g @anthropic-ai/claude-code`
- Godot 4 or Unity (whichever you choose)

### Setup

```bash
git clone https://github.com/[your-username]/lean-game-studio.git my-game
cd my-game
claude
```

Then type:
```
/setup
```

Answer 4 questions. Your project is ready.

---

## What you get from /setup

The setup command asks:
1. **Platform** — Android, PC, or Web
2. **Dimension** — 2D or 3D
3. **Genre** — Platformer, RPG, Puzzle, Shooter, or Other
4. **Engine** — Godot 4 or Unity (with a tip card to help you choose)

Then it generates in one shot:
- `CLAUDE.md` filled with your choices
- Full folder structure
- Starter scene and script files for your engine
- `design/gdd.md` — Game Design Document stub ready to fill in

---

## Commands

| Command | What it does |
|---------|-------------|
| `/setup` | Initialize project — platform, genre, engine, starter files |
| `/new-feature` | Start building a feature (breaks it into max 5 tasks) |
| `/level-design` | Design a level layout with scene structure |
| `/ui-design` | Design a menu, HUD, or screen |
| `/code-review` | Review code for bugs and quality issues |
| `/qa-check` | Full quality check before moving on |
| `/bug-report` | Log and fix a bug |
| `/build` | Export/build checklist for your platform |
| `/status` | See current sprint and what's next |
| `/help` | List all commands |

---

## Agents

Agents are specialists you can invoke directly for deep focused work. Most of the time the slash commands are enough — agents are there when you want to go deeper on one domain.

| Agent | Domain |
|-------|--------|
| `game-designer` | Mechanics, balancing, GDD |
| `programmer` | All code — GDScript or C# |
| `level-designer` | Levels, scenes, layouts |
| `ui-designer` | Menus, HUD, UX |
| `qa` | Code review, bugs, testing |
| `release` | Builds, exports, versioning |

Each agent reads `CLAUDE.md` for project context — no re-explaining your engine or platform every session.

---

## Project Structure

```
CLAUDE.md                  Your project config — update this as you build
.claude/
  agents/                  6 self-contained agent prompts
  skills/                  10 slash commands
  hooks/                   3 hooks (session start/stop, commit check)
  settings.json            Hook wiring + safe permission rules
design/
  gdd.md                   Game Design Document
src/                       Game source code
assets/                    Art, audio, fonts
docs/                      Technical notes
tests/                     Test cases
```

---

## Token efficiency

This template is designed to respect your API limits:

- Agents don't talk to each other — no coordination overhead
- Hooks only run when relevant (commit hook exits immediately if not a commit)
- No approval chains — you stay in control, Claude starts working immediately
- CLAUDE.md carries context across sessions so you don't repeat yourself

---

## Customization

Everything is plain markdown — edit freely:

- **Add an agent** — create a new `.md` file in `.claude/agents/`
- **Edit a slash command** — modify the `prompt.md` in `.claude/skills/[name]/`
- **Adjust code style** — edit the "Code Style" section in `CLAUDE.md`
- **Add a hook** — add a bash script to `.claude/hooks/` and wire it in `settings.json`

---

## Credits

Inspired by [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) by Donchitos.
This is a heavily restructured fork focused on token efficiency for solo developers.

---

## License

MIT — see [LICENSE](LICENSE) for details.
