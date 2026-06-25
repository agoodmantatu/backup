src = open('src/pages/student/StudentDashboard.jsx', encoding='utf-8').read()

# Fix 1: Sidebar ALWAYS dark navy — never takes theme color
# This is the key fix — sidebar stays dark so text is always readable
src = src.replace(
    "const sideGrad = `linear-gradient(160deg,${primD} 0%,${primary}ee 40%,${primD} 100%)`",
    "const sideGrad = 'linear-gradient(160deg,#060D18 0%,#0F1A2E 40%,#060D18 100%)'"
)

# Fix 2: Sidebar text always white high contrast
src = src.replace(
    "color:active?accent:'rgba(255,255,255,0.55)',",
    "color:active?accent:'rgba(255,255,255,0.85)',"
)

# Fix 3: Nav icon always visible colored bg
src = src.replace(
    "background:active\n                    ?`linear-gradient(135deg,${accent}33,${accent}18)`\n                    :'rgba(255,255,255,0.04)',",
    "background:active\n                    ?`linear-gradient(135deg,${accent}44,${accent}22)`\n                    :'rgba(255,255,255,0.10)',"
)

# Fix 4: Cards use glassmorphism — semi transparent + blur
src = src.replace(
    "  const card    = isDark?'rgba(255,255,255,0.06)':'#fff'",
    "  const card    = isDark?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.85)'"
)

src = src.replace(
    "  const bdr     = isDark?'rgba(255,255,255,0.1)':'#E2E8F0'",
    "  const bdr     = isDark?'rgba(255,255,255,0.14)':'rgba(255,255,255,0.6)'"
)

# Fix 5: Main content background — dark themes use deeper contrast
src = src.replace(
    "background:isDark?`radial-gradient(ellipse 60% 40% at 20% 0%,${primary}25,transparent),${primD}`:'#F0F4F8',",
    "background:isDark?`radial-gradient(ellipse 80% 60% at 20% -10%,${primary}40,transparent 60%),${primD}`:'#F0F4F8',"
)

# Fix 6: Stat cards — glassmorphism
src = src.replace(
    "style={{background:card,\n                  border:`1px solid ${s.color}20`,borderRadius:18,\n                  padding:'14px',",
    "style={{background:isDark?'rgba(255,255,255,0.07)':'rgba(255,255,255,0.9)',\n                  backdropFilter:'blur(12px)',\n                  border:`1px solid ${s.color}30`,borderRadius:18,\n                  padding:'14px',"
)

# Fix 7: Action cards glassmorphism
src = src.replace(
    "background:atLimit?'transparent':card,\n                        border:`1.5px solid ${atLimit?'#F87171':a.color}22`,",
    "background:atLimit?'rgba(248,113,113,0.05)':isDark?'rgba(255,255,255,0.07)':'rgba(255,255,255,0.85)',\n                        backdropFilter:'blur(8px)',\n                        border:`1.5px solid ${atLimit?'#F87171':a.color}35`,"
)

# Fix 8: Sidebar upgrade CTA — always visible
src = src.replace(
    "background:`linear-gradient(135deg,${accent}15,${accent}05)`,\n            border:`1px solid ${accent}25`,",
    "background:`linear-gradient(135deg,${accent}25,${accent}10)`,\n            border:`1px solid ${accent}45`,"
)

# Fix 9: User card in sidebar — glassmorphism
src = src.replace(
    "background:'rgba(255,255,255,0.05)',borderRadius:14,\n          border:'1px solid rgba(255,255,255,0.07)'",
    "background:'rgba(255,255,255,0.08)',borderRadius:14,\n          border:'1px solid rgba(255,255,255,0.15)',\n          backdropFilter:'blur(8px)'"
)

# Fix 10: Sidebar box shadow — always sharp dark
src = src.replace(
    "boxShadow:sideGlow,",
    "boxShadow:'4px 0 40px rgba(0,0,0,0.5),inset -1px 0 0 rgba(255,255,255,0.06)',"
)

# Fix 11: Force sidebar text labels high contrast
src = src.replace(
    "color:active?accent:atLimit?'#F87171':'rgba(255,255,255,0.55)',",
    "color:active?accent:atLimit?'#F87171':'rgba(255,255,255,0.88)',"
)

open('src/pages/student/StudentDashboard.jsx', 'w', encoding='utf-8').write(src)
print('All contrast fixes applied')
