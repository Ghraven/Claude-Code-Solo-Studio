#!/bin/bash
# session-start.sh — runs when Claude Code session opens
# Shows orientation info so Claude knows where you left off

echo "=== LEAN GAME STUDIO — SESSION START ==="

# Show current branch
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo "Branch: $BRANCH"
    
    # Show last 3 commits
    echo ""
    echo "Recent commits:"
    git log --oneline -3 2>/dev/null || echo "  (no commits yet)"
else
    echo "No git repo found. Run: git init"
fi

# Remind Claude to read CLAUDE.md
echo ""
echo "→ Read CLAUDE.md to restore project context."
echo "========================================"
