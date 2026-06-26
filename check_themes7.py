src = open("src/lib/themes.js", encoding="utf-8").read()

# Show all free base themes with their colors
import re
themes = re.findall(r"id: '([^']+)'.*?primary: '([^']+)'.*?accent: '([^']+)'.*?bg: '([^']+)'.*?isDark: (false|true)", src, re.DOTALL)
print(f"{'ID':<20} {'PRIMARY':<12} {'ACCENT':<12} {'BG':<12} {'DARK'}")
print("-"*70)
for t in themes[:20]:
    print(f"{t[0]:<20} {t[1]:<12} {t[2]:<12} {t[3]:<12} {t[4]}")
