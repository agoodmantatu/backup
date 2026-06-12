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
