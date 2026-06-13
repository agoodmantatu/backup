// FILE: src/components/ThemeSwitcher.jsx
// Compact theme-picker dropdown. Drop this anywhere — Navbar
// (landing), Topbar (in-app dashboards). Shows current theme's
// emoji as a button; click opens a grid of all 25 themes.
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeSwitcher({ dark = false }) {
  const { activeTheme, setActiveTheme, themes, theme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  if (!theme) return null // ThemeProvider not ready yet

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={()=>setOpen(p=>!p)} title="Change theme"
        style={{
          display:'flex', alignItems:'center', gap:6,
          background: dark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
          border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E2E8F0',
          borderRadius:20, padding:'7px 12px', cursor:'pointer',
          color: dark ? '#fff' : '#1E3A5F', fontSize:13, fontWeight:600,
          fontFamily:'Inter,sans-serif',
        }}>
        <span style={{ fontSize:15 }}>{theme.emoji}</span>
        <span style={{ display:'none' }} className="theme-label">{theme.name}</span>
        <span style={{ fontSize:10 }}>▾</span>
      </button>

      {open && (
        <div style={{
          position:'absolute', top:'calc(100% + 8px)', right:0, zIndex:1000,
          background:'#fff', borderRadius:16, padding:12, width:280,
          boxShadow:'0 12px 40px rgba(0,0,0,0.18)', border:'1px solid #E2E8F0',
          maxHeight:360, overflowY:'auto',
        }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F',
            fontSize:13, marginBottom:8, padding:'0 4px' }}>🎨 Choose a theme</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
            {themes.map(t=>(
              <button key={t.id} onClick={()=>{ setActiveTheme(t.id); setOpen(false) }}
                style={{
                  display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
                  borderRadius:10, cursor:'pointer', textAlign:'left',
                  border: activeTheme===t.id ? `1.5px solid ${t.gold}` : '1px solid transparent',
                  background: activeTheme===t.id ? `${t.gold}15` : '#F8FAFC',
                }}>
                <span style={{ fontSize:16 }}>{t.emoji}</span>
                <span style={{ fontSize:11, fontWeight:600, color:'#475569', lineHeight:1.3 }}>{t.name}</span>
              </button>
            ))}
          </div>
          <a href="/settings/themes" style={{ display:'block', textAlign:'center', marginTop:10,
            fontSize:12, color:'#94A3B8', textDecoration:'underline' }}>
            More options & custom theme →
          </a>
        </div>
      )}
    </div>
  )
}

