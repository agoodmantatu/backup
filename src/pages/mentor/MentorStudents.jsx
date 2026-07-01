// src/pages/mentor/MentorStudents.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const STUDENTS = [
  {
    id:1, name:'Priya R.', exam:'UPSC CSE', plan:'Monthly', planAmt:'₹699',
    city:'Chennai', joined:'Jun 1, 2026', status:'active',
    doubtsAsked:8, doubtsAnswered:7, lastActive:'Today',
    tests:[
      {name:'Polity Mock 1', score:72, date:'Jun 5'},
      {name:'Polity Mock 2', score:78, date:'Jun 12'},
      {name:'History Test',  score:65, date:'Jun 18'},
      {name:'Polity Mock 3', score:84, date:'Jun 24'},
    ],
    weakTopics:['Federalism','Constitutional Amendments','DPSP'],
    strongTopics:['Fundamental Rights','Parliament','President'],
    improvement:'+12% from Jun 1',
    rating:5,
  },
  {
    id:2, name:'Karthik M.', exam:'SSC CGL', plan:'Weekly', planAmt:'₹149',
    city:'Coimbatore', joined:'Jun 10, 2026', status:'active',
    doubtsAsked:4, doubtsAnswered:4, lastActive:'Yesterday',
    tests:[
      {name:'Maths Speed Test', score:58, date:'Jun 12'},
      {name:'Reasoning Test',   score:71, date:'Jun 19'},
    ],
    weakTopics:['Time & Work','Percentage','Profit & Loss'],
    strongTopics:['Geometry','Number System'],
    improvement:'+13% from Jun 10',
    rating:4,
  },
  {
    id:3, name:'Anjali S.', exam:'TNPSC Group 1', plan:'Monthly', planAmt:'₹349',
    city:'Madurai', joined:'May 15, 2026', status:'active',
    doubtsAsked:12, doubtsAnswered:11, lastActive:'2 hours ago',
    tests:[
      {name:'Tamil History', score:81, date:'May 20'},
      {name:'Polity Mock 1', score:74, date:'Jun 1'},
      {name:'Polity Mock 2', score:79, date:'Jun 15'},
      {name:'Current Affairs', score:88, date:'Jun 22'},
    ],
    weakTopics:['Ancient Tamil History','Local Governance'],
    strongTopics:['Current Affairs','Science & Tech','Geography'],
    improvement:'+7% from May 15',
    rating:5,
  },
  {
    id:4, name:'Rahul V.', exam:'IBPS PO', plan:'Weekly', planAmt:'₹149',
    city:'Hyderabad', joined:'Jun 20, 2026', status:'active',
    doubtsAsked:2, doubtsAnswered:2, lastActive:'3 days ago',
    tests:[
      {name:'Banking Awareness', score:61, date:'Jun 22'},
    ],
    weakTopics:['CRR / SLR','Monetary Policy','Banking History'],
    strongTopics:['English','Reasoning'],
    improvement:'New student',
    rating:4,
  },
]

export default function MentorStudents() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('All')

  const filtered = STUDENTS.filter(s =>
    filter === 'All' ||
    (filter === 'Monthly' && s.plan === 'Monthly') ||
    (filter === 'Weekly' && s.plan === 'Weekly')
  )

  const avgScore = (tests) => {
    if (!tests.length) return 0
    return Math.round(tests.reduce((s,t)=>s+t.score,0)/tests.length)
  }

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>👥 My Students</h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            {STUDENTS.length} active · Click any student to view their progress
          </p>
        </div>
        <div style={{display:'flex',gap:6}}>
          {['All','Monthly','Weekly'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'6px 14px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:11,fontWeight:700,
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Summary stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',
          gap:10,marginBottom:20}}>
          {[
            {l:'Total Students', v:STUDENTS.length, e:'👥'},
            {l:'Monthly Pass',   v:STUDENTS.filter(s=>s.plan==='Monthly').length, e:'📅'},
            {l:'Weekly Pass',    v:STUDENTS.filter(s=>s.plan==='Weekly').length,  e:'🗓️'},
            {l:'Doubts Solved',  v:STUDENTS.reduce((s,x)=>s+x.doubtsAnswered,0), e:'💬'},
          ].map((s,i) => (
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:18,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Student cards */}
        {filtered.map(student => (
          <div key={student.id}
            style={{background:c,border:'1.5px solid '+(expanded===student.id?a:b),
              borderRadius:18,marginBottom:12,overflow:'hidden',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)',transition:'all 0.2s'}}>

            {/* Student row - click to expand */}
            <div style={{padding:'16px',display:'flex',alignItems:'center',
              gap:12,cursor:'pointer'}}
              onClick={()=>setExpanded(expanded===student.id?null:student.id)}>

              <div style={{width:44,height:44,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,'+p+','+a+')',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:800,fontSize:18,color:'#fff'}}>
                {student.name[0]}
              </div>

              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                  <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>{student.name}</p>
                  <span style={{background:student.plan==='Monthly'?'#8B5CF615':'#3B82F615',
                    color:student.plan==='Monthly'?'#8B5CF6':'#3B82F6',
                    fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                    {student.plan} {student.planAmt}
                  </span>
                </div>
                <div style={{display:'flex',gap:12}}>
                  <span style={{color:m,fontSize:11}}>{student.exam}</span>
                  <span style={{color:m,fontSize:11}}>📍 {student.city}</span>
                  <span style={{color:m,fontSize:11}}>🕐 {student.lastActive}</span>
                </div>
              </div>

              <div style={{textAlign:'right',flexShrink:0}}>
                <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 2px'}}>
                  {avgScore(student.tests) > 0 ? avgScore(student.tests)+'%' : 'No tests'}
                </p>
                <p style={{color:'#22C55E',fontSize:10,margin:'0 0 4px',fontWeight:600}}>
                  {student.improvement}
                </p>
                <span style={{color:m,fontSize:14}}>
                  {expanded===student.id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Expanded individual data */}
            {expanded === student.id && (
              <div style={{borderTop:'1px solid '+b,padding:'16px',
                background:bg}}>

                {/* Test scores chart */}
                <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 10px'}}>
                  📊 Test Performance
                </p>
                {student.tests.length > 0 ? (
                  <div style={{marginBottom:16}}>
                    {student.tests.map((test,i) => (
                      <div key={i} style={{marginBottom:8}}>
                        <div style={{display:'flex',justifyContent:'space-between',
                          marginBottom:4}}>
                          <span style={{color:t,fontSize:12,fontWeight:600}}>
                            {test.name}
                          </span>
                          <span style={{color: test.score>=75?'#22C55E':
                            test.score>=60?'#F59E0B':'#EF4444',
                            fontWeight:700,fontSize:12}}>
                            {test.score}%
                          </span>
                        </div>
                        <div style={{height:8,background:b,borderRadius:4,overflow:'hidden'}}>
                          <div style={{height:'100%',borderRadius:4,
                            width:test.score+'%',
                            background: test.score>=75
                              ?'linear-gradient(90deg,#22C55E,#4ADE80)'
                              :test.score>=60
                              ?'linear-gradient(90deg,#F59E0B,#FCD34D)'
                              :'linear-gradient(90deg,#EF4444,#FCA5A5)',
                            transition:'width 1s ease'}}/>
                        </div>
                        <span style={{color:m,fontSize:10}}>{test.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{color:m,fontSize:12,marginBottom:16}}>No tests taken yet</p>
                )}

                {/* Weak / Strong topics */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
                  <div style={{background:'#EF444408',border:'1px solid #EF444420',
                    borderRadius:12,padding:'12px'}}>
                    <p style={{color:'#EF4444',fontWeight:700,fontSize:11,
                      margin:'0 0 8px'}}>⚠️ Weak Topics</p>
                    {student.weakTopics.map((topic,i) => (
                      <div key={i} style={{background:'#EF444415',borderRadius:6,
                        padding:'4px 8px',marginBottom:4,
                        color:'#EF4444',fontSize:11,fontWeight:600}}>
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div style={{background:'#22C55E08',border:'1px solid #22C55E20',
                    borderRadius:12,padding:'12px'}}>
                    <p style={{color:'#22C55E',fontWeight:700,fontSize:11,
                      margin:'0 0 8px'}}>✅ Strong Topics</p>
                    {student.strongTopics.map((topic,i) => (
                      <div key={i} style={{background:'#22C55E15',borderRadius:6,
                        padding:'4px 8px',marginBottom:4,
                        color:'#22C55E',fontSize:11,fontWeight:600}}>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doubt stats */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
                  gap:8,marginBottom:14}}>
                  {[
                    {l:'Doubts Asked',    v:student.doubtsAsked},
                    {l:'Doubts Answered', v:student.doubtsAnswered},
                    {l:'Response Rate',   v:Math.round(student.doubtsAnswered/Math.max(student.doubtsAsked,1)*100)+'%'},
                  ].map((s,i) => (
                    <div key={i} style={{background:c,border:'1px solid '+b,
                      borderRadius:10,padding:'10px',textAlign:'center'}}>
                      <p style={{color:t,fontWeight:800,fontSize:15,margin:'0 0 2px'}}>{s.v}</p>
                      <p style={{color:m,fontSize:9,margin:0}}>{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>nav('/mentor-hub/doubts')}
                    style={{flex:1,background:'linear-gradient(135deg,'+p+','+a+')',
                      border:'none',borderRadius:12,padding:'10px',
                      color:'#fff',fontWeight:700,fontSize:12,cursor:'pointer'}}>
                    Answer Doubts
                  </button>
                  <button onClick={()=>nav('/mentor-hub/materials')}
                    style={{flex:1,background:'transparent',border:'1px solid '+b,
                      borderRadius:12,padding:'10px',
                      color:t,fontWeight:700,fontSize:12,cursor:'pointer'}}>
                    Send Assignment
                  </button>
                  <button style={{flex:1,background:'transparent',border:'1px solid '+b,
                    borderRadius:12,padding:'10px',
                    color:t,fontWeight:700,fontSize:12,cursor:'pointer'}}>
                    Share Report
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
