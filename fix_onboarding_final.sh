#!/bin/bash
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"

python3 << 'PYEOF'
import re
path = 'src/pages/Onboarding.jsx'
with open(path,'r') as f: content = f.read()

before_open  = content.count('{')
before_close = content.count('}')

# Remove the duplicate dead block:
#   blank line
#   const targetPath = routeMap[userRole]
#   if (targetPath) { ... } else { ... }
#   }   <- the extra brace
pattern = re.compile(
    r"\n[ \t]*\n[ \t]*const targetPath = routeMap\[userRole\]\s*\n"
    r"[ \t]*if \(targetPath\) \{\s*\n"
    r"[ \t]*navigate\(targetPath\)\s*\n"
    r"[ \t]*\} else \{\s*\n"
    r"[ \t]*console\.warn\([^\n]*\)\s*\n"
    r"[ \t]*navigate\('/dashboard'\)\s*\n"
    r"[ \t]*\}\s*\n"
    r"\}\n"
)

new_content, n = pattern.subn("\n", content, count=1)

if n == 0:
    print("⚠️  Pattern not found — block may have slightly different formatting.")
    print("    No changes made. Please share more context if error persists.")
else:
    after_open  = new_content.count('{')
    after_close = new_content.count('}')
    with open(path, 'w') as f: f.write(new_content)
    print(f"✅ Removed duplicate dead block from Onboarding.jsx")
    print(f"   Before: {{ count={before_open}, }} count={before_close} (diff={before_close-before_open})")
    print(f"   After:  {{ count={after_open}, }} count={after_close} (diff={after_close-after_open})")
    if after_open == after_close:
        print(f"   ✅ Braces now balanced!")
    else:
        print(f"   ⚠️  Still imbalanced — may need another look")
PYEOF

rm -rf node_modules/.vite
echo ""
echo "Now run: npm run dev"
