import os

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

# ============================================================
# 1. MENTORHUB — Fixed sidebar, audio/video upload, correct nav
# ============================================================
w('src/pages/mentor/MentorHub.jsx', """// src/pages/mentor/MentorHub.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  {icon:'🏠', label:'Dashboard',   path:'/mentor-hub'},
  {icon:'👥', label:'My Students', path:'/mentor-hub/students'},
  {icon:'💬', label:'Doubts',      path:'/mentor-hub/doubts'},
  {icon:'📁', label:'Materials',   path:'/mentor-hub/materials'},
  {icon:'🏆', label:'Leaderboard', path:'/mentor-hub/leaderboard'},
  {icon:'💰', label:'Earnings',    path:'/mentor-hub/cashback'},
  {icon:'📊', label:'Analytics',   path:'/mentor-hub/analytics'},
]

const STATS = [
  {icon:'👨‍🎓', label:'Active Students', val:'12', color:'#3B82F6'},
  {icon:'💬',  label:'Doubts Pending',  val:'4',  color:'#F59E0B'},
  {icon:'⭐',  label:'Avg Rating',      val:'4.8', color:'#FBBF24'},
  {icon:'💰',  label:'This Month',      val:'₹3,840', color:'#22C55E'},
]

const PENDING = [
  {student:'Priya R.',   exam:'UPSC',    q:'Fundamental Rights vs DPSP?',         time:'10m ago'},
  {student:'Karthik M.', exam:'SSC CGL', q:'Time & work shortcut for 3 workers?', time:'25m ago'},
  {student:'Anjali S.',  exam:'TNPSC',   q:'73rd Amendment significance?',        time:'1h ago'},
  {student:'Rahul V.',   exam:'IBPS',    q:'Difference between CRR and SLR?',     time:'2h ago'},
]

const STUDENTS = [
  {name:'Priya R.',   exam:'UPSC',    plan:'Monthly', rating:5, status:'active'},
  {name:'Karthik M.', exam:'SSC CGL', plan:'Weekly',  rating:4, status:'active'},
  {name:'Anjali S.',  exam:'TNPSC',   plan:'Monthly', rating:5, status:'active'},
  {name:'Rahul V.',   exam:'IBPS',    plan:'Weekly',  rating:4, status:'active'},
]

export default function MentorHub() {
  const nav = useNavigate()
  const { user } = useAuth()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [audioFile, setAudioFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadExam, setUploadExam] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState([])
  const [uploadTab, setUploadTab] = useState('audio')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleUpload = async () => {
    const file = uploadTab === 'audio' ? audioFile : videoFile
    if (!file || !uploadTitle.trim()) return
    setUploading(true)
    await new Promise(r => setTimeout(r, 1500))
    const expiresAt = new Date(Date.now() + (uploadTab === 'audio' ? 7 : 2) * 24 * 60 * 60 * 1000)
    setUploaded(prev => [{
      id: Date.now(),
      title: uploadTitle,
      type: uploadTab,
      exam: uploadExam,
      size: (file.size / 1024 / 1024).toFixed(1) + 'MB',
      downloads: 0,
      expiresAt: expiresAt.toLocaleDateString('en-IN'),
      uploadedAt: new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'}),
    }, ...prev])
    setUploading(false)
    setUploadTitle('')
    setAudioFile(null)
    setVideoFile(null)
    setUploadExam('')
  }

  const Sidebar = () => (
    <div style={{
      width: 220,
      background: p,
      minHeight: '100vh',
      position: 'fixed',
      top: 0,
      left: isMobile ? (sidebarOpen ? 0 : -240) : 0,
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      transition: 'left 0.3s ease',
      boxShadow: isMobile && sidebarOpen ? '4px 0 20px rgba(0,0,0,0.3)' : 'none',
    }}>
      {/* Header */}
      <div style={{padding:'18px 16px',borderBottom:'1px solid rgba(255,255,255,0.1)',
        display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:a,
            display:'flex',alignItems:'center',justifyContent:'center',
            fontWeight:800,fontSize:14,color:p}}>
            {user?.name?.[0]||'M'}
          </div>
          <div>
            <p style={{color:'#fff',fontWeight:700,fontSize:13,margin:0}}>
              {user?.name||'Mentor'}
            </p>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:10,margin:0}}>
              ⭐ 4.8 · 12 students
            </p>
          </div>
        </div>
        {isMobile && (
          <button onClick={()=>setSidebarOpen(false)}
            style={{background:'rgba(255,255,255,0.1)',border:'none',
              borderRadius:8,width:28,height:28,color:'#fff',
              fontSize:16,cursor:'pointer',display:'flex',
              alignItems:'center',justifyContent:'center'}}>
            ✕
          </button>
        )}
      </div>

      {/* Nav items */}
      <div style={{flex:1,padding:'12px 8px',overflowY:'auto'}}>
        {NAV.map((n,i) => {
          const isActive = window.location.pathname === n.path
          return (
            <button key={i} onClick={() => {
              nav(n.path)
              if (isMobile) setSidebarOpen(false)
            }}
              style={{width:'100%',display:'flex',alignItems:'center',gap:10,
                padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',
                marginBottom:2,textAlign:'left',
                background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                fontFamily:'Poppins,sans-serif',fontWeight:600,fontSize:13,
                transition:'all 0.15s'}}>
              <span style={{fontSize:17}}>{n.icon}</span>
              <span>{n.label}</span>
              {isActive && (
                <div style={{marginLeft:'auto',width:6,height:6,
                  borderRadius:'50%',background:a}}/>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{padding:'12px'}}>
        <button onClick={()=>nav('/student')}
          style={{width:'100%',background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,
            padding:'8px',color:'rgba(255,255,255,0.7)',fontSize:12,
            cursor:'pointer',fontWeight:600,fontFamily:'Poppins,sans-serif'}}>
          ← Student View
        </button>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif',
      display:'flex'}}>

      <Sidebar/>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div onClick={()=>setSidebarOpen(false)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:199}}/>
      )}

      {/* Main */}
      <div style={{marginLeft: isMobile ? 0 : 220, flex:1, padding:'0'}}>

        {/* Topbar */}
        <div style={{background:c,borderBottom:'1px solid '+b,padding:'14px 20px',
          display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
          {isMobile && (
            <button onClick={()=>setSidebarOpen(true)}
              style={{background:'transparent',border:'1px solid '+b,borderRadius:8,
                padding:'6px 10px',cursor:'pointer',fontSize:18,color:t}}>
              ☰
            </button>
          )}
          <div style={{flex:1}}>
            <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>
              Good morning, {user?.name||'Mentor'} 👋
            </h1>
            <p style={{color:m,fontSize:11,margin:0}}>
              {PENDING.length} doubts pending · Saturday, 27 June
            </p>
          </div>
          <button onClick={()=>nav('/mentor-hub/doubts')}
            style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
              borderRadius:12,padding:'9px 18px',color:'#fff',fontWeight:700,
              fontSize:13,cursor:'pointer'}}>
            Answer Doubts →
          </button>
        </div>

        <div style={{padding:'20px',maxWidth:1000,margin:'0 auto'}}>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',
            gap:12,marginBottom:20}}>
            {STATS.map((s,i) => (
              <div key={i} style={{background:c,border:'1px solid '+b,
                borderRadius:16,padding:'18px',
                boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
                <div style={{width:40,height:40,borderRadius:12,
                  background:s.color+'15',display:'flex',alignItems:'center',
                  justifyContent:'center',fontSize:20,marginBottom:10}}>
                  {s.icon}
                </div>
                <p style={{color:t,fontWeight:800,fontSize:20,margin:'0 0 2px'}}>{s.val}</p>
                <p style={{color:m,fontSize:11,margin:0}}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>

            {/* Pending Doubts */}
            <div style={{background:c,border:'1px solid '+b,borderRadius:18,overflow:'hidden'}}>
              <div style={{padding:'14px 16px',borderBottom:'1px solid '+b,
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>
                  💬 Pending Doubts
                </p>
                <button onClick={()=>nav('/mentor-hub/doubts')}
                  style={{background:'transparent',border:'none',color:a,
                    fontSize:12,fontWeight:700,cursor:'pointer'}}>
                  View All →
                </button>
              </div>
              {PENDING.map((d,i) => (
                <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid '+b,
                  cursor:'pointer',transition:'background 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background=a+'08'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                  onClick={()=>nav('/mentor-hub/doubts')}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{color:t,fontWeight:600,fontSize:12}}>{d.student}</span>
                    <span style={{color:m,fontSize:10}}>{d.time}</span>
                  </div>
                  <p style={{color:m,fontSize:11,margin:'0 0 4px',lineHeight:1.4}}>{d.q}</p>
                  <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
                    padding:'2px 8px',borderRadius:20}}>{d.exam}</span>
                </div>
              ))}
            </div>

            {/* Active Students quick view */}
            <div style={{background:c,border:'1px solid '+b,borderRadius:18,overflow:'hidden'}}>
              <div style={{padding:'14px 16px',borderBottom:'1px solid '+b,
                display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>
                  👥 Active Students
                </p>
                <button onClick={()=>nav('/mentor-hub/students')}
                  style={{background:'transparent',border:'none',color:a,
                    fontSize:12,fontWeight:700,cursor:'pointer'}}>
                  View All →
                </button>
              </div>
              {STUDENTS.map((s,i) => (
                <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid '+b,
                  display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:32,height:32,borderRadius:'50%',flexShrink:0,
                    background:'linear-gradient(135deg,'+p+','+a+')',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontWeight:700,fontSize:12,color:'#fff'}}>
                    {s.name[0]}
                  </div>
                  <div style={{flex:1}}>
                    <p style={{color:t,fontWeight:600,fontSize:12,margin:'0 0 2px'}}>{s.name}</p>
                    <span style={{color:m,fontSize:10}}>{s.exam} · {s.plan}</span>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#FBBF24',fontSize:11,margin:'0 0 2px'}}>
                      {'★'.repeat(s.rating)}
                    </p>
                    <span style={{background:'#22C55E15',color:'#22C55E',
                      fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── AUDIO / VIDEO UPLOAD ── */}
          <div style={{background:c,border:'1px solid '+b,borderRadius:18,
            overflow:'hidden',marginBottom:20}}>

            {/* Tab header */}
            <div style={{padding:'14px 16px',borderBottom:'1px solid '+b,
              display:'flex',alignItems:'center',gap:0}}>
              {['audio','video'].map(tab => (
                <button key={tab} onClick={()=>setUploadTab(tab)}
                  style={{padding:'8px 20px',border:'none',cursor:'pointer',
                    fontFamily:'Poppins,sans-serif',fontWeight:700,fontSize:13,
                    borderRadius:10,transition:'all 0.2s',
                    background:uploadTab===tab?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                    color:uploadTab===tab?'#fff':m}}>
                  {tab === 'audio' ? '🎙️ Audio' : '🎬 Video'}
                  {tab === 'video' && (
                    <span style={{background:'#8B5CF6',color:'#fff',fontSize:8,
                      fontWeight:700,padding:'1px 6px',borderRadius:10,marginLeft:6}}>
                      Monthly only
                    </span>
                  )}
                </button>
              ))}
              <span style={{marginLeft:'auto',color:m,fontSize:11}}>
                {uploadTab === 'audio' ? 'Expires in 7 days' : 'Expires in 48 hours'}
              </span>
            </div>

            <div style={{padding:'20px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                <div>
                  <label style={{display:'block',color:t,fontWeight:700,
                    fontSize:12,marginBottom:6}}>
                    Title *
                  </label>
                  <input value={uploadTitle} onChange={e=>setUploadTitle(e.target.value)}
                    placeholder={uploadTab==='audio'?'e.g. Polity Chapter 5 — Federalism explained':'e.g. UPSC Essay technique — 15 min'}
                    style={{width:'100%',padding:'10px 12px',borderRadius:10,
                      border:'1.5px solid '+b,background:bg,color:t,
                      fontSize:13,outline:'none',fontFamily:'Poppins,sans-serif',
                      boxSizing:'border-box'}}/>
                </div>
                <div>
                  <label style={{display:'block',color:t,fontWeight:700,
                    fontSize:12,marginBottom:6}}>
                    Exam / Subject
                  </label>
                  <input value={uploadExam} onChange={e=>setUploadExam(e.target.value)}
                    placeholder="e.g. UPSC · Polity"
                    style={{width:'100%',padding:'10px 12px',borderRadius:10,
                      border:'1.5px solid '+b,background:bg,color:t,
                      fontSize:13,outline:'none',fontFamily:'Poppins,sans-serif',
                      boxSizing:'border-box'}}/>
                </div>
              </div>

              {/* File drop zone */}
              <div style={{border:'2px dashed '+(
                  (uploadTab==='audio'?audioFile:videoFile) ? a : b
                ),
                borderRadius:14,padding:'28px',textAlign:'center',
                background:(uploadTab==='audio'?audioFile:videoFile)?a+'06':bg,
                cursor:'pointer',transition:'all 0.2s',marginBottom:14}}
                onClick={()=>document.getElementById('file-upload-'+uploadTab).click()}>
                <input id={'file-upload-'+uploadTab} type="file"
                  accept={uploadTab==='audio'?'audio/*':'video/*'}
                  style={{display:'none'}}
                  onChange={e=>{
                    const f = e.target.files[0]
                    if (!f) return
                    uploadTab==='audio' ? setAudioFile(f) : setVideoFile(f)
                  }}/>
                <div style={{fontSize:36,marginBottom:8}}>
                  {uploadTab==='audio' ? '🎙️' : '🎬'}
                </div>
                {(uploadTab==='audio'?audioFile:videoFile) ? (
                  <div>
                    <p style={{color:a,fontWeight:700,fontSize:14,margin:'0 0 4px'}}>
                      {(uploadTab==='audio'?audioFile:videoFile).name}
                    </p>
                    <p style={{color:m,fontSize:11,margin:0}}>
                      {((uploadTab==='audio'?audioFile:videoFile).size/1024/1024).toFixed(1)} MB
                      {uploadTab==='video' && ' · Will be compressed before upload'}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{color:t,fontWeight:600,fontSize:14,margin:'0 0 4px'}}>
                      Tap to select {uploadTab} file
                    </p>
                    <p style={{color:m,fontSize:11,margin:0}}>
                      {uploadTab==='audio'
                        ? 'MP3, WAV, M4A · Max 50MB · Expires in 7 days'
                        : 'MP4, MOV · Max 200MB · Compressed automatically · Expires in 48hrs'}
                    </p>
                  </div>
                )}
              </div>

              {uploadTab === 'video' && (
                <div style={{background:'#8B5CF610',border:'1px solid #8B5CF630',
                  borderRadius:10,padding:'10px 14px',marginBottom:14}}>
                  <p style={{color:'#8B5CF6',fontWeight:700,fontSize:11,margin:'0 0 2px'}}>
                    📋 Video Rules
                  </p>
                  <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
                    Only sent to students on Monthly pass · Max 15 minutes ·
                    Auto-compressed to mobile quality · Deleted from server after 48 hours ·
                    Students must download before expiry
                  </p>
                </div>
              )}

              <button onClick={handleUpload}
                disabled={!(uploadTab==='audio'?audioFile:videoFile)||!uploadTitle.trim()||uploading}
                style={{width:'100%',
                  background:(!(uploadTab==='audio'?audioFile:videoFile)||!uploadTitle.trim())
                    ? b : 'linear-gradient(135deg,'+p+','+a+')',
                  border:'none',borderRadius:14,padding:'14px',
                  color:(!(uploadTab==='audio'?audioFile:videoFile)||!uploadTitle.trim())
                    ? m : '#fff',
                  fontWeight:800,fontSize:14,cursor:'pointer',
                  fontFamily:'Poppins,sans-serif',opacity:uploading?0.7:1}}>
                {uploading ? 'Uploading & compressing...' :
                  uploadTab==='audio' ? '🎙️ Upload Audio' : '🎬 Upload Video'}
              </button>
            </div>

            {/* Recent uploads */}
            {uploaded.length > 0 && (
              <div style={{borderTop:'1px solid '+b,padding:'14px 16px'}}>
                <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 10px'}}>
                  Recent Uploads
                </p>
                {uploaded.map((f,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,
                    padding:'10px 0',borderBottom: i<uploaded.length-1 ? '1px solid '+b : 'none'}}>
                    <span style={{fontSize:20}}>{f.type==='audio'?'🎙️':'🎬'}</span>
                    <div style={{flex:1}}>
                      <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 2px'}}>{f.title}</p>
                      <p style={{color:m,fontSize:10,margin:0}}>
                        {f.size} · Uploaded {f.uploadedAt} · Expires {f.expiresAt}
                      </p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <p style={{color:'#22C55E',fontSize:11,fontWeight:700,margin:'0 0 2px'}}>
                        {f.downloads} downloads
                      </p>
                      <span style={{background:'#22C55E15',color:'#22C55E',
                        fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Earnings summary */}
          <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
            borderRadius:18,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:11,fontWeight:700,
                  letterSpacing:'1px',margin:'0 0 4px'}}>EARNINGS THIS MONTH</p>
                <p style={{color:'#fff',fontWeight:900,fontSize:28,margin:'0 0 4px'}}>
                  ₹3,840
                </p>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:11,margin:0}}>
                  12 students × avg ₹320 · Payout after 30 days
                </p>
              </div>
              <button onClick={()=>nav('/mentor-hub/cashback')}
                style={{background:'linear-gradient(135deg,'+a+',#E8C44A)',
                  border:'none',borderRadius:12,padding:'10px 20px',
                  color:p,fontWeight:800,fontSize:13,cursor:'pointer'}}>
                View Earnings →
              </button>
            </div>
          </div>

          <div style={{height:40}}/>
        </div>
      </div>
    </div>
  )
}
""")

# ============================================================
# 2. MENTOR STUDENTS PAGE — Individual student data, NOT student dashboard
# ============================================================
w('src/pages/mentor/MentorStudents.jsx', """// src/pages/mentor/MentorStudents.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const STUDENTS = [
  {
    id:1, name:'Priya R.', exam:'UPSC CSE', plan:'Monthly', planAmt:'₹699',
    city:'Chennai', joined:'Jun 1, 2026', status:'active',
    doubtsAsked:8, doubtsAnswered:7, lastActive:'Today',
    tests:[
      {name:'Polity Mock 1', score:72, date:'Jun 5'},
      {name:'Polity Mock 2', score:78, date:'Jun 12'},
      {name:'History Test',  score:65, date:'Jun 18'},
      {name:'Polity Mock 3', score:84, date:'Jun 24'},
    ],
    weakTopics:['Federalism','Constitutional Amendments','DPSP'],
    strongTopics:['Fundamental Rights','Parliament','President'],
    improvement:'+12% from Jun 1',
    rating:5,
  },
  {
    id:2, name:'Karthik M.', exam:'SSC CGL', plan:'Weekly', planAmt:'₹149',
    city:'Coimbatore', joined:'Jun 10, 2026', status:'active',
    doubtsAsked:4, doubtsAnswered:4, lastActive:'Yesterday',
    tests:[
      {name:'Maths Speed Test', score:58, date:'Jun 12'},
      {name:'Reasoning Test',   score:71, date:'Jun 19'},
    ],
    weakTopics:['Time & Work','Percentage','Profit & Loss'],
    strongTopics:['Geometry','Number System'],
    improvement:'+13% from Jun 10',
    rating:4,
  },
  {
    id:3, name:'Anjali S.', exam:'TNPSC Group 1', plan:'Monthly', planAmt:'₹349',
    city:'Madurai', joined:'May 15, 2026', status:'active',
    doubtsAsked:12, doubtsAnswered:11, lastActive:'2 hours ago',
    tests:[
      {name:'Tamil History', score:81, date:'May 20'},
      {name:'Polity Mock 1', score:74, date:'Jun 1'},
      {name:'Polity Mock 2', score:79, date:'Jun 15'},
      {name:'Current Affairs', score:88, date:'Jun 22'},
    ],
    weakTopics:['Ancient Tamil History','Local Governance'],
    strongTopics:['Current Affairs','Science & Tech','Geography'],
    improvement:'+7% from May 15',
    rating:5,
  },
  {
    id:4, name:'Rahul V.', exam:'IBPS PO', plan:'Weekly', planAmt:'₹149',
    city:'Hyderabad', joined:'Jun 20, 2026', status:'active',
    doubtsAsked:2, doubtsAnswered:2, lastActive:'3 days ago',
    tests:[
      {name:'Banking Awareness', score:61, date:'Jun 22'},
    ],
    weakTopics:['CRR / SLR','Monetary Policy','Banking History'],
    strongTopics:['English','Reasoning'],
    improvement:'New student',
    rating:4,
  },
]

export default function MentorStudents() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('All')

  const filtered = STUDENTS.filter(s =>
    filter === 'All' ||
    (filter === 'Monthly' && s.plan === 'Monthly') ||
    (filter === 'Weekly' && s.plan === 'Weekly')
  )

  const avgScore = (tests) => {
    if (!tests.length) return 0
    return Math.round(tests.reduce((s,t)=>s+t.score,0)/tests.length)
  }

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>👥 My Students</h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            {STUDENTS.length} active · Click any student to view their progress
          </p>
        </div>
        <div style={{display:'flex',gap:6}}>
          {['All','Monthly','Weekly'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'6px 14px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:11,fontWeight:700,
                background:filter===f?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:filter===f?'#fff':m}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Summary stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',
          gap:10,marginBottom:20}}>
          {[
            {l:'Total Students', v:STUDENTS.length, e:'👥'},
            {l:'Monthly Pass',   v:STUDENTS.filter(s=>s.plan==='Monthly').length, e:'📅'},
            {l:'Weekly Pass',    v:STUDENTS.filter(s=>s.plan==='Weekly').length,  e:'🗓️'},
            {l:'Doubts Solved',  v:STUDENTS.reduce((s,x)=>s+x.doubtsAnswered,0), e:'💬'},
          ].map((s,i) => (
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:18,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Student cards */}
        {filtered.map(student => (
          <div key={student.id}
            style={{background:c,border:'1.5px solid '+(expanded===student.id?a:b),
              borderRadius:18,marginBottom:12,overflow:'hidden',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)',transition:'all 0.2s'}}>

            {/* Student row — click to expand */}
            <div style={{padding:'16px',display:'flex',alignItems:'center',
              gap:12,cursor:'pointer'}}
              onClick={()=>setExpanded(expanded===student.id?null:student.id)}>

              <div style={{width:44,height:44,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,'+p+','+a+')',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:800,fontSize:18,color:'#fff'}}>
                {student.name[0]}
              </div>

              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                  <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>{student.name}</p>
                  <span style={{background:student.plan==='Monthly'?'#8B5CF615':'#3B82F615',
                    color:student.plan==='Monthly'?'#8B5CF6':'#3B82F6',
                    fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                    {student.plan} {student.planAmt}
                  </span>
                </div>
                <div style={{display:'flex',gap:12}}>
                  <span style={{color:m,fontSize:11}}>{student.exam}</span>
                  <span style={{color:m,fontSize:11}}>📍 {student.city}</span>
                  <span style={{color:m,fontSize:11}}>🕐 {student.lastActive}</span>
                </div>
              </div>

              <div style={{textAlign:'right',flexShrink:0}}>
                <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 2px'}}>
                  {avgScore(student.tests) > 0 ? avgScore(student.tests)+'%' : 'No tests'}
                </p>
                <p style={{color:'#22C55E',fontSize:10,margin:'0 0 4px',fontWeight:600}}>
                  {student.improvement}
                </p>
                <span style={{color:m,fontSize:14}}>
                  {expanded===student.id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Expanded individual data */}
            {expanded === student.id && (
              <div style={{borderTop:'1px solid '+b,padding:'16px',
                background:bg}}>

                {/* Test scores chart */}
                <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 10px'}}>
                  📊 Test Performance
                </p>
                {student.tests.length > 0 ? (
                  <div style={{marginBottom:16}}>
                    {student.tests.map((test,i) => (
                      <div key={i} style={{marginBottom:8}}>
                        <div style={{display:'flex',justifyContent:'space-between',
                          marginBottom:4}}>
                          <span style={{color:t,fontSize:12,fontWeight:600}}>
                            {test.name}
                          </span>
                          <span style={{color: test.score>=75?'#22C55E':
                            test.score>=60?'#F59E0B':'#EF4444',
                            fontWeight:700,fontSize:12}}>
                            {test.score}%
                          </span>
                        </div>
                        <div style={{height:8,background:b,borderRadius:4,overflow:'hidden'}}>
                          <div style={{height:'100%',borderRadius:4,
                            width:test.score+'%',
                            background: test.score>=75
                              ?'linear-gradient(90deg,#22C55E,#4ADE80)'
                              :test.score>=60
                              ?'linear-gradient(90deg,#F59E0B,#FCD34D)'
                              :'linear-gradient(90deg,#EF4444,#FCA5A5)',
                            transition:'width 1s ease'}}/>
                        </div>
                        <span style={{color:m,fontSize:10}}>{test.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{color:m,fontSize:12,marginBottom:16}}>No tests taken yet</p>
                )}

                {/* Weak / Strong topics */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
                  <div style={{background:'#EF444408',border:'1px solid #EF444420',
                    borderRadius:12,padding:'12px'}}>
                    <p style={{color:'#EF4444',fontWeight:700,fontSize:11,
                      margin:'0 0 8px'}}>⚠️ Weak Topics</p>
                    {student.weakTopics.map((topic,i) => (
                      <div key={i} style={{background:'#EF444415',borderRadius:6,
                        padding:'4px 8px',marginBottom:4,
                        color:'#EF4444',fontSize:11,fontWeight:600}}>
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div style={{background:'#22C55E08',border:'1px solid #22C55E20',
                    borderRadius:12,padding:'12px'}}>
                    <p style={{color:'#22C55E',fontWeight:700,fontSize:11,
                      margin:'0 0 8px'}}>✅ Strong Topics</p>
                    {student.strongTopics.map((topic,i) => (
                      <div key={i} style={{background:'#22C55E15',borderRadius:6,
                        padding:'4px 8px',marginBottom:4,
                        color:'#22C55E',fontSize:11,fontWeight:600}}>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doubt stats */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
                  gap:8,marginBottom:14}}>
                  {[
                    {l:'Doubts Asked',    v:student.doubtsAsked},
                    {l:'Doubts Answered', v:student.doubtsAnswered},
                    {l:'Response Rate',   v:Math.round(student.doubtsAnswered/Math.max(student.doubtsAsked,1)*100)+'%'},
                  ].map((s,i) => (
                    <div key={i} style={{background:c,border:'1px solid '+b,
                      borderRadius:10,padding:'10px',textAlign:'center'}}>
                      <p style={{color:t,fontWeight:800,fontSize:15,margin:'0 0 2px'}}>{s.v}</p>
                      <p style={{color:m,fontSize:9,margin:0}}>{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>nav('/mentor-hub/doubts')}
                    style={{flex:1,background:'linear-gradient(135deg,'+p+','+a+')',
                      border:'none',borderRadius:12,padding:'10px',
                      color:'#fff',fontWeight:700,fontSize:12,cursor:'pointer'}}>
                    Answer Doubts
                  </button>
                  <button onClick={()=>nav('/mentor-hub/materials')}
                    style={{flex:1,background:'transparent',border:'1px solid '+b,
                      borderRadius:12,padding:'10px',
                      color:t,fontWeight:700,fontSize:12,cursor:'pointer'}}>
                    Send Assignment
                  </button>
                  <button style={{flex:1,background:'transparent',border:'1px solid '+b,
                    borderRadius:12,padding:'10px',
                    color:t,fontWeight:700,fontSize:12,cursor:'pointer'}}>
                    Share Report
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 3. Fix CouponManager — remove AppLayout, make standalone
# ============================================================
w('src/pages/mentor/CouponManager.jsx', """// src/pages/mentor/CouponManager.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const COUPONS = [
  {code:'PRIYA20',discount:20,used:3,maxUse:10,earned:'₹180',status:'active'},
  {code:'KASHI15',discount:15,used:7,maxUse:20,earned:'₹315',status:'active'},
  {code:'TNPSC10',discount:10,used:12,maxUse:12,earned:'₹360',status:'exhausted'},
]

export default function CouponManager() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const [code, setCode] = useState('')
  const [disc, setDisc] = useState('10')
  const [maxUse, setMaxUse] = useState('10')

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>🎟️ Coupon Manager</h1>
      </div>
      <div style={{padding:'20px',maxWidth:600,margin:'0 auto'}}>
        <div style={{background:a+'12',border:'1px solid '+a+'30',
          borderRadius:14,padding:'14px 16px',marginBottom:20}}>
          <p style={{color:a,fontWeight:700,fontSize:12,margin:'0 0 4px'}}>
            💡 How coupons earn you cashback
          </p>
          <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
            When a student uses your coupon code to buy Pro or Ultra,
            you earn that discount % as cashback. Example: 20% coupon on
            ₹999 Pro = ₹200 cashback to you after 30 days.
          </p>
        </div>
        <div style={{background:c,border:'1px solid '+b,borderRadius:16,padding:'18px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 14px'}}>
            Create New Coupon
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:12}}>
            {[
              {label:'Coupon Code',val:code,set:setCode,ph:'e.g. PRIYA20'},
              {label:'Discount %',val:disc,set:setDisc,ph:'10'},
              {label:'Max Uses',val:maxUse,set:setMaxUse,ph:'10'},
            ].map((f,i)=>(
              <div key={i}>
                <label style={{display:'block',color:t,fontWeight:700,
                  fontSize:11,marginBottom:6}}>{f.label}</label>
                <input value={f.val} onChange={e=>f.set(e.target.value)}
                  placeholder={f.ph}
                  style={{width:'100%',padding:'9px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',boxSizing:'border-box'}}/>
              </div>
            ))}
          </div>
          <button style={{width:'100%',background:'linear-gradient(135deg,'+p+','+a+')',
            border:'none',borderRadius:12,padding:'12px',color:'#fff',
            fontWeight:700,fontSize:13,cursor:'pointer'}}>
            Create Coupon
          </button>
        </div>
        <p style={{color:t,fontWeight:700,fontSize:14,marginBottom:10}}>My Coupons</p>
        {COUPONS.map((coup,i)=>(
          <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
            padding:'14px 16px',marginBottom:8,display:'flex',alignItems:'center',gap:12}}>
            <div style={{background:p+'10',borderRadius:10,padding:'8px 14px'}}>
              <p style={{color:p,fontWeight:800,fontSize:14,margin:0}}>{coup.code}</p>
            </div>
            <div style={{flex:1}}>
              <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 2px'}}>
                {coup.discount}% off · Used {coup.used}/{coup.maxUse}
              </p>
              <p style={{color:'#22C55E',fontSize:11,margin:0,fontWeight:600}}>
                Earned: {coup.earned}
              </p>
            </div>
            <span style={{background:coup.status==='active'?'#22C55E15':'#64748B15',
              color:coup.status==='active'?'#22C55E':'#64748B',
              fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20}}>
              {coup.status==='active'?'Active':'Exhausted'}
            </span>
          </div>
        ))}
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 4. MentorAnalytics — standalone
# ============================================================
w('src/pages/mentor/MentorAnalytics.jsx', """// src/pages/mentor/MentorAnalytics.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function MentorAnalytics() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const METRICS = [
    {label:'Avg Response Time', val:'42 min', target:'< 60 min', ok:true, icon:'⚡'},
    {label:'Answer Quality Score', val:'87%', target:'> 80%', ok:true, icon:'⭐'},
    {label:'Student Retention', val:'91%', target:'> 85%', ok:true, icon:'🔄'},
    {label:'Doubt Resolution Rate', val:'94%', target:'> 90%', ok:true, icon:'✅'},
    {label:'Avg Rating', val:'4.8 / 5', target:'> 4.5', ok:true, icon:'🏆'},
    {label:'Monthly Active Students', val:'12', target:'Growing', ok:true, icon:'👥'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>📊 My Analytics</h1>
      </div>
      <div style={{padding:'20px',maxWidth:700,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
          {METRICS.map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:16,
              padding:'16px',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
              <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
              <p style={{color:t,fontWeight:800,fontSize:16,margin:'0 0 2px'}}>{s.val}</p>
              <p style={{color:m,fontSize:11,margin:'0 0 6px'}}>{s.label}</p>
              <span style={{background:s.ok?'#22C55E15':'#EF444415',
                color:s.ok?'#22C55E':'#EF4444',
                fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
                Target: {s.target}
              </span>
            </div>
          ))}
        </div>
        <div style={{background:'linear-gradient(135deg,'+p+','+p+'cc)',
          borderRadius:18,padding:'20px',textAlign:'center'}}>
          <p style={{color:a,fontWeight:700,fontSize:11,letterSpacing:'1px',margin:'0 0 6px'}}>
            YOUR MENTOR SCORE
          </p>
          <p style={{color:'#fff',fontWeight:900,fontSize:48,margin:'0 0 4px'}}>91</p>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,margin:0}}>
            Top 8% of all mentors on TryIT
          </p>
        </div>
        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 5. Add MentorStudents route to App.jsx
# ============================================================
try:
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        app = f.read()
    if 'MentorStudents' not in app:
        app = app.replace(
            "const MentorHub",
            "const MentorStudents = lazy(() => import('./pages/mentor/MentorStudents'))\nconst MentorHub"
        )
        app = app.replace(
            "<Route path='/mentor-hub/doubts'",
            "<Route path='/mentor-hub/students' element={<MentorStudents/>}/>\n            <Route path='/mentor-hub/doubts'"
        )
        with open('src/App.jsx', 'w', encoding='utf-8') as f:
            f.write(app)
        print('OK App.jsx MentorStudents route added')
    else:
        print('SKIP MentorStudents already in App.jsx')
except Exception as e:
    print('ERROR App.jsx:', e)

print('')
print('ALL DONE! Run: npm run build 2>&1 | Select-Object -Last 3')
