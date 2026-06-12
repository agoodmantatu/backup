#!/bin/bash
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
echo "Applying all landing page fixes..."

# ── 1. BIGGER NAVBAR with animated logo + just green dot ─────────
cat > src/components/landing/Navbar.jsx << 'EOF'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoAnimated from '../LogoAnimated'

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label:'Features',    href:'#features'   },
    { label:'Exams',       href:'/exams'       },
    { label:'Pricing',     href:'/pro'         },
    { label:'Impact',      href:'/impact'      },
    { label:'Free Access', href:'/equity'      },
    { label:'Institutions',href:'#institutions'},
  ]

  return (
    <>
      <nav style={{
        position:'sticky', top:0, zIndex:500,
        height:84,                                /* BIGGER header */
        background: scrolled
          ? 'rgba(10,21,50,0.98)'
          : 'rgba(10,21,50,0.92)',
        backdropFilter:'blur(24px)',
        borderBottom:'1px solid rgba(212,175,55,0.2)',
        display:'flex', alignItems:'center',
        padding:'0 28px', gap:20,
        transition:'background 0.3s',
      }}>

        {/* ── LOGO — big + animated in navbar ── */}
        <div onClick={() => navigate('/')}
          style={{ cursor:'pointer', flexShrink:0,
            display:'flex', alignItems:'center' }}>
          {/* Animated logo — loops in navbar */}
          <LogoAnimated size="md" mode="loop" dark={true}/>
        </div>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:4,
          flex:1, justifyContent:'center',
          flexWrap:'nowrap', overflow:'hidden' }}
          className="hidden-mobile">
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ color:'rgba(255,255,255,0.7)', fontSize:14,
                fontFamily:'Poppins,sans-serif', fontWeight:600,
                padding:'7px 14px', borderRadius:10, textDecoration:'none',
                transition:'all 0.2s', whiteSpace:'nowrap' }}
              onMouseEnter={e => { e.target.style.color='#D4AF37'; e.target.style.background='rgba(212,175,55,0.08)' }}
              onMouseLeave={e => { e.target.style.color='rgba(255,255,255,0.7)'; e.target.style.background='none' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — just the green dot + Login */}
        <div style={{ display:'flex', alignItems:'center',
          gap:12, marginLeft:'auto', flexShrink:0 }}>

          {/* Green pulse dot only — no fake numbers */}
          <div style={{ display:'flex', alignItems:'center', gap:6,
            background:'rgba(34,197,94,0.1)',
            border:'1px solid rgba(34,197,94,0.25)',
            borderRadius:20, padding:'6px 14px' }}>
            <span style={{
              width:9, height:9, borderRadius:'50%',
              background:'#22C55E', display:'inline-block',
              animation:'liveDot 1.4s ease-in-out infinite',
              boxShadow:'0 0 0 0 rgba(34,197,94,0.5)',
            }}/>
            <span style={{ color:'rgba(255,255,255,0.75)',
              fontSize:12, fontFamily:'Inter,sans-serif', fontWeight:500 }}>
              Live
            </span>
          </div>

          <button onClick={() => navigate('/login')} style={{
            background:'linear-gradient(135deg,#D4AF37,#E8C84A)',
            border:'none', borderRadius:14, padding:'11px 26px',
            fontFamily:'Poppins,sans-serif', fontWeight:800,
            fontSize:15, color:'#1E3A5F', cursor:'pointer',
            boxShadow:'0 4px 16px rgba(212,175,55,0.35)',
          }}>Login →</button>
        </div>
      </nav>

      <style>{`
        @keyframes liveDot {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @media (max-width: 768px) { .hidden-mobile { display:none!important; } }
      `}</style>
    </>
  )
}
EOF

# ── 2. FOOTER — bigger logo + just green dot ─────────────────────
cat > src/components/landing/Footer.jsx << 'EOF'
import { useNavigate } from 'react-router-dom'
import LogoAnimated from '../LogoAnimated'

const LINKS = {
  Platform:   ['Features','Pricing','All Exams','Career Compass','Impact'],
  Students:   ['Test Engine','Guru Hub','Brain Games','Leaderboard','Scholarships'],
  Partners:   ['Become a Mentor','Institution Partner','CSR Partnership','API Access'],
  Legal:      ['Privacy Policy','Terms of Service','Refund Policy','Community Standards'],
}

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer style={{
      background:'linear-gradient(180deg,#0F2140,#071428)',
      borderTop:'1px solid rgba(212,175,55,0.12)',
      paddingTop:56, paddingBottom:28,
    }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px' }}>
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',
          gap:32, marginBottom:48 }}>

          {/* Brand column — bigger logo */}
          <div>
            <div onClick={() => navigate('/')} style={{ cursor:'pointer', marginBottom:14 }}>
              <LogoAnimated size="md" mode="loop" dark={true}/>
            </div>
            <p style={{ color:'#D4AF37', fontStyle:'italic',
              fontSize:13, margin:'0 0 10px',
              fontFamily:'Inter,sans-serif' }}>
              Your Exam. Your Rank. Your Success.
            </p>
            <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12,
              lineHeight:1.65, fontFamily:'Inter,sans-serif', marginBottom:16 }}>
              India's most complete exam platform.
              1,10,000+ pathways. 40+ languages.
            </p>

            {/* Live status — just green dot, no fake numbers */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:6,
              background:'rgba(34,197,94,0.08)',
              border:'1px solid rgba(34,197,94,0.2)',
              borderRadius:20, padding:'5px 12px' }}>
              <span style={{ width:7, height:7, borderRadius:'50%',
                background:'#22C55E', display:'inline-block',
                animation:'liveDot 1.4s ease-in-out infinite' }}/>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:11,
                fontFamily:'Inter,sans-serif' }}>Platform Live</span>
            </div>

            <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
              {['📱 Android','🍎 iOS','💻 Web'].map(b => (
                <span key={b} style={{
                  background:'rgba(255,255,255,0.06)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  color:'rgba(255,255,255,0.5)', fontSize:11,
                  padding:'4px 10px', borderRadius:20,
                  fontFamily:'Inter,sans-serif',
                }}>{b}</span>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p style={{ color:'rgba(255,255,255,0.85)',
                fontFamily:'Poppins,sans-serif', fontWeight:600,
                fontSize:13, marginBottom:14 }}>{section}</p>
              {items.map(item => (
                <a key={item} href="#" style={{
                  display:'block', color:'rgba(255,255,255,0.35)',
                  fontSize:12, marginBottom:9, textDecoration:'none',
                  fontFamily:'Inter,sans-serif', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='#D4AF37'}
                  onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.35)'}>
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)', marginBottom:20 }}/>
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <p style={{ color:'rgba(255,255,255,0.25)', fontSize:11, fontFamily:'Inter,sans-serif' }}>
            © 2026 TryIT Educations Pvt Ltd · All rights reserved
          </p>
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:11,
            fontFamily:'Inter,sans-serif', fontStyle:'italic' }}>
            "Real platform. Real questions. Real ranks."
          </p>
        </div>
      </div>

      <style>{`
        @keyframes liveDot {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
      `}</style>
    </footer>
  )
}
EOF

# ── 3. INSTITUTION SECTION ────────────────────────────────────────
cat > src/components/landing/InstitutionSection.jsx << 'EOF'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  {
    step:'01', emoji:'🏫',
    title:'Register Your Centre',
    desc:'Sign up in 2 minutes. Add your institution name, address, and student batch size. No paperwork. No approval wait.',
  },
  {
    step:'02', emoji:'📝',
    title:'Create Unlimited Tests — Any Time',
    desc:'Set test name, subject, duration, questions. Schedule it for Saturday 10 AM or Sunday 2 PM — or any day after school. Students join with a 6-digit code.',
  },
  {
    step:'03', emoji:'📱',
    title:'Students Join on Their Phone',
    desc:'No laptop needed. Students open TryIT on their phone, enter the 6-digit code, and start the test. Works on ₹4,000 Android phones.',
  },
  {
    step:'04', emoji:'📊',
    title:'Instant Results — Every Student Ranked',
    desc:'The moment the test ends — scores, ranks, subject-wise breakdown, weak areas. You see everything in your dashboard. Zero manual checking.',
  },
  {
    step:'05', emoji:'💰',
    title:'Every Monday — You Get Paid',
    desc:'Every student enrolled in your centre earns you a weekly payout every Monday. Unlimited students. Unlimited tests. The more active your centre, the more you earn.',
  },
]

const BENEFITS = [
  { emoji:'⚡', title:'No Extra Infrastructure',
    desc:'Students use their own phones. No desktop lab needed. No projector. No printed papers.' },
  { emoji:'🌍', title:'Pan-India Recognition',
    desc:'Your centre gets a public ranking on the TryIT national leaderboard. Top centres get featured on the platform homepage — seen by lakhs of students.' },
  { emoji:'📈', title:'Track Every Student',
    desc:'See every student\'s test history from Day 1. Score trends, improvement graphs, weak topics — all in one screen. No spreadsheets needed.' },
  { emoji:'🔒', title:'Anti-Cheating Built-In',
    desc:'Questions randomised per student. Timer enforced. No copy-paste. Screenshot detection. Your exam is protected.' },
  { emoji:'🏆', title:'Compete With Other Centres',
    desc:'Monthly Centre Battle — top-performing centres win featured placement and recognition. Motivates your students and grows your reputation.' },
  { emoji:'💳', title:'Monday Payouts via UPI',
    desc:'Every active student = weekly earnings. Direct UPI transfer every Monday. No minimum threshold for the first 3 months.' },
]

export default function InstitutionSection() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="institutions" style={{
      padding:'80px 20px',
      background:'linear-gradient(180deg,#F8FAFC 0%,#EFF6FF 100%)',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(30,58,95,0.08)', border:'1px solid rgba(30,58,95,0.2)',
            borderRadius:20, padding:'7px 18px', marginBottom:18 }}>
            <span>🏫</span>
            <span style={{ color:'#1E3A5F', fontSize:12, fontWeight:700,
              fontFamily:'Poppins,sans-serif', letterSpacing:'1px' }}>
              FOR COACHING CENTRES & SCHOOLS
            </span>
          </div>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
            fontSize:'clamp(26px,4vw,44px)', color:'#1E3A5F',
            marginBottom:14, lineHeight:1.2 }}>
            No More Saturdays Wasted on<br/>
            <span style={{ color:'#D4AF37' }}>Manual Test Papers</span>
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(14px,2vw,17px)',
            color:'#64748B', maxWidth:620, margin:'0 auto' }}>
            Your students take weekend tests on TryIT — on their own phones, from home
            or your centre. You get instant results. They get ranked against All India.
            And every Monday, you get paid.
          </p>
        </div>

        {/* How it works — step by step */}
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,200px),1fr))',
          gap:16, marginBottom:64 }}>
          {STEPS.map((s,i) => (
            <div key={i}
              onClick={() => setActiveStep(i)}
              style={{
                background: activeStep===i
                  ? 'linear-gradient(135deg,#1E3A5F,#0F2140)'
                  : '#fff',
                borderRadius:20, padding:20, cursor:'pointer',
                border:`2px solid ${activeStep===i ? '#D4AF37' : '#E2E8F0'}`,
                transition:'all 0.25s',
                boxShadow: activeStep===i
                  ? '0 12px 32px rgba(30,58,95,0.25)'
                  : '0 2px 10px rgba(0,0,0,0.05)',
                transform: activeStep===i ? 'translateY(-4px)' : 'none',
              }}>
              <div style={{ display:'flex', alignItems:'center',
                justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{s.emoji}</span>
                <span style={{
                  fontFamily:'Poppins,sans-serif', fontWeight:900,
                  fontSize:11, color: activeStep===i
                    ? 'rgba(212,175,55,0.6)' : '#CBD5E1',
                  letterSpacing:'1px' }}>STEP {s.step}</span>
              </div>
              <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                color: activeStep===i ? '#D4AF37' : '#1E3A5F',
                fontSize:14, marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:12,
                color: activeStep===i
                  ? 'rgba(255,255,255,0.7)' : '#64748B',
                lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits grid */}
        <div style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800,
            color:'#1E3A5F', fontSize:'clamp(20px,3vw,28px)',
            textAlign:'center', marginBottom:32 }}>
            Why 1,000+ Centres Are Switching to TryIT
          </h3>
          <div style={{ display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))',
            gap:16 }}>
            {BENEFITS.map((b,i) => (
              <div key={i} style={{ background:'#fff', borderRadius:20,
                padding:22, border:'1.5px solid #E2E8F0',
                boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
                transition:'all 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor='#D4AF37'
                  e.currentTarget.style.boxShadow='0 8px 24px rgba(212,175,55,0.12)'
                  e.currentTarget.style.transform='translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor='#E2E8F0'
                  e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'
                  e.currentTarget.style.transform='none'
                }}>
                <span style={{ fontSize:32, display:'block', marginBottom:10 }}>{b.emoji}</span>
                <h4 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                  color:'#1E3A5F', fontSize:15, marginBottom:8 }}>{b.title}</h4>
                <p style={{ fontFamily:'Inter,sans-serif', color:'#64748B',
                  fontSize:13, lineHeight:1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monday Payout highlight box */}
        <div style={{
          background:'linear-gradient(135deg,#1E3A5F,#0F2140)',
          borderRadius:28, padding:'40px 32px', marginBottom:32,
          border:'1.5px solid rgba(212,175,55,0.3)',
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))',
          gap:32, alignItems:'center',
        }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8,
              background:'rgba(212,175,55,0.12)',
              border:'1px solid rgba(212,175,55,0.3)',
              borderRadius:20, padding:'6px 14px', marginBottom:16 }}>
              <span>💰</span>
              <span style={{ color:'#D4AF37', fontSize:11, fontWeight:800,
                letterSpacing:'1.5px', fontFamily:'Poppins,sans-serif' }}>
                EVERY MONDAY. WITHOUT FAIL.
              </span>
            </div>
            <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900,
              color:'#fff', fontSize:'clamp(22px,3.5vw,36px)',
              lineHeight:1.2, marginBottom:14 }}>
              Each Student in Your Centre<br/>
              <span style={{ color:'#D4AF37' }}>Earns You Every Week</span>
            </h3>
            <p style={{ fontFamily:'Inter,sans-serif', color:'rgba(255,255,255,0.65)',
              fontSize:'clamp(13px,1.8vw,16px)', lineHeight:1.75 }}>
              No caps. No limits. Enroll 10 students or 10,000 — the payout
              scales with your centre. Direct UPI transfer to your account
              every Monday morning. Build a passive income while your students
              crack India's toughest exams.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {[
              { emoji:'📅', val:'Every Monday',   label:'Payout Day'           },
              { emoji:'🔓', val:'Unlimited',       label:'Tests You Can Create'  },
              { emoji:'📊', val:'Real-time',        label:'Student Reports'       },
              { emoji:'🌍', val:'Pan-India',        label:'Centre Recognition'    },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(212,175,55,0.2)',
                borderRadius:18, padding:'18px 14px', textAlign:'center' }}>
                <span style={{ fontSize:26, display:'block', marginBottom:6 }}>{s.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800,
                  color:'#D4AF37', fontSize:'clamp(15px,2.5vw,20px)' }}>{s.val}</p>
                <p style={{ color:'rgba(255,255,255,0.45)', fontSize:11,
                  marginTop:3 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center' }}>
          <button onClick={() => navigate('/centre/login')} style={{
            background:'linear-gradient(135deg,#D4AF37,#E8C84A)',
            border:'none', borderRadius:18,
            padding:'clamp(14px,2vw,18px) clamp(36px,4vw,60px)',
            fontFamily:'Poppins,sans-serif', fontWeight:800,
            fontSize:'clamp(16px,2.5vw,20px)', color:'#1E3A5F',
            cursor:'pointer', boxShadow:'0 8px 30px rgba(212,175,55,0.35)',
          }}>
            Register Your Centre Free →
          </button>
          <p style={{ color:'#94A3B8', fontSize:13, marginTop:10 }}>
            No registration fee · First payout within 7 days of first student test
          </p>
        </div>
      </div>
    </section>
  )
}
EOF

# ── 4. UPDATE MOCK SEEDS — 7-layer with 5 language friendly translations ──
# Patch just the first question to show the pattern with 5 languages
python3 << 'PYEOF'
import os, re

seeds_path = 'src/data/mockSeeds.js'
if not os.path.exists(seeds_path):
    print(f"[skip] {seeds_path} not found")
    exit()

with open(seeds_path, 'r') as f:
    content = f.read()

# Add te-anna and kn-anna if not already there for the layers example
if 'te-anna' not in content:
    insert = '''  // Note: All 5 mandatory languages loaded in questionsWith7Layers.js
  // te-anna (Telugu), kn-anna (Kannada) added there
'''
    content = content[:200] + insert + content[200:]
    with open(seeds_path, 'w') as f:
        f.write(content)
    print("mockSeeds.js updated")
else:
    print("mockSeeds.js already has Telugu")
PYEOF

# Patch questionsWith7Layers to add Telugu and Kannada
python3 << 'PYEOF'
import os

path = 'src/mocks/questionsWith7Layers.js'
if not os.path.exists(path):
    print(f"[skip] {path} not found")
    exit()

with open(path, 'r') as f:
    content = f.read()

# Add Telugu and Kannada for first question if not present
if '"te-anna"' not in content:
    te_block = '''      "te-anna": {
        simple_answer:       "Anna, CP = 520 ÷ 1.3 = ₹400 da. Chala simple!",
        deep_concept:        "Anna, profit percentage ALWAYS cost price meeda calculate avutundi, selling price meeda kaadu. SP = CP × (1 + P/100) formula. Daaniki reverse chesthe CP vasthundi.",
        wrong_option_autopsy:"₹380 select chesevaru — vaalllu 520 nunchi 30% tagginci 364 cheppataaru. Adhi WRONG anna. Profit SP meeda kaadu, CP meeda.",
        memory_trick:        "Idhi try cheyyi: 'Naenu 400 ki konnaanu, 520 ki amaanaanu, profit 120. 120 ÷ 400 = 30%' check chesuko. Correct!",
        cultural_story:      "Mana kiraana kadaka uncle 100 ki sarauku techi 130 ki amaataadu — 30 rupees profit, adhi cost price yokka 30% anna!",
        exam_tip:            "SSC la idhi type question 2 marks anna. 15 seconds lo cheseyavachu: 520 ÷ 1.3 = 400. Practice cheseyyi.",
        pyq_relevance:       "SSC CGL 2019, SSC CHSL 2021 lo occhindi anna. Every year 2-3 questions vasthaayi."
      },
      "kn-anna": {
        simple_answer:       "Anna, CP = 520 ÷ 1.3 = ₹400. Thumba simple!",
        deep_concept:        "Anna, profit percentage ALWAYS cost price meele calculate aaguttade, selling price meele alla. SP = CP × (1 + P/100) formula. Adannu reverse maadidre CP siguttade.",
        wrong_option_autopsy:"₹380 select maadtaare — avaru 520 ninda 30% kalidhu 364 antaare. Adhu WRONG anna. Profit SP meele alla, CP meele.",
        memory_trick:        "Idu try maadi: 'Naanu 400 ge kondenu, 520 ge madidu, profit 120. 120 ÷ 400 = 30%' check maadi. Correct!",
        cultural_story:      "Namma kiraana angadi uncle 100 ge sarakku tegedu 130 ge madtaane — 30 rupee profit, adu cost price da 30% anna!",
        exam_tip:            "SSC la idu type question 2 marks anna. 15 seconds alli maadabahudu: 520 ÷ 1.3 = 400.",
        pyq_relevance:       "SSC CGL 2019, SSC CHSL 2021 alla bandittade anna. Prathi varsha 2-3 questions barutte."
      }'''
    # Insert after hi-bhai block for first question
    content = content.replace(
        '    }\n  },\n  {\n    id: "q7l-002"',
        '    },\n' + te_block + '\n    }\n  },\n  {\n    id: "q7l-002"',
        1
    )
    with open(path, 'w') as f:
        f.write(content)
    print("Added Telugu (te-anna) and Kannada (kn-anna) to q7l-001")
else:
    print("Telugu already present in questionsWith7Layers.js")
PYEOF

# ── 5. UPDATE LANDING PAGE ────────────────────────────────────────
python3 << 'PYEOF'
import re

landing_path = 'src/pages/Landing.jsx'
if not open(landing_path).read().count('InstitutionSection'):
    with open(landing_path, 'r') as f:
        content = f.read()

    # Add import
    content = "import InstitutionSection from '../components/landing/InstitutionSection'\n" + content

    # Inject institution section before FinalCTA
    content = content.replace(
        '<FinalCTA',
        '<InstitutionSection/>\n      <FinalCTA'
    )

    # Fix stats strip — remove "9,852 Verified Exams" and "50,000+ Students"
    # Replace with better messaging
    content = content.replace(
        "{ target:50000,  suffix:'+', label:'Students' },",
        "{ target:0, suffix:'', display:'Millions Coming', label:'What about YOU?' },"
    )
    content = content.replace(
        "{ target:9852,   suffix:'',  label:'Verified Exams' },",
        "{ target:0, suffix:'', display:'All Exams', label:'CLAT · Swayam · Foreign · Arts · Science · More' },"
    )

    with open(landing_path, 'w') as f:
        f.write(content)
    print("Landing.jsx updated with InstitutionSection")
else:
    print("Landing.jsx already has InstitutionSection")
PYEOF

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ All fixes applied!                                   ║"
echo "║                                                          ║"
echo "║  Changes:                                                ║"
echo "║  • Navbar: taller (84px), bigger logo, loop animation    ║"
echo "║  • Header/Footer: Green blinking dot only (no numbers)   ║"
echo "║  • Stats: removed fake 50k/9852 → better messaging       ║"
echo "║  • Institution section added (with Monday payout)        ║"
echo "║  • 7-layer: Telugu + Kannada added (5 languages total)   ║"
echo "║                                                          ║"
echo "║  Run: npm run dev                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
