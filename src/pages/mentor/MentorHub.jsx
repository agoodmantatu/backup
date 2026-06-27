// src/pages/mentor/MentorHub.jsx
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
