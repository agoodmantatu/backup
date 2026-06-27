src = open("src/pages/settings/ThemeSelector.jsx", encoding="utf-8").read()

# Find where locked and planLocked are set and add admin override
old = """  const locked = !t.unlocked
  const planLocked = t.planLocked"""

new = """  const locked = !t.unlocked && !isAdmin
  const planLocked = t.planLocked && !isAdmin"""

if old in src:
    src = src.replace(old, new)
    print("Fixed locked + planLocked for admin")
else:
    print("Pattern not found - checking exact text")
    idx = src.find("const locked = ")
    print(repr(src[idx:idx+60]))

# Also check if isAdmin is imported/available
if "isAdmin" not in src:
    print("WARNING: isAdmin not in ThemeSelector - need to add it")
    # Check what props/context it uses
    idx2 = src.find("function ThemeSelector") 
    if idx2 < 0:
        idx2 = src.find("const ThemeSelector")
    print(repr(src[idx2:idx2+200]))
else:
    print("isAdmin already in ThemeSelector")

open("src/pages/settings/ThemeSelector.jsx", "w", encoding="utf-8").write(src)
print("Done")
