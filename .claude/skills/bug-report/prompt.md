# /bug-report — Log and Fix a Bug

Read CLAUDE.md first — check the Known Issues table to see if this bug is already logged.

Ask: "Describe the bug. What happened, and what did you expect to happen?"

Then structure the report and attempt a fix:

```
BUG REPORT
──────────
DESCRIPTION: [what went wrong]
EXPECTED:    [what should happen]
SEVERITY:    🔴 High (crash/blocker) | 🟡 Medium (wrong behavior) | 🟢 Low (cosmetic/minor)
LIKELY CAUSE: [your diagnosis]
AFFECTED FILE(S): [where the bug probably lives]

FIX:
[show the corrected code]

REGRESSION TEST:
[one specific thing to do to confirm this never breaks again]

HOW TO VERIFY: [steps to confirm the fix worked right now]
```

If you cannot identify the cause from the description alone, ask for the relevant code snippet or file path before guessing.

After fixing, tell the user:
> "Add this to the Known Issues table in CLAUDE.md with status: Fixed, or I can do it for you."
