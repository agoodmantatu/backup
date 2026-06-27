// src/pages/mentor/MentorDoubts.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const DOUBTS = [
  {id:1,student:'Priya R.',exam:'UPSC',subject:'Polity',
   q:'Explain Directive Principles vs Fundamental Rights in simple terms',
   detail:'I understand both are in Part III and IV but I get confused in exam questions',
   time:'10m ago',status:'pending',emojis:{}},
  {id:2,student:'Karthik M.',exam:'SSC CGL',subject:'Maths',
   q:'Time and work shortcut for 3 workers with different rates?',
   detail:'The LCM method confuses me. Can you give a formula I can remember?',
   time:'25m ago',status:'pending',emojis:{}},
  {id:3,student:'Anjali S.',exam:'TNPSC',subject:'Polity',
   q:'What is the 73rd Amendment? Why is it important?',
   detail:'Is this asked in TNPSC Group 2? What is the key content to remember?',
   time:'1h ago',status:'answered',
   answer:'The 73rd Amendment 1992 gave constitutional status to Panchayati Raj. Key points: 3-tier system, reservations for women & SC/ST, State Finance Commission. Very frequently asked in TNPSC!',
   emojis:{fire:12,star:8,heart:5}},
  {id:4,student:'Rahul V.',exam:'IBPS PO',subject:'Economy',
   q:'Difference between CRR and SLR?',
   detail:'I keep mixing these up in banking awareness section',
   time:'2h ago',status:'pending',emojis:{}},
]

const EMOJI_OPTIONS = [
  {e:'🔥',k:'fire',label:'Fire'},{e:'⭐',k:'star',label:'Star'},
  {e:'❤️',k:'heart',label:'Love'},{e:'👍',k:'thumb',label:'Helpful'},
  {e:'🙏',k:'thanks',label:'Thanks'},{e:'💡',k:'idea',label:'Clear'},
]

export default function MentorDoubts() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [doubts, setDoubts] = useState(DOUBTS)
  const [selected, setSelected] = useState(null)
  const [answer, setAnswer] = useState('')
  const [filter, setFilter] = useState('pending')

  const submitAnswer = (id) => {
    if (!answer.trim()) return
    setDoubts(prev => prev.map(d =>
      d.id === id ? {...d, status:'answered', answer, emojis:{}} : d
    ))
    setSelected(null)
    setAnswer('')
  }

  const filtered = doubts.filter(d => filter === 'all' || d.status === filter)

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif',display:'flex'}}>

      {/* Back nav */}
      <div style={{position:'fixed',top:0,left:0,right:0,background:c,
        borderBottom:'1px solid '+b,padding:'14px 20px',zIndex:10,
        display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>💬 Student Doubts</h1>
        <span style={{background:'#EF444420',color:'#EF4444',fontSize:12,fontWeight:700,
          padding:'3px 10px',borderRadius:20,marginLeft:'auto'}}>
          {doubts.filter(d=>d.status==='pending').length} pending
        </span>
      </div>

      <div style={{marginTop:64,padding:'20px',maxWidth:800,margin:'64px auto 0',width:'100%'}}>

        {/* Filter */}
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          {['pending','answered','all'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'7px 18px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:700,transition:'all 0.2s',
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m}}>
              {f==='pending'?'⏳ Pending':f==='answered'?'✅ Answered':'📋 All'}
            </button>
          ))}
        </div>

        {/* Doubt cards */}
        {filtered.map(d=>(
          <div key={d.id} style={{background:c,border:'1.5px solid '+(selected===d.id?a:b),
            borderRadius:18,padding:'18px',marginBottom:12,
            boxShadow:'0 2px 12px rgba(0,0,0,0.05)',transition:'all 0.2s'}}>

            <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
              <span style={{background:p+'12',color:p,fontSize:9,fontWeight:700,
                padding:'3px 10px',borderRadius:20}}>{d.exam}</span>
              <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                padding:'3px 10px',borderRadius:20}}>{d.subject}</span>
              <span style={{marginLeft:'auto',color:m,fontSize:10}}>{d.time}</span>
              <span style={{background:d.status==='answered'?'#22C55E15':'#F59E0B15',
                color:d.status==='answered'?'#22C55E':'#F59E0B',
                fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20}}>
                {d.status==='answered'?'✓ Answered':'⏳ Pending'}
              </span>
            </div>

            <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
              <div style={{width:28,height:28,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,'+p+','+a+')',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:700,color:'#fff'}}>
                {d.student[0]}
              </div>
              <span style={{color:m,fontSize:11,fontWeight:600}}>{d.student}</span>
            </div>

            <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 6px'}}>{d.q}</p>
            <p style={{color:m,fontSize:12,margin:'0 0 10px',lineHeight:1.6}}>{d.detail}</p>

            {d.status === 'answered' && d.answer && (
              <div style={{background:p+'08',border:'1px solid '+p+'20',
                borderRadius:12,padding:'12px',marginBottom:10}}>
                <p style={{color:p,fontWeight:700,fontSize:11,margin:'0 0 6px'}}>
                  Your Answer:
                </p>
                <p style={{color:t,fontSize:13,margin:'0 0 10px',lineHeight:1.6}}>
                  {d.answer}
                </p>
                {/* Emoji reactions */}
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {EMOJI_OPTIONS.map(({e,k,label})=>(
                    <span key={k} style={{background:c,border:'1px solid '+b,
                      borderRadius:20,padding:'3px 10px',fontSize:12,
                      cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                      {e}
                      <span style={{color:m,fontSize:10,fontWeight:700}}>
                        {d.emojis[k]||0}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {d.status === 'pending' && (
              selected === d.id ? (
                <div>
                  <textarea value={answer} onChange={e=>setAnswer(e.target.value)}
                    placeholder="Type a clear, helpful answer... Avoid sugarcoating — accuracy matters more than flattery."
                    rows={4}
                    style={{width:'100%',padding:'12px',borderRadius:12,
                      border:'1.5px solid '+a,background:bg,color:t,
                      fontSize:13,outline:'none',resize:'vertical',
                      fontFamily:'Poppins,sans-serif',boxSizing:'border-box',
                      lineHeight:1.6,marginBottom:10}}/>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>submitAnswer(d.id)}
                      disabled={!answer.trim()}
                      style={{flex:1,background:answer.trim()
                        ?'linear-gradient(135deg,'+p+','+a+')':b,
                        border:'none',borderRadius:12,padding:'10px',
                        color:answer.trim()?'#fff':m,fontWeight:700,
                        fontSize:13,cursor:'pointer'}}>
                      ✅ Submit Answer
                    </button>
                    <button onClick={()=>{setSelected(null);setAnswer('')}}
                      style={{background:'transparent',border:'1px solid '+b,
                        borderRadius:12,padding:'10px 16px',color:m,
                        fontWeight:600,fontSize:12,cursor:'pointer'}}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={()=>setSelected(d.id)}
                  style={{background:'linear-gradient(135deg,'+p+','+a+')',
                    border:'none',borderRadius:12,padding:'10px 20px',
                    color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                  Answer This Doubt →
                </button>
              )
            )}
          </div>
        ))}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
