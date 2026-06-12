#!/bin/bash
# TryIT — Canonical Core Sync
# Rewrites the 8 shared "plumbing" files to ONE consistent API
# that all pages (from any build session) can rely on.
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
mkdir -p src/context src/components

echo "Writing canonical context files..."

cat > src/context/AuthContext.jsx << 'CTXEOF'
import { createContext, useContext, useState, useEffect } from 'react'
import { LEVELS } from '../data/levelSystem'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

function createFreshUser() {
  return {
    id: `local_${Date.now()}`,
    name: '', email: '', role: 'student',
    userId: `TRY-XX-${Math.floor(Math.random()*90000)+10000}-2026`,
    coins: 200, level: 1,
    levelTitle: LEVELS?.[0]?.title || 'The Fierce One',
    levelEmoji: LEVELS?.[0]?.emoji || '🔥',
    xp: 0, xpToNext: 500, streak: 0, testsCompleted: 0,
    avgScore: null, rank: null, guruPoints: 0,
    exams: [], state: '', city: '', bio: '', avatar: null,
    initials: '?', isPro: false,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tryit_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem('tryit_user', JSON.stringify(user))
  }, [user])

  const login = (details = {}) => {
    const fresh = createFreshUser()
    const merged = { ...fresh, ...details }
    if (merged.name) merged.initials = merged.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
    setUser(merged)
    return merged
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tryit_user')
  }

  const updateProfile = (updates = {}) => {
    setUser(prev => {
      const next = { ...(prev || createFreshUser()), ...updates }
      if (updates.name) next.initials = updates.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
      return next
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
CTXEOF

cat > src/context/CoinContext.jsx << 'CTXEOF'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CoinContext = createContext(null)
export const useCoins = () => useContext(CoinContext)

export function CoinProvider({ children }) {
  const { user, updateProfile } = useAuth() || {}
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('tryit_coins')
    return saved ? parseInt(saved, 10) : (user?.coins ?? 200)
  })
  const [popup, setPopup] = useState(null) // { amount, description }

  useEffect(() => {
    localStorage.setItem('tryit_coins', String(balance))
    if (updateProfile) updateProfile({ coins: balance })
  }, [balance])

  const earn = ({ amount, description, source }) => {
    setBalance(b => b + amount)
    setPopup({ amount, description, type: 'earn' })
    setTimeout(() => setPopup(null), 2500)
    return balance + amount
  }

  const spend = ({ amount, description, source }) => {
    setBalance(b => Math.max(0, b - amount))
    setPopup({ amount: -amount, description, type: 'spend' })
    setTimeout(() => setPopup(null), 2500)
    return Math.max(0, balance - amount)
  }

  return (
    <CoinContext.Provider value={{ balance, earn, spend }}>
      {children}
      {popup && (
        <div style={{ position:'fixed', top:20, right:20, zIndex:9999, background: popup.type==='earn' ? 'linear-gradient(135deg,#22C55E,#16A34A)' : 'linear-gradient(135deg,#EF4444,#DC2626)', color:'#fff', padding:'12px 20px', borderRadius:14, fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, boxShadow:'0 8px 24px rgba(0,0,0,0.2)', animation:'slideIn 0.3s ease' }}>
          {popup.type==='earn' ? '+' : ''}{popup.amount}🪙 {popup.description}
          <style>{`@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
        </div>
      )}
    </CoinContext.Provider>
  )
}
CTXEOF

cat > src/context/ToastContext.jsx << 'CTXEOF'
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)

const COLORS = {
  success: '#22C55E', error: '#EF4444', info: '#1E3A5F', warning: '#F59E0B',
}
const ICONS = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' }

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((type, message) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, type, message }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)', zIndex:9999, display:'flex', flexDirection:'column', gap:8, width:'min(90vw, 360px)' }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background:'#fff', borderLeft:`4px solid ${COLORS[t.type]||COLORS.info}`, borderRadius:12, padding:'12px 16px', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', display:'flex', alignItems:'center', gap:10, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:600, color:'#1E293B', animation:'toastIn 0.25s ease' }}>
            <span>{ICONS[t.type]||ICONS.info}</span>{t.message}
          </div>
        ))}
      </div>
      <style>{`@keyframes toastIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </ToastContext.Provider>
  )
}
CTXEOF

cat > src/context/ThemeContext.jsx << 'CTXEOF'
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)
export const useTheme = () => useContext(ThemeContext)

const DEFAULT_THEME = {
  id: 'default', name: 'TryIT Classic',
  navy: '#1E3A5F', gold: '#D4AF37', bg: '#F8FAFC',
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('tryit_theme')
      return saved ? JSON.parse(saved) : DEFAULT_THEME
    } catch { return DEFAULT_THEME }
  })

  useEffect(() => {
    localStorage.setItem('tryit_theme', JSON.stringify(theme))
    document.documentElement.style.setProperty('--color-navy', theme.navy)
    document.documentElement.style.setProperty('--color-gold', theme.gold)
    document.documentElement.style.setProperty('--color-bg', theme.bg)
  }, [theme])

  const setTheme = (newTheme) => setThemeState(newTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, defaultTheme: DEFAULT_THEME }}>
      {children}
    </ThemeContext.Provider>
  )
}
CTXEOF

cat > src/context/AccessibilityContext.jsx << 'CTXEOF'
import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext(null)
export const useAccessibility = () => useContext(AccessibilityContext)

export function AccessibilityProvider({ children }) {
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('tryit_accessibility_level')||'0', 10))

  useEffect(() => {
    document.documentElement.setAttribute('data-accessibility', String(level))
    localStorage.setItem('tryit_accessibility_level', String(level))
  }, [level])

  return (
    <AccessibilityContext.Provider value={{ level, setLevel }}>
      {children}
    </AccessibilityContext.Provider>
  )
}
CTXEOF

cat > src/context/EquityTierContext.jsx << 'CTXEOF'
import { createContext, useContext, useState } from 'react'

const EquityTierContext = createContext(null)
export const useEquityTier = () => useContext(EquityTierContext)

export function EquityTierProvider({ children }) {
  const [tier, setTier] = useState(() => localStorage.getItem('tryit_equity_tier') || null)
  const setEquityTier = (t) => { setTier(t); localStorage.setItem('tryit_equity_tier', t || '') }
  return (
    <EquityTierContext.Provider value={{ tier, setEquityTier }}>
      {children}
    </EquityTierContext.Provider>
  )
}
CTXEOF

cat > src/context/LanguageContext.jsx << 'CTXEOF'
import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)
export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('tryit_language') || 'en')
  const changeLanguage = (lang) => { setLanguage(lang); localStorage.setItem('tryit_language', lang) }
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
CTXEOF

cat > src/context/RoleContext.jsx << 'CTXEOF'
import { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'

const RoleContext = createContext(null)
export const useRole = () => useContext(RoleContext)

export function RoleProvider({ children }) {
  const { user } = useAuth() || {}
  const [role, setRole] = useState(() => user?.role || localStorage.getItem('tryit_role') || 'student')
  const changeRole = (r) => { setRole(r); localStorage.setItem('tryit_role', r) }
  return (
    <RoleContext.Provider value={{ role, setRole: changeRole }}>
      {children}
    </RoleContext.Provider>
  )
}
CTXEOF

echo "Writing canonical TryITLogo..."
cat > src/components/TryITLogo.jsx << 'LEOF'
export default function TryITLogo({ size = 148, variant = 'dark', className = '' }) {
  const W = size, H = Math.round(W * 0.42)
  const sunX = W * 0.372, sunY = H * 0.30, sunR = W * 0.058
  const RAY_ANGLES = [0,45,90,135,180,225,270,315]
  const RAY_INNER = sunR*1.5, RAY_OUTER = sunR*2.6
  const RAY_THICK = [1.8,1.2,1.8,1.2,1.8,1.2,1.8,1.2]
  const arrowStartX = sunX+sunR*0.5, arrowStartY = sunY-sunR*0.5
  const arrowEndX = sunX+sunR*2.2, arrowEndY = sunY-sunR*2.2
  const goldColor = '#D4AF37', goldLight = '#F0C84A'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={className} aria-label="TryIT Educations" style={{ display:'block', flexShrink:0 }}>
      <defs>
        <linearGradient id={`gold-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" /><stop offset="40%" stopColor={goldLight} /><stop offset="100%" stopColor={goldColor} />
        </linearGradient>
        <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`sunGlow-${size}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {RAY_ANGLES.map((angleDeg,i)=>{
        const rad = (angleDeg*Math.PI)/180
        return <line key={i} x1={sunX+Math.cos(rad)*RAY_INNER} y1={sunY+Math.sin(rad)*RAY_INNER} x2={sunX+Math.cos(rad)*RAY_OUTER} y2={sunY+Math.sin(rad)*RAY_OUTER} stroke={`url(#gold-${size})`} strokeWidth={RAY_THICK[i]} strokeLinecap="round" opacity={0.9}/>
      })}

      <circle cx={sunX} cy={sunY} r={sunR*1.25} fill="none" stroke={goldColor} strokeWidth={0.6} opacity={0.3}/>
      <circle cx={sunX} cy={sunY} r={sunR} fill={`url(#gold-${size})`} filter={`url(#sunGlow-${size})`}/>
      <circle cx={sunX-sunR*0.2} cy={sunY-sunR*0.2} r={sunR*0.35} fill="rgba(255,255,255,0.35)"/>

      <line x1={arrowStartX} y1={arrowStartY} x2={arrowEndX} y2={arrowEndY} stroke={`url(#gold-${size})`} strokeWidth={W*0.015} strokeLinecap="round" filter={`url(#glow-${size})`}/>
      <polygon points={`${arrowEndX},${arrowEndY} ${arrowEndX-W*0.032},${arrowEndY+W*0.005} ${arrowEndX-W*0.005},${arrowEndY+W*0.032}`} fill={`url(#gold-${size})`}/>

      <text x={W*0.018} y={H*0.78} fontFamily="'Arial Black','Impact',Arial,sans-serif" fontWeight="900" fontSize={H*0.68} fill={variant==='light'?'#FFFFFF':'#1E3A5F'} letterSpacing={-1}>TRY</text>
      <text x={W*0.618} y={H*0.78} fontFamily="'Arial Black','Impact',Arial,sans-serif" fontWeight="900" fontSize={H*0.68} fill={`url(#gold-${size})`} filter={`url(#glow-${size})`} letterSpacing={-1}>IT</text>
      <rect x={W*0.018} y={H*0.84} width={W*0.964} height={Math.max(1.5,H*0.045)} rx={H*0.022} fill={`url(#gold-${size})`}/>
      <text x={W*0.5} y={H*0.985} textAnchor="middle" fontFamily="Arial,'Helvetica Neue',sans-serif" fontWeight="800" fontSize={H*0.185} letterSpacing={H*0.042} fill={`url(#gold-${size})`}>EDUCATIONS</text>
    </svg>
  )
}
LEOF

# Ensure App.jsx wraps all 8 providers correctly
python3 << 'PYEOF'
import os, re
path = 'src/App.jsx'
if os.path.exists(path):
    with open(path,'r') as f: c = f.read()

    needed_imports = {
        'AuthProvider':          "import { AuthProvider } from './context/AuthContext'",
        'CoinProvider':          "import { CoinProvider } from './context/CoinContext'",
        'ToastProvider':         "import { ToastProvider } from './context/ToastContext'",
        'ThemeProvider':         "import { ThemeProvider } from './context/ThemeContext'",
        'AccessibilityProvider': "import { AccessibilityProvider } from './context/AccessibilityContext'",
        'EquityTierProvider':    "import { EquityTierProvider } from './context/EquityTierContext'",
        'LanguageProvider':      "import { LanguageProvider } from './context/LanguageContext'",
        'RoleProvider':          "import { RoleProvider } from './context/RoleContext'",
    }

    changed = False
    for name, imp in needed_imports.items():
        if name not in c:
            # add import after first import line
            c = re.sub(r'(import .+\n)', r'\1' + imp + '\n', c, count=1)
            changed = True

    if changed:
        with open(path,'w') as f: f.write(c)
        print('Added missing provider imports to App.jsx')
        print('⚠️  MANUAL STEP: ensure each <XProvider> wraps {children}')
        print('   in the JSX tree (nest in any order, all 8 needed)')
    else:
        print('App.jsx already imports all 8 providers')
PYEOF

rm -rf node_modules/.vite

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Canonical core synced                                ║"
echo "║                                                          ║"
echo "║  Standardized APIs (all pages can now rely on these):    ║"
echo "║  useAuth()     → { user, login, logout, updateProfile }  ║"
echo "║  useCoins()    → { balance, earn({...}), spend({...}) }  ║"
echo "║  useToast()    → { showToast(type, message) }            ║"
echo "║  useTheme()    → { theme, setTheme }                     ║"
echo "║  useAccessibility() → { level, setLevel }                ║"
echo "║  useEquityTier()    → { tier, setEquityTier }            ║"
echo "║  useLanguage()      → { language, setLanguage }          ║"
echo "║  useRole()          → { role, setRole }                  ║"
echo "║                                                          ║"
echo "║  TryITLogo.jsx — single canonical sun logo               ║"
echo "║  (overwrites any duplicate Logo/LogoAnimated confusion)   ║"
echo "║                                                          ║"
echo "║  Run: npm run dev                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
