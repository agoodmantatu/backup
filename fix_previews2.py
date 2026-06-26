src = open("src/pages/student/StudentSettings.jsx", encoding="utf-8").read()

old = "          ? `linear-gradient(135deg,${t.primaryDark||t.primary||'#0F2140'},${t.bg||'#1E293B'})`\n                            : `linear-gradient(135deg,${t.primary||'#1E3A5F'},${t.surface||'#fff'})`,\n                          display: 'flex',"

new = "          ? `linear-gradient(135deg,${t.primaryDark||t.primary||'#0F2140'},${t.accent||'#C9A84C'}88)`\n                            : `linear-gradient(135deg,${t.bg||'#F8FAFC'},${t.accent||'#2563EB'}44)`,\n                          display: 'flex',"

if old in src:
    src = src.replace(old, new)
    print("Fixed!")
else:
    print("Still not found - trying raw search")
    idx = src.find("t.primaryDark||t.primary||'#0F2140'")
    if idx > 0:
        chunk = src[idx-50:idx+300]
        print(repr(chunk))

open("src/pages/student/StudentSettings.jsx", "w", encoding="utf-8").write(src)
