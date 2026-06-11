import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'

const SECTIONS = [
  { emoji:'📄', title:'PDF Library',    desc:'Download notes, PYQ papers, formula sheets',  path:'/classroom/pdf',    badge:'2,400+ files'  },
  { emoji:'📅', title:'Study Planner',  desc:'Day-by-day plan from today to exam day',       path:'/classroom/planner',badge:'Auto-generates' },
  { emoji:'📽️', title:'Video Lectures', desc:'Curated YouTube + Swayam lectures by topic',  path:'/classroom/videos', badge:'Curated'        },
  { emoji:'📝', title:'Quick Notes',    desc:'AI-summarised notes for every topic',          path:'/classroom/notes',  badge:'7-layer'        },
  { emoji:'🗂️', title:'Formula Bank',   desc:'All formulas for Maths, Science, Economics',  path:'/classroom/formulas',badge:'Printable'     },
  { emoji:'📊', title:'Mind Maps',      desc:'Visual concept maps for complex topics',       path:'/classroom/mindmaps',badge:'Download'      },
]

export default function ClassroomHub() {
  const navigate = useNavigate()
  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:6 }}>📚 Classroom</h1>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:24 }}>All your study resources in one place.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap:14 }}>
        {SECTIONS.map(s => (
          <div key={s.title} onClick={() => navigate(s.path)}
            style={{ background:'#fff', borderRadius:20, padding:22, border:'1.5px solid #E2E8F0', cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,0.04)', transition:'all 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='#D4AF37'; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#E2E8F0'; e.currentTarget.style.transform='none' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <span style={{ fontSize:32 }}>{s.emoji}</span>
              <span style={{ background:'#EDE9FE', color:'#7C3AED', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{s.badge}</span>
            </div>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:16, marginBottom:4 }}>{s.title}</p>
            <p style={{ color:'#64748B', fontSize:13 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
