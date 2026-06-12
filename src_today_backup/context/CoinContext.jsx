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
