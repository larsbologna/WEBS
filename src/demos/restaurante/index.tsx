import { useMemo, useRef, useState } from 'react'
import { Bike, Clock, Leaf, MapPin, Minus, Navigation, Phone, Plus, ShoppingBag, Star, Store, Trash2, X, Flame } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { WhatsAppOrderButton } from '../../shared/whatsapp'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Casa del Sabor'
const C = { bg: '#f6efe4', ink: '#2a1d14', terra: '#b4441f', olive: '#5b6340', card: '#fffaf2' }

type Dish = { id: string; cat: string; name: string; desc: string; price: number; img: string; tags?: ('top' | 'veggie' | 'picante' | 'nuevo')[] }

const CATS = ['Entradas', 'Parrilla', 'Pastas', 'Principales', 'Postres', 'Bebidas'] as const

const MENU: Dish[] = [
  { id: 'e1', cat: 'Entradas', name: 'Empanadas cortadas a cuchillo', desc: 'Carne, cebolla de verdeo y huevo. Masa casera al horno de barro. Precio por unidad.', price: 1900, img: '1609501676725-7186f017a4b7', tags: ['top'] },
  { id: 'e2', cat: 'Entradas', name: 'Provoleta de la casa', desc: 'Provolone a la parrilla con orégano, ají molido y tomates asados.', price: 8900, img: '1452195100486-9cc805987862' },
  { id: 'e3', cat: 'Entradas', name: 'Bruschettas de campo', desc: 'Pan de masa madre, tomate confitado, albahaca y aceite de oliva.', price: 7600, img: '1572695157366-5e585ab2b69f', tags: ['veggie'] },
  { id: 'e4', cat: 'Entradas', name: 'Tabla del bodegón', desc: 'Jamón crudo, salame de Tandil, quesos, aceitunas y escabeches. Para 2.', price: 16500, img: '1541529086526-db283c563270' },
  { id: 'p1', cat: 'Parrilla', name: 'Ojo de bife 400 g', desc: 'Madurado, a la leña, con papas rústicas y chimichurri de la casa.', price: 24900, img: '1600891964092-4316c288032e', tags: ['top'] },
  { id: 'p2', cat: 'Parrilla', name: 'Asado de tira', desc: 'Corte grueso, cocción lenta. Con ensalada criolla.', price: 19800, img: '1544025162-d76694265947' },
  { id: 'p3', cat: 'Parrilla', name: 'Brochettes de pollo', desc: 'Pollo marinado, morrón y cebolla morada, con puré de calabaza.', price: 14600, img: '1555939594-58d7cb561ad1', tags: ['picante'] },
  { id: 'p4', cat: 'Parrilla', name: 'Lomo al champignon', desc: 'Medallón de lomo, salsa de hongos y crema, papas noisette.', price: 26500, img: '1546833999-b9f581a1996d', tags: ['nuevo'] },
  { id: 'a1', cat: 'Pastas', name: 'Sorrentinos de jamón y queso', desc: 'Pasta casera con salsa fileto o crema, a elección.', price: 13900, img: '1621996346565-e3dbc646d9a9', tags: ['top'] },
  { id: 'a2', cat: 'Pastas', name: 'Tallarines a la bolognesa', desc: 'Huevo y sémola, ragú de carne cocido 6 horas.', price: 12400, img: '1551183053-bf91a1d81141' },
  { id: 'a3', cat: 'Pastas', name: 'Ñoquis de papa', desc: 'Con salsa de tomates frescos, albahaca y parmesano.', price: 11200, img: '1473093295043-cdd812d0e601', tags: ['veggie'] },
  { id: 'm1', cat: 'Principales', name: 'Hamburguesa del bodegón', desc: 'Doble medallón, cheddar, panceta crocante, cebolla caramelizada y papas.', price: 13500, img: '1568901346375-23c9450c58cd' },
  { id: 'm2', cat: 'Principales', name: 'Bowl de la huerta', desc: 'Quinoa, palta, garbanzos asados, vegetales de estación y aderezo de yogur.', price: 11800, img: '1540189549336-e6e99c3679fe', tags: ['veggie', 'nuevo'] },
  { id: 'm3', cat: 'Principales', name: 'Ensalada César', desc: 'Lechuga, pollo grillé, croutons, parmesano y aderezo César casero.', price: 10900, img: '1512621776951-a57141f2eefd' },
  { id: 'd1', cat: 'Postres', name: 'Panqueques con dulce de leche', desc: 'Dos panqueques recién hechos, flambeados al momento.', price: 6400, img: '1528207776546-365bb710ee93', tags: ['top'] },
  { id: 'd2', cat: 'Postres', name: 'Tiramisú de la casa', desc: 'Vainillas embebidas en café, mascarpone y cacao amargo.', price: 7200, img: '1571877227200-a0d98ea607e9' },
  { id: 'd3', cat: 'Postres', name: 'Volcán de chocolate', desc: 'Centro fundido y helado de crema americana.', price: 7800, img: '1606313564200-e75d5e30476c' },
  { id: 'b1', cat: 'Bebidas', name: 'Malbec reserva (botella)', desc: 'Mendoza, 750 ml. Ideal para carnes.', price: 18900, img: '1510812431401-41d2bd2722f3' },
  { id: 'b2', cat: 'Bebidas', name: 'Limonada con menta y jengibre', desc: 'Jarra de 1 litro, exprimida en el momento.', price: 6200, img: '1556679343-c7306c1976bc', tags: ['veggie'] },
  { id: 'b3', cat: 'Bebidas', name: 'Cerveza artesanal IPA', desc: 'Pinta 500 ml de cervecería local.', price: 5400, img: '1608270586620-248524c67de9' },
]

const PROMOS = [
  { id: 'pr1', title: 'Menú ejecutivo', sub: 'Lun a vie · 12 a 15 h', desc: 'Plato del día + bebida + postre', price: 12900, was: 17500, img: '1504674900247-0877df9cc836' },
  { id: 'pr2', title: 'Martes de pastas 2x1', sub: 'Todos los martes', desc: 'Llevás 2 platos de pasta, pagás 1', price: 13900, was: 27800, img: '1621996346565-e3dbc646d9a9' },
  { id: 'pr3', title: 'Parrillada para 2', sub: 'Viernes y sábados', desc: 'Asado, vacío, chorizo, morcilla + 2 guarniciones', price: 34900, was: 42000, img: '1544025162-d76694265947' },
]

const HOURS = [
  { d: 'Lunes', h: '12:00 – 15:30 · 20:00 – 23:30', o: [[12, 15.5], [20, 23.5]] },
  { d: 'Martes', h: '12:00 – 15:30 · 20:00 – 23:30', o: [[12, 15.5], [20, 23.5]] },
  { d: 'Miércoles', h: '12:00 – 15:30 · 20:00 – 23:30', o: [[12, 15.5], [20, 23.5]] },
  { d: 'Jueves', h: '12:00 – 15:30 · 20:00 – 23:30', o: [[12, 15.5], [20, 23.5]] },
  { d: 'Viernes', h: '12:00 – 15:30 · 20:00 – 00:30', o: [[12, 15.5], [20, 24.5]] },
  { d: 'Sábado', h: '12:00 – 16:00 · 20:00 – 00:30', o: [[12, 16], [20, 24.5]] },
  { d: 'Domingo', h: '12:00 – 16:30', o: [[12, 16.5]] },
]

const TAG: Record<string, { t: string; c: string }> = {
  top: { t: 'Más pedido', c: 'bg-[#b4441f] text-white' },
  veggie: { t: 'Veggie', c: 'bg-[#5b6340] text-white' },
  picante: { t: 'Picante', c: 'bg-amber-500 text-white' },
  nuevo: { t: 'Nuevo', c: 'bg-[#2a1d14] text-[#f6efe4]' },
}

function openStatus() {
  const now = new Date()
  const idx = (now.getDay() + 6) % 7
  const t = now.getHours() + now.getMinutes() / 60
  const day = HOURS[idx]
  const range = day.o.find(([a, b]) => t >= a && t < b)
  if (range) {
    const close = range[1] % 24
    return { open: true, idx, text: `Abierto · cierra ${String(Math.floor(close)).padStart(2, '0')}:${close % 1 ? '30' : '00'}` }
  }
  const nextR = day.o.find(([a]) => t < a)
  return { open: false, idx, text: nextR ? `Cerrado · abre ${nextR[0]}:00` : 'Cerrado · abre mañana 12:00' }
}

export default function Restaurante() {
  const cart = useCart('restaurante')
  const [cat, setCat] = useState<(typeof CATS)[number]>('Entradas')
  const [veggie, setVeggie] = useState(false)
  const [dish, setDish] = useState<Dish | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const status = useMemo(openStatus, [])
  const menuRef = useRef<HTMLDivElement>(null)

  const items = MENU.filter((d) => d.cat === cat && (!veggie || d.tags?.includes('veggie')))

  const goMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <DemoShell slug="restaurante" fonts="family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,500&family=Karla:wght@400;500;600;700" themeColor={C.bg}
      className="pb-24" style={{ background: C.bg, color: C.ink, fontFamily: 'Karla, sans-serif', ['--fd' as string]: '"Playfair Display", Georgia, serif' }}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#2a1d14]/10 bg-[#f6efe4]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="leading-none">
            <div className="font-(family-name:--fd) text-[22px] font-extrabold tracking-tight">Casa <i className="font-medium text-[#b4441f]">del</i> Sabor</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.25em] text-[#2a1d14]/55">Bodegón · desde 1998</div>
          </a>
          <nav className="hidden items-center gap-7 text-[15px] font-semibold md:flex">
            <button onClick={goMenu}>Menú</button>
            <a href="#promos">Promos</a>
            <a href="#visitanos">Visitanos</a>
          </nav>
          <button onClick={() => setCartOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full bg-[#2a1d14] text-[#f6efe4]" aria-label="Ver pedido">
            <ShoppingBag className="h-5 w-5" />
            {cart.count > 0 && <span key={cart.count} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#b4441f] px-1 text-[11px] font-bold">{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-5">
        <div className="relative overflow-hidden rounded-[28px]">
          <SmartImg eager src={img('1517248135467-4c7edcad34c4', 1400, 1000)} alt="Salón de Casa del Sabor" fallback="linear-gradient(135deg,#7c2d12,#2a1d14)" className="h-[540px] sm:h-[560px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a110b] via-[#1a110b]/45 to-[#1a110b]/10" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-[#f6efe4] sm:p-10">
            <div className="animate-fade-up mb-4 flex flex-wrap gap-2 text-[12px] font-semibold">
              <span className={cx('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur', status.open ? 'bg-emerald-500/25' : 'bg-white/15')}>
                <span className={cx('h-2 w-2 rounded-full', status.open ? 'bg-emerald-400' : 'bg-white/60')} /> {status.text}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> 4,8 · 1.240 reseñas</span>
            </div>
            <h1 className="animate-fade-up font-(family-name:--fd) text-[44px] font-bold leading-[1] sm:text-7xl" style={{ animationDelay: '80ms' }}>
              Cocina de casa,<br /><i className="font-medium text-[#f2b48f]">hecha sin apuro.</i>
            </h1>
            <p className="animate-fade-up mt-4 max-w-md text-[16px] leading-relaxed text-[#f6efe4]/80" style={{ animationDelay: '160ms' }}>
              Parrilla a la leña, pastas amasadas cada mañana y postres de la abuela. Pedí desde acá y te lo llevamos, o retiralo sin esperar.
            </p>
            <div className="animate-fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <button onClick={goMenu} className="rounded-full bg-[#b4441f] px-6 py-3.5 font-bold text-white shadow-lg shadow-black/30 transition hover:bg-[#9c3a19] active:scale-95">Ver menú y pedir</button>
              <a href="#visitanos" className="rounded-full bg-white/15 px-6 py-3.5 font-bold backdrop-blur transition hover:bg-white/25">Cómo llegar</a>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[13px]">
          {[{ i: Bike, t: 'Delivery', s: '30–45 min' }, { i: Store, t: 'Take away', s: 'listo en 20′' }, { i: Flame, t: 'Parrilla', s: 'a la leña' }].map(({ i: I, t, s }) => (
            <div key={t} className="rounded-2xl bg-[#fffaf2] px-2 py-3 ring-1 ring-[#2a1d14]/5">
              <I className="mx-auto h-5 w-5 text-[#b4441f]" />
              <div className="mt-1 font-bold">{t}</div>
              <div className="text-[#2a1d14]/55">{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOS */}
      <section id="promos" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-14">
        <Reveal>
          <div className="text-[12px] font-bold uppercase tracking-[.25em] text-[#b4441f]">Promociones de la semana</div>
          <h2 className="mt-1 font-(family-name:--fd) text-4xl font-bold">Para darse un gusto</h2>
        </Reveal>
        <Tip className="mt-4 !mx-0">tus promos se ven primero y se agregan al pedido con un toque. Ideal para mover los días flojos.</Tip>
        <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
          {PROMOS.map((p) => (
            <div key={p.id} className="w-[82%] max-w-sm shrink-0 snap-start overflow-hidden rounded-3xl bg-[#2a1d14] text-[#f6efe4] sm:w-[340px]">
              <div className="relative">
                <SmartImg src={img(p.img, 700, 440)} alt={p.title} fallback="linear-gradient(135deg,#7c2d12,#2a1d14)" className="aspect-[16/10]" />
                <span className="absolute left-3 top-3 rounded-full bg-[#b4441f] px-3 py-1 text-[12px] font-bold">-{Math.round((1 - p.price / p.was) * 100)}%</span>
              </div>
              <div className="p-5">
                <div className="text-[12px] font-semibold uppercase tracking-widest text-[#f2b48f]">{p.sub}</div>
                <div className="mt-1 font-(family-name:--fd) text-2xl font-bold">{p.title}</div>
                <p className="mt-1 text-[14px] text-[#f6efe4]/70">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold">{money(p.price)}</span>
                    <span className="ml-2 text-sm text-[#f6efe4]/45 line-through">{money(p.was)}</span>
                  </div>
                  <button onClick={() => { cart.add({ key: p.id, name: `Promo ${p.title}`, price: p.price, image: p.img }); toast(`${p.title} agregada al pedido`) }}
                    className="rounded-full bg-[#f6efe4] px-4 py-2 text-sm font-bold text-[#2a1d14] transition active:scale-95">Agregar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section ref={menuRef} className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-14">
        <Reveal>
          <div className="text-[12px] font-bold uppercase tracking-[.25em] text-[#b4441f]">Menú digital</div>
          <h2 className="mt-1 font-(family-name:--fd) text-4xl font-bold">Elegí, sumá y pedí</h2>
        </Reveal>
        <Tip className="mt-4 !mx-0">el menú siempre actualizado, con fotos y precios. Cambiás un precio y se actualiza al instante, sin reimprimir cartas.</Tip>
      </section>
      <div className="sticky top-[65px] z-30 mt-4 bg-[#f6efe4]/95 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={cx('shrink-0 rounded-full px-4 py-2 text-[14px] font-bold transition', cat === c ? 'bg-[#2a1d14] text-[#f6efe4]' : 'bg-[#fffaf2] text-[#2a1d14]/70 ring-1 ring-[#2a1d14]/10')}>
              {c}
            </button>
          ))}
          <button onClick={() => setVeggie((v) => !v)}
            className={cx('flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-bold transition', veggie ? 'bg-[#5b6340] text-white' : 'bg-[#fffaf2] text-[#5b6340] ring-1 ring-[#5b6340]/30')}>
            <Leaf className="h-4 w-4" /> Veggie
          </button>
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-5 pt-2">
        {items.length === 0 && (
          <div className="rounded-3xl bg-[#fffaf2] p-8 text-center">
            <p className="font-bold">No hay opciones veggie en {cat}.</p>
            <button onClick={() => setVeggie(false)} className="mt-3 text-sm font-bold text-[#b4441f] underline">Ver todo {cat}</button>
          </div>
        )}
        <div key={cat + veggie} className="grid gap-3 md:grid-cols-2">
          {items.map((d, i) => {
            const inCart = cart.lines.find((l) => l.key === d.id)
            return (
              <div key={d.id} className="animate-fade-up flex gap-3 rounded-3xl bg-[#fffaf2] p-3 ring-1 ring-[#2a1d14]/5" style={{ animationDelay: `${i * 50}ms` }}>
                <button onClick={() => setDish(d)} className="shrink-0" aria-label={`Ver ${d.name}`}>
                  <SmartImg src={img(d.img, 300, 300)} alt={d.name} fallback="linear-gradient(135deg,#e7c9a9,#b4441f)" className="h-28 w-28 rounded-2xl sm:h-32 sm:w-32" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap gap-1">
                    {d.tags?.map((t) => <span key={t} className={cx('rounded-full px-2 py-0.5 text-[10.5px] font-bold', TAG[t].c)}>{TAG[t].t}</span>)}
                  </div>
                  <button onClick={() => setDish(d)} className="mt-1 text-left font-(family-name:--fd) text-[18px] font-bold leading-tight">{d.name}</button>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#2a1d14]/60">{d.desc}</p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-[17px] font-bold">{money(d.price)}</span>
                    {inCart ? (
                      <div className="flex items-center rounded-full bg-[#2a1d14] text-[#f6efe4]">
                        <button onClick={() => cart.inc(d.id, -1)} className="grid h-9 w-9 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
                        <span className="w-5 text-center text-sm font-bold">{inCart.qty}</span>
                        <button onClick={() => cart.inc(d.id, 1)} className="grid h-9 w-9 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <button onClick={() => { cart.add({ key: d.id, name: d.name, price: d.price, image: d.img }); toast(`${d.name} agregado`) }}
                        className="grid h-9 w-9 place-items-center rounded-full bg-[#b4441f] text-white transition active:scale-90" aria-label={`Agregar ${d.name}`}>
                        <Plus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal className="rounded-[28px] bg-[#5b6340] p-6 text-[#f6efe4] sm:p-10">
          <div className="flex items-center gap-1">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-amber-300 text-amber-300" />)}</div>
          <p className="mt-4 font-(family-name:--fd) text-2xl italic leading-snug sm:text-3xl">“Las pastas son como las de mi abuela. Pedí por la web un domingo y llegó todo calentito y en 35 minutos.”</p>
          <div className="mt-4 text-sm font-semibold text-[#f6efe4]/75">Mariela G. · Reseña de Google</div>
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/15 pt-6 text-center">
            {[['+25', 'años en el barrio'], ['4,8★', 'en Google'], ['30′', 'demora promedio']].map(([a, b]) => (
              <div key={b}><div className="font-(family-name:--fd) text-2xl font-bold sm:text-3xl">{a}</div><div className="text-[12px] text-[#f6efe4]/70">{b}</div></div>
            ))}
          </div>
        </Reveal>
        <Tip className="mt-4">las reseñas reales de tus clientes generan confianza y convencen a los que todavía no te conocen.</Tip>
      </section>

      {/* VISITANOS */}
      <section id="visitanos" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-16">
        <Reveal>
          <div className="text-[12px] font-bold uppercase tracking-[.25em] text-[#b4441f]">Visitanos</div>
          <h2 className="mt-1 font-(family-name:--fd) text-4xl font-bold">Te esperamos</h2>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-[#fffaf2] ring-1 ring-[#2a1d14]/5">
            <MapArt />
            <div className="p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#b4441f]" />
                <div>
                  <div className="font-bold">Calle 14 N° 4521, Berazategui</div>
                  <div className="text-sm text-[#2a1d14]/60">A 3 cuadras de la estación · Estacionamiento en la puerta</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => toast('En la web real abre Google Maps con la ruta')} className="flex items-center justify-center gap-2 rounded-full bg-[#2a1d14] py-3 text-sm font-bold text-[#f6efe4]"><Navigation className="h-4 w-4" /> Cómo llegar</button>
                <button onClick={() => toast('En la web real inicia la llamada al local')} className="flex items-center justify-center gap-2 rounded-full bg-[#f6efe4] py-3 text-sm font-bold ring-1 ring-[#2a1d14]/15"><Phone className="h-4 w-4" /> Llamar</button>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[#fffaf2] p-5 ring-1 ring-[#2a1d14]/5">
            <div className="flex items-center gap-2 font-bold"><Clock className="h-5 w-5 text-[#b4441f]" /> Horarios</div>
            <ul className="mt-3 divide-y divide-[#2a1d14]/10">
              {HOURS.map((h, i) => (
                <li key={h.d} className={cx('flex justify-between gap-3 py-2.5 text-[14px]', i === status.idx && 'font-bold text-[#b4441f]')}>
                  <span>{h.d}{i === status.idx && ' · hoy'}</span><span className="text-right">{h.h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Tip className="mt-4">horarios, ubicación y botón para llamar, justo lo que un cliente busca en Google antes de ir.</Tip>
      </section>

      <footer className="mx-auto mt-16 max-w-6xl px-5 pb-10 text-center">
        <div className="font-(family-name:--fd) text-2xl font-extrabold">Casa <i className="font-medium text-[#b4441f]">del</i> Sabor</div>
        <p className="mt-1 text-sm text-[#2a1d14]/55">Cocina de casa en Berazategui · @casadelsabor.bera</p>
      </footer>

      {/* BARRA DE PEDIDO */}
      {cart.count > 0 && !cartOpen && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full bg-[#b4441f] py-2 pl-2 pr-5 font-bold text-white shadow-2xl shadow-[#b4441f]/40">
            <span className="grid h-9 min-w-9 place-items-center rounded-full bg-white/20 px-2 text-sm">{cart.count}</span>
            <span className="text-[15px]">Ver pedido</span>
            <span>{money(cart.total)}</span>
          </button>
        </div>
      )}

      {/* DETALLE PLATO */}
      <DishSheet dish={dish} onClose={() => setDish(null)} onAdd={(d, qty, note) => {
        cart.add({ key: note ? `${d.id}-${note}` : d.id, name: d.name, price: d.price, image: d.img, qty, detail: note || undefined })
        toast(`${qty} × ${d.name} agregado`)
        setDish(null)
      }} />

      {/* CARRITO */}
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </DemoShell>
  )
}

function DishSheet({ dish, onClose, onAdd }: { dish: Dish | null; onClose: () => void; onAdd: (d: Dish, qty: number, note: string) => void }) {
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [lastId, setLastId] = useState<string | null>(null)
  if (dish && dish.id !== lastId) { setLastId(dish.id); setQty(1); setNote('') }
  const opts = dish?.cat === 'Parrilla' ? ['Jugoso', 'A punto', 'Cocido'] : dish?.cat === 'Pastas' ? ['Salsa fileto', 'Salsa crema', 'Mixta'] : []
  return (
    <Sheet open={!!dish} onClose={onClose} className="bg-[#fffaf2]" label="Detalle del plato">
      {dish && (
        <div className="flex min-h-0 flex-col overflow-y-auto" style={{ fontFamily: 'Karla, sans-serif', color: C.ink }}>
          <div className="relative">
            <SmartImg src={img(dish.img, 900, 600)} alt={dish.name} fallback="linear-gradient(135deg,#e7c9a9,#b4441f)" className="aspect-[3/2]" />
            <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90" aria-label="Cerrar"><X className="h-5 w-5" /></button>
          </div>
          <div className="p-5">
            <h3 className="font-(family-name:--fd) text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>{dish.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#2a1d14]/70">{dish.desc}</p>
            {opts.length > 0 && (
              <div className="mt-5">
                <div className="text-sm font-bold">{dish.cat === 'Parrilla' ? 'Punto de cocción' : 'Salsa'}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {opts.map((o) => (
                    <button key={o} onClick={() => setNote(note === o ? '' : o)} className={cx('rounded-full px-4 py-2 text-sm font-bold ring-1 transition', note === o ? 'bg-[#2a1d14] text-[#f6efe4] ring-[#2a1d14]' : 'ring-[#2a1d14]/20')}>{o}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-full bg-[#f6efe4] ring-1 ring-[#2a1d14]/10">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center text-lg font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => onAdd(dish, qty, note)} className="flex h-12 flex-1 items-center justify-between rounded-full bg-[#b4441f] px-5 font-bold text-white active:scale-[.98]">
                <span>Agregar</span><span>{money(dish.price * qty)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-[#f6efe4]" label="Tu pedido">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Karla, sans-serif', color: C.ink }}>
        <div className="flex items-center justify-between border-b border-[#2a1d14]/10 px-5 py-4">
          <h3 className="text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>Tu pedido</h3>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#fffaf2]" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <ShoppingBag className="mx-auto h-12 w-12 text-[#2a1d14]/25" />
              <p className="mt-3 font-bold">Tu pedido está vacío</p>
              <p className="text-sm text-[#2a1d14]/60">Sumá platos desde el menú.</p>
              <button onClick={onClose} className="mt-5 rounded-full bg-[#2a1d14] px-6 py-3 text-sm font-bold text-[#f6efe4]">Ver el menú</button>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <ul className="space-y-3">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-3 rounded-2xl bg-[#fffaf2] p-2.5">
                    {l.image && <SmartImg src={img(l.image, 160, 160)} alt={l.name} className="h-14 w-14 shrink-0 rounded-xl" fallback="linear-gradient(135deg,#e7c9a9,#b4441f)" />}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-bold">{l.name}</div>
                      {l.detail && <div className="text-[12px] text-[#2a1d14]/55">{l.detail}</div>}
                      <div className="text-[13px] font-semibold text-[#b4441f]">{money(l.price * l.qty)}</div>
                    </div>
                    <div className="flex items-center rounded-full bg-[#f6efe4]">
                      <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                      <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                      <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#2a1d14]/10 bg-[#fffaf2] p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="mb-4 flex justify-between text-lg font-bold"><span>Total</span><span>{money(cart.total)}</span></div>
              <WhatsAppOrderButton slug="restaurante" business={BIZ} lines={cart.lines} total={cart.total} />
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

function MapArt() {
  return (
    <div className="relative h-44 overflow-hidden bg-[#ece3d3]">
      <svg viewBox="0 0 400 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="400" height="180" fill="#ece3d3" />
        <path d="M0 120 L400 90" stroke="#fff" strokeWidth="16" />
        <path d="M150 0 L190 180" stroke="#fff" strokeWidth="12" />
        <path d="M300 0 L280 180" stroke="#fff" strokeWidth="8" />
        <path d="M0 40 L400 30" stroke="#fff" strokeWidth="6" />
        <rect x="20" y="55" width="110" height="45" rx="6" fill="#dcd0bb" />
        <rect x="205" y="45" width="60" height="35" rx="6" fill="#cfd8b8" />
        <rect x="310" y="110" width="80" height="55" rx="6" fill="#dcd0bb" />
        <path d="M0 160 Q120 140 400 170" stroke="#b9d3e0" strokeWidth="10" fill="none" />
      </svg>
      <div className="absolute left-[46%] top-[38%] -translate-x-1/2 -translate-y-full">
        <div className="animate-bounce rounded-full bg-[#b4441f] p-2.5 text-white shadow-lg"><MapPin className="h-5 w-5" /></div>
      </div>
      <span className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-[#2a1d14]/70">Mapa ilustrativo</span>
    </div>
  )
}
