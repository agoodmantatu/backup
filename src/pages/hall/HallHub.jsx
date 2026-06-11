import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const MY_HALL = {
  id:'hall-001', name:'IIT Chasers', emoji:'⚡',
  members:8, maxMembers:10, streak:14, rank:12,
  score:342, subject:'JEE + UPSC', isLeader:true,
  members_list:[
    { name:'Arjun K.',  initials:'AK', score:82, online:true  },
    { name:'Priya S.',  initials:'PS', score:79, online:true  },
    { name:'Rahul M.',  initials:'RM', score:91, online:false },
    { name:'Zainab A.', initials:'ZA', score:76, online:true  },
    { name:'Meera V.',  initials:'MV', score:68, online:false },
    { name:'Karan T.',  initials:'KT', score:85, online:true  },
    { name:'Deepa R.',  initials:'DR', score:73, online:false },
    { name:'Sanjay Y.', initials:'SY', score:88, online:true  },
  ],
}

const BATTLES = [
  { id:'b1', opponent:'UPSC Warriors',  opEmoji:'🎯', status:'live',
    ourScore:342, theirScore:298, endsIn:'2h 14m',
    subject:'Polity + History' },
  { id:'b2', opponent:'SSC Champions',  opEmoji:'🏆', status:'won',
    ourScore:520, theirScore:481, endsIn:'Ended',
    subject:'Quant + Reasoning' },
  { id:'b3', opponent:'NEET Stars',     opEmoji:'🔬', status:'upcoming',
    ourScore:0,   theirScore:0,   endsIn:'Starts in 6h',
    subject:'Biology + Chemistry' },
]

const TOP_HALLS = [
  { rank:1,  name:'UPSC Warriors',  score:4821, members:10, emoji:'🎯', streak:28 },
  { rank:2,  name:'JEE Legends',    score:4590, members:10, emoji:'🔬', streak:21 },
  { rank:3,  name:'SSC Champions',  score:4210, members:9,  emoji:'🏆', streak:19 },
  { rank:4,  name:'Banking Pros',   score:3980, members:10, emoji:'💼', streak:15 },
  { rank:5,  name:'NEET Stars',     score:3740, members:8,  emoji:'⚕️', streak:12 },
  { rank:12, name:'IIT Chasers',    score:3420, members:8,  emoji:'⚡', streak:14, isMe:true },
]

export default function HallHub() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [tab, setTab] = useState('my-hall')

  return (
    <AppLayout>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>👥 The Hall</h1>
          <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Study together. Battle rivals. Rise together.</p>
        </div>
        <button onClick={() => navigate('/hall/create')}
          style={{ background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'11px 22px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, color:'#1E3A5F', cursor:'pointer' }}>
          + Create Hall
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {[['my-hall','⚡ My Hall'],['battles','⚔️ Battles'],['leaderboard','🏆 Rankings']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding:'10px 20px', borderRadius:20, border:'none', cursor:'pointer',
            background: tab===k ? '#1E3A5F' : '#fff',
            color: tab===k ? '#fff' : '#64748B',
            fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13,
            boxShadow: tab===k ? '0 4px 14px rgba(30,58,95,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}>{l}</button>
        ))}
      </div>

      {/* MY HALL */}
      {tab === 'my-hall' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap:16 }}>
          {/* Hall card */}
          <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:22, border:'1.5px solid rgba(212,175,55,0.3)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
              <div style={{ width:56, height:56, borderRadius:18, background:'rgba(212,175,55,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>
                {MY_HALL.emoji}
              </div>
              <div>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#fff', fontSize:18 }}>{MY_HALL.name}</p>
                <p style={{ color:'#D4AF37', fontSize:12, marginTop:2 }}>Rank #{MY_HALL.rank} India · {MY_HALL.subject}</p>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:16 }}>
              {[['👥',`${MY_HALL.members}/${MY_HALL.maxMembers}`,'Members'],['🔥',`${MY_HALL.streak}d`,'Streak'],['🏆',`#${MY_HALL.rank}`,'Rank']].map(([e,v,l]) => (
                <div key={l} style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:'10px 8px', textAlign:'center' }}>
                  <p style={{ fontSize:18 }}>{e}</p>
                  <p style={{ color:'#D4AF37', fontWeight:800, fontFamily:'Poppins,sans-serif', fontSize:15 }}>{v}</p>
                  <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
                </div>
              ))}
            </div>
            <button onClick={() => showToast('success','Invited to Hall!')}
              style={{ width:'100%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:12, padding:'11px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, color:'#1E3A5F', cursor:'pointer' }}>
              📤 Invite Member (Code: ITC-2026)
            </button>
          </div>

          {/* Members */}
          <div style={{ background:'#fff', borderRadius:24, padding:20, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:14 }}>Hall Members</p>
            {MY_HALL.members_list.map((m,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom: i<MY_HALL.members_list.length-1 ? '1px solid #F8FAFC' : 'none' }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontWeight:800, fontSize:12 }}>{m.initials}</div>
                  <div style={{ position:'absolute', bottom:0, right:0, width:9, height:9, borderRadius:'50%', background: m.online ? '#22C55E' : '#94A3B8', border:'2px solid #fff' }}/>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{m.name}</p>
                  <p style={{ color:'#94A3B8', fontSize:11 }}>{m.online ? 'Online now' : 'Offline'}</p>
                </div>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#D4AF37', fontSize:14 }}>{m.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BATTLES */}
      {tab === 'battles' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {BATTLES.map(b => (
            <div key={b.id} style={{ background:'#fff', borderRadius:22, padding:20, border:`1.5px solid ${b.status==='live'?'#EF4444':b.status==='won'?'#22C55E':'#E2E8F0'}`, boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ background: b.status==='live'?'#FEE2E2':b.status==='won'?'#DCFCE7':'#F1F5F9', color: b.status==='live'?'#991B1B':b.status==='won'?'#15803D':'#64748B', fontSize:11, fontWeight:800, padding:'4px 12px', borderRadius:20, letterSpacing:'1px' }}>
                    {b.status==='live'?'🔴 LIVE':b.status==='won'?'✅ WON':'⏳ UPCOMING'}
                  </span>
                  <span style={{ color:'#94A3B8', fontSize:12 }}>{b.subject}</span>
                </div>
                <span style={{ color:'#64748B', fontSize:12 }}>{b.endsIn}</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:16, alignItems:'center' }}>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:28 }}>⚡</p>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>IIT Chasers</p>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:28 }}>{b.ourScore}</p>
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#94A3B8', fontSize:18 }}>VS</p>
                  {b.status==='live' && (
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'#EF4444', margin:'6px auto', animation:'pulse 1s infinite' }}/>
                  )}
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:28 }}>{b.opEmoji}</p>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{b.opponent}</p>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#64748B', fontSize:28 }}>{b.theirScore}</p>
                </div>
              </div>
              {b.status === 'live' && (
                <button onClick={() => navigate('/test-engine')} style={{ width:'100%', marginTop:14, background:'linear-gradient(135deg,#EF4444,#DC2626)', border:'none', borderRadius:12, padding:'11px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, color:'#fff', cursor:'pointer' }}>
                  ⚔️ Answer Questions — Help Your Hall Win!
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* LEADERBOARD */}
      {tab === 'leaderboard' && (
        <div style={{ background:'#fff', borderRadius:22, overflow:'hidden', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ background:'#1E3A5F', padding:'12px 20px', display:'grid', gridTemplateColumns:'44px 1fr 80px 80px 60px', gap:8 }}>
            {['','Hall','Members','Streak','Score'].map(h => (
              <span key={h} style={{ color:'#D4AF37', fontSize:11, fontWeight:700 }}>{h}</span>
            ))}
          </div>
          {TOP_HALLS.map((h,i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'44px 1fr 80px 80px 60px', gap:8, padding:'13px 20px', borderBottom:'1px solid #F8FAFC', alignItems:'center', background: h.isMe ? 'rgba(212,175,55,0.07)' : '#fff', borderLeft: h.isMe ? '3px solid #D4AF37' : 'none' }}>
              <span style={{ fontWeight:900, color: i===0?'#D4AF37':i===1?'#9CA3AF':i===2?'#CD7F32':'#64748B', fontSize: i<3?18:14 }}>
                {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${h.rank}`}
              </span>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:18 }}>{h.emoji}</span>
                <div>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{h.name}</p>
                  {h.isMe && <span style={{ background:'#D4AF37', color:'#1E3A5F', fontSize:9, fontWeight:800, padding:'1px 6px', borderRadius:20 }}>YOUR HALL</span>}
                </div>
              </div>
              <span style={{ color:'#64748B', fontSize:13 }}>{h.members}/10</span>
              <span style={{ color:'#F97316', fontSize:13, fontWeight:600 }}>🔥 {h.streak}d</span>
              <span style={{ color:'#D4AF37', fontWeight:800, fontFamily:'Poppins,sans-serif', fontSize:14 }}>{h.score}</span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
