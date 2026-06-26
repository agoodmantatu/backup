src = open("src/lib/themes.js", encoding="utf-8").read()

# Show full buildTheme function
idx = src.find("function buildTheme")
end = src.find("\nexport ", idx)
print("BUILD THEME FUNCTION:")
print(src[idx:idx+1500])
