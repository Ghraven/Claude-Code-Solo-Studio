# Changelog

All notable changes to Claude Code Solo Studio are documented here.

## [Unreleased]

### Planned
- `/save-system` command — save/load system scaffold for the chosen engine
- Defold engine support in `/setup`
- `/localization` command — i18n scaffold for multi-language games

---

## [1.3.0] — 2026-05-21

### Added
- `/performance` slash command — provides structured profiling checks, bottleneck diagnosis, and optimization strategy

---

## [1.2.0] — 2025-05-12

### Added
- `session-start.sh` now extracts and displays **Current Sprint** tasks from `CLAUDE.md` on session open — Claude knows what's in progress without reading the full file
- `session-start.sh` shows **open bug count** from the Known Issues table
- `validate-commit.sh` now reads current **version from CLAUDE.md** and warns if `CHANGELOG.md` is not staged
- `CLAUDE.md` template expanded with **Known Issues table**, **Architecture Decisions log**, and **Agent Routing Guide**
- `programmer` agent expanded with **Unity C# patterns** (`[SerializeField]`, `ScriptableObject`, `GetComponent` caching) and **Godot signal/autoload/`@onready` guidance** plus mobile performance notes
- `/bug-report` skill adds **severity classification** (🔴/🟡/🟢) and **regression test** prompt
- `/code-review` skill adds **engine-specific checks** (Godot `@onready`, Unity `GetComponent` in `Update`) and cross-references Known Issues
- `/status` skill now surfaces **open bugs** from Known Issues table alongside sprint tasks
- `settings.json` permissions expanded to allow `touch`, `chmod`, `echo` (required by hooks)

### Fixed
- Duplicate `/build`, `/status`, `/help` rows removed from README slash commands table
- `/setup` generates updated `CLAUDE.md` template with all new sections
- `/new-feature` now checks Known Issues before starting work
- `/qa-check` now cross-references Known Issues table

---

## [1.1.0] — 2025-04-30

### Added
- `/build` slash command — complete export and release checklist for Godot and Unity, covering pre-build checks, engine-specific export steps, post-build verification, version tagging, and distribution options
- `CONTRIBUTING.md` — guide for adding slash commands and agents
- `CHANGELOG.md`

---

## [1.0.0] — 2025-04-01

### Added
- Initial release
- 6 specialist agents: `game-designer`, `programmer`, `level-designer`, `ui-designer`, `qa`, `release`
- 9 slash commands: `/setup`, `/new-feature`, `/level-design`, `/ui-design`, `/code-review`, `/qa-check`, `/bug-report`, `/status`, `/help`
- 3 hooks: `session-start.sh`, `session-stop.sh`, `validate-commit.sh`
- Engine tip card in `/setup` (Godot vs Unity comparison)
- `CLAUDE.md` template with project config, sprint tracking, and agent instructions
- Permissions in `settings.json` blocking `rm -rf` and force-push
