import os

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

# ============================================================
# 1. HallHub — redirect to StudentHall (remove duplicate)
# ============================================================
w('src/pages/hall/HallHub.jsx', """// Redirect to standalone student hall page
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function HallHub() {
  const nav = useNavigate()
  useEffect(() => { nav('/student/hall', { replace: true }) }, [])
  return null
}
""")

# ============================================================
# 2. CreateHall — redirect to StudentHall
# ============================================================
w('src/pages/hall/CreateHall.jsx', """import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function CreateHall() {
  const nav = useNavigate()
  useEffect(() => { nav('/student/hall', { replace: true }) }, [])
  return null
}
""")

# ============================================================
# 3. PostDoubt — premium standalone (remove AppLayout)
# ============================================================
w('src/pages/guru/PostDoubt.jsx', """// src/pages/guru/PostDoubt.jsx — Premium standalone
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const EXAMS = [
  'UPSC CSE','UPSC CDS','SSC CGL','SSC CHSL','SSC MTS',
  'IBPS PO','IBPS Clerk','SBI PO','SBI Clerk',
  'RBI Grade B','TNPSC Group 1','TNPSC Group 2','TNPSC Group 4',
  'RRB NTPC','RRB Group D','NDA','CDS','NEET UG','JEE Main','GATE',
]
const SUBJECTS = [
  'Maths','Reasoning','English','GK / GS','Science',
  'History','Geography','Polity','Economics',
  'Current Affairs','Physics','Chemistry','Biology','Computer Science','Other',
]

export default function PostDoubt() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const isDark = theme?.isDark||false

  const [exam, setExam] = useState('')
  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async () => {
    if (!exam || !subject || !title.trim()) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setDone(true)
  }

  const inputStyle = {
    width:'100%', padding:'12px 14px', borderRadius:12,
    border:'1.5px solid '+b, background:isDark?'rgba(255,255,255,0.05)':c,
    color:t, fontSize:14, outline:'none', fontFamily:'Poppins,sans-serif',
    boxSizing:'border-box', transition:'border-color 0.2s',
  }

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10,
        boxShadow:'0 1px 12px rgba(0,0,0,0.06)'}}>
        <button onClick={()=>nav('/student/guruhub')}
          style={{background:'transparent',border:'1px solid '+b,borderRadius:10,
            padding:'7px 16px',color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>
          Back
        </button>
        <div>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>Post a Doubt</h1>
          <p style={{color:m,fontSize:11,margin:0}}>Well-framed doubts get faster answers</p>
        </div>
      </div>

      <div style={{padding:'24px 20px',maxWidth:640,margin:'0 auto'}}>

        {done ? (
          <div style={{textAlign:'center',padding:'48px 24px'}}>
            <div style={{fontSize:64,marginBottom:16}}>✅</div>
            <h2 style={{color:t,fontWeight:800,fontSize:22,margin:'0 0 8px'}}>Doubt Posted!</h2>
            <p style={{color:m,fontSize:14,margin:'0 0 24px'}}>
              Mentors will answer within 2 hours
            </p>
            <div style={{display:'flex',gap:12,justifyContent:'center'}}>
              <button onClick={()=>{setDone(false);setTitle('');setDesc('');setExam('');setSubject('')}}
                style={{background:'transparent',border:'1px solid '+b,borderRadius:14,
                  padding:'12px 24px',color:m,fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Post Another
              </button>
              <button onClick={()=>nav('/guru-hub/my-doubts')}
                style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
                  borderRadius:14,padding:'12px 24px',color:'#fff',fontWeight:700,
                  fontSize:13,cursor:'pointer'}}>
                View My Doubts
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Exam selector */}
            <div style={{marginBottom:20}}>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:13,marginBottom:8}}>
                Select Exam *
              </label>
              <select value={exam} onChange={e=>setExam(e.target.value)}
                style={{...inputStyle,cursor:'pointer',
                  border:'1.5px solid '+(exam?a:b)}}>
                <option value="">— Choose your exam —</option>
                {EXAMS.map(e=><option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            {/* Subject pills */}
            <div style={{marginBottom:20}}>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:13,marginBottom:10}}>
                Subject *
              </label>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {SUBJECTS.map(s=>(
                  <button key={s} onClick={()=>setSubject(s)}
                    style={{padding:'7px 14px',borderRadius:20,border:'1.5px solid',
                      cursor:'pointer',fontSize:12,fontWeight:600,transition:'all 0.15s',
                      borderColor:subject===s?a:b,
                      background:subject===s?a+'15':isDark?'rgba(255,255,255,0.05)':c,
                      color:subject===s?a:m}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div style={{marginBottom:16}}>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:13,marginBottom:8}}>
                Doubt Title *
              </label>
              <input value={title} onChange={e=>setTitle(e.target.value)}
                placeholder="State the core question in one sentence"
                style={{...inputStyle,borderColor:title?a:b}}
                onFocus={e=>e.target.style.borderColor=a}
                onBlur={e=>e.target.style.borderColor=title?a:b}/>
            </div>

            {/* Description */}
            <div style={{marginBottom:24}}>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:13,marginBottom:8}}>
                Detailed Description
              </label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)}
                placeholder="Share what you already know, what is confusing you, and where you got stuck..."
                rows={4}
                style={{...inputStyle,resize:'vertical',lineHeight:1.6}}
                onFocus={e=>e.target.style.borderColor=a}
                onBlur={e=>e.target.style.borderColor=b}/>
            </div>

            {/* Tip */}
            <div style={{background:a+'12',border:'1px solid '+a+'30',borderRadius:12,
              padding:'12px 16px',marginBottom:20}}>
              <p style={{color:a,fontSize:12,fontWeight:700,margin:'0 0 2px'}}>
                Tip for better answers
              </p>
              <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
                Include what you already tried, the exact concept confusing you,
                and which step in the solution you are stuck at.
              </p>
            </div>

            {/* Submit */}
            <button onClick={submit}
              disabled={!exam||!subject||!title.trim()||submitting}
              style={{width:'100%',
                background:(!exam||!subject||!title.trim())
                  ?b
                  :'linear-gradient(135deg,'+p+','+a+')',
                border:'none',borderRadius:16,padding:'16px',
                color:(!exam||!subject||!title.trim())?m:'#fff',
                fontWeight:800,fontSize:15,cursor:(!exam||!subject||!title.trim())?'not-allowed':'pointer',
                transition:'all 0.2s',opacity:submitting?0.7:1}}>
              {submitting ? 'Posting...' : 'Post Doubt'}
            </button>

            <div style={{height:80}}/>
          </>
        )}
      </div>
    </div>
  )
}
""")

# ============================================================
# 4. MyDoubts — premium standalone (remove AppLayout)
# ============================================================
w('src/pages/guru/MyDoubts.jsx', """// src/pages/guru/MyDoubts.jsx — Premium standalone
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const MOCK_DOUBTS = [
  {id:1,title:'Difference between Fundamental Rights and DPSP?',
   exam:'UPSC CSE',subject:'Polity',answers:3,time:'2h ago',status:'answered'},
  {id:2,title:'How to solve Time & Work problems in under 30 seconds?',
   exam:'SSC CGL',subject:'Maths',answers:7,time:'4h ago',status:'answered'},
  {id:3,title:'What is the significance of the Preamble?',
   exam:'UPSC CSE',subject:'Polity',answers:0,time:'1h ago',status:'pending'},
  {id:4,title:'Difference between NDA and CDS exam pattern?',
   exam:'NDA',subject:'GK / GS',answers:2,time:'6h ago',status:'answered'},
  {id:5,title:'How is the Rajya Sabha different from Lok Sabha in composition?',
   exam:'TNPSC Group 1',subject:'Polity',answers:0,time:'30m ago',status:'pending'},
]

const FILTERS = ['All', 'Answered', 'Pending']

export default function MyDoubts() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const isDark = theme?.isDark||false

  const [filter, setFilter] = useState('All')

  const filtered = MOCK_DOUBTS.filter(d => {
    if (filter === 'All') return true
    if (filter === 'Answered') return d.status === 'answered'
    return d.status === 'pending'
  })

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10,
        boxShadow:'0 1px 12px rgba(0,0,0,0.06)'}}>
        <button onClick={()=>nav('/student/guruhub')}
          style={{background:'transparent',border:'1px solid '+b,borderRadius:10,
            padding:'7px 16px',color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>
          Back
        </button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>My Doubts</h1>
          <p style={{color:m,fontSize:11,margin:0}}>{MOCK_DOUBTS.length} doubts posted</p>
        </div>
        <button onClick={()=>nav('/guru-hub/post-doubt')}
          style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
            borderRadius:12,padding:'9px 16px',color:'#fff',
            fontWeight:700,fontSize:12,cursor:'pointer'}}>
          + New Doubt
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:640,margin:'0 auto'}}>

        {/* Stats row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:20}}>
          {[
            {l:'Total',v:MOCK_DOUBTS.length,e:'📝'},
            {l:'Answered',v:MOCK_DOUBTS.filter(d=>d.status==='answered').length,e:'✅'},
            {l:'Pending',v:MOCK_DOUBTS.filter(d=>d.status==='pending').length,e:'⏳'},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'14px',textAlign:'center',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:20,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'7px 18px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:700,transition:'all 0.2s',
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m,
                boxShadow:filter===f?'0 4px 12px '+p+'33':'none'}}>
              {f}
            </button>
          ))}
        </div>

        {/* Doubt cards */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {filtered.map(d=>(
            <div key={d.id}
              style={{background:c,border:'1px solid '+b,borderRadius:16,
                padding:'16px',cursor:'pointer',transition:'all 0.2s',
                boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=a;
                e.currentTarget.style.transform='translateY(-2px)';
                e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=b;
                e.currentTarget.style.transform='translateY(0)';
                e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'}}>

              <div style={{display:'flex',gap:8,marginBottom:8,flexWrap:'wrap'}}>
                <span style={{background:p+'12',color:p,fontSize:9,fontWeight:700,
                  padding:'3px 10px',borderRadius:20}}>{d.exam}</span>
                <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                  padding:'3px 10px',borderRadius:20}}>{d.subject}</span>
                <span style={{background:d.status==='answered'?'#22C55E15':'#F59E0B15',
                  color:d.status==='answered'?'#22C55E':'#F59E0B',
                  fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20,
                  marginLeft:'auto'}}>
                  {d.status==='answered'?'✓ Answered':'⏳ Pending'}
                </span>
              </div>

              <p style={{color:t,fontWeight:600,fontSize:14,margin:'0 0 10px',lineHeight:1.5}}>
                {d.title}
              </p>

              <div style={{display:'flex',gap:16,alignItems:'center'}}>
                <span style={{color:m,fontSize:11}}>
                  {d.answers > 0 ? '💬 '+d.answers+' answers' : '💬 No answers yet'}
                </span>
                <span style={{color:m,fontSize:11}}>🕐 {d.time}</span>
                {d.status==='answered'&&(
                  <span style={{marginLeft:'auto',color:a,fontSize:11,fontWeight:700,
                    cursor:'pointer'}}
                    onClick={()=>nav('/guru-hub/'+d.id)}>
                    View answers →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'40px 20px',
            background:c,border:'1.5px dashed '+b,borderRadius:18}}>
            <div style={{fontSize:40,marginBottom:12}}>🤔</div>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 6px'}}>
              No {filter.toLowerCase()} doubts yet
            </p>
            <p style={{color:m,fontSize:12,margin:'0 0 16px'}}>
              Post a doubt and get answers from mentors within 2 hours
            </p>
            <button onClick={()=>nav('/guru-hub/post-doubt')}
              style={{background:'linear-gradient(135deg,'+p+','+a+')',
                border:'none',borderRadius:12,padding:'10px 24px',
                color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
              Ask a Doubt →
            </button>
          </div>
        )}

        <div style={{height:80}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 5. Fix StudentGuruHub nav — keep /guru-hub links (now fixed)
# ============================================================
print('OK all pages fixed')
print('')
print('Now run: npm run build 2>&1 | Select-Object -Last 3')
