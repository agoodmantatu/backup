// src/pages/institution/InstitutionHalls.jsx
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
