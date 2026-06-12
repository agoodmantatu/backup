#!/bin/bash
# TryIT — Final pages + Admin Grant Pro + Settings + Backend wiring
ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"
echo "Installing final pages + admin grant system..."
mkdir -p src/pages/admin src/pages/settings src/pages/referral
mkdir -p src/pages/games src/pages/classroom src/pages/mentor
mkdir -p src/pages/roadmap src/pages/exam-alerts src/pages/parent
mkdir -p src/pages/exams src/lib src/pages/wallet src/pages/family
mkdir -p src/pages/admin src/pages/settings src/pages/referral
mkdir -p src/pages/games src/pages/classroom src/pages/mentor
mkdir -p src/pages/roadmap src/pages/exam-alerts src/pages/parent
mkdir -p src/pages/exams src/lib

# ══════════════════════════════════════════════════════════════════
# 1. ADMIN — Grant Pro Access (the feature you asked for)
# ══════════════════════════════════════════════════════════════════
cat > src/pages/admin/AdminDashboard.jsx << 'EOF'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Pro Access grant storage ──────────────────────────────────────
const GRANTS_KEY = 'tryit_pro_grants'
function getGrants() { return JSON.parse(localStorage.getItem(GRANTS_KEY) || '[]') }
function saveGrants(g) { localStorage.setItem(GRANTS_KEY, JSON.stringify(g)) }
function isGrantActive(grant) { return new Date(grant.expiresAt) > new Date() }
export function checkProGrant(email) {
  return getGrants().find(g => g.email.toLowerCase()===email.toLowerCase() && isGrantActive(g)) || null
}

const TABS = ['overview','grants','users','exam-requests','push']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    if (!localStorage.getItem('tryit_admin')) navigate('/admin/login')
  }, [navigate])

  const logout = () => { localStorage.removeItem('tryit_admin'); navigate('/admin/login') }

  return (
    <div style={{ minHeight:'100vh', background:'#F1F5F9' }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <div>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11 }}>TryIT Admin · 360° Control</p>
          <h1 style={{ color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:22 }}>
            Admin Dashboard
          </h1>
        </div>
        <button onClick={logout} style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:10, padding:'8px 16px', color:'#fff', cursor:'pointer', fontSize:13 }}>
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, padding:'10px 16px', background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', overflowX:'auto' }}>
        {[['overview','📊 Overview'],['grants','⚡ Grant Pro Access'],['users','👥 Users'],['exam-requests','📬 Exam Queue'],['push','🔔 Push Test']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:'9px 16px', borderRadius:10, border:'none', cursor:'pointer', whiteSpace:'nowrap', background: tab===k?'#1E3A5F':'transparent', color: tab===k?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13 }}>{l}</button>
        ))}
      </div>

      <div style={{ padding:20 }}>
        {tab==='overview'    && <OverviewTab/>}
        {tab==='grants'      && <GrantProTab/>}
        {tab==='users'       && <UsersTab/>}
        {tab==='exam-requests' && <ExamQueueTab/>}
        {tab==='push'        && <PushTestTab/>}
      </div>
    </div>
  )
}

// ── GRANT PRO ACCESS TAB ──────────────────────────────────────────
function GrantProTab() {
  const [email, setEmail]   = useState('')
  const [days,  setDays]    = useState(30)
  const [plan,  setPlan]    = useState('pro')
  const [note,  setNote]    = useState('')
  const [grants, setGrants] = useState(getGrants)
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')

  const PLAN_OPTIONS = [
    { id:'trial', label:'Trial (7 days features)' },
    { id:'plus',  label:'Plus (all features)'     },
    { id:'pro',   label:'Pro (full + books)'       },
    { id:'promax',label:'Pro Max (everything)'     },
  ]
  const DAY_PRESETS = [7, 14, 30, 60, 90, 180, 365]

  const grant = () => {
    const clean = email.trim().toLowerCase()
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setError('Enter a valid email address.'); return
    }
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + days)
    const newGrant = {
      id: `grant-${Date.now()}`,
      email: clean,
      plan,
      days,
      note: note.trim(),
      grantedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      grantedBy: 'admin',
    }
    const updated = [newGrant, ...grants.filter(g => g.email !== clean)]
    saveGrants(updated)
    setGrants(updated)
    setEmail(''); setNote(''); setError('')
    setSuccess(`✅ ${clean} granted ${plan.toUpperCase()} for ${days} days (expires ${expiresAt.toLocaleDateString('en-IN')})`)
    setTimeout(() => setSuccess(''), 5000)
  }

  const revoke = (id) => {
    const updated = grants.filter(g => g.id !== id)
    saveGrants(updated)
    setGrants(updated)
  }

  const active  = grants.filter(isGrantActive)
  const expired = grants.filter(g => !isGrantActive(g))

  return (
    <div style={{ maxWidth:720 }}>
      <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:22, marginBottom:6 }}>⚡ Grant Free Pro Access</h2>
      <p style={{ color:'#64748B', fontSize:14, marginBottom:24 }}>
        Enter a user's email. They get Pro access for the specified days — no payment needed.
        Works immediately when they log in with that email.
      </p>

      {/* Grant form */}
      <div style={{ background:'#fff', borderRadius:22, padding:24, border:'1.5px solid #E2E8F0', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', marginBottom:24 }}>
        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:8 }}>
            User Email Address *
          </label>
          <input value={email} type="email" placeholder="user@gmail.com"
            onChange={e => { setEmail(e.target.value); setError('') }}
            onKeyDown={e => e.key==='Enter' && grant()}
            style={{ width:'100%', padding:'13px 16px', borderRadius:14, border:`1.5px solid ${error?'#EF4444':'#E2E8F0'}`, fontSize:15, fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box' }}
            onFocus={e => e.target.style.borderColor='#D4AF37'}
            onBlur={e => e.target.style.borderColor=error?'#EF4444':'#E2E8F0'}
          />
          {error && <p style={{ color:'#EF4444', fontSize:12, marginTop:6 }}>{error}</p>}
        </div>

        {/* Plan selector */}
        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:8 }}>
            Plan to Grant
          </label>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:8 }}>
            {PLAN_OPTIONS.map(p => (
              <button key={p.id} onClick={() => setPlan(p.id)} style={{ padding:'10px 14px', borderRadius:12, border:`2px solid ${plan===p.id?'#D4AF37':'#E2E8F0'}`, background: plan===p.id?'rgba(212,175,55,0.08)':'#F8FAFC', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color: plan===p.id?'#1E3A5F':'#64748B', fontSize:13 }}>{p.id.toUpperCase()}</p>
                <p style={{ color:'#94A3B8', fontSize:11, marginTop:2 }}>{p.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Days */}
        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:8 }}>
            Duration: <span style={{ color:'#D4AF37' }}>{days} days</span>
            {days===365 && <span style={{ color:'#22C55E', fontSize:12, marginLeft:8 }}>— 1 Full Year 🎉</span>}
          </label>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {DAY_PRESETS.map(d => (
              <button key={d} onClick={() => setDays(d)} style={{ padding:'7px 16px', borderRadius:20, border:'none', cursor:'pointer', background: days===d?'#1E3A5F':'#F1F5F9', color: days===d?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13 }}>
                {d===365?'1 Year':`${d}d`}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ color:'#64748B', fontSize:13 }}>Custom:</span>
            <input type="number" min={1} max={3650} value={days}
              onChange={e => setDays(Math.max(1,Math.min(3650,+e.target.value)))}
              style={{ width:80, padding:'8px 12px', borderRadius:10, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', textAlign:'center' }}
              onFocus={e=>e.target.style.borderColor='#D4AF37'}
              onBlur={e=>e.target.style.borderColor='#E2E8F0'}
            />
            <span style={{ color:'#64748B', fontSize:13 }}>days</span>
          </div>
        </div>

        {/* Internal note */}
        <div style={{ marginBottom:20 }}>
          <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:8 }}>
            Internal Note (optional)
          </label>
          <input value={note} placeholder="e.g. Test user, Friend referral, Press demo..."
            onChange={e => setNote(e.target.value)}
            style={{ width:'100%', padding:'11px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:13, fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box' }}
            onFocus={e=>e.target.style.borderColor='#D4AF37'}
            onBlur={e=>e.target.style.borderColor='#E2E8F0'}
          />
        </div>

        {success && (
          <div style={{ background:'#DCFCE7', border:'1px solid #22C55E', borderRadius:12, padding:'12px 16px', marginBottom:16 }}>
            <p style={{ color:'#15803D', fontWeight:600, fontSize:14 }}>{success}</p>
          </div>
        )}

        <button onClick={grant} style={{ width:'100%', padding:'14px', borderRadius:14, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color:'#1E3A5F', cursor:'pointer', boxShadow:'0 4px 16px rgba(212,175,55,0.3)' }}>
          ⚡ Grant {plan.toUpperCase()} Access for {days} Days
        </button>
      </div>

      {/* Active grants */}
      {active.length > 0 && (
        <div style={{ marginBottom:20 }}>
          <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>
            ✅ Active Grants ({active.length})
          </h3>
          <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #E2E8F0' }}>
            {active.map((g,i) => {
              const daysLeft = Math.ceil((new Date(g.expiresAt)-new Date())/86400000)
              return (
                <div key={g.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom: i<active.length-1?'1px solid #F8FAFC':'none', flexWrap:'wrap' }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:'#DCFCE7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>⚡</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{g.email}</p>
                    <p style={{ color:'#64748B', fontSize:12, marginTop:2 }}>
                      {g.plan.toUpperCase()} · Expires {new Date(g.expiresAt).toLocaleDateString('en-IN')}
                      {g.note && <span style={{ color:'#94A3B8' }}> · {g.note}</span>}
                    </p>
                  </div>
                  <span style={{ background: daysLeft<=7?'#FEF3C7':'#DCFCE7', color: daysLeft<=7?'#92400E':'#15803D', fontSize:11, fontWeight:800, padding:'4px 12px', borderRadius:20, flexShrink:0 }}>
                    {daysLeft}d left
                  </span>
                  <button onClick={() => revoke(g.id)} style={{ background:'#FEE2E2', border:'none', borderRadius:10, padding:'7px 14px', color:'#991B1B', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, flexShrink:0 }}>
                    Revoke
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Expired */}
      {expired.length > 0 && (
        <div>
          <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#94A3B8', marginBottom:12 }}>
            Expired Grants ({expired.length})
          </h3>
          <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #E2E8F0', opacity:0.65 }}>
            {expired.slice(0,5).map((g,i) => (
              <div key={g.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 18px', borderBottom: i<Math.min(expired.length-1,4)?'1px solid #F8FAFC':'none' }}>
                <p style={{ fontFamily:'Poppins,sans-serif', color:'#94A3B8', fontSize:13, flex:1 }}>{g.email}</p>
                <span style={{ color:'#94A3B8', fontSize:11 }}>Expired {new Date(g.expiresAt).toLocaleDateString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {grants.length === 0 && (
        <div style={{ textAlign:'center', padding:40, color:'#94A3B8' }}>
          <p style={{ fontSize:36 }}>⚡</p>
          <p style={{ marginTop:10 }}>No grants yet. Enter an email above to get started.</p>
        </div>
      )}
    </div>
  )
}

function OverviewTab() {
  const grants = getGrants().filter(isGrantActive)
  const requests = JSON.parse(localStorage.getItem('examRequests') || '[]').filter(r=>r.status==='pending')
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:14 }}>
      {[
        ['⚡', grants.length,     'Active Pro Grants',    '#D4AF37'],
        ['📬', requests.length,   'Pending Exam Requests','#EF4444'],
        ['👥', '1,247',           'Registered Users',     '#1E3A5F'],
        ['📝', '23,481',          'Tests Completed',      '#22C55E'],
        ['💰', '₹48,392',         'Revenue This Month',   '#D4AF37'],
        ['🗃️', '5,280',           'Questions in DB',      '#8B5CF6'],
      ].map(([e,v,l,c]) => (
        <div key={l} style={{ background:'#fff', borderRadius:18, padding:'18px 16px', textAlign:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.05)', border:'1.5px solid #E2E8F0' }}>
          <p style={{ fontSize:28 }}>{e}</p>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:c, fontSize:22 }}>{v}</p>
          <p style={{ color:'#94A3B8', fontSize:12, marginTop:2 }}>{l}</p>
        </div>
      ))}
    </div>
  )
}

function UsersTab() {
  const grants = getGrants().filter(isGrantActive)
  const USERS = [
    { name:'Arjun Kumar',  email:'arjun@ex.com', role:'student', level:4, joined:'Jan 2026' },
    { name:'Vikram Nair',  email:'vikram@ex.com',role:'mentor',  level:7, joined:'Feb 2026' },
    { name:'Test User 1',  email:'test1@ex.com', role:'student', level:1, joined:'Jun 2026' },
  ]
  return (
    <div>
      <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>
        Registered Users · <span style={{ color:'#D4AF37' }}>{grants.length} with active grants</span>
      </p>
      <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #E2E8F0' }}>
        {USERS.map((u,i) => {
          const grant = grants.find(g=>g.email===u.email)
          return (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 80px 80px', gap:10, padding:'13px 18px', borderBottom:'1px solid #F8FAFC', alignItems:'center' }}>
              <div>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14 }}>{u.name}</p>
                <p style={{ color:'#94A3B8', fontSize:12 }}>{u.email}</p>
              </div>
              <div>
                {grant
                  ? <span style={{ background:'#DCFCE7', color:'#15803D', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>⚡ {grant.plan.toUpperCase()} Grant</span>
                  : <span style={{ background:'#F1F5F9', color:'#64748B', fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20 }}>{u.role}</span>
                }
              </div>
              <span style={{ color:'#D4AF37', fontWeight:700 }}>Lv {u.level}</span>
              <span style={{ color:'#94A3B8', fontSize:12 }}>{u.joined}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ExamQueueTab() {
  const [reqs, setReqs] = useState(() => {
    const s = JSON.parse(localStorage.getItem('examRequests')||'[]')
    return s.length ? s : [
      { id:'r1', examName:'TSPSC Group 2', conductingBody:'TSPSC', status:'pending', requestedAt:'2026-06-09T08:00:00Z' },
      { id:'r2', examName:'KPSC FDA',      conductingBody:'KPSC',  status:'pending', requestedAt:'2026-06-08T14:00:00Z' },
    ]
  })
  const mark = (id,status) => { const u=reqs.map(r=>r.id===id?{...r,status}:r); setReqs(u); localStorage.setItem('examRequests',JSON.stringify(u)) }
  return (
    <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #E2E8F0' }}>
      {reqs.map((r,i) => (
        <div key={r.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', borderBottom:i<reqs.length-1?'1px solid #F8FAFC':'none', flexWrap:'wrap' }}>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F' }}>{r.examName}</p>
            <p style={{ color:'#94A3B8', fontSize:12 }}>{r.conductingBody} · {r.requestedAt?.slice(0,10)}</p>
          </div>
          <span style={{ padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700, background:r.status==='added'?'#DCFCE7':'#FEF3C7', color:r.status==='added'?'#15803D':'#92400E' }}>{r.status}</span>
          {r.status==='pending' && <button onClick={()=>mark(r.id,'added')} style={{ background:'#22C55E', border:'none', borderRadius:10, padding:'7px 14px', color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, cursor:'pointer' }}>Mark Added ✓</button>}
        </div>
      ))}
    </div>
  )
}

function PushTestTab() {
  const [role, setRole] = useState('student')
  const [sent, setSent]  = useState(false)
  const MSGS = { student:'📚 Time to study! SSC CGL exam is 30 days away.', mentor:'💰 3 doubts waiting. Answer now and earn ₹15.', institution:"📊 Your centre's top student scored 92% today!", family:'👨‍👩‍👧 Family streak: 7 days! Keep it going! 🔥' }
  const simulate = () => {
    setSent(true)
    if (Notification.permission==='granted') new Notification('TryIT Educations',{ body:MSGS[role], icon:'/tryit-logo.webp' })
    else Notification.requestPermission().then(p=>{ if(p==='granted') new Notification('TryIT Educations',{ body:MSGS[role] }) })
    setTimeout(()=>setSent(false),3000)
  }
  return (
    <div style={{ maxWidth:400 }}>
      <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>🔔 Test Push Notification</p>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
        {['student','mentor','institution','family'].map(r=>(
          <button key={r} onClick={()=>setRole(r)} style={{ padding:'8px 16px', borderRadius:20, border:'none', cursor:'pointer', background:role===r?'#1E3A5F':'#F1F5F9', color:role===r?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13 }}>{r}</button>
        ))}
      </div>
      <div style={{ background:'#F8FAFC', borderRadius:14, padding:'12px 16px', marginBottom:16, border:'1.5px solid #E2E8F0' }}>
        <p style={{ color:'#1E3A5F', fontSize:13 }}>{MSGS[role]}</p>
      </div>
      <button onClick={simulate} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', color:sent?'#D4AF37':'#fff', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' }}>
        {sent?'✅ Sent!':'🔔 Simulate Push'}
      </button>
    </div>
  )
}
EOF
echo "Admin done"
# ══════════════════════════════════════════════════════════════════
# 2. SETTINGS PAGE (missing completely)
# ══════════════════════════════════════════════════════════════════
cat > src/pages/Settings.jsx << 'EOF'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { useAuth } from './context/AuthContext'
import { useToast } from './context/ToastContext'

export default function Settings() {
  const navigate = useNavigate()
  const { user }  = useAuth()
  const { showToast } = useToast()
  const [notif, setNotif] = useState({ examAlerts:true, streakReminder:true, rankChange:true, guruReply:true, hallBattle:false, promotions:false })
  const [lang, setLang] = useState(localStorage.getItem('app_lang_tone')||'en')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); showToast('success','Settings saved!'); setTimeout(()=>setSaved(false),2000) }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:24 }}>⚙️ Settings</h1>

      {/* Account */}
      <div style={{ background:'#fff', borderRadius:20, padding:20, marginBottom:14, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>👤 Account</p>
        <div style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:'1px solid #F8FAFC' }}>
          <span style={{ color:'#64748B', fontSize:14, flex:1 }}>Email</span>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ color:'#1E293B', fontSize:14, fontWeight:600 }}>{user.email}</span>
            <span style={{ background:'#F1F5F9', color:'#64748B', fontSize:10, padding:'2px 8px', borderRadius:20 }}>🔒 Locked</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:'1px solid #F8FAFC' }}>
          <span style={{ color:'#64748B', fontSize:14, flex:1 }}>TryIT ID</span>
          <span style={{ color:'#1E293B', fontSize:13, fontFamily:'monospace', fontWeight:600 }}>{user.userId}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0' }}>
          <span style={{ color:'#64748B', fontSize:14, flex:1 }}>Role</span>
          <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:12, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>
            {localStorage.getItem('tryit_role') || 'student'}
          </span>
        </div>
      </div>

      {/* Language */}
      <div style={{ background:'#fff', borderRadius:20, padding:20, marginBottom:14, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:14 }}>🌐 Language & Tone</p>
        <select value={lang} onChange={e=>{ setLang(e.target.value); localStorage.setItem('app_lang_tone',e.target.value) }}
          style={{ width:'100%', padding:'11px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, fontFamily:'Poppins,sans-serif', outline:'none' }}
          onFocus={e=>e.target.style.borderColor='#D4AF37'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}>
          <optgroup label="Neutral">
            <option value="en">English (neutral)</option>
          </optgroup>
          <optgroup label="North India">
            <option value="hi-bhai">Hindi (bhai / dost)</option>
            <option value="pa-paaji">Punjabi (paaji / veer)</option>
            <option value="gu-bhai">Gujarati (bhai / ben)</option>
            <option value="mr-bhau">Marathi (bhau / tai)</option>
          </optgroup>
          <optgroup label="South India">
            <option value="ta-machan">Tamil (machan / akka)</option>
            <option value="te-anna">Telugu (annayya / tammudu)</option>
            <option value="kn-anna">Kannada (anna / thamma)</option>
            <option value="ml-ikka">Malayalam (ikka / chetta)</option>
          </optgroup>
          <optgroup label="East India">
            <option value="bn-dada">Bengali (dada / bhai)</option>
            <option value="or-bhaina">Odia (bhaina)</option>
            <option value="as-koka">Assamese (koka)</option>
          </optgroup>
        </select>
      </div>

      {/* Notifications */}
      <div style={{ background:'#fff', borderRadius:20, padding:20, marginBottom:14, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:14 }}>🔔 Notifications</p>
        {[
          { key:'examAlerts',      label:'Exam Deadline Alerts',    desc:'Application dates, result notifications' },
          { key:'streakReminder',  label:'Daily Streak Reminder',   desc:'Keep your study streak alive' },
          { key:'rankChange',      label:'Rank Changes',            desc:'When your rank improves or drops' },
          { key:'guruReply',       label:'Guru Hub Replies',        desc:'When your doubt gets answered' },
          { key:'hallBattle',      label:'Hall Battle Updates',     desc:'Live score updates during battles' },
          { key:'promotions',      label:'Offers & Promotions',     desc:'Discounts, new features' },
        ].map(n => (
          <div key={n.key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 0', borderBottom:'1px solid #F8FAFC' }}>
            <div>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:14 }}>{n.label}</p>
              <p style={{ color:'#94A3B8', fontSize:12, marginTop:2 }}>{n.desc}</p>
            </div>
            <button role="switch" aria-checked={notif[n.key]}
              onClick={() => setNotif(p=>({...p,[n.key]:!p[n.key]}))}
              style={{ width:46, height:26, borderRadius:13, border:'none', cursor:'pointer', background:notif[n.key]?'#1E3A5F':'#E2E8F0', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
              <div style={{ width:20, height:20, borderRadius:'50%', background:'#fff', position:'absolute', top:3, left:notif[n.key]?23:3, transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
            </button>
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div style={{ background:'linear-gradient(135deg,rgba(30,58,95,0.06),rgba(212,175,55,0.04))', borderRadius:20, padding:20, marginBottom:14, border:'1.5px solid rgba(212,175,55,0.2)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>💳 Subscription</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <div>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:16 }}>⚡ TryIT Pro</p>
            <p style={{ color:'#64748B', fontSize:13 }}>Active · Renews July 10, 2026</p>
          </div>
          <button onClick={() => navigate('/pro')} style={{ background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:12, padding:'9px 20px', color:'#1E3A5F', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer' }}>
            Manage Plan
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ background:'#fff', borderRadius:20, padding:20, marginBottom:20, border:'1.5px solid #FEE2E2' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#DC2626', marginBottom:12 }}>⚠️ Danger Zone</p>
        <button onClick={() => { localStorage.clear(); navigate('/login') }}
          style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:12, padding:'10px 20px', color:'#DC2626', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13, cursor:'pointer' }}>
          Sign Out of All Devices
        </button>
      </div>

      <button onClick={save} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background: saved?'#22C55E':'linear-gradient(135deg,#1E3A5F,#0F2140)', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color:'#fff', cursor:'pointer' }}>
        {saved ? '✅ Saved!' : 'Save Settings'}
      </button>
    </AppLayout>
  )
}
EOF
echo "Settings done"

# ══════════════════════════════════════════════════════════════════
# 3. REMAINING QUICK PAGES
# ══════════════════════════════════════════════════════════════════

# Referral
cat > src/pages/referral/ReferralPage.jsx << 'EOF'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function ReferralPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const code = `TRYIT-${user.userId?.slice(-6) || 'AK2026'}`
  const link = `tryiteducations.net/join?ref=${code}`

  const share = () => {
    const msg = `🎓 Study smarter with TryIT Educations!\n1,10,000+ exams · 40+ languages · Real rankings\nUse my code ${code} for extra benefits!\n${link}`
    if (navigator.share) navigator.share({ text: msg })
    else { navigator.clipboard?.writeText(msg); showToast('success','Copied! Share on WhatsApp 🎉') }
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🎁 Refer & Earn</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:24 }}>Invite friends. Earn coins. Together rise faster.</p>

      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:28, marginBottom:20, textAlign:'center', border:'1.5px solid rgba(212,175,55,0.3)' }}>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, marginBottom:8 }}>Your Referral Code</p>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:32, letterSpacing:4 }}>{code}</p>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, marginTop:6, fontFamily:'monospace' }}>{link}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:12, marginBottom:20 }}>
        {[['🎯','You earn','100 coins per signup'],['💰','Friend gets','₹50 off first plan'],['🌟','After 5 referrals','+500 bonus coins']].map(([e,t,v])=>(
          <div key={t} style={{ background:'#fff', borderRadius:18, padding:18, textAlign:'center', border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontSize:28 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginTop:8 }}>{t}</p>
            <p style={{ color:'#D4AF37', fontWeight:700, fontSize:13 }}>{v}</p>
          </div>
        ))}
      </div>

      <button onClick={share} style={{ width:'100%', padding:16, borderRadius:16, border:'none', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>
        📤 Share on WhatsApp / Instagram →
      </button>
    </AppLayout>
  )
}
EOF

# Classroom
cat > src/pages/classroom/ClassroomHub.jsx << 'EOF'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'

const SECTIONS = [
  { emoji:'📄', title:'PDF Library',    desc:'Download notes, PYQ papers, formula sheets',  path:'/classroom/pdf',    badge:'2,400+ files'  },
  { emoji:'📅', title:'Study Planner',  desc:'Day-by-day plan from today to exam day',       path:'/classroom/planner',badge:'Auto-generates' },
  { emoji:'📽️', title:'Video Lectures', desc:'Curated YouTube + Swayam lectures by topic',  path:'/classroom/videos', badge:'Curated'        },
  { emoji:'📝', title:'Quick Notes',    desc:'AI-summarised notes for every topic',          path:'/classroom/notes',  badge:'7-layer'        },
  { emoji:'🗂️', title:'Formula Bank',   desc:'All formulas for Maths, Science, Economics',  path:'/classroom/formulas',badge:'Printable'     },
  { emoji:'📊', title:'Mind Maps',      desc:'Visual concept maps for complex topics',       path:'/classroom/mindmaps',badge:'Download'      },
]

export default function ClassroomHub() {
  const navigate = useNavigate()
  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>📚 Classroom</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:24 }}>All your study resources in one place.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap:14 }}>
        {SECTIONS.map(s => (
          <div key={s.title} onClick={() => navigate(s.path)}
            style={{ background:'#fff', borderRadius:20, padding:22, border:'1.5px solid #E2E8F0', cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,0.04)', transition:'all 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='#D4AF37'; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#E2E8F0'; e.currentTarget.style.transform='none' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <span style={{ fontSize:32 }}>{s.emoji}</span>
              <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{s.badge}</span>
            </div>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:16, marginBottom:4 }}>{s.title}</p>
            <p style={{ color:'#64748B', fontSize:13 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
EOF

# Mentor Hub
cat > src/pages/mentor/MentorHub.jsx << 'EOF'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

export default function MentorHub() {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>🧑‍🏫 Mentor Hub</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:24 }}>Teach. Earn. Become a Pan-India Guru.</p>

      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:24, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:14 }}>
        {[['🎓',user.guruPoints,'Guru Points'],['💰','₹347','This Week'],['⭐','4.9','Rating'],['📝','47','Answers']].map(([e,v,l])=>(
          <div key={l} style={{ textAlign:'center' }}>
            <p style={{ fontSize:24 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:20 }}>{v}</p>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap:12 }}>
        {[
          { emoji:'🎓', title:'Answer Doubts',  desc:'Students are waiting. Earn ₹15–50 per accepted answer.', path:'/guru-hub',              btn:'Go to Guru Hub' },
          { emoji:'📚', title:'Publish a Book',  desc:'Upload your notes as a Guru Book. Earn 85% of every sale.', path:'/ebooks/upload',    btn:'Upload Book' },
          { emoji:'🎟️', title:'My Coupons',     desc:'Generate referral coupons. Earn on every new student.', path:'/mentor-hub/coupons',      btn:'Manage Coupons' },
          { emoji:'💸', title:'Cashback Center', desc:'View earnings. Withdraw to UPI every Monday.', path:'/mentor-hub/cashback',             btn:'View Earnings' },
        ].map(s=>(
          <div key={s.title} style={{ background:'#fff', borderRadius:20, padding:20, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize:30, display:'block', marginBottom:10 }}>{s.emoji}</span>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15, marginBottom:6 }}>{s.title}</p>
            <p style={{ color:'#64748B', fontSize:13, marginBottom:14 }}>{s.desc}</p>
            <button onClick={()=>navigate(s.path)} style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', border:'none', borderRadius:12, padding:'9px 18px', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer' }}>{s.btn} →</button>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
EOF
echo "Settings + Referral + Classroom + MentorHub done"
# ══════════════════════════════════════════════════════════════════
# 4. BACKEND WIRING — .env.local + AuthContext + Grant checker
# ══════════════════════════════════════════════════════════════════

# Updated AuthContext — checks pro grants from admin
cat > src/context/AuthContext.jsx << 'EOF'
import { createContext, useContext } from 'react'
import { getLevelInfo } from '../data/mockSeeds'

// Check if admin granted pro access for this email
function checkAdminGrant(email) {
  try {
    const grants = JSON.parse(localStorage.getItem('tryit_pro_grants') || '[]')
    const grant  = grants.find(g =>
      g.email?.toLowerCase() === email?.toLowerCase() &&
      new Date(g.expiresAt) > new Date()
    )
    return grant || null
  } catch { return null }
}

const MOCK_USER = {
  id:'usr-001', name:'Arjun Kumar', initials:'AK',
  email: localStorage.getItem('tryit_email') || 'arjun@tryiteducations.net',
  state:'Tamil Nadu', city:'Coimbatore', category:'General',
  level:4, levelTitle:'The Gold Miner', levelEmoji:'⛏️',
  xp:6240, xpToNext:8000,
  coins:1247, streak:12, streakFreezes:2,
  isPro: !!checkAdminGrant(localStorage.getItem('tryit_email') || ''),
  plan: checkAdminGrant(localStorage.getItem('tryit_email') || '')?.plan || 'free',
  userId:'TRY-TN-00001-2026', joinDate:'January 2026',
  rank:1243, testsCompleted:23, avgScore:78,
  studyHours:'48h 30m', guruPoints:847,
  languages:['en','ta'],
  exams:[
    { id:'ssc-cgl',  name:'SSC CGL',  readiness:67, examDate:'Aug 2026' },
    { id:'upsc-cse', name:'UPSC CSE', readiness:34, examDate:'May 2026' },
    { id:'neet-ug',  name:'NEET UG',  readiness:12, examDate:'May 2026' },
    { id:'ibps-po',  name:'IBPS PO',  readiness:45, examDate:'Jul 2026' },
    { id:'gate-cs',  name:'GATE CS',  readiness:28, examDate:'Feb 2027' },
  ],
  subjects:[
    { name:'Quant',     accuracy:82, trend:'up',   emoji:'📐' },
    { name:'Reasoning', accuracy:90, trend:'up',   emoji:'🧠' },
    { name:'English',   accuracy:68, trend:'down', emoji:'📝' },
    { name:'GK',        accuracy:75, trend:'up',   emoji:'🌏' },
    { name:'Science',   accuracy:55, trend:'down', emoji:'🔬' },
  ],
}

const AuthCtx = createContext({})

export function AuthProvider({ children }) {
  const storedEmail = localStorage.getItem('tryit_email')
  const grant       = checkAdminGrant(storedEmail || '')

  const user = {
    ...MOCK_USER,
    email:   storedEmail || MOCK_USER.email,
    isPro:   !!grant || MOCK_USER.isPro,
    plan:    grant?.plan || 'free',
    grantInfo: grant,
  }

  return (
    <AuthCtx.Provider value={{
      user,
      profile: user,
      loading: false,
      isAuthenticated: true,
      login:  () => {},
      logout: () => { localStorage.removeItem('tryit_email'); window.location.href='/login' },
      sendOTP:       async () => ({ error: null }),
      verifyOTP:     async (email) => {
        localStorage.setItem('tryit_email', email)
        return { user: { ...user, email }, error: null }
      },
      signInWithGoogle: async () => ({ error: null }),
      checkAdminGrant,
    }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
EOF

# Updated Login.jsx — saves email + checks admin grant
cat > src/pages/Login.jsx << 'EOF'
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
EOF
echo "AuthContext + Login done"

# Fix Settings import path (AppLayout relative)
sed -i "s|import AppLayout from './components/layout/AppLayout'|import AppLayout from '../components/layout/AppLayout'|g" src/pages/Settings.jsx

# Update App.jsx with all new routes
python3 << 'PYEOF'
with open('src/App.jsx','r') as f: c = f.read()

new_imports = """
const MentorHub      = lazy(() => import('./pages/mentor/MentorHub'))
const ClassroomHub   = lazy(() => import('./pages/classroom/ClassroomHub'))
const ReferralPage   = lazy(() => import('./pages/referral/ReferralPage'))"""

new_routes = """
                <Route path="/mentor-hub"      element={<MentorHub />} />
                <Route path="/classroom"       element={<ClassroomHub />} />
                <Route path="/referral"        element={<ReferralPage />} />"""

if 'MentorHub' not in c:
    c = c.replace('const LiveImpactTracker', new_imports + '\nconst LiveImpactTracker', 1)
if '/mentor-hub"      element={<MentorHub' not in c:
    c = c.replace('<Route path="/mentor-hub"', new_routes + '\n                {/* final pages */', 1)
with open('src/App.jsx','w') as f: f.write(c)
print('App.jsx updated with final routes')
PYEOF

# Write .env.local template
cat > .env.local.template << 'ENVEOF'
# ═══════════════════════════════════════════════
# TryIT Educations — Environment Variables
# Copy this to .env.local and fill in values
# ═══════════════════════════════════════════════

# Supabase — get from supabase.com → Project Settings → API
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Razorpay — get from razorpay.com → Settings → API Keys
VITE_RAZORPAY_KEY=rzp_test_XXXXXXXXXX

# Question Encryption — generate a random 32-char string
VITE_QUESTION_ENCRYPTION_KEY=change-this-to-random-32-chars

# App config
VITE_APP_NAME=TryIT Educations
VITE_APP_URL=https://tryiteducations.net
ENVEOF

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Final pages installed!                               ║"
echo "║                                                          ║"
echo "║  ADMIN GRANT SYSTEM:                                     ║"
echo "║    1. Go to /admin/login                                 ║"
echo "║    2. Login: admin@tryit.com / admin123                  ║"
echo "║    3. Click 'Grant Pro Access' tab                       ║"
echo "║    4. Enter ANY user email + pick plan + days            ║"
echo "║    5. When that user logs in → auto gets Pro access      ║"
echo "║                                                          ║"
echo "║  NEW PAGES:                                              ║"
echo "║    /settings    → Full settings + notifications          ║"
echo "║    /referral    → Refer & earn page                      ║"
echo "║    /classroom   → PDF + planner + notes hub              ║"
echo "║    /mentor-hub  → Mentor earnings dashboard              ║"
echo "║                                                          ║"
echo "║  .env.local.template created — fill in your API keys    ║"
echo "║                                                          ║"
echo "║  Run: npm run dev                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
