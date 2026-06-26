content = open("public/sitemap.xml", encoding="utf-8").read()

if not content.startswith("<?xml"):
    content = '<?xml version="1.0" encoding="UTF-8"?>\n' + content
    print("Added XML declaration")

content = content.strip()
open("public/sitemap.xml", "w", encoding="utf-8").write(content)
print("Sitemap fixed")
print("First 100 chars:", repr(content[:100]))
