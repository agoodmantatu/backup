# Check game engine
try:
    src = open('src/lib/gameEngine.js', encoding='utf-8').read()
    print("gameEngine.js:", len(src), "chars")
    print(src[:500])
except Exception as e:
    print("gameEngine.js:", e)

try:
    src = open('src/lib/levelSystem.js', encoding='utf-8').read()
    print("\nlevelSystem.js:", len(src), "chars")
    print(src[:300])
except Exception as e:
    print("levelSystem.js:", e)
