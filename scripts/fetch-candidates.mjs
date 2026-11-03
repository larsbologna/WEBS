// Busca fotos candidatas en Openverse (solo licencias CC0 y dominio público: uso
// comercial sin atribución) para cada producto de scripts/photo-queries.json y baja
// miniaturas a scripts/candidates/ para elegir. Se corre en GitHub Actions.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const queries = JSON.parse(readFileSync('scripts/photo-queries.json', 'utf8'))
mkdirSync('scripts/candidates', { recursive: true })
const meta = {}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

for (const [demo, pid, q] of queries) {
  const key = `${demo}/${pid}`
  const api = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license=cc0,pdm&mature=false&page_size=12`
  let results = []
  for (let attempt = 0; attempt < 3 && !results.length; attempt++) {
    try {
      const res = await fetch(api, { headers: { 'user-agent': 'showroom-photo-fetch/1.0' }, signal: AbortSignal.timeout(20000) })
      if (res.ok) results = (await res.json()).results ?? []
      else { console.log(`${key}: búsqueda ${res.status}`); if (res.status === 429) await sleep(30000) }
    } catch (e) {
      console.log(`${key}: ${e.message}`)
    }
    if (!results.length) await sleep(3000)
  }
  meta[key] = []
  let k = 0
  for (const r of results) {
    if (k >= 6) break
    try {
      const t = await fetch(`https://api.openverse.org/v1/images/${r.id}/thumb/`, { signal: AbortSignal.timeout(15000) })
      const type = t.headers.get('content-type') ?? ''
      if (!t.ok || !type.startsWith('image/')) continue
      const buf = Buffer.from(await t.arrayBuffer())
      if (!r.url) continue
      if (buf.length < 3000) continue
      writeFileSync(`scripts/candidates/${demo}-${pid}-${k}.jpg`, buf)
      meta[key].push({ k, id: r.id, url: r.url, title: r.title, source: r.source, license: r.license, w: r.width, h: r.height })
      k++
    } catch {
      /* siguiente */
    }
  }
  console.log(`${key} (${q}): ${k} candidatas`)
  writeFileSync('scripts/candidates/meta.json', JSON.stringify(meta, null, 1))
  await sleep(700)
}
writeFileSync('scripts/candidates/meta.json', JSON.stringify(meta, null, 1))
