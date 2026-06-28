with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Find main component return
idx = c.find('export default function')
if idx == -1:
    idx = c.find('export default')
print('Export at char:', idx)
print(c[idx:idx+100])

print('---RETURN STATEMENT---')
ret = c.find('return (', idx)
print(c[ret:ret+300])

print('---SUPABASE CALLS---')
for i, line in enumerate(c.split('\n')):
    if 'supabase' in line:
        print(f'Line {i}: {line.strip()}')

print('---HAS BACKGROUND---')
print('minHeight 100vh:', "minHeight:'100vh'" in c or "min-h-screen" in c)
print('background color:', 'background:' in c or 'bg-white' in c or 'bg-gray' in c)
