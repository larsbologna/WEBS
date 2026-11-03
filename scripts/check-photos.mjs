// Verifica que TODAS las fotos del sitio carguen. Si alguna falla, termina con error
// y la publicación se cancela: no se puede publicar una tienda con fotos rotas.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ID = /\b(\d{10,13}-[0-9a-f]{12})\b/g
const files = []
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|jsx?)$/.test(f)) files.push(p)
  }
}
walk('src')

const where = new Map()
for (const f of files) {
  const text = readFileSync(f, 'utf8')
  text.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(ID)) {
      if (!where.has(m[1])) where.set(m[1], [])
      where.get(m[1]).push(`${f}:${i + 1}`)
    }
  })
}

const ids = [...where.keys()]
console.log(`Verificando ${ids.length} fotos…`)
const broken = []
let i = 0
async function worker() {
  while (i < ids.length) {
    const id = ids[i++]
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=64&q=10`
    let ok = false
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      try {
        const res = await fetch(url, { method: 'GET' })
        ok = res.ok && (res.headers.get('content-type') ?? '').startsWith('image/')
        await res.arrayBuffer().catch(() => undefined)
      } catch {
        ok = false
      }
      if (!ok) await new Promise((r) => setTimeout(r, 800))
    }
    if (!ok) broken.push(id)
  }
}
await Promise.all(Array.from({ length: 8 }, worker))

if (broken.length) {
  console.error(`\n${broken.length} foto(s) no cargan:`)
  for (const id of broken) console.error(`  ${id}  →  ${where.get(id).join(', ')}`)
  process.exit(1)
}
console.log('Todas las fotos cargan.')
