#!/bin/bash
# validate-commit.sh — runs only on git commit, not every bash call
# Keeps this lean — exits immediately if not a commit command

# Only run for git commit
if [[ "$CLAUDE_TOOL_INPUT" != *"git commit"* ]]; then
    exit 0
fi

echo "=== COMMIT VALIDATION ==="

ERRORS=0

# Check for hardcoded magic numbers in GDScript
if find src/ -name "*.gd" 2>/dev/null | xargs grep -l "= [0-9]\{3,\}" 2>/dev/null | grep -v "\.import" | head -5 | grep -q .; then
    echo "⚠️  WARNING: Possible magic numbers found in GDScript files."
    echo "   Consider using constants or @export variables."
fi

# Check for hardcoded magic numbers in C#
if find Assets/ -name "*.cs" 2>/dev/null | xargs grep -l " = [0-9]\{3,\}[^f]" 2>/dev/null | head -5 | grep -q .; then
    echo "⚠️  WARNING: Possible magic numbers found in C# files."
    echo "   Consider using [SerializeField] constants."
fi

# Check for TODO/FIXME left in code
TODO_COUNT=$(grep -r "TODO\|FIXME\|HACK\|XXX" src/ Assets/ 2>/dev/null | wc -l)
if [ "$TODO_COUNT" -gt 0 ]; then
    echo "ℹ️  NOTE: $TODO_COUNT TODO/FIXME comments found. That's okay — just be aware."
fi

if [ $ERRORS -eq 0 ]; then
    echo "✅ Commit looks clean."
fi

echo "========================="
exit 0
