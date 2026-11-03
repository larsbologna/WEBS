import { useMemo, useState } from 'react'
import { ChevronRight, Gift, Minus, Plus, ShoppingBag, SlidersHorizontal, Sparkles, Star, Trash2, X, Wand2, RotateCcw } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { useCart, orderText } from '../../shared/useCart'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Essence Store'
const PLUM = '#3d1530', GOLD = '#b08d57', IVORY = '#f7f3ee'
type Gender = 'Mujer' | 'Hombre' | 'Unisex'
type Family = 'Floral' | 'Amaderado' | 'Cítrico' | 'Oriental' | 'Fresco'
type P = { id: string; name: string; brand: string; gender: Gender; family: Family; price: number; was?: number; imgs: string[]; notes: [string, string, string]; dur: number; trail: number; when: string; best?: boolean; isNew?: boolean }

const BRANDS = ['Maison Lumière', 'Atelier Noir', 'Verdi Parfums', 'Solenne', 'Kairos']
const PERF: P[] = [
  { id: 'p1', name: 'Rose Éternelle', brand: 'Maison Lumière', gender: 'Mujer', family: 'Floral', price: 148000, imgs: ['1541643600914-78b084683601', '1594035910387-fea47794261f'], notes: ['Bergamota, pera', 'Rosa de Damasco, peonía', 'Almizcle blanco, cedro'], dur: 4, trail: 3, when: 'Día y noche', best: true },
  { id: 'p2', name: 'Noir Absolu', brand: 'Atelier Noir', gender: 'Hombre', family: 'Amaderado', price: 162000, imgs: ['1523293182086-7651a899d37f', '1557170334-a9632e77c6e4'], notes: ['Pimienta negra, cardamomo', 'Cuero, iris', 'Vetiver, oud, ámbar'], dur: 5, trail: 4, when: 'Noche', best: true },
  { id: 'p3', name: 'Agrumi di Capri', brand: 'Verdi Parfums', gender: 'Unisex', family: 'Cítrico', price: 118000, was: 139000, imgs: ['1592945403244-b3fbafd7f539', '1563170351-be82bc888aa4'], notes: ['Limón de Amalfi, mandarina', 'Neroli, petitgrain', 'Almizcle, madera clara'], dur: 3, trail: 2, when: 'Día · verano' },
  { id: 'p4', name: 'Velours d’Ambre', brand: 'Solenne', gender: 'Mujer', family: 'Oriental', price: 156000, imgs: ['1587017539504-67cfbddac569', '1615634260167-c8cdede054de'], notes: ['Azafrán, ciruela', 'Jazmín sambac, haba tonka', 'Vainilla de Madagascar, ámbar'], dur: 5, trail: 5, when: 'Noche · invierno', isNew: true },
  { id: 'p5', name: 'Océan Bleu', brand: 'Kairos', gender: 'Hombre', family: 'Fresco', price: 104000, was: 124000, imgs: ['1585386959984-a4155224a1ad', '1563170351-be82bc888aa4'], notes: ['Notas marinas, menta', 'Lavanda, salvia', 'Musgo de roble, almizcle'], dur: 3, trail: 3, when: 'Día · oficina', best: true },
  { id: 'p6', name: 'Jardin Secret', brand: 'Maison Lumière', gender: 'Mujer', family: 'Floral', price: 132000, imgs: ['1594035910387-fea47794261f', '1541643600914-78b084683601'], notes: ['Lichi, frambuesa', 'Fresia, magnolia', 'Pachulí suave, vainilla'], dur: 4, trail: 3, when: 'Día', isNew: true },
  { id: 'p7', name: 'Santal Royal', brand: 'Atelier Noir', gender: 'Unisex', family: 'Amaderado', price: 174000, imgs: ['1557170334-a9632e77c6e4', '1523293182086-7651a899d37f'], notes: ['Higo, cardamomo', 'Sándalo, cedro', 'Cuero suave, almizcle'], dur: 5, trail: 4, when: 'Todo el año' },
  { id: 'p8', name: 'Fleur de Sel', brand: 'Verdi Parfums', gender: 'Unisex', family: 'Fresco', price: 112000, imgs: ['1557170334-a9632e77c6e4', '1592945403244-b3fbafd7f539'], notes: ['Sal marina, pomelo', 'Salvia esclarea, ambreta', 'Madera de deriva, ámbar gris'], dur: 3, trail: 2, when: 'Día · verano' },
  { id: 'p9', name: 'Oud Mystique', brand: 'Kairos', gender: 'Hombre', family: 'Oriental', price: 189000, imgs: ['1563170351-be82bc888aa4', '1585386959984-a4155224a1ad'], notes: ['Incienso, canela', 'Rosa turca, oud', 'Benjuí, cuero, ámbar'], dur: 5, trail: 5, when: 'Noche · ocasiones especiales', isNew: true },
  { id: 'p10', name: 'Néroli Blanc', brand: 'Solenne', gender: 'Mujer', family: 'Cítrico', price: 109000, was: 128000, imgs: ['1615634260167-c8cdede054de', '1587017539504-67cfbddac569'], notes: ['Naranja amarga, neroli', 'Azahar, té blanco', 'Almizcle limpio'], dur: 3, trail: 2, when: 'Día' },
]
const SIZES = [{ ml: 50, f: 0.72 }, { ml: 100, f: 1 }]
const FAMILY_COLOR: Record<Family, string> = { Floral: '#e9b8c4', Amaderado: '#a07a55', Cítrico: '#f1cf6b', Oriental: '#9a4b5c', Fresco: '#8fc3d6' }
const priceFor = (p: P, i: number) => Math.round((p.price * SIZES[i].f) / 100) * 100

export default function Perfumeria() {
  const cart = useCart('perfumeria')
  const [gender, setGender] = useState<Gender | 'Todos'>('Todos')
  const [families, setFamilies] = useState<Family[]>([])
  const [brand, setBrand] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState(200000)
  const [filters, setFilters] = useState(false)
  const [prod, setProd] = useState<P | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [quiz, setQuiz] = useState(false)

  const list = useMemo(() => PERF.filter((p) => (gender === 'Todos' || p.gender === gender) && (!families.length || families.includes(p.family)) && (!brand || p.brand === brand) && p.price <= maxPrice), [gender, families, brand, maxPrice])
  const activeCount = families.length + (brand ? 1 : 0) + (maxPrice < 200000 ? 1 : 0)
  const goCat = (g: Gender | 'Todos', b: string | null = null) => { setGender(g); setBrand(b); setFamilies([]); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <DemoShell slug="perfumeria" fonts="family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400;1,6..96,500&family=Montserrat:wght@300;400;500;600" themeColor={IVORY}
      className="pb-24" style={{ background: IVORY, color: PLUM, fontFamily: 'Montserrat, sans-serif', ['--fd' as string]: '"Bodoni Moda", Didot, serif' }}>
      <header className="sticky top-0 z-40 border-b border-[#3d1530]/10 bg-[#f7f3ee]/90 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-5 py-3.5">
          <button onClick={() => setQuiz(true)} className="flex items-center gap-1.5 justify-self-start text-[11px] font-medium uppercase tracking-[.2em]"><Wand2 className="h-4 w-4" style={{ color: GOLD }} /> <span className="hidden sm:inline">Tu fragancia</span><span className="sm:hidden">Test</span></button>
          <div className="text-center font-(family-name:--fd) text-xl tracking-[.15em]">ESSENCE</div>
          <button onClick={() => setCartOpen(true)} className="relative justify-self-end" aria-label="Bolsa">
            <ShoppingBag className="h-6 w-6" strokeWidth={1.4} />
            {cart.count > 0 && <span key={cart.count} className="animate-pop absolute -right-2 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-semibold text-white" style={{ background: PLUM }}>{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-10 md:grid-cols-2 md:py-16">
          <div className="text-center md:text-left">
            <div className="animate-fade-up text-[11px] font-medium uppercase tracking-[.4em]" style={{ color: GOLD }}>Perfumería de autor</div>
            <h1 className="animate-fade-up mt-4 font-(family-name:--fd) text-[50px] leading-[1.02] sm:text-7xl" style={{ animationDelay: '80ms' }}>
              El aroma que<br /><i>te define.</i>
            </h1>
            <p className="animate-fade-up mx-auto mt-5 max-w-sm text-[15px] font-light leading-relaxed text-[#3d1530]/70 md:mx-0" style={{ animationDelay: '160ms' }}>
              Fragancias originales seleccionadas. Explorá por familia olfativa, conocé sus notas y recibí muestras de regalo con tu compra.
            </p>
            <div className="animate-fade-up mt-7 flex flex-wrap justify-center gap-3 md:justify-start" style={{ animationDelay: '240ms' }}>
              <button onClick={() => goCat('Todos')} className="px-7 py-4 text-[12px] font-medium uppercase tracking-[.25em] text-white transition active:scale-95" style={{ background: PLUM }}>Ver catálogo</button>
              <button onClick={() => setQuiz(true)} className="flex items-center gap-2 border px-7 py-4 text-[12px] font-medium uppercase tracking-[.25em]" style={{ borderColor: PLUM }}><Sparkles className="h-4 w-4" /> Encontrá la tuya</button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-full" style={{ background: 'linear-gradient(180deg,#ecdcc4,#d8bfa0)' }} />
            <SmartImg eager src={img('1541643600914-78b084683601', 800, 1000)} alt="Perfume Rose Éternelle" fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="relative aspect-[4/5] rounded-t-full" />
            <div className="absolute -right-1 top-1/3 bg-white px-4 py-3 shadow-xl">
              <div className="text-[10px] uppercase tracking-[.2em] text-[#3d1530]/50">Más vendido</div>
              <div className="font-(family-name:--fd) text-lg italic">Rose Éternelle</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="border-y border-[#3d1530]/10 bg-white/50 py-5">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-8 overflow-x-auto px-5 md:justify-between">
          {BRANDS.map((b) => (
            <button key={b} onClick={() => goCat('Todos', b)} className={cx('shrink-0 font-(family-name:--fd) text-lg italic tracking-wide transition', brand === b ? '' : 'opacity-50 hover:opacity-100')}>{b}</button>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid grid-cols-3 gap-3">
          {(['Mujer', 'Hombre', 'Unisex'] as Gender[]).map((g, i) => (
            <button key={g} onClick={() => goCat(g)} className="group text-center">
              <SmartImg src={img(['1594035910387-fea47794261f', '1523293182086-7651a899d37f', '1592945403244-b3fbafd7f539'][i], 400, 500)} alt={g} fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="aspect-[4/5] rounded-t-full transition duration-500 group-hover:opacity-90" />
              <div className="mt-2 font-(family-name:--fd) text-lg">{g}</div>
            </button>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal className="text-center">
          <div className="text-[11px] font-medium uppercase tracking-[.4em]" style={{ color: GOLD }}>Destacados</div>
          <h2 className="mt-2 font-(family-name:--fd) text-4xl">Los más elegidos</h2>
        </Reveal>
        <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2">
          {PERF.filter((p) => p.best || p.isNew).map((p) => (
            <button key={p.id} onClick={() => setProd(p)} className="w-48 shrink-0 snap-start bg-white p-3 text-left transition hover:shadow-lg">
              <SmartImg src={img(p.imgs[0], 400, 500)} alt={p.name} fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="aspect-[4/5]" />
              <div className="mt-3 text-[10px] uppercase tracking-[.2em] text-[#3d1530]/50">{p.brand}</div>
              <div className="font-(family-name:--fd) text-lg leading-tight">{p.name}</div>
              <div className="mt-1 text-sm font-medium">{money(p.price)}</div>
              <span className="mt-2 inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider text-white" style={{ background: p.isNew ? GOLD : PLUM }}>{p.isNew ? 'Nuevo' : 'Best seller'}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <Reveal className="relative overflow-hidden p-8 text-center text-[#f7f3ee] sm:p-12" style={{ background: PLUM }}>
          <Gift className="mx-auto h-7 w-7" style={{ color: GOLD }} />
          <div className="mt-3 font-(family-name:--fd) text-3xl sm:text-4xl">20% off en tu segunda fragancia</div>
          <p className="mx-auto mt-2 max-w-md text-[14px] font-light text-white/75">Y envoltorio de regalo sin cargo con tarjeta personalizada. Se aplica automáticamente en la bolsa.</p>
          <button onClick={() => goCat('Todos')} className="mt-5 border px-6 py-3 text-[12px] uppercase tracking-[.25em]" style={{ borderColor: GOLD, color: GOLD }}>Elegir fragancias</button>
        </Reveal>
        <Tip className="mt-4">promos que se aplican solas en el carrito: suben la venta sin que tengas que explicar cada condición.</Tip>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-16">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[.4em]" style={{ color: GOLD }}>Catálogo</div>
            <h2 className="mt-1 font-(family-name:--fd) text-4xl">{brand ?? (gender === 'Todos' ? 'Todas las fragancias' : `Para ${gender.toLowerCase()}`)}</h2>
          </div>
          <button onClick={() => setFilters(true)} className="flex shrink-0 items-center gap-2 border px-3 py-2 text-[12px] uppercase tracking-wider" style={{ borderColor: PLUM }}>
            <SlidersHorizontal className="h-4 w-4" /> Filtros{activeCount ? ` (${activeCount})` : ''}
          </button>
        </div>
        <Tip className="mt-4 !mx-0">cada perfume con su ficha: notas, duración y ocasión. El cliente llega al local sabiendo qué quiere probar, o lo compra directo.</Tip>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          {(['Todos', 'Mujer', 'Hombre', 'Unisex'] as const).map((g) => (
            <button key={g} onClick={() => setGender(g)} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] transition', gender === g ? 'text-white' : 'bg-white')} style={gender === g ? { background: PLUM } : undefined}>{g}</button>
          ))}
          {(Object.keys(FAMILY_COLOR) as Family[]).map((f) => {
            const on = families.includes(f)
            return <button key={f} onClick={() => setFamilies((x) => (on ? x.filter((y) => y !== f) : [...x, f]))} className={cx('flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] ring-1 transition', on ? 'bg-white ring-[#3d1530]' : 'ring-[#3d1530]/15')}><span className="h-2.5 w-2.5 rounded-full" style={{ background: FAMILY_COLOR[f] }} />{f}</button>
          })}
        </div>
        {(brand || activeCount > 0) && <button onClick={() => { setBrand(null); setFamilies([]); setMaxPrice(200000) }} className="mt-3 flex items-center gap-1 text-[12px] underline"><RotateCcw className="h-3 w-3" /> Limpiar filtros</button>}
        {list.length === 0 ? (
          <div className="py-14 text-center"><p className="font-(family-name:--fd) text-2xl">Sin resultados</p><p className="text-sm text-[#3d1530]/60">Probá quitando algún filtro.</p></div>
        ) : (
          <div key={gender + families.join() + brand + maxPrice} className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {list.map((p, i) => (
              <div key={p.id} className="animate-fade-up group flex flex-col bg-white p-3" style={{ animationDelay: `${i * 40}ms` }}>
                <button onClick={() => setProd(p)} className="relative block">
                  <SmartImg src={img(p.imgs[0], 400, 500)} alt={p.name} fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="aspect-[4/5] transition duration-500 group-hover:scale-[1.02]" />
                  {p.was && <span className="absolute left-0 top-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white" style={{ background: GOLD }}>-{Math.round((1 - p.price / p.was) * 100)}%</span>}
                </button>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[.15em] text-[#3d1530]/50"><span className="h-2 w-2 rounded-full" style={{ background: FAMILY_COLOR[p.family] }} />{p.family} · {p.gender}</div>
                <button onClick={() => setProd(p)} className="mt-0.5 text-left font-(family-name:--fd) text-[17px] leading-tight">{p.name}</button>
                <div className="text-[12px] italic text-[#3d1530]/60">{p.brand}</div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-sm font-medium leading-tight">{money(p.price)}{p.was && <span className="block text-[11px] font-normal text-[#3d1530]/40 line-through">{money(p.was)}</span>}</div>
                  <button onClick={() => { cart.add({ key: `${p.id}-100`, name: p.name, price: p.price, image: p.imgs[0], detail: `${p.brand} · 100 ml` }); toast(`${p.name} en tu bolsa`) }} className="grid h-8 w-8 place-items-center rounded-full text-white transition active:scale-90" style={{ background: PLUM }} aria-label={`Agregar ${p.name}`}><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <div className="grid gap-px bg-[#3d1530]/10 sm:grid-cols-3">
          {[['100% originales', 'Con sello y factura'], ['Muestras de regalo', 'En cada compra'], ['Asesoramiento', 'Por WhatsApp o en el local']].map(([a, b]) => (
            <div key={a} className="bg-[#f7f3ee] p-5 text-center"><div className="font-(family-name:--fd) text-xl italic">{a}</div><div className="text-[13px] text-[#3d1530]/60">{b}</div></div>
          ))}
        </div>
      </section>

      <footer className="px-5 py-14 text-center">
        <div className="font-(family-name:--fd) text-2xl tracking-[.2em]">ESSENCE</div>
        <p className="mt-1 text-[13px] text-[#3d1530]/55">Calle 14 N° 4930, Berazategui · Lun a sáb 9:30–20:30 · @essence.store</p>
      </footer>

      <FilterSheet open={filters} onClose={() => setFilters(false)} {...{ families, setFamilies, brand, setBrand, maxPrice, setMaxPrice }} count={list.length} />
      <ProductSheet p={prod} onClose={() => setProd(null)} onAdd={(l) => { cart.add(l); toast(`${l.name} en tu bolsa`); setProd(null) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
      <Quiz open={quiz} onClose={() => setQuiz(false)} onPick={(p) => { setQuiz(false); setProd(p) }} />
    </DemoShell>
  )
}

function FilterSheet({ open, onClose, families, setFamilies, brand, setBrand, maxPrice, setMaxPrice, count }: { open: boolean; onClose: () => void; families: Family[]; setFamilies: (f: Family[]) => void; brand: string | null; setBrand: (b: string | null) => void; maxPrice: number; setMaxPrice: (n: number) => void; count: number }) {
  return (
    <Sheet open={open} onClose={onClose} className="bg-[#f7f3ee]" label="Filtros">
      <div className="overflow-y-auto p-5" style={{ fontFamily: 'Montserrat, sans-serif', color: PLUM }}>
        <div className="flex items-center justify-between"><div className="font-(family-name:--fd) text-2xl">Filtros</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        <div className="mt-5 text-[11px] uppercase tracking-[.25em] text-[#3d1530]/60">Familia olfativa</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(FAMILY_COLOR) as Family[]).map((f) => { const on = families.includes(f); return <button key={f} onClick={() => setFamilies(on ? families.filter((y) => y !== f) : [...families, f])} className={cx('flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] ring-1', on ? 'bg-white ring-[#3d1530]' : 'ring-[#3d1530]/15')}><span className="h-2.5 w-2.5 rounded-full" style={{ background: FAMILY_COLOR[f] }} />{f}</button> })}
        </div>
        <div className="mt-5 text-[11px] uppercase tracking-[.25em] text-[#3d1530]/60">Marca</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {BRANDS.map((b) => <button key={b} onClick={() => setBrand(brand === b ? null : b)} className={cx('rounded-full px-4 py-2 font-(family-name:--fd) text-[14px] italic ring-1', brand === b ? 'bg-white ring-[#3d1530]' : 'ring-[#3d1530]/15')}>{b}</button>)}
        </div>
        <div className="mt-5 flex justify-between text-[11px] uppercase tracking-[.25em] text-[#3d1530]/60"><span>Precio máximo</span><span className="font-semibold text-[#3d1530]">{money(maxPrice)}</span></div>
        <input type="range" min={100000} max={200000} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="mt-3 w-full accent-[#3d1530]" aria-label="Precio máximo" />
        <div className="mt-6 grid grid-cols-2 gap-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <button onClick={() => { setFamilies([]); setBrand(null); setMaxPrice(200000) }} className="border py-3.5 text-[12px] uppercase tracking-[.2em]" style={{ borderColor: PLUM }}>Limpiar</button>
          <button onClick={onClose} className="py-3.5 text-[12px] uppercase tracking-[.2em] text-white" style={{ background: PLUM }}>Ver {count}</button>
        </div>
      </div>
    </Sheet>
  )
}

function Bars({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[12px]"><span className="w-20 uppercase tracking-wider text-[#3d1530]/60">{label}</span>
      <div className="flex flex-1 gap-1">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= n ? GOLD : '#3d153018' }} />)}</div>
    </div>
  )
}

function ProductSheet({ p, onClose, onAdd }: { p: P | null; onClose: () => void; onAdd: (l: { key: string; name: string; price: number; image: string; detail: string; qty: number }) => void }) {
  const [imgI, setImgI] = useState(0)
  const [size, setSize] = useState(1)
  const [qty, setQty] = useState(1)
  const [last, setLast] = useState<string | null>(null)
  if (p && p.id !== last) { setLast(p.id); setImgI(0); setSize(1); setQty(1) }
  if (!p) return null
  const price = priceFor(p, size)
  return (
    <Sheet open onClose={onClose} side="right" className="bg-[#f7f3ee]" label={p.name}>
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Montserrat, sans-serif', color: PLUM }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative bg-white">
            <SmartImg key={imgI} src={img(p.imgs[imgI], 900, 1000)} alt={`${p.name} — foto ${imgI + 1}`} fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="animate-fade-in aspect-[9/10]" eager />
            <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90" aria-label="Cerrar"><X className="h-5 w-5" /></button>
            <div className="absolute bottom-3 left-3 flex gap-2">
              {p.imgs.map((id, i) => <button key={id + i} onClick={() => setImgI(i)} className={cx('overflow-hidden ring-2 transition', imgI === i ? 'ring-[#3d1530]' : 'opacity-70 ring-white')} aria-label={`Foto ${i + 1}`}><SmartImg src={img(id, 120, 120)} alt="" fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="h-12 w-12" /></button>)}
            </div>
          </div>
          <div className="p-5">
            <div className="text-[11px] uppercase tracking-[.25em]" style={{ color: GOLD }}>{p.brand}</div>
            <h3 className="mt-1 font-(family-name:--fd) text-3xl">{p.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-[13px] text-[#3d1530]/60"><span className="h-2.5 w-2.5 rounded-full" style={{ background: FAMILY_COLOR[p.family] }} /> {p.family} · {p.gender} · Eau de Parfum</div>
            <div className="mt-2 flex items-center gap-1 text-[12px]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: GOLD }} />)} <span className="ml-1 text-[#3d1530]/60">4,8 (86 opiniones)</span></div>

            <div className="mt-5 text-[11px] uppercase tracking-[.25em] text-[#3d1530]/60">Pirámide olfativa</div>
            <div className="mt-2 space-y-px overflow-hidden bg-[#3d1530]/10">
              {(['Salida', 'Corazón', 'Fondo'] as const).map((t, i) => (
                <div key={t} className="flex gap-3 bg-white p-3"><span className="w-16 shrink-0 font-(family-name:--fd) italic" style={{ color: GOLD }}>{t}</span><span className="text-[14px]">{p.notes[i]}</span></div>
              ))}
            </div>
            <div className="mt-5 space-y-2"><Bars n={p.dur} label="Duración" /><Bars n={p.trail} label="Estela" /></div>
            <div className="mt-3 text-[13px]"><b>Ideal para:</b> {p.when}</div>

            <div className="mt-5 text-[11px] uppercase tracking-[.25em] text-[#3d1530]/60">Tamaño</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {SIZES.map((s, i) => <button key={s.ml} onClick={() => setSize(i)} className={cx('p-3 text-left ring-1 transition', size === i ? 'bg-white ring-[#3d1530]' : 'ring-[#3d1530]/15')}><div className="font-(family-name:--fd) text-xl">{s.ml} ml</div><div className="text-[13px]">{money(priceFor(p, i))}</div></button>)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-[#3d1530]/10 bg-white p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center ring-1 ring-[#3d1530]/15">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-10 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-5 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-10 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={() => onAdd({ key: `${p.id}-${SIZES[size].ml}`, name: p.name, price, image: p.imgs[0], detail: `${p.brand} · ${SIZES[size].ml} ml`, qty })} className="flex h-12 flex-1 items-center justify-between px-5 text-[12px] uppercase tracking-[.2em] text-white" style={{ background: PLUM }}>
            <span>Agregar a la bolsa</span><span className="tracking-normal">{money(price * qty)}</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  const [gift, setGift] = useState(false)
  const [note, setNote] = useState('')
  const [wa, setWa] = useState(false)
  // 20% off en la segunda unidad más barata
  const units = cart.lines.flatMap((l) => Array.from({ length: l.qty }, () => l.price)).sort((a, b) => b - a)
  const promo = units.length >= 2 ? units[1] * 0.2 : 0
  const total = cart.total - promo
  return (
    <>
      <Sheet open={open} onClose={onClose} side="right" className="bg-[#f7f3ee]" label="Bolsa">
        <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Montserrat, sans-serif', color: PLUM }}>
          <div className="flex items-center justify-between border-b border-[#3d1530]/10 p-5"><div className="font-(family-name:--fd) text-2xl">Tu bolsa</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
          {cart.lines.length === 0 ? (
            <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingBag className="mx-auto h-10 w-10 opacity-25" strokeWidth={1.2} /><p className="mt-3 font-(family-name:--fd) text-xl">Tu bolsa está vacía</p><button onClick={onClose} className="mt-4 px-6 py-3 text-[12px] uppercase tracking-[.2em] text-white" style={{ background: PLUM }}>Explorar</button></div></div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
                {units.length === 1 && <div className="flex items-center gap-2 bg-white p-3 text-[13px]"><Sparkles className="h-4 w-4 shrink-0" style={{ color: GOLD }} /> Sumá otra fragancia y obtené <b>20% off</b> en la segunda.</div>}
                <ul className="space-y-3">
                  {cart.lines.map((l) => (
                    <li key={l.key} className="flex gap-3 bg-white p-3">
                      <SmartImg src={img(l.image!, 160, 200)} alt={l.name} fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="h-20 w-16 shrink-0" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="font-(family-name:--fd) text-lg leading-tight">{l.name}</div>
                        <div className="text-[12px] text-[#3d1530]/55">{l.detail}</div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center ring-1 ring-[#3d1530]/15">
                            <button onClick={() => cart.inc(l.key, -1)} className="grid h-7 w-7 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                            <span className="w-5 text-center text-sm">{l.qty}</span>
                            <button onClick={() => cart.inc(l.key, 1)} className="grid h-7 w-7 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <span className="text-sm font-medium">{money(l.price * l.qty)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setGift(!gift)} className={cx('flex w-full items-center gap-3 p-4 text-left ring-1 transition', gift ? 'bg-white ring-[#3d1530]' : 'ring-[#3d1530]/15')}>
                  <Gift className="h-5 w-5" style={{ color: GOLD }} /><div className="flex-1"><div className="text-sm font-medium">Envolver para regalo</div><div className="text-[12px] text-[#3d1530]/55">Sin cargo, con tarjeta personalizada</div></div>
                  <span className={cx('grid h-5 w-5 place-items-center border', gift && 'text-white')} style={gift ? { background: PLUM, borderColor: PLUM } : { borderColor: '#3d153040' }}>{gift && '✓'}</span>
                </button>
                {gift && <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Mensaje para la tarjeta (opcional)" rows={2} className="animate-fade-in w-full bg-white p-3 text-sm outline-none ring-1 ring-[#3d1530]/15 focus:ring-[#3d1530]" />}
              </div>
              <div className="border-t border-[#3d1530]/10 bg-white p-5 text-sm" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
                <div className="flex justify-between"><span>Subtotal</span><span>{money(cart.total)}</span></div>
                {promo > 0 && <div className="flex justify-between" style={{ color: GOLD }}><span>20% off 2da fragancia</span><span>-{money(promo)}</span></div>}
                <div className="mt-1 flex justify-between font-(family-name:--fd) text-2xl"><span>Total</span><span>{money(total)}</span></div>
                <button onClick={() => setWa(true)} className="mt-4 flex w-full items-center justify-center gap-2 py-4 text-[12px] uppercase tracking-[.2em] text-white" style={{ background: PLUM }}>Finalizar pedido <ChevronRight className="h-4 w-4" /></button>
                <p className="mt-2 text-center text-[11px] text-[#3d1530]/50">Coordinás pago y entrega por WhatsApp con una asesora.</p>
              </div>
            </>
          )}
        </div>
      </Sheet>
      <WhatsAppSim open={wa} onClose={() => setWa(false)} business={BIZ}
        message={orderText(BIZ, cart.lines, total, [promo ? `(incluye 20% off en 2da fragancia: -${money(promo)})` : '', gift ? `🎁 Para regalo${note ? `: "${note}"` : ''}` : ''].filter(Boolean))}
        onSent={() => setTimeout(() => { cart.clear(); setGift(false); setNote(''); onClose() }, 400)} />
    </>
  )
}

const QUESTIONS = [
  { q: '¿Para quién es?', opts: [['Para mí (mujer)', 'Mujer'], ['Para mí (hombre)', 'Hombre'], ['Me da igual / unisex', 'Unisex']] },
  { q: '¿Qué aroma te atrae más?', opts: [['Flores frescas', 'Floral'], ['Maderas y cuero', 'Amaderado'], ['Cítricos y verano', 'Cítrico'], ['Vainilla y especias', 'Oriental'], ['Mar y limpieza', 'Fresco']] },
  { q: '¿Cuándo lo vas a usar?', opts: [['De día', 'Día'], ['De noche', 'Noche'], ['Todo el tiempo', 'Todo']] },
]
function Quiz({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (p: P) => void }) {
  const [ans, setAns] = useState<string[]>([])
  const [wasOpen, setWasOpen] = useState(false)
  if (open && !wasOpen) { setWasOpen(true); setAns([]) }
  if (!open && wasOpen) setWasOpen(false)
  const step = ans.length
  const result = step === 3 ? [...PERF].map((p) => ({ p, s: (p.gender === ans[0] || p.gender === 'Unisex' || ans[0] === 'Unisex' ? 2 : -5) + (p.family === ans[1] ? 3 : 0) + (ans[2] === 'Todo' || p.when.includes(ans[2]) ? 1 : 0) })).sort((a, b) => b.s - a.s).slice(0, 2).map((x) => x.p) : []
  return (
    <Sheet open={open} onClose={onClose} side="center" className="bg-[#f7f3ee]" label="Test de fragancia">
      <div className="overflow-y-auto p-6" style={{ fontFamily: 'Montserrat, sans-serif', color: PLUM }}>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[11px] uppercase tracking-[.3em]" style={{ color: GOLD }}><Wand2 className="h-4 w-4" /> Test de fragancia</div><button onClick={onClose} aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
        {step < 3 ? (
          <div key={step} className="animate-fade-up">
            <div className="mt-4 flex gap-1">{[0, 1, 2].map((i) => <div key={i} className="h-0.5 flex-1" style={{ background: i <= step ? PLUM : '#3d153020' }} />)}</div>
            <div className="mt-5 font-(family-name:--fd) text-3xl">{QUESTIONS[step].q}</div>
            <div className="mt-5 space-y-2">
              {QUESTIONS[step].opts.map(([label, v]) => <button key={v} onClick={() => setAns([...ans, v])} className="flex w-full items-center justify-between bg-white p-4 text-left text-[15px] transition hover:ring-1 hover:ring-[#3d1530]">{label}<ChevronRight className="h-4 w-4 opacity-40" /></button>)}
            </div>
            {step > 0 && <button onClick={() => setAns(ans.slice(0, -1))} className="mt-4 text-[12px] underline">Volver</button>}
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className="mt-4 font-(family-name:--fd) text-3xl">Tus fragancias ideales</div>
            <p className="text-[14px] text-[#3d1530]/60">Según tus respuestas, te recomendamos:</p>
            <div className="mt-4 space-y-3">
              {result.map((p, i) => (
                <button key={p.id} onClick={() => onPick(p)} className="flex w-full items-center gap-3 bg-white p-3 text-left">
                  <SmartImg src={img(p.imgs[0], 160, 200)} alt={p.name} fallback="linear-gradient(180deg,#ecdcc4,#b08d57)" className="h-20 w-16 shrink-0" />
                  <div className="flex-1"><div className="text-[10px] uppercase tracking-[.2em]" style={{ color: GOLD }}>{i === 0 ? 'Match perfecto' : 'También te puede gustar'}</div><div className="font-(family-name:--fd) text-xl">{p.name}</div><div className="text-[12px] text-[#3d1530]/55">{p.brand} · {money(p.price)}</div></div>
                  <ChevronRight className="h-5 w-5 opacity-40" />
                </button>
              ))}
            </div>
            <button onClick={() => setAns([])} className="mt-4 text-[12px] underline">Hacer el test de nuevo</button>
          </div>
        )}
      </div>
    </Sheet>
  )
}
