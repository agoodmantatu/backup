#!/bin/bash
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"

# Remove the fragile LEVELS import — hardcode level 1 defaults instead
python3 << 'PYEOF'
path = 'src/context/AuthContext.jsx'
with open(path,'r') as f: c = f.read()

c = c.replace("import { LEVELS } from '../data/levelSystem'\n", "")
c = c.replace("levelTitle: LEVELS?.[0]?.title || 'The Fierce One',", "levelTitle: 'The Fierce One',")
c = c.replace("levelEmoji: LEVELS?.[0]?.emoji || '🔥',", "levelEmoji: '🔥',")

with open(path,'w') as f: f.write(c)
print('✅ AuthContext.jsx — removed levelSystem dependency, hardcoded L1 defaults')
PYEOF

# Quick favicon fix (avoids 404 noise, takes 5 seconds)
mkdir -p public
if [ ! -f public/favicon.ico ]; then
  python3 << 'PYEOF'
# Tiny 16x16 gold square favicon (base64 ICO)
import base64
ico_b64 = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAEAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv/0xAr/9MQK//TECv8="
with open('public/favicon.ico','wb') as f:
    f.write(base64.b64decode(ico_b64))
print('✅ favicon.ico added (gold square)')
PYEOF
else
  echo "ℹ️  favicon.ico already exists"
fi

echo ""
echo "✅ Fix 1 done. Now run: npm run dev"
echo ""
echo "═══════════════════════════════════════════════════"
echo "  DIAGNOSTIC NEEDED for Onboarding.jsx:646"
echo "═══════════════════════════════════════════════════"
echo "Run this and paste the output back:"
echo ""
echo "  sed -n '600,646p' src/pages/Onboarding.jsx"
echo ""
echo "Also run this to check brace balance:"
echo ""
echo "  python3 -c \"c=open('src/pages/Onboarding.jsx').read(); print('open:',c.count('{'),'close:',c.count('}'))\""
echo ""
echo "Paste both outputs and I'll give an exact line-fix."
echo "═══════════════════════════════════════════════════"
