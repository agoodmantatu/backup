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

// ── Added: alias for pages expecting useEquity ────────────────────
export function useEquity() {
  return useEquityTier()
}
