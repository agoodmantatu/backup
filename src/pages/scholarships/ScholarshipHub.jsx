import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const SCHOLARSHIPS = [
  { id:'ntse',     name:'NTSE (National Talent Search)',  org:'NCERT',       amount:'₹1,250/month', deadline:'Nov 2026', class:'Class 10', category:'Merit', match:94, emoji:'⭐', link:'ncert.nic.in' },
  { id:'nmms',     name:'NMMS (National Means-cum-Merit)',org:'Govt of India',amount:'₹12,000/year',deadline:'Oct 2026', class:'Class 8',  category:'Merit+Need', match:88, emoji:'🌟', link:'scholarships.gov.in' },
  { id:'inspire',  name:'INSPIRE Scholarship (SHE)',      org:'DST',         amount:'₹80,000/year', deadline:'Sep 2026', class:'Class 11+',category:'Science', match:72, emoji:'🔬', link:'online-inspire.nic.in' },
  { id:'pm-yasasvi',name:"PM YASASVI Scholarship",       org:'NTA',         amount:'₹75,000–₹1.25L',deadline:'Aug 2026',class:'Class 9–11',category:'OBC/EBC', match:80, emoji:'🏆', link:'yet.nta.ac.in' },
  { id:'csss',     name:'Central Sector Scheme (CSSS)',   org:'Govt of India',amount:'₹12,000/year', deadline:'Oct 2026', class:'Class 12+',category:'Merit', match:85, emoji:'📚', link:'scholarships.gov.in' },
  { id:'swami-vivekananda',name:'Swami Vivekananda Merit Scholarship',org:'Govt of WB',amount:'₹60,000/year',deadline:'Aug 2026',class:'Class 11+',category:'Merit',match:65, emoji:'🧘', link:'svmcm.wbhed.gov.in' },
  { id:'ugc-net',  name:'UGC NET JRF Fellowship',         org:'UGC',         amount:'₹37,000/month', deadline:'Dec 2026', class:'Post Graduate',category:'Research',match:60, emoji:'🎓', link:'ugcnet.nta.nic.in' },
  { id:'ishan',    name:'Ishan Uday NE Scholarship',      org:'UGC',         amount:'₹5,400–7,800/month',deadline:'Oct 2026',class:'Undergrad',category:'Northeast', match:55, emoji:'🌿', link:'ishan.ucanapply.com' },
  { id:'begum-hazrat',name:'Begum Hazrat Mahal Scholarship',org:'Maulana Azad',amount:'₹5,000–6,000/year',deadline:'Sep 2026',class:'Class 9–12',category:'Minority Girls',match:58, emoji:'🌸', link:'maef.nic.in' },
  { id:'pragati',  name:'AICTE Pragati Scholarship (Girls)',org:'AICTE',     amount:'₹50,000/year',  deadline:'Nov 2026', class:'B.Tech 1st yr',category:'Girls in Tech',match:70, emoji:'👩‍💻', link:'scholarships.gov.in' },
  { id:'nsp-pre',  name:'Pre-Matric Scholarship (SC/ST)', org:'Govt of India',amount:'₹150–350/month',deadline:'Oct 2026',class:'Class 1–10',category:'SC/ST',match:75, emoji:'🌱', link:'scholarships.gov.in' },
  { id:'pm-pvtg',  name:"PM PVTG Development Mission",    org:'MoTA',        amount:'₹15,000/year',  deadline:'Aug 2026', class:'Any',      category:'Tribal',match:50, emoji:'🏔️', link:'tribal.gov.in' },
]

const CATEGORIES = ['All','Merit','Merit+Need','Science','OBC/EBC','Girls in Tech','SC/ST','Northeast','Research','Tribal','Minority']

export default function ScholarshipHub() {
  const { showToast } = useToast()
  const [cat, setCat]   = useState('All')
  const [saved, setSave] = useState(new Set())
  const [search, setSearch] = useState('')

  const filtered = SCHOLARSHIPS.filter(s => {
    const matchCat = cat==='All' || s.category===cat
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  }).sort((a,b) => b.match - a.match)

  return (
    <AppLayout>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28 }}>🎓 Scholarship Hub</h1>
        <p style={{ color:'#94A3B8', fontSize:14, marginTop:2 }}>800+ scholarships tracked · Deadline alerts · Free money for your education</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,180px),1fr))', gap:12, marginBottom:20 }}>
        {[['🎓','800+','Scholarships'],['⏰','12','Closing Soon'],['💰','₹2.8L','Avg Per Year'],['📊','98%','Free to Apply']].map(([e,v,l]) => (
          <div key={l} style={{ background:'#fff', borderRadius:18, padding:'14px 12px', textAlign:'center', border:'1.5px solid #E2E8F0', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize:24 }}>{e}</p>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#D4AF37', fontSize:20 }}>{v}</p>
            <p style={{ color:'#94A3B8', fontSize:11, marginTop:2 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom:16 }}>
        <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:18 }}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search scholarships by name or organisation..."
          style={{ width:'100%', padding:'13px 16px 13px 42px', borderRadius:16, border:'1.5px solid #E2E8F0', fontSize:14, fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box', background:'#fff' }}
          onFocus={e=>e.target.style.borderColor='#D4AF37'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
      </div>

      {/* Category filter */}
      <div style={{ display:'flex', gap:8, marginBottom:20, overflowX:'auto', paddingBottom:4 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding:'7px 16px', borderRadius:20, border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, background: cat===c?'#1E3A5F':'#fff', color: cat===c?'#fff':'#64748B', fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:12, boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>{c}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background:'#fff', borderRadius:20, padding:18, border:'1.5px solid #E2E8F0', boxShadow:'0 2px 10px rgba(0,0,0,0.04)' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
              <span style={{ fontSize:28, flexShrink:0 }}>{s.emoji}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:15 }}>{s.name}</p>
                    <p style={{ color:'#64748B', fontSize:12, marginTop:2 }}>{s.org} · {s.class}</p>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#22C55E', fontSize:18 }}>{s.amount}</p>
                    <p style={{ color:'#94A3B8', fontSize:11 }}>per year</p>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <span style={{ background:'#FEF3C7', color:'#92400E', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>⏰ {s.deadline}</span>
                  <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20 }}>{s.category}</span>
                  <span style={{ background:'#DCFCE7', color:'#15803D', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>Profile match: {s.match}%</span>
                  <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
                    <button onClick={() => { setSave(p=>{ const n=new Set(p); n.has(s.id)?n.delete(s.id):n.add(s.id); return n }); showToast('success', saved.has(s.id)?'Removed':'🔖 Deadline saved!') }}
                      style={{ background:'none', border:'none', fontSize:18, cursor:'pointer', color: saved.has(s.id)?'#D4AF37':'#CBD5E1' }}>
                      {saved.has(s.id)?'★':'☆'}
                    </button>
                    <button onClick={() => showToast('info',`Opening ${s.link}...`)}
                      style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', border:'none', borderRadius:10, padding:'7px 16px', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:12, cursor:'pointer' }}>
                      Apply →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
