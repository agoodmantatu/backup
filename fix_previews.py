# ── Fix 1: StudentSettings theme preview gradient ──
src = open("src/pages/student/StudentSettings.jsx", encoding="utf-8").read()

# Current broken:
# dark: gradient(primaryDark, bg) — bg is dark which makes it dark-dark OK
# light: gradient(primary, surface) — primary is dark blue, surface is white = half dark half white = confusing

# Fix: use bg+accent for light, primaryDark+accent for dark
old = """? `linear-gradient(135deg,${t.primaryDark||t.primary||'#0F2140'},${t.bg||'#1E293B'})`
: `linear-gradient(135deg,${t.primary||'#1E3A5F'},${t.surface||'#fff'})`,"""

new = """? `linear-gradient(135deg,${t.primaryDark||t.primary||'#0F2140'},${t.accent||'#C9A84C'}60)`
: `linear-gradient(135deg,${t.bg||'#F8FAFC'} 40%,${t.accent||'#2563EB'}50)`,"""

if old in src:
    src = src.replace(old, new)
    print("StudentSettings preview fixed")
else:
    print("NOT FOUND — showing context")
    idx = src.find("primaryDark||t.primary||'#0F2140'")
    print(repr(src[idx-40:idx+200]))

open("src/pages/student/StudentSettings.jsx", "w", encoding="utf-8").write(src)

# ── Fix 2: ThemeSelector swatches — remove white bg swatch ──
src2 = open("src/pages/settings/ThemeSelector.jsx", encoding="utf-8").read()

# Current: [t.accent, t.primary, t.bg] — bg is white for light themes = invisible swatch
# Fix: show accent + primary only, sized properly
old2 = "{[t.accent, t.primary, t.bg].map((c, i) => ("
new2 = "{[t.accent, t.primary].map((c, i) => ("

if old2 in src2:
    src2 = src2.replace(old2, new2)
    print("ThemeSelector swatches fixed")
else:
    print("ThemeSelector pattern not found")
    idx = src2.find("t.accent, t.primary")
    print(repr(src2[idx-20:idx+100]))

open("src/pages/settings/ThemeSelector.jsx", "w", encoding="utf-8").write(src2)
print("Done")
