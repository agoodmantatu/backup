import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const code = localStorage.getItem('tryit_referral_code') || 'TRYIT-FRIEND-2026'

  const copy = () => {
    navigator.clipboard?.writeText(`https://tryiteducations.net/login?ref=${code}`)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🎁 Refer & Earn</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>Earn 100 coins for every friend who joins using your link.</p>

      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:22, padding:24, border:'1.5px solid rgba(212,175,55,0.2)', textAlign:'center', marginBottom:16 }}>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:12, marginBottom:8 }}>YOUR REFERRAL CODE</p>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:24, marginBottom:14, letterSpacing:'2px' }}>{code}</p>
        <button onClick={copy} style={{ padding:'12px 28px', borderRadius:14, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C44A)', color:'#1E3A5F', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>
          {copied?'✅ Copied!':'📋 Copy Link'}
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10 }}>
        {[['👥','0','Friends Joined'],['🪙','0','Coins Earned']].map(([e,v,l])=>(
          <div key={l} style={{ background:'#fff', borderRadius:16, padding:14, textAlign:'center', border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontSize:22 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:20 }}>{v}</p>
            <p style={{ color:'#94A3B8', fontSize:11 }}>{l}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
