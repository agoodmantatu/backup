src = open('src/pages/student/StudentDashboard.jsx', encoding='utf-8').read()

# Better active nav icon glow
src = src.replace(
    "background:active\n                    ?`linear-gradient(135deg,${accent}22,${accent}0a)`\n                    :'transparent',",
    "background:active\n                    ?`linear-gradient(135deg,${accent}33,${accent}18)`\n                    :'rgba(255,255,255,0.04)',"
)

src = src.replace(
    "boxShadow:active?`0 0 12px ${accent}22`:'none',",
    "boxShadow:active?`0 0 20px ${accent}55,0 4px 12px rgba(0,0,0,0.3)`:'0 2px 6px rgba(0,0,0,0.15)',"
)

open('src/pages/student/StudentDashboard.jsx', 'w', encoding='utf-8').write(src)
print('Done')
