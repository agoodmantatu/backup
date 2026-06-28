import os

# FIX 1: RoleSelectPage institution home
with open('src/pages/role-select/RoleSelectPage.jsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace("home:'/centre/dashboard'", "home:'/institution'")
c = c.replace("home:'/centre'", "home:'/institution'")
with open('src/pages/role-select/RoleSelectPage.jsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('OK RoleSelectPage fixed')

# Find Onboarding actual location
print('Searching for Onboarding...')
for root, dirs, files in os.walk('src/pages'):
    for fname in files:
        if 'nboarding' in fname and fname.endswith('.jsx'):
            print('FOUND:', os.path.join(root, fname))

# Fix App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# Add centre redirects
if "path=\"/centre/dashboard\"" not in app:
    redirect = "<Route path='/centre/dashboard' element={<Navigate to='/institution' replace/>}/>\n            <Route path='/centre' element={<Navigate to='/institution' replace/>}/>\n            "
    app = app.replace("<Route path='/institution'", redirect + "<Route path='/institution'", 1)
    print('OK centre redirects added')
else:
    print('SKIP redirects exist')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

# Check z-index wrapper
print('zIndex wrapper:', 'zIndex:1' in app and 'AnimatePresence' in app)
