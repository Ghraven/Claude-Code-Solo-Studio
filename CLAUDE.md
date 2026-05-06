# [GAME NAME — change this]

> This file is your project's brain. Claude reads it at the start of every session.
> Keep it updated as your game evolves — especially "Current Sprint" and "Known Issues".

---

## Project Info

- **Game Name:** [change this]
- **Platform:** [Android / PC / Web — set by /setup]
- **Dimension:** [2D / 3D — set by /setup]
- **Genre:** [Platformer / RPG / Puzzle / Shooter / Other — set by /setup]
- **Engine:** [Godot 4 / Unity — set by /setup]
- **Status:** Early Development
- **Version:** 0.1.0

---

## Tech Stack

> /setup will fill this in based on your engine choice.

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

> /setup fills this in. Keep it consistent — agents read this every session.

- [e.g. GDScript typed, snake_case variables, PascalCase classes]
- [e.g. Signals for all cross-node communication]
- [e.g. Autoload singletons: GameManager, AudioManager]

---

## Current Sprint

> Update this every time you finish a task. Agents use this to know what's in progress.

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

---

## Known Issues

> Log bugs here when found. Mark resolved ones with ~~strikethrough~~. Agents check this before writing new code.

| # | Description | Severity | Status |
|---|---|---|---|
| 1 | [describe bug] | 🔴 High / 🟡 Medium / 🟢 Low | Open / Fixed |

---

## Architecture Decisions

> Record key decisions so Claude doesn't second-guess them in future sessions.

| Decision | Reason |
|---|---|
| [e.g. Use autoload singleton for GameManager] | [e.g. Needed globally across all scenes] |
| [e.g. Object pooling for bullets] | [e.g. Mobile performance — avoid GC spikes] |

---

## Agent Routing Guide

> Quick reference so Claude picks the right specialist without asking.

| Task type | Agent to use |
|---|---|
| Gameplay code, bug fixes, scripts | `programmer` |
| Mechanics, balancing, game feel | `game-designer` |
| Level layout, scene structure | `level-designer` |
| Menus, HUD, UI screens | `ui-designer` |
| Code review, testing, quality | `qa` |
| Build, export, release notes | `release` |

---

## Completed Features

> Move finished sprint items here so the Current Sprint stays clean.

- [feature name] — completed [date]
