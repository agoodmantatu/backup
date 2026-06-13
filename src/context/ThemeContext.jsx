// FILE: src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { applyTheme, THEMES, THEME_LIST } from '../lib/themes'

const ThemeCtx = createContext({})

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveThemeState] = useState(
    () => localStorage.getItem('tryit_theme') || 'classic-navy'
  )

  useEffect(() => {
    applyTheme(activeTheme)
    localStorage.setItem('tryit_theme', activeTheme)
  }, [activeTheme])

  const setActiveTheme = (id) => {
    if (THEMES[id]) setActiveThemeState(id)
  }

  return (
    <ThemeCtx.Provider value={{ activeTheme, setActiveTheme, theme: THEMES[activeTheme], themes: THEME_LIST }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
