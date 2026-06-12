#!/bin/bash
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
mkdir -p src/context src/lib

echo "Adding 18 missing exports across 6 files..."

# ── 1. AccessibilityContext: useA11y + A11Y_MODES ──────────────────
cat >> src/context/AccessibilityContext.jsx << 'EOF'

// ── Added: AccessibilityMode page compatibility ───────────────────
export const A11Y_MODES = [
  { id:'standard',      label:'Standard',      emoji:'👁️', desc:'Default experience' },
  { id:'large-text',    label:'Large Text',    emoji:'🔍', desc:'Bigger fonts, more spacing' },
  { id:'high-contrast', label:'High Contrast', emoji:'🎨', desc:'Bold colors, thicker borders' },
  { id:'screen-reader', label:'Screen Reader', emoji:'🔊', desc:'Full ARIA + voice navigation' },
]

export function useA11y() {
  const ctx = useAccessibility()
  const level = ctx?.level || 0
  return {
    mode: A11Y_MODES[level]?.id || 'standard',
    level,
    setLevel: ctx?.setLevel || (()=>{}),
    setMode: (id) => {
      const idx = A11Y_MODES.findIndex(m => m.id === id)
      ctx?.setLevel?.(idx >= 0 ? idx : 0)
    },
  }
}
EOF
echo "✅ 1/6 AccessibilityContext.jsx — added useA11y, A11Y_MODES"

# ── 2. apaarValidator.js: isValidAPAAR, formatAPAAR, verifyAPAAR ───
cat >> src/lib/apaarValidator.js << 'EOF'

// ── Added: APAAR ID validation (12-digit Academic ID) ─────────────
export function isValidAPAAR(id) {
  const clean = String(id || '').replace(/\D/g, '')
  return clean.length === 12
}

export function formatAPAAR(id) {
  const clean = String(id || '').replace(/\D/g, '')
  return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export async function verifyAPAAR(id) {
  await new Promise(r => setTimeout(r, 600))
  const valid = isValidAPAAR(id)
  return {
    valid,
    formatted: formatAPAAR(id),
    message: valid ? 'APAAR ID verified ✅' : 'Invalid APAAR ID — must be 12 digits',
  }
}
EOF
echo "✅ 2/6 apaarValidator.js — added isValidAPAAR, formatAPAAR, verifyAPAAR"

# ── 3. coinVault.js: 7 missing exports ─────────────────────────────
cat >> src/lib/coinVault.js << 'EOF'

// ── Added: missing coin functions ─────────────────────────────────
const _COINS_KEY = 'tryit_coins'

function _readBalance() {
  const v = localStorage.getItem(_COINS_KEY)
  return v ? parseInt(v, 10) : 200
}
function _writeBalance(v) {
  localStorage.setItem(_COINS_KEY, String(Math.max(0, v)))
  window.dispatchEvent(new Event('tryit-coins-updated'))
}

export const DEDUCTION_RULES = {
  belowCutoff:   { amount: 10, label: 'Score below exam cutoff' },
  testAbandoned: { amount: 5,  label: 'Test abandoned before completion' },
}

export const COIN_PACKS = [
  { id:'pack_100',  coins:100,  price:5,  label:'Starter Pack' },
  { id:'pack_500',  coins:500,  price:19, label:'Popular Pack', badge:'Best Value' },
  { id:'pack_1200', coins:1200, price:49, label:'Power Pack' },
  { id:'pack_3000', coins:3000, price:99, label:'Champion Pack' },
]

export function rewardCurrentAffairsRead({ amount = 5 } = {}) {
  _writeBalance(_readBalance() + amount)
  return { coins: amount, newBalance: _readBalance() }
}

export function rewardFocusSession({ amount = 25 } = {}) {
  _writeBalance(_readBalance() + amount)
  return { coins: amount, newBalance: _readBalance() }
}

export function rewardGame({ amount = 10, xp = 0 } = {}) {
  _writeBalance(_readBalance() + amount)
  return { coins: amount, xp, newBalance: _readBalance() }
}

export function processTestResult({ score = 0, cutoff = 40, baseReward = 50 } = {}) {
  const passed = score >= cutoff
  const delta = passed ? baseReward : -DEDUCTION_RULES.belowCutoff.amount
  _writeBalance(_readBalance() + delta)
  return {
    passed, coinsChange: delta, newBalance: _readBalance(),
    message: passed
      ? `+${delta} coins — great job! 🎉`
      : `${delta} coins — score below cutoff (${cutoff}%). Keep practicing!`,
  }
}

export async function purchaseCoins(packId) {
  const pack = COIN_PACKS.find(p => p.id === packId)
  if (!pack) throw new Error('Invalid coin pack')
  await new Promise(r => setTimeout(r, 800))
  _writeBalance(_readBalance() + pack.coins)
  return { success: true, coinsAdded: pack.coins, newBalance: _readBalance() }
}
EOF
echo "✅ 3/6 coinVault.js — added 7 functions (rewards, processTestResult, COIN_PACKS, purchaseCoins, DEDUCTION_RULES)"

# ── 4. equityTiers.js: EQUITY_TIERS ────────────────────────────────
cat >> src/lib/equityTiers.js << 'EOF'

// ── Added: 8 free-access tiers (Agrarian removed per brand rules) ─
export const EQUITY_TIERS = [
  { id:'hope-scholar',  name:'Hope Scholar',                emoji:'🎓',  desc:'Below poverty line / BPL card holders',         requiresDoc:true  },
  { id:'divyang',       name:'Divyang Warrior',             emoji:'♿',  desc:'UDID verified — full accessibility + Pro',       requiresDoc:true  },
  { id:'swachhta',      name:'Swachhta Warrior',            emoji:'🧹',  desc:'Sanitation workers & their families',            requiresDoc:true  },
  { id:'veer-nari',     name:"Veer Nari / Martyr's Family", emoji:'🕊️', desc:'Defence & police martyr families',               requiresDoc:true  },
  { id:'transgender',   name:'Transgender Youth',           emoji:'🏳️‍⚧️', desc:'Full access, no questions asked',             requiresDoc:false },
  { id:'military',      name:'Active Military',             emoji:'🪖',  desc:'Serving personnel — 30% discount',               requiresDoc:true  },
  { id:'asha',          name:'ASHA/Anganwadi Worker',       emoji:'🌾',  desc:'Healthcare frontline workers',                   requiresDoc:true  },
  { id:'first-gen',     name:'First-Generation Learner',    emoji:'📚',  desc:'First in family pursuing higher education',      requiresDoc:false },
]
EOF
echo "✅ 4/6 equityTiers.js — added EQUITY_TIERS (8 tiers)"

# ── 5. EquityTierContext.jsx: useEquity alias ──────────────────────
cat >> src/context/EquityTierContext.jsx << 'EOF'

// ── Added: alias for pages expecting useEquity ────────────────────
export function useEquity() {
  return useEquityTier()
}
EOF
echo "✅ 5/6 EquityTierContext.jsx — added useEquity alias"

# ── 6. gameEngine.js: getGameQuestions, calcGameXP, getGameConfig ──
cat >> src/lib/gameEngine.js << 'EOF'

// ── Added: game config + question generation + XP calc ────────────
const _GAME_CONFIGS = {
  'math-blitz': { duration:60, questionCount:10, baseReward:10 },
  'word-rush':  { duration:60, questionCount:10, baseReward:10 },
  'gk-burst':   { duration:60, questionCount:10, baseReward:10 },
}

export function getGameConfig(gameId) {
  return _GAME_CONFIGS[gameId] || _GAME_CONFIGS['math-blitz']
}

export function getGameQuestions(gameId, level = 1, count) {
  const cfg = getGameConfig(gameId)
  const n = count || cfg.questionCount

  if (gameId === 'word-rush') {
    const bank = [
      { q:'Choose the correctly spelt word:', options:['Definitely','Definately','Definitly','Defenitely'], answer:'Definitely' },
      { q:'Choose the correctly spelt word:', options:['Necessary','Neccessary','Necesary','Neccesary'], answer:'Necessary' },
      { q:'Antonym of "Ancient":', options:['Modern','Old','Historic','Past'], answer:'Modern' },
      { q:'Synonym of "Happy":', options:['Joyful','Sad','Angry','Tired'], answer:'Joyful' },
    ]
    return Array.from({length:n}, (_,i) => ({ id:`wr_${i}`, ...bank[i % bank.length] }))
  }

  if (gameId === 'gk-burst') {
    const bank = [
      { q:'Capital of India?', options:['New Delhi','Mumbai','Kolkata','Chennai'], answer:'New Delhi' },
      { q:'National bird of India?', options:['Peacock','Sparrow','Eagle','Crow'], answer:'Peacock' },
      { q:'Who is known as Father of the Nation?', options:['Mahatma Gandhi','Nehru','Bose','Patel'], answer:'Mahatma Gandhi' },
      { q:'Longest river in India?', options:['Ganga','Yamuna','Godavari','Narmada'], answer:'Ganga' },
    ]
    return Array.from({length:n}, (_,i) => ({ id:`gk_${i}`, ...bank[i % bank.length] }))
  }

  // default: math-blitz
  return Array.from({length:n}, (_,i) => {
    const a = Math.floor(Math.random()*50)+1, b = Math.floor(Math.random()*50)+1
    const ops = ['+','-','×']
    const op = ops[Math.floor(Math.random()*ops.length)]
    const answer = op==='+' ? a+b : op==='-' ? a-b : a*b
    const wrongs = [answer+1, answer-1, answer+2].filter(w=>w!==answer)
    const options = [answer, ...wrongs.slice(0,3)].sort(()=>Math.random()-0.5)
    return { id:`mb_${i}`, q:`${a} ${op} ${b} = ?`, options, answer }
  })
}

export function calcGameXP({ correct = 0, total = 10, timeLeft = 0 } = {}) {
  const accuracy = total > 0 ? correct / total : 0
  const baseXP = correct * 5
  const speedBonus = Math.round(timeLeft / 2)
  const perfectBonus = accuracy === 1 ? 20 : 0
  return baseXP + speedBonus + perfectBonus
}
EOF
echo "✅ 6/6 gameEngine.js — added getGameQuestions, calcGameXP, getGameConfig"

# ── 7. security.js: checkTestLimit ─────────────────────────────────
cat >> src/lib/security.js << 'EOF'

// ── Added: daily free-test velocity limiter ───────────────────────
export function checkTestLimit() {
  const KEY = 'tryit_test_velocity'
  const today = new Date().toISOString().split('T')[0]
  let data = JSON.parse(localStorage.getItem(KEY) || '{}')
  if (data.date !== today) data = { date: today, count: 0 }
  const FREE_LIMIT = 3
  return {
    allowed: data.count < FREE_LIMIT,
    used: data.count,
    limit: FREE_LIMIT,
    remaining: Math.max(0, FREE_LIMIT - data.count),
  }
}

export function recordTestTaken() {
  const KEY = 'tryit_test_velocity'
  const today = new Date().toISOString().split('T')[0]
  let data = JSON.parse(localStorage.getItem(KEY) || '{}')
  if (data.date !== today) data = { date: today, count: 0 }
  data.count = (data.count || 0) + 1
  localStorage.setItem(KEY, JSON.stringify(data))
}
EOF
echo "✅ 7/7 security.js — added checkTestLimit, recordTestTaken"

# ── 8. CoinContext: live-update balance when coinVault writes ─────
python3 << 'PYEOF'
path = 'src/context/CoinContext.jsx'
with open(path,'r') as f: c = f.read()

if 'tryit-coins-updated' not in c:
    anchor = "useEffect(() => {\n    localStorage.setItem('tryit_coins', String(balance))"
    addition = '''useEffect(() => {
    const sync = () => {
      const v = localStorage.getItem('tryit_coins')
      if (v) setBalance(parseInt(v, 10))
    }
    window.addEventListener('tryit-coins-updated', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('tryit-coins-updated', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tryit_coins', String(balance))'''
    if anchor in c:
        c = c.replace(anchor, addition, 1)
        with open(path,'w') as f: f.write(c)
        print("✅ 8/8 CoinContext.jsx — added live balance sync listener")
    else:
        print("⚠️  CoinContext.jsx — anchor not found, skipped (coinVault functions still work, just may need page refresh to see balance update)")
else:
    print("ℹ️  CoinContext.jsx — sync listener already present")
PYEOF

rm -rf node_modules/.vite

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ All 18 missing exports added across 7 files          ║"
echo "║  Now run: npm run dev                                    ║"
echo "╚══════════════════════════════════════════════════════════╝"
