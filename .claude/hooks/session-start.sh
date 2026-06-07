#!/bin/bash
# session-start.sh — runs when Claude Code session opens
# Shows orientation info so Claude knows where you left off

echo "=== LEAN GAME STUDIO — SESSION START ==="

# Show current branch and recent commits
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo "Branch: $BRANCH"

    echo ""
    echo "Recent commits:"
    git log --oneline -3 2>/dev/null || echo "  (no commits yet)"
else
    echo "No git repo found. Run: git init"
fi

# Extract and display Current Sprint from CLAUDE.md
if [ -f "CLAUDE.md" ]; then
    echo ""
    echo "Current Sprint (from CLAUDE.md):"
    # Print lines between "## Current Sprint" and the next "##" heading
    SPRINT_LINES=$(
        awk '/^## Current Sprint/{found=1; next} found && /^## /{exit} found{print}' CLAUDE.md \
            | grep -E "^- \\[[ xX]\\]" \
            | grep -v "\\[ \\] Task [0-9]" \
            | head -10
    )
    if [ -n "$SPRINT_LINES" ]; then
        echo "$SPRINT_LINES" | sed "s/^/  /"
    else
        echo "  (no active sprint tasks yet — update CLAUDE.md or run /setup)"
    fi
fi

# Show open bugs count if Known Issues table exists
if [ -f "CLAUDE.md" ]; then
    OPEN_BUGS=$(grep -c "| Open" CLAUDE.md 2>/dev/null || echo 0)
    if [ "$OPEN_BUGS" -gt 0 ]; then
        echo ""
        echo "Open bugs: $OPEN_BUGS (see Known Issues in CLAUDE.md)"
    fi
fi

echo ""
echo "→ Read CLAUDE.md to restore full project context."
echo "========================================"
