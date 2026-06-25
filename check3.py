# Check existing GamesHub
lines = open('src/pages/games/GamesHub.jsx', encoding='utf-8').readlines()
print(f"GamesHub.jsx: {len(lines)} lines")
for i,l in enumerate(lines[:50]):
    print(f"{i+1}: {l.rstrip()}")

print("\n--- gameEngine.js games list ---")
src = open('src/lib/gameEngine.js', encoding='utf-8').read()
import re
games = re.findall(r"id:['\"](\w+)['\"]", src)
print("Games found:", games[:20])

print("\n--- levelSystem themes ---")
src2 = open('src/lib/levelSystem.js', encoding='utf-8').read()
themes = re.findall(r"name:['\"]([^'\"]+)['\"]", src2)
print("Themes:", themes[:10])
