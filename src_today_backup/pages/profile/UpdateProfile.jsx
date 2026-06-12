import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'

export default function UpdateProfile() {
  const navigate = useNavigate()
  const fileRef  = useRef(null)
  const [preview, setPreview] = useState(localStorage.getItem('tryit_avatar'))
  const [name, setName] = useState(localStorage.getItem('tryit_name')||'')
  const [bio, setBio]   = useState(localStorage.getItem('tryit_bio')||'')
  const [saved, setSaved] = useState(false)

  const pickImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 200
        const ctx = canvas.getContext('2d')
        const min = Math.min(img.width, img.height)
        ctx.drawImage(img, (img.width-min)/2, (img.height-min)/2, min, min, 0, 0, 200, 200)
        const compressed = canvas.toDataURL('image/jpeg', 0.85)
        setPreview(compressed)
        localStorage.setItem('tryit_avatar', compressed)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    localStorage.setItem('tryit_name', name)
    localStorage.setItem('tryit_bio', bio)
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  return (
    <AppLayout>
      <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', fontSize:28, marginBottom:20 }}>✏️ Edit Profile</h1>
      <div style={{ background:'#fff', borderRadius:22, padding:24, marginBottom:16, border:'1.5px solid #E2E8F0', textAlign:'center' }}>
        <div onClick={()=>fileRef.current?.click()} style={{ position:'relative', width:100, height:100, margin:'0 auto 16px', cursor:'pointer' }}>
          {preview
            ? <img src={preview} alt="" style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', border:'3px solid #D4AF37' }}/>
            : <div style={{ width:100, height:100, borderRadius:'50%', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:32, border:'3px solid #D4AF37' }}>
                {(name||'U').slice(0,2).toUpperCase()}
              </div>}
          <div style={{ position:'absolute', bottom:2, right:2, width:28, height:28, borderRadius:'50%', background:'#D4AF37', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>📷</div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={pickImage}/>
        <p style={{ color:'#64748B', fontSize:13 }}>Tap photo to change · Max 5MB · Auto square-crop</p>
      </div>
      <div style={{ background:'#fff', borderRadius:22, padding:24, border:'1.5px solid #E2E8F0' }}>
        <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:13, marginBottom:6 }}>Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"
          style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', marginBottom:16 }}/>
        <label style={{ display:'block', fontFamily:'Poppins,sans-serif', fontWeight:600, color:'#1E3A5F', fontSize:13, marginBottom:6 }}>Bio</label>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} placeholder="UPSC aspirant..."
          style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:'1.5px solid #E2E8F0', fontSize:14, outline:'none', boxSizing:'border-box', resize:'none', marginBottom:16 }}/>
        <button onClick={save} style={{ width:'100%', padding:14, borderRadius:14, border:'none', background:'linear-gradient(135deg,#1E3A5F,#0F2140)', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:15, cursor:'pointer' }}>
          {saved?'✅ Saved!':'Save Profile'}
        </button>
      </div>
    </AppLayout>
  )
}
