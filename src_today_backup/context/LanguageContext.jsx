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
