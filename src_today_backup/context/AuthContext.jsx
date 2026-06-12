import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

function createFreshUser() {
  return {
    id: `local_${Date.now()}`,
    name: '', email: '', role: 'student',
    userId: `TRY-XX-${Math.floor(Math.random()*90000)+10000}-2026`,
    coins: 200, level: 1,
    levelTitle: 'The Fierce One',
    levelEmoji: '🔥',
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
