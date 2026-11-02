import { useMemo, useState } from 'react'
import { Check, ChevronRight, Clock, Eye, Glasses, Heart, MapPin, Phone, ScanEye, ShieldCheck, Sun, Wrench, X, CircleDot, Layers, CalendarCheck, MessageCircle } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { nextDays, slotsFor, longDate } from '../../shared/booking'
import { safeRead, safeWrite } from '../../shared/store'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Visión Óptica'
const NAVY = '#0f2a4a', SKY = '#2f7cf6', MIST = '#eef4fb'
type Kind = 'Recetados' | 'Sol'
type Style = 'Redondo' | 'Cuadrado' | 'Aviador' | 'Cat-eye' | 'Rectangular'
type Frame = { id: string; name: string; brand: string; kind: Kind; style: Style; price: number; img: string; colors: { n: string; hex: string }[]; material: string; polar?: boolean; isNew?: boolean }

const FRAMES: Frame[] = [
  { id: 'f1', name: 'Milano', brand: 'Lumen', kind: 'Recetados', style: 'Redondo', price: 89000, img: '1574258495973-f010dfbb5371', colors: [{ n: 'Carey', hex: '#7a4a24' }, { n: 'Negro', hex: '#111' }], material: 'Acetato', isNew: true },
  { id: 'f2', name: 'Berlín', brand: 'Optix', kind: 'Recetados', style: 'Rectangular', price: 76000, img: '1591076482161-42ce6da69f67', colors: [{ n: 'Negro mate', hex: '#222' }, { n: 'Azul', hex: '#1e3a8a' }], material: 'TR90 flexible' },
  { id: 'f3', name: 'Oslo', brand: 'Lumen', kind: 'Recetados', style: 'Cuadrado', price: 94000, img: '1508296695146-257a814070b4', colors: [{ n: 'Cristal', hex: '#d9e2ec' }, { n: 'Negro', hex: '#111' }], material: 'Acetato' },
  { id: 'f4', name: 'Kioto', brand: 'Nordik', kind: 'Recetados', style: 'Redondo', price: 112000, img: '1556306535-0f09a537f0a3', colors: [{ n: 'Dorado', hex: '#c9a45c' }, { n: 'Plata', hex: '#c0c0c0' }], material: 'Titanio', isNew: true },
  { id: 'f5', name: 'Lyon', brand: 'Optix', kind: 'Recetados', style: 'Cat-eye', price: 86000, img: '1516914943479-89db7d9ae7f2', colors: [{ n: 'Bordó', hex: '#7f1d1d' }, { n: 'Carey', hex: '#7a4a24' }], material: 'Acetato' },
  { id: 'f6', name: 'Praga', brand: 'Nordik', kind: 'Recetados', style: 'Rectangular', price: 68000, img: '1584036553516-bf83210aa16c', colors: [{ n: 'Gris', hex: '#6b7280' }], material: 'Metal' },
  { id: 's1', name: 'Riviera', brand: 'Solaris', kind: 'Sol', style: 'Aviador', price: 98000, img: '1511499767150-a48a237f0083', colors: [{ n: 'Dorado / verde', hex: '#c9a45c' }, { n: 'Plata / azul', hex: '#94a3b8' }], material: 'Metal', polar: true },
  { id: 's2', name: 'Ibiza', brand: 'Solaris', kind: 'Sol', style: 'Cuadrado', price: 84000, img: '1572635196237-14b3f281503f', colors: [{ n: 'Negro', hex: '#111' }, { n: 'Carey', hex: '#7a4a24' }], material: 'Acetato', polar: true, isNew: true },
  { id: 's3', name: 'Mónaco', brand: 'Riva', kind: 'Sol', style: 'Cat-eye', price: 92000, img: '1509695507497-903c140c43b0', colors: [{ n: 'Negro', hex: '#111' }, { n: 'Nude', hex: '#d6b8a0' }], material: 'Acetato' },
  { id: 's4', name: 'Malibú', brand: 'Riva', kind: 'Sol', style: 'Redondo', price: 79000, img: '1577803645773-f96470509666', colors: [{ n: 'Dorado', hex: '#c9a45c' }], material: 'Metal', polar: true },
  { id: 's5', name: 'Cabo', brand: 'Solaris', kind: 'Sol', style: 'Rectangular', price: 72000, img: '1473496169904-658ba7c44d8a', colors: [{ n: 'Negro', hex: '#111' }, { n: 'Azul', hex: '#1e40af' }], material: 'TR90 flexible' },
]
const STYLES: Style[] = ['Redondo', 'Cuadrado', 'Rectangular', 'Aviador', 'Cat-eye']
const FACES = [
  { id: 'redondo', n: 'Redondo', rec: ['Cuadrado', 'Rectangular'] as Style[], why: 'Los marcos angulares estilizan y alargan el rostro.', path: 'M50 12 C78 12 88 36 88 55 C88 76 72 92 50 92 C28 92 12 76 12 55 C12 36 22 12 50 12Z' },
  { id: 'cuadrado', n: 'Cuadrado', rec: ['Redondo', 'Aviador'] as Style[], why: 'Las curvas suavizan una mandíbula marcada.', path: 'M22 14 H78 Q86 14 86 22 V80 Q86 92 74 92 H26 Q14 92 14 80 V22 Q14 14 22 14Z' },
  { id: 'ovalado', n: 'Ovalado', rec: ['Cuadrado', 'Cat-eye', 'Aviador'] as Style[], why: 'El rostro más versátil: casi todo te queda bien.', path: 'M50 8 C76 8 84 34 84 52 C84 78 68 94 50 94 C32 94 16 78 16 52 C16 34 24 8 50 8Z' },
  { id: 'corazon', n: 'Corazón', rec: ['Redondo', 'Cat-eye'] as Style[], why: 'Equilibran una frente amplia con un mentón fino.', path: 'M14 20 Q50 6 86 20 Q88 52 66 78 Q56 92 50 94 Q44 92 34 78 Q12 52 14 20Z' },
]
const SERVICES = [
  { i: ScanEye, t: 'Control visual computarizado', d: 'Autorrefractómetro y optometrista matriculado. Sin cargo con la compra de tus lentes.' },
  { i: Layers, t: 'Lentes multifocales', d: 'Adaptación personalizada con garantía de adaptación de 60 días.' },
  { i: CircleDot, t: 'Lentes de contacto', d: 'Blandos, tóricos y cosméticos. Adaptación y seguimiento.' },
  { i: Sun, t: 'Lentes de sol graduados', d: 'Tu receta en cualquier armazón de sol, con filtro UV400 y polarizado.' },
  { i: Wrench, t: 'Ajustes y reparaciones', d: 'Cambio de patillas, plaquetas y soldaduras en el día.' },
  { i: ShieldCheck, t: 'Obras sociales y prepagas', d: 'OSDE, Swiss Medical, IOMA, PAMI, Galeno y más.' },
]
const REASONS = ['Control visual', 'Lentes de contacto', 'Retiro / adaptación', 'Ajuste o reparación']

export default function Optica() {
  const [kind, setKind] = useState<Kind | 'Todos'>('Todos')
  const [styles, setStyles] = useState<Style[]>([])
  const [frame, setFrame] = useState<Frame | null>(null)
  const [face, setFace] = useState<string | null>(null)
  const [wish, setWish] = useState<string[]>(() => safeRead('vision-wish', []))
  const [wishOpen, setWishOpen] = useState(false)
  const [turno, setTurno] = useState<{ open: boolean; reason?: string }>({ open: false })

  const list = FRAMES.filter((f) => (kind === 'Todos' || f.kind === kind) && (!styles.length || styles.includes(f.style)))
  const toggleWish = (id: string) => setWish((w) => { const n = w.includes(id) ? w.filter((x) => x !== id) : [...w, id]; safeWrite('vision-wish', n); toast(w.includes(id) ? 'Quitado de tu selección' : 'Guardado para probar en el local'); return n })
  const applyFace = (id: string) => { setFace(id); setStyles(FACES.find((f) => f.id === id)!.rec); setKind('Todos') }

  return (
    <DemoShell slug="optica" fonts="family=Outfit:wght@300;400;500;600;700" themeColor="#ffffff"
      className="pb-24" style={{ background: '#fff', color: NAVY, fontFamily: 'Outfit, sans-serif' }}>
      <header className="sticky top-0 z-40 border-b border-[#0f2a4a]/5 bg-white/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-14"><span className="absolute left-0 top-0 h-9 w-9 rounded-full border-[3px]" style={{ borderColor: NAVY }} /><span className="absolute right-0 top-0 h-9 w-9 rounded-full border-[3px]" style={{ borderColor: SKY }} /></div>
            <div className="leading-none"><div className="text-[17px] font-semibold tracking-tight">Visión</div><div className="text-[11px] font-medium uppercase tracking-[.3em] text-[#0f2a4a]/50">Óptica</div></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setWishOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full bg-[#eef4fb]" aria-label="Mi selección">
              <Heart className="h-5 w-5" />
              {wish.length > 0 && <span key={wish.length} className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-semibold text-white" style={{ background: SKY }}>{wish.length}</span>}
            </button>
            <button onClick={() => setTurno({ open: true })} className="rounded-full px-4 py-2.5 text-sm font-semibold text-white" style={{ background: NAVY }}>Pedir turno</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-8 pt-8 md:grid-cols-2 md:pt-14">
        <div>
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-[#eef4fb] px-3 py-1.5 text-[13px] font-medium"><Eye className="h-4 w-4" style={{ color: SKY }} /> Control visual sin cargo con tus lentes</div>
          <h1 className="animate-fade-up mt-4 text-[46px] font-semibold leading-[1.02] tracking-tight sm:text-7xl" style={{ animationDelay: '80ms' }}>Mirá mejor.<br /><span style={{ color: SKY }}>Lucí mejor.</span></h1>
          <p className="animate-fade-up mt-4 max-w-md text-[17px] font-light leading-relaxed text-[#0f2a4a]/70" style={{ animationDelay: '160ms' }}>Más de 300 armazones, lentes de sol y servicios ópticos con profesionales matriculados. Elegí tus favoritos online y probalos en el local.</p>
          <div className="animate-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <button onClick={() => setTurno({ open: true, reason: 'Control visual' })} className="flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#2f7cf6]/30 transition active:scale-95" style={{ background: SKY }}><CalendarCheck className="h-5 w-5" /> Turno para control</button>
            <a href="#catalogo" className="rounded-full bg-[#eef4fb] px-6 py-3.5 font-semibold">Ver armazones</a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[['+15', 'años en Berazategui'], ['300+', 'modelos'], ['12', 'obras sociales']].map(([a, b]) => <div key={b} className="rounded-2xl border border-[#0f2a4a]/8 p-3"><div className="text-2xl font-semibold">{a}</div><div className="text-[12px] text-[#0f2a4a]/55">{b}</div></div>)}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-[#2f7cf6]/10 blur-2xl" />
          <SmartImg eager src={img('1516914943479-89db7d9ae7f2', 900, 1000)} alt="Clienta con anteojos" fallback={`linear-gradient(160deg,${MIST},#9cc0f5)`} className="relative aspect-[9/10] rounded-[40px]" />
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl">
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: MIST }}><ShieldCheck className="h-6 w-6" style={{ color: SKY }} /></div>
            <div><div className="text-sm font-semibold">Garantía de 1 año</div><div className="text-[12px] text-[#0f2a4a]/55">en armazones y cristales</div></div>
          </div>
        </div>
      </section>

      {/* ROSTRO */}
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <Reveal className="rounded-[32px] p-6 sm:p-8" style={{ background: MIST }}>
          <h2 className="text-3xl font-semibold tracking-tight">¿Qué anteojos te quedan bien?</h2>
          <p className="mt-1 text-[15px] text-[#0f2a4a]/65">Elegí la forma de tu rostro y te mostramos los estilos ideales.</p>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {FACES.map((f) => (
              <button key={f.id} onClick={() => applyFace(f.id)} className={cx('flex flex-col items-center gap-2 rounded-2xl bg-white p-3 transition', face === f.id ? 'ring-2 ring-[#2f7cf6]' : 'ring-1 ring-transparent')}>
                <svg viewBox="0 0 100 100" className="h-12 w-12"><path d={f.path} fill={face === f.id ? '#2f7cf622' : 'none'} stroke={face === f.id ? SKY : NAVY} strokeWidth="4" /></svg>
                <span className="text-[13px] font-medium">{f.n}</span>
              </button>
            ))}
          </div>
          {face && (() => { const f = FACES.find((x) => x.id === face)!; return (
            <div className="animate-fade-up mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4">
              <div><div className="font-semibold">Te recomendamos: {f.rec.join(', ')}</div><div className="text-[14px] text-[#0f2a4a]/60">{f.why}</div></div>
              <a href="#catalogo" className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: SKY }}>Ver modelos <ChevronRight className="h-4 w-4" /></a>
            </div>
          ) })()}
        </Reveal>
        <Tip className="mt-4">herramientas que ayudan a elegir hacen que el cliente llegue al local decidido y con ganas de comprar.</Tip>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-4xl font-semibold tracking-tight">Catálogo</h2>
          <div className="flex rounded-full bg-[#eef4fb] p-1">
            {(['Todos', 'Recetados', 'Sol'] as const).map((k) => <button key={k} onClick={() => setKind(k)} className={cx('flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition', kind === k && 'bg-white shadow-sm')}>{k === 'Sol' ? <Sun className="h-4 w-4" /> : k === 'Recetados' ? <Glasses className="h-4 w-4" /> : null}{k}</button>)}
          </div>
        </div>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          {STYLES.map((s) => { const on = styles.includes(s); return <button key={s} onClick={() => { setStyles(on ? styles.filter((x) => x !== s) : [...styles, s]); setFace(null) }} className={cx('shrink-0 rounded-full border px-4 py-2 text-sm transition', on ? 'border-transparent text-white' : 'border-[#0f2a4a]/12')} style={on ? { background: NAVY } : undefined}>{s}</button> })}
          {styles.length > 0 && <button onClick={() => { setStyles([]); setFace(null) }} className="shrink-0 px-2 text-sm underline">Limpiar</button>}
        </div>
        {list.length === 0 ? (
          <div className="mt-6 rounded-3xl bg-[#eef4fb] p-8 text-center"><p className="font-semibold">No hay modelos con esos filtros.</p><button onClick={() => { setStyles([]); setKind('Todos') }} className="mt-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold">Ver todos</button></div>
        ) : (
          <div key={kind + styles.join()} className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {list.map((f, i) => (
              <div key={f.id} className="animate-fade-up group rounded-3xl bg-[#f6f9fd] p-3 transition hover:bg-[#eef4fb]" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="relative">
                  <button onClick={() => setFrame(f)} className="block w-full overflow-hidden rounded-2xl" aria-label={`Ver ${f.name}`}>
                    <SmartImg src={img(f.img, 500, 400)} alt={`Anteojos ${f.name}`} fallback={`linear-gradient(160deg,${MIST},#bcd3f5)`} className="aspect-[5/4] transition duration-500 group-hover:scale-105" />
                  </button>
                  <button onClick={() => toggleWish(f.id)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90" aria-label="Guardar"><Heart className={cx('h-4 w-4', wish.includes(f.id) && 'fill-current')} style={wish.includes(f.id) ? { color: SKY } : undefined} /></button>
                  <div className="absolute left-2 top-2 flex gap-1">
                    {f.isNew && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold">Nuevo</span>}
                    {f.polar && <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: SKY }}>Polarizado</span>}
                  </div>
                </div>
                <button onClick={() => setFrame(f)} className="mt-3 block w-full text-left">
                  <div className="text-[11px] font-medium uppercase tracking-widest text-[#0f2a4a]/45">{f.brand} · {f.style}</div>
                  <div className="text-lg font-semibold">{f.name}</div>
                  <div className="flex items-center justify-between"><span className="font-medium">{money(f.price)}</span><span className="flex gap-1">{f.colors.map((c) => <span key={c.n} className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />)}</span></div>
                </button>
              </div>
            ))}
          </div>
        )}
        <Tip className="mt-5 !mx-0">el catálogo online trae clientes al local: guardan sus modelos favoritos y piden probarlos, en vez de ir a una cadena grande.</Tip>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal><h2 className="text-4xl font-semibold tracking-tight">Servicios ópticos</h2><p className="mt-1 text-[15px] text-[#0f2a4a]/60">Atención profesional para toda la familia.</p></Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ i: I, t, d }, k) => (
            <Reveal key={t} delay={(k % 3) * 60} className="rounded-3xl border border-[#0f2a4a]/8 p-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: MIST }}><I className="h-6 w-6" style={{ color: SKY }} /></div>
              <div className="mt-3 text-lg font-semibold">{t}</div>
              <p className="mt-1 text-[14px] font-light leading-relaxed text-[#0f2a4a]/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal className="grid overflow-hidden rounded-[32px] text-white md:grid-cols-2" style={{ background: NAVY }}>
          <div className="p-6 sm:p-10">
            <h2 className="text-3xl font-semibold tracking-tight">Visitanos</h2>
            <div className="mt-5 space-y-4 text-[15px]">
              <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-[#8cb8ff]" /><div>Calle 14 N° 4410, Berazategui<div className="text-sm text-white/55">Frente al Banco Provincia</div></div></div>
              <div className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-[#8cb8ff]" /><div>Lunes a viernes 9:00 – 19:30<br />Sábados 9:00 – 13:30</div></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-[#8cb8ff]" /><div>(011) 4256-0000</div></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <ContactWA />
              <button onClick={() => toast('En la web real inicia la llamada')} className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm font-semibold"><Phone className="h-4 w-4" /> Llamar</button>
            </div>
          </div>
          <div className="relative min-h-56 bg-[#16365d]">
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              {[40, 110, 180, 250].map((y) => <path key={y} d={`M0 ${y} L400 ${y - 20}`} stroke="#ffffff14" strokeWidth="10" />)}
              {[60, 170, 290].map((x) => <path key={x} d={`M${x} 0 L${x + 30} 300`} stroke="#ffffff14" strokeWidth="10" />)}
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="relative mx-auto flex h-14 w-14"><span className="absolute inset-0 animate-ping rounded-full bg-[#2f7cf6]/40" /><span className="relative grid h-14 w-14 place-items-center rounded-full" style={{ background: SKY }}><Eye className="h-6 w-6" /></span></span>
              <button onClick={() => toast('En la web real abre Google Maps')} className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-semibold" style={{ color: NAVY }}>Cómo llegar</button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="px-5 py-12 text-center text-[13px] text-[#0f2a4a]/50">Visión Óptica · Óptico técnico responsable: Lic. M. Fernández, Mat. 0000 · @visionoptica.bera</footer>

      <div className="fixed bottom-4 right-4 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button onClick={() => setTurno({ open: true })} className="flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-xl shadow-[#2f7cf6]/30" style={{ background: SKY }}><CalendarCheck className="h-4 w-4" /> Turno</button>
      </div>

      <FrameSheet f={frame} onClose={() => setFrame(null)} wished={!!frame && wish.includes(frame.id)} onWish={() => frame && toggleWish(frame.id)} onTry={() => { setFrame(null); setTurno({ open: true, reason: 'Retiro / adaptación' }) }} />
      <WishSheet open={wishOpen} onClose={() => setWishOpen(false)} ids={wish} onRemove={toggleWish} onBook={() => { setWishOpen(false); setTurno({ open: true, reason: 'Retiro / adaptación' }) }} />
      <TurnoSheet open={turno.open} reason={turno.reason} onClose={() => setTurno({ open: false })} wish={wish} />
    </DemoShell>
  )
}

function ContactWA() {
  const [o, setO] = useState(false)
  return (
    <>
      <button onClick={() => setO(true)} className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 text-sm font-semibold"><MessageCircle className="h-4 w-4" /> WhatsApp</button>
      <WhatsAppSim open={o} onClose={() => setO(false)} business={BIZ} message="¡Hola! Quería saber si trabajan con mi obra social y cuánto sale un par de lentes multifocales." />
    </>
  )
}

function FrameSheet({ f, onClose, wished, onWish, onTry }: { f: Frame | null; onClose: () => void; wished: boolean; onWish: () => void; onTry: () => void }) {
  const [color, setColor] = useState(0)
  const [lens, setLens] = useState(0)
  const [last, setLast] = useState<string | null>(null)
  if (f && f.id !== last) { setLast(f.id); setColor(0); setLens(0) }
  if (!f) return null
  const LENSES = f.kind === 'Sol' ? [{ n: 'Sin graduación', p: 0 }, { n: 'Graduado monofocal', p: 48000 }] : [{ n: 'Monofocal antirreflejo', p: 42000 }, { n: 'Filtro luz azul', p: 56000 }, { n: 'Multifocal', p: 145000 }]
  return (
    <Sheet open onClose={onClose} side="right" className="bg-white" label={f.name}>
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Outfit, sans-serif', color: NAVY }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative bg-[#f6f9fd]">
            <SmartImg src={img(f.img, 900, 720)} alt={`Anteojos ${f.name}`} fallback={`linear-gradient(160deg,${MIST},#bcd3f5)`} className="aspect-[5/4]" eager />
            <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Cerrar"><X className="h-5 w-5" /></button>
          </div>
          <div className="p-5">
            <div className="text-[12px] font-medium uppercase tracking-widest text-[#0f2a4a]/45">{f.brand} · {f.kind}</div>
            <h3 className="text-3xl font-semibold">{f.name}</h3>
            <div className="mt-1 text-xl">{money(f.price)} <span className="text-sm text-[#0f2a4a]/50">armazón</span></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[13px]">
              {[['Estilo', f.style], ['Material', f.material], ['Protección', f.kind === 'Sol' ? (f.polar ? 'UV400 polar.' : 'UV400') : 'Según cristal']].map(([a, b]) => <div key={a} className="rounded-2xl bg-[#f6f9fd] p-2.5"><div className="text-[11px] text-[#0f2a4a]/50">{a}</div><div className="font-medium">{b}</div></div>)}
            </div>
            <div className="mt-5 text-sm font-medium">Color: <span className="font-normal">{f.colors[color].n}</span></div>
            <div className="mt-2 flex gap-2">{f.colors.map((c, i) => <button key={c.n} onClick={() => setColor(i)} aria-label={c.n} className={cx('h-9 w-9 rounded-full ring-offset-2 transition', color === i ? 'ring-2 ring-[#2f7cf6]' : 'ring-1 ring-black/10')} style={{ background: c.hex }} />)}</div>
            <div className="mt-5 text-sm font-medium">Cristales (estimado)</div>
            <div className="mt-2 space-y-2">
              {LENSES.map((l, i) => <button key={l.n} onClick={() => setLens(i)} className={cx('flex w-full items-center justify-between rounded-2xl border p-3.5 text-left text-sm transition', lens === i ? 'border-[#2f7cf6] bg-[#eef4fb]' : 'border-[#0f2a4a]/10')}><span className="flex items-center gap-2">{lens === i && <Check className="h-4 w-4" style={{ color: SKY }} />}{l.n}</span><span>{l.p ? `+${money(l.p)}` : 'Incluido'}</span></button>)}
            </div>
            <div className="mt-4 flex justify-between rounded-2xl p-4" style={{ background: MIST }}><span>Total estimado</span><b>{money(f.price + LENSES[lens].p)}</b></div>
            <p className="mt-2 text-[12px] text-[#0f2a4a]/50">Con tu obra social puede haber cobertura parcial. Te lo confirmamos en el local.</p>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-2 border-t border-[#0f2a4a]/8 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <button onClick={onWish} className="grid h-12 w-12 place-items-center rounded-full border border-[#0f2a4a]/15" aria-label="Guardar"><Heart className={cx('h-5 w-5', wished && 'fill-current')} style={wished ? { color: SKY } : undefined} /></button>
          <button onClick={onTry} className="h-12 rounded-full font-semibold text-white" style={{ background: NAVY }}>Reservar para probar en el local</button>
        </div>
      </div>
    </Sheet>
  )
}

function WishSheet({ open, onClose, ids, onRemove, onBook }: { open: boolean; onClose: () => void; ids: string[]; onRemove: (id: string) => void; onBook: () => void }) {
  const items = FRAMES.filter((f) => ids.includes(f.id))
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-white" label="Mi selección">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Outfit, sans-serif', color: NAVY }}>
        <div className="flex items-center justify-between p-5"><div><div className="text-2xl font-semibold">Mi selección</div><div className="text-sm text-[#0f2a4a]/55">Te los tenemos listos para probar</div></div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><Heart className="mx-auto h-10 w-10 text-[#0f2a4a]/20" /><p className="mt-3 font-semibold">Todavía no guardaste modelos</p><p className="text-sm text-[#0f2a4a]/55">Tocá el corazón en los que te gusten.</p></div></div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5">
              {items.map((f) => (
                <li key={f.id} className="flex items-center gap-3 rounded-2xl bg-[#f6f9fd] p-2.5">
                  <SmartImg src={img(f.img, 200, 160)} alt={f.name} fallback={`linear-gradient(160deg,${MIST},#bcd3f5)`} className="h-16 w-20 shrink-0 rounded-xl" />
                  <div className="flex-1"><div className="font-semibold">{f.name}</div><div className="text-[13px] text-[#0f2a4a]/55">{f.brand} · {money(f.price)}</div></div>
                  <button onClick={() => onRemove(f.id)} className="p-2" aria-label="Quitar"><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            <div className="p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <button onClick={onBook} className="w-full rounded-full py-4 font-semibold text-white" style={{ background: SKY }}>Reservar turno para probarlos</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

function TurnoSheet({ open, reason, onClose, wish }: { open: boolean; reason?: string; onClose: () => void; wish: string[] }) {
  const days = useMemo(() => nextDays(12, [0]), [])
  const [r, setR] = useState(REASONS[0])
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [os, setOs] = useState('Particular')
  const [done, setDone] = useState(false)
  const [was, setWas] = useState(false)
  if (open && !was) { setWas(true); setR(reason ?? REASONS[0]); setDay(days.find((d, i) => i > 0 && !d.closed)!.key); setTime(''); setDone(false) }
  if (!open && was) setWas(false)
  const dObj = days.find((d) => d.key === day)
  const isSat = dObj?.date.getDay() === 6
  const slots = day ? slotsFor(day, 9, isSat ? 13 : 19, 30, 7) : []
  const ok = time && name.trim().length > 1 && phone.replace(/\D/g, '').length >= 8
  return (
    <Sheet open={open} onClose={onClose} className="bg-white" label="Pedir turno">
      <div className="flex max-h-[92dvh] min-h-0 flex-col" style={{ fontFamily: 'Outfit, sans-serif', color: NAVY }}>
        <div className="flex items-center justify-between px-5 pt-5"><div className="text-2xl font-semibold">{done ? 'Turno solicitado' : 'Pedí tu turno'}</div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#eef4fb]" aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
        {done ? (
          <div className="overflow-y-auto p-5 text-center">
            <div className="animate-pop mx-auto mt-2 grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: SKY }}><Check className="h-8 w-8" /></div>
            <p className="mt-3 text-[15px] text-[#0f2a4a]/70">¡Listo, {name.split(' ')[0]}! Te confirmamos por WhatsApp.</p>
            <div className="mt-5 space-y-2 rounded-3xl p-5 text-left text-[15px]" style={{ background: MIST }}>
              <div className="flex justify-between gap-3"><span className="text-[#0f2a4a]/55">Motivo</span><b className="text-right">{r}</b></div>
              <div className="flex justify-between gap-3"><span className="text-[#0f2a4a]/55">Fecha</span><b className="text-right">{dObj && longDate(dObj.date)}</b></div>
              <div className="flex justify-between gap-3"><span className="text-[#0f2a4a]/55">Hora</span><b>{time} h</b></div>
              <div className="flex justify-between gap-3"><span className="text-[#0f2a4a]/55">Cobertura</span><b>{os}</b></div>
              {wish.length > 0 && r === 'Retiro / adaptación' && <div className="flex justify-between gap-3"><span className="text-[#0f2a4a]/55">Para probar</span><b className="text-right">{FRAMES.filter((f) => wish.includes(f.id)).map((f) => f.name).join(', ')}</b></div>}
            </div>
            {r === 'Control visual' && <p className="mt-3 text-[13px] text-[#0f2a4a]/55">Si usás anteojos, traelos al control.</p>}
            <button onClick={onClose} className="mt-5 w-full rounded-full py-4 font-semibold text-white" style={{ background: NAVY }}>Listo</button>
            <p className="mt-2 text-[12px] text-[#0f2a4a]/45">Demostración: no se generó un turno real.</p>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
              <div>
                <div className="mb-2 text-sm font-medium">Motivo</div>
                <div className="grid grid-cols-2 gap-2">{REASONS.map((x) => <button key={x} onClick={() => setR(x)} className={cx('rounded-2xl border p-3 text-left text-sm transition', r === x ? 'border-[#2f7cf6] bg-[#eef4fb] font-medium' : 'border-[#0f2a4a]/10')}>{x}</button>)}</div>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Día</div>
                <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
                  {days.map((d) => <button key={d.key} disabled={d.closed} onClick={() => { setDay(d.key); setTime('') }} className={cx('flex w-[60px] shrink-0 flex-col items-center rounded-2xl py-2.5 transition disabled:opacity-30', day === d.key ? 'text-white' : 'bg-[#f6f9fd]')} style={day === d.key ? { background: SKY } : undefined}><span className="text-[11px]">{d.dow}</span><span className="text-xl font-semibold">{d.num}</span><span className="text-[10px]">{d.closed ? 'cerrado' : d.month}</span></button>)}
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm font-medium"><span>Horario</span><span className="font-normal text-[#0f2a4a]/50">{slots.filter((s) => !s.taken).length} disponibles</span></div>
                <div className="grid grid-cols-4 gap-2">{slots.map((s) => <button key={s.time} disabled={s.taken} onClick={() => setTime(s.time)} className={cx('rounded-xl py-2.5 text-sm font-medium transition disabled:text-[#0f2a4a]/20 disabled:line-through', time === s.time ? 'text-white' : 'bg-[#f6f9fd]')} style={time === s.time ? { background: SKY } : undefined}>{s.time}</button>)}</div>
              </div>
              <div className="space-y-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" className="w-full rounded-2xl bg-[#f6f9fd] px-4 py-3.5 outline-none ring-1 ring-transparent focus:ring-[#2f7cf6]" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Celular" inputMode="tel" className="w-full rounded-2xl bg-[#f6f9fd] px-4 py-3.5 outline-none ring-1 ring-transparent focus:ring-[#2f7cf6]" />
                <select value={os} onChange={(e) => setOs(e.target.value)} className="w-full rounded-2xl bg-[#f6f9fd] px-4 py-3.5 outline-none" aria-label="Obra social">
                  {['Particular', 'OSDE', 'Swiss Medical', 'IOMA', 'PAMI', 'Galeno', 'Otra'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div className="border-t border-[#0f2a4a]/8 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <button disabled={!ok} onClick={() => setDone(true)} className="w-full rounded-full py-4 font-semibold text-white transition disabled:opacity-35" style={{ background: SKY }}>{!time ? 'Elegí un horario' : !ok ? 'Completá tus datos' : 'Solicitar turno'}</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
