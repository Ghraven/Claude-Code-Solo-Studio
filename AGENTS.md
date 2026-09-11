# [GAME NAME — change this]

> This file is the portable project brain for Codex/GPT-style coding agents.
> Keep it aligned with `CLAUDE.md` when using both Claude Code and Codex on the same game.

---

## Project Info

- **Game Name:** [change this]
- **Platform:** [Android / PC / Web]
- **Dimension:** [2D / 3D]
- **Genre:** [Platformer / RPG / Puzzle / Shooter / Other]
- **Engine:** [Godot 4 / Unity]
- **Status:** Early Development
- **Version:** 0.1.0

---

## Working Rules

- Prefer small, focused changes that move the game forward.
- Read the current sprint and known issues before editing.
- Do not introduce a large framework, director-agent layer, or multi-agent coordination system unless the owner explicitly asks.
- Keep implementation decisions practical for a solo developer with limited time and token budget.
- Verify changes with the lightest useful check: engine smoke test, script compile, lint, unit test, or a clear manual limitation.
- Never revert user changes unless explicitly asked.

---

## Tech Stack

> Fill this in based on your engine choice.

<!-- Godot example:
- Language: GDScript (typed)
- Engine: Godot 4.x
- Export target: Android APK / AAB
-->

<!-- Unity example:
- Language: C#
- Engine: Unity 6
- Render Pipeline: Universal Render Pipeline (URP)
- Export target: Android APK
-->

---

## Code Style

- [e.g. GDScript typed, snake_case variables, PascalCase classes]
- [e.g. Signals for all cross-node communication]
- [e.g. Autoload singletons: GameManager, AudioManager]

---

## Current Sprint

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

---

## Known Issues

| # | Description | Severity | Status |
|---|---|---|---|
| 1 | [describe bug] | High / Medium / Low | Open / Fixed |

---

## Architecture Decisions

| Decision | Reason |
|---|---|
| [e.g. Use autoload singleton for GameManager] | [e.g. Needed globally across all scenes] |
| [e.g. Object pooling for bullets] | [e.g. Mobile performance — avoid GC spikes] |

---

## Specialist Routing Guide

Use this as a routing guide even if your coding agent does not have named sub-agents.

| Task type | Specialist lens |
|---|---|
| Gameplay code, bug fixes, scripts | `programmer` |
| Mechanics, balancing, game feel | `game-designer` |
| Level layout, scene structure | `level-designer` |
| Menus, HUD, UI screens | `ui-designer` |
| Code review, testing, quality | `qa` |
| Build, export, release notes | `release` |

---

## Completed Features

- [feature name] — completed [date]
