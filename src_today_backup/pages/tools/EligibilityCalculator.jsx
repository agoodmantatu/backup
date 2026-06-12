import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EXAM_RULES = {
  'ssc-cgl':  { name:'SSC CGL',  minAge:18, maxAge:32, edu:"Bachelor's Degree", relax:{ OBC:3, SC:5, ST:5, PWD:10 } },
  'upsc-cse': { name:'UPSC CSE', minAge:21, maxAge:32, edu:"Bachelor's Degree", relax:{ OBC:3, SC:5, ST:5, PWD:10 } },
  'ibps-po':  { name:'IBPS PO',  minAge:20, maxAge:30, edu:"Bachelor's Degree", relax:{ OBC:3, SC:5, ST:5, PWD:10 } },
  'neet-ug':  { name:'NEET UG',  minAge:17, maxAge:25, edu:'Class 12 PCB',     relax:{ OBC:0, SC:0, ST:0, PWD:5 } },
}

export default function EligibilityCalculator() {
  const navigate = useNavigate()
  const [exam, setExam] = useState('ssc-cgl')
  const [dob, setDob]   = useState('')
  const [cat, setCat]   = useState('General')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!dob) return
    const rule = EXAM_RULES[exam]
    const age = Math.floor((new Date('2026-08-01') - new Date(dob)) / (365.25*24*60*60*1000) * 10) / 10
    const relax = cat!=='General' ? (rule.relax[cat]||0) : 0
    const maxAge = rule.maxAge + relax
    const eligible = age >= rule.minAge && age <= maxAge
    setResult({ exam: rule.name, age, eligible, minAge: rule.minAge, maxAge, edu: rule.edu })
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC', padding:'40px 20px' }}>
      <div style={{ maxWidth:480, margin:'0 auto' }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:26, marginBottom:8, textAlign:'center' }}>🎯 Eligibility Calculator</h1>
        <p style={{ color:'#64748B', fontSize:14, textAlign:'center', marginBottom:20 }}>Check age limit & relaxation for any exam — free, instant.</p>
        <div style={{ background:'#fff', borderRadius:22, padding:24, border:'1.5px solid #E2E8F0' }}>
          <select value={exam} onChange={e=>setExam(e.target.value)} style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, marginBottom:14 }}>
            {Object.entries(EXAM_RULES).map(([id,r])=><option key={id} value={id}>{r.name}</option>)}
          </select>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, marginBottom:14, boxSizing:'border-box' }}/>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
            {['General','OBC','SC','ST','PWD'].map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{ padding:'7px 14px', borderRadius:20, border:'none', cursor:'pointer', background:cat===c?'#1E3A5F':'#F1F5F9', color:cat===c?'#D4AF37':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>{c}</button>
            ))}
          </div>
          <button onClick={calculate} disabled={!dob} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:dob?'linear-gradient(135deg,#1E3A5F,#0F2140)':'#F1F5F9', color:dob?'#D4AF37':'#94A3B8', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, cursor:dob?'pointer':'not-allowed' }}>Check Eligibility</button>
        </div>
        {result && (
          <div style={{ background:result.eligible?'rgba(34,197,94,0.06)':'rgba(239,68,68,0.06)', borderRadius:20, padding:20, marginTop:14, border:`1.5px solid ${result.eligible?'rgba(34,197,94,0.25)':'rgba(239,68,68,0.25)'}` }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:result.eligible?'#15803D':'#991B1B', marginBottom:8 }}>
              {result.eligible?`✅ Eligible for ${result.exam}!`:`❌ Not eligible — age range ${result.minAge}-${result.maxAge}`}
            </p>
            <p style={{ color:'#64748B', fontSize:13 }}>Your age: {result.age} · Required: {result.edu}</p>
            <button onClick={()=>navigate('/login')} style={{ marginTop:12, width:'100%', padding:12, borderRadius:12, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C44A)', color:'#1E3A5F', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>Start Preparing — Free →</button>
          </div>
        )}
      </div>
    </div>
  )
}
