// src/pages/mentor/CouponManager.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const COUPONS = [
  {code:'PRIYA20',discount:20,used:3,maxUse:10,earned:'₹180',status:'active'},
  {code:'KASHI15',discount:15,used:7,maxUse:20,earned:'₹315',status:'active'},
  {code:'TNPSC10',discount:10,used:12,maxUse:12,earned:'₹360',status:'exhausted'},
]

export default function CouponManager() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const [code, setCode] = useState('')
  const [disc, setDisc] = useState('10')
  const [maxUse, setMaxUse] = useState('10')

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>🎟️ Coupon Manager</h1>
      </div>
      <div style={{padding:'20px',maxWidth:600,margin:'0 auto'}}>
        <div style={{background:a+'12',border:'1px solid '+a+'30',
          borderRadius:14,padding:'14px 16px',marginBottom:20}}>
          <p style={{color:a,fontWeight:700,fontSize:12,margin:'0 0 4px'}}>
            💡 How coupons earn you cashback
          </p>
          <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
            When a student uses your coupon code to buy Pro or Ultra,
            you earn that discount % as cashback. Example: 20% coupon on
            ₹999 Pro = ₹200 cashback to you after 30 days.
          </p>
        </div>
        <div style={{background:c,border:'1px solid '+b,borderRadius:16,padding:'18px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 14px'}}>
            Create New Coupon
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:12}}>
            {[
              {label:'Coupon Code',val:code,set:setCode,ph:'e.g. PRIYA20'},
              {label:'Discount %',val:disc,set:setDisc,ph:'10'},
              {label:'Max Uses',val:maxUse,set:setMaxUse,ph:'10'},
            ].map((f,i)=>(
              <div key={i}>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:11,marginBottom:6}}>{f.label}</label>
                <input value={f.val} onChange={e=>f.set(e.target.value)}
                  placeholder={f.ph}
                  style={{width:'100%',padding:'9px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',boxSizing:'border-box'}}/>
              </div>
            ))}
          </div>
          <button style={{width:'100%',background:'linear-gradient(135deg,'+p+','+a+')',
            border:'none',borderRadius:12,padding:'12px',color:'#fff',
            fontWeight:700,fontSize:13,cursor:'pointer'}}>
            Create Coupon
          </button>
        </div>
        <p style={{color:t,fontWeight:700,fontSize:14,marginBottom:10}}>My Coupons</p>
        {COUPONS.map((coup,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
            padding:'14px 16px',marginBottom:8,display:'flex',alignItems:'center',gap:12}}>
            <div style={{background:p+'10',borderRadius:10,padding:'8px 14px'}}>
              <p style={{color:p,fontWeight:800,fontSize:14,margin:0}}>{coup.code}</p>
            </div>
            <div style={{flex:1}}>
              <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 2px'}}>
                {coup.discount}% off · Used {coup.used}/{coup.maxUse}
              </p>
              <p style={{color:'#22C55E',fontSize:11,margin:0,fontWeight:600}}>
                Earned: {coup.earned}
              </p>
            </div>
            <span style={{background:coup.status==='active'?'#22C55E15':'#64748B15',
              color:coup.status==='active'?'#22C55E':'#64748B',
              fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20}}>
              {coup.status==='active'?'Active':'Exhausted'}
            </span>
          </div>
        ))}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
