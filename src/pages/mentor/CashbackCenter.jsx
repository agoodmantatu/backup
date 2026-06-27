// src/pages/mentor/CashbackCenter.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const EARNINGS = [
  {student:'Priya R.',plan:'Monthly ₹699',earned:'₹104',date:'Jun 1',status:'pending_payout'},
  {student:'Karthik M.',plan:'Weekly ₹149',earned:'₹22',date:'Jun 10',status:'pending_payout'},
  {student:'Anjali S.',plan:'Monthly ₹349',earned:'₹52',date:'May 15',status:'paid'},
  {student:'Rahul V.',plan:'Weekly ₹149',earned:'₹22',date:'Jun 20',status:'pending_payout'},
]

export default function CashbackCenter() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const pending = EARNINGS.filter(e=>e.status==='pending_payout')
  const paid = EARNINGS.filter(e=>e.status==='paid')
  const pendingAmt = 148
  const paidAmt = 52

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>💰 Earnings & Cashback</h1>
      </div>

      <div style={{padding:'20px',maxWidth:680,margin:'0 auto'}}>

        {/* Summary cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
          {[
            {l:'Total Earned',v:'₹'+( pendingAmt+paidAmt),e:'💰',c:'#22C55E'},
            {l:'Pending Payout',v:'₹'+pendingAmt,e:'⏳',c:'#F59E0B'},
            {l:'Already Paid',v:'₹'+paidAmt,e:'✅',c:'#3B82F6'},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:16,
              padding:'16px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
              <div style={{fontSize:24,marginBottom:6}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:18,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Policy box */}
        <div style={{background:a+'12',border:'1px solid '+a+'30',borderRadius:14,
          padding:'14px 16px',marginBottom:20}}>
          <p style={{color:a,fontWeight:700,fontSize:12,margin:'0 0 4px'}}>
            📋 Cashback Policy
          </p>
          <p style={{color:m,fontSize:11,margin:0,lineHeight:1.7}}>
            You earn 15% of each student's pass amount. Payout is released after
            <strong style={{color:t}}> 30 days minimum</strong> per student
            to ensure quality mentoring. Coupon code cashbacks are paid at month end.
          </p>
        </div>

        {/* Breakdown */}
        <p style={{color:t,fontWeight:700,fontSize:14,marginBottom:12}}>
          Earnings Breakdown
        </p>
        {EARNINGS.map((e,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
            padding:'14px 16px',marginBottom:8,
            display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,flexShrink:0,
              background:'linear-gradient(135deg,'+p+','+a+')',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:700,fontSize:14,color:'#fff'}}>
              {e.student[0]}
            </div>
            <div style={{flex:1}}>
              <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 2px'}}>{e.student}</p>
              <p style={{color:m,fontSize:11,margin:0}}>{e.plan} · {e.date}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{color:'#22C55E',fontWeight:800,fontSize:14,margin:'0 0 2px'}}>{e.earned}</p>
              <span style={{background:e.status==='paid'?'#22C55E15':'#F59E0B15',
                color:e.status==='paid'?'#22C55E':'#F59E0B',
                fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                {e.status==='paid'?'✓ Paid':'⏳ Pending'}
              </span>
            </div>
          </div>
        ))}

        {/* Payout button */}
        <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
          borderRadius:18,padding:'20px',marginTop:16,textAlign:'center'}}>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:12,margin:'0 0 4px'}}>
            Available for payout after 30-day window
          </p>
          <p style={{color:a,fontWeight:900,fontSize:28,margin:'0 0 12px'}}>₹{paidAmt}</p>
          <button style={{background:'linear-gradient(135deg,'+a+',#E8C44A)',border:'none',
            borderRadius:12,padding:'12px 32px',color:p,fontWeight:800,
            fontSize:14,cursor:'pointer'}}>
            Request Payout
          </button>
        </div>

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
