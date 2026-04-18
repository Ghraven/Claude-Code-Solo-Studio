# /new-feature — Start Building a Feature

Read CLAUDE.md first to know the engine, platform, and genre.

When the user runs `/new-feature`, ask them ONE question only:

**"What feature do you want to build? Describe it in one sentence."**

Then immediately:

1. Break it into tasks (max 5 tasks for the feature)
2. Identify which agent should handle each task:
   - Design decisions → game-designer
   - Code → programmer
   - Level/scene layout → level-designer
   - UI/menus/HUD → ui-designer
3. Start with the first task yourself — do not wait
4. After each task, show progress:

```
FEATURE: [name]
[✅] Task 1 — done
[🔄] Task 2 — in progress
[ ] Task 3
[ ] Task 4
```

## Rules
- Never break a feature into more than 5 tasks
- Start working immediately — no approval-seeking
- If a task is pure code, write the full code now
- If a task needs design input, ask one focused question then proceed
- Mark the feature done when all tasks are complete and ask: "Want me to run /qa-check on this?"
