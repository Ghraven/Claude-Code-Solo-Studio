#!/bin/bash
# session-stop.sh — runs when Claude Code session closes
# Saves a quick progress note so next session knows where you left off

echo "=== SESSION END ==="

# Log git activity from this session
if git rev-parse --git-dir > /dev/null 2>&1; then
    COMMITS=$(git log --oneline --since="8 hours ago" 2>/dev/null | wc -l)
    if [ "$COMMITS" -gt 0 ]; then
        echo "Commits this session: $COMMITS"
        git log --oneline --since="8 hours ago" 2>/dev/null
    else
        echo "No commits this session."
    fi
fi

# Remind to update CLAUDE.md sprint
echo ""
echo "→ Before closing: update 'Current Sprint' in CLAUDE.md"
echo "  so next session knows what's done and what's next."
echo "==================="
