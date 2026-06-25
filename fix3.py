src = open('src/pages/student/StudentDashboard.jsx', encoding='utf-8').read()

# Remove profile and settings from NAV list
src = src.replace(
    "  {id:'profile',   icon:'👤',label:'Profile',     path:'/student/profile'},\n  {id:'settings',  icon:'⚙️',label:'Settings',    path:'/student/settings'},\n]",
    "]"
)

# Add profile avatar + settings to top bar right side
old_topbar_end = """            <button onClick={()=>setShowNotifs(t=>!t)} style={{
              position:'relative',background:card,border:`1px solid ${bdr}`,
              borderRadius:10,width:38,height:38,cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
              🔔
              <div style={{position:'absolute',top:6,right:6,width:8,height:8,
                borderRadius:'50%',background:'#F87171',
                border:`2px solid ${isDark?primD:'#fff'}`}}/>
            </button>"""

new_topbar_end = """            <button onClick={()=>setShowNotifs(t=>!t)} style={{
              position:'relative',background:card,border:`1px solid ${bdr}`,
              borderRadius:10,width:38,height:38,cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
              🔔
              <div style={{position:'absolute',top:6,right:6,width:8,height:8,
                borderRadius:'50%',background:'#F87171',
                border:`2px solid ${isDark?primD:'#fff'}`}}/>
            </button>
            {/* Profile avatar in header */}
            <div onClick={()=>navigate('/student/settings')}
              onContextMenu={e=>e.preventDefault()}
              style={{
                width:38,height:38,borderRadius:'50%',flexShrink:0,
                background:`linear-gradient(135deg,${accent},${accentL})`,
                border:`2px solid ${accent}`,
                backgroundImage:profile?.avatar_url?`url(${profile.avatar_url})`:'',
                backgroundSize:'cover',backgroundPosition:'center',
                cursor:'pointer',display:'flex',alignItems:'center',
                justifyContent:'center',fontWeight:900,fontSize:16,
                color:primD,WebkitUserDrag:'none',userSelect:'none',
                boxShadow:`0 0 0 2px ${accent}33`,
              }}>
              {!profile?.avatar_url&&(profile?.name?.[0]||'S')}
            </div>"""

src = src.replace(old_topbar_end, new_topbar_end)

# Also remove profile/settings from bottom mobile nav
src = src.replace(
    "          {icon:'👤',label:'Profile', path:'/student/profile'},",
    "          {icon:'📊',label:'Analytics',path:'/student/analytics'},"
)

open('src/pages/student/StudentDashboard.jsx', 'w', encoding='utf-8').write(src)
print('Header profile+settings done')
