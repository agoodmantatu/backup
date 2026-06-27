// src/pages/mentor/MentorCommunity.jsx
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
