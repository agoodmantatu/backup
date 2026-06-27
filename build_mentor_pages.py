import os

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

# ============================================================
# 1. MentorMaterials — Upload + Book Marketplace + Social Share
# ============================================================
w('src/pages/mentor/MentorMaterials.jsx', """// src/pages/mentor/MentorMaterials.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const MATERIALS = [
  {id:1,title:'UPSC Polity Master Notes 2026',type:'pdf',price:0,isFree:true,
   exam:'UPSC',subject:'Polity',downloads:234,rating:4.8,revenue:0,
   desc:'Complete Polity notes covering Constitution, Amendments, Bodies. 120 pages.'},
  {id:2,title:'SSC CGL Maths Shortcut Bible',type:'pdf',price:149,isFree:false,
   exam:'SSC CGL',subject:'Maths',downloads:89,rating:4.9,revenue:13261,
   desc:'60 shortcut techniques for Time-Work, Percentages, Profit-Loss. Exam-ready.'},
  {id:3,title:'TNPSC Tamil History Audio Series',type:'audio',price:0,isFree:true,
   exam:'TNPSC',subject:'History',downloads:156,rating:4.7,revenue:0,
   desc:'5 audio episodes covering Ancient Tamil kingdoms, Sangam age, Chola empire.'},
]

const BOOKS = [
  {id:4,title:'Zero to UPSC — The 12-Month Blueprint',type:'book',price:299,
   exam:'UPSC',pages:280,sold:42,rating:4.9,revenue:10626,
   desc:'Step-by-step 12-month UPSC preparation strategy with daily schedules, topic weightage and model answers.'},
  {id:5,title:'SSC CGL Complete Crash Course',type:'book',price:199,
   exam:'SSC CGL',pages:160,sold:31,rating:4.8,revenue:4907,
   desc:'All 4 tiers covered. Previous year analysis, topic-wise questions, full mock tests.'},
]

const SHARE_PLATFORMS = [
  {name:'WhatsApp', icon:'💬', color:'#25D366'},
  {name:'Twitter',  icon:'🐦', color:'#1DA1F2'},
  {name:'Telegram', icon:'✈️', color:'#0088CC'},
  {name:'Copy Link',icon:'🔗', color:'#64748B'},
]

export default function MentorMaterials() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [tab, setTab] = useState('materials')
  const [shareItem, setShareItem] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title:'', type:'pdf', price:'0', isFree:true, exam:'', subject:'', desc:''
  })

  const totalRevenue = [...MATERIALS,...BOOKS].reduce((s,x)=>s+x.revenue,0)
  const totalDownloads = MATERIALS.reduce((s,x)=>s+x.downloads,0)
  const totalSold = BOOKS.reduce((s,x)=>s+x.sold,0)

  const ShareModal = ({item}) => (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:999,
      display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={()=>setShareItem(null)}>
      <div style={{background:c,borderRadius:20,padding:24,width:'100%',maxWidth:360,
        boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}
        onClick={e=>e.stopPropagation()}>
        <p style={{color:t,fontWeight:800,fontSize:16,margin:'0 0 4px'}}>
          Share Material
        </p>
        <p style={{color:m,fontSize:12,margin:'0 0 16px'}}>{item.title}</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
          {SHARE_PLATFORMS.map((pl,i)=>(
            <button key={i}
              style={{background:pl.color+'15',border:'1.5px solid '+pl.color+'30',
                borderRadius:14,padding:'12px',display:'flex',alignItems:'center',
                gap:8,cursor:'pointer',fontFamily:'Poppins,sans-serif'}}
              onClick={()=>{
                if(pl.name==='Copy Link'){
                  navigator.clipboard.writeText('https://tryiteducations.net/material/'+item.id)
                }
                setShareItem(null)
              }}>
              <span style={{fontSize:20}}>{pl.icon}</span>
              <span style={{color:t,fontWeight:600,fontSize:12}}>{pl.name}</span>
            </button>
          ))}
        </div>
        <div style={{background:bg,borderRadius:10,padding:'10px 14px',
          border:'1px solid '+b,marginBottom:12}}>
          <p style={{color:m,fontSize:10,margin:'0 0 4px'}}>Share link:</p>
          <p style={{color:t,fontSize:11,fontWeight:600,margin:0,wordBreak:'break-all'}}>
            https://tryiteducations.net/material/{item.id}
          </p>
        </div>
        <button onClick={()=>setShareItem(null)}
          style={{width:'100%',background:'transparent',border:'1px solid '+b,
            borderRadius:12,padding:'10px',color:m,fontWeight:600,
            fontSize:13,cursor:'pointer'}}>
          Close
        </button>
      </div>
    </div>
  )

  const MaterialCard = ({item}) => (
    <div style={{background:c,border:'1px solid '+b,borderRadius:18,
      padding:'18px',marginBottom:12,
      boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
      <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
        <div style={{width:48,height:60,borderRadius:10,flexShrink:0,
          background:'linear-gradient(135deg,'+p+','+a+')',
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
          {item.type==='pdf'?'📄':item.type==='audio'?'🎙️':item.type==='video'?'🎬':'📗'}
        </div>
        <div style={{flex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
            <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>{item.title}</p>
            {item.isFree
              ? <span style={{background:'#22C55E15',color:'#22C55E',fontSize:9,
                  fontWeight:700,padding:'2px 8px',borderRadius:20}}>FREE</span>
              : <span style={{color:a,fontWeight:800,fontSize:14}}>₹{item.price}</span>
            }
          </div>
          <p style={{color:m,fontSize:11,margin:'0 0 8px',lineHeight:1.5}}>{item.desc}</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
            <span style={{background:p+'10',color:p,fontSize:9,fontWeight:700,
              padding:'2px 8px',borderRadius:20}}>{item.exam}</span>
            <span style={{background:a+'15',color:a,fontSize:9,fontWeight:700,
              padding:'2px 8px',borderRadius:20}}>{item.subject}</span>
            <span style={{color:m,fontSize:10}}>
              ★ {item.rating} · {item.downloads} downloads
            </span>
            {item.revenue > 0 && (
              <span style={{color:'#22C55E',fontWeight:700,fontSize:10}}>
                ₹{item.revenue.toLocaleString('en-IN')} earned
              </span>
            )}
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setShareItem(item)}
              style={{background:a+'15',border:'1px solid '+a+'30',borderRadius:10,
                padding:'6px 14px',color:a,fontWeight:700,fontSize:12,cursor:'pointer',
                display:'flex',alignItems:'center',gap:4}}>
              📤 Share
            </button>
            <button style={{background:'transparent',border:'1px solid '+b,
              borderRadius:10,padding:'6px 14px',color:m,fontWeight:600,
              fontSize:12,cursor:'pointer'}}>
              Edit
            </button>
            <button style={{background:'transparent',border:'1px solid #EF444430',
              borderRadius:10,padding:'6px 14px',color:'#EF4444',fontWeight:600,
              fontSize:12,cursor:'pointer'}}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const BookCard = ({item}) => (
    <div style={{background:c,border:'1px solid '+b,borderRadius:18,
      padding:'18px',marginBottom:12,
      boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
      <div style={{display:'flex',gap:14}}>
        <div style={{width:56,height:72,borderRadius:8,flexShrink:0,
          background:'linear-gradient(160deg,'+p+','+a+')',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:24,boxShadow:'2px 4px 12px rgba(0,0,0,0.2)'}}>
          📗
        </div>
        <div style={{flex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>{item.title}</p>
            <p style={{color:a,fontWeight:900,fontSize:16,margin:0}}>₹{item.price}</p>
          </div>
          <p style={{color:m,fontSize:11,margin:'0 0 8px',lineHeight:1.5}}>{item.desc}</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:10}}>
            <span style={{background:p+'10',color:p,fontSize:9,fontWeight:700,
              padding:'2px 8px',borderRadius:20}}>{item.exam}</span>
            <span style={{color:m,fontSize:10}}>📄 {item.pages} pages</span>
            <span style={{color:m,fontSize:10}}>★ {item.rating}</span>
            <span style={{color:'#22C55E',fontSize:10,fontWeight:700}}>
              {item.sold} sold
            </span>
          </div>
          <div style={{background:'#22C55E08',border:'1px solid #22C55E20',
            borderRadius:10,padding:'8px 12px',marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span style={{color:m,fontSize:11}}>Total Revenue</span>
              <span style={{color:'#22C55E',fontWeight:700,fontSize:13}}>
                ₹{item.revenue.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
              <span style={{color:m,fontSize:10}}>Your share (85%)</span>
              <span style={{color:t,fontWeight:600,fontSize:12}}>
                ₹{Math.round(item.revenue*0.85).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setShareItem(item)}
              style={{background:a+'15',border:'1px solid '+a+'30',borderRadius:10,
                padding:'6px 14px',color:a,fontWeight:700,fontSize:12,cursor:'pointer'}}>
              📤 Share & Sell
            </button>
            <button style={{background:'transparent',border:'1px solid '+b,
              borderRadius:10,padding:'6px 14px',color:m,fontWeight:600,
              fontSize:12,cursor:'pointer'}}>
              Edit Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      {shareItem && <ShareModal item={shareItem}/>}

      {/* Header */}
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>
            📁 Materials & Books
          </h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            Upload · Sell · Share · Track revenue
          </p>
        </div>
        <button onClick={()=>setShowUpload(!showUpload)}
          style={{background:'linear-gradient(135deg,'+p+','+a+')',border:'none',
            borderRadius:12,padding:'9px 18px',color:'#fff',
            fontWeight:700,fontSize:13,cursor:'pointer'}}>
          + Upload
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Revenue summary */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',
          gap:10,marginBottom:20}}>
          {[
            {l:'Total Revenue',     v:'₹'+totalRevenue.toLocaleString('en-IN'), e:'💰', c:'#22C55E'},
            {l:'Your Share (85%)',  v:'₹'+Math.round(totalRevenue*0.85).toLocaleString('en-IN'), e:'🏆', c:a},
            {l:'Free Downloads',   v:totalDownloads, e:'📥', c:'#3B82F6'},
            {l:'Books Sold',       v:totalSold, e:'📗', c:'#8B5CF6'},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:15,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* IP notice */}
        <div style={{background:p+'08',border:'1px solid '+p+'20',
          borderRadius:12,padding:'12px 16px',marginBottom:16}}>
          <p style={{color:p,fontWeight:700,fontSize:11,margin:'0 0 2px'}}>
            📋 IP Rights Notice
          </p>
          <p style={{color:m,fontSize:11,margin:0,lineHeight:1.6}}>
            All materials uploaded to TryIT are assigned to TryIT Educations permanently.
            They may be used in tests, quizzes, and course content even after you leave
            the platform. Materials will never be sold to third parties.
          </p>
        </div>

        {/* Upload form */}
        {showUpload && (
          <div style={{background:c,border:'1.5px solid '+a,borderRadius:18,
            padding:'20px',marginBottom:20}}>
            <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 14px'}}>
              New Upload
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:11,marginBottom:6}}>
                  Title *
                </label>
                <input value={uploadForm.title}
                  onChange={e=>setUploadForm({...uploadForm,title:e.target.value})}
                  placeholder="e.g. UPSC Polity Notes 2026"
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:11,marginBottom:6}}>
                  Type
                </label>
                <select value={uploadForm.type}
                  onChange={e=>setUploadForm({...uploadForm,type:e.target.value})}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',cursor:'pointer'}}>
                  {['pdf','audio','video','book'].map(t=>(
                    <option key={t} value={t}>
                      {t==='pdf'?'📄 PDF Notes':t==='audio'?'🎙️ Audio':
                       t==='video'?'🎬 Video':'📗 Book / Course'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:11,marginBottom:6}}>
                  Exam
                </label>
                <input value={uploadForm.exam}
                  onChange={e=>setUploadForm({...uploadForm,exam:e.target.value})}
                  placeholder="e.g. UPSC, SSC CGL, TNPSC"
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:11,marginBottom:6}}>
                  Price (₹) — 0 for free
                </label>
                <input value={uploadForm.price} type="number" min="0"
                  onChange={e=>setUploadForm({...uploadForm,
                    price:e.target.value,
                    isFree:parseInt(e.target.value)===0})}
                  style={{width:'100%',padding:'10px 12px',borderRadius:10,
                    border:'1.5px solid '+b,background:bg,color:t,
                    fontSize:13,outline:'none',boxSizing:'border-box'}}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:11,marginBottom:6}}>
                Description
              </label>
              <textarea value={uploadForm.desc}
                onChange={e=>setUploadForm({...uploadForm,desc:e.target.value})}
                placeholder="Describe what this material covers, who it's for, and what students will gain..."
                rows={3}
                style={{width:'100%',padding:'10px 12px',borderRadius:10,
                  border:'1.5px solid '+b,background:bg,color:t,
                  fontSize:13,outline:'none',resize:'vertical',
                  fontFamily:'Poppins,sans-serif',boxSizing:'border-box'}}/>
            </div>
            <div style={{border:'2px dashed '+b,borderRadius:12,padding:'20px',
              textAlign:'center',cursor:'pointer',marginBottom:12,background:bg}}>
              <div style={{fontSize:28,marginBottom:6}}>📁</div>
              <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 4px'}}>
                Click to select file
              </p>
              <p style={{color:m,fontSize:11,margin:0}}>
                PDF · MP3 · MP4 · Max 200MB
              </p>
            </div>
            {parseInt(uploadForm.price) > 0 && (
              <div style={{background:'#22C55E08',border:'1px solid #22C55E20',
                borderRadius:10,padding:'10px 14px',marginBottom:12}}>
                <p style={{color:'#22C55E',fontWeight:700,fontSize:11,margin:'0 0 2px'}}>
                  Revenue Preview
                </p>
                <p style={{color:m,fontSize:11,margin:0}}>
                  Student pays ₹{uploadForm.price} →
                  TryIT takes 15% (₹{Math.round(parseInt(uploadForm.price||0)*0.15)}) →
                  You earn ₹{Math.round(parseInt(uploadForm.price||0)*0.85)} per sale
                </p>
              </div>
            )}
            <div style={{display:'flex',gap:8}}>
              <button style={{flex:1,background:'linear-gradient(135deg,'+p+','+a+')',
                border:'none',borderRadius:12,padding:'12px',color:'#fff',
                fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Upload & Publish
              </button>
              <button onClick={()=>setShowUpload(false)}
                style={{background:'transparent',border:'1px solid '+b,
                  borderRadius:12,padding:'12px 20px',color:m,fontWeight:600,
                  fontSize:13,cursor:'pointer'}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tab selector */}
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          {['materials','books'].map(tab2=>(
            <button key={tab2} onClick={()=>setTab(tab2)}
              style={{padding:'8px 20px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:13,fontWeight:700,transition:'all 0.2s',
                background:tab===tab2?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:tab===tab2?'#fff':m}}>
              {tab2==='materials'?'📄 Study Materials':'📗 Books & Courses'}
            </button>
          ))}
        </div>

        {tab === 'materials'
          ? MATERIALS.map(item=><MaterialCard key={item.id} item={item}/>)
          : BOOKS.map(item=><BookCard key={item.id} item={item}/>)
        }

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 2. MentorSettings — Profile pic, theme switcher, availability
# ============================================================
w('src/pages/mentor/MentorSettings.jsx', """// src/pages/mentor/MentorSettings.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const MENTOR_THEMES = [
  {id:'mentor-pearl',        name:'Pearl Classic',   emoji:'🎓', isDark:false, preview:'#1E3A5F'},
  {id:'mentor-kashi-dawn',   name:'Kashi Dawn',      emoji:'🏛️', isDark:false, preview:'#92400E'},
  {id:'mentor-nilgiri-mist', name:'Nilgiri Mist',    emoji:'🌿', isDark:false, preview:'#065F46'},
  {id:'mentor-himalayan',    name:'Himalayan Snow',  emoji:'🏔️', isDark:false, preview:'#1E40AF'},
  {id:'mentor-vedic',        name:'Vedic Scroll',    emoji:'📜', isDark:false, preview:'#78350F'},
  {id:'mentor-navy-command', name:'Navy Command',    emoji:'⚓', isDark:true,  preview:'#C9A84C'},
  {id:'mentor-midnight',     name:'Midnight Indigo', emoji:'🌌', isDark:true,  preview:'#818CF8'},
  {id:'mentor-graphite',     name:'Graphite Pro',    emoji:'⚙️', isDark:true,  preview:'#60A5FA'},
  {id:'mentor-teak',         name:'Teak Forest',     emoji:'🌳', isDark:true,  preview:'#34D399'},
  {id:'mentor-obsidian',     name:'Obsidian Gold',   emoji:'✨', isDark:true,  preview:'#D97706'},
]

const EXAMS = ['UPSC CSE','SSC CGL','IBPS PO','TNPSC Group 1','RRB NTPC',
  'NEET UG','JEE Main','GATE','NDA','CDS','State PSC','School (1-10)','College']
const LANGS = ['Tamil','Hindi','English','Telugu','Malayalam','Kannada',
  'Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese']

export default function MentorSettings() {
  const nav = useNavigate()
  const { user } = useAuth()
  const { theme, setActiveTheme, applyTheme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [name, setName] = useState(user?.name||'')
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [state, setState2] = useState('')
  const [selectedExams, setSelectedExams] = useState([])
  const [selectedLangs, setSelectedLangs] = useState([])
  const [avatar, setAvatar] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [saved, setSaved] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatar(file)
    setAvatarUrl(URL.createObjectURL(file))
  }

  const toggleExam = (exam) => {
    setSelectedExams(prev =>
      prev.includes(exam) ? prev.filter(e=>e!==exam) : [...prev, exam]
    )
  }

  const toggleLang = (lang) => {
    setSelectedLangs(prev =>
      prev.includes(lang) ? prev.filter(l=>l!==lang) : [...prev, lang]
    )
  }

  const save = async () => {
    setSaved(true)
    await new Promise(r=>setTimeout(r,1000))
    setSaved(false)
  }

  const inp = {
    width:'100%', padding:'11px 14px', borderRadius:12,
    border:'1.5px solid '+b, background:bg, color:t,
    fontSize:14, outline:'none', fontFamily:'Poppins,sans-serif',
    boxSizing:'border-box'
  }

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>
          ⚙️ Settings & Profile
        </h1>
        <button onClick={save}
          style={{marginLeft:'auto',
            background:saved?'#22C55E':'linear-gradient(135deg,'+p+','+a+')',
            border:'none',borderRadius:12,padding:'9px 20px',
            color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
          {saved?'✓ Saved':'Save Changes'}
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:640,margin:'0 auto'}}>

        {/* Profile picture */}
        <div style={{background:c,border:'1px solid '+b,borderRadius:18,
          padding:'20px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 16px'}}>
            Profile Picture
          </p>
          <div style={{display:'flex',alignItems:'center',gap:20}}>
            <div style={{position:'relative'}}>
              <div style={{width:80,height:80,borderRadius:'50%',
                background:'linear-gradient(135deg,'+p+','+a+')',
                backgroundImage:avatarUrl?'url('+avatarUrl+')':'',
                backgroundSize:'cover',backgroundPosition:'center',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:800,fontSize:28,color:'#fff',
                border:'3px solid '+a,cursor:'pointer'}}
                onClick={()=>document.getElementById('avatar-upload').click()}>
                {!avatarUrl && (name?.[0]||'M')}
              </div>
              <div style={{position:'absolute',bottom:0,right:0,
                width:24,height:24,borderRadius:'50%',
                background:a,display:'flex',alignItems:'center',
                justifyContent:'center',fontSize:12,cursor:'pointer',
                border:'2px solid '+c}}
                onClick={()=>document.getElementById('avatar-upload').click()}>
                📷
              </div>
            </div>
            <input id="avatar-upload" type="file" accept="image/*"
              style={{display:'none'}} onChange={handleAvatarChange}/>
            <div>
              <p style={{color:t,fontWeight:600,fontSize:13,margin:'0 0 4px'}}>
                {name || 'Your Name'}
              </p>
              <p style={{color:m,fontSize:11,margin:'0 0 8px'}}>
                Click the photo to change it
              </p>
              <button onClick={()=>document.getElementById('avatar-upload').click()}
                style={{background:a+'15',border:'1px solid '+a+'30',
                  borderRadius:10,padding:'6px 14px',color:a,
                  fontWeight:700,fontSize:12,cursor:'pointer'}}>
                Upload Photo
              </button>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div style={{background:c,border:'1px solid '+b,borderRadius:18,
          padding:'20px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 14px'}}>
            Basic Information
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                Display Name
              </label>
              <input value={name} onChange={e=>setName(e.target.value)}
                placeholder="Your full name" style={inp}/>
            </div>
            <div>
              <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                Bio
              </label>
              <textarea value={bio} onChange={e=>setBio(e.target.value)}
                placeholder="Tell students about your experience, qualifications and teaching style..."
                rows={3}
                style={{...inp,resize:'vertical',lineHeight:1.6}}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  City
                </label>
                <input value={city} onChange={e=>setCity(e.target.value)}
                  placeholder="Your city" style={inp}/>
              </div>
              <div>
                <label style={{display:'block',color:t,fontWeight:700,fontSize:12,marginBottom:6}}>
                  State
                </label>
                <input value={state} onChange={e=>setState2(e.target.value)}
                  placeholder="Your state" style={inp}/>
              </div>
            </div>
          </div>
        </div>

        {/* Exam expertise */}
        <div style={{background:c,border:'1px solid '+b,borderRadius:18,
          padding:'20px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 4px'}}>
            Exam Expertise
          </p>
          <p style={{color:m,fontSize:11,margin:'0 0 12px'}}>
            Select all exams you can teach
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {EXAMS.map(exam=>(
              <button key={exam} onClick={()=>toggleExam(exam)}
                style={{padding:'7px 14px',borderRadius:20,border:'1.5px solid',
                  cursor:'pointer',fontSize:12,fontWeight:600,transition:'all 0.15s',
                  borderColor:selectedExams.includes(exam)?a:b,
                  background:selectedExams.includes(exam)?a+'15':bg,
                  color:selectedExams.includes(exam)?a:m}}>
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div style={{background:c,border:'1px solid '+b,borderRadius:18,
          padding:'20px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 4px'}}>
            Teaching Languages
          </p>
          <p style={{color:m,fontSize:11,margin:'0 0 12px'}}>
            Languages you can answer doubts in
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {LANGS.map(lang=>(
              <button key={lang} onClick={()=>toggleLang(lang)}
                style={{padding:'7px 14px',borderRadius:20,border:'1.5px solid',
                  cursor:'pointer',fontSize:12,fontWeight:600,transition:'all 0.15s',
                  borderColor:selectedLangs.includes(lang)?p:b,
                  background:selectedLangs.includes(lang)?p+'12':bg,
                  color:selectedLangs.includes(lang)?p:m}}>
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Theme selector */}
        <div style={{background:c,border:'1px solid '+b,borderRadius:18,
          padding:'20px',marginBottom:16}}>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 4px'}}>
            Dashboard Theme
          </p>
          <p style={{color:m,fontSize:11,margin:'0 0 14px'}}>
            10 professional themes — light & dark
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
            {MENTOR_THEMES.map(th=>(
              <button key={th.id}
                onClick={()=>{ setActiveTheme&&setActiveTheme(th.id); applyTheme&&applyTheme(th.id) }}
                style={{background:theme?.id===th.id?a+'15':bg,
                  border:'2px solid '+(theme?.id===th.id?a:b),
                  borderRadius:14,padding:'12px 8px',cursor:'pointer',
                  textAlign:'center',transition:'all 0.2s'}}>
                <div style={{width:32,height:32,borderRadius:'50%',
                  background:th.preview,margin:'0 auto 6px',
                  boxShadow:'0 2px 8px '+th.preview+'44'}}/>
                <p style={{color:t,fontSize:9,fontWeight:600,margin:'0 0 2px',
                  lineHeight:1.2}}>
                  {th.emoji} {th.name.split(' ')[0]}
                </p>
                <p style={{color:m,fontSize:8,margin:0}}>
                  {th.isDark?'Dark':'Light'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Switch to student */}
        <div style={{background:c,border:'1px solid '+b,borderRadius:18,
          padding:'16px 20px',marginBottom:16,
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{color:t,fontWeight:700,fontSize:13,margin:'0 0 2px'}}>
              Switch to Student View
            </p>
            <p style={{color:m,fontSize:11,margin:0}}>
              View the platform as a student
            </p>
          </div>
          <button onClick={()=>nav('/student')}
            style={{background:p+'10',border:'1px solid '+p+'30',
              borderRadius:12,padding:'8px 16px',color:p,
              fontWeight:700,fontSize:13,cursor:'pointer'}}>
            Go to Student →
          </button>
        </div>

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 3. MentorCommunity — Community hall for mentors
# ============================================================
w('src/pages/mentor/MentorCommunity.jsx', """// src/pages/mentor/MentorCommunity.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const CATEGORIES = [
  {id:'tips',   icon:'💡', label:'Teaching Tips'},
  {id:'exams',  icon:'📋', label:'Exam Updates'},
  {id:'doubt',  icon:'💬', label:'Doubt Strategies'},
  {id:'income', icon:'💰', label:'Income & Growth'},
  {id:'tech',   icon:'⚙️', label:'Platform Help'},
]

const POSTS = [
  {id:1, cat:'tips', author:'Dr. Kavitha R.', city:'Chennai',
   verified:true, time:'2h ago',
   title:'How I improved my response time from 4hrs to 40 minutes',
   body:'The key was batching doubt answers. I dedicate 6AM-7AM and 8PM-9PM only for doubts. No random answering throughout the day.',
   reactions:{fire:24,star:18,heart:12,thumb:31},
   replies:8},
  {id:2, cat:'exams', author:'Suresh M.', city:'Kochi',
   verified:true, time:'5h ago',
   title:'UPSC 2026 Prelims analysis — what topics were heavily asked',
   body:'Polity dominated with 28 questions. Environment had 15. Current affairs from Sept-Feb period. Prepare accordingly.',
   reactions:{fire:45,star:32,heart:8,thumb:56},
   replies:14},
  {id:3, cat:'income', author:'Priya C.', city:'Madurai',
   verified:false, time:'1d ago',
   title:'Reached ₹25,000/month with 18 students — here is what worked',
   body:'Mix of weekly and monthly passes. Focus on TNPSC students — they are very loyal and refer friends actively.',
   reactions:{fire:67,star:41,heart:29,thumb:78},
   replies:22},
]

const EMOJIS = [
  {k:'fire',e:'🔥'},{k:'star',e:'⭐'},{k:'heart',e:'❤️'},{k:'thumb',e:'👍'}
]

export default function MentorCommunity() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F', a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B', m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC', c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'

  const [catFilter, setCatFilter] = useState('all')
  const [posts, setPosts] = useState(POSTS)
  const [showPost, setShowPost] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newCat, setNewCat] = useState('tips')

  const react = (postId, emoji) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {...post, reactions:{...post.reactions,
            [emoji]:(post.reactions[emoji]||0)+1}}
        : post
    ))
  }

  const filtered = catFilter === 'all'
    ? posts
    : posts.filter(post => post.cat === catFilter)

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>
      <div style={{background:c,borderBottom:'1px solid '+b,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/mentor-hub')} style={{background:'transparent',
          border:'1px solid '+b,borderRadius:10,padding:'6px 14px',
          color:m,fontSize:13,cursor:'pointer',fontWeight:600}}>← Back</button>
        <div style={{flex:1}}>
          <h1 style={{color:t,fontSize:17,fontWeight:800,margin:0}}>
            👥 Mentor Community
          </h1>
          <p style={{color:m,fontSize:11,margin:0}}>
            Share · Learn · Grow together
          </p>
        </div>
        <button onClick={()=>setShowPost(!showPost)}
          style={{background:'linear-gradient(135deg,'+p+','+a+')',
            border:'none',borderRadius:12,padding:'9px 18px',
            color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
          + Post
        </button>
      </div>

      <div style={{padding:'20px',maxWidth:720,margin:'0 auto'}}>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',
          gap:10,marginBottom:20}}>
          {[
            {l:'Active Mentors',  v:'286',  e:'👥'},
            {l:'Posts This Week', v:'142',  e:'📝'},
            {l:'Tips Shared',     v:'1,240',e:'💡'},
          ].map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:16,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* New post form */}
        {showPost && (
          <div style={{background:c,border:'1.5px solid '+a,borderRadius:18,
            padding:'18px',marginBottom:20}}>
            <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
              {CATEGORIES.map(cat=>(
                <button key={cat.id} onClick={()=>setNewCat(cat.id)}
                  style={{padding:'6px 12px',borderRadius:20,border:'1.5px solid',
                    cursor:'pointer',fontSize:11,fontWeight:700,
                    borderColor:newCat===cat.id?a:b,
                    background:newCat===cat.id?a+'15':bg,
                    color:newCat===cat.id?a:m}}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            <input value={newTitle} onChange={e=>setNewTitle(e.target.value)}
              placeholder="Post title — be specific and helpful"
              style={{width:'100%',padding:'11px 14px',borderRadius:12,
                border:'1.5px solid '+b,background:bg,color:t,
                fontSize:14,outline:'none',fontFamily:'Poppins,sans-serif',
                boxSizing:'border-box',marginBottom:10}}/>
            <textarea value={newBody} onChange={e=>setNewBody(e.target.value)}
              placeholder="Share your experience, tips, or questions with fellow mentors..."
              rows={4}
              style={{width:'100%',padding:'11px 14px',borderRadius:12,
                border:'1.5px solid '+b,background:bg,color:t,
                fontSize:13,outline:'none',resize:'vertical',
                fontFamily:'Poppins,sans-serif',boxSizing:'border-box',
                lineHeight:1.6,marginBottom:12}}/>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>{
                if(!newTitle.trim()||!newBody.trim()) return
                setPosts(prev=>[{
                  id:Date.now(),cat:newCat,
                  author:'You',city:'',verified:false,time:'Just now',
                  title:newTitle,body:newBody,
                  reactions:{fire:0,star:0,heart:0,thumb:0},replies:0
                },...prev])
                setNewTitle('');setNewBody('');setShowPost(false)
              }} style={{flex:1,
                background:'linear-gradient(135deg,'+p+','+a+')',
                border:'none',borderRadius:12,padding:'11px',
                color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                Publish Post
              </button>
              <button onClick={()=>setShowPost(false)}
                style={{background:'transparent',border:'1px solid '+b,
                  borderRadius:12,padding:'11px 18px',color:m,
                  fontWeight:600,fontSize:13,cursor:'pointer'}}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div style={{display:'flex',gap:8,overflowX:'auto',
          paddingBottom:4,marginBottom:16}}>
          <button onClick={()=>setCatFilter('all')}
            style={{padding:'7px 16px',borderRadius:20,border:'none',cursor:'pointer',
              fontSize:12,fontWeight:700,flexShrink:0,
              background:catFilter==='all'?'linear-gradient(135deg,'+p+','+a+')':'transparent',
              color:catFilter==='all'?'#fff':m}}>
            All Posts
          </button>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} onClick={()=>setCatFilter(cat.id)}
              style={{padding:'7px 16px',borderRadius:20,border:'none',cursor:'pointer',
                fontSize:12,fontWeight:700,flexShrink:0,
                background:catFilter===cat.id?'linear-gradient(135deg,'+p+','+a+')':'transparent',
                color:catFilter===cat.id?'#fff':m}}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        {filtered.map(post=>(
          <div key={post.id} style={{background:c,border:'1px solid '+b,
            borderRadius:18,padding:'18px',marginBottom:12,
            boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>

            <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
              <div style={{width:36,height:36,borderRadius:'50%',flexShrink:0,
                background:'linear-gradient(135deg,'+p+','+a+')',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:700,fontSize:14,color:'#fff'}}>
                {post.author[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{color:t,fontWeight:700,fontSize:13}}>{post.author}</span>
                  {post.verified && (
                    <span style={{background:'#3B82F615',color:'#3B82F6',
                      fontSize:9,fontWeight:700,padding:'1px 6px',borderRadius:20}}>
                      ✓ Verified
                    </span>
                  )}
                  {post.city && (
                    <span style={{color:m,fontSize:10}}>📍 {post.city}</span>
                  )}
                </div>
                <span style={{color:m,fontSize:10}}>{post.time}</span>
              </div>
              <span style={{background:
                CATEGORIES.find(c=>c.id===post.cat)?.icon+' ',
                fontSize:18}}>
                {CATEGORIES.find(cat=>cat.id===post.cat)?.icon}
              </span>
            </div>

            <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 8px'}}>
              {post.title}
            </p>
            <p style={{color:m,fontSize:13,margin:'0 0 14px',lineHeight:1.6}}>
              {post.body}
            </p>

            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              {EMOJIS.map(({k,e})=>(
                <button key={k} onClick={()=>react(post.id,k)}
                  style={{background:bg,border:'1px solid '+b,
                    borderRadius:20,padding:'4px 12px',cursor:'pointer',
                    display:'flex',alignItems:'center',gap:4,
                    fontFamily:'Poppins,sans-serif',transition:'all 0.15s'}}
                  onMouseEnter={x=>x.currentTarget.style.borderColor=a}
                  onMouseLeave={x=>x.currentTarget.style.borderColor=b}>
                  <span style={{fontSize:14}}>{e}</span>
                  <span style={{color:t,fontWeight:700,fontSize:11}}>
                    {post.reactions[k]||0}
                  </span>
                </button>
              ))}
              <button style={{marginLeft:'auto',background:'transparent',
                border:'none',color:m,fontSize:12,cursor:'pointer',
                fontFamily:'Poppins,sans-serif'}}>
                💬 {post.replies} replies
              </button>
            </div>
          </div>
        ))}

        <div style={{height:40}}/>
      </div>
    </div>
  )
}
""")

# ============================================================
# 4. Update MentorHub sidebar — add Settings, Community,
#    fix Materials nav, remove "Student View" button from sidebar
# ============================================================
try:
    with open('src/pages/mentor/MentorHub.jsx', 'r', encoding='utf-8') as f:
        hub = f.read()

    # Fix NAV array — add Community and Settings, fix Materials path
    old_nav = """const NAV = [
  {icon:'🏠', label:'Dashboard',   path:'/mentor-hub'},
  {icon:'👥', label:'My Students', path:'/mentor-hub/students'},
  {icon:'💬', label:'Doubts',      path:'/mentor-hub/doubts'},
  {icon:'📁', label:'Materials',   path:'/mentor-hub/materials'},
  {icon:'🏆', label:'Leaderboard', path:'/mentor-hub/leaderboard'},
  {icon:'💰', label:'Earnings',    path:'/mentor-hub/cashback'},
  {icon:'📊', label:'Analytics',   path:'/mentor-hub/analytics'},
]"""

    new_nav = """const NAV = [
  {icon:'🏠', label:'Dashboard',    path:'/mentor-hub'},
  {icon:'👥', label:'My Students',  path:'/mentor-hub/students'},
  {icon:'💬', label:'Doubts',       path:'/mentor-hub/doubts'},
  {icon:'📁', label:'Materials',    path:'/mentor-hub/materials'},
  {icon:'🏆', label:'Leaderboard',  path:'/mentor-hub/leaderboard'},
  {icon:'💰', label:'Earnings',     path:'/mentor-hub/cashback'},
  {icon:'📊', label:'Analytics',    path:'/mentor-hub/analytics'},
  {icon:'🎟️', label:'Coupons',      path:'/mentor-hub/coupons'},
  {icon:'👥', label:'Community',    path:'/mentor-hub/community'},
  {icon:'⚙️', label:'Settings',     path:'/mentor-hub/settings'},
]"""

    hub = hub.replace(old_nav, new_nav)

    # Fix footer — remove student view button, make it subtle
    hub = hub.replace(
        """        <div style={{padding:'12px'}}>
          <button onClick={()=>nav('/student')}
            style={{width:'100%',background:'rgba(255,255,255,0.08)',
              border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,
              padding:'8px',color:'rgba(255,255,255,0.7)',fontSize:12,
              cursor:'pointer',fontWeight:600,fontFamily:'Poppins,sans-serif'}}>
            ← Student View
          </button>
        </div>""",
        """        <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.1)'}}>
          <p onClick={()=>nav('/student')}
            style={{color:'rgba(255,255,255,0.4)',fontSize:11,
              cursor:'pointer',margin:0,textAlign:'center',
              fontFamily:'Poppins,sans-serif'}}>
            Switch to student view →
          </p>
        </div>"""
    )

    with open('src/pages/mentor/MentorHub.jsx', 'w', encoding='utf-8') as f:
        f.write(hub)
    print('OK MentorHub sidebar updated')
except Exception as e:
    print('ERROR MentorHub:', e)

# ============================================================
# 5. Update App.jsx — add all missing mentor routes
# ============================================================
try:
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        app = f.read()

    new_imports = """const MentorMaterials  = lazy(() => import('./pages/mentor/MentorMaterials'))
const MentorCommunity  = lazy(() => import('./pages/mentor/MentorCommunity'))
const MentorSettings   = lazy(() => import('./pages/mentor/MentorSettings'))
"""
    new_routes = """            <Route path='/mentor-hub/materials'  element={<MentorMaterials/>}/>
            <Route path='/mentor-hub/community'  element={<MentorCommunity/>}/>
            <Route path='/mentor-hub/settings'   element={<MentorSettings/>}/>
"""
    changed = False
    if 'MentorMaterials' not in app:
        app = app.replace(
            "const MentorStudents",
            new_imports + "const MentorStudents"
        )
        app = app.replace(
            "<Route path='/mentor-hub/students'",
            new_routes + "            <Route path='/mentor-hub/students'"
        )
        changed = True

    if changed:
        with open('src/App.jsx', 'w', encoding='utf-8') as f:
            f.write(app)
        print('OK App.jsx 3 new mentor routes added')
    else:
        print('SKIP App.jsx routes already exist')
except Exception as e:
    print('ERROR App.jsx:', e)

print('')
print('ALL DONE!')
print('Run: npm run build 2>&1 | Select-Object -Last 3')
