# [GAME NAME — change this]

> This file is your project's brain. Claude reads it at the start of every session.
> Keep it updated as your game evolves — especially "Current Sprint".

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
- Export target: Android AAB
-->

---

## Code Style

- One script = one responsibility
- No magic numbers — use constants or `@export` (Godot) / `[SerializeField]` (Unity)
- Comment the "why", not the "what"
- Functions under 30 lines when possible
- Self-explanatory variable names — no `x`, `tmp`, `data` unless obvious in context
- Complete file rewrites preferred over partial snippets

---

## Project Structure

```
src/              Game source code (scripts, scenes)
assets/           Art, audio, fonts
  sprites/
  audio/
  fonts/
design/           Game design documents
  gdd.md          Main game design document
docs/             Technical notes
tests/            Test cases and checklists
```

---

## Agents Available

Claude, you have these specialists available. Use them directly when the task fits:

| Agent | Use for |
|-------|---------|
| `game-designer` | Mechanics, balancing, GDD updates |
| `programmer` | All code — GDScript or C# |
| `level-designer` | Level layouts, scene structure |
| `ui-designer` | Menus, HUD, screen design |
| `qa` | Code review, bug analysis, test cases |
| `release` | Build, export, versioning |

**Important:** Agents are self-contained. They read this file for context.
Do NOT have agents consult each other — handle tasks directly or tell the user to invoke the right agent.

---

## Current Sprint

> Update this every session. This is how Claude knows what's done and what's next.

- [ ] Set up project in engine
- [ ] Create main scene
- [ ] Build core player movement
- [ ] Build first level (rough)
- [ ] Main menu screen

---

## Game Concept

> Fill this in after running /setup. Keep it short — 3-5 sentences max.

[Describe your game here: what the player does, what makes it fun, what's the core loop]

---

## Known Issues

> Log bugs here so they don't get forgotten between sessions.

- (none yet)

---

## Session Notes

> Optional: jot anything Claude should know at the start of next session.

-
