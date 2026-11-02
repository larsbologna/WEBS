import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CalendarPlus, Check, ChevronRight, Clock, Crown, MapPin, Scissors, Star, X, BellRing } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { nextDays, slotsFor, longDate } from '../../shared/booking'
import { safeRead, safeWrite } from '../../shared/store'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Aurum Barber Club'
const GOLD = '#c9a45c'

const SERVICES = [
  { id: 's1', name: 'Corte clásico', desc: 'Tijera y máquina, lavado y peinado con producto.', min: 40, price: 12000 },
  { id: 's2', name: 'Fade / degradé', desc: 'Skin, low, mid o high fade con terminación a navaja.', min: 45, price: 13500, top: true },
  { id: 's3', name: 'Barba completa', desc: 'Perfilado, rebaje, toalla caliente y aceite.', min: 30, price: 8500 },
  { id: 's4', name: 'Corte + barba', desc: 'El ritual completo Aurum. Incluye bebida.', min: 70, price: 19000, top: true },
  { id: 's5', name: 'Afeitado a navaja', desc: 'Afeitado tradicional con toallas calientes.', min: 35, price: 10000 },
  { id: 's6', name: 'Platinado / color', desc: 'Decoloración, matiz y tratamiento.', min: 120, price: 38000 },
  { id: 's7', name: 'Corte kids', desc: 'Hasta 12 años.', min: 30, price: 9000 },
  { id: 's8', name: 'Perfilado de cejas', desc: 'Con navaja o pinza.', min: 10, price: 3000 },
]

const BARBERS = [
  { id: 'b1', name: 'Nico', role: 'Fundador · Fades', img: '1500648767791-00dcc994a43e', rating: 4.9, rev: 412, ig: '@nico.aurum', seed: 1 },
  { id: 'b2', name: 'Tomi', role: 'Barba y navaja', img: '1506794778202-cad84cf45f1d', rating: 4.9, rev: 308, ig: '@tomi.blade', seed: 2 },
  { id: 'b3', name: 'Lucas', role: 'Texturizados y color', img: '1519085360753-af0119f7cbe7', rating: 4.8, rev: 251, ig: '@lucas.cuts', seed: 3 },
]

const GALLERY = [
  { id: '1599351431202-1e0f0137899a', tag: 'Fade', t: 'Skin fade + diseño' },
  { id: '1621605815971-fbc98d665033', tag: 'Barba', t: 'Barba perfilada' },
  { id: '1622286342621-4bd786c2447c', tag: 'Clásico', t: 'Pompadour clásico' },
  { id: '1605497788044-5a32c7078486', tag: 'Fade', t: 'Mid fade texturizado' },
  { id: '1585747860715-2ba37e788b70', tag: 'Clásico', t: 'Corte con tijera' },
  { id: '1517832606299-7ae9b720a186', tag: 'Barba', t: 'Afeitado a navaja' },
  { id: '1596728325488-58c87691e9af', tag: 'Texturizado', t: 'Crop texturizado' },
  { id: '1567894340315-735d7c361db0', tag: 'Fade', t: 'Low fade' },
]

type Booking = { services: string[]; barber: string; day: string; time: string; name: string; phone: string }

export default function Barberia() {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState<{ service?: string; barber?: string }>({})
  const [gTag, setGTag] = useState('Todos')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [booking, setBooking] = useState<Booking | null>(() => safeRead('aurum-booking', null))

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const book = (p: { service?: string; barber?: string } = {}) => { setPreset(p); setOpen(true) }
  const gallery = GALLERY.filter((g) => gTag === 'Todos' || g.tag === gTag)

  return (
    <DemoShell slug="barberia" fonts="family=Cinzel:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600" themeColor="#0b0b0b"
      className="pb-24" style={{ background: '#0b0b0b', color: '#ece6da', fontFamily: 'Barlow, sans-serif', ['--fd' as string]: 'Cinzel, serif', ['--fc' as string]: '"Barlow Condensed", sans-serif' }}>
      <header className={cx('fixed inset-x-0 top-0 z-40 transition-colors duration-300', scrolled ? 'border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur' : 'bg-gradient-to-b from-black/80 to-transparent')}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5" style={{ color: GOLD }} />
            <span className="font-(family-name:--fd) text-lg font-bold tracking-[.25em]">AURUM</span>
          </div>
          <button onClick={() => book()} className="rounded-none border px-4 py-2 font-(family-name:--fc) text-[13px] font-semibold uppercase tracking-[.2em] transition hover:bg-[#c9a45c] hover:text-black" style={{ borderColor: GOLD, color: GOLD }}>Reservar</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col">
        <SmartImg eager src={img('1503951914875-452162b0f3f1', 1400, 1800)} alt="Interior de Aurum Barber Club" fallback="linear-gradient(160deg,#2a2418,#0b0b0b)" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/50 to-black/40" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-14 pt-28">
          <div className="animate-fade-up flex items-center gap-3 font-(family-name:--fc) text-[13px] uppercase tracking-[.35em]" style={{ color: GOLD }}>
            <span className="h-px w-10" style={{ background: GOLD }} /> Barbería de autor · Est. 2016
          </div>
          <h1 className="animate-fade-up mt-4 font-(family-name:--fd) text-[52px] font-bold leading-[1] tracking-wide sm:text-8xl" style={{ animationDelay: '80ms' }}>
            El corte<br />es un <span style={{ color: GOLD }}>ritual.</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-md text-[17px] leading-relaxed text-[#ece6da]/75" style={{ animationDelay: '160ms' }}>
            Reservá tu turno online en 30 segundos. Elegí servicio, barbero y horario. Sin mensajes, sin esperas.
          </p>
          <div className="animate-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <button onClick={() => book()} className="flex items-center gap-2 px-7 py-4 font-(family-name:--fc) text-[15px] font-semibold uppercase tracking-[.2em] text-black transition active:scale-95" style={{ background: GOLD }}>
              Reservar turno <ChevronRight className="h-4 w-4" />
            </button>
            <a href="#servicios" className="border border-white/25 px-7 py-4 font-(family-name:--fc) text-[15px] font-semibold uppercase tracking-[.2em]">Ver precios</a>
          </div>
          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-5 text-sm text-[#ece6da]/70">
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-current" style={{ color: GOLD }} /> 4,9 · 970 reseñas</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" style={{ color: GOLD }} /> Mar a sáb 10–21 h</span>
          </div>
        </div>
      </section>

      {/* PRÓXIMO TURNO */}
      {booking && (
        <section className="mx-auto max-w-6xl px-5 pt-8">
          <div className="animate-fade-up flex items-center gap-4 border p-4" style={{ borderColor: `${GOLD}66`, background: `${GOLD}12` }}>
            <BellRing className="h-6 w-6 shrink-0" style={{ color: GOLD }} />
            <div className="min-w-0 flex-1">
              <div className="font-(family-name:--fc) text-[12px] uppercase tracking-[.25em]" style={{ color: GOLD }}>Tu próximo turno</div>
              <div className="truncate font-semibold">{longDate(new Date(booking.day + 'T12:00'))} · {booking.time} h</div>
              <div className="truncate text-sm text-white/60">{BARBERS.find((b) => b.id === booking.barber)?.name ?? 'Cualquier barbero'} · {booking.services.map((s) => SERVICES.find((x) => x.id === s)?.name).join(' + ')}</div>
            </div>
            <button onClick={() => { setBooking(null); safeWrite('aurum-booking', null); toast('Turno cancelado') }} className="shrink-0 text-sm text-white/60 underline">Cancelar</button>
          </div>
        </section>
      )}

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-20">
        <Reveal>
          <div className="font-(family-name:--fc) text-[13px] uppercase tracking-[.35em]" style={{ color: GOLD }}>Servicios</div>
          <h2 className="mt-2 font-(family-name:--fd) text-4xl font-bold sm:text-5xl">Carta de precios</h2>
        </Reveal>
        <Tip dark className="mt-4 !mx-0">precios claros y duración de cada servicio: el cliente llega sabiendo qué se hace y cuánto paga.</Tip>
        <div className="mt-6 grid gap-x-12 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 60}>
              <button onClick={() => book({ service: s.id })} className="group flex w-full items-start gap-4 border-b border-white/10 py-5 text-left">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-(family-name:--fd) text-lg font-semibold tracking-wide">{s.name}</span>
                    {s.top && <span className="px-1.5 py-0.5 font-(family-name:--fc) text-[10px] uppercase tracking-widest text-black" style={{ background: GOLD }}>Top</span>}
                  </div>
                  <p className="mt-1 text-[14px] text-white/55">{s.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[12px] text-white/40"><Clock className="h-3.5 w-3.5" /> {s.min} min</div>
                </div>
                <div className="text-right">
                  <div className="font-(family-name:--fd) text-xl font-semibold" style={{ color: GOLD }}>{money(s.price)}</div>
                  <div className="mt-2 font-(family-name:--fc) text-[12px] uppercase tracking-widest text-white/50 transition group-hover:text-white">Reservar →</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BARBEROS */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <Reveal>
          <div className="font-(family-name:--fc) text-[13px] uppercase tracking-[.35em]" style={{ color: GOLD }}>El equipo</div>
          <h2 className="mt-2 font-(family-name:--fd) text-4xl font-bold sm:text-5xl">Nuestros barberos</h2>
        </Reveal>
        <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {BARBERS.map((b) => (
            <div key={b.id} className="group relative w-[75%] shrink-0 snap-start overflow-hidden md:w-auto">
              <SmartImg src={img(b.img, 600, 800)} alt={`Barbero ${b.name}`} fallback="linear-gradient(160deg,#3a3122,#0b0b0b)" className="aspect-[3/4] grayscale transition duration-700 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-(family-name:--fd) text-3xl font-bold">{b.name}</div>
                <div className="font-(family-name:--fc) text-[13px] uppercase tracking-[.2em]" style={{ color: GOLD }}>{b.role}</div>
                <div className="mt-2 flex items-center gap-3 text-[13px] text-white/70"><span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-current" style={{ color: GOLD }} /> {b.rating} ({b.rev})</span><span>{b.ig}</span></div>
                <button onClick={() => book({ barber: b.id })} className="mt-4 w-full border border-white/30 py-2.5 font-(family-name:--fc) text-[13px] font-semibold uppercase tracking-[.2em] backdrop-blur transition hover:bg-white hover:text-black">Reservar con {b.name}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <Reveal>
          <div className="font-(family-name:--fc) text-[13px] uppercase tracking-[.35em]" style={{ color: GOLD }}>Trabajos</div>
          <h2 className="mt-2 font-(family-name:--fd) text-4xl font-bold sm:text-5xl">Galería de cortes</h2>
        </Reveal>
        <Tip dark className="mt-4 !mx-0">tus mejores trabajos a la vista. El cliente elige el corte mirando fotos y te lo muestra el día del turno.</Tip>
        <div className="no-scrollbar -mx-5 mt-5 flex gap-5 overflow-x-auto px-5 font-(family-name:--fc) text-[14px] uppercase tracking-[.2em]">
          {['Todos', 'Fade', 'Clásico', 'Barba', 'Texturizado'].map((t) => (
            <button key={t} onClick={() => setGTag(t)} className={cx('shrink-0 border-b-2 pb-1.5 transition', gTag === t ? 'text-white' : 'border-transparent text-white/40')} style={gTag === t ? { borderColor: GOLD } : undefined}>{t}</button>
          ))}
        </div>
        <div key={gTag} className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          {gallery.map((g, i) => (
            <button key={g.id} onClick={() => setLightbox(GALLERY.indexOf(g))} className={cx('animate-fade-up group relative overflow-hidden', i % 3 === 0 && 'row-span-2')} style={{ animationDelay: `${i * 50}ms` }}>
              <SmartImg src={img(g.id, 500, i % 3 === 0 ? 900 : 500)} alt={g.t} fallback="linear-gradient(160deg,#3a3122,#0b0b0b)" className={cx('h-full w-full transition duration-700 group-hover:scale-105', i % 3 === 0 ? 'aspect-[1/2] md:aspect-auto' : 'aspect-square')} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-[13px] font-semibold opacity-90">{g.t}</div>
            </button>
          ))}
        </div>
      </section>

      {/* RESEÑA + UBICACIÓN */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <Reveal className="border p-6 text-center sm:p-10" style={{ borderColor: `${GOLD}40` }}>
          <div className="flex justify-center gap-1">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: GOLD }} />)}</div>
          <p className="mx-auto mt-4 max-w-2xl font-(family-name:--fd) text-xl leading-relaxed sm:text-2xl">“Saqué turno a las 11 de la noche desde el celu. Al otro día me atendieron puntual, con un café y el mejor fade que me hicieron.”</p>
          <div className="mt-4 font-(family-name:--fc) text-[13px] uppercase tracking-[.25em] text-white/50">Martín R. · cliente desde 2019</div>
        </Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="bg-white/[.04] p-6">
            <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0" style={{ color: GOLD }} /><div><div className="font-semibold">Calle 12 N° 4870, Berazategui</div><div className="text-sm text-white/50">Centro · a metros de la peatonal</div></div></div>
            <div className="mt-4 flex gap-3"><Clock className="h-5 w-5 shrink-0" style={{ color: GOLD }} /><div className="text-sm leading-relaxed text-white/80">Martes a viernes 10:00 – 21:00<br />Sábados 9:00 – 20:00<br />Domingo y lunes cerrado</div></div>
          </div>
          <div className="flex flex-col justify-center p-6" style={{ background: GOLD, color: '#0b0b0b' }}>
            <div className="font-(family-name:--fd) text-2xl font-bold">¿Hoy tenés un rato?</div>
            <p className="mt-1 text-sm">Mirá los horarios libres y asegurá tu lugar.</p>
            <button onClick={() => book()} className="mt-4 bg-black py-3.5 font-(family-name:--fc) text-[14px] font-semibold uppercase tracking-[.2em] text-white">Ver turnos disponibles</button>
          </div>
        </div>
      </section>

      <footer className="px-5 py-14 text-center">
        <Crown className="mx-auto h-6 w-6" style={{ color: GOLD }} />
        <div className="mt-2 font-(family-name:--fd) text-lg tracking-[.3em]">AURUM BARBER CLUB</div>
        <div className="mt-1 text-sm text-white/40">@aurum.barberclub</div>
      </footer>

      {/* botón fijo de reserva */}
      <div className="fixed bottom-4 right-4 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button onClick={() => book()} className="flex h-11 items-center gap-2 px-5 font-(family-name:--fc) text-[14px] font-semibold uppercase tracking-[.15em] text-black shadow-2xl shadow-black" style={{ background: GOLD }}>
          <Scissors className="h-4 w-4" /> Turno
        </button>
      </div>

      <Lightbox idx={lightbox} onClose={() => setLightbox(null)} onNav={setLightbox} onBook={() => { setLightbox(null); book() }} />
      <BookingWizard open={open} preset={preset} onClose={() => setOpen(false)} onDone={(b) => { setBooking(b); safeWrite('aurum-booking', b) }} />
    </DemoShell>
  )
}

function Lightbox({ idx, onClose, onNav, onBook }: { idx: number | null; onClose: () => void; onNav: (i: number) => void; onBook: () => void }) {
  if (idx === null) return null
  const g = GALLERY[idx]
  return (
    <Sheet open onClose={onClose} side="center" className="bg-black" label="Galería">
      <div style={{ fontFamily: 'Barlow, sans-serif', color: '#ece6da' }}>
        <SmartImg src={img(g.id, 900, 1100)} alt={g.t} fallback="linear-gradient(160deg,#3a3122,#0b0b0b)" className="aspect-[4/5] max-h-[65dvh] w-full" />
        <div className="flex items-center justify-between gap-2 p-4">
          <button onClick={() => onNav((idx - 1 + GALLERY.length) % GALLERY.length)} className="grid h-10 w-10 place-items-center border border-white/20" aria-label="Anterior"><ArrowLeft className="h-4 w-4" /></button>
          <div className="text-center"><div className="font-semibold">{g.t}</div><div className="text-[12px] text-white/50">{idx + 1} / {GALLERY.length}</div></div>
          <button onClick={() => onNav((idx + 1) % GALLERY.length)} className="grid h-10 w-10 place-items-center border border-white/20" aria-label="Siguiente"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <button onClick={onClose} className="border border-white/20 py-3 text-sm font-semibold">Cerrar</button>
          <button onClick={onBook} className="py-3 text-sm font-semibold text-black" style={{ background: GOLD }}>Quiero este corte</button>
        </div>
      </div>
    </Sheet>
  )
}

/* ─────────── Reserva en pasos ─────────── */
function BookingWizard({ open, preset, onClose, onDone }: { open: boolean; preset: { service?: string; barber?: string }; onClose: () => void; onDone: (b: Booking) => void }) {
  const [step, setStep] = useState(0)
  const [services, setServices] = useState<string[]>([])
  const [barber, setBarber] = useState<string>('any')
  const [day, setDay] = useState<string>('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const [wa, setWa] = useState(false)
  const [lastOpen, setLastOpen] = useState(false)
  const days = useMemo(() => nextDays(14, [0, 1]), [])

  if (open && !lastOpen) {
    setLastOpen(true)
    setStep(preset.barber && !preset.service ? 0 : preset.service ? 1 : 0)
    setServices(preset.service ? [preset.service] : [])
    setBarber(preset.barber ?? 'any')
    setDay(days.find((d, i) => i > 0 && !d.closed)!.key); setTime(''); setDone(false)
  }
  if (!open && lastOpen) setLastOpen(false)

  const sel = SERVICES.filter((s) => services.includes(s.id))
  const total = sel.reduce((t, s) => t + s.price, 0)
  const mins = sel.reduce((t, s) => t + s.min, 0)
  const b = BARBERS.find((x) => x.id === barber)
  const slots = day ? slotsFor(day, 10, 21, 30, b?.seed ?? 0) : []
  const dayObj = days.find((d) => d.key === day)
  const canNext = [services.length > 0, true, !!time, name.trim().length > 1 && phone.replace(/\D/g, '').length >= 8][step]
  const titles = ['Elegí el servicio', 'Elegí tu barbero', 'Día y horario', 'Tus datos']

  const confirm = () => {
    const bk = { services, barber, day, time, name, phone }
    onDone(bk); setDone(true)
  }

  return (
    <>
      <Sheet open={open} onClose={onClose} className="bg-[#111]" label="Reservar turno">
        <div className="flex max-h-[92dvh] min-h-0 flex-col" style={{ fontFamily: 'Barlow, sans-serif', color: '#ece6da' }}>
          {done ? (
            <div className="overflow-y-auto p-6 text-center">
              <div className="animate-pop mx-auto grid h-16 w-16 place-items-center rounded-full text-black" style={{ background: GOLD }}><Check className="h-8 w-8" /></div>
              <div className="mt-4 font-(family-name:--fd) text-3xl font-bold">Turno confirmado</div>
              <p className="mt-1 text-white/60">Te esperamos, {name.split(' ')[0]}.</p>
              <div className="mt-6 space-y-3 border p-5 text-left" style={{ borderColor: `${GOLD}55` }}>
                <Row k="Día" v={<span>{dayObj && longDate(dayObj.date)}</span>} />
                <Row k="Hora" v={`${time} h · ${mins} min`} />
                <Row k="Barbero" v={b?.name ?? 'El primero disponible'} />
                <Row k="Servicio" v={sel.map((s) => s.name).join(' + ')} />
                <Row k="Total" v={<b style={{ color: GOLD }}>{money(total)}</b>} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button onClick={() => toast('En la web real se agrega a tu Google Calendar')} className="flex items-center justify-center gap-2 border border-white/20 py-3 text-sm font-semibold"><CalendarPlus className="h-4 w-4" /> Al calendario</button>
                <button onClick={() => setWa(true)} className="flex items-center justify-center gap-2 bg-[#25d366] py-3 text-sm font-semibold text-white"><BellRing className="h-4 w-4" /> Recordatorio</button>
              </div>
              <button onClick={onClose} className="mt-2 w-full py-3.5 font-(family-name:--fc) font-semibold uppercase tracking-[.2em] text-black" style={{ background: GOLD }}>Listo</button>
              <p className="mt-3 text-[12px] text-white/40">Demostración: no se generó un turno real.</p>
            </div>
          ) : (
            <>
              <div className="px-5 pt-5">
                <div className="flex items-center justify-between">
                  <button onClick={() => (step ? setStep(step - 1) : onClose())} className="grid h-9 w-9 place-items-center border border-white/15" aria-label="Atrás">{step ? <ArrowLeft className="h-4 w-4" /> : <X className="h-4 w-4" />}</button>
                  <div className="font-(family-name:--fc) text-[13px] uppercase tracking-[.25em] text-white/50">Paso {step + 1} de 4</div>
                  <div className="w-9" />
                </div>
                <div className="mt-4 flex gap-1">{[0, 1, 2, 3].map((i) => <div key={i} className="h-0.5 flex-1 transition-colors duration-500" style={{ background: i <= step ? GOLD : '#ffffff1a' }} />)}</div>
                <div className="mt-4 font-(family-name:--fd) text-2xl font-bold">{titles[step]}</div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                {step === 0 && (
                  <div className="space-y-2">
                    {SERVICES.map((s) => {
                      const on = services.includes(s.id)
                      return (
                        <button key={s.id} onClick={() => setServices((x) => (on ? x.filter((y) => y !== s.id) : [...x, s.id]))} className={cx('flex w-full items-center gap-3 border p-3.5 text-left transition', on ? 'bg-[#c9a45c]/10' : 'border-white/10')} style={on ? { borderColor: GOLD } : undefined}>
                          <span className={cx('grid h-5 w-5 shrink-0 place-items-center border', on ? 'text-black' : 'border-white/30')} style={on ? { background: GOLD, borderColor: GOLD } : undefined}>{on && <Check className="h-3.5 w-3.5" />}</span>
                          <div className="flex-1"><div className="font-semibold">{s.name}</div><div className="text-[12px] text-white/50">{s.min} min</div></div>
                          <div className="font-semibold" style={{ color: GOLD }}>{money(s.price)}</div>
                        </button>
                      )
                    })}
                  </div>
                )}
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setBarber('any')} className={cx('flex flex-col items-center justify-center gap-2 border p-4 text-center', barber === 'any' ? 'bg-[#c9a45c]/10' : 'border-white/10')} style={barber === 'any' ? { borderColor: GOLD } : undefined}>
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-white/5"><Scissors className="h-6 w-6" style={{ color: GOLD }} /></div>
                      <div className="font-semibold">Cualquiera</div><div className="text-[12px] text-white/50">Más horarios libres</div>
                    </button>
                    {BARBERS.map((x) => (
                      <button key={x.id} onClick={() => setBarber(x.id)} className={cx('flex flex-col items-center gap-2 border p-4 text-center', barber === x.id ? 'bg-[#c9a45c]/10' : 'border-white/10')} style={barber === x.id ? { borderColor: GOLD } : undefined}>
                        <SmartImg src={img(x.img, 160, 160)} alt={x.name} fallback="linear-gradient(160deg,#3a3122,#0b0b0b)" className="h-16 w-16 rounded-full" />
                        <div className="font-semibold">{x.name}</div><div className="text-[12px] text-white/50">{x.role}</div>
                      </button>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
                      {days.map((d) => (
                        <button key={d.key} disabled={d.closed} onClick={() => { setDay(d.key); setTime('') }}
                          className={cx('flex w-16 shrink-0 flex-col items-center border py-3 transition disabled:opacity-25', day === d.key ? 'text-black' : 'border-white/10')}
                          style={day === d.key ? { background: GOLD, borderColor: GOLD } : undefined}>
                          <span className="font-(family-name:--fc) text-[12px] uppercase tracking-wider">{d.dow}</span>
                          <span className="font-(family-name:--fd) text-2xl font-bold">{d.num}</span>
                          <span className="text-[11px] uppercase">{d.closed ? 'cerrado' : d.month}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-[12px] text-white/50">
                      <span className="flex items-center gap-1.5"><span className="h-3 w-3 border border-white/30" /> Libre</span>
                      <span className="flex items-center gap-1.5"><span className="h-3 w-3 bg-white/10" /> Ocupado</span>
                      <span className="ml-auto">{slots.filter((s) => !s.taken).length} libres</span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {slots.map((s) => (
                        <button key={s.time} disabled={s.taken} onClick={() => setTime(s.time)}
                          className={cx('border py-2.5 text-sm font-semibold transition disabled:border-transparent disabled:bg-white/5 disabled:text-white/20 disabled:line-through', time === s.time ? 'text-black' : 'border-white/15')}
                          style={time === s.time ? { background: GOLD, borderColor: GOLD } : undefined}>{s.time}</button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-3">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" className="w-full border border-white/15 bg-transparent px-4 py-3.5 outline-none focus:border-[#c9a45c]" />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="Celular (para el recordatorio)" className="w-full border border-white/15 bg-transparent px-4 py-3.5 outline-none focus:border-[#c9a45c]" />
                    <div className="space-y-2 bg-white/[.04] p-4 text-sm">
                      <Row k="Servicio" v={sel.map((s) => s.name).join(' + ')} />
                      <Row k="Barbero" v={b?.name ?? 'Cualquiera'} />
                      <Row k="Cuándo" v={<span>{dayObj && longDate(dayObj.date)} · {time} h</span>} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] text-white/50">{sel.length ? `${sel.length} servicio${sel.length > 1 ? 's' : ''} · ${mins} min` : 'Sin servicios'}</div>
                  <div className="font-(family-name:--fd) text-xl font-bold" style={{ color: GOLD }}>{money(total)}</div>
                </div>
                <button disabled={!canNext} onClick={() => (step < 3 ? setStep(step + 1) : confirm())}
                  className="px-6 py-3.5 font-(family-name:--fc) font-semibold uppercase tracking-[.2em] text-black transition disabled:opacity-30" style={{ background: GOLD }}>
                  {step < 3 ? 'Continuar' : 'Confirmar'}
                </button>
              </div>
            </>
          )}
        </div>
      </Sheet>
      <WhatsAppSim open={wa} onClose={() => setWa(false)} business={BIZ}
        message={`Hola ${name.split(' ')[0]} 👋 Te recordamos tu turno en Aurum:\n\n📅 ${dayObj ? longDate(dayObj.date) : ''} a las ${time} h\n💈 ${sel.map((s) => s.name).join(' + ')}\n✂️ ${b?.name ?? 'Barbero disponible'}\n\nSi no podés venir, avisanos respondiendo este mensaje.`} />
    </>
  )
}
const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex justify-between gap-4"><span className="text-white/50">{k}</span><span className="text-right font-medium">{v}</span></div>
)
