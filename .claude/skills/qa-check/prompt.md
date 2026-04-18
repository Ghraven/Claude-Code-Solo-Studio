# /qa-check — Quality Check Before Moving On

Read CLAUDE.md first.

Ask: "What do you want me to check? (paste code, name a file, or say 'everything recent')"

Run the full QA review format. Then provide a final summary:

```
QA SUMMARY
──────────
Files reviewed: [list]
Issues found: [count by severity]
Recommendation: [READY TO MOVE ON / FIX THESE FIRST]
```

If "READY TO MOVE ON": suggest updating the sprint checklist in CLAUDE.md.
If "FIX THESE FIRST": list the must-fix items clearly and ask if you should fix them now.
