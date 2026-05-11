#!/bin/bash
# validate-commit.sh — runs before every git commit
# Reminds Claude to check CLAUDE.md version and update changelog

echo "=== PRE-COMMIT CHECK ==="

# Show current version from CLAUDE.md
if [ -f "CLAUDE.md" ]; then
    VERSION=$(grep -m1 "\*\*Version:\*\*" CLAUDE.md | sed "s/.*\*\*Version:\*\*[[:space:]]*//" | tr -d "\r")
    if [ -n "$VERSION" ]; then
        echo "Current version: $VERSION"
    fi
fi

# Check if CHANGELOG.md was updated in this commit
if git diff --cached --name-only | grep -q "CHANGELOG.md"; then
    echo "✓ CHANGELOG.md updated"
else
    echo "⚠  CHANGELOG.md not staged — remember to log what changed."
fi

# Check if CLAUDE.md is in the commit (sprint tasks may have changed)
if git diff --cached --name-only | grep -q "CLAUDE.md"; then
    echo "✓ CLAUDE.md staged"
fi

echo "========================"
exit 0
