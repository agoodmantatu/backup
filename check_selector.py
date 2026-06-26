src = open("src/pages/settings/ThemeSelector.jsx", encoding="utf-8").read()
lines = src.split("\n")
for i, line in enumerate(lines):
    if "primary" in line or "accent" in line or "swatch" in line.lower() or "preview" in line.lower():
        print(f"{i+1}: {line.rstrip()[:120]}")
