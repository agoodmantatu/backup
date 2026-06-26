src = open("src/pages/student/StudentSettings.jsx", encoding="utf-8").read()
lines = src.split("\n")
for i, line in enumerate(lines):
    if "primaryDark" in line or "preview" in line.lower() or "gradient" in line.lower():
        if i > 380 and i < 420:
            print(f"{i+1}: {line.rstrip()[:120]}")
