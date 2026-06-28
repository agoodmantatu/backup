import os

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

# ============================================================
# 1. INSTITUTION REGISTER
# ============================================================
w('src/pages/institution/InstitutionRegister.jsx', """// src/pages/institution/InstitutionRegister.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const TYPES = [
  {id:'school',      icon:'🏫', label:'School',          sub:'Classes 1-12'},
  {id:'college',     icon:'🎓', label:'College',          sub:'UG / PG / Research'},
  {id:'coaching',    icon:'📚', label:'Coaching Centre',  sub:'Competitive exams'},
  {id:'tuition',     icon:'🏠', label:'Tuition Centre',   sub:'Subject specialist'},
  {id:'online',      icon:'💻', label:'Online Only',      sub:'No physical location'},
  {id:'independent', icon:'👤', label:'Independent',      sub:'Solo teacher / trainer'},
]

const FEE_MODELS = [
  {id:'free',     icon:'🆓', label:'Free',         sub:'No app payment — collect offline'},
  {id:'per_hall', icon:'🏛️', label:'Per Hall Fee', sub:'Student pays per hall joined'},
  {id:'pass',     icon:'🎟️', label:'Institution Pass', sub:'One price — all halls access'},
]

const EXAMS = ['UPSC CSE','SSC CGL','TNPSC Group 1','IBPS PO','NEET UG','JEE Main',
  'RRB NTPC','State PSC','School Board','College Entrance','Other']

export default function InstitutionRegister() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name:'', type:'', city:'', state:'', pincode:'',
    specialization:[], feeModel:'free', passPrice:'',
    ownerName:'', ownerPhone:'', description:'',
  })
  const [submitting, setSubmitting] = useState(false)

  const update = (key, val) => setForm(prev => ({...prev, [key]:val}))
  const toggleSpec = (exam) => {
    setForm(prev => ({...prev,
      specialization: prev.specialization.includes(exam)
        ? prev.specialization.filter(e=>e!==exam)
        : [...prev.specialization, exam]
    }))
  }

  const canNext1 = form.name.trim() && form.type && form.city && form.state
  const canNext2 = form.specialization.length > 0 && form.feeModel
  const canSubmit = form.ownerName.trim() && form.ownerPhone.trim()

  const submit = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    nav('/institution')
  }

  const inp = {
    width:'100%', padding:'11px 14px', borderRadius:12,
    border:'1.5px solid '+b, background:bg, color:t,
    fontSize:14, outline:'none', fontFamily:'Poppins,sans-serif',
    boxSizing:'border-box',
  }

  const STEPS = ['Basic Info','Specialization & Fees','Owner Details']

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,'+p+','+p+'dd)',
        padding:'20px'}}>
        <div style={{maxWidth:560,margin:'0 auto'}}>
          <button onClick={()=>nav('/student')} style={{background:'rgba(255,255,255,0.15)',
            border:'1px solid rgba(255,255,255,0.2)',borderRadius:10,
            padding:'6px 14px',color:'#fff',fontSize:13,cursor:'pointer',
            marginBottom:16}}>
            ← Back
          </button>
          <h1 style={{color:'#fff',fontWeight:800,fontSize:22,margin:'0 0 4px'}}>
            🏫 Register Your Institution
          </h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,margin:'0 0 20px'}}>
            School · College · Coaching · Tuition · Online — anyone can start
          </p>

          {/* Step indicator */}
          <div style={{display:'flex',gap:0}}>
            {STEPS.map((s,i)=>(
              <div key={i} style={{flex:1,display:'flex',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
                  <div style={{width:28,height:28,borderRadius:'50%',
                    background:step>i+1?'#22C55E':step===i+1?a:'rgba(255,255,255,0.2)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontWeight:700,fontSize:12,color:step>=i+1?p:'rgba(255,255,255,0.5)',
                    marginBottom:4,transition:'all 0.3s'}}>
                    {step>i+1?'✓':i+1}
                  </div>
                  <p style={{color:step>=i+1?'#fff':'rgba(255,255,255,0.4)',
                    fontSize:9,fontWeight:600,margin:0,textAlign:'center'}}>
                    {s}
                  </p>
                </div>
                {i < STEPS.length-1 && (
                  <div style={{height:2,width:32,
                    background:step>i+1?'#22C55E':'rgba(255,255,255,0.2)',
                    marginBottom:16,transition:'background 0.3s'}}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:'24px 20px',maxWidth:560,margin:'0 auto'}}>

        {/* STEP 1 */}
        {step===1 && (
          <div>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 16px'}}>
              What kind of institution?
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
              {TYPES.map(type=>(
                <button key={type.id} onClick={()=>update('type',type.id)}
                  style={{background:form.type===type.id?p+'08':c,
                    border:'2px solid '+(form.type===type.id?p:b),
                    borderRadius:16,padding:'14px',cursor:'pointer',
                    textAlign:'left',transition:'all 0.2s'}}>
                  <div style={{fontSize:24,marginBottom:6}}>{type.icon}</div>
                  <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                    {type.label}
                  </p>
                  <p style={{color:m,fontSize:10,margin:0}}>{type.sub}</p>
                </button>
              ))}
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:20}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  Institution Name *
                </label>
                <input value={form.name} onChange={e=>update('name',e.target.value)}
                  placeholder="e.g. Sri Vidya Academy, Kavi Coaching Centre"
                  style={inp}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <div>
                  <label style={{display:'block',color:t,fontWeight:700,
                    fontSize:12,marginBottom:6}}>City *</label>
                  <input value={form.city} onChange={e=>update('city',e.target.value)}
                    placeholder="City" style={inp}/>
                </div>
                <div>
                  <label style={{display:'block',color:t,fontWeight:700,
                    fontSize:12,marginBottom:6}}>State *</label>
                  <input value={form.state} onChange={e=>update('state',e.target.value)}
                    placeholder="State" style={inp}/>
                </div>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  About (optional)
                </label>
                <textarea value={form.description}
                  onChange={e=>update('description',e.target.value)}
                  placeholder="Brief description of your institution..."
                  rows={3}
                  style={{...inp,resize:'vertical',lineHeight:1.6}}/>
              </div>
            </div>

            <button onClick={()=>setStep(2)} disabled={!canNext1}
              style={{width:'100%',
                background:canNext1?'linear-gradient(135deg,'+p+','+a+')':b,
                border:'none',borderRadius:14,padding:'14px',
                color:canNext1?'#fff':m,fontWeight:800,fontSize:14,cursor:'pointer'}}>
              Next — Specialization →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step===2 && (
          <div>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 6px'}}>
              What do you specialize in?
            </p>
            <p style={{color:m,fontSize:11,margin:'0 0 14px'}}>
              Select all that apply
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
              {EXAMS.map(exam=>(
                <button key={exam} onClick={()=>toggleSpec(exam)}
                  style={{padding:'8px 16px',borderRadius:20,border:'2px solid',
                    cursor:'pointer',fontSize:12,fontWeight:700,
                    borderColor:form.specialization.includes(exam)?a:b,
                    background:form.specialization.includes(exam)?a+'15':bg,
                    color:form.specialization.includes(exam)?a:m,
                    transition:'all 0.15s'}}>
                  {exam}
                </button>
              ))}
            </div>

            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 6px'}}>
              How will students pay?
            </p>
            <p style={{color:m,fontSize:11,margin:'0 0 12px'}}>
              You decide — you can change this anytime
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
              {FEE_MODELS.map(model=>(
                <button key={model.id} onClick={()=>update('feeModel',model.id)}
                  style={{background:form.feeModel===model.id?p+'08':c,
                    border:'2px solid '+(form.feeModel===model.id?p:b),
                    borderRadius:14,padding:'14px 16px',cursor:'pointer',
                    textAlign:'left',display:'flex',alignItems:'center',
                    gap:12,transition:'all 0.2s'}}>
                  <span style={{fontSize:24}}>{model.icon}</span>
                  <div style={{flex:1}}>
                    <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
                      {model.label}
                    </p>
                    <p style={{color:m,fontSize:11,margin:0}}>{model.sub}</p>
                  </div>
                  <div style={{width:20,height:20,borderRadius:'50%',
                    border:'2px solid '+(form.feeModel===model.id?p:b),
                    background:form.feeModel===model.id?p:'transparent',
                    flexShrink:0}}/>
                </button>
              ))}
            </div>

            {form.feeModel==='pass' && (
              <div style={{marginBottom:20}}>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>
                  Institution Pass Price (₹/month)
                </label>
                <input value={form.passPrice} type="number"
                  onChange={e=>update('passPrice',e.target.value)}
                  placeholder="e.g. 499"
                  style={inp}/>
              </div>
            )}

            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setStep(1)}
                style={{flex:1,background:'transparent',border:'1px solid '+b,
                  borderRadius:14,padding:'13px',color:m,
                  fontWeight:700,fontSize:13,cursor:'pointer'}}>
                ← Back
              </button>
              <button onClick={()=>setStep(3)} disabled={!canNext2}
                style={{flex:2,
                  background:canNext2?'linear-gradient(135deg,'+p+','+a+')':b,
                  border:'none',borderRadius:14,padding:'13px',
                  color:canNext2?'#fff':m,fontWeight:800,fontSize:13,cursor:'pointer'}}>
                Next — Owner Details →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step===3 && (
          <div>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 16px'}}>
              Owner / Admin Contact
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:20}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>Your Name *</label>
                <input value={form.ownerName}
                  onChange={e=>update('ownerName',e.target.value)}
                  placeholder="Full name" style={inp}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>Phone Number *</label>
                <input value={form.ownerPhone}
                  onChange={e=>update('ownerPhone',e.target.value)}
                  placeholder="10-digit mobile number" style={inp}/>
              </div>
            </div>

            {/* Summary */}
            <div style={{background:p+'08',border:'1px solid '+p+'20',
              borderRadius:14,padding:'16px',marginBottom:20}}>
              <p style={{color:p,fontWeight:700,fontSize:13,margin:'0 0 10px'}}>
                📋 Registration Summary
              </p>
              {[
                {l:'Institution', v:form.name},
                {l:'Type', v:TYPES.find(x=>x.id===form.type)?.label||''},
                {l:'Location', v:form.city+', '+form.state},
                {l:'Specialization', v:form.specialization.join(', ')||'None'},
                {l:'Fee Model', v:FEE_MODELS.find(x=>x.id===form.feeModel)?.label||''},
              ].map((row,i)=>(
                <div key={i} style={{display:'flex',gap:8,marginBottom:6}}>
                  <span style={{color:m,fontSize:12,minWidth:100}}>{row.l}:</span>
                  <span style={{color:t,fontSize:12,fontWeight:600,flex:1}}>
                    {row.v||'—'}
                  </span>
                </div>
              ))}
            </div>

            <div style={{background:a+'10',border:'1px solid '+a+'25',
              borderRadius:12,padding:'12px 14px',marginBottom:16}}>
              <p style={{color:a,fontWeight:700,fontSize:11,margin:'0 0 4px'}}>
                📋 IP & Content Agreement
              </p>
              <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
                All question papers and materials uploaded to TryIT are assigned
                to TryIT Educations permanently and may be used in platform
                content. TryIT earns 15% of all in-app payments made to
                this institution.
              </p>
            </div>

            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setStep(2)}
                style={{flex:1,background:'transparent',border:'1px solid '+b,
                  borderRadius:14,padding:'13px',color:m,
                  fontWeight:700,fontSize:13,cursor:'pointer'}}>
                ← Back
              </button>
              <button onClick={submit} disabled={!canSubmit||submitting}
                style={{flex:2,
                  background:canSubmit?'linear-gradient(135deg,'+p+','+a+')':b,
                  border:'none',borderRadius:14,padding:'13px',
                  color:canSubmit?'#fff':m,fontWeight:800,fontSize:13,
                  cursor:'pointer',opacity:submitting?0.7:1}}>
                {submitting?'Registering...':'🏫 Register Institution'}
              </button>
            </div>
          </div>
        )}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 2. INSTITUTION DASHBOARD
# ============================================================
w('src/pages/institution/InstitutionDashboard.jsx', """// src/pages/institution/InstitutionDashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  {icon:'🏠', label:'Dashboard',  path:'/institution'},
  {icon:'🏛️', label:'Halls',      path:'/institution/halls'},
  {icon:'👨‍🏫', label:'Mentors',    path:'/institution/mentors'},
  {icon:'📚', label:'Homework',   path:'/institution/homework'},
  {icon:'📋', label:'Exams',      path:'/institution/exams'},
  {icon:'👥', label:'Students',   path:'/institution/students'},
  {icon:'💰', label:'Revenue',    path:'/institution/revenue'},
  {icon:'⚙️', label:'Settings',   path:'/institution/settings'},
]

const STATS = [
  {icon:'🏛️', label:'Active Halls',    val:'4',     color:'#3B82F6'},
  {icon:'👨‍🎓', label:'Total Students',  val:'875',   color:'#22C55E'},
  {icon:'👨‍🏫', label:'Mentors',         val:'6',     color:'#8B5CF6'},
  {icon:'📝', label:'Exams This Month', val:'12',    color:'#F59E0B'},
  {icon:'📚', label:'Homework Pending', val:'3',     color:'#EF4444'},
  {icon:'💰', label:'Revenue (Month)',  val:'₹42,500', color:'#22C55E'},
]

const HALLS = [
  {id:1, name:'UPSC Morning Batch', exam:'UPSC CSE', mentors:2, students:240, fee:500, feeType:'per_hall', active:true},
  {id:2, name:'SSC CGL Evening',    exam:'SSC CGL',  mentors:1, students:180, fee:300, feeType:'per_hall', active:true},
  {id:3, name:'Class 10 Science',   exam:'School Board', mentors:1, students:35, fee:0, feeType:'free', active:true},
  {id:4, name:'TNPSC Tamil Nadu',   exam:'TNPSC Group 1', mentors:2, students:420, fee:400, feeType:'per_hall', active:true},
]

const RECENT_ACTIVITY = [
  {icon:'📝', text:'Priya R. submitted homework in UPSC Morning Batch', time:'10m ago'},
  {icon:'👤', text:'New student Karthik M. joined SSC CGL Evening',     time:'25m ago'},
  {icon:'📋', text:'Mentor Suresh posted new assignment in Hall 2',     time:'1h ago'},
  {icon:'🎯', text:'UPSC Mock Test completed — 234 students appeared',  time:'3h ago'},
  {icon:'💰', text:'₹15,000 collected from Hall 4 enrollments',         time:'5h ago'},
]

export default function InstitutionDashboard() {
  const nav = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 900)
      if (window.innerWidth >= 900) setSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const Sidebar = () => (
    <div style={{
      width:220, background:p, minHeight:'100vh',
      position:'fixed', top:0,
      left: isMobile ? (sidebarOpen ? 0 : -240) : 0,
      zIndex:200, display:'flex', flexDirection:'column',
      transition:'left 0.3s ease',
      boxShadow: isMobile && sidebarOpen ? '4px 0 20px rgba(0,0,0,0.3)' : 'none',
    }}>
      <div style={{padding:'18px 16px',
        borderBottom:'1px solid rgba(255,255,255,0.1)',
        display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <p style={{color:a,fontWeight:800,fontSize:13,margin:'0 0 2px'}}>
            🏫 TryIT Institution
          </p>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:10,margin:0}}>
            {user?.name||'Institution Admin'}
          </p>
        </div>
        {isMobile && (
          <button onClick={()=>setSidebarOpen(false)}
            style={{background:'rgba(255,255,255,0.1)',border:'none',
              borderRadius:8,width:28,height:28,color:'#fff',
              fontSize:16,cursor:'pointer'}}>✕</button>
        )}
      </div>

      <div style={{flex:1,padding:'12px 8px',overflowY:'auto'}}>
        {NAV.map((n,i) => {
          const isActive = location.pathname === n.path
          return (
            <button key={i} onClick={()=>{nav(n.path);if(isMobile)setSidebarOpen(false)}}
              style={{width:'100%',display:'flex',alignItems:'center',gap:10,
                padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',
                marginBottom:2,textAlign:'left',
                background: isActive?'rgba(255,255,255,0.18)':'transparent',
                color: isActive?'#fff':'rgba(255,255,255,0.72)',
                fontFamily:'Poppins,sans-serif',fontWeight:600,fontSize:13,
                transition:'all 0.15s'}}>
              <span style={{fontSize:17}}>{n.icon}</span>
              <span style={{flex:1}}>{n.label}</span>
              {isActive && <div style={{width:6,height:6,borderRadius:'50%',background:a}}/>}
            </button>
          )
        })}
      </div>

      <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.1)'}}>
        <p onClick={()=>nav('/student')}
          style={{color:'rgba(255,255,255,0.4)',fontSize:11,cursor:'pointer',
            margin:0,textAlign:'center',fontFamily:'Poppins,sans-serif'}}>
          Switch to student view →
        </p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif',display:'flex'}}>
      <Sidebar/>
      {isMobile && sidebarOpen && (
        <div onClick={()=>setSidebarOpen(false)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:199}}/>
      )}

      <div style={{marginLeft: isMobile?0:220, flex:1}}>

        {/* Topbar */}
        <div style={{background:c,borderBottom:'1px solid '+b,padding:'14px 20px',
          display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
          {isMobile && (
            <button onClick={()=>setSidebarOpen(true)}
              style={{background:'transparent',border:'1px solid '+b,
                borderRadius:8,padding:'6px 10px',cursor:'pointer',
                fontSize:18,color:t}}>☰</button>
          )}
          <div style={{flex:1}}>
            <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>
              Institution Dashboard
            </h1>
            <p style={{color:m,fontSize:11,margin:0}}>
              875 students · 4 halls · 6 mentors
            </p>
          </div>
          <button style={{position:'relative',background:'transparent',
            border:'1px solid '+b,borderRadius:10,padding:'7px 12px',
            color:t,fontSize:13,cursor:'pointer'}}>
            🔔
            <span style={{position:'absolute',top:4,right:4,width:7,height:7,
              borderRadius:'50%',background:'#EF4444',border:'1.5px solid '+c}}/>
          </button>
          <button onClick={()=>nav('/institution/halls')}
            style={{background:'linear-gradient(135deg,'+p+','+a+')',
              border:'none',borderRadius:12,padding:'9px 18px',
              color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
            + New Hall
          </button>
        </div>

        <div style={{padding:'20px',maxWidth:1100,margin:'0 auto'}}>

          {/* Stats grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',
            gap:10,marginBottom:20}}>
            {STATS.map((s,i)=>(
              <div key={i} style={{background:c,border:'1px solid '+b,
                borderRadius:14,padding:'14px 10px',textAlign:'center',
                boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
                <p style={{color:t,fontWeight:800,fontSize:15,margin:'0 0 2px'}}>{s.val}</p>
                <p style={{color:m,fontSize:9,margin:0,lineHeight:1.3}}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:20,marginBottom:20}}>

            {/* Halls overview */}
            <div style={{background:c,border:'1px solid '+b,borderRadius:18,overflow:'hidden'}}>
              <div style={{padding:'14px 16px',borderBottom:'1px solid '+b,
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>🏛️ Halls Overview</p>
                <button onClick={()=>nav('/institution/halls')}
                  style={{background:'transparent',border:'none',color:a,
                    fontSize:12,fontWeight:700,cursor:'pointer'}}>
                  Manage →
                </button>
              </div>
              {HALLS.map((hall,i)=>(
                <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid '+b,
                  display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:36,height:36,borderRadius:10,flexShrink:0,
                    background:'linear-gradient(135deg,'+p+','+a+')',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:16}}>🏛️</div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 2px',
                      overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                      {hall.name}
                    </p>
                    <div style={{display:'flex',gap:8}}>
                      <span style={{color:m,fontSize:10}}>👨‍🎓 {hall.students}</span>
                      <span style={{color:m,fontSize:10}}>👨‍🏫 {hall.mentors} mentors</span>
                      <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                        padding:'1px 6px',borderRadius:20}}>{hall.exam}</span>
                    </div>
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    <p style={{color:hall.feeType==='free'?m:a,
                      fontWeight:700,fontSize:12,margin:'0 0 2px'}}>
                      {hall.feeType==='free'?'Free':'₹'+hall.fee+'/mo'}
                    </p>
                    <span style={{background:'#22C55E15',color:'#22C55E',
                      fontSize:9,fontWeight:700,padding:'1px 6px',borderRadius:20}}>
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{background:c,border:'1px solid '+b,borderRadius:18,overflow:'hidden'}}>
              <div style={{padding:'14px 16px',borderBottom:'1px solid '+b}}>
                <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>
                  ⚡ Recent Activity
                </p>
              </div>
              {RECENT_ACTIVITY.map((act,i)=>(
                <div key={i} style={{padding:'10px 16px',borderBottom:'1px solid '+b,
                  display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{fontSize:16,flexShrink:0}}>{act.icon}</span>
                  <div style={{flex:1}}>
                    <p style={{color:t,fontSize:11,fontWeight:500,margin:'0 0 2px',
                      lineHeight:1.4}}>{act.text}</p>
                    <span style={{color:m,fontSize:9}}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
            {[
              {icon:'🏛️',label:'Create Hall',   path:'/institution/halls',   color:'#3B82F6'},
              {icon:'👨‍🏫',label:'Add Mentor',   path:'/institution/mentors', color:'#8B5CF6'},
              {icon:'📚',label:'Post Homework', path:'/institution/homework', color:'#F59E0B'},
              {icon:'📋',label:'Schedule Exam', path:'/institution/exams',    color:'#EF4444'},
            ].map((action,i)=>(
              <button key={i} onClick={()=>nav(action.path)}
                style={{background:c,border:'1px solid '+b,borderRadius:16,
                  padding:'18px 12px',cursor:'pointer',textAlign:'center',
                  transition:'all 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=action.color;
                  e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=b;
                  e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{width:44,height:44,borderRadius:12,
                  background:action.color+'15',margin:'0 auto 10px',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:22}}>
                  {action.icon}
                </div>
                <p style={{color:t,fontWeight:700,fontSize:12,margin:0}}>
                  {action.label}
                </p>
              </button>
            ))}
          </div>
          <div style={{height:40}}/>
        </div>
      </div>
    </div>
  )
}
""")

# ============================================================
# 3. HALLS MANAGER
# ============================================================
w('src/pages/institution/InstitutionHalls.jsx', """// src/pages/institution/InstitutionHalls.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const EXAMS = ['UPSC CSE','SSC CGL','TNPSC Group 1','IBPS PO','NEET UG',
  'JEE Main','RRB NTPC','Class 10','Class 12','College','Other']

const INIT_HALLS = [
  {id:1,name:'UPSC Morning Batch',exam:'UPSC CSE',mentors:2,students:240,
   fee:500,feeType:'per_hall',schedule:'Mon-Fri 6AM-8AM',maxStudents:300,active:true},
  {id:2,name:'SSC CGL Evening',exam:'SSC CGL',mentors:1,students:180,
   fee:300,feeType:'per_hall',schedule:'Mon-Sat 6PM-8PM',maxStudents:200,active:true},
  {id:3,name:'Class 10 Science',exam:'Class 10',mentors:1,students:35,
   fee:0,feeType:'free',schedule:'Daily 4PM-6PM',maxStudents:50,active:true},
  {id:4,name:'TNPSC Tamil Nadu',exam:'TNPSC Group 1',mentors:2,students:420,
   fee:400,feeType:'per_hall',schedule:'Weekend 8AM-12PM',maxStudents:500,active:true},
]

export default function InstitutionHalls() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [halls, setHalls] = useState(INIT_HALLS)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({name:'',exam:'',feeType:'free',
    fee:'',schedule:'',maxStudents:'',description:''})

  const up = (k,v) => setForm(prev=>({...prev,[k]:v}))

  const createHall = () => {
    if (!form.name.trim() || !form.exam) return
    setHalls(prev=>[...prev,{
      id:Date.now(), name:form.name, exam:form.exam,
      mentors:0, students:0,
      fee:parseInt(form.fee||0), feeType:form.feeType,
      schedule:form.schedule, maxStudents:parseInt(form.maxStudents||100),
      active:true,
    }])
    setForm({name:'',exam:'',feeType:'free',fee:'',schedule:'',maxStudents:'',description:''})
    setShowCreate(false)
  }

  const inp = {width:'100%',padding:'10px 12px',borderRadius:10,
    border:'1.5px solid '+b,background:bg,color:t,fontSize:13,
    outline:'none',fontFamily:'Poppins,sans-serif',boxSizing:'border-box'}

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/institution')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>🏛️ Halls</h1>
          <p style={{color:m,fontSize:11,margin:0}}>{halls.length} halls · {halls.reduce((s,h)=>s+h.students,0)} total students</p>
        </div>
        <button onClick={()=>setShowCreate(!showCreate)}
          style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
            borderRadius:12,padding:'9px 18px',color:'#fff',fontWeight:700,
            fontSize:13,cursor:'pointer'}}>
          + Create Hall
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:900,margin:'0 auto'}}>

        {/* Create form */}
        {showCreate && (
          <div style={{background:c,border:'1.5px solid '+a,borderRadius:20,
            padding:'20px',marginBottom:20}}>
            <p style={{color:t,fontWeight:700,fontSize:15,margin:'0 0 16px'}}>
              Create New Hall
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  Hall Name *
                </label>
                <input value={form.name} onChange={e=>up('name',e.target.value)}
                  placeholder="e.g. UPSC Morning Batch 2026" style={inp}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  Exam Focus *
                </label>
                <select value={form.exam} onChange={e=>up('exam',e.target.value)}
                  style={{...inp,cursor:'pointer'}}>
                  <option value="">Select exam</option>
                  {EXAMS.map(e=><option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  Schedule
                </label>
                <input value={form.schedule} onChange={e=>up('schedule',e.target.value)}
                  placeholder="e.g. Mon-Fri 6AM-8AM" style={inp}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  Max Students
                </label>
                <input value={form.maxStudents} type="number"
                  onChange={e=>up('maxStudents',e.target.value)}
                  placeholder="e.g. 300" style={inp}/>
              </div>
            </div>

            <div style={{marginBottom:12}}>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:8}}>
                Fee Type
              </label>
              <div style={{display:'flex',gap:8}}>
                {[
                  {id:'free',label:'Free'},
                  {id:'per_hall',label:'Paid (per hall)'},
                  {id:'pass',label:'Institution Pass'},
                ].map(ft=>(
                  <button key={ft.id} onClick={()=>up('feeType',ft.id)}
                    style={{padding:'7px 14px',borderRadius:20,border:'1.5px solid',
                      cursor:'pointer',fontSize:12,fontWeight:700,
                      borderColor:form.feeType===ft.id?a:b,
                      background:form.feeType===ft.id?a+'15':bg,
                      color:form.feeType===ft.id?a:m}}>
                    {ft.label}
                  </button>
                ))}
              </div>
            </div>

            {form.feeType!=='free' && (
              <div style={{marginBottom:12}}>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  Monthly Fee (₹)
                </label>
                <input value={form.fee} type="number"
                  onChange={e=>up('fee',e.target.value)}
                  placeholder="e.g. 500" style={{...inp,width:'50%'}}/>
              </div>
            )}

            <div style={{display:'flex',gap:8}}>
              <button onClick={createHall}
                disabled={!form.name.trim()||!form.exam}
                style={{flex:1,
                  background:(!form.name.trim()||!form.exam)?b
                    :'linear-gradient(135deg,'+p+','+a+')',
                  border:'none',borderRadius:12,padding:'12px',
                  color:(!form.name.trim()||!form.exam)?m:'#fff',
                  fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Create Hall
              </button>
              <button onClick={()=>setShowCreate(false)}
                style={{background:'transparent',border:'1px solid '+b,
                  borderRadius:12,padding:'12px 20px',color:m,
                  fontWeight:600,fontSize:13,cursor:'pointer'}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Hall cards */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {halls.map(hall=>(
            <div key={hall.id} style={{background:c,border:'1px solid '+b,
              borderRadius:18,overflow:'hidden',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
              <div style={{background:'linear-gradient(135deg,'+p+','+p+'bb)',
                padding:'14px 16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',
                  alignItems:'flex-start'}}>
                  <div>
                    <p style={{color:'#fff',fontWeight:700,fontSize:14,margin:'0 0 4px'}}>
                      {hall.name}
                    </p>
                    <span style={{background:'rgba(255,255,255,0.15)',color:'#fff',
                      fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                      {hall.exam}
                    </span>
                  </div>
                  <span style={{background:hall.active?'#22C55E20':'#EF444420',
                    color:hall.active?'#22C55E':'#EF4444',
                    fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20}}>
                    {hall.active?'Active':'Paused'}
                  </span>
                </div>
              </div>
              <div style={{padding:'14px 16px'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
                  gap:8,marginBottom:12}}>
                  {[
                    {l:'Students', v:hall.students+'/'+hall.maxStudents},
                    {l:'Mentors',  v:hall.mentors},
                    {l:'Fee',      v:hall.feeType==='free'?'Free':'₹'+hall.fee},
                  ].map((s,i)=>(
                    <div key={i} style={{textAlign:'center',background:bg,
                      borderRadius:8,padding:'8px'}}>
                      <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>{s.v}</p>
                      <p style={{color:m,fontSize:9,margin:0}}>{s.l}</p>
                    </div>
                  ))}
                </div>
                {hall.schedule && (
                  <p style={{color:m,fontSize:11,margin:'0 0 10px'}}>
                    🕐 {hall.schedule}
                  </p>
                )}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                  <button style={{background:p+'10',border:'1px solid '+p+'20',
                    borderRadius:10,padding:'7px',color:p,fontWeight:700,
                    fontSize:11,cursor:'pointer'}}>
                    👨‍🏫 Add Mentor
                  </button>
                  <button style={{background:a+'10',border:'1px solid '+a+'20',
                    borderRadius:10,padding:'7px',color:a,fontWeight:700,
                    fontSize:11,cursor:'pointer'}}>
                    📚 Homework
                  </button>
                  <button style={{background:'transparent',border:'1px solid '+b,
                    borderRadius:10,padding:'7px',color:m,fontWeight:600,
                    fontSize:11,cursor:'pointer'}}>
                    📋 Schedule Exam
                  </button>
                  <button style={{background:'transparent',border:'1px solid '+b,
                    borderRadius:10,padding:'7px',color:m,fontWeight:600,
                    fontSize:11,cursor:'pointer'}}>
                    👥 Students
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 4. MENTOR MANAGER
# ============================================================
w('src/pages/institution/InstitutionMentors.jsx', """// src/pages/institution/InstitutionMentors.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const MENTORS = [
  {id:1,name:'Dr. Kavitha R.',subject:'Polity & History',rating:4.9,
   halls:['UPSC Morning Batch','TNPSC Tamil Nadu'],status:'active',
   joinedAt:'Jun 1, 2026',doubtsAnswered:142},
  {id:2,name:'Suresh M.',subject:'Reasoning & Maths',rating:4.8,
   halls:['SSC CGL Evening'],status:'active',
   joinedAt:'Jun 5, 2026',doubtsAnswered:98},
  {id:3,name:'Priya C.',subject:'Tamil & Polity',rating:4.9,
   halls:['TNPSC Tamil Nadu'],status:'active',
   joinedAt:'May 20, 2026',doubtsAnswered:201},
]

export default function InstitutionMentors() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [mentors, setMentors] = useState(MENTORS)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteId, setInviteId] = useState('')
  const [inviteHall, setInviteHall] = useState('')

  const HALLS = ['UPSC Morning Batch','SSC CGL Evening','Class 10 Science','TNPSC Tamil Nadu']

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/institution')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>👨‍🏫 Mentors</h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            {mentors.length} mentors · All joined via TryIT app
          </p>
        </div>
        <button onClick={()=>setShowInvite(!showInvite)}
          style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
            borderRadius:12,padding:'9px 18px',color:'#fff',fontWeight:700,
            fontSize:13,cursor:'pointer'}}>
          + Invite Mentor
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Invite note */}
        <div style={{background:p+'08',border:'1px solid '+p+'20',
          borderRadius:14,padding:'12px 16px',marginBottom:16}}>
          <p style={{color:p,fontWeight:700,fontSize:12,margin:'0 0 2px'}}>
            ℹ️ How to add mentors
          </p>
          <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
            Mentors must have a TryIT account. Share your Institution Code
            <strong style={{color:t}}> INST-2026-4821 </strong>
            with them. They enter it in their app to join your institution.
            OR enter their TryIT ID below to invite directly.
          </p>
        </div>

        {/* Invite form */}
        {showInvite && (
          <div style={{background:c,border:'1.5px solid '+a,borderRadius:18,
            padding:'18px',marginBottom:16}}>
            <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 12px'}}>
              Invite by TryIT ID
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>TryIT ID or Phone</label>
                <input value={inviteId} onChange={e=>setInviteId(e.target.value)}
                  placeholder="e.g. 9566698821 or TRYIT-0042"
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>Assign to Hall</label>
                <select value={inviteHall} onChange={e=>setInviteHall(e.target.value)}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',cursor:'pointer'}}>
                  <option value="">Select hall (optional)</option>
                  {HALLS.map(h=><option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>{setShowInvite(false);setInviteId('');setInviteHall('')}}
                style={{background:'transparent',border:'1px solid '+b,
                  borderRadius:12,padding:'10px 20px',color:m,fontWeight:600,
                  fontSize:13,cursor:'pointer'}}>Cancel</button>
              <button style={{flex:1,
                background:'linear-gradient(135deg,'+p+','+a+')',
                border:'none',borderRadius:12,padding:'10px',
                color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Send Invitation
              </button>
            </div>
          </div>
        )}

        {/* Mentor list */}
        {mentors.map(mentor=>(
          <div key={mentor.id} style={{background:c,border:'1px solid '+b,
            borderRadius:18,padding:'18px',marginBottom:12,
            boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
              <div style={{width:48,height:48,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,'+p+','+a+')',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:800,fontSize:18,color:'#fff'}}>
                {mentor.name[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',
                  justifyContent:'space-between',marginBottom:4}}>
                  <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>
                    {mentor.name}
                  </p>
                  <span style={{color:'#F59E0B',fontWeight:700,fontSize:12}}>
                    ★ {mentor.rating}
                  </span>
                </div>
                <p style={{color:m,fontSize:11,margin:'0 0 8px'}}>
                  {mentor.subject} · Joined {mentor.joinedAt}
                </p>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                  {mentor.halls.map(h=>(
                    <span key={h} style={{background:p+'10',color:p,fontSize:9,
                      fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                      🏛️ {h}
                    </span>
                  ))}
                  <span style={{background:'#22C55E15',color:'#22C55E',
                    fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                    💬 {mentor.doubtsAnswered} answers
                  </span>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button style={{background:a+'10',border:'1px solid '+a+'25',
                    borderRadius:10,padding:'6px 14px',color:a,
                    fontWeight:700,fontSize:11,cursor:'pointer'}}>
                    Assign Hall
                  </button>
                  <button style={{background:'transparent',border:'1px solid '+b,
                    borderRadius:10,padding:'6px 14px',color:m,
                    fontWeight:600,fontSize:11,cursor:'pointer'}}>
                    View Performance
                  </button>
                  <button style={{background:'transparent',
                    border:'1px solid #EF444430',borderRadius:10,
                    padding:'6px 14px',color:'#EF4444',
                    fontWeight:600,fontSize:11,cursor:'pointer'}}>
                    Remove
                  </button>
                </div>
              </div>
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
# 5. HOMEWORK MANAGER
# ============================================================
w('src/pages/institution/InstitutionHomework.jsx', """// src/pages/institution/InstitutionHomework.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const HW_LIST = [
  {id:1,title:'Polity Chapter 5 — 20 MCQs',hall:'UPSC Morning Batch',
   type:'mcq',due:'Tomorrow 9PM',submitted:198,total:240,status:'active'},
  {id:2,title:'Maths Speed Test — Time & Work',hall:'SSC CGL Evening',
   type:'mcq',due:'Today 8PM',submitted:180,total:180,status:'completed'},
  {id:3,title:'Write 200-word answer on Federalism',hall:'UPSC Morning Batch',
   type:'written',due:'Sun 9PM',submitted:45,total:240,status:'active'},
  {id:4,title:'Read Chapter 3 — Mughal Empire',hall:'Class 10 Science',
   type:'reading',due:'Mon 6PM',submitted:30,total:35,status:'active'},
]

const HW_TYPES = [
  {id:'mcq',    icon:'✅', label:'MCQ Questions',    sub:'Auto-graded'},
  {id:'written',icon:'✍️', label:'Written Answer',   sub:'Mentor reviews'},
  {id:'pdf',    icon:'📎', label:'File Upload',       sub:'Student uploads photo/PDF'},
  {id:'reading',icon:'📖', label:'Reading Assignment', sub:'Mark as read'},
]

export default function InstitutionHomework() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [hw, setHw] = useState(HW_LIST)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({
    title:'', hall:'', type:'mcq', dueDate:'', dueTime:'', instructions:''
  })

  const HALLS = ['UPSC Morning Batch','SSC CGL Evening','Class 10 Science','TNPSC Tamil Nadu']
  const up = (k,v) => setForm(prev=>({...prev,[k]:v}))

  const create = () => {
    if (!form.title.trim() || !form.hall || !form.type) return
    setHw(prev=>[{
      id:Date.now(), title:form.title, hall:form.hall,
      type:form.type, due:form.dueDate+' '+form.dueTime,
      submitted:0, total:240, status:'active'
    },...prev])
    setForm({title:'',hall:'',type:'mcq',dueDate:'',dueTime:'',instructions:''})
    setShowCreate(false)
  }

  const STATUS_COLOR = {active:a, completed:'#22C55E', overdue:'#EF4444'}
  const TYPE_ICONS = {mcq:'✅',written:'✍️',pdf:'📎',reading:'📖'}

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/institution')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>📚 Homework</h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            {hw.filter(h=>h.status==='active').length} active assignments
          </p>
        </div>
        <button onClick={()=>setShowCreate(!showCreate)}
          style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
            borderRadius:12,padding:'9px 18px',color:'#fff',fontWeight:700,
            fontSize:13,cursor:'pointer'}}>
          + Assign Homework
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Create form */}
        {showCreate && (
          <div style={{background:c,border:'1.5px solid '+a,borderRadius:20,
            padding:'20px',marginBottom:20}}>
            <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 14px'}}>
              New Homework Assignment
            </p>

            <div style={{marginBottom:10}}>
              <label style={{display:'block',color:t,fontWeight:700,
                fontSize:12,marginBottom:6}}>Title *</label>
              <input value={form.title} onChange={e=>up('title',e.target.value)}
                placeholder="e.g. Polity Chapter 5 — 20 MCQs"
                style={{width:'100%',padding:'10px 12px',borderRadius:10,
                  border:'1.5px solid '+b,background:bg,color:t,
                  fontSize:13,outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',
              gap:10,marginBottom:12}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>Assign to Hall *</label>
                <select value={form.hall} onChange={e=>up('hall',e.target.value)}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',cursor:'pointer'}}>
                  <option value="">Select hall</option>
                  <option value="all">All Halls</option>
                  {HALLS.map(h=><option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:12,marginBottom:6}}>Due Date</label>
                <input type="date" value={form.dueDate}
                  onChange={e=>up('dueDate',e.target.value)}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',cursor:'pointer',boxSizing:'border-box'}}/>
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{display:'block',color:t,fontWeight:700,
                fontSize:12,marginBottom:8}}>Homework Type *</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {HW_TYPES.map(type=>(
                  <button key={type.id} onClick={()=>up('type',type.id)}
                    style={{background:form.type===type.id?p+'08':bg,
                      border:'2px solid '+(form.type===type.id?p:b),
                      borderRadius:12,padding:'10px 12px',cursor:'pointer',
                      textAlign:'left',display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:18}}>{type.icon}</span>
                    <div>
                      <p style={{color:t,fontWeight:600,fontSize:12,margin:'0 0 1px'}}>
                        {type.label}
                      </p>
                      <p style={{color:m,fontSize:10,margin:0}}>{type.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{display:'block',color:t,fontWeight:700,
                fontSize:12,marginBottom:6}}>Instructions (optional)</label>
              <textarea value={form.instructions}
                onChange={e=>up('instructions',e.target.value)}
                placeholder="Special instructions for students..."
                rows={2}
                style={{width:'100%',padding:'10px 12px',borderRadius:10,
                  border:'1.5px solid '+b,background:bg,color:t,fontSize:13,
                  outline:'none',resize:'vertical',fontFamily:'Poppins,sans-serif',
                  boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'flex',gap:8}}>
              <button onClick={create}
                disabled={!form.title.trim()||!form.hall||!form.type}
                style={{flex:1,
                  background:(!form.title.trim()||!form.hall)?b
                    :'linear-gradient(135deg,'+p+','+a+')',
                  border:'none',borderRadius:12,padding:'12px',
                  color:(!form.title.trim()||!form.hall)?m:'#fff',
                  fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Assign to Students
              </button>
              <button onClick={()=>setShowCreate(false)}
                style={{background:'transparent',border:'1px solid '+b,
                  borderRadius:12,padding:'12px 18px',color:m,
                  fontWeight:600,fontSize:13,cursor:'pointer'}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Homework list */}
        {hw.map(item=>(
          <div key={item.id} style={{background:c,border:'1px solid '+b,
            borderRadius:16,padding:'16px',marginBottom:10,
            boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:10}}>
              <span style={{fontSize:22,flexShrink:0}}>
                {TYPE_ICONS[item.type]}
              </span>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',
                  alignItems:'flex-start',marginBottom:4}}>
                  <p style={{color:t,fontWeight:700,fontSize:13,margin:0,flex:1}}>
                    {item.title}
                  </p>
                  <span style={{background:STATUS_COLOR[item.status]+'15',
                    color:STATUS_COLOR[item.status],fontSize:9,fontWeight:700,
                    padding:'2px 8px',borderRadius:20,flexShrink:0,marginLeft:8}}>
                    {item.status==='active'?'Active':
                     item.status==='completed'?'Completed':'Overdue'}
                  </span>
                </div>
                <div style={{display:'flex',gap:10,marginBottom:8}}>
                  <span style={{color:m,fontSize:11}}>🏛️ {item.hall}</span>
                  <span style={{color:m,fontSize:11}}>⏰ Due {item.due}</span>
                </div>
                {/* Submission progress bar */}
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',
                    marginBottom:4}}>
                    <span style={{color:m,fontSize:10}}>Submitted</span>
                    <span style={{color:t,fontWeight:700,fontSize:10}}>
                      {item.submitted}/{item.total}
                      ({Math.round(item.submitted/item.total*100)}%)
                    </span>
                  </div>
                  <div style={{height:6,background:b,borderRadius:3,overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:3,
                      width:(item.submitted/item.total*100)+'%',
                      background:item.submitted===item.total
                        ?'#22C55E'
                        :'linear-gradient(90deg,'+p+','+a+')',
                      transition:'width 1s ease'}}/>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:6}}>
              <button style={{background:p+'10',border:'1px solid '+p+'20',
                borderRadius:10,padding:'6px 12px',color:p,
                fontWeight:700,fontSize:11,cursor:'pointer'}}>
                View Submissions
              </button>
              <button style={{background:'transparent',border:'1px solid '+b,
                borderRadius:10,padding:'6px 12px',color:m,
                fontWeight:600,fontSize:11,cursor:'pointer'}}>
                Send Reminder
              </button>
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
# 6. Update App.jsx — add institution routes
# ============================================================
try:
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        app = f.read()

    if 'InstitutionDashboard' not in app:
        imports = """const InstitutionDashboard = lazy(() => import('./pages/institution/InstitutionDashboard'))
const InstitutionRegister  = lazy(() => import('./pages/institution/InstitutionRegister'))
const InstitutionHalls     = lazy(() => import('./pages/institution/InstitutionHalls'))
const InstitutionMentors   = lazy(() => import('./pages/institution/InstitutionMentors'))
const InstitutionHomework  = lazy(() => import('./pages/institution/InstitutionHomework'))
"""
        routes = """            <Route path='/institution'           element={<InstitutionDashboard/>}/>
            <Route path='/institution/register'  element={<InstitutionRegister/>}/>
            <Route path='/institution/halls'     element={<InstitutionHalls/>}/>
            <Route path='/institution/mentors'   element={<InstitutionMentors/>}/>
            <Route path='/institution/homework'  element={<InstitutionHomework/>}/>
"""
        app = app.replace(
            "const ExamBoard",
            imports + "const ExamBoard"
        )
        app = app.replace(
            "<Route path='/exam-board'",
            routes + "            <Route path='/exam-board'"
        )
        with open('src/App.jsx', 'w', encoding='utf-8') as f:
            f.write(app)
        print('OK App.jsx institution routes added')
    else:
        print('SKIP App.jsx institution routes already exist')
except Exception as e:
    print('ERROR App.jsx:', e)

# ============================================================
# 7. SQL for institution tables
# ============================================================
w('supabase_v4_institution.sql', """-- TryIT Institution Schema v4
DROP TABLE IF EXISTS institution_mentors CASCADE;
DROP TABLE IF EXISTS homework_submissions CASCADE;
DROP TABLE IF EXISTS homework CASCADE;

CREATE TABLE IF NOT EXISTS institution_mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL,
  mentor_id UUID NOT NULL,
  hall_ids TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','inactive','removed')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (institution_id, mentor_id)
);

CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL,
  hall_id UUID,
  posted_by UUID NOT NULL,
  title TEXT NOT NULL,
  instructions TEXT,
  hw_type TEXT NOT NULL
    CHECK (hw_type IN ('mcq','written','pdf','reading')),
  due_at TIMESTAMPTZ NOT NULL,
  max_marks INTEGER DEFAULT 100,
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id UUID REFERENCES homework(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  answer_text TEXT,
  file_url TEXT,
  marks_obtained INTEGER,
  feedback TEXT,
  status TEXT DEFAULT 'submitted'
    CHECK (status IN ('submitted','reviewed','returned')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  UNIQUE (homework_id, student_id)
);

ALTER TABLE institution_mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inst_mentors_read" ON institution_mentors
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "inst_mentors_insert" ON institution_mentors
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "homework_read" ON homework
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "homework_insert" ON homework
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "homework_update" ON homework
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "hw_submissions_read" ON homework_submissions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "hw_submissions_insert" ON homework_submissions
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "hw_submissions_update" ON homework_submissions
  FOR UPDATE TO authenticated USING (true);

SELECT 'Institution Schema v4 complete!' as status;
""")

print('')
print('ALL DONE! Run:')
print('npm run build 2>&1 | Select-Object -Last 3')
