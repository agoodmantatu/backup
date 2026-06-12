import { useState } from 'react'

const CATEGORIES = [
  { id:'support', label:'General Support', email:'support@tryiteducations.net' },
  { id:'billing', label:'Billing & Refunds', email:'billing@tryiteducations.net' },
  { id:'mentor',  label:'Mentor Queries', email:'mentor@tryiteducations.net' },
  { id:'other',   label:'Something Else', email:'hello@tryiteducations.net' },
]

export default function ContactPage() {
  const [cat, setCat] = useState('support')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const category = CATEGORIES.find(c=>c.id===cat)

  const send = () => {
    if (!email || !msg) return
    window.location.href = `mailto:${category.email}?subject=${encodeURIComponent(`[${category.label}] TryIT`)}&body=${encodeURIComponent(`Email: ${email}\n\n${msg}`)}`
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC', padding:'40px 20px' }}>
      <div style={{ maxWidth:520, margin:'0 auto' }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>📩 Contact Us</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>We read every message. Response within 24-48 hours.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:8, marginBottom:16 }}>
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} style={{ padding:'12px 14px', borderRadius:14, border:`1.5px solid ${cat===c.id?'#D4AF37':'#E2E8F0'}`, background:cat===c.id?'rgba(212,175,55,0.06)':'#fff', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:13 }}>{c.label}</button>
          ))}
        </div>
        <div style={{ background:'#fff', borderRadius:22, padding:22, border:'1.5px solid #E2E8F0' }}>
          <input value={email} type="email" placeholder="Your email" onChange={e=>setEmail(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', marginBottom:14 }}/>
          <textarea value={msg} rows={5} placeholder="Your message" onChange={e=>setMsg(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', resize:'none', marginBottom:14 }}/>
          <button onClick={send} disabled={!email||!msg} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:(email&&msg)?'linear-gradient(135deg,#1E3A5F,#0F2140)':'#F1F5F9', color:(email&&msg)?'#D4AF37':'#94A3B8', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, cursor:(email&&msg)?'pointer':'not-allowed' }}>
            📩 Send to {category.email}
          </button>
        </div>
      </div>
    </div>
  )
}
