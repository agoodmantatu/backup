// src/pages/mentor/MentorAnalytics.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function MentorAnalytics() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const METRICS = [
    {label:'Avg Response Time', val:'42 min', target:'< 60 min', ok:true, icon:'⚡'},
    {label:'Answer Quality Score', val:'87%', target:'> 80%', ok:true, icon:'⭐'},
    {label:'Student Retention', val:'91%', target:'> 85%', ok:true, icon:'🔄'},
    {label:'Doubt Resolution Rate', val:'94%', target:'> 90%', ok:true, icon:'✅'},
    {label:'Avg Rating', val:'4.8 / 5', target:'> 4.5', ok:true, icon:'🏆'},
    {label:'Monthly Active Students', val:'12', target:'Growing', ok:true, icon:'👥'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>📊 My Analytics</h1>
      </div>
      <div style={{padding:'20px',maxWidth:700,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
          {METRICS.map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:16,
              padding:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
              <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
              <p style={{color:t,fontWeight:800,fontSize:16,margin:'0 0 2px'}}>{s.val}</p>
              <p style={{color:m,fontSize:11,margin:'0 0 6px'}}>{s.label}</p>
              <span style={{background:s.ok?'#22C55E15':'#EF444415',
                color:s.ok?'#22C55E':'#EF4444',
                fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                Target: {s.target}
              </span>
            </div>
          ))}
        </div>
        <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
          borderRadius:18,padding:'20px',textAlign:'center'}}>
          <p style={{color:a,fontWeight:700,fontSize:11,letterSpacing:'1px',margin:'0 0 6px'}}>
            YOUR MENTOR SCORE
          </p>
          <p style={{color:'#fff',fontWeight:900,fontSize:48,margin:'0 0 4px'}}>91</p>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,margin:0}}>
            Top 8% of all mentors on TryIT
          </p>
        </div>
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
