import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

export default function MentorHub() {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🧑‍🏫 Mentor Hub</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:24 }}>Teach. Earn. Become a Pan-India Guru.</p>

      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:24, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:14 }}>
        {[['🎓',user?.guruPoints,'Guru Points'],['💰','₹347','This Week'],['⭐','4.9','Rating'],['📝','47','Answers']].map(([e,v,l])=>(
          <div key={l} style={{ textAlign:'center' }}>
            <p style={{ fontSize:24 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:20 }}>{v}</p>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap:12 }}>
        {[
          { emoji:'🎓', title:'Answer Doubts',  desc:'Students are waiting. Earn ₹15–50 per accepted answer.', path:'/guru-hub',              btn:'Go to Guru Hub' },
          { emoji:'📚', title:'Publish a Book',  desc:'Upload your notes as a Guru Book. Earn 85% of every sale.', path:'/ebooks/upload',    btn:'Upload Book' },
          { emoji:'🎟️', title:'My Coupons',     desc:'Generate referral coupons. Earn on every new student.', path:'/mentor-hub/coupons',      btn:'Manage Coupons' },
          { emoji:'💸', title:'Cashback Center', desc:'View earnings. Withdraw to UPI every Monday.', path:'/mentor-hub/cashback',             btn:'View Earnings' },
        ].map(s=>(
          <div key={s.title} style={{ background:'#fff', borderRadius:20, padding:20, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize:30, display:'block', marginBottom:10 }}>{s.emoji}</span>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15, marginBottom:6 }}>{s.title}</p>
            <p style={{ color:'#64748B', fontSize:13, marginBottom:14 }}>{s.desc}</p>
            <button onClick={()=>navigate(s.path)} style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', border:'none', borderRadius:12, padding:'9px 18px', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer' }}>{s.btn} →</button>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
