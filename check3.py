with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('export default function Onboarding')
# Get 60 lines after export
lines = c[idx:].split('\n')[:60]
for i, l in enumerate(lines):
    print(f'{idx//100 + i}: {l}')
