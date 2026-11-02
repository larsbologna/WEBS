import { useMemo, useRef, useState, type PointerEvent } from 'react'
import { Check, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Star, X, Heart, Calendar as CalIcon, MessageCircle } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { slotsFor, longDate } from '../../shared/booking'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Studio Bella'
const ROSE = '#b97a72'
type Cat = 'Cortes' | 'Coloración' | 'Tratamientos' | 'Peinados'
const SERVICES: { id: string; cat: Cat; name: string; desc: string; from: number; min: number; pop?: boolean }[] = [
  { id: 'c1', cat: 'Cortes', name: 'Corte y brushing', desc: 'Diagnóstico, lavado con masaje, corte y brushing.', from: 16000, min: 60, pop: true },
  { id: 'c2', cat: 'Cortes', name: 'Corte bob / pixie', desc: 'Cortes cortos con técnica de precisión.', from: 18000, min: 60 },
  { id: 'c3', cat: 'Cortes', name: 'Despunte', desc: 'Mantenimiento de largos y puntas.', from: 9500, min: 30 },
  { id: 'k1', cat: 'Coloración', name: 'Balayage', desc: 'Iluminación a mano alzada, efecto natural y degradado.', from: 75000, min: 210, pop: true },
  { id: 'k2', cat: 'Coloración', name: 'Color completo', desc: 'Tintura de raíz a puntas con coloración sin amoníaco.', from: 38000, min: 120 },
  { id: 'k3', cat: 'Coloración', name: 'Retoque de raíz', desc: 'Hasta 3 cm de crecimiento.', from: 26000, min: 90 },
  { id: 'k4', cat: 'Coloración', name: 'Baño de color / matiz', desc: 'Neutraliza tonos y aporta brillo.', from: 19000, min: 45 },
  { id: 't1', cat: 'Tratamientos', name: 'Alisado con keratina', desc: 'Sin formol. Reduce frizz hasta 4 meses.', from: 62000, min: 180, pop: true },
  { id: 't2', cat: 'Tratamientos', name: 'Botox capilar', desc: 'Reconstrucción profunda para cabellos dañados.', from: 34000, min: 90 },
  { id: 't3', cat: 'Tratamientos', name: 'Nutrición intensiva', desc: 'Ampolla, máscara y sellado con vapor.', from: 15000, min: 40 },
  { id: 'p1', cat: 'Peinados', name: 'Peinado de fiesta', desc: 'Recogidos, semi recogidos y ondas.', from: 28000, min: 75 },
  { id: 'p2', cat: 'Peinados', name: 'Ondas al agua', desc: 'Ondas definidas con planchita o buclera.', from: 14000, min: 45 },
  { id: 'p3', cat: 'Peinados', name: 'Novias', desc: 'Prueba previa + peinado del día.', from: 120000, min: 150 },
]

const TEAM = [
  { id: 'e1', name: 'Belén Ortiz', role: 'Directora · Colorista', img: '1494790108377-be9c29b29330', years: 14, tags: ['Balayage', 'Rubios'] },
  { id: 'e2', name: 'Carla Méndez', role: 'Estilista · Cortes', img: '1438761681033-6461ffad8d80', years: 9, tags: ['Bob', 'Pixie'] },
  { id: 'e3', name: 'Romina Sosa', role: 'Tratamientos', img: '1544005313-94ddf0286df2', years: 7, tags: ['Keratina', 'Botox'] },
  { id: 'e4', name: 'Juli Paz', role: 'Peinados y novias', img: '1534528741775-53994a69daeb', years: 6, tags: ['Novias', 'Fiesta'] },
]

const CASES = [
  { id: '1519699047748-de8e457a634e', t: 'Balayage miel', d: 'De castaño plano a iluminado natural · 3 h 30' },
  { id: '1492106087820-71f1a00d2b11', t: 'Alisado con keratina', d: 'Frizz controlado por 4 meses · 3 h' },
  { id: '1487412720507-e7ab37603c6f', t: 'Corte + nutrición', d: 'Largos recuperados con brillo · 1 h 40' },
]

export default function Peluqueria() {
  const [cat, setCat] = useState<Cat>('Cortes')
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [stylist, setStylist] = useState<string | null>(null)
  const [caseI, setCaseI] = useState(0)

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const sel = SERVICES.filter((s) => selected.includes(s.id))
  const total = sel.reduce((t, s) => t + s.from, 0)

  return (
    <DemoShell slug="peluqueria" fonts="family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600" themeColor="#f6ebe7"
      className="pb-28" style={{ background: '#f6ebe7', color: '#4a2f35', fontFamily: 'Jost, sans-serif', ['--fd' as string]: '"Cormorant Garamond", Georgia, serif' }}>
      <header className="sticky top-0 z-40 border-b border-[#4a2f35]/10 bg-[#f6ebe7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="font-(family-name:--fd) text-[26px] font-semibold leading-none tracking-wide">Studio <i className="font-medium" style={{ color: ROSE }}>Bella</i></div>
          <button onClick={() => setOpen(true)} className="rounded-full px-5 py-2.5 text-[13px] font-medium uppercase tracking-[.15em] text-white" style={{ background: ROSE }}>Reservar</button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-6 pt-6 md:grid-cols-2 md:items-center md:pt-12">
        <div>
          <div className="animate-fade-up flex items-center gap-2 text-[12px] font-medium uppercase tracking-[.3em]" style={{ color: ROSE }}><Sparkles className="h-4 w-4" /> Salón de belleza · Berazategui</div>
          <h1 className="animate-fade-up mt-4 font-(family-name:--fd) text-[54px] font-semibold leading-[.95] sm:text-[80px]" style={{ animationDelay: '80ms' }}>
            Tu pelo,<br /><i className="font-medium" style={{ color: ROSE }}>en las mejores manos.</i>
          </h1>
          <p className="animate-fade-up mt-5 max-w-md text-[16px] font-light leading-relaxed text-[#4a2f35]/75" style={{ animationDelay: '160ms' }}>
            Coloración, cortes y tratamientos con productos profesionales. Elegí tus servicios, tu estilista y reservá tu turno online cuando quieras.
          </p>
          <div className="animate-fade-up mt-7 flex flex-wrap items-center gap-4" style={{ animationDelay: '240ms' }}>
            <button onClick={() => setOpen(true)} className="rounded-full px-7 py-4 text-[14px] font-medium uppercase tracking-[.15em] text-white shadow-lg shadow-[#b97a72]/30 transition active:scale-95" style={{ background: ROSE }}>Reservar turno</button>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">{TEAM.slice(0, 3).map((t) => <SmartImg key={t.id} src={img(t.img, 80, 80)} alt={t.name} fallback="linear-gradient(135deg,#e7c6bf,#b97a72)" className="h-8 w-8 rounded-full ring-2 ring-[#f6ebe7]" />)}</div>
              <span><b>4,9</b> ★ · 620 reseñas</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <SmartImg eager src={img('1560066984-138dadb4c035', 1000, 1200)} alt="Salón Studio Bella" fallback="linear-gradient(160deg,#e7c6bf,#8d5a55)" className="aspect-[5/6] rounded-[200px_200px_24px_24px]" />
          <div className="absolute -left-2 bottom-8 rounded-2xl bg-white/90 p-3 pr-5 shadow-xl backdrop-blur sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: ROSE }}><CalIcon className="h-5 w-5" /></div>
              <div><div className="text-[11px] uppercase tracking-widest text-[#4a2f35]/50">Próximo libre</div><div className="font-semibold">Mañana · 10:30</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-16">
        <Reveal className="text-center">
          <div className="text-[12px] font-medium uppercase tracking-[.3em]" style={{ color: ROSE }}>Servicios y precios</div>
          <h2 className="mt-2 font-(family-name:--fd) text-5xl font-semibold">¿Qué te hacemos hoy?</h2>
        </Reveal>
        <Tip className="mt-4">la clienta arma su combinación de servicios y ve duración y precio antes de reservar. Menos consultas repetidas por WhatsApp.</Tip>
        <div className="no-scrollbar -mx-5 mt-6 flex justify-start gap-6 overflow-x-auto border-b border-[#4a2f35]/10 px-5 sm:justify-center">
          {(['Cortes', 'Coloración', 'Tratamientos', 'Peinados'] as Cat[]).map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cx('relative shrink-0 pb-3 text-[15px] transition', cat === c ? 'font-medium' : 'text-[#4a2f35]/50')}>
              {c}
              {cat === c && <span className="absolute inset-x-0 -bottom-px h-0.5" style={{ background: ROSE }} />}
            </button>
          ))}
        </div>
        <div key={cat} className="mx-auto mt-4 grid max-w-4xl gap-3 md:grid-cols-2">
          {SERVICES.filter((s) => s.cat === cat).map((s, i) => {
            const on = selected.includes(s.id)
            return (
              <button key={s.id} onClick={() => toggle(s.id)} className={cx('animate-fade-up flex items-start gap-4 rounded-3xl p-5 text-left transition', on ? 'bg-white shadow-lg shadow-[#b97a72]/15 ring-1 ring-[#b97a72]' : 'bg-white/50 ring-1 ring-transparent')} style={{ animationDelay: `${i * 60}ms` }}>
                <span className={cx('mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition', on ? 'border-transparent text-white' : 'border-[#4a2f35]/25')} style={on ? { background: ROSE } : undefined}>{on && <Check className="h-3.5 w-3.5" />}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><span className="font-(family-name:--fd) text-[22px] font-semibold leading-tight">{s.name}</span>{s.pop && <Heart className="h-4 w-4 fill-current" style={{ color: ROSE }} />}</div>
                  <p className="mt-1 text-[14px] font-light text-[#4a2f35]/70">{s.desc}</p>
                  <div className="mt-2 flex items-center gap-4 text-[13px]">
                    <span className="flex items-center gap-1 text-[#4a2f35]/55"><Clock className="h-3.5 w-3.5" /> {s.min >= 60 ? `${Math.floor(s.min / 60)} h${s.min % 60 ? ` ${s.min % 60}′` : ''}` : `${s.min}′`}</span>
                    <span>desde <b className="text-[15px]">{money(s.from)}</b></span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ANTES / DESPUÉS */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <Reveal className="text-center">
          <div className="text-[12px] font-medium uppercase tracking-[.3em]" style={{ color: ROSE }}>Resultados reales</div>
          <h2 className="mt-2 font-(family-name:--fd) text-5xl font-semibold">Antes <i className="font-medium" style={{ color: ROSE }}>&</i> después</h2>
          <p className="mt-2 text-[14px] font-light text-[#4a2f35]/60">Deslizá la línea para comparar</p>
        </Reveal>
        <div className="mx-auto mt-6 max-w-xl">
          <BeforeAfter key={caseI} src={img(CASES[caseI].id, 900, 1100)} alt={CASES[caseI].t} />
          <div className="mt-4 text-center">
            <div className="font-(family-name:--fd) text-2xl font-semibold">{CASES[caseI].t}</div>
            <div className="text-[14px] font-light text-[#4a2f35]/60">{CASES[caseI].d}</div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {CASES.map((c, i) => (
              <button key={c.id} onClick={() => setCaseI(i)} className={cx('overflow-hidden rounded-2xl ring-2 transition', caseI === i ? 'ring-[#b97a72]' : 'opacity-60 ring-transparent')} aria-label={c.t}>
                <SmartImg src={img(c.id, 160, 160)} alt={c.t} fallback="linear-gradient(135deg,#e7c6bf,#8d5a55)" className="h-16 w-16" />
              </button>
            ))}
          </div>
        </div>
        <Tip className="mt-6">el antes y después es lo que más convence: la clienta ve tu trabajo y se imagina el resultado en ella.</Tip>
      </section>

      {/* EQUIPO */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <Reveal className="text-center">
          <div className="text-[12px] font-medium uppercase tracking-[.3em]" style={{ color: ROSE }}>Equipo</div>
          <h2 className="mt-2 font-(family-name:--fd) text-5xl font-semibold">Conocé a las chicas</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {TEAM.map((t, i) => (
            <Reveal key={t.id} delay={i * 70} className="text-center">
              <SmartImg src={img(t.img, 500, 640)} alt={t.name} fallback="linear-gradient(160deg,#e7c6bf,#8d5a55)" className="aspect-[4/5] rounded-t-[999px] rounded-b-3xl" />
              <div className="mt-3 font-(family-name:--fd) text-xl font-semibold leading-tight">{t.name}</div>
              <div className="text-[13px] text-[#4a2f35]/60">{t.role} · {t.years} años</div>
              <div className="mt-2 flex flex-wrap justify-center gap-1">{t.tags.map((g) => <span key={g} className="rounded-full bg-white/70 px-2 py-0.5 text-[11px]">{g}</span>)}</div>
              <button onClick={() => { setStylist(t.id); setOpen(true) }} className="mt-3 text-[13px] font-medium uppercase tracking-[.15em] underline underline-offset-4" style={{ color: ROSE }}>Reservar con ella</button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIO + INFO */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <Reveal className="rounded-[36px] p-8 text-center text-white sm:p-12" style={{ background: 'linear-gradient(135deg,#b97a72,#8d5a55)' }}>
          <div className="flex justify-center gap-1">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-white" />)}</div>
          <p className="mx-auto mt-4 max-w-2xl font-(family-name:--fd) text-[26px] italic leading-snug sm:text-3xl">“Reservé el balayage desde la web un domingo a la noche. Belén entendió exactamente lo que quería. ¡Salí renovada!”</p>
          <div className="mt-4 text-[13px] uppercase tracking-[.2em] text-white/75">Agustina L.</div>
        </Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Info icon={MapPin} t="Dónde estamos" d="Calle 150 N° 1290, Berazategui. Planta baja, timbre B." />
          <Info icon={Clock} t="Horarios" d="Martes a sábados de 9:30 a 20:00. Novias: domingos con cita previa." />
          <div className="rounded-3xl bg-white/60 p-6">
            <MessageCircle className="h-6 w-6" style={{ color: ROSE }} />
            <div className="mt-3 font-(family-name:--fd) text-2xl font-semibold">¿Dudas?</div>
            <p className="mt-1 text-[14px] font-light">Mandanos una foto de tu pelo y te asesoramos.</p>
            <ConsultBtn />
          </div>
        </div>
      </section>

      <footer className="px-5 py-14 text-center">
        <div className="font-(family-name:--fd) text-3xl font-semibold">Studio <i style={{ color: ROSE }}>Bella</i></div>
        <div className="mt-1 text-sm text-[#4a2f35]/50">@studiobella.bera</div>
      </footer>

      {/* Barra selección */}
      {sel.length > 0 && !open && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full py-2 pl-5 pr-2 text-white shadow-2xl shadow-[#b97a72]/40" style={{ background: '#4a2f35' }}>
            <span className="text-left text-[13px] leading-tight"><b className="text-[15px]">{sel.length} servicio{sel.length > 1 ? 's' : ''}</b><br />desde {money(total)}</span>
            <span className="rounded-full px-5 py-2.5 text-[13px] font-medium uppercase tracking-[.12em]" style={{ background: ROSE }}>Reservar</span>
          </button>
        </div>
      )}

      <Booking open={open} onClose={() => setOpen(false)} selected={selected} setSelected={setSelected} stylist={stylist} setStylist={setStylist} />
    </DemoShell>
  )
}

function ConsultBtn() {
  const [wa, setWa] = useState(false)
  return (
    <>
      <button onClick={() => setWa(true)} className="mt-4 w-full rounded-full bg-[#25d366] py-3 text-sm font-medium text-white">Consultar por WhatsApp</button>
      <WhatsAppSim open={wa} onClose={() => setWa(false)} business={BIZ} message="¡Hola Studio Bella! Quería consultar por un balayage. Tengo el pelo castaño oscuro, largo hasta la cintura. ¿Cuánto saldría aproximadamente?" />
    </>
  )
}

const Info = ({ icon: I, t, d }: { icon: typeof MapPin; t: string; d: string }) => (
  <div className="rounded-3xl bg-white/60 p-6"><I className="h-6 w-6" style={{ color: ROSE }} /><div className="mt-3 font-(family-name:--fd) text-2xl font-semibold">{t}</div><p className="mt-1 text-[14px] font-light leading-relaxed">{d}</p></div>
)

/* ─────────── Comparador antes/después ─────────── */
function BeforeAfter({ src, alt }: { src: string; alt: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    setPos(Math.max(3, Math.min(97, ((e.clientX - r.left) / r.width) * 100)))
  }
  return (
    <div ref={ref} className="relative aspect-[4/5] touch-none select-none overflow-hidden rounded-[32px]"
      onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e) }}
      onPointerMove={(e) => e.buttons && move(e)}>
      <SmartImg src={src} alt={`${alt} — después`} fallback="linear-gradient(160deg,#e7c6bf,#8d5a55)" className="absolute inset-0 h-full w-full" eager />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImg src={src} alt={`${alt} — antes`} fallback="linear-gradient(160deg,#9b8f8c,#5c5250)" className="absolute inset-0 h-full w-full" style={{ filter: 'saturate(.25) brightness(.82) contrast(.85) blur(.4px)' }} eager />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[12px] uppercase tracking-widest text-white backdrop-blur">Antes</span>
      <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[12px] uppercase tracking-widest text-[#4a2f35] backdrop-blur">Después</span>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#4a2f35] shadow-xl">
          <ChevronLeft className="-mr-1 h-4 w-4" /><ChevronRight className="-ml-1 h-4 w-4" />
        </div>
      </div>
      <input type="range" min={3} max={97} value={pos} onChange={(e) => setPos(+e.target.value)} className="absolute inset-x-0 bottom-0 opacity-0" aria-label="Comparar antes y después" />
    </div>
  )
}

/* ─────────── Reserva con calendario mensual ─────────── */
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
function Booking({ open, onClose, selected, setSelected, stylist, setStylist }: {
  open: boolean; onClose: () => void; selected: string[]; setSelected: (f: (s: string[]) => string[]) => void; stylist: string | null; setStylist: (s: string | null) => void
}) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }, [])
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const sel = SERVICES.filter((s) => selected.includes(s.id))
  const total = sel.reduce((t, s) => t + s.from, 0)
  const mins = sel.reduce((t, s) => t + s.min, 0)
  const st = TEAM.find((t) => t.id === stylist)

  const first = (month.getDay() + 6) % 7
  const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: first + daysIn }, (_, i) => (i < first ? null : new Date(month.getFullYear(), month.getMonth(), i - first + 1)))
  const closed = (d: Date) => d < today || d.getDay() === 0 || d.getDay() === 1 || d.getTime() - today.getTime() > 60 * 864e5
  const key = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''
  const slots = key ? slotsFor(key, 9, 20, 30, (TEAM.findIndex((t) => t.id === stylist) + 2) * 3) : []
  const ready = sel.length > 0 && date && time && name.trim().length > 1 && phone.replace(/\D/g, '').length >= 8
  const close = () => { onClose(); if (done) { setDone(false); setSelected(() => []); setDate(null); setTime('') } }

  return (
    <Sheet open={open} onClose={close} side="right" className="bg-[#f6ebe7]" label="Reservar turno">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Jost, sans-serif', color: '#4a2f35' }}>
        <div className="flex items-center justify-between border-b border-[#4a2f35]/10 px-5 py-4">
          <div className="font-(family-name:--fd) text-3xl font-semibold">{done ? '¡Te esperamos!' : 'Reservá tu turno'}</div>
          <button onClick={close} className="grid h-10 w-10 place-items-center rounded-full bg-white/70" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        {done ? (
          <div className="flex-1 overflow-y-auto p-6 text-center">
            <div className="animate-pop mx-auto grid h-20 w-20 place-items-center rounded-full text-white" style={{ background: ROSE }}><Check className="h-10 w-10" /></div>
            <p className="mt-4 text-[15px] font-light">{name.split(' ')[0]}, tu turno quedó reservado. Te mandamos la confirmación por WhatsApp.</p>
            <div className="mt-6 rounded-3xl bg-white p-5 text-left text-[14px] shadow-sm">
              <div className="font-(family-name:--fd) text-2xl font-semibold">{date && longDate(date)}</div>
              <div className="mt-1" style={{ color: ROSE }}>{time} h · {Math.floor(mins / 60)} h {mins % 60 ? `${mins % 60} min` : ''}</div>
              <ul className="mt-4 space-y-1 border-t border-[#4a2f35]/10 pt-4">{sel.map((s) => <li key={s.id} className="flex justify-between"><span>{s.name}</span><span>{money(s.from)}</span></li>)}</ul>
              <div className="mt-3 flex justify-between border-t border-[#4a2f35]/10 pt-3"><span>Con</span><b>{st?.name ?? 'Quien esté disponible'}</b></div>
              <div className="mt-1 flex justify-between"><span>Total estimado</span><b>{money(total)}</b></div>
            </div>
            <button onClick={() => toast('En la web real se agrega a tu calendario')} className="mt-4 w-full rounded-full border border-[#4a2f35]/20 py-3 text-sm">Agregar a mi calendario</button>
            <button onClick={close} className="mt-2 w-full rounded-full py-3.5 text-sm font-medium uppercase tracking-[.15em] text-white" style={{ background: ROSE }}>Listo</button>
            <p className="mt-3 text-[12px] text-[#4a2f35]/45">Demostración: no se generó una reserva real.</p>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-7 overflow-y-auto p-5">
              <Step n={1} t="Servicios">
                {sel.length === 0 && <p className="mb-2 text-[13px] text-[#4a2f35]/55">Elegí al menos uno:</p>}
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => {
                    const on = selected.includes(s.id)
                    return <button key={s.id} onClick={() => setSelected((x) => (on ? x.filter((y) => y !== s.id) : [...x, s.id]))} className={cx('rounded-full px-3.5 py-2 text-[13px] ring-1 transition', on ? 'text-white ring-transparent' : 'bg-white/60 ring-[#4a2f35]/10')} style={on ? { background: ROSE } : undefined}>{on && '✓ '}{s.name}</button>
                  })}
                </div>
              </Step>
              <Step n={2} t="Estilista">
                <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
                  <button onClick={() => setStylist(null)} className={cx('flex w-20 shrink-0 flex-col items-center gap-1.5 text-center text-[12px]', !stylist ? 'font-semibold' : 'opacity-60')}>
                    <div className={cx('grid h-16 w-16 place-items-center rounded-full bg-white ring-2', !stylist ? 'ring-[#b97a72]' : 'ring-transparent')}><Sparkles className="h-6 w-6" style={{ color: ROSE }} /></div>Sin preferencia
                  </button>
                  {TEAM.map((t) => (
                    <button key={t.id} onClick={() => setStylist(t.id)} className={cx('flex w-20 shrink-0 flex-col items-center gap-1.5 text-center text-[12px] leading-tight', stylist === t.id ? 'font-semibold' : 'opacity-60')}>
                      <SmartImg src={img(t.img, 140, 140)} alt={t.name} fallback="linear-gradient(135deg,#e7c6bf,#b97a72)" className={cx('h-16 w-16 rounded-full ring-2 ring-offset-2 ring-offset-[#f6ebe7]', stylist === t.id ? 'ring-[#b97a72]' : 'ring-transparent')} />
                      {t.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </Step>
              <Step n={3} t="Día">
                <div className="rounded-3xl bg-white p-4">
                  <div className="flex items-center justify-between">
                    <button disabled={month <= new Date(today.getFullYear(), today.getMonth(), 1)} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="grid h-9 w-9 place-items-center rounded-full disabled:opacity-25" aria-label="Mes anterior"><ChevronLeft className="h-5 w-5" /></button>
                    <div className="font-(family-name:--fd) text-xl font-semibold">{MONTHS[month.getMonth()]} {month.getFullYear()}</div>
                    <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="grid h-9 w-9 place-items-center rounded-full" aria-label="Mes siguiente"><ChevronRight className="h-5 w-5" /></button>
                  </div>
                  <div className="mt-2 grid grid-cols-7 text-center text-[11px] uppercase tracking-wider text-[#4a2f35]/45">{['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((d) => <div key={d} className="py-1">{d}</div>)}</div>
                  <div className="grid grid-cols-7 gap-1">
                    {cells.map((d, i) => d ? (
                      <button key={i} disabled={closed(d)} onClick={() => { setDate(d); setTime('') }}
                        className={cx('aspect-square rounded-full text-[14px] transition disabled:text-[#4a2f35]/20', date?.getTime() === d.getTime() ? 'font-semibold text-white' : 'hover:bg-[#f6ebe7]', d.getTime() === today.getTime() && 'underline underline-offset-4')}
                        style={date?.getTime() === d.getTime() ? { background: ROSE } : undefined}>{d.getDate()}</button>
                    ) : <div key={i} />)}
                  </div>
                </div>
              </Step>
              {date && (
                <Step n={4} t="Horario">
                  {(['Mañana', 'Tarde'] as const).map((part) => (
                    <div key={part} className="mb-3">
                      <div className="mb-2 text-[12px] uppercase tracking-widest text-[#4a2f35]/50">{part}</div>
                      <div className="grid grid-cols-4 gap-2">
                        {slots.filter((s) => (part === 'Mañana' ? +s.time.slice(0, 2) < 13 : +s.time.slice(0, 2) >= 13)).map((s) => (
                          <button key={s.time} disabled={s.taken} onClick={() => setTime(s.time)} className={cx('rounded-full py-2 text-[13px] ring-1 transition disabled:bg-transparent disabled:text-[#4a2f35]/20 disabled:ring-[#4a2f35]/5', time === s.time ? 'text-white ring-transparent' : 'bg-white ring-[#4a2f35]/10')} style={time === s.time ? { background: ROSE } : undefined}>{s.time}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </Step>
              )}
              <Step n={date ? 5 : 4} t="Tus datos">
                <div className="space-y-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-transparent focus:ring-[#b97a72]" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp" inputMode="tel" className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-transparent focus:ring-[#b97a72]" />
                </div>
              </Step>
            </div>
            <div className="border-t border-[#4a2f35]/10 bg-white/70 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between text-[14px]"><span>{sel.length} servicio{sel.length !== 1 && 's'}{mins ? ` · ${Math.floor(mins / 60)}h${mins % 60 ? ` ${mins % 60}′` : ''}` : ''}</span><b>desde {money(total)}</b></div>
              <button disabled={!ready} onClick={() => setDone(true)} className="mt-3 w-full rounded-full py-4 text-[14px] font-medium uppercase tracking-[.15em] text-white transition disabled:opacity-35" style={{ background: ROSE }}>
                {!sel.length ? 'Elegí un servicio' : !date ? 'Elegí el día' : !time ? 'Elegí el horario' : !ready ? 'Completá tus datos' : 'Confirmar reserva'}
              </button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
const Step = ({ n, t, children }: { n: number; t: string; children: React.ReactNode }) => (
  <div>
    <div className="mb-3 flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full text-[12px] text-white" style={{ background: '#4a2f35' }}>{n}</span><span className="font-(family-name:--fd) text-xl font-semibold">{t}</span></div>
    {children}
  </div>
)
