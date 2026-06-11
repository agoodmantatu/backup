import { createContext, useContext } from 'react'
import { getLevelInfo } from '../data/mockSeeds'

// Check if admin granted pro access for this email
function checkAdminGrant(email) {
  try {
    const grants = JSON.parse(localStorage.getItem('tryit_pro_grants') || '[]')
    const grant  = grants.find(g =>
      g.email?.toLowerCase() === email?.toLowerCase() &&
      new Date(g.expiresAt) > new Date()
    )
    return grant || null
  } catch { return null }
}

const MOCK_USER = {
  id:'usr-001', name:'Arjun Kumar', initials:'AK',
  email: localStorage.getItem('tryit_email') || 'arjun@tryiteducations.net',
  state:'Tamil Nadu', city:'Coimbatore', category:'General',
  level:4, levelTitle:'The Gold Miner', levelEmoji:'⛏️',
  xp:6240, xpToNext:8000,
  coins:1247, streak:12, streakFreezes:2,
  isPro: !!checkAdminGrant(localStorage.getItem('tryit_email') || ''),
  plan: checkAdminGrant(localStorage.getItem('tryit_email') || '')?.plan || 'free',
  userId:'TRY-TN-00001-2026', joinDate:'January 2026',
  rank:1243, testsCompleted:23, avgScore:78,
  studyHours:'48h 30m', guruPoints:847,
  languages:['en','ta'],
  exams:[
    { id:'ssc-cgl',  name:'SSC CGL',  readiness:67, examDate:'Aug 2026' },
    { id:'upsc-cse', name:'UPSC CSE', readiness:34, examDate:'May 2026' },
    { id:'neet-ug',  name:'NEET UG',  readiness:12, examDate:'May 2026' },
    { id:'ibps-po',  name:'IBPS PO',  readiness:45, examDate:'Jul 2026' },
    { id:'gate-cs',  name:'GATE CS',  readiness:28, examDate:'Feb 2027' },
  ],
  subjects:[
    { name:'Quant',     accuracy:82, trend:'up',   emoji:'📐' },
    { name:'Reasoning', accuracy:90, trend:'up',   emoji:'🧠' },
    { name:'English',   accuracy:68, trend:'down', emoji:'📝' },
    { name:'GK',        accuracy:75, trend:'up',   emoji:'🌏' },
    { name:'Science',   accuracy:55, trend:'down', emoji:'🔬' },
  ],
}

const AuthCtx = createContext({})

export function AuthProvider({ children }) {
  const storedEmail = localStorage.getItem('tryit_email')
  const grant       = checkAdminGrant(storedEmail || '')

  const user = {
    ...MOCK_USER,
    email:   storedEmail || MOCK_USER.email,
    isPro:   !!grant || MOCK_USER.isPro,
    plan:    grant?.plan || 'free',
    grantInfo: grant,
  }

  return (
    <AuthCtx.Provider value={{
      user,
      profile: user,
      loading: false,
      isAuthenticated: true,
      login:  () => {},
      logout: () => { localStorage.removeItem('tryit_email'); window.location.href='/login' },
      sendOTP:       async () => ({ error: null }),
      verifyOTP:     async (email) => {
        localStorage.setItem('tryit_email', email)
        return { user: { ...user, email }, error: null }
      },
      signInWithGoogle: async () => ({ error: null }),
      checkAdminGrant,
    }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
