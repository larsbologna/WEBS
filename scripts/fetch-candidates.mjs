// Busca fotos candidatas para cada producto de scripts/photo-queries.json y baja
// miniaturas a scripts/candidates/ para elegir (temporal, se corre en GitHub Actions).
// Fuentes: Unsplash (solo fotos gratuitas, licencia Unsplash) y Wikimedia Commons
// (solo CC0 / dominio público).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const queries = JSON.parse(readFileSync('scripts/photo-queries.json', 'utf8'))
mkdirSync('scripts/candidates', { recursive: true })
const meta = {}
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
const BOT = 'showroom-photo-fetch/1.0 (github.com/larsbologna/WEBS)'
const get = (url, ms = 15000, ua = UA) => fetch(url, { headers: { 'user-agent': ua }, signal: AbortSignal.timeout(ms) })

async function unsplash(q) {
  try {
    const res = await get(`https://unsplash.com/s/photos/${encodeURIComponent(q.replace(/\s+/g, '-'))}?license=free`)
    if (!res.ok) return console.log(`unsplash ${q}: ${res.status}`), []
    const html = await res.text()
    const ids = [...new Set([...html.matchAll(/images\.unsplash\.com\/photo-(\d{10,13}-[0-9a-f]{12})/g)].map((m) => m[1]))]
    return ids.slice(0, 8).map((id) => ({ src: 'unsplash', id, thumb: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=300&h=300&q=60` }))
  } catch (e) {
    return console.log(`unsplash ${q}: ${e.message}`), []
  }
}

async function commons(q) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=30&gsrsearch=${encodeURIComponent(`${q} filetype:bitmap`)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800`
    const res = await get(api, 20000, BOT)
    if (!res.ok) return console.log(`commons ${q}: ${res.status}`), []
    const pages = Object.values((await res.json()).query?.pages ?? {})
    return pages
      .map((p) => ({ p, ii: p.imageinfo?.[0] }))
      .filter(({ ii }) => ii && /^(cc0|public domain|pd\b|pd-)/i.test(ii.extmetadata?.LicenseShortName?.value ?? ''))
      .slice(0, 4)
      .map(({ p, ii }) => ({ src: 'commons', title: p.title, url: ii.thumburl, license: ii.extmetadata.LicenseShortName.value, thumb: ii.thumburl }))
  } catch (e) {
    return console.log(`commons ${q}: ${e.message}`), []
  }
}

async function one([demo, pid, q]) {
  const key = `${demo}/${pid}`
  const found = [...(await unsplash(q)), ...(await commons(q))]
  meta[key] = []
  let k = 0
  for (const c of found) {
    if (k >= 9) break
    try {
      const t = await get(c.thumb, 15000, c.src === 'commons' ? BOT : UA)
      if (!t.ok || !(t.headers.get('content-type') ?? '').startsWith('image/')) continue
      const buf = Buffer.from(await t.arrayBuffer())
      if (buf.length < 3000) continue
      writeFileSync(`scripts/candidates/${demo}-${pid}-${k}.jpg`, buf)
      meta[key].push({ k, ...c })
      k++
    } catch {
      /* siguiente */
    }
  }
  console.log(`${key} (${q}): ${k} candidatas`)
}

const queue = [...queries]
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await one(queue.shift()) }))
writeFileSync('scripts/candidates/meta.json', JSON.stringify(meta, null, 1))
