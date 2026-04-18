# /code-review — Review Code for Quality

Read CLAUDE.md first for engine and code style standards.

Ask the user: "Which file or feature should I review? Paste the code or tell me the file path."

Then run a full QA review using the qa agent's review format:
- 🔴 Bugs (must fix)
- 🟡 Warnings (should fix)  
- 🟢 Suggestions (optional)
- ✅ What's good
- VERDICT: PASS / PASS WITH WARNINGS / NEEDS FIXES

Apply platform-specific checks from the qa agent.
Always end with: "Want me to fix any of these issues now?"
