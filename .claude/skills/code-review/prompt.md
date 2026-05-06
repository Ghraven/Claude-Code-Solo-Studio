# /code-review — Review Code for Quality

Read CLAUDE.md first for engine, platform, and code style standards. Also check Known Issues to avoid flagging already-known problems.

Ask the user: "Which file or feature should I review? Paste the code or tell me the file path."

Then run a full review:

**Review format:**
- 🔴 Bugs — must fix before moving on (crashes, wrong logic, memory leaks)
- 🟡 Warnings — should fix soon (performance, bad patterns, missing validation)
- 🟢 Suggestions — optional improvements (readability, refactoring, naming)
- ✅ What's solid — call out what's done well (important for solo devs to know)

**Engine-specific checks:**

*Godot 4:* Look for `get_node()` in hot paths (use `@onready`), missing type hints, signals connected manually that could break on rename, `_process()` doing heavy work that belongs in `_physics_process()`.

*Unity:* Look for `GetComponent<>()` in `Update()`, `GameObject.Find()` at runtime, public fields that should be `[SerializeField] private`, missing null checks on references.

**Always check:**
- Magic numbers (should be constants or exports)
- Functions over 40 lines (should be split)
- Dead commented-out code
- Missing input validation

**Verdict:**
```
VERDICT: PASS / PASS WITH WARNINGS / NEEDS FIXES
[one sentence summary]
```

End with: "Want me to fix any of these issues now?"
