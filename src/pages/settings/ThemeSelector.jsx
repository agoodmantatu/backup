// FILE: src/pages/settings/ThemeSelector.jsx
import AppLayout from '../../components/layout/AppLayout'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeSelector() {
  const { activeTheme, setActiveTheme, themes } = useTheme()

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🎨 Themes</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>Pick a look that feels like yours. Changes apply instantly across the app.</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
        {themes.map(t => (
          <button key={t.id} onClick={()=>setActiveTheme(t.id)}
            style={{ textAlign:'left', borderRadius:20, padding:18, cursor:'pointer',
              border: activeTheme===t.id ? `2px solid ${t.gold}` : '1.5px solid #E2E8F0',
              background: t.surface }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <span style={{ fontSize:24 }}>{t.emoji}</span>
              {activeTheme===t.id && <span style={{ color:t.gold, fontWeight:800, fontSize:13 }}>✓ Active</span>}
            </div>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:t.text, fontSize:15, marginBottom:10 }}>{t.name}</p>
            <div style={{ display:'flex', gap:6 }}>
              {[t.navy, t.gold, t.bg, t.surface].map((c,i)=>(
                <div key={i} style={{ width:28, height:28, borderRadius:8, background:c, border:'1px solid rgba(0,0,0,0.08)' }}/>
              ))}
            </div>
          </button>
        ))}
      </div>
    </AppLayout>
  )
}
