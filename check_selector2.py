src = open("src/pages/settings/ThemeSelector.jsx", encoding="utf-8").read()
lines = src.split("\n")
print(f"Total lines: {len(lines)}")
for i, line in enumerate(lines):
    if "unlock" in line.lower() or "isAdmin" in line.lower() or "locked" in line.lower() or "plan" in line.lower():
        print(f"{i+1}: {line.rstrip()[:120]}")
