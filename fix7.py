src = open('src/context/AuthContext.jsx', encoding='utf-8').read()

# Replace mock user ID with real Supabase UUID
src = src.replace(
    "id: 'usr-mock-001',",
    "id: '4e6fcfaf-4ec5-4fc6-8047-351d8f3c82b0',"
)
src = src.replace(
    "userId: 'TRY-TN-00001-2026',",
    "userId: '4e6fcfaf-4ec5-4fc6-8047-351d8f3c82b0',"
)

open('src/context/AuthContext.jsx', 'w', encoding='utf-8').write(src)
print('Mock user ID updated to real Supabase UUID')
