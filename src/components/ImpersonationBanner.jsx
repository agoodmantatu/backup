// FILE: src/components/ImpersonationBanner.jsx
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ImpersonationBanner() {
  const { isImpersonating, exitImpersonation, user } = useAuth()
  const navigate = useNavigate()

  if (!isImpersonating?.()) return null

  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, zIndex:10000,
      background:'linear-gradient(90deg,#7C2D12,#9A3412)', color:'#FEF3C7',
      padding:'8px 16px', display:'flex', alignItems:'center', justifyContent:'center',
      gap:12, fontSize:13, fontFamily:'Poppins,sans-serif', fontWeight:700,
      flexWrap:'wrap',
    }}>
      <span>👁️ ADMIN VIEW-AS MODE - Viewing as <b>{user?.role}</b></span>
      <button onClick={()=>{ exitImpersonation(); navigate('/admin/dashboard') }}
        style={{ background:'#FEF3C7', color:'#7C2D12', border:'none', borderRadius:8, padding:'4px 14px', fontWeight:800, cursor:'pointer', fontSize:12 }}>
        Exit to Admin
      </button>
    </div>
  )
}

