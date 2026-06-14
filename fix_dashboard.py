import sys, os

files = [
    r"E:\Tatu\src\pages\Dashboard.jsx",
    r"E:\Tatu\src\pages\mentor\MentorHub.jsx",
    r"E:\Tatu\src\pages\centre\CentreDashboard.jsx",
    r"E:\Tatu\src\pages\family\FamilyHub.jsx",
]

LOADER = '''  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',
      justifyContent:'center',background:'linear-gradient(135deg,#1E3A5F,#0F2140)'}}>
      <p style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif',fontSize:18}}>Loading...</p>
    </div>
  )'''

for path in files:
    if not os.path.exists(path):
        print(f"SKIP: {path}")
        continue
    c = open(path, encoding='utf-8').read()

    # Fix useAuth to include loading
    if '{ user }' in c and 'loading' not in c:
        c = c.replace('const { user } = useAuth()', 'const { user, loading } = useAuth()')
        c = c.replace('const {user} = useAuth()', 'const { user, loading } = useAuth()')

    # Add loading check before null check
    if 'if (!user) return null' in c and 'loading' not in c:
        c = c.replace(
            'if (!user) return null',
            LOADER + '\n  if (!user) return null'
        )
    elif '  if (!user) return null' in c and 'if (loading)' not in c:
        c = c.replace(
            '  if (!user) return null',
            LOADER + '\n  if (!user) return null'
        )

    open(path, 'w', encoding='utf-8').write(c)
    print(f"FIXED: {path}")

print("Done")
