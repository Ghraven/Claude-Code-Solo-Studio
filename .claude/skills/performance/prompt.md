# /performance — Optimization and Profiling Check

Read CLAUDE.md to understand the target platform and engine. Performance targets differ significantly between mobile, PC, and web.

Ask: "Which area of the game are you experiencing performance issues with, or do you want a general optimization check?"

When the user responds, analyze their code and provide a structured plan:

```
⚡ PERFORMANCE CHECK
───────────────────
TARGET PLATFORM: [Platform from CLAUDE.md]
ENGINE: [Engine from CLAUDE.md]

POTENTIAL BOTTLENECKS:
[Identify 2-3 specific areas in the current code/scenes that could cause lag, GC spikes, or frame drops. e.g., missing object pools, excessive physics processing, unoptimized UI redraws]

QUICK WINS:
[Provide 2-3 immediate, easy-to-implement code optimizations with examples]

PROFILING STRATEGY:
[Provide step-by-step instructions on how to use the built-in profiler (Unity Profiler or Godot Profiler) to measure this specific issue]
```

Remind the user: "Always profile first before rewriting complex systems. Shall I implement any of the quick wins?"
