with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Find the main return div and add background
if "minHeight:'100vh'" not in c and 'min-h-screen' not in c:
    print('No background found - need to see the return statement')
else:
    print('Has minHeight')

# Check if it crashes on supabase
if 'supabase' in c:
    print('Uses supabase - may crash with mock user')
if 'user.id' in c or 'user?.id' in c:
    print('Accesses user.id - mock user must have id')
    
# Check first return statement
idx = c.find('return (')
if idx > 0:
    print('Return at char:', idx)
    print(c[idx:idx+200])
