src = open("src/pages/student/StudentSettings.jsx", encoding="utf-8").read()

# Fix 1: Navbar color should match theme properly
# For light themes — use lighter primary, not dark primary
old_navbar = """          <div style={{height:20,background:t.primary||'#1E3A5F',display:'flex',alignItems:'center',padding:'0 7px',gap:4}}>
                            <div style={{width:5,height:5,borderRadius:'50%',background:t.accent||'#C9A84C',boxShadow:'0 0 5px '+(t.accent||'#C9A84C')}}/>
                            <div style={{flex:1,height:2,borderRadius:2,background:'rgba(255,255,255,0.2)',maxWidth:32}}/>
                            <div style={{marginLeft:'auto',fontSize:8,color:'rgba(255,255,255,0.5)'}}>●</div>
                          </div>"""

new_navbar = """          <div style={{height:20,background:t.isDark?(t.primaryDark||t.primary||'#0F172A'):(t.primary||'#1E3A5F'),display:'flex',alignItems:'center',padding:'0 7px',gap:4}}>
                            <div style={{width:5,height:5,borderRadius:'50%',background:t.accent||'#C9A84C',boxShadow:'0 0 6px '+(t.accent||'#C9A84C')}}/>
                            <div style={{flex:1,height:2,borderRadius:2,background:'rgba(255,255,255,0.3)',maxWidth:32}}/>
                            <div style={{marginLeft:'auto',fontSize:8,color:'rgba(255,255,255,0.6)'}}>●</div>
                          </div>"""

# Fix 2: Bigger more visible particles
old_particles = """          {[0,1,2,3].map(pi => (
                            <div key={pi} style={{position:'absolute',width:pi%2===0?3:2,height:pi%2===0?3:2,borderRadius:'50%',background:t.accent||'#C9A84C',left:(18+pi*19)+'%',bottom:(8+pi*9)+'%',opacity:0.6,animation:'th-float '+(1.6+pi*0.4)+'s ease-in-out '+(pi*0.3)+'s infinite',boxShadow:'0 0 4px '+(t.accent||'#C9A84C')}}/>
                          ))}"""

new_particles = """          {[0,1,2,3,4].map(pi => (
                            <div key={pi} style={{
                              position:'absolute',
                              width:pi===0?5:pi===1?4:pi===2?6:pi===3?3:4,
                              height:pi===0?5:pi===1?4:pi===2?6:pi===3?3:4,
                              borderRadius:'50%',
                              background:t.accent||'#C9A84C',
                              left:(12+pi*17)+'%',
                              bottom:(6+pi*12)+'%',
                              opacity:0.85,
                              animation:'th-float '+(1.4+pi*0.5)+'s ease-in-out '+(pi*0.25)+'s infinite',
                              boxShadow:'0 0 8px 2px '+(t.accent||'#C9A84C'),
                            }}/>
                          ))}"""

# Fix 3: Card background should respect isDark
old_card = """                          <div style={{padding:'5px 7px',display:'flex',flexDirection:'column',gap:3}}>
                            <div style={{background:t.surface||'#fff',borderRadius:5,padding:'4px 6px',boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}}>
                              <div style={{height:3,borderRadius:2,background:t.primary||'#1E3A5F',width:'55%',marginBottom:3,opacity:0.8}}/>
                              <div style={{height:2,borderRadius:2,background:t.isDark?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)',width:'75%',marginBottom:2}}/>
                              <div style={{height:2,borderRadius:2,background:t.isDark?'rgba(255,255,255,0.12)':'rgba(0,0,0,0.07)',width:'48%'}}/>
                            </div>"""

new_card = """                          <div style={{padding:'5px 7px',display:'flex',flexDirection:'column',gap:3,background:t.bg||'#F8FAFC'}}>
                            <div style={{background:t.surface||(t.isDark?'#1E293B':'#FFFFFF'),borderRadius:5,padding:'4px 6px',boxShadow:t.isDark?'0 1px 4px rgba(0,0,0,0.4)':'0 1px 4px rgba(0,0,0,0.08)'}}>
                              <div style={{height:3,borderRadius:2,background:t.accent||'#C9A84C',width:'55%',marginBottom:3,opacity:0.9}}/>
                              <div style={{height:2,borderRadius:2,background:t.isDark?'rgba(255,255,255,0.35)':'rgba(0,0,0,0.15)',width:'75%',marginBottom:2}}/>
                              <div style={{height:2,borderRadius:2,background:t.isDark?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.09)',width:'48%'}}/>
                            </div>"""

changes = 0
for old, new in [(old_navbar, new_navbar), (old_particles, new_particles), (old_card, new_card)]:
    if old in src:
        src = src.replace(old, new)
        changes += 1
        print(f"Fix {changes} applied")
    else:
        print(f"Fix {changes+1} NOT FOUND")

open("src/pages/student/StudentSettings.jsx", "w", encoding="utf-8").write(src)
print(f"Total fixes: {changes}")
