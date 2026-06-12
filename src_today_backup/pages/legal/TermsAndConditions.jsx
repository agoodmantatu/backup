import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SECTIONS = [
  { id:'general', title:'General', emoji:'📋', p:'TryIT Educations (tryiteducations.net) serves students from Class 6 to PhD/professional exams in 40+ Indian languages. By using TryIT you agree to these terms. Users under 13 need parental consent.' },
  { id:'student', title:'Student Terms', emoji:'🎓', p:'Coins are earned through genuine test performance and deducted when scoring below cutoff — this is a discipline mechanism. Free tier: 50 questions/day, 3 mock tests/day, 3 full-language explanations/day. Test integrity is required; honeypot questions detect cheating.' },
  { id:'mentor', title:'Mentor Terms', emoji:'🧑‍🏫', p:'Mentors must provide accurate credentials. Accepted answers earn ₹15-50. Payouts every Monday via UPI, 1-month qualification window before first payout. False credentials = removal + forfeiture.' },
  { id:'institution', title:'Institution Terms', emoji:'🏫', p:'Institutions must be verified before full access. Uploaded questions are reviewed before going live. Payouts calculated weekly based on student engagement, transferred Mondays.' },
  { id:'equity', title:'Free Access Tiers', emoji:'🤝', p:'Hope Scholars, Divyang (UDID verified), Swachhta Warriors, Veer Nari families, Transgender Youth, Active Military, ASHA/Anganwadi Workers, and First-Generation Learners receive free Pro access for life upon document verification (within 7 days).' },
  { id:'privacy', title:'Privacy & Data', emoji:'🔒', p:'We store email, performance data, and coin transactions. Test scores are private. Public leaderboard shows first name, state, exam, score, rank only — never email or full details. Data encrypted (AES-256). Request deletion at support@tryiteducations.net.' },
  { id:'payments', title:'Payments & Refunds', emoji:'💳', p:'Processed via Razorpay (UPI/Cards/Net Banking). ₹19 Trial Pass is one-time, does not auto-renew. Subscriptions: 7-day refund window if fewer than 2 mock tests completed. Coin packs are non-refundable once credited.' },
]

export default function TermsAndConditions() {
  const navigate = useNavigate()
  const [active, setActive] = useState('general')
  const section = SECTIONS.find(s=>s.id===active)

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC' }}>
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', padding:'24px clamp(20px,5vw,60px)' }}>
        <button onClick={()=>navigate(-1)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:14, marginBottom:12 }}>← Back</button>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#fff', fontSize:28 }}>Terms & Conditions</h1>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>Last updated: June 2026</p>
      </div>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px clamp(16px,4vw,40px)', display:'flex', gap:20, flexWrap:'wrap' }}>
        <div style={{ width:200, flexShrink:0 }}>
          <div style={{ background:'#fff', borderRadius:18, padding:10, border:'1.5px solid #E2E8F0' }}>
            {SECTIONS.map(s=>(
              <button key={s.id} onClick={()=>setActive(s.id)} style={{ width:'100%', display:'flex', gap:8, padding:'9px 10px', borderRadius:10, border:'none', cursor:'pointer', background:active===s.id?'#1E3A5F':'transparent', color:active===s.id?'#D4AF37':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13, textAlign:'left', marginBottom:3 }}>
                {s.emoji} {s.title}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex:1, minWidth:280, background:'#fff', borderRadius:22, padding:'24px 26px', border:'1.5px solid #E2E8F0' }}>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:20, marginBottom:14 }}>{section.emoji} {section.title}</h2>
          <p style={{ color:'#475569', fontSize:14, lineHeight:1.9 }}>{section.p}</p>
        </div>
      </div>
    </div>
  )
}
