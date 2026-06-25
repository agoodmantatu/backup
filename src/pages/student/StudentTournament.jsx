// src/pages/student/StudentTournament.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function StudentTournament() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark  = theme?.isDark ?? false
  const accent  = theme?.accent ?? '#C9A84C'
  const accentL = theme?.accentLight ?? '#E8C44A'
  const primD   = theme?.primaryDark ?? '#0F2140'
  const primary = theme?.primary ?? '#1E3A5F'
  const txt     = isDark ? '#F8FAFC' : '#0F1020'
  const muted   = isDark ? 'rgba(255,255,255,0.55)' : '#64748B'
  const card    = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff'
  const bdr     = isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'
  const bg      = isDark
    ? `radial-gradient(ellipse 80% 50% at 20% 0%,${primary}25,transparent),${primD}`
    : '#F0F4F8'

  return (
    <div style={{ minHeight:'100vh', background:bg, fontFamily:'Inter,sans-serif' }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', gap:14, padding:'16px 24px',
        background:isDark?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.9)',
        backdropFilter:'blur(20px)', borderBottom:`1px solid ${bdr}`,
        position:'sticky', top:0, zIndex:100,
      }}>
        <button onClick={()=>navigate('/student')} style={{
          background:card, border:`1px solid ${bdr}`, borderRadius:10,
          width:38, height:38, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:18, color:txt }}>←</button>
        <div>
          <p style={{ color:txt, fontFamily:'Poppins,sans-serif',
            fontWeight:800, fontSize:18, margin:0 }}>
            🏟️ Tournaments
          </p>
          <p style={{ color:muted, fontSize:11, margin:0 }}>Live competitive tests with prizes</p>
        </div>
      </div>

      {/* Coming soon content */}
      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', minHeight:'70vh', padding:'24px', textAlign:'center'
      }}>
        <div style={{
          background:card, border:`1px solid ${accent}25`,
          borderRadius:24, padding:'40px 32px', maxWidth:400,
          boxShadow:`0 8px 32px ${accent}12`
        }}>
          <p style={{ fontSize:56, margin:'0 0 16px' }}>🏟️</p>
          <p style={{ color:txt, fontFamily:'Poppins,sans-serif',
            fontWeight:800, fontSize:22, margin:'0 0 8px' }}>
            Tournaments
          </p>
          <p style={{ color:muted, fontSize:14, margin:'0 0 24px', lineHeight:1.7 }}>
            Live competitive tests with prizes.<br/>This section is being built and will be live soon.
          </p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={()=>navigate('/student')} style={{
              background:`linear-gradient(135deg,${accent},${accentL})`,
              border:'none', borderRadius:12, padding:'12px 24px',
              color:primD, fontWeight:800, fontSize:14, cursor:'pointer',
              boxShadow:`0 4px 16px ${accent}44`
            }}>← Back to Dashboard</button>
            <button onClick={()=>navigate('/student/settings')} style={{
              background:'transparent', border:`1px solid ${bdr}`,
              borderRadius:12, padding:'12px 20px',
              color:muted, fontSize:13, cursor:'pointer'
            }}>Settings ⚙️</button>
          </div>
        </div>
      </div>
    </div>
  )
}
