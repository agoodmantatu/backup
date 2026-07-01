// src/pages/institution/InstitutionStudents.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const STUDENTS = [
  {name:'Priya R.',    exam:'UPSC CSE',   hall:'UPSC Morning',  score:78, status:'active'},
  {name:'Karthik M.', exam:'SSC CGL',    hall:'SSC CGL Evening',score:65, status:'active'},
  {name:'Anjali S.',  exam:'TNPSC Gr 1', hall:'TNPSC Tamil Nadu',score:82,status:'active'},
  {name:'Rahul V.',   exam:'IBPS PO',    hall:'SSC CGL Evening',score:61, status:'active'},
  {name:'Meera K.',   exam:'UPSC CSE',   hall:'UPSC Morning',  score:71, status:'inactive'},
]

export default function InstitutionStudents() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p=theme?.primary||'#1E3A5F',a=theme?.accent||'#C9A84C'
  const t=theme?.text||'#1E293B',m=theme?.textLight||'#64748B'
  const bg=theme?.background||'#F8FAFC',c=theme?.surface||'#FFFFFF'
  const b=theme?.border||'#E2E8F0'
  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/institution')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>👥 Students</h1>
        <span style={{color:m,fontSize:12,marginLeft:'auto'}}>{STUDENTS.length} enrolled</span>
      </div>
      <div style={{padding:'20px',maxWidth:800,margin:'0 auto'}}>
        {STUDENTS.map((s,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
            padding:'14px 16px',marginBottom:10,display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:'50%',flexShrink:0,
              background:'linear-gradient(135deg,'+p+','+a+')',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:700,fontSize:16,color:'#fff'}}>{s.name[0]}</div>
            <div style={{flex:1}}>
              <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>{s.name}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{s.hall} · {s.exam}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{color:s.score>=75?'#22C55E':s.score>=60?'#F59E0B':'#EF4444',
                fontWeight:700,fontSize:14,margin:'0 0 2px'}}>{s.score}%</p>
              <span style={{background:s.status==='active'?'#22C55E15':'#64748B15',
                color:s.status==='active'?'#22C55E':'#64748B',
                fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
