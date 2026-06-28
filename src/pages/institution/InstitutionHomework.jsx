// src/pages/institution/InstitutionHomework.jsx
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
