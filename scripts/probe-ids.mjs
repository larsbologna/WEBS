// Temporal: verifica ids de Unsplash propuestos y baja miniaturas para elegirlas a ojo.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
const rows = readFileSync('scripts/probe-ids.txt', 'utf8').trim().split('\n').map((l) => l.trim().split(/\s+/))
mkdirSync('scripts/probe', { recursive: true })
const ok = {}
const jobs = []
for (const [topic, ...ids] of rows) for (const id of [...new Set(ids)]) jobs.push([topic, id])
let i = 0
async function worker() {
  while (i < jobs.length) {
    const [topic, id] = jobs[i++]
    try {
      const r = await fetch(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=220&h=220&q=50`, { signal: AbortSignal.timeout(15000) })
      if (r.ok && (r.headers.get('content-type') ?? '').startsWith('image/')) {
        writeFileSync(`scripts/probe/${topic}--${id}.jpg`, Buffer.from(await r.arrayBuffer()))
        ;(ok[topic] ??= []).push(id)
      } else console.log(`${topic} ${id}: ${r.status}`)
    } catch (e) { console.log(`${topic} ${id}: ${e.message}`) }
  }
}
await Promise.all(Array.from({ length: 6 }, worker))
writeFileSync('scripts/probe/ok.json', JSON.stringify(ok, null, 1))
console.log(Object.entries(ok).map(([k, v]) => `${k}: ${v.length}`).join(' · '))
