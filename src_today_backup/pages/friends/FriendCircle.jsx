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
