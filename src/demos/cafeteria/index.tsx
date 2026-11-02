import { useEffect, useState } from 'react'
import { Clock, Coffee, Dog, MapPin, Minus, Plus, Plug, ShoppingBag, Trash2, Wifi, X, Sparkles, Heart } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { cx, img, money } from '../../shared/format'

const C = { bg: '#efe6da', ink: '#3b2a20', sage: '#7f8f6e', cream: '#f8f3ec', caramel: '#c7894d' }
type Cat = 'Cafés' | 'Fríos' | 'Pastelería' | 'Desayunos'
type Item = { id: string; cat: Cat; name: string; desc: string; price: number; img: string; custom?: boolean; star?: boolean }

const ITEMS: Item[] = [
  { id: 'c1', cat: 'Cafés', name: 'Flat white', desc: 'Doble ristretto y leche texturizada sedosa.', price: 4200, img: '1541167760496-1628856ab772', custom: true, star: true },
  { id: 'c2', cat: 'Cafés', name: 'Cappuccino', desc: 'Espresso, leche y abundante espuma con cacao.', price: 3900, img: '1572442388796-11668a67e53d', custom: true },
  { id: 'c3', cat: 'Cafés', name: 'Latte de vainilla', desc: 'Espresso, leche y almíbar de vainilla casero.', price: 4400, img: '1509042239860-f550ce710b93', custom: true },
  { id: 'c4', cat: 'Cafés', name: 'Espresso', desc: 'Blend de Brasil y Colombia, tostado medio.', price: 2600, img: '1510591509098-f4fdc6d0ff04', custom: true },
  { id: 'c5', cat: 'Cafés', name: 'Mocaccino Moka', desc: 'Nuestra firma: espresso, chocolate amargo y crema.', price: 4600, img: '1514432324607-a09d9b4aefdd', custom: true, star: true },
  { id: 'f1', cat: 'Fríos', name: 'Iced latte', desc: 'Espresso doble sobre hielo y leche fría.', price: 4300, img: '1461023058943-07fcbe16d735', custom: true, star: true },
  { id: 'f2', cat: 'Fríos', name: 'Cold brew', desc: 'Infusionado 16 horas en frío. Suave y dulce.', price: 4100, img: '1517701604599-bb29b565090c', custom: true },
  { id: 'f3', cat: 'Fríos', name: 'Frappé de caramelo', desc: 'Café, hielo, leche y caramelo salado.', price: 5200, img: '1572490122747-3968b75cc699', custom: true },
  { id: 'p1', cat: 'Pastelería', name: 'Medialunas de manteca', desc: 'Horneadas cada mañana. Precio por unidad.', price: 900, img: '1555507036-ab1f4038808a', star: true },
  { id: 'p2', cat: 'Pastelería', name: 'Torta de chocolate', desc: 'Bizcocho húmedo, ganache de chocolate 70%.', price: 5400, img: '1578985545062-69928b1d9587' },
  { id: 'p3', cat: 'Pastelería', name: 'Cheesecake de frutos rojos', desc: 'Base crocante y coulis casero.', price: 5600, img: '1533134242443-d4fd215305ad' },
  { id: 'p4', cat: 'Pastelería', name: 'Cookie con chips', desc: 'Grande, crocante afuera y blanda adentro.', price: 2400, img: '1499636136210-6f4ee915583e' },
  { id: 'p5', cat: 'Pastelería', name: 'Carrot cake', desc: 'Zanahoria, nueces, especias y frosting de queso.', price: 5200, img: '1621303837174-89787a7d4729' },
  { id: 'd1', cat: 'Desayunos', name: 'Avocado toast', desc: 'Pan de masa madre, palta, huevo poché y semillas.', price: 7900, img: '1541519227354-08fa5d50c44d', star: true },
  { id: 'd2', cat: 'Desayunos', name: 'Tostado de jamón y queso', desc: 'En pan de campo, con jamón natural.', price: 6200, img: '1528735602780-2552fd46c7af' },
  { id: 'd3', cat: 'Desayunos', name: 'Pancakes con frutas', desc: 'Tres pancakes, frutas de estación y miel.', price: 7400, img: '1528207776546-365bb710ee93' },
  { id: 'd4', cat: 'Desayunos', name: 'Yogur con granola', desc: 'Yogur natural, granola casera y frutos rojos.', price: 5300, img: '1488477181946-6428a0291777' },
]

const COMBOS = [
  { id: 'k1', name: 'Desayuno Moka', items: 'Café mediano + 2 medialunas + jugo de naranja', price: 7900, was: 9600, img: '1495474472287-4d71bcdd2085', hours: 'Hasta las 12 h' },
  { id: 'k2', name: 'Merienda dulce', items: 'Café o té + porción de torta a elección', price: 8400, was: 9900, img: '1578985545062-69928b1d9587', hours: 'De 16 a 20 h' },
  { id: 'k3', name: 'Brunch para dos', items: '2 cafés + avocado toast + pancakes + jugos', price: 21900, was: 26500, img: '1533089860892-a7c6f0a88666', hours: 'Sáb y dom' },
]

const SIZES = [{ n: 'Chico', p: 0 }, { n: 'Mediano', p: 600 }, { n: 'Grande', p: 1100 }]
const MILKS = [{ n: 'Entera', p: 0 }, { n: 'Descremada', p: 0 }, { n: 'Avena', p: 700 }, { n: 'Almendras', p: 900 }]
const PICKUP = ['Lo antes posible (~10 min)', 'En 20 min', 'En 30 min', 'En 45 min']

export default function Cafeteria() {
  const cart = useCart('cafeteria')
  const [cat, setCat] = useState<Cat>('Cafés')
  const [custom, setCustom] = useState<Item | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [ticket, setTicket] = useState<null | { name: string; when: string; total: number; n: number; lines: string[] }>(null)
  const [stamps, setStamps] = useState(5)

  const quickAdd = (it: Item) => {
    if (it.custom) return setCustom(it)
    cart.add({ key: it.id, name: it.name, price: it.price, image: it.img })
    toast(`${it.name} sumado a tu pedido`)
  }

  return (
    <DemoShell slug="cafeteria" fonts="family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=DM+Sans:wght@400;500;600;700" themeColor={C.bg}
      className="pb-24" style={{ background: C.bg, color: C.ink, fontFamily: '"DM Sans", sans-serif', ['--fd' as string]: 'Fraunces, Georgia, serif' }}>
      <header className="sticky top-0 z-40 bg-[#efe6da]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-[#c7894d]" />
            <span className="font-(family-name:--fd) text-2xl font-semibold italic tracking-tight">moka</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[.3em] text-[#3b2a20]/50">café</span>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full border border-[#3b2a20]/20 px-4 py-2 text-sm font-semibold" aria-label="Mi pedido">
            <ShoppingBag className="h-4 w-4" /> Mi pedido
            {cart.count > 0 && <span key={cart.count} className="animate-pop grid h-5 min-w-5 place-items-center rounded-full bg-[#3b2a20] px-1 text-[11px] text-white">{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-end gap-8 px-5 pb-6 pt-4 md:grid-cols-[1.1fr_1fr] md:pt-10">
        <div className="order-2 md:order-1">
          <div className="animate-fade-up text-[12px] font-semibold uppercase tracking-[.3em] text-[#7f8f6e]">Café de especialidad · Berazategui</div>
          <h1 className="animate-fade-up mt-3 font-(family-name:--fd) text-[48px] font-semibold leading-[1] tracking-tight sm:text-7xl" style={{ animationDelay: '80ms' }}>
            Tu café de siempre, <i className="font-normal text-[#c7894d]">listo cuando llegás.</i>
          </h1>
          <p className="animate-fade-up mt-4 max-w-md text-[16px] leading-relaxed text-[#3b2a20]/70" style={{ animationDelay: '160ms' }}>
            Pedí desde el celular, elegí a qué hora pasás y retiralo sin hacer fila. O quedate: tenemos wifi, enchufes y la mejor luz de la tarde.
          </p>
          <div className="animate-fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <a href="#carta" className="rounded-full bg-[#3b2a20] px-6 py-3.5 font-semibold text-[#f8f3ec] transition active:scale-95">Pedir para llevar</a>
            <a href="#local" className="rounded-full px-6 py-3.5 font-semibold underline decoration-[#c7894d] decoration-2 underline-offset-4">Ver el local</a>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <SmartImg eager src={img('1501339847302-ac426a4a7cbb', 900, 1100)} alt="Interior de Moka Café" fallback="linear-gradient(160deg,#c7a27c,#3b2a20)" className="mx-auto aspect-[4/4.6] w-[86%] rounded-t-full" />
          <div className="absolute -bottom-3 left-0 w-36 rotate-[-4deg] rounded-2xl bg-[#f8f3ec] p-3 shadow-xl">
            <SmartImg src={img('1509042239860-f550ce710b93', 300, 220)} alt="Latte art" fallback="linear-gradient(135deg,#d6b38a,#7a5134)" className="aspect-[4/3] rounded-xl" />
            <div className="mt-2 font-(family-name:--fd) text-sm italic">Latte art, siempre.</div>
          </div>
          <div className="absolute right-0 top-8 grid h-20 w-20 rotate-12 place-items-center rounded-full bg-[#7f8f6e] text-center text-[11px] font-bold uppercase leading-tight text-white shadow-lg">Retiro<br />sin fila</div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <Reveal className="flex items-end justify-between">
          <h2 className="font-(family-name:--fd) text-4xl font-semibold">Lo más <i className="font-normal">pedido</i></h2>
          <span className="text-sm text-[#3b2a20]/50">deslizá →</span>
        </Reveal>
        <div className="no-scrollbar -mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2">
          {ITEMS.filter((i) => i.star).map((it) => (
            <div key={it.id} className="w-44 shrink-0 snap-start">
              <button onClick={() => quickAdd(it)} className="group block w-full text-left">
                <SmartImg src={img(it.img, 400, 520)} alt={it.name} fallback="linear-gradient(160deg,#d6b38a,#7a5134)" className="aspect-[4/5] rounded-t-full transition duration-500 group-hover:brightness-105" />
                <div className="mt-3 font-(family-name:--fd) text-lg font-semibold leading-tight">{it.name}</div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#c7894d]">{money(it.price)}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#3b2a20] text-white"><Plus className="h-4 w-4" /></span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* COMBOS */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl font-semibold">Combos <i className="font-normal text-[#7f8f6e]">para cada momento</i></h2></Reveal>
        <Tip className="mt-4 !mx-0">los combos por horario llenan las horas tranquilas y el cliente decide más rápido.</Tip>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {COMBOS.map((k, i) => (
            <Reveal key={k.id} delay={i * 80} className="flex gap-4 rounded-[28px] bg-[#f8f3ec] p-3 md:flex-col">
              <SmartImg src={img(k.img, 500, 400)} alt={k.name} fallback="linear-gradient(160deg,#d6b38a,#7a5134)" className="h-32 w-28 shrink-0 rounded-[22px] md:h-44 md:w-full" />
              <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                <span className="w-fit rounded-full bg-[#7f8f6e]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#5d6b4f]">{k.hours}</span>
                <div className="mt-1.5 font-(family-name:--fd) text-xl font-semibold">{k.name}</div>
                <p className="text-[13px] leading-snug text-[#3b2a20]/65">{k.items}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div><b>{money(k.price)}</b> <span className="text-[12px] text-[#3b2a20]/40 line-through">{money(k.was)}</span></div>
                  <button onClick={() => { cart.add({ key: k.id, name: k.name, price: k.price, image: k.img, detail: k.items }); toast(`${k.name} sumado`) }} className="rounded-full bg-[#c7894d] px-4 py-2 text-[13px] font-semibold text-white active:scale-95">Sumar</button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CARTA */}
      <section id="carta" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-16">
        <Reveal className="text-center">
          <div className="text-[12px] font-semibold uppercase tracking-[.3em] text-[#7f8f6e]">Carta digital</div>
          <h2 className="mt-2 font-(family-name:--fd) text-5xl font-semibold">Nuestra carta</h2>
        </Reveal>
        <Tip className="mt-4">tus clientes ven la carta completa con fotos antes de llegar y personalizan su café (tamaño y tipo de leche) sin explicar nada en el mostrador.</Tip>
        <div className="sticky top-[60px] z-30 -mx-5 mt-5 bg-[#efe6da]/95 px-5 py-2 backdrop-blur">
          <div className="no-scrollbar mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-[#f8f3ec] p-1">
            {(['Cafés', 'Fríos', 'Pastelería', 'Desayunos'] as Cat[]).map((c) => (
              <button key={c} onClick={() => setCat(c)} className={cx('shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition', cat === c ? 'bg-[#3b2a20] text-white' : 'text-[#3b2a20]/60')}>{c}</button>
            ))}
          </div>
        </div>
        <ul key={cat} className="mx-auto mt-4 max-w-3xl divide-y divide-[#3b2a20]/10">
          {ITEMS.filter((i) => i.cat === cat).map((it, i) => (
            <li key={it.id} className="animate-fade-up flex items-center gap-4 py-4" style={{ animationDelay: `${i * 50}ms` }}>
              <SmartImg src={img(it.img, 200, 200)} alt={it.name} fallback="linear-gradient(160deg,#d6b38a,#7a5134)" className="h-20 w-20 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-(family-name:--fd) text-lg font-semibold">{it.name}</span>
                  <span className="flex-1 border-b border-dotted border-[#3b2a20]/25" />
                  <span className="font-semibold">{money(it.price)}</span>
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-[#3b2a20]/60">{it.desc}</p>
                {it.custom && <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#7f8f6e]">Personalizable</p>}
              </div>
              <button onClick={() => quickAdd(it)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#3b2a20]/20 transition hover:bg-[#3b2a20] hover:text-white active:scale-90" aria-label={`Agregar ${it.name}`}><Plus className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      </section>

      {/* FIDELIDAD */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal className="mx-auto max-w-3xl rounded-[32px] bg-[#3b2a20] p-6 text-[#f8f3ec] sm:p-8">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[.3em] text-[#c7894d]"><Sparkles className="h-4 w-4" /> Club Moka</div>
          <h3 className="mt-2 font-(family-name:--fd) text-3xl font-semibold">Juntá 8 sellos, <i className="font-normal">el 9° lo invitamos.</i></h3>
          <div className="mt-5 grid grid-cols-8 gap-1.5 sm:gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={cx('grid aspect-square place-items-center rounded-full border-2 border-dashed transition-all duration-300', i < stamps ? 'border-[#c7894d] bg-[#c7894d] text-white' : 'border-white/20')}>
                {i < stamps && <Coffee className="animate-pop h-4 w-4 sm:h-5 sm:w-5" />}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/70">{stamps >= 8 ? '¡Tenés un café de regalo! ☕' : `Te faltan ${8 - stamps} cafés para tu regalo.`}</p>
            <button onClick={() => { if (stamps >= 8) { setStamps(0); toast('¡Café de regalo canjeado!') } else { setStamps((s) => s + 1); toast('Sello sumado (demo)') } }}
              className="rounded-full bg-[#f8f3ec] px-5 py-2.5 text-sm font-semibold text-[#3b2a20]">{stamps >= 8 ? 'Canjear regalo' : 'Simular compra'}</button>
          </div>
        </Reveal>
        <Tip className="mt-4">una tarjeta de sellos digital hace que vuelvan. No se pierde como la de cartón.</Tip>
      </section>

      {/* LOCAL */}
      <section id="local" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-16">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl font-semibold">Vení a <i className="font-normal text-[#c7894d]">quedarte</i></h2></Reveal>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {['1554118811-1e0d58224f24', '1442512595331-e89e73853f31', '1447933601403-0c6688de566e'].map((id, i) => (
            <SmartImg key={id} src={img(id, 500, 650)} alt={['Salón', 'Barra', 'Granos de café'][i]} fallback="linear-gradient(160deg,#c7a27c,#3b2a20)" className={cx('aspect-[4/5]', i === 1 ? 'rounded-t-full' : 'rounded-3xl')} />
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-2">
            {[{ i: Wifi, t: 'Wifi gratis', s: 'clave en tu ticket' }, { i: Plug, t: 'Enchufes', s: 'en todas las mesas' }, { i: Dog, t: 'Pet friendly', s: 'agua para tu perro' }, { i: Heart, t: 'Sin TACC', s: 'opciones aptas' }].map(({ i: I, t, s }) => (
              <div key={t} className="rounded-2xl bg-[#f8f3ec] p-4"><I className="h-5 w-5 text-[#7f8f6e]" /><div className="mt-2 font-semibold">{t}</div><div className="text-[13px] text-[#3b2a20]/55">{s}</div></div>
            ))}
          </div>
          <div className="rounded-3xl bg-[#f8f3ec] p-5">
            <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-[#c7894d]" /><div><div className="font-semibold">Calle 148 N° 1650, Berazategui</div><div className="text-[13px] text-[#3b2a20]/55">Frente a la plaza</div></div></div>
            <div className="mt-4 flex gap-3"><Clock className="h-5 w-5 shrink-0 text-[#c7894d]" /><div className="text-[14px] leading-relaxed"><div><b>Lun a vie</b> · 7:30 a 20:30</div><div><b>Sábados</b> · 8:30 a 21:00</div><div><b>Domingos</b> · 9:00 a 20:00</div></div></div>
            <button onClick={() => toast('En la web real abre Google Maps')} className="mt-5 w-full rounded-full bg-[#3b2a20] py-3 text-sm font-semibold text-white">Cómo llegar</button>
          </div>
        </div>
      </section>

      <footer className="px-5 py-14 text-center">
        <div className="font-(family-name:--fd) text-3xl font-semibold italic">moka</div>
        <p className="mt-1 text-sm text-[#3b2a20]/50">Café de especialidad · @mokacafe.bera</p>
      </footer>

      {cart.count > 0 && !cartOpen && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full bg-[#3b2a20] px-5 py-3.5 font-semibold text-white shadow-2xl">
            <span>Pedido para llevar · {cart.count}</span><span>{money(cart.total)}</span>
          </button>
        </div>
      )}

      <CustomSheet item={custom} onClose={() => setCustom(null)} onAdd={(l) => { cart.add(l); toast(`${l.name} sumado`); setCustom(null) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onConfirm={(t) => { setCartOpen(false); setTicket(t); cart.clear() }} />
      <Ticket data={ticket} onClose={() => setTicket(null)} />
    </DemoShell>
  )
}

function CustomSheet({ item, onClose, onAdd }: { item: Item | null; onClose: () => void; onAdd: (l: { key: string; name: string; price: number; image: string; detail: string; qty: number }) => void }) {
  const [size, setSize] = useState(1)
  const [milk, setMilk] = useState(0)
  const [qty, setQty] = useState(1)
  useEffect(() => { if (item) { setSize(item.id === 'c4' ? 0 : 1); setMilk(0); setQty(1) } }, [item])
  if (!item) return null
  const noMilk = item.id === 'c4' || item.id === 'f2'
  const unit = item.price + SIZES[size].p + (noMilk ? 0 : MILKS[milk].p)
  const detail = [SIZES[size].n, !noMilk && `leche ${MILKS[milk].n.toLowerCase()}`].filter(Boolean).join(', ')
  return (
    <Sheet open onClose={onClose} className="bg-[#f8f3ec]" label="Personalizá tu café">
      <div className="overflow-y-auto" style={{ fontFamily: '"DM Sans", sans-serif', color: C.ink }}>
        <div className="flex gap-4 p-5">
          <SmartImg src={img(item.img, 300, 300)} alt={item.name} fallback="linear-gradient(160deg,#d6b38a,#7a5134)" className="h-24 w-24 shrink-0 rounded-t-full rounded-b-3xl" />
          <div className="flex-1">
            <div className="font-(family-name:--fd) text-2xl font-semibold">{item.name}</div>
            <p className="text-[14px] text-[#3b2a20]/60">{item.desc}</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#efe6da]" aria-label="Cerrar"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-5">
          <div className="text-sm font-semibold">Tamaño</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SIZES.map((s, i) => (
              <button key={s.n} onClick={() => setSize(i)} className={cx('flex flex-col items-center rounded-2xl py-3 ring-1 transition', size === i ? 'bg-[#3b2a20] text-white ring-[#3b2a20]' : 'ring-[#3b2a20]/15')}>
                <Coffee style={{ width: 14 + i * 5, height: 14 + i * 5 }} />
                <span className="mt-1 text-sm font-semibold">{s.n}</span>
                <span className="text-[11px] opacity-60">{s.p ? `+${money(s.p)}` : 'base'}</span>
              </button>
            ))}
          </div>
          {!noMilk && (
            <>
              <div className="mt-5 text-sm font-semibold">Leche</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {MILKS.map((m, i) => (
                  <button key={m.n} onClick={() => setMilk(i)} className={cx('rounded-full px-4 py-2 text-sm ring-1 transition', milk === i ? 'bg-[#7f8f6e] text-white ring-[#7f8f6e]' : 'ring-[#3b2a20]/15')}>{m.n}{m.p ? ` +${money(m.p)}` : ''}</button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-[#3b2a20]/10 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center rounded-full ring-1 ring-[#3b2a20]/15">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-5 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={() => onAdd({ key: `${item.id}|${detail}`, name: item.name, price: unit, image: item.img, detail, qty })} className="flex h-11 flex-1 items-center justify-between rounded-full bg-[#3b2a20] px-5 font-semibold text-white active:scale-[.98]">
            <span>Sumar al pedido</span><span>{money(unit * qty)}</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart, onConfirm }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart>; onConfirm: (t: { name: string; when: string; total: number; n: number; lines: string[] }) => void }) {
  const [when, setWhen] = useState(0)
  const [name, setName] = useState('')
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-[#efe6da]" label="Pedido para llevar">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: '"DM Sans", sans-serif', color: C.ink }}>
        <div className="flex items-center justify-between px-5 py-4">
          <div><div className="font-(family-name:--fd) text-2xl font-semibold">Para llevar</div><div className="text-[13px] text-[#3b2a20]/55">Retirás en el mostrador, sin fila</div></div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#f8f3ec]" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div><Coffee className="mx-auto h-12 w-12 text-[#3b2a20]/25" /><p className="mt-3 font-semibold">Tu pedido está vacío</p>
              <button onClick={onClose} className="mt-4 rounded-full bg-[#3b2a20] px-6 py-3 text-sm font-semibold text-white">Ver la carta</button></div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 pb-5">
              <ul className="divide-y divide-[#3b2a20]/10 rounded-3xl bg-[#f8f3ec] px-4">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1"><div className="font-semibold">{l.name}</div>{l.detail && <div className="truncate text-[12px] text-[#3b2a20]/55">{l.detail}</div>}<div className="text-sm text-[#c7894d]">{money(l.price * l.qty)}</div></div>
                    <div className="flex items-center rounded-full ring-1 ring-[#3b2a20]/15">
                      <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                      <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                      <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <div className="text-sm font-semibold">¿Cuándo pasás a retirarlo?</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {PICKUP.map((p, i) => (
                    <button key={p} onClick={() => setWhen(i)} className={cx('rounded-2xl px-3 py-3 text-left text-[13px] font-semibold ring-1 transition', when === i ? 'bg-[#3b2a20] text-white ring-[#3b2a20]' : 'bg-[#f8f3ec] ring-transparent')}>{p}</button>
                  ))}
                </div>
              </div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="¿A nombre de quién?" className="w-full rounded-2xl bg-[#f8f3ec] px-4 py-3.5 outline-none ring-1 ring-transparent focus:ring-[#c7894d]" />
            </div>
            <div className="border-t border-[#3b2a20]/10 bg-[#f8f3ec] p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between font-(family-name:--fd) text-2xl font-semibold"><span>Total</span><span>{money(cart.total)}</span></div>
              <button disabled={name.trim().length < 2}
                onClick={() => onConfirm({ name, when: PICKUP[when], total: cart.total, n: 100 + Math.floor(Math.random() * 899), lines: cart.lines.map((l) => `${l.qty}× ${l.name}${l.detail ? ` (${l.detail})` : ''}`) })}
                className="mt-3 w-full rounded-full bg-[#c7894d] py-3.5 font-semibold text-white transition active:scale-[.98] disabled:opacity-40">
                {name.trim().length < 2 ? 'Ingresá tu nombre' : 'Confirmar y pagar al retirar'}
              </button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

function Ticket({ data, onClose }: { data: null | { name: string; when: string; total: number; n: number; lines: string[] }; onClose: () => void }) {
  return (
    <Sheet open={!!data} onClose={onClose} side="center" className="bg-transparent shadow-none" label="Ticket de retiro">
      {data && (
        <div className="overflow-y-auto" style={{ fontFamily: '"DM Sans", sans-serif', color: C.ink }}>
          <div className="rounded-[28px] bg-[#f8f3ec] p-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#7f8f6e] text-white"><Coffee className="h-7 w-7" /></div>
            <div className="mt-3 font-(family-name:--fd) text-2xl font-semibold">¡Ya lo estamos preparando!</div>
            <p className="text-sm text-[#3b2a20]/60">{data.name}, mostrá este código en el mostrador.</p>
            <div className="mt-5 font-(family-name:--fd) text-6xl font-semibold tracking-tight text-[#c7894d]">#{data.n}</div>
            <div className="mx-auto mt-4 grid w-32 grid-cols-8 gap-0.5" aria-hidden>
              {Array.from({ length: 64 }).map((_, i) => <div key={i} className={cx('aspect-square', ((i * 7 + data.n) % 3 === 0 || i % 9 === 0) ? 'bg-[#3b2a20]' : 'bg-transparent')} />)}
            </div>
          </div>
          <div className="relative -mt-px border-t-2 border-dashed border-[#3b2a20]/15 bg-[#f8f3ec] px-6 pb-6 pt-4">
            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-black/50" /><div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-black/50" />
            <ul className="space-y-1 text-[14px]">{data.lines.map((l) => <li key={l}>{l}</li>)}</ul>
            <div className="mt-3 flex justify-between border-t border-[#3b2a20]/10 pt-3 font-semibold"><span>Retiro: {data.when}</span><span>{money(data.total)}</span></div>
            <p className="mt-3 text-[12px] text-[#3b2a20]/50">Demostración: en la web real el pedido llega al local al instante.</p>
            <button onClick={onClose} className="mt-4 w-full rounded-full bg-[#3b2a20] py-3 font-semibold text-white">Listo</button>
          </div>
        </div>
      )}
    </Sheet>
  )
}
