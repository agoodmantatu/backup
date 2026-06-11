import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const TRANSACTIONS = [
  { id:1, type:'earn',  source:'Completed SSC CGL Mock 4',    coins:+120, date:'Today 10:23',     icon:'📝' },
  { id:2, type:'earn',  source:'7-day Streak Bonus',           coins:+50,  date:'Today 07:00',     icon:'🔥' },
  { id:3, type:'spend', source:'Unlocked Premium Test Pack',   coins:-200, date:'Yesterday 15:40', icon:'🔓' },
  { id:4, type:'earn',  source:'Guru Hub Answer Accepted',     coins:+25,  date:'Yesterday 12:00', icon:'🎓' },
  { id:5, type:'earn',  source:'Focus Mode — 2 sessions',      coins:+50,  date:'2 days ago',       icon:'🎯' },
  { id:6, type:'earn',  source:'Brain Game — Math Blitz Win',  coins:+30,  date:'2 days ago',       icon:'🎮' },
  { id:7, type:'spend', source:'Guru Book — SSC Quant Bible',  coins:-150, date:'3 days ago',       icon:'📚' },
  { id:8, type:'earn',  source:'Daily Quiz Completed',          coins:+15,  date:'3 days ago',       icon:'📅' },
  { id:9, type:'earn',  source:'Referral Bonus — Priya joined',coins:+100, date:'5 days ago',       icon:'🎁' },
]

const COIN_USES = [
  { emoji:'🔓', label:'Unlock Premium Tests',  cost:'100–500 coins' },
  { emoji:'📚', label:'Buy Guru Books',         cost:'50–300 coins'  },
  { emoji:'⚡',  label:'Extra Test Attempts',   cost:'50 coins each' },
  { emoji:'🎨', label:'Unlock ID Card Templates',cost:'200 coins'   },
  { emoji:'💎', label:'Boost your Hall rank',   cost:'150 coins'    },
]

export default function WalletPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [filter, setFilter] = useState('all')
  const filtered = filter==='all' ? TRANSACTIONS : TRANSACTIONS.filter(t=>t.type===filter)
  const totalEarned = TRANSACTIONS.filter(t=>t.type==='earn').reduce((s,t)=>s+t.coins,0)
  const totalSpent  = Math.abs(TRANSACTIONS.filter(t=>t.type==='spend').reduce((s,t)=>s+t.coins,0))

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:20 }}>🪙 My Wallet</h1>

      {/* Coin balance card */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:26, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)', display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
        <div style={{ fontSize:56 }}>🪙</div>
        <div style={{ flex:1 }}>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, fontFamily:'Inter,sans-serif' }}>Total Coins</p>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:48, lineHeight:1 }}>{user?.coins.toLocaleString()}</p>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginTop:4 }}>≈ ₹{(user?.coins * 0.08).toFixed(0)} in exam value</p>
        </div>
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          {[['💚',totalEarned,'Earned'],['❤️',totalSpent,'Spent']].map(([e,v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <p style={{ fontSize:20 }}>{e}</p>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#fff', fontSize:20 }}>{v}</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to earn */}
      <div style={{ background:'#fff', borderRadius:20, padding:18, marginBottom:16, border:'1.5px solid #E2E8F0' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>⚡ How to Earn More Coins</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:8 }}>
          {[['📝','Complete a test','50–150 coins'],['🔥','Daily streak','10–100 coins'],['🎓','Answer doubts','25 coins each'],['🎯','Focus session','25 coins/session'],['🎮','Brain Games','5–50 coins'],['🧭','Career Compass','20 coins']].map(([e,a,c]) => (
            <div key={a} style={{ display:'flex', alignItems:'center', gap:8, background:'#F8FAFC', borderRadius:12, padding:'10px 12px' }}>
              <span style={{ fontSize:18 }}>{e}</span>
              <div>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:12 }}>{a}</p>
                <p style={{ color:'#D4AF37', fontSize:11, fontWeight:700 }}>{c}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spend coins */}
      <div style={{ background:'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))', borderRadius:20, padding:18, marginBottom:16, border:'1.5px solid rgba(212,175,55,0.25)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>🛍️ Spend Your Coins</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {COIN_USES.map(u => (
            <div key={u.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#fff', borderRadius:12, border:'1px solid #E2E8F0' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:22 }}>{u.emoji}</span>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{u.label}</span>
              </div>
              <span style={{ color:'#D4AF37', fontWeight:700, fontSize:12 }}>{u.cost}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F' }}>Transaction History</p>
          <div style={{ display:'flex', gap:6 }}>
            {['all','earn','spend'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer', background: filter===f?'#1E3A5F':'#F1F5F9', color: filter===f?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {filtered.map((t,i) => (
          <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 18px', borderBottom: i<filtered.length-1?'1px solid #F8FAFC':'none' }}>
            <div style={{ width:40, height:40, borderRadius:12, background: t.type==='earn'?'#DCFCE7':'#FEE2E2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{t.icon}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:14 }}>{t.source}</p>
              <p style={{ color:'#94A3B8', fontSize:12 }}>{t.date}</p>
            </div>
            <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color: t.type==='earn'?'#22C55E':'#EF4444' }}>
              {t.type==='earn'?'+':''}{t.coins}
            </span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
