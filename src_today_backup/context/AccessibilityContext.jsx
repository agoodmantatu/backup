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
