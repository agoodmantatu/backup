files = [
    "src/pages/Landing.jsx",
    "src/components/landing/Footer.jsx"
]

for path in files:
    src = open(path, encoding="utf-8").read()
    src = src.replace("tryiteducations@gmail.com", "founder@tryiteducations.net")
    open(path, "w", encoding="utf-8").write(src)
    print(f"Fixed: {path}")
