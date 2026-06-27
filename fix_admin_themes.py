# Fix 1: StudentSettings — admin sees ALL themes unlocked
src = open("src/pages/student/StudentSettings.jsx", encoding="utf-8").read()

old = """  const isUnlocked = (t) => t.tier === 'base' || !t.unlock"""
new = """  const isUnlocked = (t) => isAdmin || t.tier === 'base' || !t.unlock"""

if old in src:
    src = src.replace(old, new)
    print("Admin unlock fixed in StudentSettings")
else:
    # Try finding it
    idx = src.find("isUnlocked = (t)")
    print(f"isUnlocked at: {idx}")
    print(repr(src[idx:idx+100]))

open("src/pages/student/StudentSettings.jsx", "w", encoding="utf-8").write(src)

# Fix 2: ThemeSelector — admin sees ALL themes
src2 = open("src/pages/settings/ThemeSelector.jsx", encoding="utf-8").read()
old2 = """  const isUnlocked = (t) => t.tier === 'base' || !t.unlock"""
new2 = """  const isUnlocked = (t) => isAdmin || t.tier === 'base' || !t.unlock"""

if old2 in src2:
    src2 = src2.replace(old2, new2)
    print("Admin unlock fixed in ThemeSelector")
else:
    idx2 = src2.find("isUnlocked")
    print(f"ThemeSelector isUnlocked at: {idx2}")
    print(repr(src2[idx2:idx2+100]))

open("src/pages/settings/ThemeSelector.jsx", "w", encoding="utf-8").write(src2)
print("Done")
