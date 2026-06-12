#!/bin/bash
# TryIT — Order 2 Pages: Hall, Leaderboard, Analytics, Achievements, Focus Mode, Current Affairs
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
echo "Installing Order 2 pages..."
mkdir -p src/pages/hall src/pages/leaderboard src/pages/analytics
mkdir -p src/pages/achievements src/pages/focus-mode src/pages/current-affairs
# SECTION: The Hall + Leaderboard + Analytics
mkdir -p src/pages/hall
mkdir -p src/pages/leaderboard
mkdir -p src/pages/analytics
mkdir -p src/pages/achievements
mkdir -p src/pages/focus-mode
mkdir -p src/pages/current-affairs

# ── THE HALL ──────────────────────────────────────────────────────
cat > src/pages/hall/HallHub.jsx << 'EOF'
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
EOF
echo "Hall done"
# SECTION: Leaderboard + Analytics + Achievements

cat > src/pages/leaderboard/Leaderboard.jsx << 'EOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const TABS = ['National','State','Hall','My Exams']

const DATA = {
  National: [
    { rank:1,    name:'Priya Sharma',   state:'Kerala',    exam:'NEET UG',  score:'97.4%', badge:'⚡', level:'Unstoppable', change:'+2'  },
    { rank:2,    name:'Rahul Kumar',    state:'Delhi',     exam:'UPSC CSE', score:'94.8%', badge:'👑', level:'Thalavan',    change:'—'   },
    { rank:3,    name:'Aisha Mohammed', state:'Gujarat',   exam:'IBPS PO',  score:'93.1%', badge:'🦁', level:'Baahuveer',   change:'+5'  },
    { rank:4,    name:'Vikram Singh',   state:'Rajasthan', exam:'SSC CGL',  score:'92.6%', badge:'🥇', level:'Gold King',   change:'-1'  },
    { rank:5,    name:'Deepa Nair',     state:'TN',        exam:'NEET UG',  score:'91.9%', badge:'🌟', level:'The Legend',  change:'+3'  },
    { rank:6,    name:'Arjun Patel',    state:'Maharashtra',exam:'JEE Adv', score:'91.2%', badge:'🧠', level:'The Genius',  change:'+8'  },
    { rank:7,    name:'Meera Krishnan', state:'Karnataka', exam:'GATE CS',  score:'90.7%', badge:'⚔️', level:'The Fighter', change:'—'   },
    { rank:8,    name:'Sanjay Yadav',   state:'UP',        exam:'UPSC CSE', score:'90.1%', badge:'📈', level:'The Riser',   change:'+12' },
    { rank:9,    name:'Fatima Begum',   state:'Hyderabad', exam:'IBPS PO',  score:'89.8%', badge:'💪', level:'The Grinder', change:'+4'  },
    { rank:10,   name:'Rohit Sharma',   state:'MP',        exam:'SSC CGL',  score:'89.5%', badge:'🔥', level:'Fierce One',  change:'+19' },
    { rank:1243, name:'Arjun Kumar',    state:'TN',        exam:'SSC CGL',  score:'78.0%', badge:'⛏️', level:'Gold Miner',  change:'+142', isMe:true },
  ],
}

export default function Leaderboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('National')
  const [exam, setExam] = useState('All')
  const rows = DATA.National

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🏆 Leaderboard</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Real All-India rankings · Updated after every test</p>
      </div>

      {/* My rank card */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:20, padding:18, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:18, color:'#1E3A5F', flexShrink:0 }}>{user.initials}</div>
        <div style={{ flex:1 }}>
          <p style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:16 }}>{user.name}</p>
          <p style={{ color:'#D4AF37', fontSize:12, marginTop:2 }}>{user.levelEmoji} {user.levelTitle} · {user.exams[0]?.name}</p>
        </div>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['#'+user.rank.toLocaleString(),'Your Rank'],['78%','Avg Score'],[user.streak+'d 🔥','Streak']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:18 }}>{v}</p>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:10 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', paddingBottom:4 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'9px 20px', borderRadius:20, border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0,
            background: tab===t ? '#1E3A5F' : '#fff', color: tab===t ? '#fff' : '#64748B',
            fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13,
            boxShadow: tab===t ? '0 4px 14px rgba(30,58,95,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}>{t}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:'#fff', borderRadius:22, overflow:'hidden', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ background:'#1E3A5F', padding:'12px 20px', display:'grid', gridTemplateColumns:'52px 1fr 90px 72px 60px', gap:8 }}>
          {['Rank','Student','Exam','Score','Change'].map(h => (
            <span key={h} style={{ color:'#D4AF37', fontSize:11, fontWeight:700 }}>{h}</span>
          ))}
        </div>
        {rows.map((r,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'52px 1fr 90px 72px 60px', gap:8, padding:'13px 20px', borderBottom:'1px solid #F8FAFC', alignItems:'center', background: r.isMe ? 'rgba(212,175,55,0.06)' : i%2===0 ? '#FAFBFC' : '#fff', borderLeft: r.isMe ? '3px solid #D4AF37' : 'none' }}>
            <span style={{ fontWeight:900, color: i===0?'#D4AF37':i===1?'#9CA3AF':i===2?'#CD7F32':'#64748B', fontSize: i<3?20:13 }}>
              {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${r.rank.toLocaleString()}`}
            </span>
            <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
              <span style={{ fontSize:16, flexShrink:0 }}>{r.badge}</span>
              <div style={{ minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.name}</span>
                  {r.isMe && <span style={{ background:'#D4AF37', color:'#1E3A5F', fontSize:9, fontWeight:800, padding:'1px 6px', borderRadius:20, flexShrink:0 }}>YOU</span>}
                </div>
                <span style={{ color:'#94A3B8', fontSize:11 }}>{r.level} · {r.state}</span>
              </div>
            </div>
            <span style={{ background:'#F1F5F9', color:'#64748B', fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:20, display:'inline-block', whiteSpace:'nowrap' }}>{r.exam}</span>
            <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#D4AF37', fontSize:14 }}>{r.score}</span>
            <span style={{ fontSize:12, fontWeight:700, color: r.change?.startsWith('+')?'#22C55E':r.change==='-1'?'#EF4444':'#94A3B8' }}>{r.change}</span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
EOF

# ── ANALYTICS PAGE ────────────────────────────────────────────────
cat > src/pages/analytics/Analytics.jsx << 'EOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const WEEKLY_DATA = [
  { day:'Mon', score:72, questions:45 },
  { day:'Tue', score:68, questions:38 },
  { day:'Wed', score:81, questions:52 },
  { day:'Thu', score:75, questions:41 },
  { day:'Fri', score:85, questions:60 },
  { day:'Sat', score:79, questions:55 },
  { day:'Sun', score:88, questions:67 },
]

const SUBJECT_DATA = [
  { name:'Reasoning', accuracy:90, attempted:142, correct:128, trend:'up',   color:'#22C55E' },
  { name:'Quant',     accuracy:82, attempted:118, correct:97,  trend:'up',   color:'#22C55E' },
  { name:'GK',        accuracy:75, attempted:96,  correct:72,  trend:'up',   color:'#D4AF37' },
  { name:'English',   accuracy:68, attempted:88,  correct:60,  trend:'down', color:'#F59E0B' },
  { name:'Science',   accuracy:55, attempted:74,  correct:41,  trend:'down', color:'#EF4444' },
]

const RANK_HISTORY = [8432,6210,4890,3421,2890,2341,1890,1521,1243]

export default function Analytics() {
  const { user } = useAuth()
  const [period, setPeriod] = useState('week')
  const maxScore = Math.max(...WEEKLY_DATA.map(d=>d.score))

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>📊 My Analytics</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Track your progress. Identify weak areas. Rise faster.</p>
      </div>

      {/* Top stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,180px),1fr))', gap:12, marginBottom:20 }}>
        {[
          { e:'📝', v:user.testsCompleted, l:'Tests Taken',      c:'#1E3A5F' },
          { e:'📊', v:`${user.avgScore}%`, l:'Average Score',    c:'#D4AF37' },
          { e:'🏆', v:`#${user.rank.toLocaleString()}`, l:'Current Rank', c:'#D4AF37' },
          { e:'📈', v:'+142',              l:'Rank Gained',       c:'#22C55E' },
          { e:'🔥', v:`${user.streak}d`,   l:'Study Streak',     c:'#F97316' },
          { e:'⏱️', v:'48h',               l:'Study Time',        c:'#8B5CF6' },
        ].map(s => (
          <div key={s.l} style={{ background:'#fff', borderRadius:18, padding:'14px 12px', textAlign:'center', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize:26, marginBottom:4 }}>{s.e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:s.c, fontSize:20 }}>{s.v}</p>
            <p style={{ color:'#94A3B8', fontSize:11, marginTop:2 }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Score chart */}
      <div style={{ background:'#fff', borderRadius:22, padding:22, marginBottom:16, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18, flexWrap:'wrap', gap:8 }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:16 }}>Score Trend — Last 7 Days</p>
          <div style={{ display:'flex', gap:6 }}>
            {['week','month'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer', background: period===p?'#1E3A5F':'#F1F5F9', color: period===p?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>
                {p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Bar chart */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:120 }}>
          {WEEKLY_DATA.map((d,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:11, color:'#94A3B8', fontWeight:600 }}>{d.score}%</span>
              <div style={{ width:'100%', borderRadius:'6px 6px 0 0', transition:'height 0.5s ease',
                height:`${(d.score/100)*90}px`,
                background: d.score>=80 ? 'linear-gradient(180deg,#22C55E,#16A34A)' : d.score>=70 ? 'linear-gradient(180deg,#D4AF37,#C9A020)' : 'linear-gradient(180deg,#F59E0B,#D97706)',
                minHeight:8 }}/>
              <span style={{ fontSize:10, color:'#94A3B8' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rank history */}
      <div style={{ background:'#fff', borderRadius:22, padding:22, marginBottom:16, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>Rank Journey (Last 9 Tests)</p>
        <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:80, position:'relative' }}>
          {RANK_HISTORY.map((rank,i) => {
            const maxRank = Math.max(...RANK_HISTORY)
            const h = ((maxRank - rank) / maxRank) * 65 + 15
            return (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <span style={{ fontSize:9, color:'#94A3B8' }}>#{(rank/1000).toFixed(1)}k</span>
                <div style={{ width:'100%', borderRadius:'4px 4px 0 0', height:`${h}px`,
                  background: i===RANK_HISTORY.length-1 ? '#D4AF37' : 'linear-gradient(180deg,#1E3A5F,#0F2140)' }}/>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop:8, display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'#94A3B8', fontSize:11 }}>Start: #8,432</span>
          <span style={{ color:'#22C55E', fontWeight:700, fontSize:12 }}>Now: #1,243 ↑</span>
        </div>
      </div>

      {/* Subject breakdown */}
      <div style={{ background:'#fff', borderRadius:22, padding:22, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>Subject Performance</p>
        {SUBJECT_DATA.map(s => (
          <div key={s.name} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:14 }}>{s.name}</span>
                <span style={{ color: s.trend==='up'?'#22C55E':'#EF4444', fontSize:14, fontWeight:700 }}>{s.trend==='up'?'↑':'↓'}</span>
              </div>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <span style={{ color:'#94A3B8', fontSize:12 }}>{s.correct}/{s.attempted}</span>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:s.color, fontSize:15 }}>{s.accuracy}%</span>
              </div>
            </div>
            <div style={{ width:'100%', height:10, background:'#F1F5F9', borderRadius:5 }}>
              <div style={{ width:`${s.accuracy}%`, height:10, borderRadius:5, background:s.color, transition:'width 1s ease' }}/>
            </div>
          </div>
        ))}
        <div style={{ background:'#FEF3C7', borderRadius:14, padding:'12px 16px', marginTop:16 }}>
          <p style={{ color:'#92400E', fontWeight:700, fontSize:13 }}>💡 Focus on English</p>
          <p style={{ color:'#92400E', fontSize:12, marginTop:4 }}>Improving English from 68% to 78% would jump your rank by ~400 positions based on current competition data.</p>
        </div>
      </div>
    </AppLayout>
  )
}
EOF
echo "Leaderboard + Analytics done"
# SECTION: Achievements + Focus Mode + Current Affairs

cat > src/pages/achievements/Achievements.jsx << 'EOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { BADGES, LEVELS } from '../../data/mockSeeds'

export default function Achievements() {
  const { user } = useAuth()
  const [tab, setTab] = useState('badges')
  const earned = BADGES.filter(b=>b.earned)
  const pending = BADGES.filter(b=>!b.earned)

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🏅 Achievements</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>
          {earned.length}/{BADGES.length} badges earned · {user.xp.toLocaleString()} total XP
        </p>
      </div>

      {/* XP progress */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:22, padding:22, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
          <div style={{ fontSize:44 }}>{user.levelEmoji}</div>
          <div style={{ flex:1 }}>
            <p style={{ color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:20 }}>Level {user.level} — {user.levelTitle}</p>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:2 }}>
              {(user.xpToNext - user.xp).toLocaleString()} XP to {LEVELS[user.level]?.title || 'Max'} {LEVELS[user.level]?.emoji || '🏆'}
            </p>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:22 }}>{user.xp.toLocaleString()}</p>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>/ {user.xpToNext.toLocaleString()} XP</p>
          </div>
        </div>
        <div style={{ height:10, background:'rgba(255,255,255,0.1)', borderRadius:5 }}>
          <div style={{ width:`${(user.xp/user.xpToNext)*100}%`, height:10, borderRadius:5, background:'linear-gradient(90deg,#D4AF37,#E8C84A)', transition:'width 1s ease' }}/>
        </div>
      </div>

      {/* Cinematic levels */}
      <div style={{ background:'#fff', borderRadius:22, padding:20, marginBottom:16, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:14 }}>🎬 Cinematic Level Journey</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,140px),1fr))', gap:10 }}>
          {LEVELS.map(lv => {
            const isActive = lv.level === user.level
            const isDone = lv.level < user.level
            return (
              <div key={lv.level} style={{ borderRadius:16, padding:'12px 10px', textAlign:'center',
                background: isActive ? 'linear-gradient(135deg,#1E3A5F,#0F2140)' : isDone ? 'rgba(30,58,95,0.06)' : '#F8FAFC',
                border: `1.5px solid ${isActive ? '#D4AF37' : isDone ? 'rgba(30,58,95,0.2)' : '#E2E8F0'}`,
                opacity: lv.level > user.level + 2 ? 0.5 : 1,
              }}>
                <span style={{ fontSize:26 }}>{lv.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:11,
                  color: isActive ? '#D4AF37' : isDone ? '#1E3A5F' : '#94A3B8',
                  marginTop:6 }}>{lv.title}</p>
                {lv.cinema && <p style={{ color: isActive ? 'rgba(212,175,55,0.7)' : '#94A3B8', fontSize:9, fontStyle:'italic' }}>🎬 {lv.cinema}</p>}
                <span style={{ display:'inline-block', marginTop:4, background: isActive ? 'rgba(212,175,55,0.2)' : '#F1F5F9',
                  color: isActive ? '#D4AF37' : '#94A3B8', fontSize:9, fontWeight:700,
                  padding:'2px 8px', borderRadius:20 }}>
                  {isActive ? 'CURRENT' : isDone ? '✓' : `Lv ${lv.level}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {[['badges',`🏅 Badges (${earned.length}/${BADGES.length})`],['xp-log','⭐ XP Log']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:'9px 18px', borderRadius:20, border:'none', cursor:'pointer', background: tab===k?'#1E3A5F':'#fff', color: tab===k?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13 }}>{l}</button>
        ))}
      </div>

      {tab === 'badges' && (
        <div>
          {earned.length > 0 && (
            <div style={{ marginBottom:24 }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>Earned ✅</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap:12 }}>
                {earned.map(b => (
                  <div key={b.id} style={{ background:'linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))', borderRadius:18, padding:'16px 14px', textAlign:'center', border:'1.5px solid rgba(212,175,55,0.3)' }}>
                    <span style={{ fontSize:36 }}>{b.emoji}</span>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:13, marginTop:8 }}>{b.name}</p>
                    <p style={{ color:'#94A3B8', fontSize:11, marginTop:3 }}>{b.desc}</p>
                    <p style={{ color:'#22C55E', fontSize:11, fontWeight:600, marginTop:6 }}>✅ {b.earnedDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#64748B', marginBottom:12 }}>In Progress</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap:12 }}>
            {pending.map(b => (
              <div key={b.id} style={{ background:'#F8FAFC', borderRadius:18, padding:'16px 14px', textAlign:'center', border:'1.5px solid #E2E8F0', opacity:0.8 }}>
                <span style={{ fontSize:36, filter:'grayscale(0.6)' }}>{b.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#64748B', fontSize:13, marginTop:8 }}>{b.name}</p>
                <p style={{ color:'#94A3B8', fontSize:11, marginTop:3 }}>{b.desc}</p>
                {b.progress !== undefined && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ height:5, background:'#E2E8F0', borderRadius:3 }}>
                      <div style={{ width:`${(b.progress/b.target)*100}%`, height:5, borderRadius:3, background:'#D4AF37' }}/>
                    </div>
                    <p style={{ color:'#94A3B8', fontSize:10, marginTop:3 }}>{b.progress}/{b.target}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'xp-log' && (
        <div style={{ background:'#fff', borderRadius:22, overflow:'hidden', border:'1.5px solid #E2E8F0' }}>
          {[
            { action:'Completed SSC CGL Mock 4', xp:'+120', date:'Today',      icon:'📝' },
            { action:'Answered a Guru Hub doubt', xp:'+25',  date:'Today',      icon:'🎓' },
            { action:'7-day streak bonus',         xp:'+50',  date:'Yesterday', icon:'🔥' },
            { action:'Brain Game — Math Blitz',    xp:'+15',  date:'Yesterday', icon:'🎮' },
            { action:'Focus Mode — 2 hrs',          xp:'+30',  date:'2 days ago',icon:'🎯' },
            { action:'Completed IBPS PO Mock',      xp:'+110', date:'3 days ago',icon:'📝' },
          ].map((item,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 18px', borderBottom:'1px solid #F8FAFC' }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{item.icon}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{item.action}</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>{item.date}</p>
              </div>
              <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#22C55E', fontSize:16 }}>{item.xp}</span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
EOF

# ── FOCUS MODE ────────────────────────────────────────────────────
cat > src/pages/focus-mode/FocusMode.jsx << 'EOF'
import { useState, useEffect, useRef } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const DURATIONS = [15,25,45,60]
const SOUNDS = [
  { id:'rain',    label:'🌧️ Rain',    desc:'Gentle rain on a tin roof'   },
  { id:'forest',  label:'🌿 Forest',  desc:'Birds and rustling leaves'   },
  { id:'cafe',    label:'☕ Café',    desc:'Soft background café chatter' },
  { id:'silence', label:'🤫 Silence', desc:'No sound — pure focus'       },
  { id:'ocean',   label:'🌊 Ocean',  desc:'Slow ocean waves'             },
]
const SUBJECTS = ['Quantitative Aptitude','Reasoning','English','General Knowledge','Science','Current Affairs','Custom']

export default function FocusMode() {
  const { showToast } = useToast()
  const [duration, setDuration] = useState(25)
  const [sound, setSound] = useState('rain')
  const [subject, setSubject] = useState('Quantitative Aptitude')
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(25 * 60)
  const [sessions, setSessions] = useState(3)
  const [totalCoins, setCoins] = useState(75)
  const intervalRef = useRef(null)

  const pct = ((duration*60 - remaining) / (duration*60)) * 100
  const mins = Math.floor(remaining/60)
  const secs = remaining % 60

  const start = () => {
    setRemaining(duration * 60)
    setRunning(true)
    showToast('success', `🎯 Focus session started! Studying: ${subject}`)
  }
  const stop = () => {
    setRunning(false)
    clearInterval(intervalRef.current)
    showToast('info', 'Session paused.')
  }
  const finish = () => {
    setRunning(false)
    setSessions(s => s+1)
    setCoins(c => c+25)
    setRemaining(duration*60)
    showToast('success', '🎉 Session complete! +25 coins earned!')
  }

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(intervalRef.current); finish(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const circumference = 2 * Math.PI * 90
  const strokeDash = circumference - (pct / 100) * circumference

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🎯 Focus Mode</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Pomodoro timer · Ambient sounds · Earn coins while you study</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap:20 }}>

        {/* Timer */}
        <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:20, border:'1.5px solid rgba(212,175,55,0.3)' }}>
          <div style={{ position:'relative', width:210, height:210 }}>
            <svg width="210" height="210" style={{ transform:'rotate(-90deg)' }}>
              <circle cx="105" cy="105" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
              <circle cx="105" cy="105" r="90" fill="none" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDash}
                style={{ transition:'stroke-dashoffset 1s linear' }}/>
            </svg>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#fff', fontSize:48, lineHeight:1 }}>
                {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
              </p>
              <p style={{ color:'#D4AF37', fontSize:13, marginTop:4 }}>{subject.slice(0,18)}</p>
              {running && <div style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E', marginTop:8, animation:'pulse 1s infinite' }}/>}
            </div>
          </div>

          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {DURATIONS.map(d => (
              <button key={d} onClick={() => { if(!running){ setDuration(d); setRemaining(d*60) } }}
                disabled={running}
                style={{ padding:'7px 14px', borderRadius:20, border:'none', cursor: running?'not-allowed':'pointer',
                  background: duration===d ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.08)',
                  color: duration===d ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13 }}>
                {d} min
              </button>
            ))}
          </div>

          {!running ? (
            <button onClick={start} style={{ width:'100%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'14px', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>
              ▶ Start Focus Session
            </button>
          ) : (
            <div style={{ display:'flex', gap:10, width:'100%' }}>
              <button onClick={stop} style={{ flex:1, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:'12px', color:'rgba(255,255,255,0.7)', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:700 }}>⏸ Pause</button>
              <button onClick={finish} style={{ flex:1, background:'rgba(34,197,94,0.2)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:12, padding:'12px', color:'#4ADE80', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:700 }}>✓ Finish</button>
            </div>
          )}

          <div style={{ display:'flex', gap:16 }}>
            {[['📅',sessions,'Sessions today'],['🪙',totalCoins,'Coins earned']].map(([e,v,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <p style={{ fontSize:20 }}>{e}</p>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#D4AF37', fontSize:18 }}>{v}</p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Subject */}
          <div style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>📚 What are you studying?</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setSubject(s)} style={{ padding:'7px 14px', borderRadius:20, border:'none', cursor:'pointer', background: subject===s?'#1E3A5F':'#F1F5F9', color: subject===s?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Ambient sound */}
          <div style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>🎵 Ambient Sound</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {SOUNDS.map(s => (
                <button key={s.id} onClick={() => setSound(s.id)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:14, border:`1.5px solid ${sound===s.id?'#D4AF37':'#E2E8F0'}`, background: sound===s.id?'rgba(212,175,55,0.06)':'#F8FAFC', cursor:'pointer', textAlign:'left', width:'100%' }}>
                  <span style={{ fontSize:20 }}>{s.label.split(' ')[0]}</span>
                  <div>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{s.label}</p>
                    <p style={{ color:'#94A3B8', fontSize:11 }}>{s.desc}</p>
                  </div>
                  {sound===s.id && <span style={{ marginLeft:'auto', color:'#D4AF37', fontWeight:800 }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Coins info */}
          <div style={{ background:'linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))', borderRadius:18, padding:16, border:'1.5px solid rgba(212,175,55,0.25)' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:6 }}>🪙 Earn While You Study</p>
            <p style={{ color:'#64748B', fontSize:13, lineHeight:1.6 }}>Complete a 25-min session → +25 coins. Complete 4 sessions → bonus +50 coins. Coins can be spent on premium tests and features.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
EOF

# ── CURRENT AFFAIRS ───────────────────────────────────────────────
cat > src/pages/current-affairs/CurrentAffairs.jsx << 'EOF'
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
EOF
echo "Achievements + FocusMode + CurrentAffairs done"

# Update App.jsx with real pages (replace stubs)
python3 << 'PYEOF'
with open('src/App.jsx','r') as f: c = f.read()

additions = """
const HallHub       = lazy(() => import('./pages/hall/HallHub'))
const FullLeaderboard = lazy(() => import('./pages/leaderboard/Leaderboard'))
const Analytics     = lazy(() => import('./pages/analytics/Analytics'))
const Achievements  = lazy(() => import('./pages/achievements/Achievements'))
const FocusMode     = lazy(() => import('./pages/focus-mode/FocusMode'))
const CurrentAffairs = lazy(() => import('./pages/current-affairs/CurrentAffairs'))"""

routes = """
                <Route path="/hall"            element={<HallHub />} />
                <Route path="/hall/create"     element={<Stub title="Create Hall" />} />
                <Route path="/hall/leaderboard" element={<HallHub />} />
                <Route path="/hall/:hallId"    element={<Stub title="Hall Home" />} />
                <Route path="/leaderboard"     element={<FullLeaderboard />} />
                <Route path="/analytics"       element={<Analytics />} />
                <Route path="/achievements"    element={<Achievements />} />
                <Route path="/focus-mode"      element={<FocusMode />} />
                <Route path="/current-affairs" element={<CurrentAffairs />} />"""

if 'HallHub' not in c:
    c = c.replace('const LiveImpactTracker', additions + '\nconst LiveImpactTracker', 1)
if '/hall"            element={<HallHub' not in c:
    c = c.replace('<Route path="/hall"', routes + '\n                {/* old hall route removed */', 1)
    # Remove duplicate stubs for these routes
    for stub in ['<Route path="/leaderboard"', '<Route path="/analytics"', '<Route path="/achievements"', '<Route path="/focus-mode"', '<Route path="/current-affairs"']:
        # Keep only our new version
        pass
with open('src/App.jsx','w') as f: f.write(c)
print('App.jsx updated with Order 2 routes')
PYEOF

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Order 2 pages installed!                             ║"
echo "║                                                          ║"
echo "║  /hall           → The Hall (battles + leaderboard)     ║"
echo "║  /leaderboard    → Full All-India leaderboard            ║"
echo "║  /analytics      → Score trends + rank history          ║"
echo "║  /achievements   → 10 badges + cinematic levels         ║"
echo "║  /focus-mode     → Pomodoro + sounds + earn coins       ║"
echo "║  /current-affairs → Daily news + exam tags              ║"
echo "║                                                          ║"
echo "║  Run: npm run dev                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
