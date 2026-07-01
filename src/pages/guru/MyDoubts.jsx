// src/pages/guru/MyDoubts.jsx - Premium standalone
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
