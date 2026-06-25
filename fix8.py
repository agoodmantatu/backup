src = open('src/pages/student/StudentDashboard.jsx', encoding='utf-8').read()

# Fix 1: Add showUpgradeCTA state if missing
if "showUpgradeCTA" not in src:
    src = src.replace(
        "const [uploading,  setUploading]  = useState(false)",
        "const [uploading,  setUploading]  = useState(false)\n  const [showUpgradeCTA, setShowUpgradeCTA] = useState(true)"
    )
    print("Added showUpgradeCTA")
else:
    # It exists in wrong place - make sure it is inside component
    print("showUpgradeCTA exists, checking position")
    idx = src.find("showUpgradeCTA")
    print("Found at index:", idx)
    print("Context:", src[idx-100:idx+50])

open('src/pages/student/StudentDashboard.jsx', 'w', encoding='utf-8').write(src)
print("Done")
