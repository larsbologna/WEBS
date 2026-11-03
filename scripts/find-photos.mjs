// Busca fotos en Unsplash para cada producto de scripts/photo-queries.json y muestra
// candidatas (id + descripción). Herramienta de apoyo: se corre en GitHub Actions.
import { readFileSync } from 'node:fs'

const queries = JSON.parse(readFileSync(new URL('./photo-queries.json', import.meta.url), 'utf8'))
const ID = /images\.unsplash\.com\/photo-(\d{10,13}-[0-9a-f]{12})/

for (const [demo, id, q] of queries) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=12`
  try {
    const res = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0 showroom-photo-finder' } })
    if (!res.ok) {
      console.log(`${demo}/${id}\t${q}\tERROR ${res.status}`)
      continue
    }
    const data = await res.json()
    const found = (data.results ?? [])
      .filter((r) => !r.premium && !r.plus && ID.test(r.urls?.raw ?? ''))
      .slice(0, 6)
      .map((r) => `${r.urls.raw.match(ID)[1]} (${(r.alt_description ?? '').slice(0, 60)})`)
    console.log(`${demo}/${id}\t${q}\t${found.join(' || ') || 'SIN RESULTADOS'}`)
  } catch (e) {
    console.log(`${demo}/${id}\t${q}\tERROR ${e.message}`)
  }
  await new Promise((r) => setTimeout(r, 400))
}
