// src/pages/institution/InstitutionRevenue.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const REVENUE = [
  {hall:'UPSC Morning Batch', students:240, fee:500, collected:118000, pending:2000},
  {hall:'SSC CGL Evening',    students:180, fee:300, collected:52200,  pending:1800},
  {hall:'TNPSC Tamil Nadu',   students:420, fee:400, collected:165600, pending:4000},
  {hall:'Class 10 Science',   students:35,  fee:0,   collected:0,      pending:0},
]

export default function InstitutionRevenue() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#2D1B69'
  const a = theme?.accent||'#F59E0B'
  const t = theme?.text||'#0F0A1E'
  const m = theme?.textLight||'#6B7280'
  const bg = theme?.background||'#FFFFFF'
  const c = theme?.surface||'#FAFAFA'
  const b = theme?.border||'#E5E7EB'

  const total = REVENUE.reduce((s,r)=>s+r.collected,0)
  const tryitShare = Math.round(total*0.15)
  const yourShare = total - tryitShare

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Inter,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/institution')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0,
          fontFamily:'Plus Jakarta Sans,sans-serif'}}>Revenue</h1>
      </div>
      <div style={{padding:'20px',maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
          {[
            {l:'Total Collected', v:'Rs '+total.toLocaleString('en-IN'), col:'#16A34A'},
            {l:'Your Share (85%)', v:'Rs '+yourShare.toLocaleString('en-IN'), col:a},
            {l:'TryIT Share (15%)', v:'Rs '+tryitShare.toLocaleString('en-IN'), col:p},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'16px',textAlign:'center'}}>
              <p style={{color:s.col,fontWeight:800,fontSize:18,margin:'0 0 4px'}}>{s.v}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>
        {REVENUE.map((r,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
            padding:'14px 16px',marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <p style={{color:t,fontWeight:700,fontSize:13,margin:0}}>{r.hall}</p>
              <p style={{color:'#16A34A',fontWeight:800,fontSize:14,margin:0}}>
                {r.fee===0?'Free':'Rs '+r.collected.toLocaleString('en-IN')}
              </p>
            </div>
            <div style={{display:'flex',gap:12}}>
              <span style={{color:m,fontSize:11}}>{r.students} students</span>
              {r.fee>0&&<span style={{color:m,fontSize:11}}>Rs {r.fee}/mo each</span>}
              {r.pending>0&&<span style={{color:a,fontSize:11}}>Rs {r.pending} pending</span>}
            </div>
          </div>
        ))}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
