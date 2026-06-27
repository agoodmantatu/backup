import os, re

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

# ============================================================
# 1. ADD 10 PROFESSIONAL MENTOR THEMES TO themes.js
# ============================================================
MENTOR_THEMES = """
// ── MENTOR PROFESSIONAL THEMES (10) ─────────────────────────
// Light × 5
buildTheme({ id:'mentor-kashi-dawn',    name:'Kashi Dawn',      emoji:'🏛️', category:'Mentor Light', tier:'mentor', plan:'free',
  primary:'#92400E', primaryDark:'#78350F', accent:'#D97706', accentLight:'#FCD34D',
  bg:'#FFFBEB', surface:'#FFFFFF', isDark:false })
buildTheme({ id:'mentor-nilgiri-mist',  name:'Nilgiri Mist',    emoji:'🌿', category:'Mentor Light', tier:'mentor', plan:'free',
  primary:'#065F46', primaryDark:'#064E3B', accent:'#059669', accentLight:'#6EE7B7',
  bg:'#F0FDF4', surface:'#FFFFFF', isDark:false })
buildTheme({ id:'mentor-himalayan',     name:'Himalayan Snow',  emoji:'🏔️', category:'Mentor Light', tier:'mentor', plan:'free',
  primary:'#1E40AF', primaryDark:'#1E3A8A', accent:'#3B82F6', accentLight:'#BFDBFE',
  bg:'#EFF6FF', surface:'#FFFFFF', isDark:false })
buildTheme({ id:'mentor-pearl',         name:'Pearl Classic',   emoji:'🎓', category:'Mentor Light', tier:'mentor', plan:'free',
  primary:'#1E3A5F', primaryDark:'#0F2140', accent:'#C9A84C', accentLight:'#E8C44A',
  bg:'#F8FAFC', surface:'#FFFFFF', isDark:false })
buildTheme({ id:'mentor-vedic',         name:'Vedic Scroll',    emoji:'📜', category:'Mentor Light', tier:'mentor', plan:'free',
  primary:'#3B1F08', primaryDark:'#2D1606', accent:'#B45309', accentLight:'#FDE68A',
  bg:'#FFFBF0', surface:'#FEF9EE', isDark:false })
// Dark × 5
buildTheme({ id:'mentor-midnight',      name:'Midnight Indigo', emoji:'🌌', category:'Mentor Dark',  tier:'mentor', plan:'free',
  primary:'#4338CA', primaryDark:'#3730A3', accent:'#818CF8', accentLight:'#A5B4FC',
  bg:'#0F0F1A', surface:'#1A1A2E', isDark:true })
buildTheme({ id:'mentor-graphite',      name:'Graphite Pro',    emoji:'⚙️', category:'Mentor Dark',  tier:'mentor', plan:'free',
  primary:'#4B5563', primaryDark:'#374151', accent:'#60A5FA', accentLight:'#93C5FD',
  bg:'#111827', surface:'#1F2937', isDark:true })
buildTheme({ id:'mentor-teak',          name:'Teak Forest',     emoji:'🌳', category:'Mentor Dark',  tier:'mentor', plan:'free',
  primary:'#065F46', primaryDark:'#064E3B', accent:'#34D399', accentLight:'#6EE7B7',
  bg:'#0A1A14', surface:'#132218', isDark:true })
buildTheme({ id:'mentor-navy-command',  name:'Navy Command',    emoji:'⚓', category:'Mentor Dark',  tier:'mentor', plan:'free',
  primary:'#1E3A5F', primaryDark:'#0F2140', accent:'#C9A84C', accentLight:'#E8C44A',
  bg:'#0A1628', surface:'#0F2140', isDark:true })
buildTheme({ id:'mentor-obsidian',      name:'Obsidian Gold',   emoji:'✨', category:'Mentor Dark',  tier:'mentor', plan:'free',
  primary:'#1C1917', primaryDark:'#0C0A09', accent:'#D97706', accentLight:'#FCD34D',
  bg:'#0C0A09', surface:'#1C1917', isDark:true })
"""

try:
    with open('src/lib/themes.js', 'r', encoding='utf-8') as f:
        tc = f.read()
    if 'mentor-kashi-dawn' not in tc:
        # Find the export line and insert before it
        if 'export {' in tc:
            tc = tc.replace('export {', MENTOR_THEMES + '\nexport {', 1)
        elif 'export default' in tc:
            tc = tc.replace('export default', MENTOR_THEMES + '\nexport default', 1)
        else:
            tc = tc + MENTOR_THEMES
        with open('src/lib/themes.js', 'w', encoding='utf-8') as f:
            f.write(tc)
        print('OK 10 mentor themes added to themes.js')
    else:
        print('SKIP mentor themes already exist')
except Exception as e:
    print('ERROR themes.js:', e)

# ============================================================
# 2. MENTORHUB MAIN DASHBOARD
# ============================================================
w('src/pages/mentor/MentorHub.jsx', """// src/pages/mentor/MentorHub.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const STATS = [
  {icon:'👨‍🎓', label:'Active Students', val:'12', color:'#3B82F6'},
  {icon:'💬', label:'Doubts Pending', val:'4', color:'#F59E0B'},
  {icon:'⭐', label:'Avg Rating', val:'4.8', color:'#F59E0B'},
  {icon:'💰', label:'This Month', val:'₹3,840', color:'#22C55E'},
]

const PENDING_DOUBTS = [
  {student:'Priya R.',exam:'UPSC',q:'Explain Directive Principles vs Fundamental Rights',time:'10m ago'},
  {student:'Karthik M.',exam:'SSC CGL',q:'Time and work shortcut for 3 workers?',time:'25m ago'},
  {student:'Anjali S.',exam:'TNPSC',q:'What is the Panchayati Raj Amendment?',time:'1h ago'},
  {student:'Rahul V.',exam:'IBPS PO',q:'Difference between CRR and SLR?',time:'2h ago'},
]

const STUDENTS = [
  {name:'Priya R.',exam:'UPSC',plan:'Monthly',joined:'Jun 1',status:'active',rating:5},
  {name:'Karthik M.',exam:'SSC CGL',plan:'Weekly',joined:'Jun 10',status:'active',rating:4},
  {name:'Anjali S.',exam:'TNPSC',plan:'Monthly',joined:'May 15',status:'active',rating:5},
  {name:'Rahul V.',exam:'IBPS PO',plan:'Weekly',joined:'Jun 20',status:'active',rating:4},
]

const NAV = [
  {icon:'🏠',label:'Dashboard',path:'/mentor-hub'},
  {icon:'👥',label:'Students',path:'/mentor-hub/students'},
  {icon:'💬',label:'Doubts',path:'/mentor-hub/doubts'},
  {icon:'📚',label:'Materials',path:'/mentor-hub/materials'},
  {icon:'🏆',label:'Leaderboard',path:'/mentor-hub/leaderboard'},
  {icon:'💰',label:'Earnings',path:'/mentor-hub/cashback'},
  {icon:'📊',label:'Analytics',path:'/mentor-hub/analytics'},
]

export default function MentorHub() {
  const nav = useNavigate()
  const { user } = useAuth()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const isDark = theme?.isDark||false
  const [tab, setTab] = useState('doubts')

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif',display:'flex'}}>

      {/* Sidebar */}
      <div style={{width:220,background:p,minHeight:'100vh',position:'fixed',
        top:0,left:0,zIndex:100,display:'flex',flexDirection:'column',padding:'0 0 20px'}}>
        <div style={{padding:'20px 16px',borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:a,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:800,fontSize:14,color:p}}>
              {user?.name?.[0]||'M'}
            </div>
            <div>
              <p style={{color:'#fff',fontWeight:700,fontSize:13,margin:0}}>
                {user?.name||'Mentor'}
              </p>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:10,margin:0}}>
                ⭐ 4.8 · 12 students
              </p>
            </div>
          </div>
        </div>
        <div style={{flex:1,padding:'12px 8px'}}>
          {NAV.map((n,i)=>(
            <button key={i} onClick={()=>nav(n.path)}
              style={{width:'100%',display:'flex',alignItems:'center',gap:10,
                padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',
                marginBottom:2,textAlign:'left',
                background:window.location.pathname===n.path
                  ?'rgba(255,255,255,0.15)':'transparent',
                color:window.location.pathname===n.path
                  ?'#fff':'rgba(255,255,255,0.7)'}}>
              <span style={{fontSize:16}}>{n.icon}</span>
              <span style={{fontSize:13,fontWeight:600}}>{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{padding:'12px'}}>
          <button onClick={()=>nav('/student')}
            style={{width:'100%',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',
              borderRadius:10,padding:'8px',color:'rgba(255,255,255,0.7)',
              fontSize:12,cursor:'pointer',fontWeight:600}}>
            Switch to Student
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{marginLeft:220,flex:1,padding:'24px'}}>

        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <div>
            <h1 style={{color:t,fontSize:22,fontWeight:800,margin:'0 0 4px'}}>
              Good Morning, {user?.name||'Mentor'} 👋
            </h1>
            <p style={{color:m,fontSize:13,margin:0}}>
              You have {PENDING_DOUBTS.length} pending doubts to answer today
            </p>
          </div>
          <button onClick={()=>nav('/mentor-hub/doubts')}
            style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
              borderRadius:12,padding:'10px 20px',color:'#fff',fontWeight:700,
              fontSize:13,cursor:'pointer'}}>
            Answer Doubts →
          </button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
          {STATS.map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:16,
              padding:'18px',boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
              <div style={{width:40,height:40,borderRadius:12,background:s.color+'15',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:20,marginBottom:10}}>
                {s.icon}
              </div>
              <p style={{color:t,fontWeight:800,fontSize:20,margin:'0 0 2px'}}>{s.val}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

          {/* Pending Doubts */}
          <div style={{background:c,border:'1px solid '+b,borderRadius:18,overflow:'hidden'}}>
            <div style={{padding:'16px',borderBottom:'1px solid '+b,
              display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>💬 Pending Doubts</p>
              <button onClick={()=>nav('/mentor-hub/doubts')}
                style={{background:'transparent',border:'none',color:a,
                  fontSize:12,fontWeight:700,cursor:'pointer'}}>View All →</button>
            </div>
            {PENDING_DOUBTS.map((d,i)=>(
              <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid '+b,
                cursor:'pointer',transition:'background 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.background=a+'08'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{color:t,fontWeight:600,fontSize:12}}>{d.student}</span>
                  <span style={{color:m,fontSize:10}}>{d.time}</span>
                </div>
                <p style={{color:m,fontSize:11,margin:'0 0 4px',lineHeight:1.4}}>{d.q}</p>
                <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                  padding:'2px 8px',borderRadius:20}}>{d.exam}</span>
              </div>
            ))}
          </div>

          {/* Active Students */}
          <div style={{background:c,border:'1px solid '+b,borderRadius:18,overflow:'hidden'}}>
            <div style={{padding:'16px',borderBottom:'1px solid '+b,
              display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>👥 Active Students</p>
              <button onClick={()=>nav('/mentor-hub/students')}
                style={{background:'transparent',border:'none',color:a,
                  fontSize:12,fontWeight:700,cursor:'pointer'}}>View All →</button>
            </div>
            {STUDENTS.map((s,i)=>(
              <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid '+b,
                display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:32,height:32,borderRadius:'50%',
                  background:'linear-gradient(135deg,'+p+','+a+')',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontWeight:700,fontSize:12,color:'#fff',flexShrink:0}}>
                  {s.name[0]}
                </div>
                <div style={{flex:1}}>
                  <p style={{color:t,fontWeight:600,fontSize:12,margin:'0 0 2px'}}>{s.name}</p>
                  <span style={{color:m,fontSize:10}}>{s.exam} · {s.plan}</span>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{color:'#F59E0B',fontSize:11,margin:'0 0 2px'}}>
                    {'⭐'.repeat(s.rating)}
                  </p>
                  <span style={{background:'#22C55E15',color:'#22C55E',
                    fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Earnings summary */}
        <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
          borderRadius:18,padding:'20px',marginTop:20}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <p style={{color:'rgba(255,255,255,0.7)',fontSize:11,fontWeight:700,
                letterSpacing:'1px',margin:'0 0 4px'}}>EARNINGS THIS MONTH</p>
              <p style={{color:'#fff',fontWeight:900,fontSize:28,margin:'0 0 4px'}}>₹3,840</p>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:11,margin:0}}>
                12 students × avg ₹320/student · Payout eligible after 30 days
              </p>
            </div>
            <button onClick={()=>nav('/mentor-hub/cashback')}
              style={{background:'linear-gradient(135deg,'+a+',#E8C44A)',border:'none',
                borderRadius:12,padding:'10px 20px',color:p,fontWeight:800,
                fontSize:13,cursor:'pointer'}}>
              View Earnings →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
""")

# ============================================================
# 3. MENTOR DOUBTS PAGE — emoji reactions, queue management
# ============================================================
w('src/pages/mentor/MentorDoubts.jsx', """// src/pages/mentor/MentorDoubts.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const DOUBTS = [
  {id:1,student:'Priya R.',exam:'UPSC',subject:'Polity',
   q:'Explain Directive Principles vs Fundamental Rights in simple terms',
   detail:'I understand both are in Part III and IV but I get confused in exam questions',
   time:'10m ago',status:'pending',emojis:{}},
  {id:2,student:'Karthik M.',exam:'SSC CGL',subject:'Maths',
   q:'Time and work shortcut for 3 workers with different rates?',
   detail:'The LCM method confuses me. Can you give a formula I can remember?',
   time:'25m ago',status:'pending',emojis:{}},
  {id:3,student:'Anjali S.',exam:'TNPSC',subject:'Polity',
   q:'What is the 73rd Amendment? Why is it important?',
   detail:'Is this asked in TNPSC Group 2? What is the key content to remember?',
   time:'1h ago',status:'answered',
   answer:'The 73rd Amendment 1992 gave constitutional status to Panchayati Raj. Key points: 3-tier system, reservations for women & SC/ST, State Finance Commission. Very frequently asked in TNPSC!',
   emojis:{fire:12,star:8,heart:5}},
  {id:4,student:'Rahul V.',exam:'IBPS PO',subject:'Economy',
   q:'Difference between CRR and SLR?',
   detail:'I keep mixing these up in banking awareness section',
   time:'2h ago',status:'pending',emojis:{}},
]

const EMOJI_OPTIONS = [
  {e:'🔥',k:'fire',label:'Fire'},{e:'⭐',k:'star',label:'Star'},
  {e:'❤️',k:'heart',label:'Love'},{e:'👍',k:'thumb',label:'Helpful'},
  {e:'🙏',k:'thanks',label:'Thanks'},{e:'💡',k:'idea',label:'Clear'},
]

export default function MentorDoubts() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [doubts, setDoubts] = useState(DOUBTS)
  const [selected, setSelected] = useState(null)
  const [answer, setAnswer] = useState('')
  const [filter, setFilter] = useState('pending')

  const submitAnswer = (id) => {
    if (!answer.trim()) return
    setDoubts(prev => prev.map(d =>
      d.id === id ? {...d, status:'answered', answer, emojis:{}} : d
    ))
    setSelected(null)
    setAnswer('')
  }

  const filtered = doubts.filter(d => filter === 'all' || d.status === filter)

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif',display:'flex'}}>

      {/* Back nav */}
      <div style={{position:'fixed',top:0,left:0,right:0,background:c,
        borderBottom:'1px solid '+b,padding:'14px 20px',zIndex:10,
        display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>💬 Student Doubts</h1>
        <span style={{background:'#EF444420',color:'#EF4444',fontSize:12,fontWeight:700,
          padding:'3px 10px',borderRadius:20,marginLeft:'auto'}}>
          {doubts.filter(d=>d.status==='pending').length} pending
        </span>
      </div>

      <div style={{marginTop:64,padding:'20px',maxWidth:800,margin:'64px auto 0',width:'100%'}}>

        {/* Filter */}
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          {['pending','answered','all'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'7px 18px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:700,transition:'all 0.2s',
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m}}>
              {f==='pending'?'⏳ Pending':f==='answered'?'✅ Answered':'📋 All'}
            </button>
          ))}
        </div>

        {/* Doubt cards */}
        {filtered.map(d=>(
          <div key={d.id} style={{background:c,border:'1.5px solid '+(selected===d.id?a:b),
            borderRadius:18,padding:'18px',marginBottom:12,
            boxShadow:'0 2px 12px rgba(0,0,0,0.05)',transition:'all 0.2s'}}>

            <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
              <span style={{background:p+'12',color:p,fontSize:9,fontWeight:700,
                padding:'3px 10px',borderRadius:20}}>{d.exam}</span>
              <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                padding:'3px 10px',borderRadius:20}}>{d.subject}</span>
              <span style={{marginLeft:'auto',color:m,fontSize:10}}>{d.time}</span>
              <span style={{background:d.status==='answered'?'#22C55E15':'#F59E0B15',
                color:d.status==='answered'?'#22C55E':'#F59E0B',
                fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20}}>
                {d.status==='answered'?'✓ Answered':'⏳ Pending'}
              </span>
            </div>

            <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
              <div style={{width:28,height:28,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,'+p+','+a+')',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:700,color:'#fff'}}>
                {d.student[0]}
              </div>
              <span style={{color:m,fontSize:11,fontWeight:600}}>{d.student}</span>
            </div>

            <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 6px'}}>{d.q}</p>
            <p style={{color:m,fontSize:12,margin:'0 0 10px',lineHeight:1.6}}>{d.detail}</p>

            {d.status === 'answered' && d.answer && (
              <div style={{background:p+'08',border:'1px solid '+p+'20',
                borderRadius:12,padding:'12px',marginBottom:10}}>
                <p style={{color:p,fontWeight:700,fontSize:11,margin:'0 0 6px'}}>
                  Your Answer:
                </p>
                <p style={{color:t,fontSize:13,margin:'0 0 10px',lineHeight:1.6}}>
                  {d.answer}
                </p>
                {/* Emoji reactions */}
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {EMOJI_OPTIONS.map(({e,k,label})=>(
                    <span key={k} style={{background:c,border:'1px solid '+b,
                      borderRadius:20,padding:'3px 10px',fontSize:12,
                      cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                      {e}
                      <span style={{color:m,fontSize:10,fontWeight:700}}>
                        {d.emojis[k]||0}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {d.status === 'pending' && (
              selected === d.id ? (
                <div>
                  <textarea value={answer} onChange={e=>setAnswer(e.target.value)}
                    placeholder="Type a clear, helpful answer... Avoid sugarcoating — accuracy matters more than flattery."
                    rows={4}
                    style={{width:'100%',padding:'12px',borderRadius:12,
                      border:'1.5px solid '+a,background:bg,color:t,
                      fontSize:13,outline:'none',resize:'vertical',
                      fontFamily:'Poppins,sans-serif',boxSizing:'border-box',
                      lineHeight:1.6,marginBottom:10}}/>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>submitAnswer(d.id)}
                      disabled={!answer.trim()}
                      style={{flex:1,background:answer.trim()
                        ?'linear-gradient(135deg,'+p+','+a+')':b,
                        border:'none',borderRadius:12,padding:'10px',
                        color:answer.trim()?'#fff':m,fontWeight:700,
                        fontSize:13,cursor:'pointer'}}>
                      ✅ Submit Answer
                    </button>
                    <button onClick={()=>{setSelected(null);setAnswer('')}}
                      style={{background:'transparent',border:'1px solid '+b,
                        borderRadius:12,padding:'10px 16px',color:m,
                        fontWeight:600,fontSize:12,cursor:'pointer'}}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={()=>setSelected(d.id)}
                  style={{background:'linear-gradient(135deg,'+p+','+a+')',
                    border:'none',borderRadius:12,padding:'10px 20px',
                    color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                  Answer This Doubt →
                </button>
              )
            )}
          </div>
        ))}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 4. MENTOR LEADERBOARD — public rankings
# ============================================================
w('src/pages/mentor/MentorLeaderboard.jsx', """// src/pages/mentor/MentorLeaderboard.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const MENTORS = [
  {rank:1,name:'Dr. Kavitha Rajan',city:'Chennai',state:'Tamil Nadu',
   subject:'Polity & GS',exam:'UPSC',where:'IAS Officer (Retd)',
   doubts:1842,rating:4.9,students:48,emoji:'🏛️',verified:true},
  {rank:2,name:'Suresh Menon',city:'Kochi',state:'Kerala',
   subject:'Reasoning & Maths',exam:'SSC',where:'SSC Coaching Faculty',
   doubts:1654,rating:4.8,students:36,emoji:'📐',verified:true},
  {rank:3,name:'Priya Chandran',city:'Madurai',state:'Tamil Nadu',
   subject:'Tamil & Polity',exam:'TNPSC',where:'TNPSC Group 1 Qualifier',
   doubts:1423,rating:4.9,students:52,emoji:'🌿',verified:true},
  {rank:4,name:'Ramesh Kumar',city:'Hyderabad',state:'Telangana',
   subject:'Banking & Economy',exam:'IBPS',where:'Bank Manager, SBI',
   doubts:1201,rating:4.7,students:29,emoji:'🏦',verified:true},
  {rank:5,name:'Anita Sharma',city:'Jaipur',state:'Rajasthan',
   subject:'GK & Current Affairs',exam:'UPSC',where:'Delhi Coaching Centre',
   doubts:980,rating:4.8,students:31,emoji:'📚',verified:true},
  {rank:6,name:'Vijay Nair',city:'Trivandrum',state:'Kerala',
   subject:'Science & Environment',exam:'UPSC',where:'PhD Scholar, IIT',
   doubts:876,rating:4.7,students:24,emoji:'🔬',verified:false},
  {rank:7,name:'Meera Patel',city:'Surat',state:'Gujarat',
   subject:'English & Comprehension',exam:'SSC',where:'English Faculty, DU',
   doubts:754,rating:4.6,students:18,emoji:'📝',verified:true},
]

const MEDAL = {1:'🥇',2:'🥈',3:'🥉'}
const FILTERS = ['All India','UPSC','SSC CGL','IBPS','TNPSC','RRB']

export default function MentorLeaderboard() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const [filter, setFilter] = useState('All India')

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav(-1)} style={{background:'transparent',border:'1px solid '+b,
          borderRadius:10,padding:'6px 14px',color:m,fontSize:13,cursor:'pointer'}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>🏆 Mentor Leaderboard</h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            From Kashmir to Kanyakumari · Ranked by doubts solved + quality
          </p>
        </div>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Filter */}
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,marginBottom:20}}>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'7px 16px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:700,flexShrink:0,transition:'all 0.2s',
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m}}>
              {f}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.2fr 1fr',
          gap:12,marginBottom:20,alignItems:'end'}}>
          {[MENTORS[1],MENTORS[0],MENTORS[2]].map((mentor,i)=>{
            const rank = i===0?2:i===1?1:3
            const heights = ['80px','100px','70px']
            return (
              <div key={rank} style={{background:c,border:'2px solid '+(rank===1?a:b),
                borderRadius:18,padding:'16px',textAlign:'center',
                paddingTop:heights[i],position:'relative',
                boxShadow:rank===1?'0 8px 24px '+a+'30':'none'}}>
                <div style={{position:'absolute',top:-20,left:'50%',transform:'translateX(-50%)',
                  fontSize:32}}>{MEDAL[rank]}</div>
                <div style={{width:48,height:48,borderRadius:'50%',margin:'0 auto 8px',
                  background:'linear-gradient(135deg,'+p+','+a+')',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:20,fontWeight:700,color:'#fff'}}>
                  {mentor.emoji}
                </div>
                <p style={{color:t,fontWeight:700,fontSize:12,margin:'0 0 2px'}}>{mentor.name.split(' ')[0]}</p>
                <p style={{color:m,fontSize:9,margin:'0 0 4px'}}>{mentor.city}</p>
                <p style={{color:a,fontWeight:800,fontSize:13,margin:0}}>
                  {mentor.doubts.toLocaleString()} solved
                </p>
              </div>
            )
          })}
        </div>

        {/* Full list */}
        {MENTORS.map((mentor,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:16,
            padding:'16px',marginBottom:10,display:'flex',gap:14,alignItems:'center',
            boxShadow:'0 2px 8px rgba(0,0,0,0.04)',transition:'all 0.2s',cursor:'pointer'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=a;e.currentTarget.style.transform='translateX(4px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=b;e.currentTarget.style.transform='translateX(0)'}}>

            <span style={{width:32,textAlign:'center',fontWeight:900,flexShrink:0,
              fontSize:i<3?20:13,color:i<3?a:m}}>
              {MEDAL[mentor.rank]||'#'+mentor.rank}
            </span>

            <div style={{width:44,height:44,borderRadius:14,flexShrink:0,
              background:'linear-gradient(135deg,'+p+','+a+')',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
              {mentor.emoji}
            </div>

            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                <p style={{color:t,fontWeight:700,fontSize:13,margin:0}}>{mentor.name}</p>
                {mentor.verified&&(
                  <span style={{background:'#3B82F615',color:'#3B82F6',fontSize:9,
                    fontWeight:700,padding:'1px 6px',borderRadius:20}}>✓ Verified</span>
                )}
              </div>
              <p style={{color:m,fontSize:11,margin:'0 0 4px'}}>
                📍 {mentor.city}, {mentor.state} · {mentor.where}
              </p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <span style={{background:p+'10',color:p,fontSize:9,fontWeight:700,
                  padding:'2px 8px',borderRadius:20}}>{mentor.exam}</span>
                <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                  padding:'2px 8px',borderRadius:20}}>{mentor.subject}</span>
              </div>
            </div>

            <div style={{textAlign:'right',flexShrink:0}}>
              <p style={{color:'#F59E0B',fontSize:12,fontWeight:700,margin:'0 0 2px'}}>
                ★ {mentor.rating}
              </p>
              <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                {mentor.doubts.toLocaleString()}
              </p>
              <p style={{color:m,fontSize:9,margin:'0 0 4px'}}>doubts solved</p>
              <p style={{color:m,fontSize:9,margin:0}}>{mentor.students} students</p>
            </div>
          </div>
        ))}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 5. UPDATED StudentMentor — weekly/monthly pass + browse
# ============================================================
w('src/pages/student/StudentMentor.jsx', """// src/pages/student/StudentMentor.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const MENTORS = [
  {id:1,name:'Dr. Kavitha Rajan',exam:'UPSC',subject:'Polity & GS',
   rating:4.9,students:48,lang:'Tamil, English',city:'Chennai',
   weekly:199,monthly:699,emoji:'🏛️',verified:true,
   bio:'IAS Officer (Retd). 20+ years experience. Specializes in GS Paper 2 & Essay.'},
  {id:2,name:'Suresh Menon',exam:'SSC CGL',subject:'Reasoning & Maths',
   rating:4.8,students:36,lang:'English, Hindi',city:'Kochi',
   weekly:149,monthly:499,emoji:'📐',verified:true,
   bio:'SSC Coaching Faculty. 500+ students cleared CGL. Known for shortcut techniques.'},
  {id:3,name:'Priya Chandran',exam:'TNPSC',subject:'Tamil & Polity',
   rating:4.9,students:52,lang:'Tamil',city:'Madurai',
   weekly:99,monthly:349,emoji:'🌿',verified:true,
   bio:'TNPSC Group 1 Qualifier. Tamil medium specialist. Daily assignments + tests.'},
  {id:4,name:'Ramesh Kumar',exam:'IBPS',subject:'Banking & Economy',
   rating:4.7,students:29,lang:'Hindi, English',city:'Hyderabad',
   weekly:149,monthly:499,emoji:'🏦',verified:true,
   bio:'Bank Manager, SBI. Insider perspective on banking awareness & interviews.'},
]

const PASS_COLORS = {weekly:'#3B82F6', monthly:'#8B5CF6'}

export default function StudentMentor() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const isDark = theme?.isDark||false

  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [passType, setPassType] = useState('weekly')
  const [payMethod, setPayMethod] = useState('razorpay')

  const EXAMS = ['All','UPSC','SSC CGL','IBPS','TNPSC','RRB']
  const filtered = MENTORS.filter(m2 => filter==='All' || m2.exam.includes(filter))

  const MentorCard = ({mentor}) => (
    <div style={{background:c,border:'1.5px solid '+(selected?.id===mentor.id?a:b),
      borderRadius:18,padding:'20px',marginBottom:14,
      boxShadow:'0 2px 12px rgba(0,0,0,0.05)',transition:'all 0.2s',cursor:'pointer'}}
      onClick={()=>setSelected(selected?.id===mentor.id?null:mentor)}>

      <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
        <div style={{width:52,height:52,borderRadius:16,flexShrink:0,
          background:'linear-gradient(135deg,'+p+','+a+')',
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:26}}>
          {mentor.emoji}
        </div>
        <div style={{flex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
            <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>{mentor.name}</p>
            {mentor.verified&&(
              <span style={{background:'#3B82F615',color:'#3B82F6',fontSize:9,
                fontWeight:700,padding:'2px 8px',borderRadius:20}}>✓ Verified</span>
            )}
            <span style={{color:'#F59E0B',fontWeight:700,fontSize:12,marginLeft:'auto'}}>
              ★ {mentor.rating}
            </span>
          </div>
          <p style={{color:m,fontSize:12,margin:'0 0 6px'}}>
            {mentor.subject} · 📍 {mentor.city} · 🌐 {mentor.lang}
          </p>
          <p style={{color:m,fontSize:11,margin:'0 0 8px',lineHeight:1.5}}>{mentor.bio}</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
            <span style={{background:p+'10',color:p,fontSize:9,fontWeight:700,
              padding:'2px 8px',borderRadius:20}}>{mentor.exam}</span>
            <span style={{background:'#22C55E15',color:'#22C55E',fontSize:9,fontWeight:700,
              padding:'2px 8px',borderRadius:20}}>👥 {mentor.students} students</span>
          </div>

          {/* Pass options */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div style={{background:'#3B82F608',border:'1.5px solid '+(passType==='weekly'&&selected?.id===mentor.id?'#3B82F6':b),
              borderRadius:12,padding:'10px',cursor:'pointer',textAlign:'center'}}
              onClick={e=>{e.stopPropagation();setSelected(mentor);setPassType('weekly')}}>
              <p style={{color:'#3B82F6',fontWeight:800,fontSize:15,margin:'0 0 2px'}}>
                ₹{mentor.weekly}
              </p>
              <p style={{color:m,fontSize:10,margin:0}}>per week</p>
            </div>
            <div style={{background:'#8B5CF608',border:'1.5px solid '+(passType==='monthly'&&selected?.id===mentor.id?'#8B5CF6':b),
              borderRadius:12,padding:'10px',cursor:'pointer',textAlign:'center'}}
              onClick={e=>{e.stopPropagation();setSelected(mentor);setPassType('monthly')}}>
              <p style={{color:'#8B5CF6',fontWeight:800,fontSize:15,margin:'0 0 2px'}}>
                ₹{mentor.monthly}
              </p>
              <p style={{color:m,fontSize:10,margin:0}}>per month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment flow when selected */}
      {selected?.id===mentor.id&&(
        <div style={{marginTop:16,padding:'16px',background:isDark?'rgba(255,255,255,0.05)':bg,
          borderRadius:14,border:'1px solid '+b}}
          onClick={e=>e.stopPropagation()}>
          <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 10px'}}>
            Pay via:
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
            {[
              {id:'razorpay',label:'💳 Razorpay',sub:'Cards, Net Banking, UPI'},
              {id:'upi',label:'📱 Google Pay / UPI',sub:'Direct UPI payment'},
            ].map(method=>(
              <button key={method.id} onClick={()=>setPayMethod(method.id)}
                style={{padding:'10px',borderRadius:12,border:'2px solid',cursor:'pointer',
                  textAlign:'left',transition:'all 0.2s',
                  borderColor:payMethod===method.id?a:b,
                  background:payMethod===method.id?a+'10':c}}>
                <p style={{color:t,fontWeight:600,fontSize:12,margin:'0 0 2px'}}>{method.label}</p>
                <p style={{color:m,fontSize:10,margin:0}}>{method.sub}</p>
              </button>
            ))}
          </div>
          <button style={{width:'100%',
            background:'linear-gradient(135deg,'+p+','+a+')',
            border:'none',borderRadius:14,padding:'14px',
            color:'#fff',fontWeight:800,fontSize:14,cursor:'pointer',
            boxShadow:'0 4px 16px '+p+'33'}}>
            {passType==='weekly'?'Get Weekly Pass — ₹'+mentor.weekly:'Get Monthly Pass — ₹'+mentor.monthly}
          </button>
          <p style={{color:m,fontSize:10,textAlign:'center',margin:'8px 0 0'}}>
            Secure payment · Cancel anytime · Change mentor after 7 days
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/student')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>👨‍🏫 Find a Mentor</h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            Weekly or monthly · Cancel anytime · Change after 7 days
          </p>
        </div>
        <button onClick={()=>nav('/mentor-hub/leaderboard')}
          style={{background:'transparent',border:'1px solid '+b,borderRadius:10,
            padding:'6px 14px',color:p,fontSize:12,fontWeight:700,cursor:'pointer'}}>
          🏆 Top Mentors
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:680,margin:'0 auto'}}>

        {/* How it works */}
        <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
          borderRadius:18,padding:'18px',marginBottom:20}}>
          <p style={{color:a,fontWeight:700,fontSize:11,letterSpacing:'1px',margin:'0 0 6px'}}>
            HOW MENTOR PASSES WORK
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
            {[{e:'📚',t:'Daily Assignments',s:'Notes, PDFs, HW every day'},
              {e:'📝',t:'Unit Tests',s:'Conducted by your mentor'},
              {e:'💬',t:'Doubt Priority',s:'Answered within 2 hours'}
            ].map((item,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:12,padding:'10px',textAlign:'center'}}>
                <div style={{fontSize:20,marginBottom:4}}>{item.e}</div>
                <p style={{color:'#fff',fontWeight:600,fontSize:11,margin:'0 0 2px'}}>{item.t}</p>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:9,margin:0}}>{item.s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,marginBottom:16}}>
          {EXAMS.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'7px 16px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:700,flexShrink:0,
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m}}>
              {f}
            </button>
          ))}
        </div>

        {filtered.map(mentor => <MentorCard key={mentor.id} mentor={mentor}/>)}
        <div style={{height:60}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 6. CASHBACK CENTER — earnings + payout tracker
# ============================================================
w('src/pages/mentor/CashbackCenter.jsx', """// src/pages/mentor/CashbackCenter.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const EARNINGS = [
  {student:'Priya R.',plan:'Monthly ₹699',earned:'₹104',date:'Jun 1',status:'pending_payout'},
  {student:'Karthik M.',plan:'Weekly ₹149',earned:'₹22',date:'Jun 10',status:'pending_payout'},
  {student:'Anjali S.',plan:'Monthly ₹349',earned:'₹52',date:'May 15',status:'paid'},
  {student:'Rahul V.',plan:'Weekly ₹149',earned:'₹22',date:'Jun 20',status:'pending_payout'},
]

export default function CashbackCenter() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const pending = EARNINGS.filter(e=>e.status==='pending_payout')
  const paid = EARNINGS.filter(e=>e.status==='paid')
  const pendingAmt = 148
  const paidAmt = 52

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>💰 Earnings & Cashback</h1>
      </div>

      <div style={{padding:'20px',maxWidth:680,margin:'0 auto'}}>

        {/* Summary cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
          {[
            {l:'Total Earned',v:'₹'+( pendingAmt+paidAmt),e:'💰',c:'#22C55E'},
            {l:'Pending Payout',v:'₹'+pendingAmt,e:'⏳',c:'#F59E0B'},
            {l:'Already Paid',v:'₹'+paidAmt,e:'✅',c:'#3B82F6'},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:16,
              padding:'16px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
              <div style={{fontSize:24,marginBottom:6}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:18,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Policy box */}
        <div style={{background:a+'12',border:'1px solid '+a+'30',borderRadius:14,
          padding:'14px 16px',marginBottom:20}}>
          <p style={{color:a,fontWeight:700,fontSize:12,margin:'0 0 4px'}}>
            📋 Cashback Policy
          </p>
          <p style={{color:m,fontSize:11,margin:0,lineHeight:1.7}}>
            You earn 15% of each student's pass amount. Payout is released after
            <strong style={{color:t}}> 30 days minimum</strong> per student
            to ensure quality mentoring. Coupon code cashbacks are paid at month end.
          </p>
        </div>

        {/* Breakdown */}
        <p style={{color:t,fontWeight:700,fontSize:14,marginBottom:12}}>
          Earnings Breakdown
        </p>
        {EARNINGS.map((e,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
            padding:'14px 16px',marginBottom:8,
            display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,flexShrink:0,
              background:'linear-gradient(135deg,'+p+','+a+')',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:700,fontSize:14,color:'#fff'}}>
              {e.student[0]}
            </div>
            <div style={{flex:1}}>
              <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 2px'}}>{e.student}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{e.plan} · {e.date}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{color:'#22C55E',fontWeight:800,fontSize:14,margin:'0 0 2px'}}>{e.earned}</p>
              <span style={{background:e.status==='paid'?'#22C55E15':'#F59E0B15',
                color:e.status==='paid'?'#22C55E':'#F59E0B',
                fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                {e.status==='paid'?'✓ Paid':'⏳ Pending'}
              </span>
            </div>
          </div>
        ))}

        {/* Payout button */}
        <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
          borderRadius:18,padding:'20px',marginTop:16,textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:12,margin:'0 0 4px'}}>
            Available for payout after 30-day window
          </p>
          <p style={{color:a,fontWeight:900,fontSize:28,margin:'0 0 12px'}}>₹{paidAmt}</p>
          <button style={{background:'linear-gradient(135deg,'+a+',#E8C44A)',border:'none',
            borderRadius:12,padding:'12px 32px',color:p,fontWeight:800,
            fontSize:14,cursor:'pointer'}}>
            Request Payout
          </button>
        </div>

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 7. Update App.jsx routes for new mentor pages
# ============================================================
try:
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        app = f.read()

    new_imports = """const MentorLeaderboard   = lazy(() => import('./pages/mentor/MentorLeaderboard'))
const MentorDoubts        = lazy(() => import('./pages/mentor/MentorDoubts'))
"""
    new_routes = """            <Route path='/mentor-hub/doubts'      element={<MentorDoubts/>}/>
            <Route path='/mentor-hub/leaderboard'  element={<MentorLeaderboard/>}/>
"""
    if 'MentorDoubts' not in app:
        app = app.replace(
            "const MentorHub",
            new_imports + "const MentorHub"
        )
        app = app.replace(
            "<Route path=\"/mentor-hub\"",
            new_routes + "            <Route path=\"/mentor-hub\""
        )
        with open('src/App.jsx', 'w', encoding='utf-8') as f:
            f.write(app)
        print('OK App.jsx mentor routes added')
    else:
        print('SKIP App.jsx already has mentor routes')
except Exception as e:
    print('ERROR App.jsx:', e)

print('')
print('ALL DONE! Run:')
print('npm run build 2>&1 | Select-Object -Last 3')
