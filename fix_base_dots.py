src = open("src/components/landing/Navbar.jsx", encoding="utf-8").read()

old_dots = """const BASE_DOTS = [
  { id:'default',        darkId:'midnight',       color:'#D4AF37', label:'Classic'       },
  { id:'sunrise',        darkId:'sunrise-dark',   color:'#F59E0B', label:'Sunrise'       },
  { id:'ocean',          darkId:'ocean-dark',     color:'#0EA5E9', label:'Ocean Deep'    },
  { id:'midnight',       darkId:'midnight',       color:'#818CF8', label:'Midnight'      },
  { id:'high-contrast',  darkId:'high-contrast',  color:'#e2e2e2', label:'High Contrast' },
]"""

new_dots = """const BASE_DOTS = [
  { id:'blue-white',     darkId:'midnight',       color:'#2563EB', label:'Jasmine at Dawn'   },
  { id:'rose-white',     darkId:'pink-dark',      color:'#EC4899', label:'Lotus in Bloom'    },
  { id:'sky-fresh',      darkId:'midnight',       color:'#0EA5E9', label:'Andaman Sky'       },
  { id:'default',        darkId:'midnight',       color:'#C9A84C', label:'TryIT Classic'     },
  { id:'high-contrast',  darkId:'high-contrast',  color:'#6366F1', label:'Spashta Drishti'  },
]"""

if old_dots in src:
    src = src.replace(old_dots, new_dots)
    print("BASE_DOTS updated")
else:
    print("NOT FOUND")
    idx = src.find("BASE_DOTS")
    print(repr(src[idx:idx+300]))

open("src/components/landing/Navbar.jsx", "w", encoding="utf-8").write(src)
