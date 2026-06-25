import os
# Check existing games
games_files = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if 'game' in f.lower() or 'Game' in f:
            games_files.append(os.path.join(root, f))
for f in games_files:
    print(f)

print("\n--- StudentGames.jsx preview ---")
try:
    lines = open('src/pages/student/StudentGames.jsx', encoding='utf-8').readlines()
    for i,l in enumerate(lines[:30]):
        print(f"{i+1}: {l.rstrip()}")
except: print("Not found")
