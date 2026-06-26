import os, glob

# Find theme selector/picker component
for path in glob.glob("src/**/*.jsx", recursive=True):
    content = open(path, encoding="utf-8").read()
    if "theme" in content.lower() and ("swatch" in content.lower() or "preview" in content.lower() or "color" in content.lower()):
        if "map" in content and ("theme" in content):
            print(f"\nFile: {path}")
            # Find the preview color line
            lines = content.split("\n")
            for i, line in enumerate(lines):
                if "swatch" in line.lower() or "preview" in line.lower() or "primary" in line.lower():
                    print(f"  Line {i+1}: {line.strip()[:100]}")
