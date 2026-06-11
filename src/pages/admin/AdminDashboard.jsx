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
