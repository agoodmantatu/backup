import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function ReferralPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const code = `TRYIT-${user.userId?.slice(-6) || 'AK2026'}`
  const link = `tryiteducations.net/join?ref=${code}`

  const share = () => {
    const msg = `🎓 Study smarter with TryIT Educations!\n1,10,000+ exams · 40+ languages · Real rankings\nUse my code ${code} for extra benefits!\n${link}`
    if (navigator.share) navigator.share({ text: msg })
    else { navigator.clipboard?.writeText(msg); showToast('success','Copied! Share on WhatsApp 🎉') }
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🎁 Refer & Earn</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:24 }}>Invite friends. Earn coins. Together rise faster.</p>

      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:28, marginBottom:20, textAlign:'center', border:'1.5px solid rgba(212,175,55,0.3)' }}>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, marginBottom:8 }}>Your Referral Code</p>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:32, letterSpacing:4 }}>{code}</p>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, marginTop:6, fontFamily:'monospace' }}>{link}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:12, marginBottom:20 }}>
        {[['🎯','You earn','100 coins per signup'],['💰','Friend gets','₹50 off first plan'],['🌟','After 5 referrals','+500 bonus coins']].map(([e,t,v])=>(
          <div key={t} style={{ background:'#fff', borderRadius:18, padding:18, textAlign:'center', border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontSize:28 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginTop:8 }}>{t}</p>
            <p style={{ color:'#D4AF37', fontWeight:700, fontSize:13 }}>{v}</p>
          </div>
        ))}
      </div>

      <button onClick={share} style={{ width:'100%', padding:16, borderRadius:16, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>
        📤 Share on WhatsApp / Instagram →
      </button>
    </AppLayout>
  )
}
