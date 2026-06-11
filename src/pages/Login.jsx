import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ROLES = [
  { id:'student',     emoji:'🎓', label:'Student',      desc:'Prepare for exams'   },
  { id:'mentor',      emoji:'🧑‍🏫', label:'Mentor',       desc:'Teach & earn'        },
  { id:'institution', emoji:'🏫', label:'Institution',   desc:'Manage your centre'  },
  { id:'family',      emoji:'👨‍👩‍👧', label:'Family Hub',    desc:'Learn together'      },
]

export default function Login() {
  const navigate = useNavigate()
  const [role,    setRole]  = useState('student')
  const [step,    setStep]  = useState('role')
  const [email,   setEmail] = useState('')
  const [otp,     setOtp]   = useState(['','','','','',''])
  const [coupon,  setCoupon]= useState('')
  const [error,   setError] = useState('')
  const emailRef = useRef(null)
  const otpRefs  = useRef([])

  useEffect(() => {
    if (step==='email') setTimeout(()=>emailRef.current?.focus(),300)
    if (step==='otp')   setTimeout(()=>otpRefs.current[0]?.focus(),300)
  }, [step])

  const goIn = () => {
    localStorage.setItem('tryit_role', role)
    localStorage.setItem('tryit_email', email.trim().toLowerCase())
    if (coupon.trim()) localStorage.setItem('applied_coupon', coupon.trim().toUpperCase())

    // Check admin pro grant
    try {
      const grants = JSON.parse(localStorage.getItem('tryit_pro_grants')||'[]')
      const grant  = grants.find(g => g.email.toLowerCase()===email.trim().toLowerCase() && new Date(g.expiresAt)>new Date())
      if (grant) localStorage.setItem('tryit_active_grant', JSON.stringify(grant))
    } catch {}

    navigate('/onboarding')
  }

  const sendOTP = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.'); return
    }
    setStep('otp'); setError('')
  }

  const changeOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const n=[...otp]; n[i]=val; setOtp(n)
    if (val && i<5) otpRefs.current[i+1]?.focus()
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#071428,#0F2140,#1E3A5F)', padding:16, position:'relative', overflow:'hidden' }}>
      {[300,500,700].map((s,i) => (
        <div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:`1px solid rgba(212,175,55,${0.06-i*0.015})`, top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>
      ))}

      <div style={{ background:'rgba(255,255,255,0.9)', backdropFilter:'blur(24px)', borderRadius:28, padding:'38px 28px', width:'100%', maxWidth:420, boxShadow:'0 24px 80px rgba(0,0,0,0.4)', position:'relative', zIndex:10 }}>

        <div style={{ textAlign:'center', marginBottom:26 }}>
          <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:30 }}>
            <span style={{ color:'#1E3A5F' }}>TRY</span><span style={{ color:'#D4AF37' }}>IT</span>
          </div>
          <div style={{ color:'#94A3B8', fontSize:9, letterSpacing:'4px', marginTop:2 }}>EDUCATIONS</div>
          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:22, color:'#1E293B', marginTop:16, marginBottom:4 }}>
            {step==='role'?'Who are you?':step==='email'?'Join Free':'Verify OTP'}
          </h1>
        </div>

        {step==='role' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18 }}>
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)} style={{ padding:'14px 10px', borderRadius:16, border:'none', cursor:'pointer', background:role===r.id?'linear-gradient(135deg,#1E3A5F,#0F2140)':'#F8FAFC', boxShadow:role===r.id?'0 6px 20px rgba(30,58,95,0.35)':'0 2px 8px rgba(0,0,0,0.05)', outline:role===r.id?'2px solid #D4AF37':'none', transition:'all 0.2s' }}>
                  <div style={{ fontSize:26, marginBottom:4 }}>{r.emoji}</div>
                  <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, color:role===r.id?'#D4AF37':'#1E293B' }}>{r.label}</div>
                  <div style={{ fontSize:10, color:role===r.id?'rgba(212,175,55,0.7)':'#94A3B8', marginTop:1 }}>{r.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => navigate('/login?google=1')} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:14, borderRadius:14, border:'2px solid #E2E8F0', background:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:15, color:'#1E293B', cursor:'pointer', marginBottom:12 }}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <div style={{ flex:1, height:1, background:'#E2E8F0' }}/><span style={{ color:'#94A3B8', fontSize:12 }}>or email</span><div style={{ flex:1, height:1, background:'#E2E8F0' }}/>
            </div>
            <button onClick={() => setStep('email')} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, color:'#1E3A5F', cursor:'pointer' }}>
              Continue with Email →
            </button>
            <p style={{ textAlign:'center', color:'#94A3B8', fontSize:11, marginTop:12 }}>🔒 Your email is locked after registration</p>
          </>
        )}

        {step==='email' && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18, background:'rgba(30,58,95,0.06)', borderRadius:12, padding:'10px 14px' }}>
              <span style={{ fontSize:20 }}>{ROLES.find(r=>r.id===role)?.emoji}</span>
              <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:14 }}>Joining as {ROLES.find(r=>r.id===role)?.label}</span>
              <button onClick={()=>setStep('role')} style={{ marginLeft:'auto', background:'none', border:'none', color:'#D4AF37', cursor:'pointer', fontSize:12, fontWeight:600 }}>Change</button>
            </div>
            <label style={{ display:'block', fontWeight:600, color:'#1E3A5F', fontSize:13, marginBottom:6, fontFamily:'Poppins,sans-serif' }}>Email Address</label>
            <input ref={emailRef} value={email} type="email" placeholder="your@email.com"
              onChange={e=>{setEmail(e.target.value);setError('')}}
              onKeyDown={e=>e.key==='Enter'&&sendOTP()} enterKeyHint="go"
              style={{ width:'100%', padding:'13px 16px', borderRadius:14, border:`2px solid ${error?'#EF4444':'#E2E8F0'}`, fontSize:15, fontFamily:'Poppins,sans-serif', outline:'none', background:'#F8FAFC', color:'#1E293B', boxSizing:'border-box', marginBottom:error?6:14, transition:'border-color 0.2s' }}
              onFocus={e=>e.target.style.borderColor='#D4AF37'} onBlur={e=>e.target.style.borderColor=error?'#EF4444':'#E2E8F0'}
            />
            {error && <p style={{ color:'#EF4444', fontSize:12, marginBottom:10 }}>{error}</p>}
            <button onClick={sendOTP} style={{ width:'100%', padding:15, borderRadius:14, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>Send OTP →</button>
            <p style={{ textAlign:'center', color:'#94A3B8', fontSize:11, marginTop:10 }}>🔒 This email will be permanently linked to your account</p>
          </>
        )}

        {step==='otp' && (
          <>
            <p style={{ textAlign:'center', color:'#475569', fontSize:14, marginBottom:18 }}>6-digit code sent to <strong style={{ color:'#1E3A5F' }}>{email}</strong></p>
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:16 }}>
              {otp.map((d,i) => (
                <input key={i} ref={el=>otpRefs.current[i]=el} value={d} maxLength={1} inputMode="numeric" enterKeyHint="done"
                  onChange={e=>changeOtp(i,e.target.value)}
                  onKeyDown={e=>{ if(e.key==='Backspace'&&!d&&i>0) otpRefs.current[i-1]?.focus(); if(e.key==='Enter'&&otp.every(x=>x)) goIn() }}
                  style={{ width:44, height:54, textAlign:'center', fontSize:22, fontWeight:700, borderRadius:12, border:`2px solid ${d?'#1E3A5F':'#E2E8F0'}`, background:'#fff', outline:'none', fontFamily:'Poppins,sans-serif', color:'#1E3A5F', transition:'border-color 0.2s' }}
                  onFocus={e=>e.target.style.borderColor='#D4AF37'} onBlur={e=>e.target.style.borderColor=d?'#1E3A5F':'#E2E8F0'}
                />
              ))}
            </div>
            {/* Coupon field */}
            <input value={coupon} placeholder="Mentor coupon code? (optional)"
              onChange={e=>setCoupon(e.target.value)}
              style={{ width:'100%', padding:'10px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:13, fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box', marginBottom:12, background:'#F8FAFC' }}
              onFocus={e=>e.target.style.borderColor='#D4AF37'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}
            />
            <button onClick={goIn} style={{ width:'100%', padding:15, borderRadius:14, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>Verify & Enter →</button>
            <button onClick={()=>{setStep('email');setOtp(['','','','','',''])}} style={{ width:'100%', background:'none', border:'none', color:'#94A3B8', fontSize:13, marginTop:10, cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>← Change email</button>
          </>
        )}
      </div>
    </div>
  )
}
