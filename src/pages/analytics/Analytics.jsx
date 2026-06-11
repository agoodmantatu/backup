import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const WEEKLY_DATA = [
  { day:'Mon', score:72, questions:45 },
  { day:'Tue', score:68, questions:38 },
  { day:'Wed', score:81, questions:52 },
  { day:'Thu', score:75, questions:41 },
  { day:'Fri', score:85, questions:60 },
  { day:'Sat', score:79, questions:55 },
  { day:'Sun', score:88, questions:67 },
]

const SUBJECT_DATA = [
  { name:'Reasoning', accuracy:90, attempted:142, correct:128, trend:'up',   color:'#22C55E' },
  { name:'Quant',     accuracy:82, attempted:118, correct:97,  trend:'up',   color:'#22C55E' },
  { name:'GK',        accuracy:75, attempted:96,  correct:72,  trend:'up',   color:'#D4AF37' },
  { name:'English',   accuracy:68, attempted:88,  correct:60,  trend:'down', color:'#F59E0B' },
  { name:'Science',   accuracy:55, attempted:74,  correct:41,  trend:'down', color:'#EF4444' },
]

const RANK_HISTORY = [8432,6210,4890,3421,2890,2341,1890,1521,1243]

export default function Analytics() {
  const { user } = useAuth()
  const [period, setPeriod] = useState('week')
  const maxScore = Math.max(...WEEKLY_DATA.map(d=>d.score))

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>📊 My Analytics</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Track your progress. Identify weak areas. Rise faster.</p>
      </div>

      {/* Top stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,180px),1fr))', gap:12, marginBottom:20 }}>
        {[
          { e:'📝', v:user.testsCompleted, l:'Tests Taken',      c:'#1E3A5F' },
          { e:'📊', v:`${user.avgScore}%`, l:'Average Score',    c:'#D4AF37' },
          { e:'🏆', v:`#${user.rank.toLocaleString()}`, l:'Current Rank', c:'#D4AF37' },
          { e:'📈', v:'+142',              l:'Rank Gained',       c:'#22C55E' },
          { e:'🔥', v:`${user.streak}d`,   l:'Study Streak',     c:'#F97316' },
          { e:'⏱️', v:'48h',               l:'Study Time',        c:'#8B5CF6' },
        ].map(s => (
          <div key={s.l} style={{ background:'#fff', borderRadius:18, padding:'14px 12px', textAlign:'center', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize:26, marginBottom:4 }}>{s.e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:s.c, fontSize:20 }}>{s.v}</p>
            <p style={{ color:'#94A3B8', fontSize:11, marginTop:2 }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Score chart */}
      <div style={{ background:'#fff', borderRadius:22, padding:22, marginBottom:16, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18, flexWrap:'wrap', gap:8 }}>
          <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:16 }}>Score Trend — Last 7 Days</p>
          <div style={{ display:'flex', gap:6 }}>
            {['week','month'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer', background: period===p?'#1E3A5F':'#F1F5F9', color: period===p?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>
                {p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Bar chart */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:120 }}>
          {WEEKLY_DATA.map((d,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:11, color:'#94A3B8', fontWeight:600 }}>{d.score}%</span>
              <div style={{ width:'100%', borderRadius:'6px 6px 0 0', transition:'height 0.5s ease',
                height:`${(d.score/100)*90}px`,
                background: d.score>=80 ? 'linear-gradient(180deg,#22C55E,#16A34A)' : d.score>=70 ? 'linear-gradient(180deg,#D4AF37,#C9A020)' : 'linear-gradient(180deg,#F59E0B,#D97706)',
                minHeight:8 }}/>
              <span style={{ fontSize:10, color:'#94A3B8' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rank history */}
      <div style={{ background:'#fff', borderRadius:22, padding:22, marginBottom:16, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>Rank Journey (Last 9 Tests)</p>
        <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:80, position:'relative' }}>
          {RANK_HISTORY.map((rank,i) => {
            const maxRank = Math.max(...RANK_HISTORY)
            const h = ((maxRank - rank) / maxRank) * 65 + 15
            return (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <span style={{ fontSize:9, color:'#94A3B8' }}>#{(rank/1000).toFixed(1)}k</span>
                <div style={{ width:'100%', borderRadius:'4px 4px 0 0', height:`${h}px`,
                  background: i===RANK_HISTORY.length-1 ? '#D4AF37' : 'linear-gradient(180deg,#1E3A5F,#0F2140)' }}/>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop:8, display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'#94A3B8', fontSize:11 }}>Start: #8,432</span>
          <span style={{ color:'#22C55E', fontWeight:700, fontSize:12 }}>Now: #1,243 ↑</span>
        </div>
      </div>

      {/* Subject breakdown */}
      <div style={{ background:'#fff', borderRadius:22, padding:22, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:16 }}>Subject Performance</p>
        {SUBJECT_DATA.map(s => (
          <div key={s.name} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:14 }}>{s.name}</span>
                <span style={{ color: s.trend==='up'?'#22C55E':'#EF4444', fontSize:14, fontWeight:700 }}>{s.trend==='up'?'↑':'↓'}</span>
              </div>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <span style={{ color:'#94A3B8', fontSize:12 }}>{s.correct}/{s.attempted}</span>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:s.color, fontSize:15 }}>{s.accuracy}%</span>
              </div>
            </div>
            <div style={{ width:'100%', height:10, background:'#F1F5F9', borderRadius:5 }}>
              <div style={{ width:`${s.accuracy}%`, height:10, borderRadius:5, background:s.color, transition:'width 1s ease' }}/>
            </div>
          </div>
        ))}
        <div style={{ background:'#FEF3C7', borderRadius:14, padding:'12px 16px', marginTop:16 }}>
          <p style={{ color:'#92400E', fontWeight:700, fontSize:13 }}>💡 Focus on English</p>
          <p style={{ color:'#92400E', fontSize:12, marginTop:4 }}>Improving English from 68% to 78% would jump your rank by ~400 positions based on current competition data.</p>
        </div>
      </div>
    </AppLayout>
  )
}
