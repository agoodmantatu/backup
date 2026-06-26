import re

# ── Fix ThemeSelector.jsx preview swatches ──
src = open("src/pages/settings/ThemeSelector.jsx", encoding="utf-8").read()

# Replace the 4-color swatch with a proper mini preview
old_swatch = "{[t.primary, t.accent, t.bg, t.surface].map((c, i) => ("
new_swatch = "{[t.accent, t.primary, t.bg].map((c, i) => ("

if old_swatch in src:
    src = src.replace(old_swatch, new_swatch)
    print("ThemeSelector swatch fixed")
else:
    print("ThemeSelector swatch pattern not found")
    idx = src.find("t.primary, t.accent")
    print(f"Found at: {idx}")
    print(repr(src[idx-50:idx+100]))

open("src/pages/settings/ThemeSelector.jsx", "w", encoding="utf-8").write(src)

# ── Fix StudentSettings.jsx theme preview ──
src2 = open("src/pages/student/StudentSettings.jsx", encoding="utf-8").read()

# Fix preview gradient — for light themes show bg with accent overlay
old_preview = """? `linear-gradient(135deg,${t.primaryDark||t.primary||'#0F2140'},${t.bg||'#1E293B'})`
: `linear-gradient(135deg,${t.primary||'#1E3A5F'},${t.surface||'#fff'})`,"""

new_preview = """? `linear-gradient(135deg,${t.primaryDark||t.primary||'#0F2140'},${t.primary||'#1E3A5F'})`
: `linear-gradient(135deg,${t.bg||'#F8FAFC'},${t.surface||'#FFFFFF'})`,"""

if old_preview in src2:
    src2 = src2.replace(old_preview, new_preview)
    print("StudentSettings preview fixed")
else:
    print("StudentSettings preview pattern not found")
    idx = src2.find("primaryDark||t.primary||")
    print(f"Found at: {idx}")
    print(repr(src2[idx-20:idx+200]))

# Also fix the border/indicator color for light theme previews
# Add accent color dot/indicator inside the preview
open("src/pages/student/StudentSettings.jsx", "w", encoding="utf-8").write(src2)

print("Done")
