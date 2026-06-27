src = open("src/components/landing/Navbar.jsx", encoding="utf-8").read()
lines = src.split("\n")
for i, line in enumerate(lines):
    if "d.color" in line or "darkId" in line or "DOTS" in line or "dots" in line or "= [" in line:
        if i < 140:
            print(f"{i+1}: {line.rstrip()[:120]}")
