import { useMemo, useState } from 'react'
import { ArrowLeftRight, BatteryFull, Check, ChevronRight, Cpu, Camera, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Trash2, Truck, X, BadgeCheck, Minus, Plus, Store, Ticket } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { safeRead, safeWrite } from '../../shared/store'
import { cx, img } from '../../shared/format'

const BIZ = 'Órbita Mobile'
const BG = '#0d0f1a', CARD = '#161a2b', LINE = '#262b42', INDIGO = '#818cf8', MINT = '#34d399', TXT = '#e8eaf6'
const RATE = 1450 // cotización de referencia
type Cond = 'Nuevo' | 'Seleccionado'
type Model = { id: string; name: string; cond: Cond; base: number; caps: number[]; colors: { n: string; hex: string }[]; pro?: boolean; battery?: number; grade?: string; chip: string; cam: string; screen: string; tag?: string }

const MODELS: Model[] = [
  { id: '17pm', name: 'iPhone 17 Pro Max', cond: 'Nuevo', base: 1799, caps: [256, 512, 1024], pro: true, chip: 'A19 Pro', cam: 'Triple 48 MP · zoom 8×', screen: '6,9" ProMotion 120 Hz', colors: [{ n: 'Naranja cósmico', hex: '#d9773c' }, { n: 'Azul profundo', hex: '#2d3a5c' }, { n: 'Plata', hex: '#d9dadc' }], tag: 'Lanzamiento' },
  { id: '17p', name: 'iPhone 17 Pro', cond: 'Nuevo', base: 1599, caps: [256, 512, 1024], pro: true, chip: 'A19 Pro', cam: 'Triple 48 MP · zoom 8×', screen: '6,3" ProMotion 120 Hz', colors: [{ n: 'Azul profundo', hex: '#2d3a5c' }, { n: 'Naranja cósmico', hex: '#d9773c' }, { n: 'Plata', hex: '#d9dadc' }] },
  { id: '17', name: 'iPhone 17', cond: 'Nuevo', base: 1199, caps: [256, 512], chip: 'A19', cam: 'Doble 48 MP', screen: '6,3" ProMotion 120 Hz', colors: [{ n: 'Lavanda', hex: '#b9a7d6' }, { n: 'Salvia', hex: '#a9b79a' }, { n: 'Negro', hex: '#2a2a2c' }, { n: 'Blanco', hex: '#ececec' }], tag: 'Más vendido' },
  { id: '16', name: 'iPhone 16', cond: 'Nuevo', base: 949, caps: [128, 256], chip: 'A18', cam: 'Doble 48 MP', screen: '6,1" Super Retina', colors: [{ n: 'Ultramar', hex: '#5a6fd6' }, { n: 'Verde azulado', hex: '#7fb3ad' }, { n: 'Rosa', hex: '#f0b8c8' }, { n: 'Negro', hex: '#2a2a2c' }] },
  { id: '16p-s', name: 'iPhone 16 Pro', cond: 'Seleccionado', base: 1049, caps: [128, 256], pro: true, battery: 94, grade: 'A+', chip: 'A18 Pro', cam: 'Triple 48 MP · zoom 5×', screen: '6,3" ProMotion', colors: [{ n: 'Titanio desierto', hex: '#bfa58a' }, { n: 'Titanio negro', hex: '#3b3b3d' }] },
  { id: '15p-s', name: 'iPhone 15 Pro', cond: 'Seleccionado', base: 799, caps: [128, 256], pro: true, battery: 89, grade: 'A+', chip: 'A17 Pro', cam: 'Triple 48 MP · zoom 3×', screen: '6,1" ProMotion', colors: [{ n: 'Titanio natural', hex: '#a8a29a' }, { n: 'Titanio azul', hex: '#3e4a5e' }], tag: 'Oportunidad' },
  { id: '15-s', name: 'iPhone 15', cond: 'Seleccionado', base: 629, caps: [128, 256], battery: 91, grade: 'A', chip: 'A16', cam: 'Doble 48 MP', screen: '6,1" Super Retina', colors: [{ n: 'Rosa', hex: '#f2c9d4' }, { n: 'Negro', hex: '#2f3133' }] },
  { id: '14-s', name: 'iPhone 14', cond: 'Seleccionado', base: 499, caps: [128, 256], battery: 87, grade: 'A', chip: 'A15', cam: 'Doble 12 MP', screen: '6,1" Super Retina', colors: [{ n: 'Azul', hex: '#a7c1d9' }, { n: 'Medianoche', hex: '#232a33' }] },
  { id: '13-s', name: 'iPhone 13', cond: 'Seleccionado', base: 419, caps: [128], battery: 85, grade: 'A', chip: 'A15', cam: 'Doble 12 MP', screen: '6,1" Super Retina', colors: [{ n: 'Blanco estelar', hex: '#ebe6dc' }, { n: 'Rojo', hex: '#b3202f' }] },
]
const capAdd = (c: number) => (c === 128 ? 0 : c === 256 ? 100 : c === 512 ? 250 : 450)
const capLabel = (c: number) => (c >= 1024 ? '1 TB' : `${c} GB`)
const priceOf = (m: Model, cap: number) => m.base + capAdd(cap) - capAdd(m.caps[0])
const ACCS = [{ id: 'acc1', n: 'Funda MagSafe', p: 25 }, { id: 'acc2', n: 'Vidrio templado', p: 12 }, { id: 'acc3', n: 'Cargador USB-C 20 W', p: 25 }]
const TRADE = [{ n: 'iPhone 11', v: 160 }, { n: 'iPhone 12', v: 230 }, { n: 'iPhone 13', v: 300 }, { n: 'iPhone 14', v: 370 }, { n: 'iPhone 15', v: 470 }, { n: 'iPhone 15 Pro', v: 590 }, { n: 'iPhone 16', v: 610 }, { n: 'iPhone 16 Pro', v: 780 }]

/* Teléfono ilustrado (vista trasera) */
function Phone({ hex, pro, size = 120 }: { hex: string; pro?: boolean; size?: number }) {
  const w = size, h = size * 2.05
  const lens = (x: number, y: number) => <span className="absolute rounded-full" style={{ left: x, top: y, width: w * 0.17, height: w * 0.17, background: 'radial-gradient(circle at 35% 35%, #4b5563, #0b0b0f 60%)', boxShadow: `0 0 0 ${w * 0.018}px rgba(0,0,0,.35)` }} />
  return (
    <div className="relative shrink-0" style={{ width: w, height: h }}>
      <div className="absolute inset-0" style={{ borderRadius: w * 0.2, background: `linear-gradient(145deg, ${hex}, ${hex} 55%, rgba(0,0,0,.18))`, boxShadow: `inset 0 0 0 ${w * 0.03}px rgba(255,255,255,.18), 0 ${w * 0.15}px ${w * 0.3}px -${w * 0.1}px rgba(0,0,0,.6)` }} />
      <div className="absolute" style={{ left: w * 0.08, top: w * 0.08, width: w * 0.46, height: w * (pro ? 0.5 : 0.46), borderRadius: w * 0.12, background: 'rgba(255,255,255,.14)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.2)' }}>
        {pro ? <>{lens(w * 0.03, w * 0.03)}{lens(w * 0.03, w * 0.27)}{lens(w * 0.25, w * 0.15)}</> : <>{lens(w * 0.04, w * 0.04)}{lens(w * 0.04, w * 0.24)}</>}
      </div>
      <div className="absolute rounded-full" style={{ left: '50%', top: '52%', width: w * 0.2, height: w * 0.2, transform: 'translate(-50%,-50%)', background: 'rgba(255,255,255,.12)' }} />
    </div>
  )
}

export default function IPhones() {
  const cart = useCart('iphones')
  const [cur, setCur] = useState<'USD' | 'ARS'>('USD')
  const [cond, setCond] = useState<Cond | 'Todos'>('Todos')
  const [model, setModel] = useState<Model | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [trade, setTrade] = useState<{ open: boolean }>({ open: false })
  const [credit, setCredit] = useState<{ n: string; v: number } | null>(() => safeRead('orbita-credit', null))
  const fmt = (usd: number) => (cur === 'USD' ? `USD ${usd.toLocaleString('es-AR')}` : `$ ${(usd * RATE).toLocaleString('es-AR')}`)
  const list = MODELS.filter((m) => cond === 'Todos' || m.cond === cond)
  const saveCredit = (c: typeof credit) => { setCredit(c); safeWrite('orbita-credit', c) }

  return (
    <DemoShell slug="iphones" fonts="family=Urbanist:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@500;600" themeColor={BG}
      className="pb-24" style={{ background: BG, color: TXT, fontFamily: 'Urbanist, sans-serif', ['--fm' as string]: '"IBM Plex Mono", monospace' }}>
      <header className="sticky top-0 z-40 border-b bg-[#0d0f1a]/85 backdrop-blur-xl" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8"><span className="absolute inset-0 rounded-full border-2" style={{ borderColor: INDIGO }} /><span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full" style={{ background: MINT }} /></div>
            <div className="leading-none"><div className="text-lg font-extrabold tracking-tight">Órbita</div><div className="font-(family-name:--fm) text-[9.5px] uppercase tracking-[.25em] text-white/50">mobile</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full p-0.5 font-(family-name:--fm) text-[12px] font-semibold" style={{ background: CARD }}>
              {(['USD', 'ARS'] as const).map((c) => <button key={c} onClick={() => setCur(c)} className={cx('rounded-full px-3 py-1.5 transition', cur === c ? 'text-[#0d0f1a]' : 'text-white/60')} style={cur === c ? { background: TXT } : undefined}>{c}</button>)}
            </div>
            <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full" style={{ background: INDIGO, color: BG }} aria-label="Carrito">
              <ShoppingBag className="h-5 w-5" />
              {cart.count > 0 && <span key={cart.count} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold" style={{ background: MINT, color: BG }}>{cart.count}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full blur-[110px]" style={{ background: `${INDIGO}40` }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 md:grid-cols-2 md:py-16">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-(family-name:--fm) text-[11px] font-semibold uppercase tracking-wider" style={{ background: CARD, color: MINT }}><BadgeCheck className="h-4 w-4" /> Especialistas en iPhone · Berazategui</div>
            <h1 className="animate-fade-up mt-4 text-[38px] font-black leading-[0.98] tracking-tight sm:text-7xl" style={{ animationDelay: '80ms' }}>Tu próximo iPhone,<br /><span style={{ color: INDIGO }}>sin vueltas.</span></h1>
            <p className="animate-fade-up mt-4 max-w-md text-[16px] leading-relaxed text-white/65" style={{ animationDelay: '160ms' }}>Nuevos sellados y seleccionados con batería verificada. Entregá tu iPhone como parte de pago y llevate el nuevo hoy, con garantía escrita.</p>
            <div className="animate-fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <a href="#modelos" className="rounded-full px-6 py-3.5 font-extrabold" style={{ background: INDIGO, color: BG }}>Ver modelos</a>
              <button onClick={() => setTrade({ open: true })} className="flex items-center gap-2 rounded-full border px-6 py-3.5 font-bold" style={{ borderColor: LINE }}><ArrowLeftRight className="h-4 w-4" /> Cotizá tu usado</button>
            </div>
            {credit && <div className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-bold" style={{ background: `${MINT}1f`, color: MINT }}><Ticket className="h-4 w-4" /> Tu {credit.n} vale {fmt(credit.v)} de crédito</div>}
          </div>
          <div className="relative flex items-end justify-center gap-4">
            <div className="animate-fade-up rotate-[-8deg]" style={{ animationDelay: '200ms' }}><Phone hex="#d9773c" pro size={110} /></div>
            <div className="animate-fade-up" style={{ animationDelay: '300ms' }}><Phone hex="#b9a7d6" size={130} /></div>
            <div className="animate-fade-up rotate-[8deg]" style={{ animationDelay: '400ms' }}><Phone hex="#2d3a5c" pro size={110} /></div>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 text-center text-[12px] font-semibold">
          {[{ i: ShieldCheck, t: 'Garantía escrita 12 meses' }, { i: BatteryFull, t: 'Batería verificada' }, { i: ArrowLeftRight, t: 'Tomamos tu usado' }].map(({ i: I, t }) => <div key={t} className="flex flex-col items-center gap-1.5 rounded-2xl p-3" style={{ background: CARD }}><I className="h-5 w-5" style={{ color: MINT }} />{t}</div>)}
        </div>
      </section>

      {/* MODELOS */}
      <section id="modelos" className="mx-auto max-w-6xl scroll-mt-16 px-4 pt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-4xl font-black tracking-tight">Modelos</h2>
          <div className="flex rounded-full p-1" style={{ background: CARD }}>
            {(['Todos', 'Nuevo', 'Seleccionado'] as const).map((c) => <button key={c} onClick={() => setCond(c)} className={cx('rounded-full px-4 py-2 text-[13px] font-bold transition', cond === c ? 'text-[#0d0f1a]' : 'text-white/60')} style={cond === c ? { background: INDIGO } : undefined}>{c === 'Nuevo' ? 'Nuevos' : c === 'Seleccionado' ? 'Seleccionados' : c}</button>)}
          </div>
        </div>
        <Tip dark className="mt-4 !mx-0">precios claros en dólares o pesos, con batería y estado de cada equipo. Menos consultas de "¿precio?" por mensaje y más clientes decididos.</Tip>
        <div key={cond} className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {list.map((m, i) => (
            <button key={m.id} onClick={() => setModel(m)} className="animate-fade-up group flex flex-col rounded-3xl border p-4 text-left transition hover:-translate-y-1" style={{ background: CARD, borderColor: LINE, animationDelay: `${i * 40}ms` }}>
              <div className="flex items-start justify-between gap-2">
                <span className={cx('rounded-full px-2 py-0.5 font-(family-name:--fm) text-[10px] font-semibold uppercase')} style={m.cond === 'Nuevo' ? { background: `${INDIGO}26`, color: INDIGO } : { background: `${MINT}1f`, color: MINT }}>{m.cond === 'Nuevo' ? 'Nuevo sellado' : `Seleccionado ${m.grade}`}</span>
                {m.tag && <span className="text-[10.5px] font-bold text-amber-300">{m.tag}</span>}
              </div>
              <div className="my-4 flex justify-center transition duration-500 group-hover:scale-105"><Phone hex={m.colors[0].hex} pro={m.pro} size={64} /></div>
              <div className="text-[17px] font-extrabold leading-tight">{m.name}</div>
              <div className="mt-1 flex gap-1">{m.colors.map((c) => <span key={c.n} className="h-3 w-3 rounded-full ring-1 ring-white/20" style={{ background: c.hex }} />)}</div>
              {m.battery && <div className="mt-1.5 flex items-center gap-1 font-(family-name:--fm) text-[11px]" style={{ color: MINT }}><BatteryFull className="h-3.5 w-3.5" /> Batería {m.battery}%</div>}
              <div className="mt-auto pt-3">
                <div className="text-[11px] text-white/45">desde · {capLabel(m.caps[0])}</div>
                <div className="font-(family-name:--fm) text-[17px] font-semibold">{fmt(m.base)}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CANJE */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <Reveal className="relative overflow-hidden rounded-[32px] p-6 sm:p-10" style={{ background: `linear-gradient(130deg, ${INDIGO}, #6366f1 40%, #312e81)` }}>
          <div className="relative grid gap-5 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 font-(family-name:--fm) text-[12px] font-semibold uppercase tracking-wider text-white/80"><ArrowLeftRight className="h-4 w-4" /> Plan canje</div>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Tu iPhone usado vale. Usalo como parte de pago.</h2>
              <p className="mt-2 text-white/80">Cotizalo en 20 segundos y el crédito se descuenta solo en el carrito.</p>
            </div>
            <button onClick={() => setTrade({ open: true })} className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 text-lg font-extrabold" style={{ color: '#312e81' }}>{credit ? 'Recotizar mi iPhone' : 'Cotizar mi iPhone'} <ChevronRight className="h-5 w-5" /></button>
          </div>
        </Reveal>
        <Tip dark className="mt-4">el plan canje es lo que más cierra ventas de equipos caros: el cliente ve cuánto le queda por pagar.</Tip>
      </section>

      {/* CONFIANZA */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="text-3xl font-black tracking-tight">¿Qué es un iPhone seleccionado?</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[{ i: BatteryFull, t: 'Batería mínima 85%', d: 'Medida y publicada en cada equipo.' }, { i: Sparkles, t: '30 puntos de control', d: 'Face ID, cámaras, pantalla, parlantes y carga.' }, { i: ShieldCheck, t: 'Garantía de 6 meses', d: 'Por escrito y con atención en el local.' }].map(({ i: I, t, d }) => (
            <Reveal key={t} className="rounded-3xl border p-5" style={{ background: CARD, borderColor: LINE }}><I className="h-6 w-6" style={{ color: MINT }} /><div className="mt-3 text-lg font-extrabold">{t}</div><p className="text-[14px] text-white/60">{d}</p></Reveal>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-3xl"><SmartImg src={img('1592750475338-74b7b21085ab', 1200, 500)} alt="Local de Órbita Mobile" fallback={`linear-gradient(120deg, ${CARD}, #312e81)`} className="aspect-[12/5]" /></div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-12 text-center text-[13px] text-white/45">
        Órbita Mobile · Calle 14 N° 4555, local 3, Berazategui · Lun a sáb 10–20 h<br />Cotización de referencia: USD 1 = $ {RATE.toLocaleString('es-AR')}. iPhone es una marca de Apple Inc. Órbita Mobile es un comercio independiente.
      </footer>

      {cart.count > 0 && !cartOpen && !model && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full px-5 py-3.5 font-extrabold shadow-2xl" style={{ background: INDIGO, color: BG }}><span>Carrito · {cart.count}</span><span className="font-(family-name:--fm)">{fmt(cart.total)}</span></button>
        </div>
      )}

      <ModelSheet m={model} fmt={fmt} onClose={() => setModel(null)} onAdd={(lines) => { lines.forEach((l) => cart.add(l)); toast('Agregado al carrito'); setModel(null); setTimeout(() => setCartOpen(true), 250) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} fmt={fmt} credit={credit} onClearCredit={() => saveCredit(null)} onTrade={() => setTrade({ open: true })} />
      <TradeSheet open={trade.open} fmt={fmt} onClose={() => setTrade({ open: false })} onApply={(c) => { saveCredit(c); setTrade({ open: false }); toast(`Crédito de ${fmt(c.v)} aplicado`) }} />
    </DemoShell>
  )
}

function ModelSheet({ m, fmt, onClose, onAdd }: { m: Model | null; fmt: (n: number) => string; onClose: () => void; onAdd: (l: { key: string; name: string; price: number; detail: string }[]) => void }) {
  const [color, setColor] = useState(0)
  const [cap, setCap] = useState(0)
  const [accs, setAccs] = useState<string[]>([])
  const [last, setLast] = useState<string | null>(null)
  if (m && m.id !== last) { setLast(m.id); setColor(0); setCap(0); setAccs([]) }
  if (!m) return null
  const price = priceOf(m, m.caps[cap])
  const accTotal = ACCS.filter((a) => accs.includes(a.id)).reduce((s, a) => s + a.p, 0)
  return (
    <Sheet open onClose={onClose} side="right" className="bg-[#0d0f1a]" label={m.name}>
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Urbanist, sans-serif', color: TXT }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative grid place-items-center py-8" style={{ background: `radial-gradient(circle at 50% 40%, ${m.colors[color].hex}55, transparent 65%)` }}>
            <div key={color} className="animate-pop"><Phone hex={m.colors[color].hex} pro={m.pro} size={110} /></div>
            <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full" style={{ background: CARD }} aria-label="Cerrar"><X className="h-5 w-5" /></button>
          </div>
          <div className="p-5">
            <span className="rounded-full px-2 py-0.5 font-(family-name:--fm) text-[11px] font-semibold uppercase" style={m.cond === 'Nuevo' ? { background: `${INDIGO}26`, color: INDIGO } : { background: `${MINT}1f`, color: MINT }}>{m.cond === 'Nuevo' ? 'Nuevo sellado · garantía 12 meses' : `Seleccionado ${m.grade} · garantía 6 meses`}</span>
            <h3 className="mt-2 text-3xl font-black tracking-tight">{m.name}</h3>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px]">
              {[{ i: Cpu, t: m.chip }, { i: Camera, t: m.cam }, { i: Smartphone, t: m.screen }].map(({ i: I, t }) => <div key={t} className="rounded-2xl p-2.5" style={{ background: CARD }}><I className="mx-auto h-4 w-4" style={{ color: INDIGO }} /><div className="mt-1 leading-tight">{t}</div></div>)}
            </div>
            {m.battery && (
              <div className="mt-3 rounded-2xl p-3" style={{ background: CARD }}>
                <div className="flex justify-between text-[13px]"><span className="flex items-center gap-1.5"><BatteryFull className="h-4 w-4" style={{ color: MINT }} /> Condición de batería</span><b className="font-(family-name:--fm)" style={{ color: MINT }}>{m.battery}%</b></div>
                <div className="mt-2 h-2 rounded-full" style={{ background: LINE }}><div className="h-2 rounded-full" style={{ width: `${m.battery}%`, background: MINT }} /></div>
                <p className="mt-2 text-[12px] text-white/50">Estado estético {m.grade}: {m.grade === 'A+' ? 'sin marcas visibles' : 'marcas mínimas de uso'}. Incluye caja y cable.</p>
              </div>
            )}
            <div className="mt-5 text-sm font-bold">Color: <span className="font-medium text-white/70">{m.colors[color].n}</span></div>
            <div className="mt-2 flex gap-2">{m.colors.map((c, i) => <button key={c.n} onClick={() => setColor(i)} aria-label={c.n} className={cx('h-10 w-10 rounded-full ring-offset-2 ring-offset-[#0d0f1a] transition', color === i ? 'ring-2 ring-white' : 'ring-1 ring-white/20')} style={{ background: c.hex }} />)}</div>
            <div className="mt-5 text-sm font-bold">Capacidad</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {m.caps.map((c, i) => <button key={c} onClick={() => setCap(i)} className={cx('rounded-2xl border p-3 text-left transition')} style={{ borderColor: cap === i ? INDIGO : LINE, background: cap === i ? `${INDIGO}1a` : 'transparent' }}><div className="font-extrabold">{capLabel(c)}</div><div className="font-(family-name:--fm) text-[11px] text-white/55">{fmt(priceOf(m, c))}</div></button>)}
            </div>
            <div className="mt-5 text-sm font-bold">Sumá protección</div>
            <div className="mt-2 space-y-2">
              {ACCS.map((a) => { const on = accs.includes(a.id); return (
                <button key={a.id} onClick={() => setAccs((x) => (on ? x.filter((y) => y !== a.id) : [...x, a.id]))} className="flex w-full items-center gap-3 rounded-2xl border p-3 text-left text-sm" style={{ borderColor: on ? MINT : LINE }}>
                  <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: on ? MINT : LINE, color: BG }}>{on && <Check className="h-3.5 w-3.5" />}</span>
                  <span className="flex-1">{a.n}</span><span className="font-(family-name:--fm) text-white/60">+{fmt(a.p)}</span>
                </button>) })}
            </div>
            <div className="mt-4 rounded-2xl p-3 text-[13px] text-white/60" style={{ background: CARD }}>En pesos: <b className="text-white">$ {((price + accTotal) * RATE).toLocaleString('es-AR')}</b> · o 6 cuotas fijas de $ {Math.round(((price + accTotal) * RATE * 1.12) / 6).toLocaleString('es-AR')} con tarjeta</div>
          </div>
        </div>
        <div className="border-t p-4" style={{ borderColor: LINE, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => onAdd([{ key: `${m.id}-${m.caps[cap]}-${color}`, name: m.name, price, detail: `${capLabel(m.caps[cap])} · ${m.colors[color].n}${m.battery ? ` · bat. ${m.battery}%` : ''}` }, ...ACCS.filter((a) => accs.includes(a.id)).map((a) => ({ key: a.id, name: a.n, price: a.p, detail: 'Accesorio' }))])}
            className="flex w-full items-center justify-between rounded-full px-6 py-4 font-extrabold" style={{ background: INDIGO, color: BG }}><span>Agregar al carrito</span><span className="font-(family-name:--fm)">{fmt(price + accTotal)}</span></button>
        </div>
      </div>
    </Sheet>
  )
}

function TradeSheet({ open, onClose, onApply, fmt }: { open: boolean; onClose: () => void; onApply: (c: { n: string; v: number }) => void; fmt: (n: number) => string }) {
  const [mi, setMi] = useState<number | null>(null)
  const [st, setSt] = useState(0)
  const [bat, setBat] = useState(0)
  const STATES = [{ n: 'Impecable', f: 1 }, { n: 'Detalles de uso', f: 0.85 }, { n: 'Pantalla o tapa rota', f: 0.55 }]
  const BATS = [{ n: 'Más de 90%', f: 1 }, { n: '80 a 90%', f: 0.92 }, { n: 'Menos de 80%', f: 0.8 }]
  const value = useMemo(() => (mi === null ? 0 : Math.round((TRADE[mi].v * STATES[st].f * BATS[bat].f) / 5) * 5), [mi, st, bat]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Sheet open={open} onClose={onClose} className="bg-[#0d0f1a]" label="Plan canje">
      <div className="overflow-y-auto p-5" style={{ fontFamily: 'Urbanist, sans-serif', color: TXT }}>
        <div className="flex items-center justify-between"><div className="text-2xl font-black">Cotizá tu iPhone</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        <div className="mt-4 text-sm font-bold">¿Qué modelo tenés?</div>
        <div className="mt-2 grid grid-cols-2 gap-2">{TRADE.map((t, i) => <button key={t.n} onClick={() => setMi(i)} className="rounded-xl border px-3 py-2.5 text-left text-[14px] font-semibold" style={{ borderColor: mi === i ? INDIGO : LINE, background: mi === i ? `${INDIGO}1a` : 'transparent' }}>{t.n}</button>)}</div>
        <div className="mt-4 text-sm font-bold">Estado</div>
        <div className="mt-2 grid grid-cols-3 gap-2">{STATES.map((s, i) => <button key={s.n} onClick={() => setSt(i)} className="rounded-xl border px-2 py-2.5 text-[12.5px] font-semibold leading-tight" style={{ borderColor: st === i ? INDIGO : LINE, background: st === i ? `${INDIGO}1a` : 'transparent' }}>{s.n}</button>)}</div>
        <div className="mt-4 text-sm font-bold">Batería</div>
        <div className="mt-2 grid grid-cols-3 gap-2">{BATS.map((s, i) => <button key={s.n} onClick={() => setBat(i)} className="rounded-xl border px-2 py-2.5 text-[12.5px] font-semibold" style={{ borderColor: bat === i ? INDIGO : LINE, background: bat === i ? `${INDIGO}1a` : 'transparent' }}>{s.n}</button>)}</div>
        <div className="mt-5 rounded-2xl p-4 text-center" style={{ background: CARD }}>
          <div className="text-[12px] uppercase tracking-wider text-white/50">Te lo tomamos por</div>
          <div className="mt-1 font-(family-name:--fm) text-4xl font-semibold" style={{ color: mi === null ? '#ffffff40' : MINT }}>{mi === null ? '—' : fmt(value)}</div>
          <div className="text-[12px] text-white/45">Valor estimado. Se confirma revisando el equipo en el local.</div>
        </div>
        <button disabled={mi === null} onClick={() => onApply({ n: TRADE[mi!].n, v: value })} className="mt-4 w-full rounded-full py-4 font-extrabold disabled:opacity-30" style={{ background: INDIGO, color: BG, marginBottom: 'env(safe-area-inset-bottom)' }}>Usar como parte de pago</button>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart, fmt, credit, onClearCredit, onTrade }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart>; fmt: (n: number) => string; credit: { n: string; v: number } | null; onClearCredit: () => void; onTrade: () => void }) {
  const [step, setStep] = useState<'cart' | 'reserve' | 'done'>('cart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mode, setMode] = useState<'local' | 'envio'>('local')
  const [code, setCode] = useState('')
  const [wa, setWa] = useState(false)
  const [snapshot, setSnapshot] = useState('')
  const hasPhone = cart.lines.some((l) => !l.key.startsWith('acc'))
  const cred = credit && hasPhone ? Math.min(credit.v, cart.total) : 0
  const total = cart.total - cred
  const ok = name.trim().length > 1 && phone.replace(/\D/g, '').length >= 8
  const close = () => { onClose(); if (step === 'done') setStep('cart') }
  return (
    <>
      <Sheet open={open} onClose={close} side="right" className="bg-[#0d0f1a]" label="Carrito">
        <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Urbanist, sans-serif', color: TXT }}>
          <div className="flex items-center justify-between border-b p-4" style={{ borderColor: LINE }}><div className="text-xl font-black">{step === 'done' ? 'Reserva confirmada' : step === 'reserve' ? 'Reservá tu equipo' : 'Tu carrito'}</div><button onClick={close} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
          {step === 'done' ? (
            <div className="flex-1 overflow-y-auto p-6 text-center">
              <div className="animate-pop mx-auto grid h-20 w-20 place-items-center rounded-full" style={{ background: MINT, color: BG }}><Check className="h-10 w-10" /></div>
              <div className="mt-4 text-2xl font-black">¡Listo, {name.split(' ')[0]}!</div>
              <p className="text-white/60">Separamos tu equipo por 48 h.</p>
              <div className="mt-5 rounded-2xl p-5" style={{ background: CARD }}><div className="text-[12px] uppercase tracking-wider text-white/50">Código de reserva</div><div className="mt-1 font-(family-name:--fm) text-3xl font-semibold" style={{ color: INDIGO }}>{code}</div><div className="mt-2 text-[13px] text-white/60">{mode === 'local' ? 'Retirá en Calle 14 N° 4555, local 3. Traé tu usado si usaste plan canje.' : 'Te lo llevamos en el día con un asesor que verifica tu usado.'}</div></div>
              <button onClick={() => setWa(true)} className="mt-4 w-full rounded-full bg-[#25d366] py-3.5 font-extrabold text-white">Ver confirmación por WhatsApp</button>
              <p className="mt-3 text-[12px] text-white/40">Demostración: no se cobró ninguna seña.</p>
            </div>
          ) : cart.lines.length === 0 ? (
            <div className="grid flex-1 place-items-center p-8 text-center"><div><Smartphone className="mx-auto h-10 w-10 text-white/25" /><p className="mt-3 font-bold">Tu carrito está vacío</p><button onClick={close} className="mt-4 rounded-full px-6 py-3 text-sm font-bold" style={{ background: INDIGO, color: BG }}>Ver modelos</button></div></div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                {step === 'cart' ? (
                  <>
                    <ul className="space-y-2">
                      {cart.lines.map((l) => (
                        <li key={l.key} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: CARD }}>
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: LINE }}>{l.key.startsWith('acc') ? <ShieldCheck className="h-5 w-5" style={{ color: MINT }} /> : <Smartphone className="h-5 w-5" style={{ color: INDIGO }} />}</div>
                          <div className="min-w-0 flex-1"><div className="truncate font-bold">{l.name}</div><div className="truncate text-[12px] text-white/50">{l.detail}</div><div className="font-(family-name:--fm) text-[13px]">{fmt(l.price * l.qty)}</div></div>
                          <div className="flex items-center rounded-full" style={{ background: LINE }}>
                            <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                            <span className="w-4 text-center text-sm font-bold">{l.qty}</span>
                            <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {credit && hasPhone ? (
                      <div className="flex items-center gap-3 rounded-2xl p-3" style={{ background: `${MINT}14` }}><ArrowLeftRight className="h-5 w-5" style={{ color: MINT }} /><div className="flex-1 text-sm"><b>Plan canje:</b> tu {credit.n}</div><span className="font-(family-name:--fm) text-sm" style={{ color: MINT }}>−{fmt(cred)}</span><button onClick={onClearCredit} aria-label="Quitar canje"><X className="h-4 w-4 text-white/50" /></button></div>
                    ) : hasPhone && <button onClick={onTrade} className="flex w-full items-center gap-3 rounded-2xl border border-dashed p-3 text-left text-sm" style={{ borderColor: LINE }}><ArrowLeftRight className="h-5 w-5" style={{ color: INDIGO }} /><span className="flex-1">¿Tenés un iPhone para entregar? <b>Cotizalo</b></span><ChevronRight className="h-4 w-4" /></button>}
                  </>
                ) : (
                  <>
                    <p className="text-[14px] text-white/65">Dejá tus datos y separamos el equipo 48 h. Pagás al retirarlo en efectivo, transferencia o hasta 6 cuotas.</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" className="w-full rounded-2xl border bg-transparent px-4 py-3.5 outline-none focus:border-[#818cf8]" style={{ borderColor: LINE }} />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp" inputMode="tel" className="w-full rounded-2xl border bg-transparent px-4 py-3.5 outline-none focus:border-[#818cf8]" style={{ borderColor: LINE }} />
                    <div className="grid grid-cols-2 gap-2">{([['local', 'Retiro en local', Store], ['envio', 'Envío en el día', Truck]] as const).map(([v, t, I]) => <button key={v} onClick={() => setMode(v)} className="flex items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-bold" style={{ borderColor: mode === v ? INDIGO : LINE, background: mode === v ? `${INDIGO}1a` : 'transparent' }}><I className="h-4 w-4" />{t}</button>)}</div>
                  </>
                )}
              </div>
              <div className="border-t p-4" style={{ borderColor: LINE, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
                {cred > 0 && <div className="flex justify-between text-sm text-white/60"><span>Subtotal</span><span className="font-(family-name:--fm)">{fmt(cart.total)}</span></div>}
                <div className="flex justify-between text-xl font-black"><span>Total</span><span className="font-(family-name:--fm)">{fmt(total)}</span></div>
                <button disabled={step === 'reserve' && !ok} onClick={() => {
                  if (step === 'cart') return setStep('reserve')
                  const c = `ORB-${Math.floor(1000 + Math.random() * 8999)}`; setCode(c)
                  setSnapshot(`¡Hola ${name.split(' ')[0]}! Confirmamos tu reserva ${c} en Órbita Mobile:\n\n${cart.lines.map((l) => `• ${l.name} (${l.detail}) — ${fmt(l.price * l.qty)}`).join('\n')}${cred ? `\n• Plan canje ${credit!.n}: −${fmt(cred)}` : ''}\n\n*Total: ${fmt(total)}*\nTe esperamos dentro de las próximas 48 h.`)
                  cart.clear(); onClearCredit(); setStep('done')
                }} className="mt-3 w-full rounded-full py-4 font-extrabold disabled:opacity-30" style={{ background: INDIGO, color: BG }}>{step === 'cart' ? 'Continuar con la reserva' : ok ? 'Reservar sin cargo' : 'Completá tus datos'}</button>
              </div>
            </>
          )}
        </div>
      </Sheet>
      <WhatsAppSim open={wa} onClose={() => setWa(false)} business={BIZ} message={snapshot} />
    </>
  )
}
