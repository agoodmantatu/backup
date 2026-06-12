import { useState, useEffect, useRef } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const DURATIONS = [15,25,45,60]
const SOUNDS = [
  { id:'rain',    label:'🌧️ Rain',    desc:'Gentle rain on a tin roof'   },
  { id:'forest',  label:'🌿 Forest',  desc:'Birds and rustling leaves'   },
  { id:'cafe',    label:'☕ Café',    desc:'Soft background café chatter' },
  { id:'silence', label:'🤫 Silence', desc:'No sound — pure focus'       },
  { id:'ocean',   label:'🌊 Ocean',  desc:'Slow ocean waves'             },
]
const SUBJECTS = ['Quantitative Aptitude','Reasoning','English','General Knowledge','Science','Current Affairs','Custom']

export default function FocusMode() {
  const { showToast } = useToast()
  const [duration, setDuration] = useState(25)
  const [sound, setSound] = useState('rain')
  const [subject, setSubject] = useState('Quantitative Aptitude')
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(25 * 60)
  const [sessions, setSessions] = useState(3)
  const [totalCoins, setCoins] = useState(75)
  const intervalRef = useRef(null)

  const pct = ((duration*60 - remaining) / (duration*60)) * 100
  const mins = Math.floor(remaining/60)
  const secs = remaining % 60

  const start = () => {
    setRemaining(duration * 60)
    setRunning(true)
    showToast('success', `🎯 Focus session started! Studying: ${subject}`)
  }
  const stop = () => {
    setRunning(false)
    clearInterval(intervalRef.current)
    showToast('info', 'Session paused.')
  }
  const finish = () => {
    setRunning(false)
    setSessions(s => s+1)
    setCoins(c => c+25)
    setRemaining(duration*60)
    showToast('success', '🎉 Session complete! +25 coins earned!')
  }

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(intervalRef.current); finish(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const circumference = 2 * Math.PI * 90
  const strokeDash = circumference - (pct / 100) * circumference

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🎯 Focus Mode</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>Pomodoro timer · Ambient sounds · Earn coins while you study</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap:20 }}>

        {/* Timer */}
        <div style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', borderRadius:24, padding:28, display:'flex', flexDirection:'column', alignItems:'center', gap:20, border:'1.5px solid rgba(212,175,55,0.3)' }}>
          <div style={{ position:'relative', width:210, height:210 }}>
            <svg width="210" height="210" style={{ transform:'rotate(-90deg)' }}>
              <circle cx="105" cy="105" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
              <circle cx="105" cy="105" r="90" fill="none" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDash}
                style={{ transition:'stroke-dashoffset 1s linear' }}/>
            </svg>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#fff', fontSize:48, lineHeight:1 }}>
                {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
              </p>
              <p style={{ color:'#D4AF37', fontSize:13, marginTop:4 }}>{subject.slice(0,18)}</p>
              {running && <div style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E', marginTop:8, animation:'pulse 1s infinite' }}/>}
            </div>
          </div>

          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {DURATIONS.map(d => (
              <button key={d} onClick={() => { if(!running){ setDuration(d); setRemaining(d*60) } }}
                disabled={running}
                style={{ padding:'7px 14px', borderRadius:20, border:'none', cursor: running?'not-allowed':'pointer',
                  background: duration===d ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.08)',
                  color: duration===d ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:13 }}>
                {d} min
              </button>
            ))}
          </div>

          {!running ? (
            <button onClick={start} style={{ width:'100%', background:'linear-gradient(135deg,#D4AF37,#E8C84A)', border:'none', borderRadius:14, padding:'14px', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:16, color:'#1E3A5F', cursor:'pointer' }}>
              ▶ Start Focus Session
            </button>
          ) : (
            <div style={{ display:'flex', gap:10, width:'100%' }}>
              <button onClick={stop} style={{ flex:1, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:12, padding:'12px', color:'rgba(255,255,255,0.7)', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:700 }}>⏸ Pause</button>
              <button onClick={finish} style={{ flex:1, background:'rgba(34,197,94,0.2)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:12, padding:'12px', color:'#4ADE80', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontWeight:700 }}>✓ Finish</button>
            </div>
          )}

          <div style={{ display:'flex', gap:16 }}>
            {[['📅',sessions,'Sessions today'],['🪙',totalCoins,'Coins earned']].map(([e,v,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <p style={{ fontSize:20 }}>{e}</p>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#D4AF37', fontSize:18 }}>{v}</p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Subject */}
          <div style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>📚 What are you studying?</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setSubject(s)} style={{ padding:'7px 14px', borderRadius:20, border:'none', cursor:'pointer', background: subject===s?'#1E3A5F':'#F1F5F9', color: subject===s?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12 }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Ambient sound */}
          <div style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', marginBottom:12 }}>🎵 Ambient Sound</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {SOUNDS.map(s => (
                <button key={s.id} onClick={() => setSound(s.id)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:14, border:`1.5px solid ${sound===s.id?'#D4AF37':'#E2E8F0'}`, background: sound===s.id?'rgba(212,175,55,0.06)':'#F8FAFC', cursor:'pointer', textAlign:'left', width:'100%' }}>
                  <span style={{ fontSize:20 }}>{s.label.split(' ')[0]}</span>
                  <div>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E293B', fontSize:13 }}>{s.label}</p>
                    <p style={{ color:'#94A3B8', fontSize:11 }}>{s.desc}</p>
                  </div>
                  {sound===s.id && <span style={{ marginLeft:'auto', color:'#D4AF37', fontWeight:800 }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Coins info */}
          <div style={{ background:'linear-gradient(135deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))', borderRadius:18, padding:16, border:'1.5px solid rgba(212,175,55,0.25)' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:6 }}>🪙 Earn While You Study</p>
            <p style={{ color:'#64748B', fontSize:13, lineHeight:1.6 }}>Complete a 25-min session → +25 coins. Complete 4 sessions → bonus +50 coins. Coins can be spent on premium tests and features.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
