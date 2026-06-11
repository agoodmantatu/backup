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
