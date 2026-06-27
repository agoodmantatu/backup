with open('src/App.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    '<AnimatePresence mode="wait">',
    '<div style={{position:"relative",zIndex:1,minHeight:"100vh"}}><AnimatePresence mode="wait">'
)
c = c.replace('</AnimatePresence>', '</AnimatePresence></div>', 1)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('OK zindex wrapper added')
