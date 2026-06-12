/**
 * TryIT — Auto-Fix Missing Imports v2
 * Now handles BOTH:
 *   import X from '...'              (static)
 *   lazy(() => import('...'))        (dynamic, used by routes.jsx)
 */
const fs   = require('fs')
const path = require('path')
const ROOT = process.cwd()
const SRC  = path.join(ROOT, 'src')

const EXTS = ['.jsx','.js','.tsx','.ts']
const visited = new Set()
const created = []
const errors  = []

function resolveFile(basePath) {
  for (const ext of EXTS) if (fs.existsSync(basePath + ext)) return basePath + ext
  for (const ext of EXTS) if (fs.existsSync(path.join(basePath, 'index' + ext))) return path.join(basePath, 'index' + ext)
  return null
}
function existsAsModule(basePath) {
  return resolveFile(basePath) !== null || fs.existsSync(basePath)
}

// Parse BOTH static imports AND dynamic import() calls
function parseImports(content) {
  const imports = []

  // Static: import {a,b} / import X / import * as X from '...'
  const staticRe = /import\s+([^'";]+?)\s+from\s+['"](\.[^'"]+)['"]/g
  let m
  while ((m = staticRe.exec(content)) !== null) {
    const clause = m[1].trim(), source = m[2]
    const names = { default: null, named: [], namespace: null }
    const nsMatch = clause.match(/\*\s+as\s+(\w+)/)
    if (nsMatch) { names.namespace = nsMatch[1]; imports.push({ source, names }); continue }
    const namedMatch = clause.match(/\{([^}]*)\}/)
    if (namedMatch) {
      names.named = namedMatch[1].split(',').map(s=>s.trim()).filter(Boolean)
        .map(s => { const parts = s.split(/\s+as\s+/); return parts[parts.length-1].trim() })
    }
    const defaultMatch = clause.match(/^(\w+)/)
    if (defaultMatch && !clause.startsWith('{')) names.default = defaultMatch[1]
    imports.push({ source, names })
  }

  // Dynamic: import('...')  — used inside lazy() — always treated as default export
  const dynamicRe = /import\(\s*['"](\.[^'"]+)['"]\s*\)/g
  while ((m = dynamicRe.exec(content)) !== null) {
    imports.push({ source: m[1], names: { default: 'LazyComponent', named: [], namespace: null } })
  }

  return imports
}

function stubForName(name) {
  if (name.endsWith('Provider')) return `export function ${name}({ children }) { return children }`
  if (/^use[A-Z]/.test(name))    return `export function ${name}() { return {} }`
  if (name.endsWith('Context'))  return `import { createContext } from 'react'\nexport const ${name} = createContext({})`
  if (/^[A-Z][A-Z0-9_]+$/.test(name)) return (/S$/.test(name) || name.includes('LIST')) ? `export const ${name} = []` : `export const ${name} = {}`
  if (/^[A-Z]/.test(name)) return `export function ${name}(props) { return null }`
  return `export function ${name}(...args) { return {} }`
}

function isPageOrComponent(filePath) {
  return filePath.includes('/pages/') || filePath.includes('/components/')
}

function stubFileContent(filePath, importsIntoIt) {
  const isComponent = isPageOrComponent(filePath)
  let out = ''
  const exportedNames = new Set()
  for (const { names } of importsIntoIt) {
    if (names.default) exportedNames.add('__DEFAULT__')
    for (const n of names.named) exportedNames.add(n)
  }
  for (const name of exportedNames) {
    if (name === '__DEFAULT__') continue
    out += stubForName(name) + '\n'
  }
  if (exportedNames.has('__DEFAULT__')) {
    if (isComponent) {
      const compName = path.basename(filePath).replace(/\.(jsx|js|tsx|ts)$/, '').replace(/[^a-zA-Z0-9]/g,'')
      out += `
import { useNavigate } from 'react-router-dom'
export default function ${compName || 'StubPage'}() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:40 }}>
      <p style={{ fontSize:48, marginBottom:12 }}>🚧</p>
      <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#1E3A5F', marginBottom:8 }}>Coming Soon</h2>
      <p style={{ color:'#94A3B8', fontSize:14, marginBottom:20, maxWidth:320 }}>
        This page (${compName || 'page'}) is being built. Check back soon!
      </p>
      <button onClick={()=>navigate('/dashboard')} style={{ background:'linear-gradient(135deg,#1E3A5F,#0F2140)', border:'none', borderRadius:14, padding:'12px 24px', color:'#D4AF37', fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer' }}>
        ← Back to Dashboard
      </button>
    </div>
  )
}
`
    } else {
      out += `export default {}\n`
    }
  }
  if (!out.trim()) out = '// auto-generated stub\nexport default {}\n'
  return out
}

function processFile(filePath) {
  if (visited.has(filePath)) return
  visited.add(filePath)
  if (!fs.existsSync(filePath)) return
  let content
  try { content = fs.readFileSync(filePath, 'utf8') } catch { return }

  const imports = parseImports(content)
  const dir = path.dirname(filePath)
  const byTarget = {}
  for (const imp of imports) {
    const target = path.resolve(dir, imp.source)
    byTarget[target] = byTarget[target] || []
    byTarget[target].push(imp)
  }

  for (const [target, importsIntoIt] of Object.entries(byTarget)) {
    if (existsAsModule(target)) {
      const resolved = resolveFile(target)
      if (resolved) processFile(resolved)
      continue
    }
    let stubPath = target
    const hasDefault = importsIntoIt.some(i => i.names.default)
    const isComp = isPageOrComponent(target) && hasDefault
    stubPath += isComp ? '.jsx' : '.js'
    if (fs.existsSync(stubPath)) continue

    const content = stubFileContent(stubPath, importsIntoIt)
    fs.mkdirSync(path.dirname(stubPath), { recursive: true })
    try {
      fs.writeFileSync(stubPath, content)
      created.push(path.relative(ROOT, stubPath))
      processFile(stubPath)
    } catch (e) {
      errors.push(`${stubPath}: ${e.message}`)
    }
  }
}

const entries = [
  path.join(SRC, 'main'),
  path.join(SRC, 'App'),
  path.join(SRC, 'app', 'routes'),
]
entries.forEach(e => {
  const f = resolveFile(e)
  if (f) processFile(f)
})

console.log(`\n${'='.repeat(55)}`)
console.log(`  TryIT Auto-Fix v2 — Missing Import Resolver`)
console.log(`${'='.repeat(55)}`)
console.log(`  Files scanned:  ${visited.size}`)
console.log(`  Stubs created:  ${created.length}`)
if (created.length) {
  console.log(`\n  Created stubs for:`)
  created.forEach(f => console.log(`    + ${f}`))
}
if (errors.length) {
  console.log(`\n  Errors:`)
  errors.forEach(e => console.log(`    ! ${e}`))
}
console.log(`\n  Run: npm run dev`)
console.log(`${'='.repeat(55)}\n`)
