#!/bin/bash
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
echo "🚨 Emergency fix — white screen..."

# ── Step 1: Create InstitutionSection if missing ─────────────────
mkdir -p src/components/landing
cat > src/components/landing/InstitutionSection.jsx << 'EOF'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { step:'01', emoji:'🏫', title:'Register Your Centre Free',
    desc:'Sign up in 2 minutes. No paperwork. No approval wait. Instant access.' },
  { step:'02', emoji:'📝', title:'Create Unlimited Tests — Any Day',
    desc:'Weekend tests, after-school tests, surprise tests. Schedule for Saturday 10AM or Sunday 2PM. Students join with a 6-digit code from their phone.' },
  { step:'03', emoji:'📱', title:'Students Join on Their Phone',
    desc:'No laptop needed. TryIT runs on any ₹4,000 Android phone. Students open the app, enter the code, and start the test from home or your centre.' },
  { step:'04', emoji:'📊', title:'Instant Results — Every Student Ranked',
    desc:'The moment the test ends — scores, All-India ranks, subject-wise breakdown, weak areas. Zero manual checking. Everything on your dashboard.' },
  { step:'05', emoji:'💰', title:'Every Monday — You Get Paid',
    desc:'Every active student in your centre earns you a weekly payout every Monday via UPI. Unlimited students. Unlimited tests. No cap on earnings.' },
]

const BENEFITS = [
  { emoji:'⚡', title:'No Extra Infrastructure', desc:'Students use their own phones. No desktop lab, no projector, no printed papers needed.' },
  { emoji:'🌍', title:'Pan-India Recognition', desc:'Your centre gets ranked nationally on TryIT. Top centres are featured on our homepage — seen by lakhs of students.' },
  { emoji:'📈', title:'Track Every Student', desc:'Full test history from Day 1. Score trends, improvement graphs, weak topics — one screen, zero spreadsheets.' },
  { emoji:'🔒', title:'Anti-Cheating Built-In', desc:'Questions randomised per student. Timer enforced. No copy-paste. Screenshot detection. Your exam is fully protected.' },
  { emoji:'🏆', title:'Monthly Centre Battle', desc:'Top-performing centres win featured placement and recognition. Motivates your students and grows your reputation fast.' },
  { emoji:'💳', title:'Monday Payouts via UPI', desc:'Every active student = weekly earnings. Direct UPI transfer every Monday morning. No minimum threshold.' },
]

export default function InstitutionSection() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  return (
    <section id="institutions" style={{ padding:'72px 20px',
      background:'linear-gradient(180deg,#F8FAFC,#EFF6FF)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(30,58,95,0.08)', border:'1px solid rgba(30,58,95,0.18)',
            borderRadius:20, padding:'7px 18px', marginBottom:16 }}>
            <span>🏫</span>
            <span style={{ color:'#1E3A5F', fontSize:12, fontWeight:700,
              fontFamily:'Poppins,sans-serif', letterSpacing:'1px' }}>
              FOR COACHING CENTRES & SCHOOLS
            </span>
          </div>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(24px,4vw,42px)', color:'#1E3A5F',
            marginBottom:12, lineHeight:1.2 }}>
            No More Saturdays Wasted on<br/>
            <span style={{ color:'#D4AF37' }}>Manual Test Papers</span>
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', color:'#64748B',
            fontSize:'clamp(14px,2vw,17px)', maxWidth:600, margin:'0 auto' }}>
            Your students take weekend tests on TryIT — from their own phones.
            You get instant results. They get All-India ranked.
            And every Monday, you get paid.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,195px),1fr))',
          gap:14, marginBottom:56 }}>
          {STEPS.map((s,i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              background: active===i ? 'linear-gradient(135deg,#1E3A5F,#0F2140)' : '#fff',
              borderRadius:20, padding:'18px 16px', cursor:'pointer',
              border: `2px solid ${active===i ? '#D4AF37' : '#E2E8F0'}`,
              transition:'all 0.25s',
              boxShadow: active===i ? '0 12px 32px rgba(30,58,95,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
              transform: active===i ? 'translateY(-4px)' : 'none',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', marginBottom:10 }}>
                <span style={{ fontSize:26 }}>{s.emoji}</span>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
                  fontSize:10, color: active===i ? 'rgba(212,175,55,0.5)' : '#CBD5E1',
                  letterSpacing:'1px' }}>STEP {s.step}</span>
              </div>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                color: active===i ? '#D4AF37' : '#1E3A5F',
                fontSize:13, marginBottom:6 }}>{s.title}</p>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:12,
                color: active===i ? 'rgba(255,255,255,0.65)' : '#64748B',
                lineHeight:1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div style={{ marginBottom:48 }}>
          <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800,
            color:'#1E3A5F', fontSize:'clamp(18px,3vw,26px)',
            textAlign:'center', marginBottom:28 }}>
            Why 1,000+ Centres Are Switching to TryIT
          </h3>
          <div style={{ display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,290px),1fr))',
            gap:14 }}>
            {BENEFITS.map((b,i) => (
              <div key={i} style={{ background:'#fff', borderRadius:18, padding:20,
                border:'1.5px solid #E2E8F0',
                boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize:28, display:'block', marginBottom:8 }}>{b.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                  color:'#1E3A5F', fontSize:14, marginBottom:6 }}>{b.title}</p>
                <p style={{ fontFamily:'Inter,sans-serif', color:'#64748B',
                  fontSize:12, lineHeight:1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monday Payout box */}
        <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)',
          borderRadius:24, padding:'36px 28px', marginBottom:28,
          border:'1.5px solid rgba(212,175,55,0.3)',
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',
          gap:28, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8,
              background:'rgba(212,175,55,0.12)',
              border:'1px solid rgba(212,175,55,0.3)',
              borderRadius:20, padding:'6px 14px', marginBottom:14 }}>
              <span>💰</span>
              <span style={{ color:'#D4AF37', fontSize:10, fontWeight:800,
                letterSpacing:'2px', fontFamily:'Poppins,sans-serif' }}>
                EVERY MONDAY. WITHOUT FAIL.
              </span>
            </div>
            <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
              color:'#fff', fontSize:'clamp(20px,3vw,32px)',
              lineHeight:1.2, marginBottom:12 }}>
              Each Student in Your Centre<br/>
              <span style={{ color:'#D4AF37' }}>Earns You Every Week</span>
            </h3>
            <p style={{ fontFamily:'Inter,sans-serif', color:'rgba(255,255,255,0.6)',
              fontSize:'clamp(13px,1.8vw,15px)', lineHeight:1.75 }}>
              No caps. No limits. 10 students or 10,000 — the payout scales.
              Direct UPI transfer every Monday morning. Build a passive income
              while your students crack India's toughest exams.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { emoji:'📅', val:'Every Monday',  label:'Payout Day'          },
              { emoji:'🔓', val:'Unlimited',      label:'Tests Per Month'     },
              { emoji:'📊', val:'Real-time',       label:'Student Dashboard'   },
              { emoji:'🌍', val:'Pan-India',       label:'Centre Recognition'  },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(212,175,55,0.18)',
                borderRadius:16, padding:'16px 12px', textAlign:'center' }}>
                <span style={{ fontSize:22, display:'block', marginBottom:4 }}>{s.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800,
                  color:'#D4AF37', fontSize:'clamp(13px,2vw,18px)' }}>{s.val}</p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10, marginTop:2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign:'center' }}>
          <button onClick={() => navigate('/centre/login')} style={{
            background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none',
            borderRadius:16, padding:'clamp(13px,2vw,17px) clamp(32px,4vw,52px)',
            fontFamily:'Poppins,sans-serif', fontWeight:800,
            fontSize:'clamp(15px,2.5vw,19px)', color:'#1E3A5F', cursor:'pointer',
            boxShadow:'0 8px 24px rgba(212,175,55,0.3)' }}>
            Register Your Centre Free →
          </button>
          <p style={{ color:'#94A3B8', fontSize:12, marginTop:10 }}>
            No registration fee · First payout within 7 days of first student test
          </p>
        </div>
      </div>
    </section>
  )
}
EOF

echo "  ✅ InstitutionSection.jsx created"

# ── Step 2: Write clean Landing.jsx from scratch ──────────────────
cat > src/pages/Landing.jsx << 'EOF'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import InstitutionSection from '../components/landing/InstitutionSection'
import EquityPricingSection from '../components/landing/EquityPricingSection'
import DonationSection from '../components/landing/DonationSection'

// ── Count-up hook ────────────────────────────────────────────────
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCount(Math.floor(eased * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return [count, ref]
}

// ── HERO ─────────────────────────────────────────────────────────
function Hero({ navigate }) {
  return (
    <section style={{
      minHeight:'100vh', display:'flex', alignItems:'center',
      background:'linear-gradient(135deg,#071428 0%,#0F2140 45%,#1E3A5F 100%)',
      padding:'80px 24px 60px', position:'relative', overflow:'hidden',
    }}>
      {[400,680,960].map((s,i) => (
        <div key={i} style={{ position:'absolute', width:s, height:s,
          borderRadius:'50%', border:`1px solid rgba(212,175,55,${0.07-i*0.02})`,
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          pointerEvents:'none',
          animation:`ringPulse ${4+i}s ease-in-out ${i*0.5}s infinite` }}/>
      ))}

      <div style={{ maxWidth:1200, margin:'0 auto', width:'100%',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,420px),1fr))',
        gap:48, alignItems:'center', position:'relative', zIndex:2 }}>

        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(212,175,55,0.12)',
            border:'1px solid rgba(212,175,55,0.3)',
            borderRadius:20, padding:'7px 16px', marginBottom:24 }}>
            <span>🚀</span>
            <span style={{ color:'#D4AF37', fontSize:13, fontWeight:600,
              fontFamily:'Inter,sans-serif' }}>
              India's First Complete Exam Platform
            </span>
          </div>

          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(38px,6vw,72px)', lineHeight:1.05, marginBottom:16 }}>
            <span style={{ color:'#fff' }}>One App.</span><br/>
            <span style={{ color:'#D4AF37' }}>Every Exam.</span><br/>
            <span style={{ color:'#fff' }}>Zero Barriers.</span>
          </h1>

          <p style={{ color:'#D4AF37', fontStyle:'italic',
            fontSize:'clamp(15px,2vw,19px)', marginBottom:8,
            fontFamily:'Inter,sans-serif' }}>
            Your Exam. Your Rank. Your Success.
          </p>
          <p style={{ color:'rgba(255,255,255,0.65)',
            fontSize:'clamp(14px,1.8vw,16px)', lineHeight:1.75,
            maxWidth:520, marginBottom:32,
            fontFamily:'Inter,sans-serif' }}>
            1,10,000+ exam pathways — CLAT · UPSC · JEE · NEET · Swayam · Foreign ·
            Arts · Science · ITI · Scholarships and every exam in India.
            Study in 40+ Indian languages. Real All-India rankings after every test.
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:28 }}>
            <button onClick={() => navigate('/login')} style={{
              background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none',
              borderRadius:16,
              padding:'clamp(13px,2vw,18px) clamp(24px,3vw,40px)',
              fontFamily:'Poppins,sans-serif', fontWeight:800,
              fontSize:'clamp(15px,2vw,18px)', color:'#1E3A5F', cursor:'pointer',
              boxShadow:'0 6px 24px rgba(212,175,55,0.4)' }}>
              Start Free →
            </button>
            <button onClick={() => navigate('/equity')} style={{
              background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(212,175,55,0.4)',
              borderRadius:16,
              padding:'clamp(13px,2vw,18px) clamp(20px,3vw,28px)',
              fontFamily:'Poppins,sans-serif', fontWeight:700,
              fontSize:'clamp(14px,2vw,16px)', color:'#fff', cursor:'pointer' }}>
              🤝 Free Access — 9 Communities
            </button>
          </div>

          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['🔒 Secure','💳 ₹19 Trial','🌐 40+ Languages',
              '🏆 Real Rankings','🤝 Free for Life','🏳️‍⚧️ Trans Inclusive',
              '📚 From Class 6 to PhD'].map(t => (
              <span key={t} style={{ background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:20,
                padding:'5px 12px', color:'rgba(255,255,255,0.6)',
                fontSize:'clamp(10px,1.5vw,12px)',
                fontFamily:'Inter,sans-serif' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background:'rgba(15,33,64,0.9)',
            border:'1px solid rgba(212,175,55,0.3)', borderRadius:20,
            padding:18, backdropFilter:'blur(20px)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <div style={{ width:46, height:46, borderRadius:'50%',
                background:'linear-gradient(135deg,#D4AF37,#E8C84A)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:900, fontSize:16, color:'#1E3A5F', flexShrink:0 }}>AK</div>
              <div>
                <p style={{ color:'#fff', fontWeight:700,
                  fontFamily:'Poppins,sans-serif', fontSize:14 }}>
                  Arjun K. — Tamil Nadu</p>
                <p style={{ color:'#D4AF37', fontSize:12 }}>⛏️ The Gold Miner · SSC CGL</p>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:13, marginBottom:12 }}>
              "Moved from #8,432 → <strong style={{ color:'#D4AF37' }}>#1,243</strong> in 30 days! 🔥"
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ flex:1, height:6, borderRadius:3,
                background:'rgba(255,255,255,0.08)' }}>
                <div style={{ width:'67%', height:6, borderRadius:3,
                  background:'linear-gradient(90deg,#D4AF37,#E8C84A)' }}/>
              </div>
              <span style={{ color:'#D4AF37', fontSize:12, fontWeight:700 }}>67% Ready</span>
            </div>
          </div>

          <div style={{ background:'linear-gradient(135deg,#D4AF37,#E8C84A)',
            borderRadius:20, padding:'16px 20px',
            display:'flex', alignItems:'center', gap:16 }}>
            <span style={{ fontSize:40 }}>🦁</span>
            <div>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
                color:'#1E3A5F', fontSize:'clamp(16px,2.5vw,20px)' }}>Baahuveer</p>
              <p style={{ color:'rgba(30,58,95,0.7)', fontSize:13 }}>
                Level 6 — Indian Cinema meets Exam Glory 🎬</p>
            </div>
          </div>

          <div style={{ background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:20, padding:16,
            display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            {[['1,10,000+','Exams'],['40+','Languages'],['Class 6+','All Ages']].map(([v,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <p style={{ color:'#D4AF37', fontFamily:'Poppins,sans-serif',
                  fontWeight:900, fontSize:'clamp(14px,2.5vw,20px)' }}>{v}</p>
                <p style={{ color:'rgba(255,255,255,0.45)', fontSize:10, marginTop:2 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ringPulse {
          0%,100% { transform:translate(-50%,-50%) scale(1); opacity:1; }
          50%      { transform:translate(-50%,-50%) scale(1.05); opacity:0.4; }
        }
      `}</style>
    </section>
  )
}

// ── STATS STRIP ──────────────────────────────────────────────────
function StatsStrip() {
  const [c1, r1] = useCountUp(110000)
  const [c2, r2] = useCountUp(40)

  return (
    <section style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', padding:'32px 20px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex',
        flexWrap:'wrap', justifyContent:'center',
        borderLeft:'1px solid rgba(255,255,255,0.06)' }}>

        <div ref={r1} style={{ flex:'1 1 180px', textAlign:'center',
          padding:'18px 16px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(26px,4vw,44px)', color:'#D4AF37', lineHeight:1 }}>
            {c1.toLocaleString()}+
          </p>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:13, marginTop:4 }}>
            Exam Pathways
          </p>
        </div>

        <div ref={r2} style={{ flex:'1 1 180px', textAlign:'center',
          padding:'18px 16px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(26px,4vw,44px)', color:'#D4AF37', lineHeight:1 }}>
            {c2}+
          </p>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:13, marginTop:4 }}>
            Indian Languages
          </p>
        </div>

        {/* Millions coming */}
        <div style={{ flex:'1 1 220px', textAlign:'center',
          padding:'18px 16px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(20px,3.5vw,34px)', color:'#D4AF37', lineHeight:1.1 }}>
            Millions Coming
          </p>
          <p style={{ color:'rgba(212,175,55,0.7)', fontSize:13,
            marginTop:4, fontStyle:'italic' }}>
            What about YOU? 🔥
          </p>
        </div>

        {/* All exams */}
        <div style={{ flex:'1 1 260px', textAlign:'center',
          padding:'18px 16px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(16px,2.5vw,22px)', color:'#D4AF37', lineHeight:1.2 }}>
            Every Exam In India
          </p>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:11, marginTop:4 }}>
            CLAT · Swayam · Foreign · UPSC · Arts · Science · ITI · Scholarships
          </p>
        </div>

        <div style={{ flex:'1 1 160px', textAlign:'center',
          padding:'18px 16px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(26px,4vw,44px)', color:'#D4AF37', lineHeight:1 }}>
            28/28
          </p>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:13, marginTop:4 }}>
            States Covered
          </p>
        </div>

      </div>
    </section>
  )
}

// ── TEST ENGINE PREVIEW ──────────────────────────────────────────
function TestPreview() {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const q = {
    text:'Q1. A shopkeeper sells an item for ₹520 and earns 30% profit. What is the cost price?',
    options:['₹400','₹380','₹420','₹350'], correct:0,
  }
  return (
    <section style={{ padding:'72px 20px', background:'#F8FAFC' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:11,
            fontWeight:700, padding:'4px 14px', borderRadius:20, letterSpacing:'1px' }}>
            LIVE PREVIEW
          </span>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(22px,4vw,40px)', color:'#1E3A5F', margin:'12px 0 6px' }}>
            ⚡ Test Engine
          </h2>
          <p style={{ color:'#64748B', fontSize:15 }}>
            Try a real question right now — no login needed
          </p>
        </div>
        <div style={{ maxWidth:680, margin:'0 auto',
          background:'#fff', borderRadius:24,
          boxShadow:'0 8px 40px rgba(30,58,95,0.1)',
          border:'1.5px solid #E2E8F0', overflow:'hidden' }}>
          <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)',
            padding:'12px 20px', display:'flex', justifyContent:'space-between',
            alignItems:'center', flexWrap:'wrap', gap:8 }}>
            <div style={{ display:'flex', gap:8 }}>
              {['SSC CGL','Quantitative Aptitude','Medium'].map(tag => (
                <span key={tag} style={{ background:'rgba(212,175,55,0.2)',
                  color:'#D4AF37', fontSize:11, fontWeight:700,
                  padding:'3px 10px', borderRadius:20 }}>{tag}</span>
              ))}
            </div>
            <span style={{ color:'rgba(255,255,255,0.7)', fontSize:13 }}>⏱ 1:24</span>
          </div>
          <div style={{ padding:'24px 20px' }}>
            <p style={{ color:'#1E293B', fontWeight:600, fontSize:16,
              lineHeight:1.6, marginBottom:20, fontFamily:'Poppins,sans-serif' }}>
              {q.text}
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {q.options.map((opt,i) => {
                const letter = ['A','B','C','D'][i]
                const isSel = selected === i
                const isOk  = revealed && i === q.correct
                const isBad = revealed && isSel && i !== q.correct
                return (
                  <button key={i}
                    onClick={() => { if (!revealed) setSelected(i) }}
                    style={{ display:'flex', alignItems:'center', gap:12,
                      padding:'13px 16px', borderRadius:14, cursor:'pointer',
                      border:`2px solid ${isOk?'#22C55E':isBad?'#EF4444':isSel?'#1E3A5F':'#E2E8F0'}`,
                      background: isOk?'#DCFCE7':isBad?'#FEE2E2':isSel?'rgba(30,58,95,0.06)':'#F8FAFC',
                      textAlign:'left', width:'100%', transition:'all 0.2s' }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0,
                      background: isOk?'#22C55E':isBad?'#EF4444':isSel?'#1E3A5F':'#E2E8F0',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color: isSel||isOk||isBad?'#fff':'#64748B',
                      fontWeight:800, fontSize:13 }}>
                      {isOk?'✓':isBad?'✗':letter}
                    </div>
                    <span style={{ fontSize:15, fontWeight: isSel||isOk?700:500,
                      color: isOk?'#15803D':isBad?'#991B1B':isSel?'#1E3A5F':'#475569' }}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>
            <div style={{ display:'flex', gap:10, marginTop:20, flexWrap:'wrap' }}>
              {selected !== null && !revealed && (
                <button onClick={() => setRevealed(true)} style={{
                  background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none',
                  borderRadius:12, padding:'11px 24px',
                  fontFamily:'Poppins,sans-serif', fontWeight:700,
                  fontSize:14, color:'#1E3A5F', cursor:'pointer' }}>
                  Submit →
                </button>
              )}
              {revealed && (
                <button onClick={() => { setSelected(null); setRevealed(false) }} style={{
                  background:'#1E3A5F', border:'none', borderRadius:12,
                  padding:'11px 24px', fontFamily:'Poppins,sans-serif',
                  fontWeight:700, fontSize:14, color:'#fff', cursor:'pointer' }}>
                  Try Again
                </button>
              )}
            </div>
            {revealed && (
              <div style={{ marginTop:16, background:'#F0FDF4',
                border:'1.5px solid #22C55E', borderRadius:16, padding:16 }}>
                <p style={{ color:'#15803D', fontWeight:700,
                  fontSize:14, marginBottom:6 }}>✅ Correct Answer: ₹400</p>
                <p style={{ color:'#166534', fontSize:13, lineHeight:1.6 }}>
                  💡 CP = SP ÷ (1 + P%) = 520 ÷ 1.3 = <strong>₹400</strong>
                </p>
                <p style={{ color:'#166534', fontSize:12, marginTop:4, opacity:0.85 }}>
                  🧠 Memory trick: 1.3 × CP = SP → CP = 520 ÷ 1.3
                </p>
                <p style={{ color:'#15803D', fontSize:11, marginTop:8,
                  fontStyle:'italic', opacity:0.7 }}>
                  + 6 more layers (deep concept, wrong option autopsy, cultural story, exam tip,
                  PYQ relevance) — available in 5 languages after login
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── LEADERBOARD ──────────────────────────────────────────────────
function LeaderboardPreview({ navigate }) {
  const ROWS = [
    { rank:1,    name:'Priya Sharma',   state:'Kerala',   exam:'NEET UG',  score:'97.4%', badge:'⚡ Unstoppable' },
    { rank:2,    name:'Rahul Kumar',    state:'Delhi',    exam:'UPSC CSE', score:'94.8%', badge:'👑 Thalavan'    },
    { rank:3,    name:'Aisha Mohammed', state:'Gujarat',  exam:'IBPS PO',  score:'93.1%', badge:'🦁 Baahuveer'   },
    { rank:4,    name:'Vikram Singh',   state:'Rajasthan',exam:'SSC CGL',  score:'92.6%', badge:'🥇 Gold King'   },
    { rank:5,    name:'Deepa Nair',     state:'TN',       exam:'NEET UG',  score:'91.9%', badge:'🌟 The Legend'  },
    { rank:1243, name:'You (Preview)',  state:'—',        exam:'—',        score:'?',     badge:'⛏️ Start Now', isYou:true },
  ]
  return (
    <section style={{ padding:'72px 20px',
      background:'linear-gradient(135deg,#1E3A5F,#0F2140)' }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(22px,4vw,38px)', color:'#fff', marginBottom:8 }}>
            🏆 Real All-India Rankings
          </h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15 }}>
            After every test. Live. Your name could be up here.
          </p>
        </div>
        <div style={{ background:'rgba(255,255,255,0.04)',
          borderRadius:22, overflow:'hidden',
          border:'1px solid rgba(212,175,55,0.2)' }}>
          <div style={{ background:'rgba(0,0,0,0.3)', padding:'12px 20px',
            display:'grid', gridTemplateColumns:'52px 1fr 90px 70px', gap:8 }}>
            {['Rank','Student','Exam','Score'].map(h => (
              <span key={h} style={{ color:'#D4AF37', fontSize:11, fontWeight:700 }}>{h}</span>
            ))}
          </div>
          {ROWS.map((r,i) => (
            <div key={i} style={{ padding:'13px 20px',
              borderBottom:'1px solid rgba(255,255,255,0.05)',
              display:'grid', gridTemplateColumns:'52px 1fr 90px 70px',
              gap:8, alignItems:'center',
              background: r.isYou ? 'rgba(212,175,55,0.1)' : 'transparent',
              borderLeft: r.isYou ? '3px solid #D4AF37' : '3px solid transparent' }}>
              <span style={{ color: i===0?'#D4AF37':i===1?'#9CA3AF':i===2?'#CD7F32':'rgba(255,255,255,0.4)',
                fontSize: i<3?20:13, fontWeight:900 }}>
                {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${r.rank.toLocaleString()}`}
              </span>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                  <span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>{r.name}</span>
                  {r.isYou && <span style={{ background:'#D4AF37', color:'#1E3A5F',
                    fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:20 }}>← YOU</span>}
                </div>
                <span style={{ color:'rgba(255,255,255,0.35)', fontSize:11 }}>
                  {r.badge} · {r.state}
                </span>
              </div>
              <span style={{ background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.6)',
                fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:20,
                display:'inline-block' }}>{r.exam}</span>
              <span style={{ color:'#D4AF37', fontWeight:800, fontSize:14 }}>{r.score}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:24 }}>
          <button onClick={() => navigate('/login')} style={{
            background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none',
            borderRadius:14, padding:'13px 36px',
            fontFamily:'Poppins,sans-serif', fontWeight:700,
            fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>
            Claim Your Rank →
          </button>
        </div>
      </div>
    </section>
  )
}

// ── FEATURES GRID ────────────────────────────────────────────────
function FeaturesGrid({ navigate }) {
  const FEATURES = [
    { emoji:'⚡', title:'Test Engine',        sub:'Mock · PYQ · Speed · Custom',      badge:'Core'     },
    { emoji:'🌌', title:'Exam Universe',      sub:'UPSC · JEE · NEET · CLAT · Foreign',badge:'9852+'   },
    { emoji:'🧭', title:'Career Compass',     sub:'8 questions → your perfect exam',   badge:'AI'      },
    { emoji:'🎓', title:'Guru Hub',           sub:'Ask · Answer · Earn',               badge:'Community'},
    { emoji:'🪪', title:'Student ID Card',    sub:'5 cinematic templates · 3D flip',   badge:'🔥 Viral' },
    { emoji:'👥', title:'The Hall',           sub:'Study squads · Battles',            badge:'Social'  },
    { emoji:'🎮', title:'Brain Games',        sub:'10 games · Coins · Tournaments',    badge:'Fun'     },
    { emoji:'🗺️', title:'My Roadmap',         sub:'Today → Exam Day planner',          badge:'Personal' },
    { emoji:'📚', title:'Swayam & Certifications', sub:'NPTEL · Coursera · UGC · More', badge:'Courses' },
    { emoji:'🌐', title:'40+ Languages',      sub:'Tamil · Hindi · Telugu · More',    badge:'Inclusive'},
    { emoji:'🎯', title:'Focus Mode',         sub:'Pomodoro · Ambient sounds · Coins', badge:'Study'   },
    { emoji:'🤝', title:'Free for 9 Tiers',  sub:'Orphans · Veer Naris · Trans · More',badge:'Equity' },
  ]
  return (
    <section id="features" style={{ padding:'72px 20px', background:'#F8FAFC' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(22px,4vw,40px)', color:'#1E3A5F', marginBottom:8 }}>
            Everything You Need to Crack Your Exam
          </h2>
          <p style={{ color:'#64748B', fontSize:15 }}>
            12 powerful tools. One platform. Built for every Indian student — from Class 6 to PhD.
          </p>
        </div>
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,240px),1fr))',
          gap:14 }}>
          {FEATURES.map((f,i) => (
            <div key={i} onClick={() => navigate('/login')}
              style={{ background:'#fff', borderRadius:18, padding:18,
                border:'1.5px solid #E2E8F0', cursor:'pointer',
                transition:'all 0.2s',
                boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor='#D4AF37'
                e.currentTarget.style.transform='translateY(-3px)'
                e.currentTarget.style.boxShadow='0 8px 24px rgba(212,175,55,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor='#E2E8F0'
                e.currentTarget.style.transform='none'
                e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'
              }}>
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'flex-start', marginBottom:10 }}>
                <span style={{ fontSize:30 }}>{f.emoji}</span>
                <span style={{ background:'#F8FAFC', border:'1px solid #E2E8F0',
                  color:'#64748B', fontSize:9, fontWeight:700,
                  padding:'3px 8px', borderRadius:20 }}>{f.badge}</span>
              </div>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                color:'#1E3A5F', fontSize:14, marginBottom:4 }}>{f.title}</p>
              <p style={{ color:'#D4AF37', fontSize:11, fontWeight:600 }}>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── EQUITY SECTION ───────────────────────────────────────────────
function EquitySection({ navigate }) {
  const TIERS = [
    { emoji:'🌱', name:'Hope Scholars',        free:true  },
    { emoji:'♿', name:'Physically Challenged', free:true  },
    { emoji:'🧹', name:'Swachhta Warriors',    free:true  },
    { emoji:'🎖️', name:"Martyrs' Families",   free:true  },
    { emoji:'🏳️‍⚧️',name:'Transgender Youth',  free:true  },
    { emoji:'🌾', name:'Agrarian Distress',    free:true  },
    { emoji:'🪖', name:'Active Military',      free:false },
    { emoji:'🏥', name:'ASHA / Anganwadi',     free:false },
    { emoji:'🌟', name:'First-Generation',     free:false },
  ]
  return (
    <section style={{ padding:'72px 20px',
      background:'linear-gradient(135deg,#071428,#0F2140)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <span style={{ fontSize:'clamp(32px,5vw,52px)' }}>🇮🇳</span>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(24px,4vw,40px)', color:'#fff', margin:'12px 0 8px' }}>
            TryIT Cares — Free For Life
          </h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15,
            maxWidth:560, margin:'0 auto 8px' }}>
            6 communities get 100% free access for life.
            Including full support for Transgender youth via the SMILE Portal. 🏳️‍⚧️
          </p>
        </div>
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))',
          gap:10, marginBottom:28 }}>
          {TIERS.map((t,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.04)',
              border:`1px solid ${t.free?'rgba(34,197,94,0.25)':'rgba(212,175,55,0.25)'}`,
              borderRadius:16, padding:'14px 16px',
              display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{t.emoji}</span>
              <span style={{ color:'#fff', fontFamily:'Poppins,sans-serif',
                fontWeight:600, fontSize:13, flex:1 }}>{t.name}</span>
              <span style={{ background: t.free?'rgba(34,197,94,0.18)':'rgba(212,175,55,0.15)',
                color: t.free?'#4ADE80':'#D4AF37',
                fontSize:9, fontWeight:800, padding:'3px 8px',
                borderRadius:20, flexShrink:0 }}>
                {t.free?'FREE':'DISC.'}
              </span>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center' }}>
          <button onClick={() => navigate('/equity')} style={{
            background:'linear-gradient(135deg,#22C55E,#16A34A)', border:'none',
            borderRadius:14, padding:'13px 36px',
            fontFamily:'Poppins,sans-serif', fontWeight:700,
            fontSize:16, color:'#fff', cursor:'pointer',
            boxShadow:'0 6px 20px rgba(34,197,94,0.3)' }}>
            Check Your Eligibility →
          </button>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ─────────────────────────────────────────────────
function Testimonials() {
  const ITEMS = [
    { n:'Arjun K.', s:'TN',     e:'SSC CGL', r:'#1,243',sc:'89%',
      t:'"Moved from #8,432 to #1,243 in 30 days!" 🔥', lv:'⛏️ Gold Miner' },
    { n:'Priya S.', s:'Kerala', e:'NEET UG', r:'#847', sc:'94%',
      t:'"Studied in Malayalam. Crystal clear explanations!" 🌴', lv:'💪 Grinder' },
    { n:'Rahul M.', s:'Bihar',  e:'UPSC CSE',r:'#2,341',sc:'82%',
      t:'"Career Compass told me to try UPSC + BPSC. Best decision!" 🎯', lv:'📈 Riser' },
    { n:'Zainab A.',s:'Hyd',    e:'IBPS PO', r:'#519', sc:'91%',
      t:'"Guru Hub answered my doubt at midnight in 7 minutes!" 🎓', lv:'🦁 Baahuveer' },
    { n:'Deepika R.',s:'Manipur',e:'CTET',   r:'#1,021',sc:'87%',
      t:'"First platform with Manipuri language. Thank you TryIT!" 🏔️', lv:'📈 Riser' },
    { n:'Ravi T.', s:'Punjab',  e:'NDA',     r:'#312', sc:'88%',
      t:'"Hall battles kept my whole batch studying every night!" 👥', lv:'🔥 Fierce' },
  ]
  return (
    <section style={{ padding:'60px 0', background:'#fff', overflow:'hidden' }}>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800,
          fontSize:'clamp(22px,3.5vw,34px)', color:'#1E3A5F' }}>
          Real Students. Real Results.
        </h2>
      </div>
      <div style={{ display:'flex',
        animation:'scrollTicker 28s linear infinite',
        width:'max-content', gap:14 }}>
        {[...ITEMS,...ITEMS].map((t,i) => (
          <div key={i} style={{ width:270, background:'#F8FAFC',
            border:'1.5px solid #E2E8F0', borderRadius:18,
            padding:16, flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <div style={{ width:38, height:38, borderRadius:'50%',
                background:'linear-gradient(135deg,#1E3A5F,#0F2140)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#D4AF37', fontWeight:900, fontSize:12, flexShrink:0 }}>
                {t.n.split(' ').map(x=>x[0]).join('')}
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                  color:'#1E3A5F', fontSize:13 }}>{t.n}</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>{t.s} · {t.e}</p>
              </div>
              <span style={{ background:'#FEF3C7', color:'#92400E',
                fontSize:9, fontWeight:700, padding:'2px 7px',
                borderRadius:20, flexShrink:0 }}>{t.lv}</span>
            </div>
            <p style={{ color:'#475569', fontSize:12, lineHeight:1.6 }}>{t.t}</p>
            <div style={{ display:'flex', gap:6, marginTop:8 }}>
              <span style={{ background:'#EDE9FE', color:'#7C3AED',
                fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>
                {t.r}
              </span>
              <span style={{ background:'#DCFCE7', color:'#15803D',
                fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>
                {t.sc}
              </span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scrollTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

// ── FINAL CTA ────────────────────────────────────────────────────
function FinalCTA({ navigate }) {
  return (
    <section style={{ padding:'72px 20px',
      background:'linear-gradient(135deg,#1E3A5F,#0F2140)',
      textAlign:'center' }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
          fontSize:'clamp(26px,4vw,48px)', color:'#fff', marginBottom:16 }}>
          Ready to Start Your Journey?
        </h2>
        <p style={{ color:'rgba(255,255,255,0.65)', fontSize:16,
          maxWidth:520, margin:'0 auto 32px', lineHeight:1.7 }}>
          1,10,000+ exams. 40+ languages. Real rankings. Free for 9 communities.
          From Class 6 to PhD — for every Indian, at every age.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:16 }}>
          <button onClick={() => navigate('/login')} style={{
            background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none',
            borderRadius:18,
            padding:'clamp(14px,2vw,20px) clamp(32px,4vw,60px)',
            fontFamily:'Poppins,sans-serif', fontWeight:800,
            fontSize:'clamp(16px,2.5vw,20px)', color:'#1E3A5F', cursor:'pointer' }}>
            Start Free Now →
          </button>
          <button onClick={() => navigate('/equity')} style={{
            background:'rgba(255,255,255,0.08)',
            border:'1.5px solid rgba(212,175,55,0.4)', borderRadius:18,
            padding:'clamp(14px,2vw,20px) clamp(24px,3vw,40px)',
            fontFamily:'Poppins,sans-serif', fontWeight:700,
            fontSize:'clamp(15px,2vw,18px)', color:'#fff', cursor:'pointer' }}>
            🤝 Apply for Free Access
          </button>
        </div>
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12 }}>
          No credit card · No commitment · Free forever for eligible communities
        </p>
      </div>
    </section>
  )
}

// ── MAIN ─────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const [scrollPct, setScrollPct] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setScrollPct(pct)
      setShowTop(el.scrollTop > 500)
    }
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div>
      <div style={{ position:'fixed', top:0, left:0, height:3, zIndex:9999,
        width:`${scrollPct}%`,
        background:'linear-gradient(90deg,#D4AF37,#E8C84A)',
        transition:'width 0.1s', pointerEvents:'none' }}/>

      <Navbar/>
      <Hero navigate={navigate}/>
      <StatsStrip/>
      <TestPreview/>
      <LeaderboardPreview navigate={navigate}/>
      <FeaturesGrid navigate={navigate}/>
      <EquitySection navigate={navigate}/>
      <EquityPricingSection navigate={navigate}/>
      <InstitutionSection/>
      <Testimonials/>
      <DonationSection/>
      <FinalCTA navigate={navigate}/>
      <Footer/>

      {showTop && (
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          style={{ position:'fixed', bottom:80, right:20, width:46, height:46,
            borderRadius:'50%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)',
            border:'none', cursor:'pointer', fontSize:20, zIndex:30,
            boxShadow:'0 4px 16px rgba(212,175,55,0.5)' }}>↑</button>
      )}
    </div>
  )
}
EOF

echo "  ✅ Landing.jsx rewritten cleanly"

# ── Step 3: Fix Navbar — use static SVG logo (no loop = no crash) ─
cat > src/components/landing/Navbar.jsx << 'EOF'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NavLogo() {
  const W=148, H=58
  const sunCX=W*0.595, sunCY=H*0.30, sunR=W*0.080
  const rays=[-85,-60,-35,-10,15,40,65,90]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ display:'block' }}>
      <defs>
        <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8860B"/><stop offset="50%" stopColor="#F5D76E"/>
          <stop offset="100%" stopColor="#D4AF37"/>
        </linearGradient>
        <filter id="nf"><feGaussianBlur stdDeviation="0.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <ellipse cx={sunCX} cy={sunCY+sunR*0.28} rx={sunR*0.9} ry={sunR*0.56}
        fill="url(#ng)" filter="url(#nf)"/>
      {rays.map((a,i)=>{
        const r=(a-90)*Math.PI/180, mj=i%2===0
        return <line key={i}
          x1={sunCX+Math.cos(r)*sunR*1.28} y1={sunCY+Math.sin(r)*sunR*1.28}
          x2={sunCX+Math.cos(r)*sunR*(mj?1.85:2.15)} y2={sunCY+Math.sin(r)*sunR*(mj?1.85:2.15)}
          stroke="url(#ng)" strokeWidth={mj?1.8:1.1} strokeLinecap="round"/>
      })}
      <line x1={sunCX+sunR*0.38} y1={sunCY+sunR*0.08}
        x2={sunCX+sunR*1.55} y2={sunCY-sunR*1.28}
        stroke="url(#ng)" strokeWidth={2.2} strokeLinecap="round"/>
      <polygon points={`${sunCX+sunR*1.55},${sunCY-sunR*1.28} ${sunCX+sunR*1.14},${sunCY-sunR*1.06} ${sunCX+sunR*1.32},${sunCY-sunR*0.65}`}
        fill="url(#ng)"/>
      <text x={W*0.015} y={H*0.78} fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize={H*0.54} fill="#FFFFFF">TRY</text>
      <text x={W*0.605} y={H*0.78} fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize={H*0.54} fill="url(#ng)" filter="url(#nf)">IT</text>
      <rect x={W*0.015} y={H*0.84} width={W*0.965} height={H*0.028} rx={H*0.014} fill="url(#ng)"/>
      <text x={W*0.5} y={H*0.965} textAnchor="middle" fontFamily="Arial,sans-serif"
        fontWeight="800" fontSize={H*0.155} letterSpacing={H*0.044} fill="url(#ng)">EDUCATIONS</text>
    </svg>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { label:'Features',     href:'#features'    },
    { label:'Exams',        href:'/exams'        },
    { label:'Pricing',      href:'/pro'          },
    { label:'Impact',       href:'/impact'       },
    { label:'Free Access',  href:'/equity'       },
    { label:'Institutions', href:'#institutions' },
  ]
  return (
    <>
      <nav style={{
        position:'sticky', top:0, zIndex:500,
        height:84,
        background: scrolled ? 'rgba(10,21,50,0.98)' : 'rgba(10,21,50,0.92)',
        backdropFilter:'blur(24px)',
        borderBottom:'1px solid rgba(212,175,55,0.2)',
        display:'flex', alignItems:'center',
        padding:'0 28px', gap:20, transition:'background 0.3s',
      }}>
        <div onClick={() => navigate('/')} style={{ cursor:'pointer', flexShrink:0 }}>
          <NavLogo/>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4, flex:1,
          justifyContent:'center' }} className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ color:'rgba(255,255,255,0.72)', fontSize:14,
                fontFamily:'Poppins,sans-serif', fontWeight:600,
                padding:'7px 13px', borderRadius:10, textDecoration:'none',
                transition:'all 0.2s', whiteSpace:'nowrap' }}
              onMouseEnter={e => { e.target.style.color='#D4AF37'; e.target.style.background='rgba(212,175,55,0.08)' }}
              onMouseLeave={e => { e.target.style.color='rgba(255,255,255,0.72)'; e.target.style.background='none' }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10,
          marginLeft:'auto', flexShrink:0 }}>
          {/* Green dot only — no fake numbers */}
          <div style={{ display:'flex', alignItems:'center', gap:6,
            background:'rgba(34,197,94,0.1)',
            border:'1px solid rgba(34,197,94,0.25)',
            borderRadius:20, padding:'6px 13px' }}>
            <span style={{ width:9, height:9, borderRadius:'50%',
              background:'#22C55E', display:'inline-block',
              animation:'liveDot 1.4s ease-in-out infinite' }}/>
            <span style={{ color:'rgba(255,255,255,0.7)', fontSize:12,
              fontFamily:'Inter,sans-serif' }}>Live</span>
          </div>
          <button onClick={() => navigate('/login')} style={{
            background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none',
            borderRadius:13, padding:'11px 26px',
            fontFamily:'Poppins,sans-serif', fontWeight:800,
            fontSize:15, color:'#1E3A5F', cursor:'pointer',
            boxShadow:'0 4px 14px rgba(212,175,55,0.35)' }}>
            Login →
          </button>
        </div>
      </nav>
      <style>{`
        @keyframes liveDot {
          0%   { box-shadow:0 0 0 0 rgba(34,197,94,0.6); }
          70%  { box-shadow:0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow:0 0 0 0 rgba(34,197,94,0); }
        }
        @media (max-width:768px) { .nav-links { display:none!important; } }
      `}</style>
    </>
  )
}
EOF

echo "  ✅ Navbar.jsx — static SVG logo, green dot only"

# ── Step 4: Make sure EquityPricingSection and DonationSection exist ──
if [ ! -f "src/components/landing/EquityPricingSection.jsx" ]; then
  cat > src/components/landing/EquityPricingSection.jsx << 'EOF'
export default function EquityPricingSection() { return null }
EOF
  echo "  ⚠️  EquityPricingSection — placeholder (run install_equity_donation_a11y.sh for full version)"
fi

if [ ! -f "src/components/landing/DonationSection.jsx" ]; then
  cat > src/components/landing/DonationSection.jsx << 'EOF'
export default function DonationSection() { return null }
EOF
  echo "  ⚠️  DonationSection — placeholder (run install_equity_donation_a11y.sh for full version)"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Emergency fix complete. Run: npm run dev             ║"
echo "╚══════════════════════════════════════════════════════════╝"
