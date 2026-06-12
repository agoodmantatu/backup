import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const CATEGORIES = ['All','National','International','Economy','Science','Sports','Awards','Environment']

const NEWS = [
  { id:1, cat:'National', emoji:'🇮🇳', title:'India Signs Free Trade Agreement with UK', date:'Jun 10, 2026', tags:['UPSC','SSC','IBPS'], preview:"India and the United Kingdom formally signed a comprehensive Free Trade Agreement after 3 years of negotiations, covering goods, services, and digital trade.", important:true },
  { id:2, cat:'Economy', emoji:'💰', title:'RBI Keeps Repo Rate Unchanged at 6.25%', date:'Jun 9, 2026', tags:['IBPS','RBI','Banking'], preview:"The Reserve Bank of India's MPC voted 4-2 to keep the repo rate steady, citing balanced inflation risks and support for growth.", important:true },
  { id:3, cat:'Science', emoji:'🚀', title:'ISRO Successfully Launches NISAR Satellite', date:'Jun 8, 2026', tags:['UPSC','SSC'], preview:"ISRO and NASA jointly launched the NISAR earth observation satellite, the world's most expensive Earth imaging satellite at $1.5 billion.", important:true },
  { id:4, cat:'Sports', emoji:'🏏', title:'India Wins T20 World Cup 2026', date:'Jun 7, 2026', tags:['GK','All Exams'], preview:"India defeated South Africa by 7 wickets in the ICC T20 World Cup final held in the West Indies, clinching their second T20 World Cup.", important:false },
  { id:5, cat:'Awards', emoji:'🏆', title:'Dr. Pankaj Advani Receives Padma Bhushan', date:'Jun 6, 2026', tags:['UPSC','SSC'], preview:"Billiards and snooker legend Dr. Pankaj Advani has been awarded the Padma Bhushan for his outstanding contribution to Indian sports.", important:false },
  { id:6, cat:'Environment', emoji:'🌍', title:'India Achieves 200 GW Solar Capacity Target', date:'Jun 5, 2026', tags:['UPSC','SSC','Environment'], preview:"India has achieved its ambitious 200 GW solar power capacity target, cementing its position as the third largest solar market globally.", important:true },
  { id:7, cat:'International', emoji:'🌐', title:"India Joins G7 as Permanent Observer", date:'Jun 4, 2026', tags:['UPSC','IR'], preview:"India has been granted permanent observer status at the G7, marking a significant elevation of India's global diplomatic standing.", important:true },
  { id:8, cat:'Economy', emoji:'📊', title:'India GDP Growth at 7.2% for FY26', date:'Jun 3, 2026', tags:['UPSC','IBPS','Economy'], preview:"India's GDP grew by 7.2% in FY2025-26, making it the fastest-growing major economy for the third consecutive year.", important:true },
]

export default function CurrentAffairs() {
  const { showToast } = useToast()
  const [cat, setCat] = useState('All')
  const [saved, setSaved] = useState(new Set())
  const [expanded, setExpanded] = useState(null)

  const filtered = cat==='All' ? NEWS : NEWS.filter(n=>n.cat===cat)

  const save = (id) => {
    setSaved(p => {
      const n = new Set(p)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
    showToast('success', saved.has(id) ? 'Removed from saved' : '🔖 Saved for revision!')
  }

  return (
    <AppLayout>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>📰 Current Affairs</h1>
          <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Daily updates · Exam-tagged · One-line summaries</p>
        </div>
        <button onClick={() => showToast('success','Opening Daily Quiz...')}
          style={{ background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'11px 22px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, color:'#1E3A5F', cursor:'pointer' }}>
          🎯 Daily Quiz +50 coins
        </button>
      </div>

      {/* Date badge */}
      <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(30,58,95,0.06)', border:'1px solid rgba(30,58,95,0.15)', borderRadius:20, padding:'6px 14px', marginBottom:16 }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:'#22C55E', display:'inline-block' }}/>
        <span style={{ color:'#1E3A5F', fontSize:12, fontWeight:700, fontFamily:'Poppins,sans-serif' }}>June 10, 2026 — Today's Edition</span>
      </div>

      {/* Category filter */}
      <div style={{ display:'flex', gap:8, marginBottom:20, overflowX:'auto', paddingBottom:4 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding:'8px 16px', borderRadius:20, border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, background: cat===c?'#1E3A5F':'#fff', color: cat===c?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>{c}</button>
        ))}
      </div>

      {/* News cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.map(n => (
          <div key={n.id} style={{ background:'#fff', borderRadius:20, border:`1.5px solid ${n.important?'rgba(212,175,55,0.3)':'#E2E8F0'}`, boxShadow:'0 2px 10px rgba(0,0,0,0.04)', overflow:'hidden' }}>
            <div style={{ padding:'16px 18px', cursor:'pointer' }} onClick={() => setExpanded(expanded===n.id?null:n.id)}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <span style={{ fontSize:26, flexShrink:0 }}>{n.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:6 }}>
                    <span style={{ background:'rgba(30,58,95,0.08)', color:'#1E3A5F', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>{n.cat}</span>
                    {n.important && <span style={{ background:'#FEF3C7', color:'#92400E', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>⭐ Important</span>}
                    <span style={{ color:'#94A3B8', fontSize:11, marginLeft:'auto' }}>{n.date}</span>
                  </div>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E293B', fontSize:15, marginBottom:8, lineHeight:1.4 }}>{n.title}</p>
                  {expanded === n.id && (
                    <p style={{ color:'#475569', fontSize:13, lineHeight:1.7, marginBottom:10 }}>{n.preview}</p>
                  )}
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {n.tags.map(t => (
                      <span key={t} style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); save(n.id) }}
                  style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color: saved.has(n.id)?'#D4AF37':'#CBD5E1', flexShrink:0 }}>
                  {saved.has(n.id)?'★':'☆'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
