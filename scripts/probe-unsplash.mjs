// Temporal: baja miniaturas de ids de Unsplash propuestos para revisarlas a ojo.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
const ids = readFileSync('scripts/unsplash-guesses.txt', 'utf8').split(/\s+/).filter(Boolean)
mkdirSync('scripts/probe', { recursive: true })
const ok = []
for (const id of ids) {
  try {
    const r = await fetch(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=240&h=240&q=55`, { signal: AbortSignal.timeout(15000) })
    if (r.ok && (r.headers.get('content-type') ?? '').startsWith('image/')) {
      writeFileSync(`scripts/probe/${id}.jpg`, Buffer.from(await r.arrayBuffer()))
      ok.push(id)
    } else console.log(`${id}: ${r.status}`)
  } catch (e) { console.log(`${id}: ${e.message}`) }
}
writeFileSync('scripts/probe/ok.json', JSON.stringify(ok))
console.log(`${ok.length}/${ids.length} existen`)
