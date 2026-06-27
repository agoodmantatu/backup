import os, re

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

def patch(path, old, new):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            c = f.read()
        if old in c:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(c.replace(old, new, 1))
            print('PATCHED', path.split('/')[-1])
        else:
            print('SKIP (not found)', path.split('/')[-1])
    except Exception as e:
        print('ERROR', path, e)

# ============================================================
# 1. FIX MentorHub — useLocation for active nav, header bell+theme
# ============================================================
patch('src/pages/mentor/MentorHub.jsx',
    "import { useState, useEffect } from 'react'",
    "import { useState, useEffect } from 'react'\nimport { useLocation } from 'react-router-dom'"
)
patch('src/pages/mentor/MentorHub.jsx',
    "  const [sidebarOpen, setSidebarOpen] = useState(false)",
    "  const location = useLocation()\n  const [sidebarOpen, setSidebarOpen] = useState(false)"
)
patch('src/pages/mentor/MentorHub.jsx',
    "window.location.pathname === n.path",
    "location.pathname === n.path"
)

# Fix header — add theme toggle + bell
patch('src/pages/mentor/MentorHub.jsx',
    """          <button onClick={()=>nav('/mentor-hub/doubts')}
            style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
              borderRadius:12,padding:'9px 18px',color:'#fff',fontWeight:700,
              fontSize:13,cursor:'pointer'}}>
            Answer Doubts →
          </button>""",
    """          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <button onClick={()=>nav('/mentor-hub/settings')}
              style={{background:'transparent',border:'1px solid '+b,borderRadius:10,
                padding:'7px 12px',color:t,fontSize:13,cursor:'pointer'}}>
              🎨
            </button>
            <button style={{position:'relative',background:'transparent',
              border:'1px solid '+b,borderRadius:10,padding:'7px 12px',
              color:t,fontSize:13,cursor:'pointer'}}>
              🔔
              <span style={{position:'absolute',top:4,right:4,width:7,height:7,
                borderRadius:'50%',background:'#EF4444',border:'1.5px solid '+c}}/>
            </button>
            <button onClick={()=>nav('/mentor-hub/doubts')}
              style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
                borderRadius:12,padding:'9px 18px',color:'#fff',fontWeight:700,
                fontSize:13,cursor:'pointer'}}>
              Answer Doubts →
            </button>
          </div>"""
)
print('OK MentorHub fixes applied')

# ============================================================
# 2. FIX MentorSettings — correct theme applying
# ============================================================
patch('src/pages/mentor/MentorSettings.jsx',
    "  const { theme, setActiveTheme, applyTheme } = useTheme()",
    "  const { theme, setActiveTheme } = useTheme()"
)
patch('src/pages/mentor/MentorSettings.jsx',
    "onClick={()=>{ setActiveTheme&&setActiveTheme(th.id); applyTheme&&applyTheme(th.id) }}",
    "onClick={()=>{ if(setActiveTheme) setActiveTheme(th.id) }}"
)
print('OK MentorSettings theme fix applied')

# ============================================================
# 3. EXAM BOARD — Common for all users
# ============================================================
w('src/pages/exam-board/ExamBoard.jsx', """// src/pages/exam-board/ExamBoard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const EXAMS = [
  {
    id:1, name:'UPSC Civil Services Examination 2026',
    body:'Union Public Service Commission', govtType:'central',
    state:'All India', eligibility:'Graduate, Age 21-32',
    appOpen:'2026-02-01', appClose:'2026-03-15',
    examDate:'2026-05-25', resultDate:'2026-09-01',
    officialUrl:'https://upsc.gov.in',
    languages:['English','Hindi'],
    postedBy:'Dr. Kavitha R.', verified:true, thumbsUp:284, pinned:false,
    courses:3, students:1240,
  },
  {
    id:2, name:'TNPSC Group 1 Examination 2026',
    body:'Tamil Nadu Public Service Commission', govtType:'state',
    state:'Tamil Nadu', eligibility:'Graduate, Age 21-42',
    appOpen:'2026-03-01', appClose:'2026-04-10',
    examDate:'2026-07-20', resultDate:'2026-11-01',
    officialUrl:'https://tnpsc.gov.in',
    languages:['Tamil','English'],
    postedBy:'Priya C.', verified:true, thumbsUp:156, pinned:false,
    courses:2, students:890,
  },
  {
    id:3, name:'SSC CGL Tier 1 2026',
    body:'Staff Selection Commission', govtType:'central',
    state:'All India', eligibility:'Graduate, Age 18-32',
    appOpen:'2026-04-01', appClose:'2026-04-30',
    examDate:'2026-07-01', resultDate:'2026-09-15',
    officialUrl:'https://ssc.nic.in',
    languages:['English','Hindi'],
    postedBy:'Suresh M.', verified:true, thumbsUp:312, pinned:false,
    courses:4, students:2100,
  },
  {
    id:4, name:'IBPS PO 2026',
    body:'Institute of Banking Personnel Selection', govtType:'central',
    state:'All India', eligibility:'Graduate, Age 20-30',
    appOpen:'2026-07-01', appClose:'2026-07-21',
    examDate:'2026-10-04', resultDate:'2027-01-15',
    officialUrl:'https://ibps.in',
    languages:['English','Hindi'],
    postedBy:'Ramesh K.', verified:true, thumbsUp:198, pinned:false,
    courses:2, students:760,
  },
  {
    id:5, name:'Kerala PSC Plus Two Level Exam 2026',
    body:'Kerala Public Service Commission', govtType:'state',
    state:'Kerala', eligibility:'+2 / Class 12, Age 18-36',
    appOpen:'2026-05-01', appClose:'2026-05-20',
    examDate:'2026-08-10', resultDate:'2026-12-01',
    officialUrl:'https://keralapsc.gov.in',
    languages:['Malayalam','English'],
    postedBy:'Anjali S.', verified:false, thumbsUp:43, pinned:false,
    courses:1, students:320,
  },
]

function Countdown({ targetDate }) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return {d:0,h:0,m:0}
    return {
      d: Math.floor(diff/(1000*60*60*24)),
      h: Math.floor((diff%(1000*60*60*24))/(1000*60*60)),
      m: Math.floor((diff%(1000*60*60))/(1000*60)),
    }
  }
  const [time, setTime] = useState(calc())
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 60000)
    return () => clearInterval(t)
  }, [targetDate])
  if (time.d <= 0 && time.h <= 0) return (
    <span style={{color:'#EF4444',fontWeight:700,fontSize:11}}>Today!</span>
  )
  return (
    <span style={{fontWeight:700}}>
      {time.d > 0 && <span>{time.d}d </span>}
      {time.h}h {time.m}m
    </span>
  )
}

const FILTERS = ['All','Central Govt','State Govt','University','School / College']
const SORT_OPTIONS = ['Date (Soonest)','Most Pinned','Most Popular']

export default function ExamBoard() {
  const nav = useNavigate()
  const { user } = useAuth()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [exams, setExams] = useState(EXAMS)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Date (Soonest)')
  const [showPost, setShowPost] = useState(false)
  const [pinned, setPinned] = useState([])
  const [dupWarning, setDupWarning] = useState('')
  const [form, setForm] = useState({
    name:'', body:'', govtType:'central', state:'',
    eligibility:'', appOpen:'', appClose:'',
    examDate:'', officialUrl:'', languages:[]
  })

  const LANGS = ['English','Hindi','Tamil','Telugu','Malayalam','Kannada',
    'Bengali','Marathi','Gujarati','Odia']

  const checkDuplicate = (name) => {
    if (!name || name.length < 5) { setDupWarning(''); return }
    const words = name.toLowerCase().split(' ').filter(w=>w.length>3)
    const match = exams.find(e =>
      words.some(w => e.name.toLowerCase().includes(w))
    )
    if (match) setDupWarning('Similar exam already exists: '+match.name)
    else setDupWarning('')
  }

  const togglePin = (id) => {
    setPinned(prev =>
      prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]
    )
  }

  const thumbsUp = (id) => {
    setExams(prev => prev.map(e =>
      e.id===id ? {...e, thumbsUp:e.thumbsUp+1} : e
    ))
  }

  const filtered = exams
    .filter(e => {
      if (filter==='Central Govt') return e.govtType==='central'
      if (filter==='State Govt') return e.govtType==='state'
      return true
    })
    .filter(e =>
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.body.toLowerCase().includes(search.toLowerCase()) ||
      e.state.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a2,b2) => {
      if (sort==='Date (Soonest)')
        return new Date(a2.examDate) - new Date(b2.examDate)
      if (sort==='Most Pinned') return b2.thumbsUp - a2.thumbsUp
      return b2.students - a2.students
    })

  const submitExam = () => {
    if (!form.name.trim() || !form.body || !form.examDate) return
    if (dupWarning) return
    setExams(prev => [{
      id: Date.now(), ...form,
      postedBy: user?.name||'You',
      verified: false, thumbsUp: 0, pinned: false,
      courses: 0, students: 0,
    }, ...prev])
    setForm({name:'',body:'',govtType:'central',state:'',
      eligibility:'',appOpen:'',appClose:'',examDate:'',officialUrl:'',languages:[]})
    setShowPost(false)
  }

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,'+p+','+p+'dd)',
        padding:'20px 20px 0'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
            <button onClick={()=>nav(-1)} style={{background:'rgba(255,255,255,0.15)',
              border:'1px solid rgba(255,255,255,0.2)',borderRadius:10,
              padding:'6px 14px',color:'#fff',fontSize:13,cursor:'pointer'}}>
              ← Back
            </button>
            <div style={{flex:1}}>
              <h1 style={{color:'#fff',fontWeight:800,fontSize:20,margin:'0 0 2px'}}>
                📋 Exam Board
              </h1>
              <p style={{color:'rgba(255,255,255,0.7)',fontSize:11,margin:0}}>
                All India · State · Central · University · School — in one place
              </p>
            </div>
            <button onClick={()=>setShowPost(!showPost)}
              style={{background:'linear-gradient(135deg,'+a+',#E8C44A)',
                border:'none',borderRadius:12,padding:'10px 20px',
                color:p,fontWeight:800,fontSize:13,cursor:'pointer'}}>
              + Post Exam
            </button>
          </div>

          {/* Search bar */}
          <div style={{position:'relative',marginBottom:16}}>
            <span style={{position:'absolute',left:14,top:'50%',
              transform:'translateY(-50%)',fontSize:16,color:m}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by exam name, conducting body, state..."
              style={{width:'100%',padding:'12px 14px 12px 40px',borderRadius:14,
                border:'none',background:'rgba(255,255,255,0.15)',
                color:'#fff',fontSize:14,outline:'none',
                fontFamily:'Poppins,sans-serif',boxSizing:'border-box',
                backdropFilter:'blur(10px)'}}/>
          </div>

          {/* Filters */}
          <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:12}}>
            {FILTERS.map(f=>(
              <button key={f} onClick={()=>setFilter(f)}
                style={{padding:'7px 16px',borderRadius:20,border:'none',
                  cursor:'pointer',fontSize:12,fontWeight:700,flexShrink:0,
                  background:filter===f?a:'rgba(255,255,255,0.15)',
                  color:filter===f?p:'rgba(255,255,255,0.8)'}}>
                {f}
              </button>
            ))}
            <select value={sort} onChange={e=>setSort(e.target.value)}
              style={{marginLeft:'auto',padding:'7px 12px',borderRadius:20,
                border:'none',background:'rgba(255,255,255,0.15)',
                color:'rgba(255,255,255,0.9)',fontSize:12,cursor:'pointer',
                flexShrink:0,outline:'none'}}>
              {SORT_OPTIONS.map(s=>(
                <option key={s} value={s} style={{color:t,background:c}}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{padding:'20px',maxWidth:900,margin:'0 auto'}}>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',
          gap:10,marginBottom:20}}>
          {[
            {l:'Active Exams',  v:exams.length,                      e:'📋'},
            {l:'Central Govt',  v:exams.filter(e=>e.govtType==='central').length, e:'🏛️'},
            {l:'State Govt',    v:exams.filter(e=>e.govtType==='state').length,   e:'🌿'},
            {l:'Pinned by You', v:pinned.length,                      e:'📌'},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,
              borderRadius:14,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:18,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Post form */}
        {showPost && (
          <div style={{background:c,border:'1.5px solid '+a,borderRadius:20,
            padding:'20px',marginBottom:20}}>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 14px'}}>
              Post Exam Notification
            </p>

            {/* Exam name with duplicate check */}
            <div style={{marginBottom:12}}>
              <label style={{display:'block',color:t,fontWeight:700,
                fontSize:12,marginBottom:6}}>Exam Name *</label>
              <input value={form.name}
                onChange={e=>{
                  setForm({...form,name:e.target.value})
                  checkDuplicate(e.target.value)
                }}
                placeholder="Full official exam name"
                style={{width:'100%',padding:'11px 14px',borderRadius:12,
                  border:'1.5px solid '+(dupWarning?'#EF4444':b),
                  background:bg,color:t,fontSize:14,outline:'none',
                  fontFamily:'Poppins,sans-serif',boxSizing:'border-box'}}/>
              {dupWarning && (
                <div style={{background:'#EF444410',border:'1px solid #EF444430',
                  borderRadius:8,padding:'8px 12px',marginTop:6}}>
                  <p style={{color:'#EF4444',fontSize:11,fontWeight:700,margin:'0 0 2px'}}>
                    ⚠️ Possible Duplicate
                  </p>
                  <p style={{color:'#EF4444',fontSize:11,margin:0}}>{dupWarning}</p>
                </div>
              )}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              {[
                {label:'Conducting Body *',key:'body',ph:'e.g. UPSC, SSC, TNPSC'},
                {label:'State (if state exam)',key:'state',ph:'e.g. Tamil Nadu, All India'},
                {label:'Eligibility',key:'eligibility',ph:'e.g. Graduate, Age 21-32'},
                {label:'Official URL *',key:'officialUrl',ph:'https://upsc.gov.in'},
              ].map(f=>(
                <div key={f.key}>
                  <label style={{display:'block',color:t,fontWeight:700,
                    fontSize:12,marginBottom:6}}>{f.label}</label>
                  <input value={form[f.key]}
                    onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    placeholder={f.ph}
                    style={{width:'100%',padding:'10px 12px',borderRadius:10,
                      border:'1.5px solid '+b,background:bg,color:t,
                      fontSize:13,outline:'none',boxSizing:'border-box'}}/>
                </div>
              ))}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',
              gap:10,marginBottom:12}}>
              {[
                {label:'App Opens',  key:'appOpen',  type:'date'},
                {label:'App Closes', key:'appClose', type:'date'},
                {label:'Exam Date *',key:'examDate', type:'date'},
              ].map(f=>(
                <div key={f.key}>
                  <label style={{display:'block',color:t,fontWeight:700,
                    fontSize:12,marginBottom:6}}>{f.label}</label>
                  <input type={f.type} value={form[f.key]}
                    onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    style={{width:'100%',padding:'10px 12px',borderRadius:10,
                      border:'1.5px solid '+b,background:bg,color:t,
                      fontSize:13,outline:'none',cursor:'pointer',
                      boxSizing:'border-box'}}/>
                </div>
              ))}
            </div>

            <div style={{marginBottom:12}}>
              <label style={{display:'block',color:t,fontWeight:700,
                fontSize:12,marginBottom:6}}>Exam Type</label>
              <div style={{display:'flex',gap:8}}>
                {['central','state','university','school'].map(gt=>(
                  <button key={gt} onClick={()=>setForm({...form,govtType:gt})}
                    style={{padding:'7px 14px',borderRadius:20,border:'1.5px solid',
                      cursor:'pointer',fontSize:12,fontWeight:700,
                      borderColor:form.govtType===gt?a:b,
                      background:form.govtType===gt?a+'15':bg,
                      color:form.govtType===gt?a:m}}>
                    {gt==='central'?'Central Govt':
                     gt==='state'?'State Govt':
                     gt==='university'?'University':'School/College'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:16}}>
              <label style={{display:'block',color:t,fontWeight:700,
                fontSize:12,marginBottom:6}}>Exam Languages</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {LANGS.map(lang=>(
                  <button key={lang}
                    onClick={()=>setForm({...form,
                      languages:form.languages.includes(lang)
                        ?form.languages.filter(l=>l!==lang)
                        :[...form.languages,lang]
                    })}
                    style={{padding:'5px 12px',borderRadius:20,border:'1.5px solid',
                      cursor:'pointer',fontSize:11,fontWeight:600,
                      borderColor:form.languages.includes(lang)?p:b,
                      background:form.languages.includes(lang)?p+'12':bg,
                      color:form.languages.includes(lang)?p:m}}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:'flex',gap:8}}>
              <button onClick={submitExam}
                disabled={!form.name.trim()||!form.body||!form.examDate||!!dupWarning}
                style={{flex:1,
                  background:(!form.name.trim()||!form.body||!form.examDate||dupWarning)
                    ?b:'linear-gradient(135deg,'+p+','+a+')',
                  border:'none',borderRadius:12,padding:'12px',
                  color:(!form.name.trim()||!form.body||!form.examDate||dupWarning)?m:'#fff',
                  fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Post Exam Notification
              </button>
              <button onClick={()=>setShowPost(false)}
                style={{background:'transparent',border:'1px solid '+b,
                  borderRadius:12,padding:'12px 20px',color:m,
                  fontWeight:600,fontSize:13,cursor:'pointer'}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Exam cards */}
        {filtered.map(exam => (
          <div key={exam.id} style={{background:c,border:'1px solid '+b,
            borderRadius:20,marginBottom:16,overflow:'hidden',
            boxShadow:'0 2px 16px rgba(0,0,0,0.06)'}}>

            {/* Card header */}
            <div style={{padding:'18px 18px 14px'}}>
              <div style={{display:'flex',alignItems:'flex-start',
                gap:12,marginBottom:10}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:6}}>
                    <span style={{background:
                      exam.govtType==='central'?'#3B82F615':'#22C55E15',
                      color:exam.govtType==='central'?'#3B82F6':'#22C55E',
                      fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                      {exam.govtType==='central'?'🏛️ Central Govt':'🌿 State Govt'}
                    </span>
                    {exam.state!=='All India' && (
                      <span style={{background:p+'10',color:p,fontSize:9,
                        fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                        📍 {exam.state}
                      </span>
                    )}
                    {exam.verified ? (
                      <span style={{background:'#22C55E15',color:'#22C55E',
                        fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                        👍 Verified
                      </span>
                    ) : (
                      <span style={{background:'#F59E0B15',color:'#F59E0B',
                        fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                        ⚠️ Unverified
                      </span>
                    )}
                  </div>
                  <h3 style={{color:t,fontWeight:800,fontSize:15,
                    margin:'0 0 4px',lineHeight:1.3}}>
                    {exam.name}
                  </h3>
                  <p style={{color:m,fontSize:11,margin:'0 0 4px'}}>
                    {exam.body}
                  </p>
                  <p style={{color:m,fontSize:11,margin:0}}>
                    📋 {exam.eligibility}
                  </p>
                </div>
                <button onClick={()=>togglePin(exam.id)}
                  style={{background:pinned.includes(exam.id)?a+'15':'transparent',
                    border:'1.5px solid '+(pinned.includes(exam.id)?a:b),
                    borderRadius:10,padding:'8px',cursor:'pointer',
                    fontSize:18,transition:'all 0.2s',flexShrink:0}}>
                  {pinned.includes(exam.id)?'📌':'🔖'}
                </button>
              </div>

              {/* Date grid */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
                gap:8,marginBottom:12}}>
                {[
                  {label:'Apply by', date:exam.appClose, urgent:true},
                  {label:'Exam Date', date:exam.examDate, urgent:false},
                  {label:'Result', date:exam.resultDate, urgent:false},
                ].map((d,i)=>(
                  <div key={i} style={{background:bg,border:'1px solid '+b,
                    borderRadius:10,padding:'10px',textAlign:'center'}}>
                    <p style={{color:m,fontSize:9,fontWeight:700,
                      letterSpacing:'0.5px',margin:'0 0 4px'}}>
                      {d.label.toUpperCase()}
                    </p>
                    <p style={{color:t,fontWeight:700,fontSize:11,margin:'0 0 4px'}}>
                      {new Date(d.date).toLocaleDateString('en-IN',
                        {day:'2-digit',month:'short',year:'numeric'})}
                    </p>
                    <p style={{color:d.urgent?'#EF4444':a,
                      fontWeight:700,fontSize:10,margin:0}}>
                      ⏱ <Countdown targetDate={d.date}/>
                    </p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
                {exam.languages.map(lang=>(
                  <span key={lang} style={{background:p+'08',color:p,
                    fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                    🌐 {lang}
                  </span>
                ))}
                <span style={{color:m,fontSize:10,marginLeft:'auto'}}>
                  Posted by {exam.postedBy}
                </span>
              </div>

              {/* Action bar */}
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button onClick={()=>thumbsUp(exam.id)}
                  style={{background:bg,border:'1px solid '+b,borderRadius:20,
                    padding:'6px 14px',cursor:'pointer',display:'flex',
                    alignItems:'center',gap:6,fontFamily:'Poppins,sans-serif',
                    transition:'all 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=a}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=b}>
                  <span>👍</span>
                  <span style={{color:t,fontWeight:700,fontSize:12}}>
                    {exam.thumbsUp}
                  </span>
                </button>
                <a href={exam.officialUrl} target="_blank" rel="noreferrer"
                  style={{background:bg,border:'1px solid '+b,borderRadius:20,
                    padding:'6px 14px',textDecoration:'none',
                    color:m,fontSize:12,fontWeight:600}}>
                  🔗 Official Site
                </a>
                <button onClick={()=>nav('/exam-board/'+exam.id+'/courses')}
                  style={{marginLeft:'auto',
                    background:'linear-gradient(135deg,'+p+','+a+')',
                    border:'none',borderRadius:20,padding:'7px 18px',
                    color:'#fff',fontWeight:700,fontSize:12,cursor:'pointer'}}>
                  {exam.courses} Courses · {exam.students.toLocaleString()} students →
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'48px',
            background:c,borderRadius:20,border:'1.5px dashed '+b}}>
            <div style={{fontSize:40,marginBottom:12}}>🔍</div>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 6px'}}>
              No exams found
            </p>
            <p style={{color:m,fontSize:13,margin:0}}>
              Try different filters or post a new exam notification
            </p>
          </div>
        )}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 4. EXAM COURSES — 30/60/90 day courses linked to exam
# ============================================================
w('src/pages/exam-board/ExamCourses.jsx', """// src/pages/exam-board/ExamCourses.jsx
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const COURSES = [
  {
    id:1, mentorName:'Dr. Kavitha R.', mentorCity:'Chennai',
    mentorRating:4.9, mentorStudents:48, mentorVerified:true,
    title:'UPSC 30-Day Prelims Marathon',
    duration:30, durationType:'marathon',
    price:499, enrolled:124, slots:20, startDate:'2026-07-01',
    includes:['Daily assignments + PDFs','Priority doubt resolution','Weekly mock test','Personal feedback'],
    subjects:['Polity','History','Geography','Economy','Science & Tech'],
    tag:'🔥 Most Popular',
  },
  {
    id:2, mentorName:'Priya C.', mentorCity:'Madurai',
    mentorRating:4.9, mentorStudents:52, mentorVerified:true,
    title:'UPSC 60-Day Sprinter — GS Complete',
    duration:60, durationType:'sprinter',
    price:899, enrolled:86, slots:15, startDate:'2026-07-01',
    includes:['Daily 2-hour structured content','3 weekly mock tests','Doubt priority','Essay guidance','Previous year analysis'],
    subjects:['GS 1','GS 2','GS 3','GS 4','Current Affairs'],
    tag:'⭐ Best Value',
  },
  {
    id:3, mentorName:'Suresh M.', mentorCity:'Kochi',
    mentorRating:4.8, mentorStudents:36, mentorVerified:true,
    title:'UPSC 90-Day Achiever — Full Syllabus',
    duration:90, durationType:'achiever',
    price:1499, enrolled:42, slots:10, startDate:'2026-07-01',
    includes:['Full syllabus daily coverage','4 weekly tests','Essay + Answer writing','Interview prep basics','Lifetime access to materials'],
    subjects:['All GS Papers','CSAT','Essay','Current Affairs','Optional Guidance'],
    tag:'👑 Premium',
  },
]

const DURATION_COLORS = {
  marathon:'#EF4444',
  sprinter:'#3B82F6',
  achiever:'#8B5CF6',
}

const DURATION_LABELS = {
  marathon:'30 Day Marathon',
  sprinter:'60 Day Sprinter',
  achiever:'90 Day Achiever',
}

export default function ExamCourses() {
  const { examId } = useParams()
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [selected, setSelected] = useState(null)
  const [payMethod, setPayMethod] = useState('razorpay')

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/exam-board')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Exam Board</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>
            🎯 Exam Preparation Courses
          </h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            UPSC Civil Services 2026 · Join a structured course
          </p>
        </div>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Duration explanation */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
          gap:10,marginBottom:20}}>
          {['marathon','sprinter','achiever'].map(type=>(
            <div key={type} style={{background:c,border:'2px solid '+DURATION_COLORS[type]+'30',
              borderRadius:14,padding:'14px',textAlign:'center'}}>
              <div style={{width:36,height:36,borderRadius:10,
                background:DURATION_COLORS[type]+'15',margin:'0 auto 8px',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:18}}>
                {type==='marathon'?'🔥':type==='sprinter'?'⚡':'👑'}
              </div>
              <p style={{color:DURATION_COLORS[type],fontWeight:800,
                fontSize:13,margin:'0 0 2px'}}>
                {DURATION_LABELS[type]}
              </p>
              <p style={{color:m,fontSize:10,margin:0}}>
                {type==='marathon'?'Quick focused revision':
                 type==='sprinter'?'Deep structured prep':
                 'Complete transformation'}
              </p>
            </div>
          ))}
        </div>

        {/* Course cards */}
        {COURSES.map(course => (
          <div key={course.id} style={{background:c,
            border:'2px solid '+(selected===course.id
              ?a:DURATION_COLORS[course.durationType]+'25'),
            borderRadius:20,marginBottom:16,overflow:'hidden',
            boxShadow:'0 2px 16px rgba(0,0,0,0.06)',transition:'all 0.2s'}}>

            {/* Tag */}
            <div style={{background:DURATION_COLORS[course.durationType],
              padding:'6px 16px',display:'flex',justifyContent:'space-between'}}>
              <span style={{color:'#fff',fontWeight:700,fontSize:12}}>
                {DURATION_LABELS[course.durationType]}
              </span>
              <span style={{color:'rgba(255,255,255,0.9)',fontSize:12,fontWeight:700}}>
                {course.tag}
              </span>
            </div>

            <div style={{padding:'18px'}}>
              {/* Mentor info */}
              <div style={{display:'flex',alignItems:'center',
                gap:10,marginBottom:12}}>
                <div style={{width:40,height:40,borderRadius:'50%',flexShrink:0,
                  background:'linear-gradient(135deg,'+p+','+a+')',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontWeight:700,fontSize:16,color:'#fff'}}>
                  {course.mentorName[0]}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{color:t,fontWeight:700,fontSize:13}}>
                      {course.mentorName}
                    </span>
                    {course.mentorVerified && (
                      <span style={{background:'#3B82F615',color:'#3B82F6',
                        fontSize:9,fontWeight:700,padding:'1px 6px',borderRadius:20}}>
                        ✓
                      </span>
                    )}
                  </div>
                  <span style={{color:m,fontSize:10}}>
                    ★ {course.mentorRating} · 📍 {course.mentorCity} ·
                    {course.mentorStudents} students
                  </span>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{color:t,fontWeight:900,fontSize:20,margin:'0 0 2px'}}>
                    ₹{course.price}
                  </p>
                  <p style={{color:m,fontSize:10,margin:0}}>one-time</p>
                </div>
              </div>

              <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 10px'}}>
                {course.title}
              </p>

              {/* What's included */}
              <div style={{marginBottom:12}}>
                {course.includes.map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',
                    gap:6,marginBottom:4}}>
                    <span style={{color:'#22C55E',fontSize:14}}>✓</span>
                    <span style={{color:m,fontSize:12}}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Subjects */}
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>
                {course.subjects.map(s=>(
                  <span key={s} style={{background:p+'08',color:p,
                    fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Slots + Start date */}
              <div style={{display:'flex',justifyContent:'space-between',
                marginBottom:12}}>
                <span style={{color:course.slots<5?'#EF4444':'#22C55E',
                  fontSize:11,fontWeight:700}}>
                  {course.slots<5?'⚠️ Only ':'✅ '}{course.slots} slots left
                </span>
                <span style={{color:m,fontSize:11}}>
                  Starts {new Date(course.startDate).toLocaleDateString('en-IN',
                    {day:'2-digit',month:'short',year:'numeric'})}
                </span>
                <span style={{color:m,fontSize:11}}>
                  {course.enrolled} enrolled
                </span>
              </div>

              {/* Enroll flow */}
              {selected === course.id ? (
                <div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',
                    gap:8,marginBottom:10}}>
                    {[
                      {id:'razorpay',label:'💳 Razorpay',sub:'Cards, UPI, Net Banking'},
                      {id:'upi',label:'📱 Google Pay / UPI',sub:'Direct UPI'},
                    ].map(method=>(
                      <button key={method.id} onClick={()=>setPayMethod(method.id)}
                        style={{padding:'10px',borderRadius:12,border:'2px solid',
                          cursor:'pointer',textAlign:'left',
                          borderColor:payMethod===method.id?a:b,
                          background:payMethod===method.id?a+'10':c}}>
                        <p style={{color:t,fontWeight:600,fontSize:12,margin:'0 0 2px'}}>
                          {method.label}
                        </p>
                        <p style={{color:m,fontSize:10,margin:0}}>{method.sub}</p>
                      </button>
                    ))}
                  </div>
                  <button style={{width:'100%',
                    background:'linear-gradient(135deg,'+p+','+a+')',
                    border:'none',borderRadius:14,padding:'14px',
                    color:'#fff',fontWeight:800,fontSize:14,cursor:'pointer'}}>
                    Enroll Now — ₹{course.price}
                  </button>
                  <button onClick={()=>setSelected(null)}
                    style={{width:'100%',marginTop:8,background:'transparent',
                      border:'none',color:m,fontSize:12,cursor:'pointer',
                      fontFamily:'Poppins,sans-serif'}}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={()=>setSelected(course.id)}
                  style={{width:'100%',
                    background:DURATION_COLORS[course.durationType],
                    border:'none',borderRadius:14,padding:'13px',
                    color:'#fff',fontWeight:800,fontSize:14,cursor:'pointer'}}>
                  Join {DURATION_LABELS[course.durationType]} — ₹{course.price}
                </button>
              )}
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
# 5. TRIO ROLE LOCK — Add to StudentSettings
# ============================================================
try:
    with open('src/pages/student/StudentSettings.jsx', 'r', encoding='utf-8') as f:
        ss = f.read()

    trio_section = """
  // Trio role progress (for role lock display)
  const TRIO_PROGRESS = {
    testsCompleted: 47,
    avgScore: 72,
    daysOnPlatform: 28,
    violations: 0,
    totalAnswers: 0,
    rating: 0,
  }
  const peerRequirements = {
    tests: {needed:100, have:TRIO_PROGRESS.testsCompleted},
    score: {needed:80, have:TRIO_PROGRESS.avgScore},
    days: {needed:60, have:TRIO_PROGRESS.daysOnPlatform},
  }
  const peerProgress = Math.min(100,
    Math.floor((
      Math.min(TRIO_PROGRESS.testsCompleted/100,1) +
      Math.min(TRIO_PROGRESS.avgScore/80,1) +
      Math.min(TRIO_PROGRESS.daysOnPlatform/60,1)
    )/3*100)
  )
"""

    trio_jsx = """
          {/* ── TRIO ROLE SYSTEM ── */}
          <div style={{background:c,border:'1px solid '+b,borderRadius:18,
            padding:'20px',marginBottom:16}}>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 4px'}}>
              🏅 Role & Unlock System
            </p>
            <p style={{color:m,fontSize:11,margin:'0 0 16px'}}>
              Earn roles by maintaining high performance consistently
            </p>

            {/* Student (current) */}
            <div style={{background:'#22C55E08',border:'1px solid #22C55E30',
              borderRadius:14,padding:'14px',marginBottom:10}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:24}}>🎓</span>
                <div style={{flex:1}}>
                  <p style={{color:'#22C55E',fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                    Student — Current Role ✅
                  </p>
                  <p style={{color:m,fontSize:11,margin:0}}>
                    Take tests · Ask doubts · Join courses · Earn coins
                  </p>
                </div>
              </div>
            </div>

            {/* Peer Tutor */}
            <div style={{background:peerProgress>=100?'#3B82F608':isDark?'rgba(255,255,255,0.03)':bg,
              border:'1.5px solid '+(peerProgress>=100?'#3B82F6':'#E2E8F0'),
              borderRadius:14,padding:'14px',marginBottom:10}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                <span style={{fontSize:24}}>{peerProgress>=100?'💡':'🔒'}</span>
                <div style={{flex:1}}>
                  <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                    Peer Tutor {peerProgress>=100?'— Unlocked!':'— Almost There'}
                  </p>
                  <p style={{color:m,fontSize:11,margin:0}}>
                    Answer doubts · Earn coins · Help fellow students
                  </p>
                </div>
                <span style={{color:peerProgress>=100?'#22C55E':a,
                  fontWeight:800,fontSize:14}}>
                  {peerProgress}%
                </span>
              </div>
              {peerProgress < 100 && (
                <>
                  <div style={{height:6,background:b,borderRadius:3,
                    overflow:'hidden',marginBottom:8}}>
                    <div style={{height:'100%',width:peerProgress+'%',
                      background:'linear-gradient(90deg,#3B82F6,#60A5FA)',
                      borderRadius:3,transition:'width 1s ease'}}/>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
                    {[
                      {label:'Tests Done',have:peerRequirements.tests.have,need:peerRequirements.tests.needed},
                      {label:'Avg Score',have:peerRequirements.score.have+'%',need:peerRequirements.score.needed+'%'},
                      {label:'Days Active',have:peerRequirements.days.have,need:peerRequirements.days.needed},
                    ].map((req,i)=>(
                      <div key={i} style={{background:c,border:'1px solid '+b,
                        borderRadius:8,padding:'6px 8px',textAlign:'center'}}>
                        <p style={{color:t,fontWeight:700,fontSize:11,margin:'0 0 2px'}}>
                          {req.have} / {req.need}
                        </p>
                        <p style={{color:m,fontSize:9,margin:0}}>{req.label}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mentor */}
            <div style={{background:isDark?'rgba(255,255,255,0.02)':bg,
              border:'1px solid '+b,borderRadius:14,padding:'14px',marginBottom:10,
              opacity:0.6}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:24}}>🔒</span>
                <div style={{flex:1}}>
                  <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                    Mentor — Unlock Peer Tutor first
                  </p>
                  <p style={{color:m,fontSize:11,margin:0}}>
                    Coach students · Earn income · Build reputation
                  </p>
                </div>
              </div>
            </div>

            {/* Institution */}
            <div style={{background:isDark?'rgba(255,255,255,0.02)':bg,
              border:'1px solid '+b,borderRadius:14,padding:'14px',opacity:0.5}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:24}}>🔒</span>
                <div style={{flex:1}}>
                  <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                    Institution — 10+ students + Mentor role
                  </p>
                  <p style={{color:m,fontSize:11,margin:0}}>
                    Run batches · Conduct tests · Generate reports
                  </p>
                </div>
              </div>
            </div>
          </div>
"""

    # Inject trio progress vars after component opens
    if 'TRIO_PROGRESS' not in ss:
        ss = re.sub(
            r'(export default function \w+\(\) \{)',
            r'\1' + trio_section,
            ss, count=1
        )
        # Inject trio JSX before the last closing </div>
        # Find a good insertion point - after theme section or near end
        ss = ss.replace(
            '<div style={{height:80}}/>',
            trio_jsx + '\n          <div style={{height:80}}/>',
            1
        )
        with open('src/pages/student/StudentSettings.jsx', 'w', encoding='utf-8') as f:
            f.write(ss)
        print('OK StudentSettings trio lock added')
    else:
        print('SKIP StudentSettings trio already exists')
except Exception as e:
    print('ERROR StudentSettings:', e)

# ============================================================
# 6. Enhanced StudentMentor Search
# ============================================================
try:
    with open('src/pages/student/StudentMentor.jsx', 'r', encoding='utf-8') as f:
        sm = f.read()

    # Add search box after filter tabs
    if 'Search mentors' not in sm:
        sm = sm.replace(
            "  const EXAMS = ['All','UPSC','SSC CGL','IBPS','TNPSC','RRB']",
            """  const EXAMS = ['All','UPSC','SSC CGL','IBPS','TNPSC','RRB']
  const LANGS = ['All','Tamil','Hindi','English','Telugu','Malayalam']
  const [search, setSearch] = useState('')
  const [langFilter, setLangFilter] = useState('All')
  const [minRating, setMinRating] = useState(0)
  const [priceSort, setPriceSort] = useState('none')"""
        )
        # Add search UI and fix filter
        sm = sm.replace(
            "        {/* Filter */}\n        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,marginBottom:16}}>",
            """        {/* Search box */}
        <div style={{position:'relative',marginBottom:12}}>
          <span style={{position:'absolute',left:14,top:'50%',
            transform:'translateY(-50%)',fontSize:16}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by name, subject, topic, city..."
            style={{width:'100%',padding:'11px 14px 11px 42px',borderRadius:14,
              border:'1.5px solid '+b,background:c,color:t,
              fontSize:13,outline:'none',fontFamily:'Poppins,sans-serif',
              boxSizing:'border-box'}}/>
        </div>

        {/* Language filter */}
        <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4,marginBottom:8}}>
          {LANGS.map(l=>(
            <button key={l} onClick={()=>setLangFilter(l)}
              style={{padding:'5px 12px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:11,fontWeight:700,flexShrink:0,
                background:langFilter===l?p+'15':'transparent',
                color:langFilter===l?p:m}}>
              🌐 {l}
            </button>
          ))}
          <select value={minRating} onChange={e=>setMinRating(Number(e.target.value))}
            style={{marginLeft:'auto',padding:'5px 10px',borderRadius:20,border:'1px solid '+b,
              background:c,color:t,fontSize:11,cursor:'pointer',outline:'none',flexShrink:0}}>
            <option value={0}>All Ratings</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4.8}>4.8+ Stars</option>
          </select>
        </div>

        {/* Exam filter */}
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,marginBottom:16}}>"""
        )
        # Fix filtered array to include search
        sm = sm.replace(
            "  const filtered = MENTORS.filter(m2 => filter==='All' || m2.exam.includes(filter))",
            """  const filtered = MENTORS
    .filter(m2 => filter==='All' || m2.exam.includes(filter))
    .filter(m2 => langFilter==='All' || m2.lang.includes(langFilter))
    .filter(m2 => m2.rating >= minRating)
    .filter(m2 => !search || m2.name.toLowerCase().includes(search.toLowerCase()) ||
      m2.subject.toLowerCase().includes(search.toLowerCase()) ||
      m2.city.toLowerCase().includes(search.toLowerCase()) ||
      m2.exam.toLowerCase().includes(search.toLowerCase()))"""
        )
        with open('src/pages/student/StudentMentor.jsx', 'w', encoding='utf-8') as f:
            f.write(sm)
        print('OK StudentMentor search enhanced')
    else:
        print('SKIP StudentMentor search already exists')
except Exception as e:
    print('ERROR StudentMentor:', e)

# ============================================================
# 7. Update App.jsx — add Exam Board + Courses routes
# ============================================================
try:
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        app = f.read()
    changed = False
    if 'ExamBoard' not in app:
        app = app.replace(
            "const MentorMaterials",
            "const ExamBoard    = lazy(() => import('./pages/exam-board/ExamBoard'))\nconst ExamCourses  = lazy(() => import('./pages/exam-board/ExamCourses'))\nconst MentorMaterials"
        )
        app = app.replace(
            "<Route path='/mentor-hub/materials'",
            "<Route path='/exam-board/:examId/courses' element={<ExamCourses/>}/>\n            <Route path='/exam-board' element={<ExamBoard/>}/>\n            <Route path='/mentor-hub/materials'"
        )
        changed = True
    if 'MentorCommunity' not in app:
        app = app.replace(
            "const MentorMaterials",
            "const MentorCommunity = lazy(() => import('./pages/mentor/MentorCommunity'))\nconst MentorSettings   = lazy(() => import('./pages/mentor/MentorSettings'))\nconst MentorMaterials"
        )
        app = app.replace(
            "<Route path='/mentor-hub/materials'",
            "<Route path='/mentor-hub/community' element={<MentorCommunity/>}/>\n            <Route path='/mentor-hub/settings'  element={<MentorSettings/>}/>\n            <Route path='/mentor-hub/materials'"
        )
        changed = True
    if changed:
        with open('src/App.jsx', 'w', encoding='utf-8') as f:
            f.write(app)
        print('OK App.jsx routes added')
    else:
        print('SKIP App.jsx routes already exist')
except Exception as e:
    print('ERROR App.jsx:', e)

# ============================================================
# 8. SQL for new tables
# ============================================================
w('supabase_v3_exam_board.sql', """-- TryIT Educations — Schema v3
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS exam_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  conducting_body TEXT NOT NULL,
  govt_type TEXT CHECK (govt_type IN ('central','state','university','school')),
  state TEXT DEFAULT 'All India',
  eligibility TEXT,
  app_open_date DATE,
  app_close_date DATE,
  exam_date DATE NOT NULL,
  result_date DATE,
  official_url TEXT NOT NULL,
  languages TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  thumbs_up INTEGER DEFAULT 0,
  pin_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_pinned_exams (
  user_id UUID REFERENCES profiles(id),
  exam_id UUID REFERENCES exam_notifications(id) ON DELETE CASCADE,
  pinned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, exam_id)
);

CREATE TABLE IF NOT EXISTS exam_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES profiles(id),
  exam_id UUID REFERENCES exam_notifications(id),
  title TEXT NOT NULL,
  duration_days INTEGER CHECK (duration_days IN (30,60,90)),
  price INTEGER NOT NULL,
  max_slots INTEGER DEFAULT 20,
  enrolled_count INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  includes TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES exam_courses(id),
  student_id UUID REFERENCES profiles(id),
  amount_paid INTEGER NOT NULL,
  payment_method TEXT,
  payment_id TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  UNIQUE (course_id, student_id)
);

ALTER TABLE exam_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_pinned_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exam_notif_read" ON exam_notifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "exam_notif_insert" ON exam_notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "pinned_read" ON user_pinned_exams FOR SELECT TO authenticated USING (true);
CREATE POLICY "pinned_insert" ON user_pinned_exams FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "courses_read" ON exam_courses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "courses_insert" ON exam_courses FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "enrollments_read" ON course_enrollments FOR SELECT TO authenticated USING (true);
CREATE POLICY "enrollments_insert" ON course_enrollments FOR INSERT TO authenticated WITH CHECK (true);

SELECT 'Schema v3 complete!' as status;
""")

print('')
print('ALL DONE!')
print('Run: npm run build 2>&1 | Select-Object -Last 3')
