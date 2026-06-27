// src/pages/exam-board/ExamCourses.jsx
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
