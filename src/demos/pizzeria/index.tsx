import { useEffect, useState } from 'react'
import { Bike, Check, ChefHat, Clock, Flame, Minus, Plus, ShoppingBasket, Store, Trash2, X, Timer, PartyPopper, MessageCircle } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { useCart, orderText } from '../../shared/useCart'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Forno Napoli'
type Variety = 'Clásicas' | 'Especiales' | 'Veggie'
type Pizza = { id: string; name: string; desc: string; base: number; img: string; v: Variety; color: string; dots: string; hot?: boolean }

const PIZZAS: Pizza[] = [
  { id: 'muzza', name: 'Muzzarella', desc: 'Salsa de tomate San Marzano, muzzarella y aceitunas.', base: 11900, img: '1513104890138-7c749659a591', v: 'Clásicas', color: '#f5d77a', dots: '#3b3b3b', hot: true },
  { id: 'marga', name: 'Margherita DOP', desc: 'Fior di latte, tomate, albahaca fresca y oliva extra virgen.', base: 13400, img: '1574071318508-1cdbab80d002', v: 'Veggie', color: '#f3e3b5', dots: '#3f7d3a' },
  { id: 'napo', name: 'Napolitana', desc: 'Muzzarella, rodajas de tomate, ajo y perejil.', base: 13200, img: '1604382354936-07c5d9983bd3', v: 'Clásicas', color: '#f0c56a', dots: '#e63922' },
  { id: 'fuga', name: 'Fugazzeta rellena', desc: 'Doble masa rellena de muzzarella, cebolla dulce y orégano.', base: 15900, img: '1571407970349-bc81e7e96d47', v: 'Especiales', color: '#f8e8b8', dots: '#c9a24a', hot: true },
  { id: 'pepe', name: 'Pepperoni', desc: 'Muzzarella y abundante pepperoni crocante.', base: 14800, img: '1628840042765-356cda07504e', v: 'Especiales', color: '#f2c46a', dots: '#b5281c', hot: true },
  { id: 'cala', name: 'Calabresa', desc: 'Longaniza calabresa, morrón asado y un toque de ají.', base: 14200, img: '1565299624946-b28f40a0ae38', v: 'Clásicas', color: '#eebd60', dots: '#8a2a1c' },
  { id: 'quesos', name: 'Cuatro quesos', desc: 'Muzzarella, roquefort, provolone y parmesano.', base: 15400, img: '1595708684082-a173bb3a06c5', v: 'Veggie', color: '#fbeec7', dots: '#9db3c2' },
  { id: 'rucula', name: 'Rúcula y crudo', desc: 'Jamón crudo, rúcula fresca y lascas de parmesano.', base: 16900, img: '1593560708920-61dd98c46a4e', v: 'Especiales', color: '#f3d98e', dots: '#4f8a3c' },
  { id: 'huerta', name: 'De la huerta', desc: 'Berenjenas, zucchini, morrones asados y pesto.', base: 14600, img: '1511689660979-10d2b1aada49', v: 'Veggie', color: '#ead39a', dots: '#5c8f3d' },
]

const SIZES = [
  { id: 'ind', name: 'Individual', sub: '4 porciones · 25 cm', mult: 0.62 },
  { id: 'gde', name: 'Grande', sub: '8 porciones · 35 cm', mult: 1 },
  { id: 'gig', name: 'Gigante', sub: '12 porciones · 45 cm', mult: 1.45 },
]
const DOUGH = [
  { id: 'trad', name: 'Tradicional', p: 0 },
  { id: 'fina', name: 'Media masa fina', p: 0 },
  { id: 'borde', name: 'Borde relleno', p: 2600 },
]
const EXTRAS = [
  { id: 'xmuz', name: 'Extra muzzarella', p: 2400 },
  { id: 'jam', name: 'Jamón cocido', p: 2200 },
  { id: 'hue', name: 'Huevo duro', p: 1300 },
  { id: 'pan', name: 'Panceta', p: 2600 },
  { id: 'ace', name: 'Aceitunas negras', p: 900 },
  { id: 'rcu', name: 'Rúcula', p: 1200 },
  { id: 'pic', name: 'Ají picante', p: 0 },
]

const COMBOS = [
  { id: 'c1', name: 'Combo Amigos', desc: '2 pizzas grandes de muzzarella + gaseosa 1,5 L', price: 23900, was: 29200, tag: 'El más pedido' },
  { id: 'c2', name: 'Combo Pareja', desc: '1 grande a elección + 6 empanadas + 2 latas', price: 21500, was: 26800, tag: 'Para 2' },
  { id: 'c3', name: 'Noche de partido', desc: '2 gigantes + 1 fugazzeta grande + 2 cervezas', price: 46900, was: 58500, tag: 'Para 6–8' },
]

const SIDES = [
  { id: 's1', name: 'Empanada de carne', p: 1700, img: '1609501676725-7186f017a4b7' },
  { id: 's2', name: 'Fainá', p: 2400, img: '1509440159596-0249088772ff' },
  { id: 's3', name: 'Gaseosa 1,5 L', p: 3900, img: '1554866585-cd94860890b7' },
  { id: 's4', name: 'Cerveza artesanal 1 L', p: 6200, img: '1608270586620-248524c67de9' },
  { id: 's5', name: 'Tiramisú', p: 5800, img: '1571877227200-a0d98ea607e9' },
]

const sizePrice = (base: number, mult: number) => Math.round((base * mult) / 100) * 100

export default function Pizzeria() {
  const cart = useCart('pizzeria')
  const [variety, setVariety] = useState<Variety | 'Todas'>('Todas')
  const [builder, setBuilder] = useState<Pizza | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [tracking, setTracking] = useState<null | { mode: string; total: number }>(null)
  const list = PIZZAS.filter((p) => variety === 'Todas' || p.v === variety)

  return (
    <DemoShell slug="pizzeria" fonts="family=Anton&family=Rubik:wght@400;500;600;700;800" themeColor="#141210"
      className="pb-24" style={{ background: '#141210', color: '#f5e9d6', fontFamily: 'Rubik, sans-serif', ['--fd' as string]: 'Anton, Impact, sans-serif' }}>
      {/* barra superior tipo ticker */}
      <div className="overflow-hidden bg-[#e63922] py-2 text-[13px] font-bold uppercase tracking-wider text-white">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10">
              <span>🔥 Miércoles 2x1 en especiales</span><span>🛵 Envío gratis desde $25.000</span><span>⏱ Delivery en 35 min</span><span>🍕 Masa madre · 48 h de fermentación</span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#141210]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e63922]"><Flame className="h-5 w-5 text-white" /></div>
            <div className="font-(family-name:--fd) text-2xl uppercase leading-none tracking-wide">Forno<span className="text-[#e63922]"> Napoli</span></div>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex h-11 items-center gap-2 rounded-full bg-[#f5e9d6] px-4 font-bold text-[#141210]" aria-label="Ver carrito">
            <ShoppingBasket className="h-5 w-5" />
            <span className="text-sm">{cart.count ? money(cart.total) : 'Carrito'}</span>
            {cart.count > 0 && <span key={cart.count} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#e63922] px-1 text-[11px] text-white">{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 md:grid-cols-2 md:py-16">
          <div className="relative z-10">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#f5e9d6]/20 px-3 py-1 text-[12px] font-semibold uppercase tracking-widest text-[#f5e9d6]/70">
              <span className="h-2 w-2 rounded-full bg-[#3f7d3a]" /> Horno a leña · 480 °C
            </div>
            <h1 className="animate-fade-up mt-4 font-(family-name:--fd) text-[64px] uppercase leading-[0.9] sm:text-8xl" style={{ animationDelay: '80ms' }}>
              La pizza<br />que se <span className="text-[#e63922]">pide</span><br />de nuevo.
            </h1>
            <p className="animate-fade-up mt-5 max-w-md text-[16px] leading-relaxed text-[#f5e9d6]/70" style={{ animationDelay: '160ms' }}>
              Elegí tamaño, armá mitad y mitad, sumá adicionales y seguí tu pedido en tiempo real. Sin llamadas, sin esperas en línea.
            </p>
            <div className="animate-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <a href="#pizzas" className="rounded-full bg-[#e63922] px-7 py-4 font-bold uppercase tracking-wide text-white shadow-lg shadow-[#e63922]/30 transition active:scale-95">Armá tu pizza</a>
              <a href="#combos" className="rounded-full border border-[#f5e9d6]/25 px-7 py-4 font-bold uppercase tracking-wide">Ver combos</a>
            </div>
            <div className="mt-8 flex gap-6 text-sm">
              <div><div className="font-(family-name:--fd) text-3xl">35′</div><div className="text-[#f5e9d6]/55">delivery promedio</div></div>
              <div><div className="font-(family-name:--fd) text-3xl">4,9★</div><div className="text-[#f5e9d6]/55">en Google</div></div>
              <div><div className="font-(family-name:--fd) text-3xl">48 h</div><div className="text-[#f5e9d6]/55">de fermentación</div></div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-[#e63922]/30 blur-3xl" />
            <SmartImg eager src={img('1574071318508-1cdbab80d002', 900, 900)} alt="Pizza Margherita recién horneada" fallback="radial-gradient(circle,#f3c46a,#b5281c)" className="relative aspect-square rounded-full shadow-2xl shadow-black/60 ring-8 ring-[#f5e9d6]/5" />
            <div className="absolute -bottom-2 left-0 rotate-[-6deg] rounded-2xl bg-[#f5e9d6] px-4 py-3 text-[#141210] shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#e63922]">Hoy</div>
              <div className="font-(family-name:--fd) text-xl uppercase">2x1 especiales</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMBOS */}
      <section id="combos" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-6">
        <Reveal><h2 className="font-(family-name:--fd) text-5xl uppercase">Combos <span className="text-[#e63922]">&</span> promos</h2></Reveal>
        <Tip dark className="mt-3 !mx-0">los combos suben el ticket promedio: el cliente arma pedidos más grandes sin que tengas que ofrecerlo por teléfono.</Tip>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {COMBOS.map((c, i) => (
            <Reveal key={c.id} delay={i * 80} className="relative overflow-hidden rounded-3xl border-2 border-dashed border-[#f5e9d6]/15 bg-[#1e1a17] p-5">
              <span className="rounded-full bg-[#3f7d3a] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{c.tag}</span>
              <div className="mt-3 font-(family-name:--fd) text-3xl uppercase">{c.name}</div>
              <p className="mt-1 text-[14px] text-[#f5e9d6]/65">{c.desc}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[13px] text-[#f5e9d6]/40 line-through">{money(c.was)}</div>
                  <div className="font-(family-name:--fd) text-3xl text-[#ffb199]">{money(c.price)}</div>
                </div>
                <button onClick={() => { cart.add({ key: c.id, name: c.name, price: c.price, detail: c.desc }); toast(`${c.name} al carrito`) }}
                  className="rounded-full bg-[#f5e9d6] px-5 py-2.5 text-sm font-bold text-[#141210] transition active:scale-95">Lo quiero</button>
              </div>
              <div className="absolute -right-6 -top-6 grid h-20 w-20 place-items-end rounded-full bg-[#e63922] p-4 pb-5 pr-6 text-sm font-extrabold">-{Math.round((1 - c.price / c.was) * 100)}%</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PIZZAS */}
      <section id="pizzas" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-16">
        <Reveal><h2 className="font-(family-name:--fd) text-5xl uppercase">Nuestras pizzas</h2></Reveal>
        <Tip dark className="mt-3 !mx-0">cada pizza se configura como en el mostrador: tamaño, mitad y mitad y adicionales. El pedido llega completo y sin errores.</Tip>
        <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5">
          {(['Todas', 'Clásicas', 'Especiales', 'Veggie'] as const).map((v) => (
            <button key={v} onClick={() => setVariety(v)} className={cx('shrink-0 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition', variety === v ? 'bg-[#e63922] text-white' : 'bg-[#1e1a17] text-[#f5e9d6]/70')}>{v}</button>
          ))}
        </div>
        <div key={variety} className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {list.map((p, i) => (
            <button key={p.id} onClick={() => setBuilder(p)} className="animate-fade-up group overflow-hidden rounded-3xl bg-[#1e1a17] text-left transition hover:bg-[#25201c]" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="relative">
                <SmartImg src={img(p.img, 500, 500)} alt={`Pizza ${p.name}`} fallback={`radial-gradient(circle,${p.color},#8a2a1c)`} className="aspect-square transition duration-500 group-hover:scale-105" />
                {p.hot && <span className="absolute left-2 top-2 rounded-full bg-[#141210]/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ffb199] backdrop-blur">🔥 Top</span>}
              </div>
              <div className="p-3.5">
                <div className="font-(family-name:--fd) text-xl uppercase leading-tight sm:text-2xl">{p.name}</div>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-[#f5e9d6]/55">{p.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-[12px] text-[#f5e9d6]/50">desde <b className="text-[15px] text-[#f5e9d6]">{money(sizePrice(p.base, 0.62))}</b></div>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e63922] transition group-active:scale-90"><Plus className="h-4 w-4" /></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* EXTRAS */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl uppercase">Para acompañar</h2></Reveal>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2">
          {SIDES.map((s) => (
            <div key={s.id} className="w-40 shrink-0 overflow-hidden rounded-2xl bg-[#1e1a17]">
              <SmartImg src={img(s.img, 320, 240)} alt={s.name} fallback="linear-gradient(135deg,#3a2a20,#8a2a1c)" className="aspect-[4/3]" />
              <div className="p-3">
                <div className="text-[14px] font-semibold leading-tight">{s.name}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold">{money(s.p)}</span>
                  <button onClick={() => { cart.add({ key: s.id, name: s.name, price: s.p }); toast(`${s.name} agregado`) }} className="grid h-8 w-8 place-items-center rounded-full bg-[#f5e9d6] text-[#141210]" aria-label={`Agregar ${s.name}`}><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal className="rounded-[32px] bg-[#f5e9d6] p-6 text-[#141210] sm:p-10">
          <h2 className="font-(family-name:--fd) text-4xl uppercase sm:text-5xl">Pedir es así de fácil</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[{ i: ChefHat, t: 'Armás tu pizza', d: 'Tamaño, masa, mitad y mitad, adicionales.' }, { i: Timer, t: 'Confirmás', d: 'Delivery o retiro, y elegís cómo pagar.' }, { i: Bike, t: 'Seguís el pedido', d: 'Ves cuándo entra al horno y cuándo sale.' }].map(({ i: I, t, d }, k) => (
              <div key={t} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e63922] text-white"><I className="h-6 w-6" /></div>
                <div><div className="font-bold">{k + 1}. {t}</div><p className="text-[14px] text-[#141210]/65">{d}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#141210]/5 p-4 text-sm"><Clock className="h-5 w-5 shrink-0 text-[#e63922]" /> Martes a domingos de 19:00 a 00:30 · Av. Mitre 2150, Berazategui</div>
        </Reveal>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-12 text-center text-sm text-[#f5e9d6]/45">
        <div className="font-(family-name:--fd) text-2xl uppercase text-[#f5e9d6]">Forno <span className="text-[#e63922]">Napoli</span></div>
        Pizza napoletana en Berazategui · @fornonapoli
      </footer>

      {cart.count > 0 && !cartOpen && !builder && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-2xl bg-[#e63922] px-5 py-3.5 font-bold uppercase tracking-wide text-white shadow-2xl shadow-[#e63922]/40">
            <span>Ver pedido ({cart.count})</span><span>{money(cart.total)}</span>
          </button>
        </div>
      )}

      <Builder pizza={builder} onClose={() => setBuilder(null)} onAdd={(line) => { cart.add(line); toast('Pizza agregada al pedido 🍕'); setBuilder(null) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onConfirm={(t) => { setCartOpen(false); setTracking(t) }} />
      <Tracking data={tracking} cart={cart} onClose={() => setTracking(null)} />
    </DemoShell>
  )
}

/* ─────────── Pizza visual (SVG) ─────────── */
function PizzaArt({ a, b, size }: { a: Pizza; b: Pizza | null; size: number }) {
  const r = 70 + size * 12
  const dots = (p: Pizza, half: 'L' | 'R' | 'F') =>
    Array.from({ length: 22 }).map((_, i) => {
      const ang = (i * 137.5 * Math.PI) / 180
      const rad = Math.sqrt((i + 0.5) / 22) * (r - 18)
      let x = Math.cos(ang) * rad, y = Math.sin(ang) * rad
      if (half === 'L' && x > -4) x = -Math.abs(x) - 6
      if (half === 'R' && x < 4) x = Math.abs(x) + 6
      return <circle key={p.id + i + half} cx={100 + x} cy={100 + y} r={i % 3 ? 4 : 6} fill={p.dots} opacity={0.85} />
    })
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-2xl transition-all duration-500">
      <circle cx="100" cy="100" r={r + 8} fill="#d9a35b" />
      <circle cx="100" cy="100" r={r + 8} fill="url(#crust)" opacity=".5" />
      {b ? (
        <>
          <path d={`M100 ${100 - r} A ${r} ${r} 0 0 0 100 ${100 + r} Z`} fill={a.color} />
          <path d={`M100 ${100 - r} A ${r} ${r} 0 0 1 100 ${100 + r} Z`} fill={b.color} />
          {dots(a, 'L')}{dots(b, 'R')}
          <line x1="100" y1={100 - r - 8} x2="100" y2={100 + r + 8} stroke="#141210" strokeWidth="2" strokeDasharray="4 4" />
        </>
      ) : (
        <><circle cx="100" cy="100" r={r} fill={a.color} />{dots(a, 'F')}</>
      )}
      <defs><radialGradient id="crust"><stop offset=".85" stopColor="transparent" /><stop offset="1" stopColor="#7a4a1c" /></radialGradient></defs>
    </svg>
  )
}

/* ─────────── Armador de pizza ─────────── */
function Builder({ pizza, onClose, onAdd }: { pizza: Pizza | null; onClose: () => void; onAdd: (l: { key: string; name: string; price: number; qty: number; detail: string; image: string }) => void }) {
  const [size, setSize] = useState(1)
  const [half, setHalf] = useState<Pizza | null>(null)
  const [mode, setMode] = useState<'entera' | 'mitad'>('entera')
  const [dough, setDough] = useState(0)
  const [extras, setExtras] = useState<string[]>([])
  const [qty, setQty] = useState(1)
  useEffect(() => { if (pizza) { setSize(1); setHalf(null); setMode('entera'); setDough(0); setExtras([]); setQty(1) } }, [pizza])
  if (!pizza) return null
  const second = mode === 'mitad' ? half : null
  const s = SIZES[size]
  // regla habitual: mitad y mitad se cobra al precio de la mitad más cara
  const base = sizePrice(Math.max(pizza.base, second?.base ?? 0), s.mult)
  const extrasP = EXTRAS.filter((e) => extras.includes(e.id)).reduce((t, e) => t + e.p, 0)
  const unit = base + DOUGH[dough].p + extrasP
  const name = second ? `½ ${pizza.name} + ½ ${second.name}` : `Pizza ${pizza.name}`
  const detail = [s.name, DOUGH[dough].name, ...EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.name)].join(', ')
  const canAdd = mode === 'entera' || !!half
  return (
    <Sheet open onClose={onClose} className="bg-[#1b1714]" label="Armá tu pizza">
      <div className="flex min-h-0 flex-col" style={{ fontFamily: 'Rubik, sans-serif', color: '#f5e9d6' }}>
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="font-(family-name:--fd) text-3xl uppercase">{pizza.name}</div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
          <div className="mx-auto my-2 h-48 w-48"><PizzaArt a={pizza} b={second} size={size} /></div>
          {second && <div className="text-center text-sm font-semibold text-[#ffb199]">½ {pizza.name} · ½ {second.name}</div>}

          <Label n={1} t="Tamaño" />
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((z, i) => (
              <button key={z.id} onClick={() => setSize(i)} className={cx('rounded-2xl p-3 text-left ring-2 transition', size === i ? 'bg-[#e63922]/15 ring-[#e63922]' : 'bg-white/5 ring-transparent')}>
                <div className="font-bold">{z.name}</div>
                <div className="text-[11px] leading-tight text-[#f5e9d6]/55">{z.sub}</div>
                <div className="mt-1 text-[13px] font-bold">{money(sizePrice(pizza.base, z.mult))}</div>
              </button>
            ))}
          </div>

          <Label n={2} t="¿Entera o mitad y mitad?" />
          <div className="grid grid-cols-2 gap-1 rounded-full bg-white/5 p-1">
            {(['entera', 'mitad'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={cx('rounded-full py-2.5 text-sm font-bold transition', mode === m && 'bg-[#f5e9d6] text-[#141210]')}>{m === 'entera' ? 'Entera' : 'Mitad y mitad'}</button>
            ))}
          </div>
          {mode === 'mitad' && (
            <div className="animate-fade-in mt-3">
              <div className="mb-2 text-[13px] text-[#f5e9d6]/60">Elegí la otra mitad (se cobra la más cara):</div>
              <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
                {PIZZAS.filter((p) => p.id !== pizza.id).map((p) => (
                  <button key={p.id} onClick={() => setHalf(p)} className={cx('w-24 shrink-0 rounded-2xl p-2 text-center ring-2 transition', half?.id === p.id ? 'bg-[#e63922]/15 ring-[#e63922]' : 'bg-white/5 ring-transparent')}>
                    <div className="mx-auto h-12 w-12"><PizzaArt a={p} b={null} size={0} /></div>
                    <div className="mt-1 text-[12px] font-semibold leading-tight">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Label n={3} t="Masa" />
          <div className="flex flex-wrap gap-2">
            {DOUGH.map((d, i) => (
              <button key={d.id} onClick={() => setDough(i)} className={cx('rounded-full px-4 py-2 text-sm font-semibold ring-1 transition', dough === i ? 'bg-[#f5e9d6] text-[#141210] ring-[#f5e9d6]' : 'ring-white/15')}>
                {d.name}{d.p ? ` +${money(d.p)}` : ''}
              </button>
            ))}
          </div>

          <Label n={4} t="Adicionales" />
          <div className="grid grid-cols-2 gap-2">
            {EXTRAS.map((e) => {
              const on = extras.includes(e.id)
              return (
                <button key={e.id} onClick={() => setExtras((x) => (on ? x.filter((y) => y !== e.id) : [...x, e.id]))}
                  className={cx('flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] ring-1 transition', on ? 'bg-[#3f7d3a]/25 ring-[#3f7d3a]' : 'ring-white/10')}>
                  <span className={cx('grid h-5 w-5 shrink-0 place-items-center rounded-md', on ? 'bg-[#3f7d3a]' : 'bg-white/10')}>{on && <Check className="h-3.5 w-3.5" />}</span>
                  <span className="flex-1 leading-tight">{e.name}</span>
                  <span className="text-[#f5e9d6]/60">{e.p ? `+${money(e.p)}` : 'gratis'}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center rounded-full bg-white/10">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-11 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-5 text-center font-bold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-11 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button disabled={!canAdd} onClick={() => onAdd({ key: `${name}|${detail}`, name, price: unit, qty, detail, image: pizza.img })}
            className="flex h-12 flex-1 items-center justify-between rounded-full bg-[#e63922] px-5 font-bold uppercase tracking-wide text-white transition active:scale-[.98] disabled:opacity-40">
            <span>{canAdd ? 'Agregar' : 'Elegí la mitad'}</span><span>{money(unit * qty)}</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}
const Label = ({ n, t }: { n: number; t: string }) => (
  <div className="mb-2 mt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#f5e9d6]/80">
    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e63922] text-[12px] text-white">{n}</span>{t}
  </div>
)

/* ─────────── Carrito ─────────── */
function CartSheet({ open, onClose, cart, onConfirm }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart>; onConfirm: (t: { mode: string; total: number }) => void }) {
  const [mode, setMode] = useState<'delivery' | 'retiro'>('delivery')
  const [pay, setPay] = useState('Efectivo')
  const fee = mode === 'delivery' && cart.total < 25000 ? 2200 : 0
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-[#1b1714]" label="Tu pedido">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Rubik, sans-serif', color: '#f5e9d6' }}>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="font-(family-name:--fd) text-3xl uppercase">Tu pedido</div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div><div className="text-6xl">🍕</div><p className="mt-3 font-bold">Todavía no elegiste ninguna pizza</p>
              <button onClick={onClose} className="mt-5 rounded-full bg-[#e63922] px-6 py-3 text-sm font-bold uppercase text-white">Ver pizzas</button></div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              <ul className="space-y-3">
                {cart.lines.map((l) => (
                  <li key={l.key} className="rounded-2xl bg-white/5 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0"><div className="font-bold leading-tight">{l.name}</div>{l.detail && <div className="mt-0.5 text-[12px] leading-snug text-[#f5e9d6]/50">{l.detail}</div>}</div>
                      <div className="shrink-0 font-bold">{money(l.price * l.qty)}</div>
                    </div>
                    <div className="mt-2 flex items-center rounded-full bg-white/5 w-fit">
                      <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                      <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                      <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                {(['delivery', 'retiro'] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)} className={cx('flex flex-col items-center gap-1 rounded-2xl p-3 text-sm font-bold ring-2 transition', mode === m ? 'bg-[#e63922]/15 ring-[#e63922]' : 'bg-white/5 ring-transparent')}>
                    {m === 'delivery' ? <Bike className="h-5 w-5" /> : <Store className="h-5 w-5" />}
                    {m === 'delivery' ? 'Delivery · 35′' : 'Retiro · 20′'}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {['Efectivo', 'Transferencia', 'Tarjeta'].map((p) => (
                  <button key={p} onClick={() => setPay(p)} className={cx('flex-1 rounded-xl py-2 text-[13px] font-semibold ring-1', pay === p ? 'bg-[#f5e9d6] text-[#141210] ring-[#f5e9d6]' : 'ring-white/15')}>{p}</button>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between text-sm text-[#f5e9d6]/70"><span>Envío</span><span>{mode === 'retiro' ? 'Sin cargo' : fee ? money(fee) : 'Gratis'}</span></div>
              <div className="mt-1 flex justify-between font-(family-name:--fd) text-3xl"><span>TOTAL</span><span>{money(cart.total + fee)}</span></div>
              <button onClick={() => onConfirm({ mode: `${mode === 'delivery' ? 'Delivery' : 'Retiro'} · ${pay}`, total: cart.total + fee })}
                className="mt-4 w-full rounded-full bg-[#e63922] py-4 font-bold uppercase tracking-wide text-white transition active:scale-[.98]">Confirmar pedido</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

/* ─────────── Seguimiento simulado ─────────── */
const STEPS = [
  { t: 'Pedido recibido', d: 'Ya lo vimos en la cocina', i: Check },
  { t: 'En el horno', d: 'A 480 °C, 90 segundos', i: Flame },
  { t: 'En camino', d: 'Tu pedido salió del local', i: Bike },
  { t: '¡Que lo disfrutes!', d: 'Entregado', i: PartyPopper },
]
function Tracking({ data, cart, onClose }: { data: null | { mode: string; total: number }; cart: ReturnType<typeof useCart>; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [wa, setWa] = useState(false)
  const [snapshot, setSnapshot] = useState('')
  const [num] = useState(() => 1000 + Math.floor(Math.random() * 8999))
  useEffect(() => {
    if (!data) return
    setStep(0)
    setSnapshot(orderText(BIZ, cart.lines, data.total, ['', `Pedido #${num} · ${data.mode}`]))
    cart.clear()
    const ids = [1, 2, 3].map((s) => setTimeout(() => setStep(s), s * 2200))
    return () => ids.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <>
      <Sheet open={!!data} onClose={onClose} side="center" className="bg-[#f5e9d6]" label="Seguimiento del pedido">
        <div className="p-6 text-[#141210]" style={{ fontFamily: 'Rubik, sans-serif' }}>
          <div className="text-[12px] font-bold uppercase tracking-widest text-[#e63922]">Pedido #{num}</div>
          <div className="font-(family-name:--fd) text-4xl uppercase">¡Gracias por tu pedido!</div>
          <div className="mt-1 text-sm text-[#141210]/60">{data?.mode} · {data && money(data.total)}</div>
          <ol className="mt-6 space-y-0">
            {STEPS.map((s, i) => {
              const done = i <= step
              return (
                <li key={s.t} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cx('grid h-10 w-10 place-items-center rounded-full transition-all duration-500', done ? 'bg-[#e63922] text-white' : 'bg-[#141210]/10 text-[#141210]/30', i === step && 'animate-pop')}><s.i className="h-5 w-5" /></div>
                    {i < STEPS.length - 1 && <div className={cx('h-8 w-0.5 transition-colors duration-700', i < step ? 'bg-[#e63922]' : 'bg-[#141210]/10')} />}
                  </div>
                  <div className={cx('pt-1.5 transition-opacity', done ? 'opacity-100' : 'opacity-40')}><div className="font-bold">{s.t}</div><div className="text-[13px] text-[#141210]/60">{s.d}</div></div>
                </li>
              )
            })}
          </ol>
          <p className="mt-4 rounded-xl bg-[#141210]/5 p-3 text-[12px] text-[#141210]/60">Simulación acelerada: en la web real el estado se actualiza a medida que la cocina avanza.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => setWa(true)} className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Ver en WhatsApp</button>
            <button onClick={onClose} className="rounded-full bg-[#141210] py-3 text-sm font-bold text-white">Cerrar</button>
          </div>
        </div>
      </Sheet>
      <WhatsAppSim open={wa} onClose={() => setWa(false)} business={BIZ} message={snapshot} />
    </>
  )
}
