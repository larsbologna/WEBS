import { useMemo, useState } from 'react'
import { ArrowLeft, Check, CreditCard, Heart, Minus, Plus, Ruler, Search, ShoppingBag, SlidersHorizontal, Store, Trash2, Truck, X, Lock, RotateCcw, PackageCheck } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { safeRead, safeWrite } from '../../shared/store'
import { cx, img, money } from '../../shared/format'

const OR = '#ff4b12'
type Cat = 'Remeras' | 'Buzos' | 'Camperas' | 'Jeans' | 'Vestidos' | 'Zapatillas' | 'Camisas'
type Color = { n: string; hex: string }
type Product = { id: string; name: string; cat: Cat; price: number; was?: number; img: string; colors: Color[]; sizes: string[]; out?: string[]; isNew?: boolean; desc: string }

const BLK = { n: 'Negro', hex: '#111' }, WHT = { n: 'Blanco', hex: '#f4f4f4' }, GRY = { n: 'Gris melange', hex: '#9ca3af' }, SND = { n: 'Arena', hex: '#d6c3a5' }, OLV = { n: 'Oliva', hex: '#5b6236' }, BLU = { n: 'Azul', hex: '#3b5b8c' }, CRM = { n: 'Crudo', hex: '#efe8da' }
const TOPS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'], JEANS = ['36', '38', '40', '42', '44', '46'], SHOES = ['37', '38', '39', '40', '41', '42', '43', '44']

const PRODUCTS: Product[] = [
  { id: 'r1', name: 'Remera Oversize Essential', cat: 'Remeras', price: 18900, img: '1521572163474-6864f9cf17ab', colors: [WHT, BLK, SND], sizes: TOPS, out: ['XS'], isNew: true, desc: 'Algodón peinado 24/1, calce oversize, cuello reforzado.' },
  { id: 'r2', name: 'Remera Boxy Negra', cat: 'Remeras', price: 17500, was: 21900, img: '1503341504253-dff4815485f1', colors: [BLK, GRY], sizes: TOPS, out: ['XXL'], desc: 'Corte boxy, hombro caído. Ideal para el día a día.' },
  { id: 'r3', name: 'Remera Gráfica Distrito', cat: 'Remeras', price: 21500, img: '1576566588028-4147f3842f27', colors: [WHT, CRM], sizes: TOPS, isNew: true, desc: 'Estampa serigráfica al frente y espalda.' },
  { id: 'b1', name: 'Hoodie Heavyweight', cat: 'Buzos', price: 45900, img: '1556821840-3a63f95609a7', colors: [GRY, BLK, OLV], sizes: TOPS, out: ['XS', 'S'], desc: 'Frisa invisible 420 g, capucha doble, bolsillo canguro.' },
  { id: 'b2', name: 'Buzo Crew Neck', cat: 'Buzos', price: 38900, was: 46900, img: '1620799140408-edc6dcb6d633', colors: [SND, BLK], sizes: TOPS, desc: 'Cuello redondo, puños y cintura acanalados.' },
  { id: 'c1', name: 'Campera de Jean Trucker', cat: 'Camperas', price: 64900, img: '1551537482-f2075a1d41f2', colors: [BLU], sizes: TOPS, isNew: true, desc: 'Denim rígido 14 oz con lavado vintage.' },
  { id: 'c2', name: 'Campera Biker Eco Cuero', cat: 'Camperas', price: 89900, was: 109900, img: '1551028719-00167b16eac5', colors: [BLK], sizes: TOPS, out: ['XL'], desc: 'Símil cuero de alta calidad, cierres metálicos.' },
  { id: 'c3', name: 'Bomber Liviana', cat: 'Camperas', price: 59900, img: '1591047139829-d91aecb6caea', colors: [OLV, BLK], sizes: TOPS, desc: 'Nylon repelente al agua, forrería interior.' },
  { id: 'j1', name: 'Jean Recto 90s', cat: 'Jeans', price: 42900, img: '1542272604-787c3835535d', colors: [BLU, BLK], sizes: JEANS, out: ['36'], desc: 'Tiro medio, pierna recta, denim con elastano.' },
  { id: 'j2', name: 'Jean Mom Fit', cat: 'Jeans', price: 39900, was: 47900, img: '1541099649105-f69ad21f3246', colors: [BLU], sizes: JEANS, desc: 'Tiro alto, calce relajado y ruedo al tobillo.' },
  { id: 'v1', name: 'Vestido Midi Satén', cat: 'Vestidos', price: 52900, img: '1595777457583-95e059d581b8', colors: [SND, BLK], sizes: ['XS', 'S', 'M', 'L'], isNew: true, desc: 'Satén fluido con breteles regulables.' },
  { id: 'v2', name: 'Vestido de Lino', cat: 'Vestidos', price: 47900, img: '1572804013309-59a88b7e92f1', colors: [CRM, OLV], sizes: ['XS', 'S', 'M', 'L'], desc: 'Lino natural, fresco y liviano para el verano.' },
  { id: 'cm1', name: 'Camisa Oxford', cat: 'Camisas', price: 36900, img: '1596755094514-f87e34085b2c', colors: [WHT, BLU], sizes: TOPS, desc: 'Algodón oxford, cuello abotonado.' },
  { id: 'z1', name: 'Zapatillas Runner Red', cat: 'Zapatillas', price: 98900, img: '1542291026-7eec264c27ff', colors: [{ n: 'Rojo', hex: '#d22' }], sizes: SHOES, out: ['37', '44'], desc: 'Capellada de malla, suela de goma con amortiguación.' },
  { id: 'z2', name: 'Zapatillas Urban White', cat: 'Zapatillas', price: 84900, was: 99900, img: '1549298916-b41d501d3772', colors: [WHT], sizes: SHOES, desc: 'Cuero sintético, suela vulcanizada.' },
]
const CATS: (Cat | 'Todo')[] = ['Todo', 'Remeras', 'Buzos', 'Camperas', 'Jeans', 'Camisas', 'Vestidos', 'Zapatillas']
const SORTS = ['Novedades', 'Menor precio', 'Mayor precio', 'Ofertas primero'] as const
const FREE = 80000

export default function Ropa() {
  const cart = useCart('ropa')
  const [cat, setCat] = useState<Cat | 'Todo'>('Todo')
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Novedades')
  const [onlySale, setOnlySale] = useState(false)
  const [q, setQ] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [favs, setFavs] = useState<string[]>(() => safeRead('distrito-favs', []))
  const [favOpen, setFavOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)

  const toggleFav = (id: string) => setFavs((f) => { const n = f.includes(id) ? f.filter((x) => x !== id) : [...f, id]; safeWrite('distrito-favs', n); toast(f.includes(id) ? 'Quitado de favoritos' : 'Guardado en favoritos ♥'); return n })

  const list = useMemo(() => {
    const n = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    const l = PRODUCTS.filter((p) => (cat === 'Todo' || p.cat === cat) && (!onlySale || p.was) && (!n || `${p.name} ${p.cat}`.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(n)))
    if (sort === 'Menor precio') return [...l].sort((a, b) => a.price - b.price)
    if (sort === 'Mayor precio') return [...l].sort((a, b) => b.price - a.price)
    if (sort === 'Ofertas primero') return [...l].sort((a, b) => +!!b.was - +!!a.was)
    return [...l].sort((a, b) => +!!b.isNew - +!!a.isNew)
  }, [cat, sort, onlySale, q])

  const goShop = (c: Cat | 'Todo' = 'Todo', sale = false) => { setCat(c); setOnlySale(sale); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <DemoShell slug="ropa" fonts="family=Archivo+Black&family=Archivo:wght@400;500;600;700" themeColor="#ffffff"
      className="pb-20" style={{ background: '#fff', color: '#111', fontFamily: 'Archivo, sans-serif', ['--fd' as string]: '"Archivo Black", sans-serif' }}>
      <div className="bg-black py-2 text-center text-[12px] font-semibold uppercase tracking-wider text-white">Envío gratis desde {money(FREE)} · 3 cuotas sin interés · Cambios gratis</div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <div className="font-(family-name:--fd) text-[22px] uppercase leading-none tracking-tight">Distrito<span style={{ color: OR }}>.</span></div>
          <div className="flex items-center gap-1">
            <IconBtn label="Buscar" onClick={() => setSearchOpen((s) => !s)}><Search className="h-5 w-5" /></IconBtn>
            <IconBtn label="Favoritos" onClick={() => setFavOpen(true)} badge={favs.length}><Heart className="h-5 w-5" /></IconBtn>
            <IconBtn label="Carrito" onClick={() => setCartOpen(true)} badge={cart.count} dark><ShoppingBag className="h-5 w-5" /></IconBtn>
          </div>
        </div>
        {searchOpen && (
          <div className="animate-fade-in mx-auto max-w-6xl px-5 pb-3">
            <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); if (cat !== 'Todo') setCat('Todo') }} onKeyDown={(e) => e.key === 'Enter' && goShop()} placeholder="Buscar remeras, jeans, zapatillas…" className="w-full border-b-2 border-black bg-transparent py-2 text-lg outline-none" />
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative">
        <SmartImg eager src={img('1515886657613-9f3515b0c78f', 1400, 1700)} alt="Campaña Primavera Verano" fallback="linear-gradient(160deg,#d4d4d4,#262626)" className="h-[78svh] min-h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl p-5 pb-8 text-white">
          <div className="animate-fade-up w-fit px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-black" style={{ background: OR }}>Nueva colección</div>
          <h1 className="animate-fade-up mt-3 font-(family-name:--fd) text-[54px] uppercase leading-[.88] tracking-tight sm:text-8xl" style={{ animationDelay: '80ms' }}>Primavera<br />Verano 27</h1>
          <p className="animate-fade-up mt-3 max-w-sm text-[15px] text-white/85" style={{ animationDelay: '160ms' }}>Básicos premium y prendas statement. Comprá online y recibilo en 48 h o retiralo en el local.</p>
          <div className="animate-fade-up mt-5 flex gap-2" style={{ animationDelay: '240ms' }}>
            <button onClick={() => goShop()} className="bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition active:scale-95">Comprar ahora</button>
            <button onClick={() => goShop('Todo', true)} className="border border-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider">Ofertas</button>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS VISUALES */}
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="grid grid-cols-3 gap-2">
          {[{ c: 'Remeras' as Cat, i: '1521572163474-6864f9cf17ab' }, { c: 'Camperas' as Cat, i: '1551028719-00167b16eac5' }, { c: 'Zapatillas' as Cat, i: '1542291026-7eec264c27ff' }].map(({ c, i }) => (
            <button key={c} onClick={() => goShop(c)} className="group relative overflow-hidden">
              <SmartImg src={img(i, 400, 520)} alt={c} fallback="linear-gradient(160deg,#e5e5e5,#525252)" className="aspect-[3/4] transition md:aspect-[4/3] duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-2 left-2 font-(family-name:--fd) text-[15px] uppercase text-white sm:text-2xl">{c}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="mx-auto max-w-6xl px-5 pt-6">
        <Reveal className="flex items-center justify-between gap-4 p-5" style={{ background: OR }}>
          <div>
            <div className="font-(family-name:--fd) text-3xl uppercase leading-none sm:text-5xl">Hasta 25% off</div>
            <p className="mt-1 text-sm font-semibold">En prendas seleccionadas. + 10% extra con el cupón <b>DISTRITO10</b></p>
          </div>
          <button onClick={() => goShop('Todo', true)} className="shrink-0 bg-black px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-white">Ver ofertas</button>
        </Reveal>
      </section>

      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-6xl scroll-mt-14 px-5 pt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-(family-name:--fd) text-4xl uppercase leading-none">{cat === 'Todo' ? 'Tienda' : cat}</h2>
          <span className="text-sm text-black/50">{list.length} productos</span>
        </div>
        <Tip className="mt-4 !mx-0">una tienda online abierta 24/7: el cliente filtra, elige talle y color, y compra sin preguntarte por mensaje si hay stock.</Tip>
        <div className="sticky top-[57px] z-30 -mx-5 mt-4 border-b border-black/10 bg-white px-5 py-2">
          <div className="flex items-center gap-2">
            <div className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={cx('shrink-0 border px-3 py-1.5 text-[13px] font-semibold transition', cat === c ? 'border-black bg-black text-white' : 'border-black/15')}>{c}</button>
              ))}
            </div>
            <button onClick={() => setFiltersOpen(true)} className="relative flex shrink-0 items-center gap-1.5 border border-black px-3 py-1.5 text-[13px] font-semibold" aria-label="Filtros y orden">
              <SlidersHorizontal className="h-4 w-4" /> Filtrar
              {(onlySale || sort !== 'Novedades') && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full" style={{ background: OR }} />}
            </button>
          </div>
        </div>
        {q && <div className="mt-3 flex items-center gap-2 text-sm">Resultados para “<b>{q}</b>” <button onClick={() => setQ('')} className="underline">limpiar</button></div>}
        {list.length === 0 ? (
          <div className="py-16 text-center"><p className="font-semibold">No encontramos productos con esos filtros.</p><button onClick={() => { setQ(''); setCat('Todo'); setOnlySale(false) }} className="mt-3 bg-black px-5 py-3 text-sm font-bold uppercase text-white">Ver todo</button></div>
        ) : (
          <div key={cat + sort + onlySale + q} className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4">
            {list.map((p, i) => (
              <div key={p.id} className="animate-fade-up group" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                <div className="relative">
                  <button onClick={() => setProduct(p)} className="block w-full overflow-hidden" aria-label={`Ver ${p.name}`}>
                    <SmartImg src={img(p.img, 500, 660)} alt={p.name} fallback="linear-gradient(160deg,#f0f0f0,#a3a3a3)" className="aspect-[3/4] bg-neutral-100 transition duration-700 group-hover:scale-[1.04]" />
                  </button>
                  <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {p.isNew && <span className="bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">Nuevo</span>}
                    {p.was && <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: OR }}>-{Math.round((1 - p.price / p.was) * 100)}%</span>}
                  </div>
                  <button onClick={() => toggleFav(p.id)} className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 transition active:scale-75" aria-label="Favorito">
                    <Heart className={cx('h-4 w-4 transition', favs.includes(p.id) && 'fill-current')} style={favs.includes(p.id) ? { color: OR } : undefined} />
                  </button>
                </div>
                <button onClick={() => setProduct(p)} className="mt-2 block w-full text-left">
                  <div className="text-[13.5px] font-semibold leading-tight">{p.name}</div>
                  <div className="mt-1 flex items-baseline gap-2"><span className="font-bold">{money(p.price)}</span>{p.was && <span className="text-[12px] text-black/40 line-through">{money(p.was)}</span>}</div>
                  <div className="text-[11px] text-black/50">3 cuotas de {money(p.price / 3)}</div>
                  <div className="mt-1.5 flex gap-1">{p.colors.map((c) => <span key={c.n} className="h-3 w-3 rounded-full ring-1 ring-black/15" style={{ background: c.hex }} title={c.n} />)}</div>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <div className="grid grid-cols-2 gap-px border border-black/10 bg-black/10 md:grid-cols-4">
          {[{ i: Truck, t: 'Envíos a todo el país', d: '24–48 h en zona sur' }, { i: Store, t: 'Retiro en local', d: 'Gratis, en 2 h' }, { i: CreditCard, t: '3 cuotas sin interés', d: 'Todas las tarjetas' }, { i: RotateCcw, t: 'Cambios gratis', d: 'Hasta 30 días' }].map(({ i: I, t, d }) => (
            <div key={t} className="bg-white p-4"><I className="h-5 w-5" /><div className="mt-2 text-[14px] font-bold leading-tight">{t}</div><div className="text-[12px] text-black/55">{d}</div></div>
          ))}
        </div>
        <Tip className="mt-4">mostrar envíos, cuotas y cambios elimina las dudas que frenan una compra online.</Tip>
      </section>

      <footer className="mt-16 bg-black px-5 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="font-(family-name:--fd) text-5xl uppercase">Distrito<span style={{ color: OR }}>.</span></div>
          <p className="mt-2 text-sm text-white/60">Local: Calle 14 N° 4700, Berazategui · Lun a sáb 10–20 h · @distrito.clothing</p>
        </div>
      </footer>

      <FiltersSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} sort={sort} setSort={setSort} onlySale={onlySale} setOnlySale={setOnlySale} count={list.length} />
      <ProductSheet product={product} onClose={() => setProduct(null)} fav={!!product && favs.includes(product.id)} onFav={() => product && toggleFav(product.id)}
        onAdd={(l) => { cart.add(l); setProduct(null); toast('Agregado al carrito'); setTimeout(() => setCartOpen(true), 250) }} />
      <FavSheet open={favOpen} onClose={() => setFavOpen(false)} favs={favs} onOpen={(p) => { setFavOpen(false); setProduct(p) }} onRemove={toggleFav} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onCheckout={() => { setCartOpen(false); setCheckout(true) }} />
      <Checkout open={checkout} onClose={() => setCheckout(false)} cart={cart} />
    </DemoShell>
  )
}

function IconBtn({ children, label, onClick, badge, dark }: { children: React.ReactNode; label: string; onClick: () => void; badge?: number; dark?: boolean }) {
  return (
    <button onClick={onClick} aria-label={label} className={cx('relative grid h-10 w-10 place-items-center rounded-full transition', dark ? 'bg-black text-white' : 'hover:bg-black/5')}>
      {children}
      {!!badge && <span key={badge} className="animate-pop absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold text-white" style={{ background: OR }}>{badge}</span>}
    </button>
  )
}

function FiltersSheet({ open, onClose, sort, setSort, onlySale, setOnlySale, count }: { open: boolean; onClose: () => void; sort: string; setSort: (s: (typeof SORTS)[number]) => void; onlySale: boolean; setOnlySale: (b: boolean) => void; count: number }) {
  return (
    <Sheet open={open} onClose={onClose} className="bg-white" label="Filtros">
      <div className="p-5" style={{ fontFamily: 'Archivo, sans-serif', color: '#111' }}>
        <div className="flex items-center justify-between"><div className="font-(family-name:--fd) text-2xl uppercase">Filtrar y ordenar</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        <div className="mt-5 text-[12px] font-bold uppercase tracking-wider text-black/50">Ordenar por</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {SORTS.map((s) => <button key={s} onClick={() => setSort(s)} className={cx('border px-3 py-3 text-left text-sm font-semibold', sort === s ? 'border-black bg-black text-white' : 'border-black/15')}>{s}</button>)}
        </div>
        <button onClick={() => setOnlySale(!onlySale)} className="mt-5 flex w-full items-center justify-between border border-black/15 px-4 py-3.5 text-sm font-semibold">
          Solo productos en oferta
          <span className={cx('relative h-6 w-11 rounded-full transition', onlySale ? 'bg-black' : 'bg-black/15')}><span className={cx('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all', onlySale ? 'left-[22px]' : 'left-0.5')} /></span>
        </button>
        <div className="mt-5 grid grid-cols-2 gap-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <button onClick={() => { setSort('Novedades'); setOnlySale(false) }} className="border border-black py-3.5 text-sm font-bold uppercase">Limpiar</button>
          <button onClick={onClose} className="bg-black py-3.5 text-sm font-bold uppercase text-white">Ver {count}</button>
        </div>
      </div>
    </Sheet>
  )
}

function ProductSheet({ product: p, onClose, onAdd, fav, onFav }: { product: Product | null; onClose: () => void; onAdd: (l: { key: string; name: string; price: number; image: string; detail: string; qty: number }) => void; fav: boolean; onFav: () => void }) {
  const [color, setColor] = useState(0)
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [guide, setGuide] = useState(false)
  const [shake, setShake] = useState(false)
  const [last, setLast] = useState<string | null>(null)
  if (p && p.id !== last) { setLast(p.id); setColor(0); setSize(''); setQty(1); setGuide(false) }
  if (!p) return null
  const add = () => {
    if (!size) { setShake(true); setTimeout(() => setShake(false), 500); toast('Elegí un talle'); return }
    onAdd({ key: `${p.id}-${p.colors[color].n}-${size}`, name: p.name, price: p.price, image: p.img, detail: `${p.colors[color].n} · Talle ${size}`, qty })
  }
  return (
    <Sheet open onClose={onClose} side="right" className="bg-white" label={p.name}>
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Archivo, sans-serif', color: '#111' }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative">
            <SmartImg src={img(p.img, 900, 1100)} alt={p.name} fallback="linear-gradient(160deg,#f0f0f0,#a3a3a3)" className="aspect-[4/5]" eager />
            {p.colors.length > 1 && color > 0 && <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ background: p.colors[color].hex, opacity: 0.35 }} />}
            <button onClick={onClose} className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Volver"><ArrowLeft className="h-5 w-5" /></button>
            <button onClick={onFav} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Favorito"><Heart className={cx('h-5 w-5', fav && 'fill-current')} style={fav ? { color: OR } : undefined} /></button>
          </div>
          <div className="p-5">
            <div className="text-[12px] font-bold uppercase tracking-wider text-black/45">{p.cat}</div>
            <h3 className="mt-1 font-(family-name:--fd) text-2xl uppercase leading-tight">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-xl font-bold">{money(p.price)}</span>{p.was && <><span className="text-black/40 line-through">{money(p.was)}</span><span className="text-sm font-bold" style={{ color: OR }}>-{Math.round((1 - p.price / p.was) * 100)}%</span></>}</div>
            <div className="text-[13px] text-black/55">3 cuotas sin interés de {money(p.price / 3)} · 10% off con transferencia</div>

            <div className="mt-5 text-sm"><b>Color:</b> {p.colors[color].n}</div>
            <div className="mt-2 flex gap-2">
              {p.colors.map((c, i) => <button key={c.n} onClick={() => setColor(i)} aria-label={c.n} className={cx('h-9 w-9 rounded-full ring-1 ring-black/15 ring-offset-2 transition', color === i && '!ring-2 !ring-black')} style={{ background: c.hex }} />)}
            </div>

            <div className="mt-5 flex items-center justify-between text-sm"><b>Talle{size && `: ${size}`}</b><button onClick={() => setGuide(!guide)} className="flex items-center gap-1 underline"><Ruler className="h-4 w-4" /> Guía de talles</button></div>
            {guide && (
              <table className="animate-fade-in mt-2 w-full border border-black/10 text-center text-[12px]">
                <thead className="bg-black/5"><tr><th className="py-1.5">Talle</th><th>Pecho</th><th>Largo</th></tr></thead>
                <tbody>{['S', 'M', 'L', 'XL'].map((s, i) => <tr key={s} className="border-t border-black/10"><td className="py-1.5 font-semibold">{s}</td><td>{100 + i * 6} cm</td><td>{70 + i * 2} cm</td></tr>)}</tbody>
              </table>
            )}
            <div className="mt-2 grid grid-cols-6 gap-1.5">
              {p.sizes.map((s) => {
                const out = p.out?.includes(s)
                return <button key={s} disabled={out} onClick={() => setSize(s)} className={cx('relative border py-2.5 text-[13px] font-semibold transition disabled:text-black/25', size === s ? 'border-black bg-black text-white' : shake ? 'border-[#ff4b12]' : 'border-black/15')}>
                  {s}{out && <span className="absolute inset-0 m-auto h-px w-3/4 rotate-[-20deg] bg-black/25" />}
                </button>
              })}
            </div>
            {p.out && p.out.length > 0 && <p className="mt-2 text-[12px] text-black/50">Talles tachados: sin stock. <button onClick={() => toast('Te avisaremos por mail cuando ingrese (demo)')} className="underline">Avisarme</button></p>}
            <p className="mt-5 text-[14px] leading-relaxed text-black/70">{p.desc}</p>
            <div className="mt-4 space-y-2 border-t border-black/10 pt-4 text-[13px]">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Llega en 24–48 h a Berazategui y alrededores</div>
              <div className="flex items-center gap-2"><Store className="h-4 w-4" /> Retiro gratis en el local en 2 h</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-black/10 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center border border-black/15">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-10 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-5 text-center font-bold">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(5, q + 1))} className="grid h-12 w-10 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={add} className="h-12 flex-1 bg-black text-sm font-bold uppercase tracking-wider text-white transition active:scale-[.98]">{size ? 'Agregar al carrito' : 'Elegí tu talle'}</button>
        </div>
      </div>
    </Sheet>
  )
}

function FavSheet({ open, onClose, favs, onOpen, onRemove }: { open: boolean; onClose: () => void; favs: string[]; onOpen: (p: Product) => void; onRemove: (id: string) => void }) {
  const items = PRODUCTS.filter((p) => favs.includes(p.id))
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-white" label="Favoritos">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Archivo, sans-serif', color: '#111' }}>
        <div className="flex items-center justify-between border-b border-black/10 p-5"><div className="font-(family-name:--fd) text-2xl uppercase">Favoritos ({items.length})</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><Heart className="mx-auto h-10 w-10 text-black/20" /><p className="mt-3 font-semibold">Guardá lo que te gusta</p><p className="text-sm text-black/55">Tocá el corazón en cualquier producto.</p></div></div>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto p-5">
            {items.map((p) => (
              <div key={p.id}>
                <button onClick={() => onOpen(p)} className="block w-full"><SmartImg src={img(p.img, 400, 520)} alt={p.name} fallback="linear-gradient(160deg,#f0f0f0,#a3a3a3)" className="aspect-[3/4]" /></button>
                <div className="mt-1.5 text-[13px] font-semibold leading-tight">{p.name}</div>
                <div className="flex items-center justify-between"><b className="text-sm">{money(p.price)}</b><button onClick={() => onRemove(p.id)} className="text-[12px] underline">Quitar</button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart, onCheckout }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart>; onCheckout: () => void }) {
  const pct = Math.min(100, (cart.total / FREE) * 100)
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-white" label="Carrito">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Archivo, sans-serif', color: '#111' }}>
        <div className="flex items-center justify-between border-b border-black/10 p-5"><div className="font-(family-name:--fd) text-2xl uppercase">Carrito ({cart.count})</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingBag className="mx-auto h-10 w-10 text-black/20" /><p className="mt-3 font-semibold">Tu carrito está vacío</p><button onClick={onClose} className="mt-4 bg-black px-6 py-3 text-sm font-bold uppercase text-white">Seguir comprando</button></div></div>
        ) : (
          <>
            <div className="border-b border-black/10 px-5 py-3">
              <div className="text-[13px]">{pct >= 100 ? <b>¡Tenés envío gratis! 🎉</b> : <>Te faltan <b>{money(FREE - cart.total)}</b> para el envío gratis</>}</div>
              <div className="mt-2 h-1.5 overflow-hidden bg-black/10"><div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: pct >= 100 ? '#16a34a' : OR }} /></div>
            </div>
            <ul className="min-h-0 flex-1 divide-y divide-black/10 overflow-y-auto px-5">
              {cart.lines.map((l) => (
                <li key={l.key} className="flex gap-3 py-4">
                  <SmartImg src={img(l.image!, 200, 260)} alt={l.name} fallback="linear-gradient(160deg,#f0f0f0,#a3a3a3)" className="h-24 w-[72px] shrink-0" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="text-[14px] font-semibold leading-tight">{l.name}</div>
                    <div className="text-[12px] text-black/55">{l.detail}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-black/15">
                        <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                        <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                        <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <b>{money(l.price * l.qty)}</b>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/10 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between text-lg font-bold"><span>Subtotal</span><span>{money(cart.total)}</span></div>
              <div className="text-[12px] text-black/55">o 3 cuotas sin interés de {money(cart.total / 3)}</div>
              <button onClick={onCheckout} className="mt-4 flex w-full items-center justify-center gap-2 bg-black py-4 text-sm font-bold uppercase tracking-wider text-white"><Lock className="h-4 w-4" /> Iniciar compra</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

function Checkout({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState({ email: '', name: '', addr: '', city: 'Berazategui', ship: 'domicilio', pay: 'tarjeta', card: '', exp: '', cvv: '', coupon: '' })
  const [applied, setApplied] = useState(false)
  const [order, setOrder] = useState<null | { n: string; total: number; count: number }>(null)
  const [processing, setProcessing] = useState(false)
  const set = (k: keyof typeof d, v: string) => setD((x) => ({ ...x, [k]: v }))
  const shipCost = d.ship === 'retiro' || cart.total >= FREE ? 0 : 4900
  const disc = (applied ? cart.total * 0.1 : 0) + (d.pay === 'transferencia' ? cart.total * 0.1 : 0)
  const total = cart.total - disc + shipCost
  const valid = [/\S+@\S+\.\S+/.test(d.email) && d.name.trim().length > 2, d.ship === 'retiro' || d.addr.trim().length > 4, d.pay !== 'tarjeta' || (d.card.replace(/\D/g, '').length >= 15 && d.exp.length >= 4 && d.cvv.length >= 3)][step]
  const close = () => { onClose(); if (order) { setOrder(null); setStep(0) } }
  const pay = () => {
    setProcessing(true)
    setTimeout(() => { setOrder({ n: `DST-${Math.floor(10000 + Math.random() * 89999)}`, total, count: cart.count }); cart.clear(); setProcessing(false) }, 1400)
  }
  const field = 'w-full border border-black/15 px-4 py-3.5 outline-none focus:border-black'
  return (
    <Sheet open={open} onClose={close} side="right" className="bg-white" label="Checkout">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Archivo, sans-serif', color: '#111' }}>
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          {!order && step > 0 ? <button onClick={() => setStep(step - 1)} aria-label="Atrás"><ArrowLeft className="h-6 w-6" /></button> : <span className="w-6" />}
          <div className="flex items-center gap-1.5 font-(family-name:--fd) uppercase"><Lock className="h-4 w-4" /> Compra segura</div>
          <button onClick={close} aria-label="Cerrar"><X className="h-6 w-6" /></button>
        </div>
        {order ? (
          <div className="flex-1 overflow-y-auto p-6 text-center">
            <div className="animate-pop mx-auto grid h-20 w-20 place-items-center rounded-full bg-black text-white"><PackageCheck className="h-10 w-10" /></div>
            <div className="mt-4 font-(family-name:--fd) text-3xl uppercase">¡Compra confirmada!</div>
            <p className="mt-1 text-black/60">Te enviamos el detalle a {d.email}</p>
            <div className="mt-6 border border-black/10 p-5 text-left text-sm">
              <div className="flex justify-between"><span className="text-black/55">N° de pedido</span><b>{order.n}</b></div>
              <div className="mt-2 flex justify-between"><span className="text-black/55">Productos</span><b>{order.count}</b></div>
              <div className="mt-2 flex justify-between"><span className="text-black/55">Entrega</span><b>{d.ship === 'retiro' ? 'Retiro en local (2 h)' : 'Domicilio (24–48 h)'}</b></div>
              <div className="mt-2 flex justify-between border-t border-black/10 pt-2 text-base"><span>Total pagado</span><b>{money(order.total)}</b></div>
            </div>
            <p className="mt-4 bg-black/5 p-3 text-[12px] text-black/55">Demostración: no se realizó ningún cobro ni envío real.</p>
            <button onClick={close} className="mt-4 w-full bg-black py-4 text-sm font-bold uppercase text-white">Seguir comprando</button>
          </div>
        ) : (
          <>
            <div className="flex gap-1 px-5 pt-4">{['Datos', 'Entrega', 'Pago'].map((s, i) => <div key={s} className="flex-1"><div className={cx('h-1 transition-colors', i <= step ? 'bg-black' : 'bg-black/10')} /><div className={cx('mt-1.5 text-[11px] font-bold uppercase tracking-wider', i <= step ? '' : 'text-black/35')}>{s}</div></div>)}</div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
              {step === 0 && <>
                <input className={field} placeholder="Email" type="email" value={d.email} onChange={(e) => set('email', e.target.value)} />
                <input className={field} placeholder="Nombre y apellido" value={d.name} onChange={(e) => set('name', e.target.value)} />
                <div className="flex gap-2">
                  <input className={cx(field, 'uppercase')} placeholder="Cupón de descuento" value={d.coupon} onChange={(e) => set('coupon', e.target.value)} />
                  <button onClick={() => { if (d.coupon.trim().toUpperCase() === 'DISTRITO10') { setApplied(true); toast('Cupón aplicado: 10% off') } else toast('Cupón inválido. Probá DISTRITO10') }} className="shrink-0 border border-black px-4 text-sm font-bold uppercase">Aplicar</button>
                </div>
                {applied && <div className="flex items-center gap-2 text-sm font-semibold text-green-700"><Check className="h-4 w-4" /> DISTRITO10 aplicado</div>}
              </>}
              {step === 1 && <>
                {[{ v: 'domicilio', t: 'Envío a domicilio', s: cart.total >= FREE ? 'Gratis · 24–48 h' : `${money(4900)} · 24–48 h`, i: Truck }, { v: 'retiro', t: 'Retiro en el local', s: 'Gratis · listo en 2 h', i: Store }].map((o) => (
                  <button key={o.v} onClick={() => set('ship', o.v)} className={cx('flex w-full items-center gap-3 border p-4 text-left', d.ship === o.v ? 'border-black ring-1 ring-black' : 'border-black/15')}>
                    <o.i className="h-5 w-5" /><div className="flex-1"><div className="font-semibold">{o.t}</div><div className="text-[13px] text-black/55">{o.s}</div></div>
                    <span className={cx('h-5 w-5 rounded-full border-2', d.ship === o.v ? 'border-[6px] border-black' : 'border-black/25')} />
                  </button>
                ))}
                {d.ship === 'domicilio' && <><input className={field} placeholder="Calle y número" value={d.addr} onChange={(e) => set('addr', e.target.value)} /><input className={field} placeholder="Localidad" value={d.city} onChange={(e) => set('city', e.target.value)} /></>}
              </>}
              {step === 2 && <>
                {[{ v: 'tarjeta', t: 'Tarjeta de crédito / débito', s: 'Hasta 3 cuotas sin interés' }, { v: 'transferencia', t: 'Transferencia bancaria', s: '10% de descuento' }, { v: 'mp', t: 'Mercado Pago', s: 'Dinero en cuenta o cuotas' }].map((o) => (
                  <button key={o.v} onClick={() => set('pay', o.v)} className={cx('flex w-full items-center gap-3 border p-4 text-left', d.pay === o.v ? 'border-black ring-1 ring-black' : 'border-black/15')}>
                    <div className="flex-1"><div className="font-semibold">{o.t}</div><div className="text-[13px] text-black/55">{o.s}</div></div>
                    <span className={cx('h-5 w-5 rounded-full border-2', d.pay === o.v ? 'border-[6px] border-black' : 'border-black/25')} />
                  </button>
                ))}
                {d.pay === 'tarjeta' && (
                  <div className="animate-fade-in space-y-2 bg-black/[.03] p-3">
                    <input className={field + ' bg-white'} inputMode="numeric" placeholder="Número de tarjeta (ej: 4242 4242 4242 4242)" value={d.card} onChange={(e) => set('card', e.target.value.replace(/[^\d ]/g, '').slice(0, 19))} />
                    <div className="flex gap-2"><input className={field + ' bg-white'} placeholder="MM/AA" value={d.exp} onChange={(e) => set('exp', e.target.value.slice(0, 5))} /><input className={field + ' bg-white'} inputMode="numeric" placeholder="CVV" value={d.cvv} onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} /></div>
                    <p className="text-[11px] text-black/50">Demo: usá cualquier número. No se procesa ningún pago.</p>
                  </div>
                )}
              </>}
            </div>
            <div className="border-t border-black/10 p-5 text-sm" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between"><span>Subtotal</span><span>{money(cart.total)}</span></div>
              {disc > 0 && <div className="flex justify-between text-green-700"><span>Descuentos</span><span>-{money(disc)}</span></div>}
              <div className="flex justify-between"><span>Envío</span><span>{shipCost ? money(shipCost) : 'Gratis'}</span></div>
              <div className="mt-1 flex justify-between text-lg font-bold"><span>Total</span><span>{money(total)}</span></div>
              <button disabled={!valid || processing || cart.lines.length === 0} onClick={() => (step < 2 ? setStep(step + 1) : pay())} className="mt-3 w-full bg-black py-4 text-sm font-bold uppercase tracking-wider text-white transition disabled:opacity-30">
                {processing ? 'Procesando pago…' : step < 2 ? 'Continuar' : `Pagar ${money(total)}`}
              </button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
