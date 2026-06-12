import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { BADGES, LEVELS } from '../../data/mockSeeds'

export default function Achievements() {
  const { user } = useAuth()
  const [tab, setTab] = useState('badges')
  const earned = BADGES.filter(b=>b.earned)
  const pending = BADGES.filter(b=>!b.earned)

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🏅 Achievements</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>
          {earned.length}/{BADGES.length} badges earned · {user?.xp.toLocaleString()} total XP
        </p>
      </div>

      {/* XP progress */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:22, padding:22, marginBottom:20, border:'1.5px solid rgba(212,175,55,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
          <div style={{ fontSize:44 }}>{user?.levelEmoji}</div>
          <div style={{ flex:1 }}>
            <p style={{ color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:20 }}>Level {user?.level} — {user?.levelTitle}</p>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:2 }}>
              {(user?.xpToNext - user?.xp).toLocaleString()} XP to {LEVELS[user?.level]?.title || 'Max'} {LEVELS[user?.level]?.emoji || '🏆'}
            </p>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:22 }}>{user?.xp.toLocaleString()}</p>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>/ {user?.xpToNext.toLocaleString()} XP</p>
          </div>
        </div>
        <div style={{ height:10, background:'rgba(255,255,255,0.1)', borderRadius:5 }}>
          <div style={{ width:`${(user?.xp/user?.xpToNext)*100}%`, height:10, borderRadius:5, background:'linear-gradient(90deg,#D4AF37,#E8C84A)', transition:'width 1s ease' }}/>
        </div>
      </div>

      {/* Cinematic levels */}
      <div style={{ background:'#fff', borderRadius:22, padding:20, marginBottom:16, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:14 }}>🎬 Cinematic Level Journey</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,140px),1fr))', gap:10 }}>
          {LEVELS.map(lv => {
            const isActive = lv.level === user?.level
            const isDone = lv.level < user?.level
            return (
              <div key={lv.level} style={{ borderRadius:16, padding:'12px 10px', textAlign:'center',
                background: isActive ? 'linear-gradient(135deg,#1E3A5F,#0F2140)' : isDone ? 'rgba(30,58,95,0.06)' : '#F8FAFC',
                border: `1.5px solid ${isActive ? '#D4AF37' : isDone ? 'rgba(30,58,95,0.2)' : '#E2E8F0'}`,
                opacity: lv.level > user?.level + 2 ? 0.5 : 1,
              }}>
                <span style={{ fontSize:26 }}>{lv.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:11,
                  color: isActive ? '#D4AF37' : isDone ? '#1E3A5F' : '#94A3B8',
                  marginTop:6 }}>{lv.title}</p>
                {lv.cinema && <p style={{ color: isActive ? 'rgba(212,175,55,0.7)' : '#94A3B8', fontSize:9, fontStyle:'italic' }}>🎬 {lv.cinema}</p>}
                <span style={{ display:'inline-block', marginTop:4, background: isActive ? 'rgba(212,175,55,0.2)' : '#F1F5F9',
                  color: isActive ? '#D4AF37' : '#94A3B8', fontSize:9, fontWeight:700,
                  padding:'2px 8px', borderRadius:20 }}>
                  {isActive ? 'CURRENT' : isDone ? '✓' : `Lv ${lv.level}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {[['badges',`🏅 Badges (${earned.length}/${BADGES.length})`],['xp-log','⭐ XP Log']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:'9px 18px', borderRadius:20, border:'none', cursor:'pointer', background: tab===k?'#1E3A5F':'#fff', color: tab===k?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:13 }}>{l}</button>
        ))}
      </div>

      {tab === 'badges' && (
        <div>
          {earned.length > 0 && (
            <div style={{ marginBottom:24 }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>Earned ✅</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap:12 }}>
                {earned.map(b => (
                  <div key={b.id} style={{ background:'linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))', borderRadius:18, padding:'16px 14px', textAlign:'center', border:'1.5px solid rgba(212,175,55,0.3)' }}>
                    <span style={{ fontSize:36 }}>{b.emoji}</span>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:13, marginTop:8 }}>{b.name}</p>
                    <p style={{ color:'#94A3B8', fontSize:11, marginTop:3 }}>{b.desc}</p>
                    <p style={{ color:'#22C55E', fontSize:11, fontWeight:600, marginTop:6 }}>✅ {b.earnedDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#64748B', marginBottom:12 }}>In Progress</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap:12 }}>
            {pending.map(b => (
              <div key={b.id} style={{ background:'#F8FAFC', borderRadius:18, padding:'16px 14px', textAlign:'center', border:'1.5px solid #E2E8F0', opacity:0.8 }}>
                <span style={{ fontSize:36, filter:'grayscale(0.6)' }}>{b.emoji}</span>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#64748B', fontSize:13, marginTop:8 }}>{b.name}</p>
                <p style={{ color:'#94A3B8', fontSize:11, marginTop:3 }}>{b.desc}</p>
                {b.progress !== undefined && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ height:5, background:'#E2E8F0', borderRadius:3 }}>
                      <div style={{ width:`${(b.progress/b.target)*100}%`, height:5, borderRadius:3, background:'#D4AF37' }}/>
                    </div>
                    <p style={{ color:'#94A3B8', fontSize:10, marginTop:3 }}>{b.progress}/{b.target}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'xp-log' && (
        <div style={{ background:'#fff', borderRadius:22, overflow:'hidden', border:'1.5px solid #E2E8F0' }}>
          {[
            { action:'Completed SSC CGL Mock 4', xp:'+120', date:'Today',      icon:'📝' },
            { action:'Answered a Guru Hub doubt', xp:'+25',  date:'Today',      icon:'🎓' },
            { action:'7-day streak bonus',         xp:'+50',  date:'Yesterday', icon:'🔥' },
            { action:'Brain Game — Math Blitz',    xp:'+15',  date:'Yesterday', icon:'🎮' },
            { action:'Focus Mode — 2 hrs',          xp:'+30',  date:'2 days ago',icon:'🎯' },
            { action:'Completed IBPS PO Mock',      xp:'+110', date:'3 days ago',icon:'📝' },
          ].map((item,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 18px', borderBottom:'1px solid #F8FAFC' }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{item.icon}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{item.action}</p>
                <p style={{ color:'#94A3B8', fontSize:11 }}>{item.date}</p>
              </div>
              <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#22C55E', fontSize:16 }}>{item.xp}</span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
