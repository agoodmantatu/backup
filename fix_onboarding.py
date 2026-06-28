with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

# FIX 1: Admin role should not override localStorage role during onboarding
old = "  const role = user?.role || localStorage.getItem('tryit_role') || 'student'"
new = """  // Admin role must not override the selected role from RoleSelect
  const rawRole = user?.role === 'admin' ? null : user?.role
  const role = rawRole || localStorage.getItem('tryit_role') || 'student'"""
if old in c:
    c = c.replace(old, new)
    print('OK role fix applied')
else:
    print('SKIP role line not found - checking...')
    for i, l in enumerate(c.split('\n')):
        if 'tryit_role' in l:
            print(f'  Line {i}: {l}')

# FIX 2: Safety net - if steps is empty redirect to home
old2 = "  const total = steps.length\n  const current = step + 1"
new2 = """  const total = steps.length

  // Safety: unknown role gets redirected
  useEffect(() => {
    if (total === 0 && role) {
      const home = role === 'institution' ? '/institution'
        : role === 'mentor' ? '/mentor-hub'
        : role === 'family' ? '/student'
        : '/student'
      navigate(home, { replace: true })
    }
  }, [total, role])

  const current = step + 1"""

if old2 in c:
    c = c.replace(old2, new2)
    print('OK safety redirect added')
else:
    print('SKIP safety - checking...')
    for i, l in enumerate(c.split('\n')):
        if 'total = steps.length' in l:
            print(f'  Line {i}: {l}')

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done. Building...')
