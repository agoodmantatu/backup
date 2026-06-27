src = open("src/components/landing/Navbar.jsx", encoding="utf-8").read()
lines = src.split("\n")
for i, line in enumerate(lines):
    if "swatch" in line.lower() or "circle" in line.lower() or "theme" in line.lower():
        if "color" in line.lower() or "background" in line.lower():
            print(f"{i+1}: {line.rstrip()[:120]}")
