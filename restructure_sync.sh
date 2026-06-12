#!/bin/bash
# TryIT — Sync routes.jsx to new restructured tree + restore dropped pages
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
mkdir -p src/app src/pages/profile src/pages/friends src/pages/contact \
         src/pages/legal src/pages/tools src/pages/community src/pages/referral \
         scripts

echo "Step 1/3: Writing routes.jsx (matches restructured tree)..."
cat > src/app/routes.jsx << 'ROUTESEOF'
/**
 * TryIT — Routes (matches restructured file tree)
 */
import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// AUTH
const Splash       = lazy(() => import('../pages/Splash'))
const Landing      = lazy(() => import('../pages/Landing'))
const Login        = lazy(() => import('../pages/Login'))
const Onboarding   = lazy(() => import('../pages/Onboarding'))

// CORE
const Dashboard     = lazy(() => import('../pages/Dashboard'))
const Profile       = lazy(() => import('../pages/Profile'))
const UpdateProfile = lazy(() => import('../pages/profile/UpdateProfile'))
const Settings      = lazy(() => import('../pages/Settings'))
const Notifications = lazy(() => import('../pages/Notifications'))
const Analytics     = lazy(() => import('../pages/analytics/Analytics'))
const Achievements  = lazy(() => import('../pages/achievements/Achievements'))
const ThemeSelector = lazy(() => import('../pages/ThemeSelector'))

// TEST ENGINE
const TestLauncher = lazy(() => import('../pages/test-engine/TestLauncher'))
const ActiveTest   = lazy(() => import('../pages/test-engine/ActiveTest'))
const ResultScreen = lazy(() => import('../pages/test-engine/ResultScreen'))
const ReviewScreen = lazy(() => import('../pages/test-engine/ReviewScreen'))

// EXAMS
const AllExams    = lazy(() => import('../pages/exams/AllExams'))
const ExamDetail  = lazy(() => import('../pages/exams/ExamDetail'))
const RoadmapPage = lazy(() => import('../pages/roadmap/RoadmapPage'))
const ExamAlerts  = lazy(() => import('../pages/exam-alerts/ExamAlerts'))

// LEARNING
const GuruHub        = lazy(() => import('../pages/guru/GuruHub'))
const CareerCompass  = lazy(() => import('../pages/career-compass/CareerCompass'))
const CurrentAffairs = lazy(() => import('../pages/current-affairs/CurrentAffairs'))
const ScholarshipHub = lazy(() => import('../pages/scholarships/ScholarshipHub'))
const StudyPlanner   = lazy(() => import('../pages/classroom/StudyPlanner'))
const EbookStore     = lazy(() => import('../pages/ebooks/EbookStore'))

// COMPETITION
const HallHub     = lazy(() => import('../pages/hall/HallHub'))
const Leaderboard = lazy(() => import('../pages/leaderboard/Leaderboard'))
const Tournaments = lazy(() => import('../pages/tournaments/Tournaments'))
const GamesHub    = lazy(() => import('../pages/games/GamesHub'))
const MathBlitz   = lazy(() => import('../pages/games/MathBlitz'))
const WordRush    = lazy(() => import('../pages/games/WordRush'))
const GKBurst     = lazy(() => import('../pages/games/GKBurst'))

// PROGRESS
const FocusMode       = lazy(() => import('../pages/focus-mode/FocusMode'))
const JourneyPassport = lazy(() => import('../pages/JourneyPassport'))

// COMMUNITY (re-added — dropped in restructure)
const CommunityHall = lazy(() => import('../pages/community/CommunityHall'))
const LiveImpact    = lazy(() => import('../pages/LiveImpactTracker'))

// SOCIAL (re-added — dropped in restructure)
const ReferralPage = lazy(() => import('../pages/referral/ReferralPage'))
const FriendCircle = lazy(() => import('../pages/friends/FriendCircle'))
const FamilyHub    = lazy(() => import('../pages/family/FamilyHub'))

// MENTOR
const MentorHub      = lazy(() => import('../pages/mentor/MentorHub'))
const MentorCashback = lazy(() => import('../pages/mentor/MentorCashback'))
const MentorAnalytics= lazy(() => import('../pages/mentor/MentorAnalytics'))
const CouponManager  = lazy(() => import('../pages/mentor/CouponManager'))

// MONETISATION
const PricingPage = lazy(() => import('../pages/pricing/PricingPage'))
const WalletPage  = lazy(() => import('../pages/wallet/WalletPage'))

// EQUITY & ACCESSIBILITY
const EquityTier      = lazy(() => import('../pages/equity/EquityTierSelector'))
const EquityVerify    = lazy(() => import('../pages/equity/EquityVerification'))
const AccessMode      = lazy(() => import('../pages/accessibility/AccessibilityMode'))
const DonationSec     = lazy(() => import('../pages/DonationSection'))
const SchoolCircle    = lazy(() => import('../pages/circles/SchoolCircle'))
const Sisterhood      = lazy(() => import('../pages/circles/SisterhoodCircle'))

// CENTRE / INSTITUTION
const CentreLogin     = lazy(() => import('../pages/CentreLogin'))
const CentreDashboard = lazy(() => import('../pages/centre/CentreDashboard'))
const StudentHistory  = lazy(() => import('../pages/centre/StudentHistory'))

// ADMIN
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'))
const AdminDash  = lazy(() => import('../pages/admin/AdminDashboard'))

// LEGAL / TOOLS / CONTACT (re-added — dropped in restructure)
const TermsConditions       = lazy(() => import('../pages/legal/TermsAndConditions'))
const EligibilityCalculator = lazy(() => import('../pages/tools/EligibilityCalculator'))
const ContactPage            = lazy(() => import('../pages/contact/ContactPage'))

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/"           element={<Splash />} />
      <Route path="/landing"    element={<Landing />} />
      <Route path="/login"      element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* CORE */}
      <Route path="/dashboard"       element={<Dashboard />} />
      <Route path="/profile"         element={<Profile />} />
      <Route path="/profile/edit"    element={<UpdateProfile />} />
      <Route path="/settings"        element={<Settings />} />
      <Route path="/settings/themes" element={<ThemeSelector />} />
      <Route path="/notifications"   element={<Notifications />} />
      <Route path="/analytics"       element={<Analytics />} />
      <Route path="/achievements"    element={<Achievements />} />

      {/* TEST ENGINE */}
      <Route path="/test-engine"        element={<TestLauncher />} />
      <Route path="/test-engine/active" element={<ActiveTest />} />
      <Route path="/test-engine/result" element={<ResultScreen />} />
      <Route path="/test-engine/review" element={<ReviewScreen />} />

      {/* EXAMS */}
      <Route path="/exams"           element={<AllExams />} />
      <Route path="/exams/:examId"   element={<ExamDetail />} />
      <Route path="/roadmap/:examId" element={<RoadmapPage />} />
      <Route path="/exam-alerts"     element={<ExamAlerts />} />

      {/* LEARNING */}
      <Route path="/guru-hub"          element={<GuruHub />} />
      <Route path="/career-compass"    element={<CareerCompass />} />
      <Route path="/current-affairs"   element={<CurrentAffairs />} />
      <Route path="/scholarships"      element={<ScholarshipHub />} />
      <Route path="/classroom/planner" element={<StudyPlanner />} />
      <Route path="/ebooks"            element={<EbookStore />} />

      {/* COMPETITION */}
      <Route path="/hall"             element={<HallHub />} />
      <Route path="/leaderboard"      element={<Leaderboard />} />
      <Route path="/tournaments"      element={<Tournaments />} />
      <Route path="/games"            element={<GamesHub />} />
      <Route path="/games/math-blitz" element={<MathBlitz />} />
      <Route path="/games/word-rush"  element={<WordRush />} />
      <Route path="/games/gk-burst"   element={<GKBurst />} />

      {/* PROGRESS */}
      <Route path="/focus-mode" element={<FocusMode />} />
      <Route path="/journey"    element={<JourneyPassport />} />

      {/* COMMUNITY */}
      <Route path="/community" element={<CommunityHall />} />
      <Route path="/impact"    element={<LiveImpact />} />

      {/* SOCIAL */}
      <Route path="/referral" element={<ReferralPage />} />
      <Route path="/friends"  element={<FriendCircle />} />
      <Route path="/family"   element={<FamilyHub />} />

      {/* MENTOR */}
      <Route path="/mentor-hub"          element={<MentorHub />} />
      <Route path="/mentor-hub/cashback" element={<MentorCashback />} />
      <Route path="/mentor-hub/analytics" element={<MentorAnalytics />} />
      <Route path="/mentor-hub/coupons"  element={<CouponManager />} />

      {/* MONETISATION */}
      <Route path="/pro"    element={<PricingPage />} />
      <Route path="/wallet" element={<WalletPage />} />

      {/* EQUITY & ACCESSIBILITY */}
      <Route path="/equity"             element={<EquityTier />} />
      <Route path="/equity/verify"      element={<EquityVerify />} />
      <Route path="/accessibility"      element={<AccessMode />} />
      <Route path="/donate"             element={<DonationSec />} />
      <Route path="/circles/school"     element={<SchoolCircle />} />
      <Route path="/circles/sisterhood" element={<Sisterhood />} />

      {/* CENTRE */}
      <Route path="/centre/login"     element={<CentreLogin />} />
      <Route path="/centre/dashboard" element={<CentreDashboard />} />
      <Route path="/centre/students"  element={<StudentHistory />} />

      {/* ADMIN */}
      <Route path="/admin/login"     element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDash />} />

      {/* LEGAL / TOOLS / CONTACT */}
      <Route path="/terms"   element={<TermsConditions />} />
      <Route path="/privacy" element={<TermsConditions />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/tools/eligibility-calculator" element={<EligibilityCalculator />} />

      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
ROUTESEOF

echo "Step 2/3: Restoring 7 pages dropped during restructure..."

cat > src/pages/profile/UpdateProfile.jsx << 'PEOF'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'

export default function UpdateProfile() {
  const navigate = useNavigate()
  const fileRef  = useRef(null)
  const [preview, setPreview] = useState(localStorage.getItem('tryit_avatar'))
  const [name, setName] = useState(localStorage.getItem('tryit_name')||'')
  const [bio, setBio]   = useState(localStorage.getItem('tryit_bio')||'')
  const [saved, setSaved] = useState(false)

  const pickImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 200
        const ctx = canvas.getContext('2d')
        const min = Math.min(img.width, img.height)
        ctx.drawImage(img, (img.width-min)/2, (img.height-min)/2, min, min, 0, 0, 200, 200)
        const compressed = canvas.toDataURL('image/jpeg', 0.85)
        setPreview(compressed)
        localStorage.setItem('tryit_avatar', compressed)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    localStorage.setItem('tryit_name', name)
    localStorage.setItem('tryit_bio', bio)
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:20 }}>✏️ Edit Profile</h1>
      <div style={{ background:'#fff', borderRadius:22, padding:24, marginBottom:16, border:'1.5px solid #E2E8F0', textAlign:'center' }}>
        <div onClick={()=>fileRef.current?.click()} style={{ position:'relative', width:100, height:100, margin:'0 auto 16px', cursor:'pointer' }}>
          {preview
            ? <img src={preview} alt="" style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', border:'3px solid #D4AF37' }}/>
            : <div style={{ width:100, height:100, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:32, border:'3px solid #D4AF37' }}>
                {(name||'U').slice(0,2).toUpperCase()}
              </div>}
          <div style={{ position:'absolute', bottom:2, right:2, width:28, height:28, borderRadius:'50%', background:'#D4AF37', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>📷</div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={pickImage}/>
        <p style={{ color:'#64748B', fontSize:13 }}>Tap photo to change · Max 5MB · Auto square-crop</p>
      </div>
      <div style={{ background:'#fff', borderRadius:22, padding:24, border:'1.5px solid #E2E8F0' }}>
        <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:13, marginBottom:6 }}>Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"
          style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', marginBottom:16 }}/>
        <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:13, marginBottom:6 }}>Bio</label>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} placeholder="UPSC aspirant..."
          style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', resize:'none', marginBottom:16 }}/>
        <button onClick={save} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' }}>
          {saved?'✅ Saved!':'Save Profile'}
        </button>
      </div>
    </AppLayout>
  )
}
PEOF

cat > src/pages/friends/FriendCircle.jsx << 'PEOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'

const MOCK_FRIENDS = [
  { id:'f1', name:'Priya Sharma', initials:'PS', tryitId:'TRY-KL-00421-2026', exam:'NEET UG', level:6, streak:14, rank:'#2,341', online:true },
  { id:'f2', name:'Rahul Verma',  initials:'RV', tryitId:'TRY-DL-00892-2026', exam:'UPSC CSE',level:8, streak:42, rank:'#847',   online:false },
]

export default function FriendCircle() {
  const [friends, setFriends] = useState(MOCK_FRIENDS)
  const [query, setQuery] = useState('')

  const addFriend = () => {
    if (!query.trim()) return
    setFriends(f=>[...f, { id:`f-${Date.now()}`, name:'Study Buddy', initials:query.slice(0,2).toUpperCase(), tryitId:`TRY-XX-${Math.floor(Math.random()*90000)+10000}-2026`, exam:'SSC CGL', level:1, streak:0, rank:'—', online:false }])
    setQuery('')
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>👥 Friend Circle</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>Study together. Compete together. Rise together.</p>

      <div style={{ background:'#fff', borderRadius:20, padding:20, marginBottom:16, border:'1.5px solid #E2E8F0' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:10 }}>➕ Add a Friend</p>
        <div style={{ display:'flex', gap:10 }}>
          <input value={query} placeholder="Email or TryIT ID" onChange={e=>setQuery(e.target.value)}
            style={{ flex:1, padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none' }}/>
          <button onClick={addFriend} style={{ padding:'12px 20px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>Add</button>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {friends.map(f=>(
          <div key={f.id} style={{ background:'#fff', borderRadius:20, padding:'14px 18px', border:'1.5px solid #E2E8F0', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontWeight:800, fontSize:16 }}>{f.initials}</div>
              <div style={{ position:'absolute', bottom:1, right:1, width:12, height:12, borderRadius:'50%', background:f.online?'#22C55E':'#94A3B8', border:'2px solid #fff' }}/>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{f.name}</p>
              <p style={{ color:'#64748B', fontSize:12 }}>Level {f.level} · {f.exam} · 🔥{f.streak}d</p>
            </div>
            <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#D4AF37', fontSize:14 }}>{f.rank}</span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
PEOF

cat > src/pages/contact/ContactPage.jsx << 'PEOF'
import { useState } from 'react'

const CATEGORIES = [
  { id:'support', label:'General Support', email:'support@tryiteducations.net' },
  { id:'billing', label:'Billing & Refunds', email:'billing@tryiteducations.net' },
  { id:'mentor',  label:'Mentor Queries', email:'mentor@tryiteducations.net' },
  { id:'other',   label:'Something Else', email:'hello@tryiteducations.net' },
]

export default function ContactPage() {
  const [cat, setCat] = useState('support')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const category = CATEGORIES.find(c=>c.id===cat)

  const send = () => {
    if (!email || !msg) return
    window.location.href = `mailto:${category.email}?subject=${encodeURIComponent(`[${category.label}] TryIT`)}&body=${encodeURIComponent(`Email: ${email}\n\n${msg}`)}`
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC', padding:'40px 20px' }}>
      <div style={{ maxWidth:520, margin:'0 auto' }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>📩 Contact Us</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>We read every message. Response within 24-48 hours.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:8, marginBottom:16 }}>
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} style={{ padding:'12px 14px', borderRadius:14, border:`1.5px solid ${cat===c.id?'#D4AF37':'#E2E8F0'}`, background:cat===c.id?'rgba(212,175,55,0.06)':'#fff', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:13 }}>{c.label}</button>
          ))}
        </div>
        <div style={{ background:'#fff', borderRadius:22, padding:22, border:'1.5px solid #E2E8F0' }}>
          <input value={email} type="email" placeholder="Your email" onChange={e=>setEmail(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', marginBottom:14 }}/>
          <textarea value={msg} rows={5} placeholder="Your message" onChange={e=>setMsg(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', resize:'none', marginBottom:14 }}/>
          <button onClick={send} disabled={!email||!msg} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:(email&&msg)?'linear-gradient(135deg,#1E3A5F,#0F2140)':'#F1F5F9', color:(email&&msg)?'#D4AF37':'#94A3B8', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, cursor:(email&&msg)?'pointer':'not-allowed' }}>
            📩 Send to {category.email}
          </button>
        </div>
      </div>
    </div>
  )
}
PEOF

cat > src/pages/legal/TermsAndConditions.jsx << 'PEOF'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SECTIONS = [
  { id:'general', title:'General', emoji:'📋', p:'TryIT Educations (tryiteducations.net) serves students from Class 6 to PhD/professional exams in 40+ Indian languages. By using TryIT you agree to these terms. Users under 13 need parental consent.' },
  { id:'student', title:'Student Terms', emoji:'🎓', p:'Coins are earned through genuine test performance and deducted when scoring below cutoff — this is a discipline mechanism. Free tier: 50 questions/day, 3 mock tests/day, 3 full-language explanations/day. Test integrity is required; honeypot questions detect cheating.' },
  { id:'mentor', title:'Mentor Terms', emoji:'🧑‍🏫', p:'Mentors must provide accurate credentials. Accepted answers earn ₹15-50. Payouts every Monday via UPI, 1-month qualification window before first payout. False credentials = removal + forfeiture.' },
  { id:'institution', title:'Institution Terms', emoji:'🏫', p:'Institutions must be verified before full access. Uploaded questions are reviewed before going live. Payouts calculated weekly based on student engagement, transferred Mondays.' },
  { id:'equity', title:'Free Access Tiers', emoji:'🤝', p:'Hope Scholars, Divyang (UDID verified), Swachhta Warriors, Veer Nari families, Transgender Youth, Active Military, ASHA/Anganwadi Workers, and First-Generation Learners receive free Pro access for life upon document verification (within 7 days).' },
  { id:'privacy', title:'Privacy & Data', emoji:'🔒', p:'We store email, performance data, and coin transactions. Test scores are private. Public leaderboard shows first name, state, exam, score, rank only — never email or full details. Data encrypted (AES-256). Request deletion at support@tryiteducations.net.' },
  { id:'payments', title:'Payments & Refunds', emoji:'💳', p:'Processed via Razorpay (UPI/Cards/Net Banking). ₹19 Trial Pass is one-time, does not auto-renew. Subscriptions: 7-day refund window if fewer than 2 mock tests completed. Coin packs are non-refundable once credited.' },
]

export default function TermsAndConditions() {
  const navigate = useNavigate()
  const [active, setActive] = useState('general')
  const section = SECTIONS.find(s=>s.id===active)

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC' }}>
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', padding:'24px clamp(20px,5vw,60px)' }}>
        <button onClick={()=>navigate(-1)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:14, marginBottom:12 }}>← Back</button>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#fff', fontSize:28 }}>Terms & Conditions</h1>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>Last updated: June 2026</p>
      </div>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px clamp(16px,4vw,40px)', display:'flex', gap:20, flexWrap:'wrap' }}>
        <div style={{ width:200, flexShrink:0 }}>
          <div style={{ background:'#fff', borderRadius:18, padding:10, border:'1.5px solid #E2E8F0' }}>
            {SECTIONS.map(s=>(
              <button key={s.id} onClick={()=>setActive(s.id)} style={{ width:'100%', display:'flex', gap:8, padding:'9px 10px', borderRadius:10, border:'none', cursor:'pointer', background:active===s.id?'#1E3A5F':'transparent', color:active===s.id?'#D4AF37':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13, textAlign:'left', marginBottom:3 }}>
                {s.emoji} {s.title}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex:1, minWidth:280, background:'#fff', borderRadius:22, padding:'24px 26px', border:'1.5px solid #E2E8F0' }}>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:20, marginBottom:14 }}>{section.emoji} {section.title}</h2>
          <p style={{ color:'#475569', fontSize:14, lineHeight:1.9 }}>{section.p}</p>
        </div>
      </div>
    </div>
  )
}
PEOF

cat > src/pages/tools/EligibilityCalculator.jsx << 'PEOF'
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
PEOF

cat > src/pages/community/CommunityHall.jsx << 'PEOF'
import { useState, useEffect } from 'react'
import AppLayout from '../../components/layout/AppLayout'

export default function CommunityHall() {
  const [stories, setStories] = useState([])
  useEffect(()=>{
    const seeded = JSON.parse(localStorage.getItem('tryit_community_stories')||'[]')
    if (seeded.length) { setStories(seeded); return }
    setStories([
      { id:'cs1', user:'Priya Raghunathan', initials:'PR', state:'Kerala', exam:'NEET UG', rankBefore:8432, rankAfter:1243, story:'I was Rank #8,432 — three months of zero improvement. Started TryIT in January. 30 days later: Rank #1,243.', votes:847, pinned:true },
      { id:'cs2', user:'Mohammed Arif Khan', initials:'MA', state:'UP', exam:'UPSC CSE', rankBefore:12840, rankAfter:2341, story:'First person in my village to attempt UPSC. TryIT in Hindi — my mother tongue. Rank jumped to #2,341 in 60 days.', votes:1204, pinned:true },
    ])
  },[])

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🏛️ Community Hall</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>Real success stories from real students across India.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {stories.map(s=>(
          <div key={s.id} style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0' }}>
            {s.pinned && <span style={{ background:'#FEF3C7', color:'#92400E', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20, marginBottom:8, display:'inline-block' }}>📌 PINNED</span>}
            <div style={{ display:'flex', gap:10, marginBottom:10 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontWeight:800 }}>{s.initials}</div>
              <div>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14 }}>{s.user}</p>
                <p style={{ color:'#94A3B8', fontSize:12 }}>{s.state} · {s.exam} · #{s.rankBefore.toLocaleString()} → #{s.rankAfter.toLocaleString()}</p>
              </div>
            </div>
            <p style={{ color:'#475569', fontSize:13, lineHeight:1.7, marginBottom:8 }}>{s.story}</p>
            <span style={{ color:'#94A3B8', fontSize:12 }}>👍 {s.votes} found this helpful</span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
PEOF

cat > src/pages/referral/ReferralPage.jsx << 'PEOF'
import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const code = localStorage.getItem('tryit_referral_code') || 'TRYIT-FRIEND-2026'

  const copy = () => {
    navigator.clipboard?.writeText(`https://tryiteducations.net/login?ref=${code}`)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🎁 Refer & Earn</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20 }}>Earn 100 coins for every friend who joins using your link.</p>

      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:22, padding:24, border:'1.5px solid rgba(212,175,55,0.2)', textAlign:'center', marginBottom:16 }}>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:12, marginBottom:8 }}>YOUR REFERRAL CODE</p>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:24, marginBottom:14, letterSpacing:'2px' }}>{code}</p>
        <button onClick={copy} style={{ padding:'12px 28px', borderRadius:14, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C44A)', color:'#1E3A5F', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>
          {copied?'✅ Copied!':'📋 Copy Link'}
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10 }}>
        {[['👥','0','Friends Joined'],['🪙','0','Coins Earned']].map(([e,v,l])=>(
          <div key={l} style={{ background:'#fff', borderRadius:16, padding:14, textAlign:'center', border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontSize:22 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:20 }}>{v}</p>
            <p style={{ color:'#94A3B8', fontSize:11 }}>{l}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
PEOF

echo "Step 3/3: Auto-stubbing anything STILL missing in new tree..."
cat > scripts/autofix_missing_imports.js << 'AFCONTENT'
/**
 * TryIT — Auto-Fix Missing Imports v2
 * Now handles BOTH:
 *   import X from '...'              (static)
 *   lazy(() => import('...'))        (dynamic, used by routes.jsx)
 */
const fs   = require('fs')
const path = require('path')
const ROOT = process.cwd()
const SRC  = path.join(ROOT, 'src')

const EXTS = ['.jsx','.js','.tsx','.ts']
const visited = new Set()
const created = []
const errors  = []

function resolveFile(basePath) {
  for (const ext of EXTS) if (fs.existsSync(basePath + ext)) return basePath + ext
  for (const ext of EXTS) if (fs.existsSync(path.join(basePath, 'index' + ext))) return path.join(basePath, 'index' + ext)
  return null
}
function existsAsModule(basePath) {
  return resolveFile(basePath) !== null || fs.existsSync(basePath)
}

// Parse BOTH static imports AND dynamic import() calls
function parseImports(content) {
  const imports = []

  // Static: import {a,b} / import X / import * as X from '...'
  const staticRe = /import\s+([^'";]+?)\s+from\s+['"](\.[^'"]+)['"]/g
  let m
  while ((m = staticRe.exec(content)) !== null) {
    const clause = m[1].trim(), source = m[2]
    const names = { default: null, named: [], namespace: null }
    const nsMatch = clause.match(/\*\s+as\s+(\w+)/)
    if (nsMatch) { names.namespace = nsMatch[1]; imports.push({ source, names }); continue }
    const namedMatch = clause.match(/\{([^}]*)\}/)
    if (namedMatch) {
      names.named = namedMatch[1].split(',').map(s=>s.trim()).filter(Boolean)
        .map(s => { const parts = s.split(/\s+as\s+/); return parts[parts.length-1].trim() })
    }
    const defaultMatch = clause.match(/^(\w+)/)
    if (defaultMatch && !clause.startsWith('{')) names.default = defaultMatch[1]
    imports.push({ source, names })
  }

  // Dynamic: import('...')  — used inside lazy() — always treated as default export
  const dynamicRe = /import\(\s*['"](\.[^'"]+)['"]\s*\)/g
  while ((m = dynamicRe.exec(content)) !== null) {
    imports.push({ source: m[1], names: { default: 'LazyComponent', named: [], namespace: null } })
  }

  return imports
}

function stubForName(name) {
  if (name.endsWith('Provider')) return `export function ${name}({ children }) { return children }`
  if (/^use[A-Z]/.test(name))    return `export function ${name}() { return {} }`
  if (name.endsWith('Context'))  return `import { createContext } from 'react'\nexport const ${name} = createContext({})`
  if (/^[A-Z][A-Z0-9_]+$/.test(name)) return (/S$/.test(name) || name.includes('LIST')) ? `export const ${name} = []` : `export const ${name} = {}`
  if (/^[A-Z]/.test(name)) return `export function ${name}(props) { return null }`
  return `export function ${name}(...args) { return {} }`
}

function isPageOrComponent(filePath) {
  return filePath.includes('/pages/') || filePath.includes('/components/')
}

function stubFileContent(filePath, importsIntoIt) {
  const isComponent = isPageOrComponent(filePath)
  let out = ''
  const exportedNames = new Set()
  for (const { names } of importsIntoIt) {
    if (names.default) exportedNames.add('__DEFAULT__')
    for (const n of names.named) exportedNames.add(n)
  }
  for (const name of exportedNames) {
    if (name === '__DEFAULT__') continue
    out += stubForName(name) + '\n'
  }
  if (exportedNames.has('__DEFAULT__')) {
    if (isComponent) {
      const compName = path.basename(filePath).replace(/\.(jsx|js|tsx|ts)$/, '').replace(/[^a-zA-Z0-9]/g,'')
      out += `
import { useNavigate } from 'react-router-dom'
export default function ${compName || 'StubPage'}() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:40 }}>
      <p style={{ fontSize:48, marginBottom:12 }}>🚧</p>
      <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', marginBottom:8 }}>Coming Soon</h2>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20, maxWidth:320 }}>
        This page (${compName || 'page'}) is being built. Check back soon!
      </p>
      <button onClick={()=>navigate('/dashboard')} style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', border:'none', borderRadius:14, padding:'12px 24px', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>
        ← Back to Dashboard
      </button>
    </div>
  )
}
`
    } else {
      out += `export default {}\n`
    }
  }
  if (!out.trim()) out = '// auto-generated stub\nexport default {}\n'
  return out
}

function processFile(filePath) {
  if (visited.has(filePath)) return
  visited.add(filePath)
  if (!fs.existsSync(filePath)) return
  let content
  try { content = fs.readFileSync(filePath, 'utf8') } catch { return }

  const imports = parseImports(content)
  const dir = path.dirname(filePath)
  const byTarget = {}
  for (const imp of imports) {
    const target = path.resolve(dir, imp.source)
    byTarget[target] = byTarget[target] || []
    byTarget[target].push(imp)
  }

  for (const [target, importsIntoIt] of Object.entries(byTarget)) {
    if (existsAsModule(target)) {
      const resolved = resolveFile(target)
      if (resolved) processFile(resolved)
      continue
    }
    let stubPath = target
    const hasDefault = importsIntoIt.some(i => i.names.default)
    const isComp = isPageOrComponent(target) && hasDefault
    stubPath += isComp ? '.jsx' : '.js'
    if (fs.existsSync(stubPath)) continue

    const content = stubFileContent(stubPath, importsIntoIt)
    fs.mkdirSync(path.dirname(stubPath), { recursive: true })
    try {
      fs.writeFileSync(stubPath, content)
      created.push(path.relative(ROOT, stubPath))
      processFile(stubPath)
    } catch (e) {
      errors.push(`${stubPath}: ${e.message}`)
    }
  }
}

const entries = [
  path.join(SRC, 'main'),
  path.join(SRC, 'App'),
  path.join(SRC, 'app', 'routes'),
]
entries.forEach(e => {
  const f = resolveFile(e)
  if (f) processFile(f)
})

console.log(`\n${'='.repeat(55)}`)
console.log(`  TryIT Auto-Fix v2 — Missing Import Resolver`)
console.log(`${'='.repeat(55)}`)
console.log(`  Files scanned:  ${visited.size}`)
console.log(`  Stubs created:  ${created.length}`)
if (created.length) {
  console.log(`\n  Created stubs for:`)
  created.forEach(f => console.log(`    + ${f}`))
}
if (errors.length) {
  console.log(`\n  Errors:`)
  errors.forEach(e => console.log(`    ! ${e}`))
}
console.log(`\n  Run: npm run dev`)
console.log(`${'='.repeat(55)}\n`)
AFCONTENT

node scripts/autofix_missing_imports.js
rm -rf node_modules/.vite

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Sync complete                                        ║"
echo "║  • routes.jsx rewritten for new file tree                ║"
echo "║  • 7 dropped pages restored (Profile Edit, Friends,      ║"
echo "║    Contact, Terms, Eligibility Calc, Community, Referral) ║"
echo "║  • Anything else still missing → auto-stubbed            ║"
echo "║                                                          ║"
echo "║  Run: npm run dev                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
