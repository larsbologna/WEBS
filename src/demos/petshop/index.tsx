import { useMemo, useState } from 'react'
import { Bone, Calculator, Cat, Check, Dog, Gift, Minus, PawPrint, Plus, Repeat, ShoppingBasket, Store, Trash2, Truck, X, Bath, BedDouble, Sparkles, Heart, Clock } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { safeRead, safeWrite } from '../../shared/store'
import { cx, img, money } from '../../shared/format'

const Y = '#ffcf33', PLUM = '#2b1747', CORAL = '#ff6b5b', CREAM = '#fffaf0', MINT = '#c7f0db'
type Sp = 'Perro' | 'Gato'
type Cat = 'Alimento' | 'Snacks' | 'Juguetes' | 'Camas y accesorios' | 'Higiene y salud'
type Prod = { id: string; name: string; brand: string; sp: Sp | 'Ambos'; cat: Cat; price?: number; sizes?: { kg: number; p: number }[]; color?: string; icon?: typeof Bone; img: string; desc: string; tag?: string; was?: number }

const P: Prod[] = [
  { id: 'f1', img: '1589924691995-400dc9ecc119', name: 'Adulto Raza Mediana', brand: 'NutriCan', sp: 'Perro', cat: 'Alimento', color: '#e85d3f', sizes: [{ kg: 3, p: 18900 }, { kg: 7.5, p: 39900 }, { kg: 15, p: 69900 }, { kg: 20, p: 86900 }], desc: 'Pollo y arroz, con omega 3 para piel y pelo brillante. Para perros de 10 a 25 kg.', tag: 'Más vendido' },
  { id: 'f2', img: '1576201836106-db1758fd1c97', name: 'Cachorro', brand: 'NutriCan', sp: 'Perro', cat: 'Alimento', color: '#3fa7e8', sizes: [{ kg: 3, p: 21900 }, { kg: 7.5, p: 46900 }, { kg: 15, p: 82900 }], desc: 'Croqueta chica con DHA para el desarrollo. Desde los 2 meses.' },
  { id: 'f3', img: '1615751072497-5f5169febe17', name: 'Senior 7+', brand: 'Vital Pro', sp: 'Perro', cat: 'Alimento', color: '#7a5bd6', sizes: [{ kg: 3, p: 23900 }, { kg: 7.5, p: 51900 }, { kg: 15, p: 92900 }], desc: 'Con glucosamina para las articulaciones y menos calorías.' },
  { id: 'f4', img: '1608096299210-db7e38487075', name: 'Raza Pequeña', brand: 'Vital Pro', sp: 'Perro', cat: 'Alimento', color: '#e8a83f', sizes: [{ kg: 1, p: 8900 }, { kg: 3, p: 22900 }, { kg: 7.5, p: 49900 }], desc: 'Croqueta mini y alta palatabilidad para perros de hasta 10 kg.' },
  { id: 'g1', img: '1574158622682-e40e69881006', name: 'Adulto Premium', brand: 'Gatuno', sp: 'Gato', cat: 'Alimento', color: '#d63f7a', sizes: [{ kg: 1, p: 9900 }, { kg: 3, p: 26900 }, { kg: 7.5, p: 58900 }], desc: 'Salmón y pollo, control de bolas de pelo.', tag: 'Más vendido' },
  { id: 'g2', img: '1573865526739-10659fec78a5', name: 'Castrados', brand: 'Gatuno', sp: 'Gato', cat: 'Alimento', color: '#3fbfa0', sizes: [{ kg: 1, p: 10900 }, { kg: 3, p: 28900 }, { kg: 7.5, p: 62900 }], desc: 'Bajo en grasas y con cuidado urinario.' },
  { id: 'g3', img: '1570018144715-43110363d70a', name: 'Gatitos', brand: 'Gatuno', sp: 'Gato', cat: 'Alimento', color: '#f08a3c', sizes: [{ kg: 1, p: 11500 }, { kg: 3, p: 30900 }], desc: 'Para gatitos de 2 a 12 meses.' },
  { id: 's1', img: '1568640347023-a616a30bc3bd', name: 'Huesitos dentales x7', brand: 'NutriCan', sp: 'Perro', cat: 'Snacks', price: 4900, icon: Bone, desc: 'Ayudan a reducir el sarro. Uno por día.', tag: '2x1' },
  { id: 's2', img: '1601758228041-f3b2795255f1', name: 'Bocaditos de carne 200 g', brand: 'Vital Pro', sp: 'Perro', cat: 'Snacks', price: 5900, icon: Bone, desc: 'Ideales para el adiestramiento.' },
  { id: 's3', img: '1597843786411-a7fa8ad44a95', name: 'Snack cremoso de atún x4', brand: 'Gatuno', sp: 'Gato', cat: 'Snacks', price: 3900, icon: Heart, desc: 'El premio que más les gusta. Se da en la mano.', tag: '2x1' },
  { id: 't1', img: 'fotos/petshop/t1.jpg', name: 'Pelota de goma indestructible', brand: 'Juguetón', sp: 'Perro', cat: 'Juguetes', price: 6900, icon: Sparkles, desc: 'Rebota, flota y resiste mordidas fuertes.' },
  { id: 't2', img: 'fotos/petshop/t2.jpg', name: 'Soga para tironear', brand: 'Juguetón', sp: 'Perro', cat: 'Juguetes', price: 5400, icon: Sparkles, desc: 'Algodón trenzado, limpia los dientes mientras juega.' },
  { id: 't3', img: '1592194996308-7b43878e84a6', name: 'Varita con plumas', brand: 'Juguetón', sp: 'Gato', cat: 'Juguetes', price: 3900, icon: Sparkles, desc: 'Estimula el instinto de caza.' },
  { id: 't4', img: '1545249390-6bdfa286032f', name: 'Rascador torre 80 cm', brand: 'Michi Home', sp: 'Gato', cat: 'Juguetes', price: 59900, was: 69900, icon: Cat, desc: 'Tres niveles, cucha y pompón colgante.' },
  { id: 'a1', img: 'fotos/petshop/a1.jpg', name: 'Cama acolchada mediana', brand: 'Siesta', sp: 'Ambos', cat: 'Camas y accesorios', price: 34900, icon: BedDouble, desc: 'Lavable, base antideslizante. 70 × 55 cm.' },
  { id: 'a2', img: 'fotos/petshop/a2.jpg', name: 'Collar + correa reflectivos', brand: 'Paseo', sp: 'Perro', cat: 'Camas y accesorios', price: 14900, icon: PawPrint, desc: 'Visibles de noche. Talles S a XL.' },
  { id: 'a3', img: 'fotos/petshop/a3.jpg', name: 'Comedero doble de acero', brand: 'Michi Home', sp: 'Ambos', cat: 'Camas y accesorios', price: 12900, icon: PawPrint, desc: 'Antideslizante, apto lavavajillas.' },
  { id: 'a4', img: 'fotos/petshop/a4.jpg', name: 'Transportadora mediana', brand: 'Paseo', sp: 'Ambos', cat: 'Camas y accesorios', price: 49900, icon: Store, desc: 'Apta avión, hasta 10 kg.' },
  { id: 'h1', img: 'fotos/petshop/h1.jpg', name: 'Piedras sanitarias 4 kg', brand: 'Michi Home', sp: 'Gato', cat: 'Higiene y salud', price: 8900, icon: Bath, desc: 'Aglomerantes, con control de olores.', tag: 'Más vendido' },
  { id: 'h2', img: 'fotos/petshop/h2.jpg', name: 'Bandeja sanitaria con tapa', brand: 'Michi Home', sp: 'Gato', cat: 'Higiene y salud', price: 24900, icon: Bath, desc: 'Con filtro de carbón y puerta vaivén.' },
  { id: 'h3', img: '1516734212186-a967f81ad0d7', name: 'Shampoo de avena 500 ml', brand: 'Siesta', sp: 'Perro', cat: 'Higiene y salud', price: 7900, icon: Bath, desc: 'Para pieles sensibles.' },
  { id: 'h4', img: '1543466835-00a7907e9de1', name: 'Pipeta antipulgas', brand: 'Vital Pro', sp: 'Ambos', cat: 'Higiene y salud', price: 9900, icon: Heart, desc: 'Protección por 30 días contra pulgas y garrapatas.' },
]
const CATS: Cat[] = ['Alimento', 'Snacks', 'Juguetes', 'Camas y accesorios', 'Higiene y salud']
const FREQ = [3, 4, 6, 8]
const FREE = 40000

function Bag({ p, kg, size = 90 }: { p: Prod; kg?: number; size?: number }) {
  const w = size, h = size * 1.3
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <div className="absolute inset-x-[8%] top-0 h-[10%] rounded-t-md" style={{ background: p.color, filter: 'brightness(.85)' }} />
      <div className="absolute inset-x-0 bottom-0 top-[7%] overflow-hidden rounded-[14px_14px_10px_10px]" style={{ background: `linear-gradient(160deg, ${p.color}, ${p.color} 60%, rgba(0,0,0,.15))`, boxShadow: '0 10px 20px -8px rgba(43,23,71,.45)' }}>
        <div className="absolute inset-x-[10%] top-[10%] rounded-md bg-white/90 px-1 py-1 text-center leading-none" style={{ color: PLUM }}>
          <div className="font-(family-name:--fd) font-bold" style={{ fontSize: w * 0.12 }}>{p.brand}</div>
          <div className="mt-0.5 truncate" style={{ fontSize: w * 0.085 }}>{p.name}</div>
        </div>
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-white/90">{p.sp === 'Gato' ? <Cat style={{ width: w * 0.32, height: w * 0.32 }} /> : <Dog style={{ width: w * 0.32, height: w * 0.32 }} />}</div>
        {kg && <div className="absolute bottom-[7%] right-[8%] rounded-full bg-white px-1.5 font-(family-name:--fd) font-bold" style={{ fontSize: w * 0.12, color: PLUM }}>{kg.toLocaleString('es-AR')} kg</div>}
      </div>
    </div>
  )
}
function Thumb({ p, className, kg, size }: { p: Prod; className?: string; kg?: number; size?: number }) {
  const I = p.icon ?? PawPrint
  const bg = p.sizes ? `${p.color}1f` : p.sp === 'Gato' ? '#ffe3ef' : p.sp === 'Perro' ? '#fff1c7' : MINT
  const art = p.sizes
    ? <Bag p={p} kg={kg} size={size} />
    : <div className="grid place-items-center rounded-full bg-white" style={{ width: (size ?? 90) * 0.75, height: (size ?? 90) * 0.75 }}><I style={{ width: (size ?? 90) * 0.38, height: (size ?? 90) * 0.38, color: CORAL }} /></div>
  const small = (size ?? 90) < 60
  return (
    <div className={cx('relative overflow-hidden', className)}>
      <SmartImg src={img(p.img, small ? 160 : 600, small ? 160 : 600)} alt={p.name} className="h-full w-full" fallback={bg} fallbackContent={art} />
      {kg && !small && <div className="absolute bottom-2 right-2 rounded-full bg-white px-2 py-0.5 font-(family-name:--fd) text-[13px] font-bold shadow" style={{ color: PLUM }}>{kg.toLocaleString('es-AR')} kg</div>}
    </div>
  )
}

export default function Petshop() {
  const cart = useCart('petshop')
  const [sp, setSpState] = useState<Sp | 'Todos'>(() => safeRead('colita-sp', 'Todos'))
  const setSp = (v: Sp | 'Todos') => { setSpState(v); safeWrite('colita-sp', v) }
  const [cat, setCat] = useState<Cat | 'Todo'>('Todo')
  const [prod, setProd] = useState<{ p: Prod; kg?: number } | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [calc, setCalc] = useState(false)
  const list = P.filter((p) => (sp === 'Todos' || p.sp === sp || p.sp === 'Ambos') && (cat === 'Todo' || p.cat === cat))
  const goShop = () => document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <DemoShell slug="petshop" fonts="family=Fredoka:wght@500;600;700&family=Figtree:wght@400;500;600;700;800" themeColor={Y}
      className="pb-24" style={{ background: CREAM, color: PLUM, fontFamily: 'Figtree, sans-serif', ['--fd' as string]: 'Fredoka, sans-serif' }}>
      <div className="py-2 text-center text-[13px] font-bold text-white" style={{ background: PLUM }}>🚚 Envío gratis en el día desde {money(FREE)} · Berazategui, Hudson y Ranelagh</div>
      <header className="sticky top-0 z-40" style={{ background: Y }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 rotate-[-10deg] place-items-center rounded-2xl text-white" style={{ background: CORAL }}><PawPrint className="h-6 w-6" /></div>
            <div className="font-(family-name:--fd) text-2xl font-bold leading-none">Colita<span style={{ color: CORAL }}> Feliz</span></div>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex h-11 items-center gap-2 rounded-full px-4 font-bold text-white" style={{ background: PLUM }} aria-label="Carrito">
            <ShoppingBasket className="h-5 w-5" /><span className="text-sm">{cart.count ? money(cart.total) : 'Carrito'}</span>
            {cart.count > 0 && <span key={cart.count} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px]" style={{ background: CORAL }}>{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: Y }}>
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-10 pt-4 md:grid-cols-2">
          <div>
            <h1 className="animate-fade-up font-(family-name:--fd) text-[46px] font-bold leading-[0.95] sm:text-7xl">Todo para tu <span className="relative inline-block" style={{ color: CORAL }}>mejor amigo</span>, en la puerta de tu casa.</h1>
            <p className="animate-fade-up mt-4 max-w-md text-[16px] font-medium" style={{ animationDelay: '100ms' }}>Alimento, piedritas, juguetes y accesorios. Pedí antes de las 15 h y lo recibís hoy. Programá tu compra y nunca te quedás sin alimento.</p>
            <div className="animate-fade-up mt-5" style={{ animationDelay: '200ms' }}>
              <div className="text-[13px] font-bold">¿Para quién comprás?</div>
              <div className="mt-2 flex gap-2">
                {([['Perro', Dog], ['Gato', Cat], ['Todos', PawPrint]] as const).map(([v, I]) => (
                  <button key={v} onClick={() => { setSp(v); goShop() }} className={cx('flex items-center gap-2 rounded-2xl px-4 py-3 font-(family-name:--fd) text-lg font-semibold transition', sp === v ? 'text-white shadow-lg' : 'bg-white/70')} style={sp === v ? { background: PLUM } : undefined}><I className="h-5 w-5" />{v === 'Todos' ? 'Ambos' : `${v}s`}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <SmartImg eager src={img('1450778869180-41d0601e046e', 900, 800)} alt="Perro y gato felices" fallback={`linear-gradient(135deg,${CORAL},${PLUM})`} className="aspect-[9/8] rounded-[40px] border-4 border-white shadow-xl" />
            <div className="absolute -bottom-4 left-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lg"><Clock className="h-5 w-5" style={{ color: CORAL }} /><div className="text-[13px] font-bold leading-tight">Pedí antes de las 15 h<br /><span className="font-medium text-[#2b1747]/60">y llega hoy</span></div></div>
          </div>
        </div>
      </section>

      {/* PROMOS */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1">
          {[{ t: '2x1 en snacks', s: 'Huesitos y bocaditos de atún', c: CORAL, a: () => { setCat('Snacks'); goShop() } }, { t: '10% off programando', s: 'Tu alimento cada 3 a 8 semanas', c: PLUM, a: () => { setCat('Alimento'); goShop() } }, { t: 'Rascador torre −14%', s: 'Llega armado', c: '#3fbfa0', a: () => setProd({ p: P.find((x) => x.id === 't4')! }) }].map((x) => (
            <button key={x.t} onClick={x.a} className="w-[78%] shrink-0 snap-start rounded-3xl p-5 text-left text-white sm:w-80" style={{ background: x.c }}>
              <Gift className="h-6 w-6" /><div className="mt-2 font-(family-name:--fd) text-2xl font-bold leading-tight">{x.t}</div><div className="text-[14px] text-white/85">{x.s}</div>
            </button>
          ))}
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: MINT }}><Calculator className="h-6 w-6" style={{ color: PLUM }} /></div><div><div className="font-(family-name:--fd) text-xl font-bold">¿Cuánto le dura la bolsa?</div><div className="text-[14px] text-[#2b1747]/60">Calculá su ración diaria y elegí el tamaño justo.</div></div></div>
          <button onClick={() => setCalc(true)} className="rounded-full px-5 py-3 font-bold text-white" style={{ background: CORAL }}>Calcular</button>
        </Reveal>
        <Tip className="mt-4">la calculadora y la compra programada aseguran que el cliente vuelva a comprarte cada mes, sin que tengas que acordárselo.</Tip>
      </section>

      {/* TIENDA */}
      <section id="tienda" className="mx-auto max-w-6xl scroll-mt-16 px-4 pt-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-(family-name:--fd) text-4xl font-bold">{cat === 'Todo' ? 'Tienda' : cat}{sp !== 'Todos' && <span className="text-[#2b1747]/40"> · {sp}s</span>}</h2>
          <span className="shrink-0 text-sm font-semibold text-[#2b1747]/50">{list.length}</span>
        </div>
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
          {(['Perro', 'Gato', 'Todos'] as const).map((v) => <button key={v} onClick={() => setSp(v)} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-bold', sp === v ? 'text-white' : 'bg-white')} style={sp === v ? { background: PLUM } : undefined}>{v === 'Todos' ? '🐾 Ambos' : v === 'Perro' ? '🐶 Perros' : '🐱 Gatos'}</button>)}
          <span className="mx-1 w-px shrink-0 bg-[#2b1747]/15" />
          {(['Todo', ...CATS] as const).map((c) => <button key={c} onClick={() => setCat(c)} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-bold', cat === c ? '' : 'bg-white')} style={cat === c ? { background: Y } : undefined}>{c}</button>)}
        </div>
        <div key={sp + cat} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.id} p={p} i={i} onOpen={(kg) => setProd({ p, kg })} onAdd={() => { cart.add({ key: p.id, name: p.name, price: p.price!, detail: p.brand }); toast(`${p.name} al carrito`) }} />)}
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="grid gap-3 sm:grid-cols-3">
          {[{ i: Truck, t: 'Envío en el día', d: 'Pedidos hasta las 15 h, en moto y sin cargo desde ' + money(FREE) + '.' }, { i: Repeat, t: 'Compra programada', d: '10% off en cada envío. Pausás o cancelás cuando quieras.' }, { i: Store, t: 'Retiro en 30 minutos', d: 'Av. Mitre 2290, Berazategui. Lun a sáb 9 a 20 h.' }].map(({ i: I, t, d }) => (
            <Reveal key={t} className="rounded-3xl bg-white p-5 shadow-sm"><I className="h-7 w-7" style={{ color: CORAL }} /><div className="mt-2 font-(family-name:--fd) text-xl font-bold">{t}</div><p className="text-[14px] text-[#2b1747]/65">{d}</p></Reveal>
          ))}
        </div>
      </section>
      <footer className="px-4 py-12 text-center"><div className="font-(family-name:--fd) text-2xl font-bold">Colita<span style={{ color: CORAL }}> Feliz</span> 🐾</div><div className="text-[13px] text-[#2b1747]/55">Petshop · @colitafeliz.bera</div></footer>

      {cart.count > 0 && !cartOpen && !prod && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full px-5 py-3.5 font-bold text-white shadow-2xl" style={{ background: PLUM }}><span>Ver carrito · {cart.count}</span><span>{money(cart.total)}</span></button>
        </div>
      )}

      <ProductSheet data={prod} onClose={() => setProd(null)} onAdd={(l) => { cart.add(l); toast(`${l.name} al carrito`); setProd(null) }} />
      <CalcSheet open={calc} onClose={() => setCalc(false)} onPick={(p, kg) => { setCalc(false); setProd({ p, kg }) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </DemoShell>
  )
}

function ProductCard({ p, i, onOpen, onAdd }: { p: Prod; i: number; onOpen: (kg?: number) => void; onAdd: () => void }) {
  const [kgI, setKgI] = useState(p.sizes ? Math.min(1, p.sizes.length - 1) : 0)
  const s = p.sizes?.[kgI]
  return (
    <div className="animate-fade-up flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
      <button onClick={() => onOpen(s?.kg)} className="relative block" aria-label={`Ver ${p.name}`}>
        <Thumb p={p} kg={s?.kg} className="aspect-square" size={92} />
        {p.tag && <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: p.tag === '2x1' ? CORAL : PLUM }}>{p.tag}</span>}
        {p.was && <span className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: Y }}>-{Math.round((1 - p.price! / p.was) * 100)}%</span>}
      </button>
      <div className="flex flex-1 flex-col p-3">
        <div className="text-[11px] font-bold uppercase tracking-wide text-[#2b1747]/45">{p.brand} · {p.sp === 'Ambos' ? 'Perro y gato' : p.sp}</div>
        <div className="font-(family-name:--fd) text-[17px] font-semibold leading-tight">{p.name}</div>
        {p.sizes && (
          <div className="mt-2 flex flex-wrap gap-1">{p.sizes.map((z, k) => <button key={z.kg} onClick={() => setKgI(k)} className={cx('rounded-full px-2 py-0.5 text-[11.5px] font-bold transition', kgI === k ? 'text-white' : 'bg-[#2b1747]/5')} style={kgI === k ? { background: PLUM } : undefined}>{z.kg.toLocaleString('es-AR')} kg</button>)}</div>
        )}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-1.5"><span className="text-lg font-extrabold">{money(s ? s.p : p.price!)}</span>{p.was && <span className="text-[12px] text-[#2b1747]/40 line-through">{money(p.was)}</span>}</div>
          {s && <div className="text-[11px] font-semibold text-[#2b1747]/50">{money(s.p / s.kg)} el kg</div>}
          <button onClick={() => (p.sizes ? onOpen(s?.kg) : onAdd())} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-bold text-white transition active:scale-95" style={{ background: CORAL }}>{p.sizes ? <><Repeat className="h-4 w-4" /> Elegir</> : <><Plus className="h-4 w-4" /> Agregar</>}</button>
        </div>
      </div>
    </div>
  )
}

function ProductSheet({ data, onClose, onAdd }: { data: { p: Prod; kg?: number } | null; onClose: () => void; onAdd: (l: { key: string; name: string; price: number; detail: string; qty: number }) => void }) {
  const [kgI, setKgI] = useState(0)
  const [qty, setQty] = useState(1)
  const [sub, setSub] = useState(false)
  const [freq, setFreq] = useState(4)
  const [last, setLast] = useState<string | null>(null)
  const key = data ? data.p.id + (data.kg ?? '') : null
  if (data && key !== last) { setLast(key); setKgI(Math.max(0, data.p.sizes?.findIndex((z) => z.kg === data.kg) ?? 0)); setQty(1); setSub(false); setFreq(4) }
  if (!data) return null
  const { p } = data
  const s = p.sizes?.[kgI]
  const base = s ? s.p : p.price!
  const unit = sub ? Math.round(base * 0.9) : base
  return (
    <Sheet open onClose={onClose} className="bg-[#fffaf0]" label={p.name}>
      <div className="overflow-y-auto" style={{ fontFamily: 'Figtree, sans-serif', color: PLUM }}>
        <div className="relative"><Thumb p={p} kg={s?.kg} className="h-56" size={130} /><button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
        <div className="p-5">
          <div className="text-[12px] font-bold uppercase tracking-wide text-[#2b1747]/50">{p.brand} · {p.cat}</div>
          <h3 className="font-(family-name:--fd) text-3xl font-bold leading-tight">{p.name}</h3>
          <p className="mt-2 text-[15px] text-[#2b1747]/70">{p.desc}</p>
          {p.sizes && (
            <>
              <div className="mt-4 text-sm font-bold">Tamaño de bolsa</div>
              <div className="mt-2 grid grid-cols-4 gap-2">{p.sizes.map((z, k) => <button key={z.kg} onClick={() => setKgI(k)} className={cx('rounded-2xl p-2 text-center ring-2 transition', kgI === k ? 'bg-white ring-[#2b1747]' : 'bg-white/60 ring-transparent')}><div className="font-(family-name:--fd) text-lg font-bold">{z.kg.toLocaleString('es-AR')} kg</div><div className="text-[11px] font-semibold">{money(z.p)}</div><div className="text-[10px] text-[#2b1747]/50">{money(z.p / z.kg)}/kg</div></button>)}</div>
              <div className="mt-4 rounded-3xl p-4 ring-2 transition" style={{ background: sub ? MINT : 'white', ['--tw-ring-color' as string]: sub ? '#3fbfa0' : 'transparent' }}>
                <button onClick={() => setSub(!sub)} className="flex w-full items-center gap-3 text-left">
                  <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full border-2', sub ? 'border-[#2b1747] bg-[#2b1747] text-white' : 'border-[#2b1747]/30')}>{sub && <Check className="h-4 w-4" />}</span>
                  <div className="flex-1"><div className="font-bold">Compra programada · 10% off</div><div className="text-[13px] text-[#2b1747]/60">Te lo enviamos automáticamente. Pausás cuando quieras.</div></div>
                </button>
                {sub && <div className="animate-fade-in mt-3 flex gap-2">{FREQ.map((f) => <button key={f} onClick={() => setFreq(f)} className={cx('flex-1 rounded-xl py-2 text-[13px] font-bold', freq === f ? 'text-white' : 'bg-white')} style={freq === f ? { background: PLUM } : undefined}>cada {f} sem.</button>)}</div>}
              </div>
            </>
          )}
          <div className="mt-5 flex items-center gap-3" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="flex items-center rounded-full bg-white">
              <button onClick={() => setQty((x) => Math.max(1, x - 1))} className="grid h-12 w-11 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
              <span className="w-5 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((x) => x + 1)} className="grid h-12 w-11 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => onAdd({ key: `${p.id}-${s?.kg ?? 'u'}${sub ? `-sub${freq}` : ''}`, name: `${p.brand} ${p.name}`, price: unit, detail: [s && `${s.kg.toLocaleString('es-AR')} kg`, sub && `🔁 cada ${freq} semanas (−10%)`].filter(Boolean).join(' · ') || p.cat, qty })}
              className="flex h-12 flex-1 items-center justify-between rounded-full px-5 font-bold text-white" style={{ background: CORAL }}><span>{sub ? 'Programar' : 'Agregar'}</span><span>{money(unit * qty)}</span></button>
          </div>
        </div>
      </div>
    </Sheet>
  )
}

function CalcSheet({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (p: Prod, kg: number) => void }) {
  const [sp, setSp] = useState<Sp>('Perro')
  const [w, setW] = useState(15)
  const [act, setAct] = useState(1)
  const grams = useMemo(() => Math.round(sp === 'Perro' ? (70 * Math.pow(w, 0.75) * [0.85, 1, 1.25][act]) / 3.6 : (60 * w * [0.85, 1, 1.15][act]) / 3.8), [sp, w, act])
  const food = P.find((p) => p.id === (sp === 'Perro' ? (w <= 10 ? 'f4' : 'f1') : 'g1'))!
  const best = food.sizes!.find((z) => (z.kg * 1000) / grams >= 25) ?? food.sizes![food.sizes!.length - 1]
  return (
    <Sheet open={open} onClose={onClose} className="bg-[#fffaf0]" label="Calculadora de ración">
      <div className="overflow-y-auto p-5" style={{ fontFamily: 'Figtree, sans-serif', color: PLUM }}>
        <div className="flex items-center justify-between"><div className="font-(family-name:--fd) text-2xl font-bold">¿Cuánto le dura la bolsa?</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        <div className="mt-4 grid grid-cols-2 gap-2">{([['Perro', Dog], ['Gato', Cat]] as const).map(([v, I]) => <button key={v} onClick={() => { setSp(v); setW(v === 'Perro' ? 15 : 4) }} className={cx('flex items-center justify-center gap-2 rounded-2xl py-3 font-(family-name:--fd) text-lg font-semibold', sp === v ? 'text-white' : 'bg-white')} style={sp === v ? { background: PLUM } : undefined}><I className="h-5 w-5" />{v}</button>)}</div>
        <div className="mt-4 flex justify-between text-sm font-bold"><span>Peso</span><span>{w} kg</span></div>
        <input type="range" min={sp === 'Perro' ? 2 : 1} max={sp === 'Perro' ? 50 : 10} value={w} onChange={(e) => setW(+e.target.value)} className="mt-2 w-full accent-[#ff6b5b]" aria-label="Peso de la mascota" />
        <div className="mt-4 text-sm font-bold">Actividad</div>
        <div className="mt-2 grid grid-cols-3 gap-2">{['Tranquilo', 'Normal', 'Muy activo'].map((a, i) => <button key={a} onClick={() => setAct(i)} className={cx('rounded-xl py-2.5 text-[13px] font-bold', act === i ? 'text-white' : 'bg-white')} style={act === i ? { background: PLUM } : undefined}>{a}</button>)}</div>
        <div className="mt-5 rounded-3xl bg-white p-4">
          <div className="text-center"><div className="text-[12px] font-bold uppercase tracking-wide text-[#2b1747]/50">Ración diaria</div><div className="font-(family-name:--fd) text-5xl font-bold" style={{ color: CORAL }}>{grams} g</div><div className="text-[12px] text-[#2b1747]/50">repartida en {sp === 'Perro' ? '2' : '3 o 4'} comidas</div></div>
          <ul className="mt-4 space-y-1.5 text-[14px]">{food.sizes!.map((z) => <li key={z.kg} className={cx('flex justify-between rounded-xl px-3 py-2', z === best && 'font-bold')} style={z === best ? { background: MINT } : undefined}><span>Bolsa de {z.kg.toLocaleString('es-AR')} kg</span><span>dura ≈ {Math.floor((z.kg * 1000) / grams)} días</span></li>)}</ul>
        </div>
        <p className="mt-2 text-[12px] text-[#2b1747]/50">Cálculo orientativo para {food.brand} {food.name}. Consultá a tu veterinario.</p>
        <button onClick={() => onPick(food, best.kg)} className="mt-4 w-full rounded-full py-4 font-bold text-white" style={{ background: CORAL, marginBottom: 'env(safe-area-inset-bottom)' }}>Ver bolsa de {best.kg.toLocaleString('es-AR')} kg · {money(best.p)}</button>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState({ name: '', phone: '', mode: 'envio', addr: '', pay: 'Mercado Pago' })
  const [done, setDone] = useState<null | { n: number; total: number; subs: number }>(null)
  // 2x1 en snacks: se descuenta la unidad más barata de cada par
  const snackUnits = cart.lines.filter((l) => ['s1', 's2', 's3'].some((k) => l.key.startsWith(k))).flatMap((l) => Array.from({ length: l.qty }, () => l.price)).sort((a, b) => a - b)
  const promo = snackUnits.slice(0, Math.floor(snackUnits.length / 2)).reduce((s, x) => s + x, 0)
  const ship = d.mode === 'envio' && cart.total - promo < FREE ? 2500 : 0
  const total = cart.total - promo + ship
  const ok = step === 0 || (d.name.trim().length > 1 && d.phone.replace(/\D/g, '').length >= 8 && (d.mode === 'retiro' || d.addr.trim().length > 3))
  const close = () => { onClose(); if (done) { setDone(null); setStep(0) } }
  const late = new Date().getHours() >= 15
  return (
    <Sheet open={open} onClose={close} side="right" className="bg-[#fffaf0]" label="Carrito">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Figtree, sans-serif', color: PLUM }}>
        <div className="flex items-center justify-between p-4"><div className="font-(family-name:--fd) text-2xl font-bold">{done ? '¡Pedido confirmado!' : step === 0 ? 'Tu carrito' : 'Tus datos'}</div><button onClick={close} className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
        {done ? (
          <div className="flex-1 overflow-y-auto p-6 text-center">
            <div className="animate-pop mx-auto grid h-20 w-20 place-items-center rounded-full text-white" style={{ background: CORAL }}><PawPrint className="h-10 w-10" /></div>
            <p className="mt-4 text-lg font-bold">Pedido #{done.n} · {money(done.total)}</p>
            <div className="mt-4 rounded-3xl bg-white p-4 text-left text-[14px]">{d.mode === 'envio' ? <>🛵 <b>Llega {late ? 'mañana' : 'hoy'} entre 18 y 20 h</b> a {d.addr}.</> : <>🏪 <b>Retiralo en 30 minutos</b> en Av. Mitre 2290.</>}{done.subs > 0 && <div className="mt-2">🔁 Programaste {done.subs} producto{done.subs > 1 ? 's' : ''}: te avisamos por WhatsApp antes de cada envío.</div>}</div>
            <p className="mt-3 text-[12px] text-[#2b1747]/45">Demostración: no se realizó ningún cobro.</p>
            <button onClick={close} className="mt-4 w-full rounded-full py-4 font-bold text-white" style={{ background: PLUM }}>Seguir comprando</button>
          </div>
        ) : cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><div className="text-5xl">🦴</div><p className="mt-3 font-bold">Tu carrito está vacío</p><button onClick={close} className="mt-4 rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: CORAL }}>Ver productos</button></div></div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
              {step === 0 ? (
                <ul className="space-y-2">
                  {cart.lines.map((l) => { const p = P.find((x) => l.key.startsWith(x.id))!; return (
                    <li key={l.key} className="flex items-center gap-3 rounded-2xl bg-white p-2.5">
                      <Thumb p={p} className="h-14 w-14 shrink-0 rounded-xl" size={40} />
                      <div className="min-w-0 flex-1"><div className="truncate text-[14px] font-bold">{l.name}</div><div className="truncate text-[12px] text-[#2b1747]/55">{l.detail}</div><div className="font-bold">{money(l.price * l.qty)}</div></div>
                      <div className="flex items-center rounded-full" style={{ background: CREAM }}>
                        <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                        <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                        <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                    </li>) })}
                </ul>
              ) : (
                <>
                  <input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} placeholder="Tu nombre" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-2 ring-transparent focus:ring-[#ff6b5b]" />
                  <input value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} placeholder="WhatsApp" inputMode="tel" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-2 ring-transparent focus:ring-[#ff6b5b]" />
                  <div className="grid grid-cols-2 gap-2">{([['envio', `Envío ${late ? 'mañana' : 'hoy'}`, Truck], ['retiro', 'Retiro en 30′', Store]] as const).map(([v, t, I]) => <button key={v} onClick={() => setD({ ...d, mode: v })} className={cx('flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold', d.mode === v ? 'text-white' : 'bg-white')} style={d.mode === v ? { background: PLUM } : undefined}><I className="h-4 w-4" />{t}</button>)}</div>
                  {d.mode === 'envio' && <input value={d.addr} onChange={(e) => setD({ ...d, addr: e.target.value })} placeholder="Dirección" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-2 ring-transparent focus:ring-[#ff6b5b]" />}
                  <div className="flex gap-2">{['Mercado Pago', 'Efectivo', 'Transferencia'].map((x) => <button key={x} onClick={() => setD({ ...d, pay: x })} className={cx('flex-1 rounded-xl py-2.5 text-[12.5px] font-bold', d.pay === x ? 'text-white' : 'bg-white')} style={d.pay === x ? { background: CORAL } : undefined}>{x}</button>)}</div>
                </>
              )}
            </div>
            <div className="border-t border-[#2b1747]/10 bg-white p-4 text-sm" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between"><span>Subtotal</span><span>{money(cart.total)}</span></div>
              {promo > 0 && <div className="flex justify-between font-bold" style={{ color: CORAL }}><span>2x1 en snacks</span><span>−{money(promo)}</span></div>}
              <div className="flex justify-between"><span>Envío</span><span>{d.mode === 'retiro' ? 'Sin cargo' : ship ? money(ship) : 'Gratis'}</span></div>
              <div className="flex justify-between text-xl font-extrabold"><span>Total</span><span>{money(total)}</span></div>
              <button disabled={!ok} onClick={() => { if (step === 0) setStep(1); else { setDone({ n: 2000 + Math.floor(Math.random() * 7999), total, subs: cart.lines.filter((l) => l.key.includes('-sub')).length }); cart.clear() } }} className="mt-3 w-full rounded-full py-4 font-bold text-white disabled:opacity-35" style={{ background: CORAL }}>{step === 0 ? 'Continuar' : ok ? `Confirmar pedido · ${money(total)}` : 'Completá tus datos'}</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
