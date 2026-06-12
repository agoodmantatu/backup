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
