#!/bin/bash
# TryIT — Order 3 Pages: Career Compass, Scholarships, Pricing, Wallet, Family Hub
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
echo "Installing Order 3 pages..."
mkdir -p src/pages/career-compass src/pages/scholarships src/pages/pricing
mkdir -p src/pages/wallet src/pages/family
mkdir -p src/pages/career-compass src/pages/scholarships src/pages/pricing
mkdir -p src/pages/wallet src/pages/family

# ── CAREER COMPASS ────────────────────────────────────────────────
cat > src/pages/career-compass/CareerCompass.jsx << 'EOF'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'

const QUESTIONS = [
  {
    id:'age', text:'How old are you?', emoji:'🎂',
    options:['Under 18','18–22','23–28','29–35','36+'],
  },
  {
    id:'education', text:'Your highest qualification?', emoji:'🎓',
    options:['Class 10 / Below','Class 12','Diploma / ITI','Graduate (Any)','Post Graduate'],
  },
  {
    id:'stream', text:'Your academic stream?', emoji:'📚',
    options:['Science (PCM)','Science (PCB)','Commerce','Arts / Humanities','Engineering / Tech','Other'],
  },
  {
    id:'salary', text:'Target monthly salary?', emoji:'💰',
    options:['₹15,000–₹30,000','₹30,000–₹60,000','₹60,000–₹1 Lakh','₹1–₹2 Lakh','₹2 Lakh+'],
  },
  {
    id:'prep_time', text:'How much time can you study daily?', emoji:'⏰',
    options:['1–2 hours','2–4 hours','4–6 hours','6–8 hours','Full-time (8+ hrs)'],
  },
  {
    id:'location', text:'Preferred work location?', emoji:'📍',
    options:['My home state','Any state in India','Central government post','Private sector OK','Open to abroad'],
  },
  {
    id:'strength', text:'Your strongest subject?', emoji:'💪',
    options:['Mathematics / Quant','Reasoning / Logic','English / Languages','Science / Biology','General Knowledge','Computer / IT'],
  },
  {
    id:'timeline', text:'When do you want to clear the exam?', emoji:'📅',
    options:['Within 6 months','6–12 months','1–2 years','2–3 years','Just exploring'],
  },
]

const EXAM_MATCHES = {
  'Science (PCM)':   [{ name:'JEE Main',    match:94, desc:'B.Tech at NITs/IIITs', salary:'₹8–25 LPA',   emoji:'🔬', id:'jee-main'   },
                      { name:'GATE CS/ME',   match:88, desc:'PSU jobs or M.Tech',  salary:'₹6–18 LPA',   emoji:'⚙️', id:'gate'       }],
  'Science (PCB)':   [{ name:'NEET UG',      match:95, desc:'MBBS/BDS admission',  salary:'₹8–30 LPA',   emoji:'🩺', id:'neet-ug'    },
                      { name:'AIIMS NORCET', match:82, desc:'Nursing at AIIMS',    salary:'₹4–8 LPA',    emoji:'🏥', id:'aiims'      }],
  'Commerce':        [{ name:'CA Foundation',match:91, desc:'Chartered Accountant',salary:'₹6–25 LPA',   emoji:'📊', id:'ca-found'   },
                      { name:'IBPS PO',       match:87, desc:'Bank Probationary Officer', salary:'₹5–9 LPA', emoji:'🏦', id:'ibps-po' }],
  'Arts / Humanities':[{ name:'UPSC CSE',    match:89, desc:'IAS/IPS/IFS',        salary:'₹56,100+/mo', emoji:'🏛️', id:'upsc-cse'   },
                       { name:'SSC CGL',      match:85, desc:'Central Govt Grade B',salary:'₹4–8 LPA',   emoji:'📋', id:'ssc-cgl'   }],
  'default':          [{ name:'SSC CGL',      match:87, desc:'Central Govt Grade B',salary:'₹4–8 LPA',   emoji:'📋', id:'ssc-cgl'   },
                       { name:'IBPS PO',      match:83, desc:'Bank PO',            salary:'₹5–9 LPA',    emoji:'🏦', id:'ibps-po'   },
                       { name:'RRB NTPC',     match:79, desc:'Railway Non-Technical',salary:'₹3–6 LPA',  emoji:'🚂', id:'rrb-ntpc'  },
                       { name:'SSC CHSL',     match:76, desc:'Lower Division Clerk',salary:'₹3–5 LPA',   emoji:'📄', id:'ssc-chsl'  },
                       { name:'NDA',          match:72, desc:'Defence Services',   salary:'₹56,100+/mo', emoji:'🎖️', id:'nda'       }],
}

export default function CareerCompass() {
  const navigate = useNavigate()
  const [step,     setStep]    = useState(0)      // -1 = intro, 0-7 = questions, 8 = results
  const [answers,  setAnswers] = useState({})
  const [started,  setStarted] = useState(false)

  const q = QUESTIONS[step]
  const progress = started ? Math.round((step / QUESTIONS.length) * 100) : 0

  const answer = (val) => {
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (step < QUESTIONS.length - 1) setStep(s => s + 1)
    else setStep(QUESTIONS.length) // results
  }

  const getMatches = () => {
    const stream = answers.stream || 'default'
    const base = EXAM_MATCHES[stream] || EXAM_MATCHES.default
    // Adjust match % based on time available
    const timeMod = answers.prep_time === 'Full-time (8+ hrs)' ? 3
      : answers.prep_time === '6–8 hours' ? 2
      : answers.prep_time === '4–6 hours' ? 0
      : answers.prep_time === '2–4 hours' ? -3 : -5
    return [
      ...base,
      ...EXAM_MATCHES.default.filter(e => !base.find(b => b.name === e.name))
    ].map(e => ({ ...e, match: Math.min(99, Math.max(60, e.match + timeMod)) }))
     .sort((a,b) => b.match - a.match).slice(0, 5)
  }

  if (!started) return (
    <AppLayout>
      <div style={{ maxWidth:560, margin:'0 auto', textAlign:'center', padding:'40px 0' }}>
        <div style={{ fontSize:64, marginBottom:20 }}>🧭</div>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:32, marginBottom:12 }}>Career Compass</h1>
        <p style={{ color:'#64748B', fontSize:16, lineHeight:1.7, marginBottom:28 }}>
          Answer 8 questions. Get your top 5 exam matches from 1,10,000+ pathways.
          Personalised to your age, education, stream, and goals.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:32, textAlign:'left', background:'#F8FAFC', borderRadius:18, padding:20, border:'1.5px solid #E2E8F0' }}>
          {[['🎂','Your age and education level'],['💪','Your strongest subjects'],['💰','Your salary target'],['⏰','How much time you can study']].map(([e,t]) => (
            <div key={t} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:20 }}>{e}</span>
              <span style={{ color:'#475569', fontSize:14 }}>{t}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setStarted(true)} style={{ background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:16, padding:'16px 48px', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:18, color:'#1E3A5F', cursor:'pointer', boxShadow:'0 6px 24px rgba(212,175,55,0.4)' }}>
          Start 8-Question Quiz →
        </button>
        <p style={{ color:'#94A3B8', fontSize:12, marginTop:12 }}>Takes about 2 minutes</p>
      </div>
    </AppLayout>
  )

  if (step === QUESTIONS.length) {
    const matches = getMatches()
    return (
      <AppLayout>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ fontSize:52, marginBottom:12 }}>🎯</div>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:28, marginBottom:8 }}>Your Perfect Exam Matches</h2>
            <p style={{ color:'#64748B', fontSize:15 }}>Based on your profile · From 1,10,000+ pathways</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
            {matches.map((m,i) => (
              <div key={i} onClick={() => navigate(`/exams/${m.id}/universe`)}
                style={{ background:'#fff', borderRadius:20, padding:20, border:`1.5px solid ${i===0?'#D4AF37':'#E2E8F0'}`, boxShadow: i===0?'0 8px 24px rgba(212,175,55,0.15)':'0 2px 8px rgba(0,0,0,0.04)', cursor:'pointer', display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:52, height:52, borderRadius:16, background: i===0?'linear-gradient(135deg,#D4AF37,#E8C84A)':'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{m.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:16 }}>{m.name}</p>
                    {i===0 && <span style={{ background:'#D4AF37', color:'#1E3A5F', fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:20 }}>BEST MATCH</span>}
                  </div>
                  <p style={{ color:'#64748B', fontSize:13 }}>{m.desc} · {m.salary}</p>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color: i===0?'#22C55E':i<3?'#D4AF37':'#64748B', fontSize:22 }}>{m.match}%</p>
                  <p style={{ color:'#94A3B8', fontSize:10 }}>match</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button onClick={() => { setStep(0); setAnswers({}); }} style={{ flex:1, minWidth:140, background:'#F1F5F9', border:'none', borderRadius:14, padding:'12px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, color:'#64748B', cursor:'pointer' }}>↩ Retake Quiz</button>
            <button onClick={() => navigate('/test-engine')} style={{ flex:2, minWidth:200, background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'12px', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:14, color:'#1E3A5F', cursor:'pointer' }}>Start Preparing for {matches[0]?.name} →</button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div style={{ maxWidth:600, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <button onClick={() => step>0 ? setStep(s=>s-1) : setStarted(false)}
            style={{ background:'none', border:'none', color:'#64748B', cursor:'pointer', fontSize:14, fontFamily:'Poppins,sans-serif' }}>← Back</button>
          <span style={{ color:'#94A3B8', fontSize:13 }}>{step+1} / {QUESTIONS.length}</span>
        </div>
        <div style={{ height:6, background:'#F1F5F9', borderRadius:3, marginBottom:32 }}>
          <div style={{ width:`${progress}%`, height:6, borderRadius:3, background:'linear-gradient(90deg,#D4AF37,#E8C84A)', transition:'width 0.4s ease' }}/>
        </div>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <span style={{ fontSize:52 }}>{q.emoji}</span>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:'clamp(20px,3vw,28px)', marginTop:14 }}>{q.text}</h2>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {q.options.map(opt => (
            <button key={opt} onClick={() => answer(opt)} style={{ padding:'16px 20px', borderRadius:16, border:`1.5px solid ${answers[q.id]===opt?'#D4AF37':'#E2E8F0'}`, background: answers[q.id]===opt?'rgba(212,175,55,0.08)':'#fff', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:15, color: answers[q.id]===opt?'#1E3A5F':'#475569', cursor:'pointer', textAlign:'left', transition:'all 0.15s', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              {opt}
              {answers[q.id]===opt && <span style={{ color:'#D4AF37', fontWeight:800 }}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
EOF
echo "CareerCompass done"
# ── SCHOLARSHIPS HUB ─────────────────────────────────────────────
cat > src/pages/scholarships/ScholarshipHub.jsx << 'EOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const SCHOLARSHIPS = [
  { id:'ntse',     name:'NTSE (National Talent Search)',  org:'NCERT',       amount:'₹1,250/month', deadline:'Nov 2026', class:'Class 10', category:'Merit', match:94, emoji:'⭐', link:'ncert.nic.in' },
  { id:'nmms',     name:'NMMS (National Means-cum-Merit)',org:'Govt of India',amount:'₹12,000/year',deadline:'Oct 2026', class:'Class 8',  category:'Merit+Need', match:88, emoji:'🌟', link:'scholarships.gov.in' },
  { id:'inspire',  name:'INSPIRE Scholarship (SHE)',      org:'DST',         amount:'₹80,000/year', deadline:'Sep 2026', class:'Class 11+',category:'Science', match:72, emoji:'🔬', link:'online-inspire.nic.in' },
  { id:'pm-yasasvi',name:"PM YASASVI Scholarship",       org:'NTA',         amount:'₹75,000–₹1.25L',deadline:'Aug 2026',class:'Class 9–11',category:'OBC/EBC', match:80, emoji:'🏆', link:'yet.nta.ac.in' },
  { id:'csss',     name:'Central Sector Scheme (CSSS)',   org:'Govt of India',amount:'₹12,000/year', deadline:'Oct 2026', class:'Class 12+',category:'Merit', match:85, emoji:'📚', link:'scholarships.gov.in' },
  { id:'swami-vivekananda',name:'Swami Vivekananda Merit Scholarship',org:'Govt of WB',amount:'₹60,000/year',deadline:'Aug 2026',class:'Class 11+',category:'Merit',match:65, emoji:'🧘', link:'svmcm.wbhed.gov.in' },
  { id:'ugc-net',  name:'UGC NET JRF Fellowship',         org:'UGC',         amount:'₹37,000/month', deadline:'Dec 2026', class:'Post Graduate',category:'Research',match:60, emoji:'🎓', link:'ugcnet.nta.nic.in' },
  { id:'ishan',    name:'Ishan Uday NE Scholarship',      org:'UGC',         amount:'₹5,400–7,800/month',deadline:'Oct 2026',class:'Undergrad',category:'Northeast', match:55, emoji:'🌿', link:'ishan.ucanapply.com' },
  { id:'begum-hazrat',name:'Begum Hazrat Mahal Scholarship',org:'Maulana Azad',amount:'₹5,000–6,000/year',deadline:'Sep 2026',class:'Class 9–12',category:'Minority Girls',match:58, emoji:'🌸', link:'maef.nic.in' },
  { id:'pragati',  name:'AICTE Pragati Scholarship (Girls)',org:'AICTE',     amount:'₹50,000/year',  deadline:'Nov 2026', class:'B.Tech 1st yr',category:'Girls in Tech',match:70, emoji:'👩‍💻', link:'scholarships.gov.in' },
  { id:'nsp-pre',  name:'Pre-Matric Scholarship (SC/ST)', org:'Govt of India',amount:'₹150–350/month',deadline:'Oct 2026',class:'Class 1–10',category:'SC/ST',match:75, emoji:'🌱', link:'scholarships.gov.in' },
  { id:'pm-pvtg',  name:"PM PVTG Development Mission",    org:'MoTA',        amount:'₹15,000/year',  deadline:'Aug 2026', class:'Any',      category:'Tribal',match:50, emoji:'🏔️', link:'tribal.gov.in' },
]

const CATEGORIES = ['All','Merit','Merit+Need','Science','OBC/EBC','Girls in Tech','SC/ST','Northeast','Research','Tribal','Minority']

export default function ScholarshipHub() {
  const { showToast } = useToast()
  const [cat, setCat]   = useState('All')
  const [saved, setSave] = useState(new Set())
  const [search, setSearch] = useState('')

  const filtered = SCHOLARSHIPS.filter(s => {
    const matchCat = cat==='All' || s.category===cat
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }).sort((a,b) => b.match - a.match)

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🎓 Scholarship Hub</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>800+ scholarships tracked · Deadline alerts · Free money for your education</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,180px),1fr))', gap:12, marginBottom:20 }}>
        {[['🎓','800+','Scholarships'],['⏰','12','Closing Soon'],['💰','₹2.8L','Avg Per Year'],['📊','98%','Free to Apply']].map(([e,v,l]) => (
          <div key={l} style={{ background:'#fff', borderRadius:18, padding:'14px 12px', textAlign:'center', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize:24 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:20 }}>{v}</p>
            <p style={{ color:'#94A3B8', fontSize:11, marginTop:2 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom:16 }}>
        <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:18 }}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search scholarships by name or organisation..."
          style={{ width:'100%', padding:'13px 16px 13px 42px', borderRadius:16, border:'1.5px solid #E2E8F0', fontSize:14, fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box', background:'#fff' }}
          onFocus={e=>e.target.style.borderColor='#D4AF37'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
      </div>

      {/* Category filter */}
      <div style={{ display:'flex', gap:8, marginBottom:20, overflowX:'auto', paddingBottom:4 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding:'7px 16px', borderRadius:20, border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, background: cat===c?'#1E3A5F':'#fff', color: cat===c?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>{c}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
              <span style={{ fontSize:28, flexShrink:0 }}>{s.emoji}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{s.name}</p>
                    <p style={{ color:'#64748B', fontSize:12, marginTop:2 }}>{s.org} · {s.class}</p>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#22C55E', fontSize:18 }}>{s.amount}</p>
                    <p style={{ color:'#94A3B8', fontSize:11 }}>per year</p>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <span style={{ background:'#FEF3C7', color:'#92400E', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>⏰ {s.deadline}</span>
                  <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20 }}>{s.category}</span>
                  <span style={{ background:'#DCFCE7', color:'#15803D', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>Profile match: {s.match}%</span>
                  <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
                    <button onClick={() => { setSave(p=>{ const n=new Set(p); n.has(s.id)?n.delete(s.id):n.add(s.id); return n }); showToast('success', saved.has(s.id)?'Removed':'🔖 Deadline saved!') }}
                      style={{ background:'none', border:'none', fontSize:18, cursor:'pointer', color: saved.has(s.id)?'#D4AF37':'#CBD5E1' }}>
                      {saved.has(s.id)?'★':'☆'}
                    </button>
                    <button onClick={() => showToast('info',`Opening ${s.link}...`)}
                      style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', border:'none', borderRadius:10, padding:'7px 16px', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:12, cursor:'pointer' }}>
                      Apply →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
EOF
echo "Scholarships done"
# ── PRICING PAGE ─────────────────────────────────────────────────
cat > src/pages/pricing/PricingPage.jsx << 'EOF'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const PLANS = [
  {
    id:'trial', name:'₹19 Trial', price:19, period:'7 days',
    color:'#22C55E', bg:'linear-gradient(135deg,#065F46,#047857)',
    badge:'START HERE', popular:false,
    features:[
      '7 full mock tests (any exam)',
      'All-India ranking after each test',
      'Guru Hub — 5 doubt questions',
      '7-layer explanations',
      'Career Compass quiz',
      'Access in all 40+ languages',
      'Student ID Card (Royal Gold template)',
    ],
    cta:'Start ₹19 Trial',
  },
  {
    id:'plus', name:'TryIT Plus', price:199, period:'month',
    color:'#1E3A5F', bg:'linear-gradient(135deg,#1E3A5F,#0F2140)',
    badge:'MOST POPULAR', popular:true,
    features:[
      'Unlimited mock tests',
      'All-India + State rankings',
      'Unlimited Guru Hub doubts',
      'All 5 ID Card templates + 3D flip',
      'Focus Mode + Ambient sounds',
      'Current Affairs daily',
      'Study Planner + Roadmap',
      'The Hall (join or create)',
      'Brain Games unlimited',
      'Download question PDFs',
    ],
    cta:'Get Plus — ₹199/mo',
  },
  {
    id:'pro', name:'TryIT Pro', price:399, period:'month',
    color:'#D4AF37', bg:'linear-gradient(135deg,#92400E,#B45309)',
    badge:'BEST VALUE', popular:false,
    features:[
      'Everything in Plus',
      'Guru Books — 3 free/month',
      'Mentor 1-on-1 doubt sessions',
      'Previous 10-year PYQ bank',
      'Performance AI analysis',
      'Family Hub (4 members)',
      'Centre test access unlimited',
      'Priority support',
      '⚡ Baahuveer badge on signup',
    ],
    cta:'Go Pro — ₹399/mo',
  },
  {
    id:'annual', name:'Pro Annual', price:2999, period:'year',
    color:'#D4AF37', bg:'linear-gradient(135deg,#1E3A5F,#D4AF37)',
    badge:'SAVE ₹1,789', popular:false,
    yearSaving:'₹1,789 saved vs monthly',
    features:[
      'Everything in Pro',
      '12 months at ₹250/mo effectively',
      'Free Guru Book every month',
      'Dedicated mentor assignment',
      'Early access to new features',
      '🏆 The Legend badge on signup',
    ],
    cta:'Get Annual — ₹2,999/yr',
  },
]

export default function PricingPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [selected, setSelected] = useState('plus')

  const handleBuy = (plan) => {
    if (plan.id === 'trial') {
      showToast('success', '🎉 Redirecting to ₹19 Trial checkout...')
    } else {
      showToast('info', `Opening payment for ${plan.name}...`)
    }
  }

  return (
    <AppLayout>
      <div style={{ textAlign:'center', marginBottom:36 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:'clamp(24px,4vw,38px)', marginBottom:10 }}>
          Simple, Honest Pricing
        </h1>
        <p style={{ color:'#64748B', fontSize:16 }}>
          Start for ₹19. No hidden fees. Cancel anytime.
        </p>
        <div style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:8, background:'#DCFCE7', border:'1px solid #22C55E', borderRadius:20, padding:'6px 16px' }}>
          <span style={{ color:'#15803D', fontSize:13, fontWeight:700 }}>🤝 6 communities get 100% FREE for life — </span>
          <button onClick={() => navigate('/equity')} style={{ background:'none', border:'none', color:'#15803D', fontWeight:800, cursor:'pointer', fontSize:13, textDecoration:'underline' }}>Check eligibility →</button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap:16, marginBottom:32 }}>
        {PLANS.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)}
            style={{ borderRadius:24, overflow:'hidden', cursor:'pointer',
              border:`2px solid ${selected===plan.id?plan.color:'#E2E8F0'}`,
              boxShadow: selected===plan.id ? `0 12px 32px ${plan.color}33` : '0 2px 12px rgba(0,0,0,0.05)',
              transform: selected===plan.id ? 'translateY(-4px)' : 'none',
              transition:'all 0.2s', background:'#fff' }}>

            {/* Header */}
            <div style={{ background:plan.bg, padding:'20px 22px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#fff', fontSize:18 }}>{plan.name}</p>
                <span style={{ background:'rgba(255,255,255,0.2)', color:'#fff', fontSize:9, fontWeight:800, padding:'3px 10px', borderRadius:20, letterSpacing:'1px' }}>{plan.badge}</span>
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#fff', fontSize:34 }}>₹{plan.price.toLocaleString()}</span>
                <span style={{ color:'rgba(255,255,255,0.65)', fontSize:13 }}>/ {plan.period}</span>
              </div>
              {plan.yearSaving && <p style={{ color:'rgba(255,255,255,0.8)', fontSize:12, marginTop:4 }}>{plan.yearSaving}</p>}
            </div>

            {/* Features */}
            <div style={{ padding:'18px 20px' }}>
              {plan.features.map((f,i) => (
                <div key={i} style={{ display:'flex', gap:8, marginBottom:9 }}>
                  <span style={{ color: plan.color, fontWeight:800, fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ color:'#475569', fontSize:13, lineHeight:1.4 }}>{f}</span>
                </div>
              ))}
              <button onClick={() => handleBuy(plan)}
                style={{ width:'100%', marginTop:16, padding:'13px', borderRadius:14, border:'none', cursor:'pointer', background: plan.popular ? 'linear-gradient(135deg,#1E3A5F,#0F2140)' : `linear-gradient(135deg,${plan.color},${plan.color}CC)`, color: plan.popular?'#D4AF37':'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:14 }}>
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ background:'#F8FAFC', borderRadius:22, padding:24, border:'1.5px solid #E2E8F0' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:18, marginBottom:18 }}>Frequently Asked</p>
        {[
          ['Can I cancel anytime?','Yes. Cancel from Settings → Subscription. No questions asked. Access continues until end of billing period.'],
          ['Does the ₹19 trial auto-renew?','No. It\'s a one-time ₹19 payment. No automatic charges. You choose to upgrade after.'],
          ['Are my 6 equity tiers really free forever?','Yes, 100%. Verified Hope Scholars, Divyang, Swachhta Warriors, Veer Nari families, Transgender youth, and Agrarian Distress families get full Pro access for life.'],
          ['Can I switch plans mid-month?','Yes. Upgrade instantly. Downgrade at end of billing period. Prorated credits applied.'],
        ].map(([q,a],i) => (
          <div key={i} style={{ marginBottom: i<3?16:0, paddingBottom: i<3?16:0, borderBottom: i<3?'1px solid #E2E8F0':'none' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:6 }}>❓ {q}</p>
            <p style={{ color:'#64748B', fontSize:13, lineHeight:1.65 }}>{a}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
EOF

# ── WALLET PAGE ───────────────────────────────────────────────────
cat > src/pages/wallet/WalletPage.jsx << 'EOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const TRANSACTIONS = [
  { id:1, type:'earn',  source:'Completed SSC CGL Mock 4',    coins:+120, date:'Today 10:23',     icon:'📝' },
  { id:2, type:'earn',  source:'7-day Streak Bonus',           coins:+50,  date:'Today 07:00',     icon:'🔥' },
  { id:3, type:'spend', source:'Unlocked Premium Test Pack',   coins:-200, date:'Yesterday 15:40', icon:'🔓' },
  { id:4, type:'earn',  source:'Guru Hub Answer Accepted',     coins:+25,  date:'Yesterday 12:00', icon:'🎓' },
  { id:5, type:'earn',  source:'Focus Mode — 2 sessions',      coins:+50,  date:'2 days ago',       icon:'🎯' },
  { id:6, type:'earn',  source:'Brain Game — Math Blitz Win',  coins:+30,  date:'2 days ago',       icon:'🎮' },
  { id:7, type:'spend', source:'Guru Book — SSC Quant Bible',  coins:-150, date:'3 days ago',       icon:'📚' },
  { id:8, type:'earn',  source:'Daily Quiz Completed',          coins:+15,  date:'3 days ago',       icon:'📅' },
  { id:9, type:'earn',  source:'Referral Bonus — Priya joined',coins:+100, date:'5 days ago',       icon:'🎁' },
]

const COIN_USES = [
  { emoji:'🔓', label:'Unlock Premium Tests',  cost:'100–500 coins' },
  { emoji:'📚', label:'Buy Guru Books',         cost:'50–300 coins'  },
  { emoji:'⚡',  label:'Extra Test Attempts',   cost:'50 coins each' },
  { emoji:'🎨', label:'Unlock ID Card Templates',cost:'200 coins'   },
  { emoji:'💎', label:'Boost your Hall rank',   cost:'150 coins'    },
]

export default function WalletPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [filter, setFilter] = useState('all')
  const filtered = filter==='all' ? TRANSACTIONS : TRANSACTIONS.filter(t=>t.type===filter)
  const totalEarned = TRANSACTIONS.filter(t=>t.type==='earn').reduce((s,t)=>s+t.coins,0)
  const totalSpent  = Math.abs(TRANSACTIONS.filter(t=>t.type==='spend').reduce((s,t)=>s+t.coins,0))

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:20 }}>🪙 My Wallet</h1>

      {/* Coin balance card */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:26, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)', display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
        <div style={{ fontSize:56 }}>🪙</div>
        <div style={{ flex:1 }}>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, fontFamily:'Inter,sans-serif' }}>Total Coins</p>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:48, lineHeight:1 }}>{user.coins.toLocaleString()}</p>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginTop:4 }}>≈ ₹{(user.coins * 0.08).toFixed(0)} in exam value</p>
        </div>
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          {[['💚',totalEarned,'Earned'],['❤️',totalSpent,'Spent']].map(([e,v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <p style={{ fontSize:20 }}>{e}</p>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#fff', fontSize:20 }}>{v}</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to earn */}
      <div style={{ background:'#fff', borderRadius:20, padding:18, marginBottom:16, border:'1.5px solid #E2E8F0' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>⚡ How to Earn More Coins</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:8 }}>
          {[['📝','Complete a test','50–150 coins'],['🔥','Daily streak','10–100 coins'],['🎓','Answer doubts','25 coins each'],['🎯','Focus session','25 coins/session'],['🎮','Brain Games','5–50 coins'],['🧭','Career Compass','20 coins']].map(([e,a,c]) => (
            <div key={a} style={{ display:'flex', alignItems:'center', gap:8, background:'#F8FAFC', borderRadius:12, padding:'10px 12px' }}>
              <span style={{ fontSize:18 }}>{e}</span>
              <div>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:12 }}>{a}</p>
                <p style={{ color:'#D4AF37', fontSize:11, fontWeight:700 }}>{c}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spend coins */}
      <div style={{ background:'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(212,175,55,0.04))', borderRadius:20, padding:18, marginBottom:16, border:'1.5px solid rgba(212,175,55,0.25)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>🛍️ Spend Your Coins</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {COIN_USES.map(u => (
            <div key={u.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#fff', borderRadius:12, border:'1px solid #E2E8F0' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:22 }}>{u.emoji}</span>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{u.label}</span>
              </div>
              <span style={{ color:'#D4AF37', fontWeight:700, fontSize:12 }}>{u.cost}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F' }}>Transaction History</p>
          <div style={{ display:'flex', gap:6 }}>
            {['all','earn','spend'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer', background: filter===f?'#1E3A5F':'#F1F5F9', color: filter===f?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {filtered.map((t,i) => (
          <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 18px', borderBottom: i<filtered.length-1?'1px solid #F8FAFC':'none' }}>
            <div style={{ width:40, height:40, borderRadius:12, background: t.type==='earn'?'#DCFCE7':'#FEE2E2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{t.icon}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:14 }}>{t.source}</p>
              <p style={{ color:'#94A3B8', fontSize:12 }}>{t.date}</p>
            </div>
            <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color: t.type==='earn'?'#22C55E':'#EF4444' }}>
              {t.type==='earn'?'+':''}{t.coins}
            </span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
EOF
echo "Pricing + Wallet done"
# ── FAMILY HUB ────────────────────────────────────────────────────
cat > src/pages/family/FamilyHub.jsx << 'EOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const FAMILY_MEMBERS = [
  { id:'m1', name:'Arjun Kumar', role:'You (Admin)', initials:'AK', exam:'SSC CGL', score:78, streak:12, level:'⛏️ Gold Miner', online:true, lastActive:'Now' },
  { id:'m2', name:'Priya Kumar', role:'Sister',      initials:'PK', exam:'NEET UG', score:84, streak:8,  level:'💪 Grinder',   online:true, lastActive:'Now'       },
  { id:'m3', name:'Ravi Kumar',  role:'Brother',     initials:'RK', exam:'JEE Main',score:71, streak:5,  level:'📈 Riser',     online:false,lastActive:'2 hrs ago'  },
  { id:'m4', name:'Mala Kumar',  role:'Mother',      initials:'MK', exam:'CTET',    score:65, streak:3,  level:'🔥 Fierce One',online:false,lastActive:'Yesterday'   },
]

const CHALLENGES = [
  { title:'5-Test Family Week',        progress:12, target:15, reward:'+200 coins each', emoji:'📝', ends:'3 days' },
  { title:'7-Day All-Member Streak',   progress:5,  target:7,  reward:'+150 coins each', emoji:'🔥', ends:'2 days' },
  { title:'Score 75%+ Average',        progress:74, target:75, reward:'+100 coins each', emoji:'📊', ends:'1 week' },
]

export default function FamilyHub() {
  const { showToast } = useToast()
  const [tab, setTab] = useState('members')
  const familyStreak = 5
  const totalTests = 23

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>👨‍👩‍👧 Family Hub</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Study together. Track together. Succeed together.</p>
      </div>

      {/* Family stats banner */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:22, padding:22, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ fontSize:36 }}>👨‍👩‍👧</span>
          <div>
            <p style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:18 }}>Kumar Family</p>
            <p style={{ color:'#D4AF37', fontSize:12 }}>4 members · Family Pro Plan</p>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:10 }}>
          {[['🔥',`${familyStreak}d`,'Family Streak'],['📝',totalTests,'Tests Done'],['🏆','#1,243','Best Rank'],['⭐','3/4','Active Today']].map(([e,v,l]) => (
            <div key={l} style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:'10px 8px', textAlign:'center' }}>
              <p style={{ fontSize:18 }}>{e}</p>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#D4AF37', fontSize:16 }}>{v}</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {[['members','👥 Members'],['challenges','🎯 Challenges'],['invite','➕ Invite']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:'9px 18px', borderRadius:20, border:'none', cursor:'pointer', background: tab===k?'#1E3A5F':'#fff', color: tab===k?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13 }}>{l}</button>
        ))}
      </div>

      {tab === 'members' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {FAMILY_MEMBERS.map(m => (
            <div key={m.id} style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontWeight:900, fontSize:17 }}>{m.initials}</div>
                <div style={{ position:'absolute', bottom:1, right:1, width:12, height:12, borderRadius:'50%', background: m.online?'#22C55E':'#94A3B8', border:'2px solid #fff' }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{m.name}</p>
                  <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>{m.role}</span>
                </div>
                <p style={{ color:'#64748B', fontSize:12, marginTop:2 }}>{m.level} · {m.exam}</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>{m.online ? '🟢 Online now' : `Last seen: ${m.lastActive}`}</p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:20 }}>{m.score}%</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>Avg Score</p>
                <p style={{ color:'#F97316', fontSize:12, fontWeight:600 }}>🔥 {m.streak}d</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'challenges' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {CHALLENGES.map((c,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:20, padding:20, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{c.emoji}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{c.title}</p>
                  <p style={{ color:'#64748B', fontSize:12 }}>Reward: <strong style={{ color:'#22C55E' }}>{c.reward}</strong> · Ends in {c.ends}</p>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1, height:10, background:'#F1F5F9', borderRadius:5 }}>
                  <div style={{ width:`${(c.progress/c.target)*100}%`, height:10, borderRadius:5, background:'linear-gradient(90deg,#D4AF37,#E8C84A)', transition:'width 1s ease' }}/>
                </div>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#D4AF37', fontSize:14, flexShrink:0 }}>{c.progress}/{c.target}</span>
              </div>
            </div>
          ))}
          <div style={{ background:'linear-gradient(135deg,rgba(30,58,95,0.06),rgba(212,175,55,0.04))', borderRadius:18, padding:16, border:'1px solid rgba(212,175,55,0.2)', textAlign:'center' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:4 }}>🏆 Family Leaderboard</p>
            <p style={{ color:'#64748B', fontSize:13 }}>Kumar Family is ranked <strong style={{ color:'#D4AF37' }}>#47</strong> among all TryIT families this week!</p>
          </div>
        </div>
      )}

      {tab === 'invite' && (
        <div style={{ maxWidth:440, margin:'0 auto', textAlign:'center' }}>
          <div style={{ background:'#fff', borderRadius:22, padding:28, border:'1.5px solid #E2E8F0', marginBottom:16 }}>
            <p style={{ fontSize:44, marginBottom:12 }}>📨</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:18, marginBottom:8 }}>Invite a Family Member</p>
            <p style={{ color:'#64748B', fontSize:14, marginBottom:20 }}>Share the invite link. They join your Family Hub automatically. Up to 4 members on Family Pro.</p>
            <div style={{ background:'#F8FAFC', border:'1.5px dashed #D4AF37', borderRadius:14, padding:'12px 16px', marginBottom:16, fontFamily:'monospace', fontSize:14, color:'#1E3A5F', fontWeight:700 }}>
              tryiteducations.net/join/KFAM-2026
            </div>
            <button onClick={() => showToast('success','Invite link copied! Share it on WhatsApp 🎉')}
              style={{ width:'100%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'13px', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, color:'#1E3A5F', cursor:'pointer' }}>
              📤 Copy & Share Invite
            </button>
          </div>
          <p style={{ color:'#94A3B8', fontSize:12 }}>Family members get 20% off their individual plan when they join via your link.</p>
        </div>
      )}
    </AppLayout>
  )
}
EOF
echo "FamilyHub done"

# Update App.jsx routes
python3 << 'PYEOF'
with open('src/App.jsx','r') as f: c = f.read()

new_imports = """
const CareerCompass  = lazy(() => import('./pages/career-compass/CareerCompass'))
const ScholarshipHub = lazy(() => import('./pages/scholarships/ScholarshipHub'))
const PricingPage    = lazy(() => import('./pages/pricing/PricingPage'))
const WalletPage     = lazy(() => import('./pages/wallet/WalletPage'))
const FamilyHub      = lazy(() => import('./pages/family/FamilyHub'))"""

new_routes = """
                <Route path="/career-compass"  element={<CareerCompass />} />
                <Route path="/scholarships"    element={<ScholarshipHub />} />
                <Route path="/pro"             element={<PricingPage />} />
                <Route path="/wallet"          element={<WalletPage />} />
                <Route path="/family"          element={<FamilyHub />} />"""

if 'CareerCompass' not in c:
    c = c.replace('const LiveImpactTracker', new_imports + '\nconst LiveImpactTracker', 1)
if '/career-compass"  element={<CareerCompass' not in c:
    c = c.replace('<Route path="/career-compass"', new_routes + '\n                {/* order3 */}', 1)
with open('src/App.jsx','w') as f: f.write(c)
print('App.jsx updated with Order 3 routes')
PYEOF

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Order 3 pages installed!                             ║"
echo "║                                                          ║"
echo "║  /career-compass  → 8-question exam match quiz          ║"
echo "║  /scholarships    → 800+ scholarships + deadline alerts  ║"
echo "║  /pro             → ₹19 Trial + Plus + Pro + Annual     ║"
echo "║  /wallet          → Coins, transactions, spend options   ║"
echo "║  /family          → Family Hub with group challenges     ║"
echo "║                                                          ║"
echo "║  Run: npm run dev                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
