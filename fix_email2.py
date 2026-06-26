import os, glob

files = glob.glob("src/**/*.jsx", recursive=True) + glob.glob("src/**/*.js", recursive=True)
fixed = 0

for path in files:
    try:
        src = open(path, encoding="utf-8").read()
        if "hello@tryiteducations.net" in src:
            src = src.replace("hello@tryiteducations.net", "founder@tryiteducations.net")
            open(path, "w", encoding="utf-8").write(src)
            fixed += 1
            print(f"Fixed: {path}")
    except:
        pass

print(f"Total: {fixed} files updated to founder@tryiteducations.net")
