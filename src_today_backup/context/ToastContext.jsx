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
