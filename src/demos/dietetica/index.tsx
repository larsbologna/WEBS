import { useEffect, useMemo, useState } from 'react'
import { Bike, Leaf, Minus, Plus, Search, ShoppingBasket, Store, Trash2, X, Timer, Scale, Check, Package } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { useCart, orderText, formatQty } from '../../shared/useCart'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Natural Market'
const G = '#2f4a2b', OR = '#d9822b', PAPER = '#f4efe3', KRAFT = '#e6d6b8'
type Cat = 'Frutos secos' | 'Semillas' | 'Harinas' | 'Cereales' | 'Legumbres' | 'Suplementos' | 'Endulzantes' | 'Especias'
type Tag = 'Sin TACC' | 'Vegano' | 'Orgánico' | 'Keto'
type Prod = { id: string; name: string; cat: Cat; kg?: number; unit?: number; unitLabel?: string; img: string; tags: Tag[]; off?: number; emoji: string }

const CATS: { c: Cat; e: string }[] = [
  { c: 'Frutos secos', e: '🥜' }, { c: 'Semillas', e: '🌻' }, { c: 'Harinas', e: '🌾' }, { c: 'Cereales', e: '🥣' },
  { c: 'Legumbres', e: '🫘' }, { c: 'Suplementos', e: '💪' }, { c: 'Endulzantes', e: '🍯' }, { c: 'Especias', e: '🌶️' },
]
const P: Prod[] = [
  { id: 'a1', name: 'Almendras peladas', cat: 'Frutos secos', kg: 21800, img: '1508061253366-f7da158b6d46', tags: ['Sin TACC', 'Vegano', 'Keto'], off: 15, emoji: '🌰' },
  { id: 'a2', name: 'Nueces mariposa', cat: 'Frutos secos', kg: 18900, img: '1574570068036-e97e8c8c24a1', tags: ['Sin TACC', 'Vegano', 'Keto'], emoji: '🌰' },
  { id: 'a3', name: 'Castañas de cajú', cat: 'Frutos secos', kg: 24500, img: '1563292769-4e05b684851a', tags: ['Sin TACC', 'Vegano'], emoji: '🥜' },
  { id: 'a4', name: 'Mix energético', cat: 'Frutos secos', kg: 16900, img: '1599599810769-bcde5a160d32', tags: ['Vegano'], off: 10, emoji: '🥜' },
  { id: 'a5', name: 'Pasas de uva morochas', cat: 'Frutos secos', kg: 7900, img: '1596097635121-14b63b7a0c19', tags: ['Sin TACC', 'Vegano'], emoji: '🍇' },
  { id: 's1', name: 'Semillas de chía', cat: 'Semillas', kg: 9800, img: '1615485500704-8e990f9900f7', tags: ['Sin TACC', 'Vegano', 'Orgánico', 'Keto'], emoji: '⚫' },
  { id: 's2', name: 'Semillas de lino', cat: 'Semillas', kg: 4900, img: '1590080876876-5674a9b9f1b3', tags: ['Sin TACC', 'Vegano', 'Keto'], emoji: '🟤' },
  { id: 's3', name: 'Girasol pelado', cat: 'Semillas', kg: 6200, img: '1515543904379-3d757afe72e4', tags: ['Sin TACC', 'Vegano'], off: 20, emoji: '🌻' },
  { id: 'h1', name: 'Harina de almendras', cat: 'Harinas', kg: 26900, img: '1574323347407-f5e1ad6d020b', tags: ['Sin TACC', 'Keto'], emoji: '🌾' },
  { id: 'h2', name: 'Harina integral orgánica', cat: 'Harinas', kg: 2900, img: '1509440159596-0249088772ff', tags: ['Orgánico', 'Vegano'], emoji: '🌾' },
  { id: 'h3', name: 'Premezcla sin TACC', cat: 'Harinas', kg: 5400, img: '1586201375761-83865001e31c', tags: ['Sin TACC'], emoji: '🌾' },
  { id: 'c1', name: 'Avena arrollada', cat: 'Cereales', kg: 3200, img: '1517093728432-a0440f8d45af', tags: ['Vegano'], emoji: '🥣' },
  { id: 'c2', name: 'Granola casera con miel', cat: 'Cereales', kg: 11900, img: '1490474418585-ba9bad8fd0ea', tags: [], off: 10, emoji: '🥣' },
  { id: 'l1', name: 'Lentejas', cat: 'Legumbres', kg: 3800, img: '1515942400420-2b98fed1f515', tags: ['Sin TACC', 'Vegano'], emoji: '🫘' },
  { id: 'l2', name: 'Garbanzos', cat: 'Legumbres', kg: 4200, img: '1515543237350-b3eea1ec8082', tags: ['Sin TACC', 'Vegano'], emoji: '🫘' },
  { id: 'u1', name: 'Proteína vegetal 1 kg', cat: 'Suplementos', unit: 32900, unitLabel: 'pote 1 kg', img: '1593095948071-474c5cc2989d', tags: ['Vegano', 'Sin TACC'], emoji: '💪' },
  { id: 'u2', name: 'Colágeno hidrolizado', cat: 'Suplementos', unit: 19800, unitLabel: 'pote 300 g', img: '1556228720-195a672e8a03', tags: ['Sin TACC'], emoji: '✨' },
  { id: 'u3', name: 'Spirulina en comprimidos', cat: 'Suplementos', unit: 14500, unitLabel: 'frasco x 100', img: '1584308666744-24d5c474f2ae', tags: ['Vegano', 'Orgánico'], emoji: '🌿' },
  { id: 'e1', name: 'Miel pura de abejas', cat: 'Endulzantes', unit: 8900, unitLabel: 'frasco 500 g', img: '1587049352846-4a222e784d38', tags: ['Sin TACC'], emoji: '🍯' },
  { id: 'e2', name: 'Azúcar mascabo', cat: 'Endulzantes', kg: 5600, img: '1581441363689-1f3c3c414635', tags: ['Vegano', 'Orgánico'], emoji: '🟫' },
  { id: 'x1', name: 'Cúrcuma molida', cat: 'Especias', kg: 14900, img: '1596040033229-a9821ebd058d', tags: ['Sin TACC', 'Vegano', 'Orgánico'], emoji: '🟡' },
  { id: 'x2', name: 'Pimentón ahumado', cat: 'Especias', kg: 16800, img: '1599909631178-4a5a4a6a3a32', tags: ['Sin TACC', 'Vegano'], emoji: '🔴' },
]
const WEIGHTS = [0.1, 0.25, 0.5, 1]
const TAGS: Tag[] = ['Sin TACC', 'Vegano', 'Orgánico', 'Keto']
const finalKg = (p: Prod) => (p.kg ?? 0) * (1 - (p.off ?? 0) / 100)
const finalUnit = (p: Prod) => (p.unit ?? 0) * (1 - (p.off ?? 0) / 100)

function useCountdown() {
  const end = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7)); d.setHours(23, 59, 59, 0); return d }, [])
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const s = Math.max(0, Math.floor((end.getTime() - now) / 1000))
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}

export default function Dietetica() {
  const cart = useCart('dietetica')
  const [cat, setCat] = useState<Cat | 'Todo'>('Todo')
  const [tags, setTags] = useState<Tag[]>([])
  const [q, setQ] = useState('')
  const [onlyOff, setOnlyOff] = useState(false)
  const [prod, setProd] = useState<Prod | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const cd = useCountdown()

  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const list = P.filter((p) => (cat === 'Todo' || p.cat === cat) && tags.every((t) => p.tags.includes(t)) && (!onlyOff || p.off) && (!q || norm(p.name + ' ' + p.cat).includes(norm(q))))
  const scrollShop = () => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })

  const quickAdd = (p: Prod) => {
    if (p.unit) { cart.add({ key: p.id, name: p.name, price: finalUnit(p), image: p.img, detail: p.unitLabel }); toast(`${p.name} agregado`) }
    else setProd(p)
  }

  return (
    <DemoShell slug="dietetica" fonts="family=Nunito:wght@400;600;700;800;900&family=Caveat:wght@600;700" themeColor={PAPER}
      className="pb-24" style={{ background: PAPER, color: '#26301f', fontFamily: 'Nunito, sans-serif', ['--fh' as string]: 'Caveat, cursive' }}>
      <header className="sticky top-0 z-40 bg-[#f4efe3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
          <div className="flex shrink-0 items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: G }}><Leaf className="h-5 w-5" /></div>
            <div className="leading-none"><div className="text-[17px] font-black tracking-tight" style={{ color: G }}>Natural</div><div className="font-(family-name:--fh) text-xl leading-none" style={{ color: OR }}>Market</div></div>
          </div>
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 ring-1 ring-black/5">
            <Search className="h-4 w-4 shrink-0 text-black/40" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setCat('Todo') }} onFocus={scrollShop} placeholder="Buscar…" className="h-10 w-full min-w-0 bg-transparent text-[15px] outline-none" />
            {q && <button onClick={() => setQ('')} aria-label="Limpiar"><X className="h-4 w-4" /></button>}
          </label>
          <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ background: OR }} aria-label="Ver pedido">
            <ShoppingBasket className="h-5 w-5" />
            {cart.lines.length > 0 && <span key={cart.lines.length} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold text-white" style={{ background: G }}>{cart.lines.length}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-3">
        <div className="relative overflow-hidden rounded-[32px]" style={{ background: G }}>
          <SmartImg eager src={img('1542838132-92c53300491e', 1400, 900)} alt="Productos naturales a granel" fallback={`linear-gradient(135deg,${G},#6b7f4a)`} className="absolute inset-0 h-full w-full opacity-40" />
          <div className="relative px-6 py-10 text-white sm:px-10 sm:py-16">
            <div className="animate-fade-up font-(family-name:--fh) text-2xl" style={{ color: '#f3c27a' }}>¡Hola, vecino! 🌿</div>
            <h1 className="animate-fade-up mt-1 text-[42px] font-black leading-[1] tracking-tight sm:text-6xl" style={{ animationDelay: '80ms' }}>Lo natural,<br />al peso justo.</h1>
            <p className="animate-fade-up mt-4 max-w-md text-[16px] text-white/85" style={{ animationDelay: '160ms' }}>Frutos secos, semillas, harinas y suplementos sueltos. Elegí cuántos gramos querés, armá tu pedido y te lo preparamos para retirar o enviar.</p>
            <div className="animate-fade-up mt-6 flex flex-wrap gap-2" style={{ animationDelay: '240ms' }}>
              <button onClick={scrollShop} className="rounded-full px-6 py-3.5 font-extrabold text-white shadow-lg transition active:scale-95" style={{ background: OR }}>Armar mi pedido</button>
              <button onClick={() => { setOnlyOff(true); scrollShop() }} className="rounded-full bg-white/15 px-6 py-3.5 font-extrabold backdrop-blur">Ver ofertas</button>
            </div>
            <div className="mt-7 flex flex-wrap gap-2 text-[13px] font-bold">
              {['🌾 Opciones sin TACC', '🌱 Veganos', '⚖️ Desde 100 g'].map((t) => <span key={t} className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA DE LA SEMANA */}
      <section className="mx-auto max-w-6xl px-5 pt-8">
        <Reveal className="relative overflow-hidden rounded-[28px] p-6 text-white" style={{ background: '#2b2b26', backgroundImage: 'radial-gradient(#ffffff08 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-(family-name:--fh) text-3xl" style={{ color: '#f3c27a' }}>Ofertas de la semana</div>
              <p className="text-[15px] text-white/80">Almendras 15% off · Girasol 20% off · Granola y mix 10% off</p>
            </div>
            <div className="flex items-center gap-2"><Timer className="h-5 w-5 text-white/60" />
              {[['d', cd.d], ['h', cd.h], ['m', cd.m], ['s', cd.s]].map(([l, v]) => (
                <div key={l as string} className="w-12 rounded-xl bg-white/10 py-1.5 text-center"><div className="text-xl font-black tabular-nums">{String(v).padStart(2, '0')}</div><div className="text-[10px] uppercase text-white/50">{l}</div></div>
              ))}
            </div>
          </div>
        </Reveal>
        <Tip className="mt-4">ofertas con cuenta regresiva generan urgencia. Las cambiás cada semana en minutos.</Tip>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <h2 className="text-2xl font-black" style={{ color: G }}>Categorías</h2>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
          {CATS.map(({ c, e }) => (
            <button key={c} onClick={() => { setCat(cat === c ? 'Todo' : c); scrollShop() }} className="flex w-[76px] shrink-0 flex-col items-center gap-1.5">
              <span className={cx('grid h-16 w-16 place-items-center rounded-2xl text-3xl transition', cat === c ? 'ring-2 ring-offset-2 ring-offset-[#f4efe3]' : '')} style={{ background: KRAFT, ...(cat === c ? { ['--tw-ring-color' as string]: OR } : {}) }}>{e}</span>
              <span className="text-center text-[12px] font-bold leading-tight">{c}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-black" style={{ color: G }}>{cat === 'Todo' ? (onlyOff ? 'Ofertas' : 'Todos los productos') : cat}</h2>
          <span className="text-sm font-semibold text-black/45">{list.length}</span>
        </div>
        <Tip className="mt-3 !mx-0">el cliente elige exactamente cuántos gramos quiere y ve el precio al instante. El pedido te llega listo para pesar.</Tip>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          <button onClick={() => setOnlyOff(!onlyOff)} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-extrabold ring-1 transition', onlyOff ? 'text-white ring-transparent' : 'bg-white ring-black/10')} style={onlyOff ? { background: OR } : undefined}>% Ofertas</button>
          {TAGS.map((t) => { const on = tags.includes(t); return <button key={t} onClick={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t])} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-extrabold ring-1 transition', on ? 'text-white ring-transparent' : 'bg-white ring-black/10')} style={on ? { background: G } : undefined}>{on && '✓ '}{t}</button> })}
          {cat !== 'Todo' && <button onClick={() => setCat('Todo')} className="shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-extrabold ring-1 ring-black/10">✕ {cat}</button>}
        </div>
        {list.length === 0 ? (
          <div className="mt-6 rounded-3xl bg-white p-8 text-center"><div className="text-4xl">🔎</div><p className="mt-2 font-extrabold">No encontramos productos</p><button onClick={() => { setCat('Todo'); setTags([]); setOnlyOff(false); setQ('') }} className="mt-3 rounded-full px-5 py-2.5 text-sm font-extrabold text-white" style={{ background: G }}>Ver todo</button></div>
        ) : (
          <div key={cat + tags.join() + onlyOff + q} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {list.map((p, i) => {
              const inCart = cart.lines.find((l) => l.key === p.id)
              return (
                <div key={p.id} className="animate-fade-up flex flex-col overflow-hidden rounded-3xl bg-white" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                  <button onClick={() => (p.unit ? quickAdd(p) : setProd(p))} className="relative block">
                    <SmartImg src={img(p.img, 400, 320)} alt={p.name} fallback={`linear-gradient(135deg,${KRAFT},#c9b28a)`} className="aspect-[5/4]" />
                    {p.off && <span className="absolute left-2 top-2 rotate-[-6deg] rounded-md px-2 py-0.5 font-(family-name:--fh) text-xl leading-tight text-white shadow" style={{ background: OR }}>-{p.off}%</span>}
                    <span className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg shadow-sm">{p.emoji}</span>
                  </button>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="text-[14px] font-extrabold leading-tight">{p.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1">{p.tags.slice(0, 2).map((t) => <span key={t} className="rounded bg-[#2f4a2b]/10 px-1.5 py-px text-[10px] font-bold" style={{ color: G }}>{t}</span>)}</div>
                    <div className="mt-auto pt-2">
                      {p.kg ? (
                        <div className="leading-tight"><span className="font-(family-name:--fh) text-[26px] leading-none" style={{ color: G }}>{money(finalKg(p))}</span><span className="text-[12px] font-bold text-black/50"> /kg</span>{p.off && <div className="text-[11px] text-black/40 line-through">{money(p.kg)}/kg</div>}</div>
                      ) : (
                        <div className="leading-tight"><span className="font-(family-name:--fh) text-[26px] leading-none" style={{ color: G }}>{money(finalUnit(p))}</span><div className="text-[11px] font-bold text-black/50">{p.unitLabel}</div></div>
                      )}
                      <button onClick={() => quickAdd(p)} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-extrabold text-white transition active:scale-95" style={{ background: inCart ? G : OR }}>
                        {inCart ? <><Check className="h-4 w-4" /> {p.kg ? formatQty(inCart.qty, 'kg') : `${inCart.qty} u.`}</> : p.kg ? <><Scale className="h-4 w-4" /> Elegir peso</> : <><Plus className="h-4 w-4" /> Agregar</>}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <Reveal className="grid gap-3 sm:grid-cols-3">
          {[{ i: Scale, t: 'Elegís por peso', d: 'Desde 100 g, lo que necesites.' }, { i: Package, t: 'Lo preparamos', d: 'Pesado y fraccionado en bolsas kraft compostables.' }, { i: Bike, t: 'Retirás o te lo enviamos', d: 'Envío en el día en Berazategui y Hudson.' }].map(({ i: I, t, d }) => (
            <div key={t} className="flex gap-3 rounded-3xl p-5" style={{ background: KRAFT }}><I className="h-7 w-7 shrink-0" style={{ color: G }} /><div><div className="font-extrabold">{t}</div><div className="text-[14px] text-black/65">{d}</div></div></div>
          ))}
        </Reveal>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-14 text-center">
        <div className="text-xl font-black" style={{ color: G }}>Natural <span className="font-(family-name:--fh) text-2xl" style={{ color: OR }}>Market</span></div>
        <p className="mt-1 text-[13px] text-black/55">Calle 146 N° 1580, Berazategui · Lun a sáb 9–13 / 16–20 h · @naturalmarket.bera</p>
      </footer>

      {cart.lines.length > 0 && !cartOpen && !prod && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full px-5 py-3.5 font-extrabold text-white shadow-2xl" style={{ background: G }}>
            <span>Mi pedido · {cart.lines.length}</span><span>{money(cart.total)}</span>
          </button>
        </div>
      )}

      <WeightSheet p={prod} onClose={() => setProd(null)} current={prod ? cart.lines.find((l) => l.key === prod.id)?.qty : undefined}
        onSet={(p, kg) => {
          const cur = cart.lines.find((l) => l.key === p.id)
          if (cur) cart.remove(p.id)
          cart.add({ key: p.id, name: p.name, price: finalKg(p), image: p.img, unit: 'kg', step: 0.05, qty: kg })
          toast(`${formatQty(kg, 'kg')} de ${p.name.toLowerCase()}`); setProd(null)
        }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </DemoShell>
  )
}

function WeightSheet({ p, onClose, onSet, current }: { p: Prod | null; onClose: () => void; onSet: (p: Prod, kg: number) => void; current?: number }) {
  const [kg, setKg] = useState(0.25)
  const [last, setLast] = useState<string | null>(null)
  if (p && p.id !== last) { setLast(p.id); setKg(current ?? 0.25) }
  if (!p) return null
  const price = finalKg(p) * kg
  return (
    <Sheet open onClose={onClose} className="bg-[#f4efe3]" label="Elegí el peso">
      <div className="overflow-y-auto" style={{ fontFamily: 'Nunito, sans-serif', color: '#26301f' }}>
        <div className="relative">
          <SmartImg src={img(p.img, 900, 500)} alt={p.name} fallback={`linear-gradient(135deg,${KRAFT},#c9b28a)`} className="aspect-[9/5]" />
          <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-5">
          <div className="text-2xl font-black">{p.name}</div>
          <div className="mt-1 flex flex-wrap gap-1">{p.tags.map((t) => <span key={t} className="rounded bg-[#2f4a2b]/10 px-2 py-0.5 text-[11px] font-bold" style={{ color: G }}>{t}</span>)}</div>
          <div className="mt-2 text-[14px] text-black/60">{money(finalKg(p))} el kilo{p.off ? ` (antes ${money(p.kg!)})` : ''}</div>
          <div className="mt-5 text-sm font-extrabold">¿Cuánto querés?</div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {WEIGHTS.map((w) => <button key={w} onClick={() => setKg(w)} className={cx('rounded-2xl py-3 text-[15px] font-extrabold ring-1 transition', Math.abs(kg - w) < 0.001 ? 'text-white ring-transparent' : 'bg-white ring-black/10')} style={Math.abs(kg - w) < 0.001 ? { background: G } : undefined}>{formatQty(w, 'kg')}</button>)}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-3xl bg-white p-3">
            <button onClick={() => setKg((k) => Math.max(0.05, Math.round((k - 0.05) * 100) / 100))} className="grid h-12 w-12 place-items-center rounded-full" style={{ background: KRAFT }} aria-label="Restar 50 g"><Minus className="h-5 w-5" /></button>
            <div className="text-center"><div className="font-(family-name:--fh) text-4xl leading-none" style={{ color: G }}>{formatQty(kg, 'kg')}</div><div className="text-[11px] font-bold text-black/45">de a 50 g</div></div>
            <button onClick={() => setKg((k) => Math.min(5, Math.round((k + 0.05) * 100) / 100))} className="grid h-12 w-12 place-items-center rounded-full" style={{ background: KRAFT }} aria-label="Sumar 50 g"><Plus className="h-5 w-5" /></button>
          </div>
          <button onClick={() => onSet(p, kg)} className="mt-5 flex w-full items-center justify-between rounded-full px-6 py-4 font-extrabold text-white active:scale-[.98]" style={{ background: OR, marginBottom: 'env(safe-area-inset-bottom)' }}>
            <span>{current ? 'Actualizar pedido' : 'Agregar al pedido'}</span><span>{money(price)}</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  const [mode, setMode] = useState<'retiro' | 'envio'>('retiro')
  const [name, setName] = useState('')
  const [addr, setAddr] = useState('')
  const [prep, setPrep] = useState(false)
  const [prepStep, setPrepStep] = useState(0)
  const [wa, setWa] = useState(false)
  const fee = mode === 'envio' && cart.total < 25000 ? 1800 : 0
  const valid = name.trim().length > 1 && (mode === 'retiro' || addr.trim().length > 3)
  const start = () => {
    setPrep(true); setPrepStep(0)
    ;[1, 2, 3].forEach((s) => setTimeout(() => setPrepStep(s), s * 900))
  }
  return (
    <>
      <Sheet open={open} onClose={() => { onClose(); setPrep(false) }} side="right" className="bg-[#f4efe3]" label="Mi pedido">
        <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Nunito, sans-serif', color: '#26301f' }}>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="text-2xl font-black" style={{ color: G }}>Mi pedido</div>
            <button onClick={() => { onClose(); setPrep(false) }} className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Cerrar"><X className="h-5 w-5" /></button>
          </div>
          {prep ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="rounded-3xl bg-white p-6 text-center">
                <div className="text-5xl">{prepStep < 3 ? '⚖️' : '🛍️'}</div>
                <div className="mt-3 text-xl font-black">{prepStep < 3 ? 'Simulando tu pedido…' : '¡Pedido listo para enviar!'}</div>
                <ul className="mx-auto mt-5 max-w-xs space-y-3 text-left text-[15px]">
                  {['Pedido recibido', 'Pesando y fraccionando', 'Embolsado en kraft'].map((t, i) => (
                    <li key={t} className={cx('flex items-center gap-3 transition-opacity duration-500', prepStep > i ? 'opacity-100' : 'opacity-30')}>
                      <span className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: prepStep > i ? G : '#0002' }}><Check className="h-4 w-4" /></span>{t}
                    </li>
                  ))}
                </ul>
                {prepStep >= 3 && (
                  <div className="animate-fade-up mt-6 space-y-2">
                    <button onClick={() => setWa(true)} className="w-full rounded-full bg-[#25d366] py-3.5 font-extrabold text-white">Enviar pedido por WhatsApp</button>
                    <button onClick={() => setPrep(false)} className="w-full py-2 text-sm font-bold underline">Volver al pedido</button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-[12px] text-black/45">Demostración: muestra al cliente cómo avanza su pedido.</p>
            </div>
          ) : cart.lines.length === 0 ? (
            <div className="grid flex-1 place-items-center p-8 text-center"><div><div className="text-5xl">🧺</div><p className="mt-3 font-extrabold">Tu canasta está vacía</p><button onClick={onClose} className="mt-4 rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: G }}>Ver productos</button></div></div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 pb-5">
                <ul className="divide-y divide-black/5 rounded-3xl bg-white px-4">
                  {cart.lines.map((l) => (
                    <li key={l.key} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-extrabold">{l.name}</div>
                        <div className="text-[12px] text-black/50">{l.unit === 'kg' ? `${money(l.price)}/kg` : l.detail}</div>
                        <div className="font-bold" style={{ color: G }}>{money(l.price * l.qty)}</div>
                      </div>
                      <div className="flex items-center rounded-full" style={{ background: KRAFT }}>
                        <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty <= (l.step ?? 1) ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                        <span className="min-w-12 text-center text-[13px] font-extrabold">{l.unit === 'kg' ? formatQty(l.qty, 'kg') : l.qty}</span>
                        <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2">
                  {(['retiro', 'envio'] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={cx('flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-extrabold ring-1', mode === m ? 'text-white ring-transparent' : 'bg-white ring-black/10')} style={mode === m ? { background: G } : undefined}>{m === 'retiro' ? <><Store className="h-4 w-4" /> Retiro</> : <><Bike className="h-4 w-4" /> Envío</>}</button>)}
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-black/5 focus:ring-[#2f4a2b]" />
                {mode === 'envio' && <input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Dirección" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-black/5 focus:ring-[#2f4a2b]" />}
              </div>
              <div className="border-t border-black/5 bg-white p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
                {mode === 'envio' && <div className="flex justify-between text-sm"><span>Envío</span><span>{fee ? money(fee) : 'Gratis'}</span></div>}
                <div className="flex justify-between text-xl font-black"><span>Total aprox.</span><span>{money(cart.total + fee)}</span></div>
                <p className="text-[11px] text-black/45">El total final puede variar levemente según el pesaje.</p>
                <button disabled={!valid} onClick={start} className="mt-3 w-full rounded-full py-4 font-extrabold text-white transition disabled:opacity-35" style={{ background: OR }}>{valid ? 'Confirmar pedido' : `Completá tu nombre${mode === 'envio' ? ' y dirección' : ''}`}</button>
              </div>
            </>
          )}
        </div>
      </Sheet>
      <WhatsAppSim open={wa} onClose={() => setWa(false)} business={BIZ}
        message={orderText(BIZ, cart.lines, cart.total + fee, ['', `👤 ${name}`, mode === 'retiro' ? '🏪 Retiro en el local' : `🛵 Envío a: ${addr}`])}
        onSent={() => setTimeout(() => { cart.clear(); setPrep(false); onClose() }, 500)} />
    </>
  )
}
