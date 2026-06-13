#!/bin/bash
ROOT="${1:-/workspaces/tryitapp}"
cd "$ROOT"

echo "=== All references to Logo / LogoAnimated / tryit-logo across src/ ==="
grep -rn "LogoAnimated\|<Logo\|tryit-logo\|import Logo" src/ --include="*.jsx" --include="*.js"
