// src/context/ThemeContext.jsx
// Applies CSS vars to :root AND body background so themes
// are visually apparent even on pages with hardcoded Tailwind colors
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  THEMES, THEME_LIST,
  isThemeUnlocked as checkUnlocked,
  getUnlockLevel,
} from '../lib/themes'

const ThemeContext = createContext({
  activeTheme: 'cosmic-default',
  setActiveTheme: () => {},
  theme: null,
  themes: [],
  isThemeUnlocked: () => true,
  applyTheme: () => {},
})

const STORAGE_KEY = 'tryit_active_theme'
const DEFAULT = 'cosmic-default'

function applyThemeVars(themeId) {
  const t = THEMES[themeId] ?? THEMES[DEFAULT]
  if (!t) return
  const root = document.documentElement
  root.style.setProperty('--color-navy',      t.navy      || '#1E3A5F')
  root.style.setProperty('--color-navy-dark', t.navyDark  || '#0F2140')
  root.style.setProperty('--color-gold',      t.gold      || '#D4AF37')
  root.style.setProperty('--color-gold-light',t.goldLight || '#E8C84A')
  root.style.setProperty('--color-bg',        t.bg        || '#F8FAFC')
  root.style.setProperty('--color-surface',   t.surface   || '#FFFFFF')
  root.style.setProperty('--color-text',      t.text      || '#1E3A5F')
  root.style.setProperty('--color-muted',     t.muted     || '#64748B')
  if (t.accent2) root.style.setProperty('--color-accent2', t.accent2)
  // Also set body background so ALL pages visually change
  document.body.style.background = t.bg || '#F8FAFC'
  document.body.style.color = t.text || '#1E3A5F'
}

export function ThemeProvider({ children, userLevel = 1 }) {
  const [activeTheme, setActiveThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && THEMES[saved]) return saved
    } catch {}
    return DEFAULT
  })

  const theme = THEMES[activeTheme] ?? THEMES[DEFAULT]

  useEffect(() => {
    applyThemeVars(activeTheme)
  }, [activeTheme])

  // Apply on mount
  useEffect(() => {
    applyThemeVars(activeTheme)
  }, [])

  const isThemeUnlocked = useCallback(
    (id) => checkUnlocked(id, userLevel), [userLevel]
  )

  const setActiveTheme = useCallback((id) => {
    if (!THEMES[id]) {
      console.warn(`Unknown theme: ${id}`)
      return
    }
    if (!checkUnlocked(id, userLevel)) {
      console.warn(`Theme "${id}" locked — needs level ${getUnlockLevel(id)}`)
      return
    }
    setActiveThemeState(id)
    try { localStorage.setItem(STORAGE_KEY, id) } catch {}
  }, [userLevel])

  return (
    <ThemeContext.Provider value={{
      activeTheme,
      setActiveTheme,
      theme,
      themes: THEME_LIST,
      isThemeUnlocked,
      applyTheme: applyThemeVars,
      userLevel,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

export default ThemeContext
