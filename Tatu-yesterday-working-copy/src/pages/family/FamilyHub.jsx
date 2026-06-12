import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const FAMILY_MEMBERS = [
  { id:'m1', name:'Arjun Kumar', role:'You (Admin)', initials:'AK', exam:'SSC CGL', score:78, streak:12, level:'⛏️ Gold Miner', online:true, lastActive:'Now' },
  { id:'m2', name:'Priya Kumar', role:'Sister',      initials:'PK', exam:'NEET UG', score:84, streak:8,  level:'💪 Grinder',   online:true, lastActive:'Now'       },
  { id:'m3', name:'Ravi Kumar',  role:'Brother',     initials:'RK', exam:'JEE Main',score:71, streak:5,  level:'📈 Riser',     online:false,lastActive:'2 hrs ago'  },
  { id:'m4', name:'Mala Kumar',  role:'Mother',      initials:'MK', exam:'CTET',    score:65, streak:3,  level:'🔥 Fierce One',online:false,lastActive:'Yesterday'   },
]

const CHALLENGES = [
  { title:'5-Test Family Week',        progress:12, target:15, reward:'+200 coins each', emoji:'📝', ends:'3 days' },
  { title:'7-Day All-Member Streak',   progress:5,  target:7,  reward:'+150 coins each', emoji:'🔥', ends:'2 days' },
  { title:'Score 75%+ Average',        progress:74, target:75, reward:'+100 coins each', emoji:'📊', ends:'1 week' },
]

export default function FamilyHub() {
  const { showToast } = useToast()
  const [tab, setTab] = useState('members')
  const familyStreak = 5
  const totalTests = 23

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>👨‍👩‍👧 Family Hub</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Study together. Track together. Succeed together.</p>
      </div>

      {/* Family stats banner */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:22, padding:22, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ fontSize:36 }}>👨‍👩‍👧</span>
          <div>
            <p style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:18 }}>Kumar Family</p>
            <p style={{ color:'#D4AF37', fontSize:12 }}>4 members · Family Pro Plan</p>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:10 }}>
          {[['🔥',`${familyStreak}d`,'Family Streak'],['📝',totalTests,'Tests Done'],['🏆','#1,243','Best Rank'],['⭐','3/4','Active Today']].map(([e,v,l]) => (
            <div key={l} style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:'10px 8px', textAlign:'center' }}>
              <p style={{ fontSize:18 }}>{e}</p>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#D4AF37', fontSize:16 }}>{v}</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {[['members','👥 Members'],['challenges','🎯 Challenges'],['invite','➕ Invite']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:'9px 18px', borderRadius:20, border:'none', cursor:'pointer', background: tab===k?'#1E3A5F':'#fff', color: tab===k?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13 }}>{l}</button>
        ))}
      </div>

      {tab === 'members' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {FAMILY_MEMBERS.map(m => (
            <div key={m.id} style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontWeight:900, fontSize:17 }}>{m.initials}</div>
                <div style={{ position:'absolute', bottom:1, right:1, width:12, height:12, borderRadius:'50%', background: m.online?'#22C55E':'#94A3B8', border:'2px solid #fff' }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{m.name}</p>
                  <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>{m.role}</span>
                </div>
                <p style={{ color:'#64748B', fontSize:12, marginTop:2 }}>{m.level} · {m.exam}</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>{m.online ? '🟢 Online now' : `Last seen: ${m.lastActive}`}</p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:20 }}>{m.score}%</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>Avg Score</p>
                <p style={{ color:'#F97316', fontSize:12, fontWeight:600 }}>🔥 {m.streak}d</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'challenges' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {CHALLENGES.map((c,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:20, padding:20, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{c.emoji}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{c.title}</p>
                  <p style={{ color:'#64748B', fontSize:12 }}>Reward: <strong style={{ color:'#22C55E' }}>{c.reward}</strong> · Ends in {c.ends}</p>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1, height:10, background:'#F1F5F9', borderRadius:5 }}>
                  <div style={{ width:`${(c.progress/c.target)*100}%`, height:10, borderRadius:5, background:'linear-gradient(90deg,#D4AF37,#E8C84A)', transition:'width 1s ease' }}/>
                </div>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#D4AF37', fontSize:14, flexShrink:0 }}>{c.progress}/{c.target}</span>
              </div>
            </div>
          ))}
          <div style={{ background:'linear-gradient(135deg,rgba(30,58,95,0.06),rgba(212,175,55,0.04))', borderRadius:18, padding:16, border:'1px solid rgba(212,175,55,0.2)', textAlign:'center' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:4 }}>🏆 Family Leaderboard</p>
            <p style={{ color:'#64748B', fontSize:13 }}>Kumar Family is ranked <strong style={{ color:'#D4AF37' }}>#47</strong> among all TryIT families this week!</p>
          </div>
        </div>
      )}

      {tab === 'invite' && (
        <div style={{ maxWidth:440, margin:'0 auto', textAlign:'center' }}>
          <div style={{ background:'#fff', borderRadius:22, padding:28, border:'1.5px solid #E2E8F0', marginBottom:16 }}>
            <p style={{ fontSize:44, marginBottom:12 }}>📨</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:18, marginBottom:8 }}>Invite a Family Member</p>
            <p style={{ color:'#64748B', fontSize:14, marginBottom:20 }}>Share the invite link. They join your Family Hub automatically. Up to 4 members on Family Pro.</p>
            <div style={{ background:'#F8FAFC', border:'1.5px dashed #D4AF37', borderRadius:14, padding:'12px 16px', marginBottom:16, fontFamily:'monospace', fontSize:14, color:'#1E3A5F', fontWeight:700 }}>
              tryiteducations.net/join/KFAM-2026
            </div>
            <button onClick={() => showToast('success','Invite link copied! Share it on WhatsApp 🎉')}
              style={{ width:'100%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'13px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, color:'#1E3A5F', cursor:'pointer' }}>
              📤 Copy & Share Invite
            </button>
          </div>
          <p style={{ color:'#94A3B8', fontSize:12 }}>Family members get 20% off their individual plan when they join via your link.</p>
        </div>
      )}
    </AppLayout>
  )
}
