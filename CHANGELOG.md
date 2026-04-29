# Changelog

All notable changes to Claude Code Solo Studio are documented here.

## [Unreleased]

### Planned
- `/performance` command — profiling and optimization checklist
- `/save-system` command — save/load system scaffold for the chosen engine
- Defold engine support in `/setup`

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
