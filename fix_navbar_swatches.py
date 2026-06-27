src = open("src/components/landing/Navbar.jsx", encoding="utf-8").read()
lines = src.split("\n")

# Show context around line 157
for i in range(145, 175):
    if i < len(lines):
        print(f"{i+1}: {lines[i].rstrip()[:120]}")
