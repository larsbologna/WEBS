import { useMemo, useState } from 'react'
import { Ambulance, Bone, Cat, Check, ChevronDown, Clock, Dog, HeartPulse, Home, MapPin, Microscope, PawPrint, Phone, Scissors, Stethoscope, Syringe, X, Rabbit, Smile, BedDouble, ScanLine, ChevronRight, CalendarHeart } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, WhatsAppSim, toast } from '../../shared/ui'
import { nextDays, slotsFor, longDate } from '../../shared/booking'
import { cx, img, money } from '../../shared/format'

const BIZ = 'Huellitas Veterinaria'
const TEAL = '#0f766e', ORG = '#f97316', CREAM = '#fff8ef', INK = '#16302d'
type Species = 'Perro' | 'Gato' | 'Otro'

const SERVICES = [
  { id: 'cons', i: Stethoscope, t: 'Consulta clínica', d: 'Revisión completa, diagnóstico y plan de tratamiento.', p: 18000, min: 30 },
  { id: 'vac', i: Syringe, t: 'Vacunación', d: 'Planes completos para cachorros, gatitos y adultos.', p: 14000, min: 20 },
  { id: 'pel', i: Scissors, t: 'Peluquería', d: 'Baño, corte, uñas y limpieza de oídos.', p: 22000, min: 90 },
  { id: 'eco', i: ScanLine, t: 'Ecografía y rayos', d: 'Diagnóstico por imágenes en el día.', p: 32000, min: 40 },
  { id: 'lab', i: Microscope, t: 'Análisis clínicos', d: 'Sangre, orina y materia fecal con resultados en 24 h.', p: 26000, min: 15 },
  { id: 'cir', i: HeartPulse, t: 'Cirugía', d: 'Castraciones y cirugías programadas con anestesia inhalatoria.', p: 95000, min: 60 },
  { id: 'odo', i: Smile, t: 'Odontología', d: 'Limpieza dental con ultrasonido.', p: 48000, min: 60 },
  { id: 'int', i: BedDouble, t: 'Internación', d: 'Monitoreo 24 h con parte diario a la familia.', p: 45000, min: 0 },
]
const VETS = [
  { id: 'v1', name: 'Dra. Valeria Ríos', role: 'Clínica general · Directora', mat: 'MP 8241', img: '1559839734-2b71ea197ec2', pets: 'Perros y gatos' },
  { id: 'v2', name: 'Dr. Martín Luna', role: 'Cirugía y traumatología', mat: 'MP 9310', img: '1612349317150-e413f6a5b16d', pets: 'Perros y gatos' },
  { id: 'v3', name: 'Dra. Sofía Peralta', role: 'Felinos y exóticos', mat: 'MP 10582', img: '1594824476967-48c8b964273f', pets: 'Gatos, conejos, aves' },
]
const VACCINES: Record<'Perro' | 'Gato', { d: number; n: string; info: string }[]> = {
  Perro: [
    { d: 45, n: 'Séxtuple (1ª dosis)', info: 'Moquillo, parvovirus, hepatitis, leptospirosis, parainfluenza y coronavirus.' },
    { d: 66, n: 'Séxtuple (2ª dosis)', info: 'Refuerzo a los 21 días.' },
    { d: 87, n: 'Séxtuple (3ª dosis)', info: 'Último refuerzo del plan de cachorro.' },
    { d: 120, n: 'Antirrábica', info: 'Obligatoria por ley. Luego, refuerzo anual.' },
    { d: 365, n: 'Refuerzo anual', info: 'Séxtuple + antirrábica cada año.' },
  ],
  Gato: [
    { d: 60, n: 'Triple felina (1ª dosis)', info: 'Panleucopenia, rinotraqueítis y calicivirus.' },
    { d: 81, n: 'Triple felina (2ª dosis)', info: 'Refuerzo a los 21 días.' },
    { d: 90, n: 'Leucemia felina', info: 'Recomendada para gatos con salida al exterior.' },
    { d: 120, n: 'Antirrábica', info: 'Obligatoria por ley. Luego, refuerzo anual.' },
    { d: 365, n: 'Refuerzo anual', info: 'Triple felina + antirrábica cada año.' },
  ],
}
const TIPS = [
  { t: 'Golpe de calor: cómo prevenirlo', tag: 'Verano', img: '1548199973-03cce0bbc87b', body: ['Evitá paseos entre las 11 y las 17 h: el asfalto puede superar los 60 °C.', 'Dejá siempre agua fresca y una zona con sombra.', 'Razas de hocico corto (bulldog, pug) son las más sensibles.', 'Si notás jadeo intenso, encías muy rojas o desgano: mojalo con agua fresca (no helada) y vení a la guardia.'] },
  { t: 'Alimentos prohibidos para tu mascota', tag: 'Nutrición', img: '1517849845537-4d257902454a', body: ['Chocolate, uvas y pasas: son tóxicos incluso en poca cantidad.', 'Cebolla y ajo dañan los glóbulos rojos.', 'Huesos cocidos se astillan y pueden perforar el intestino.', 'Edulcorante xilitol (chicles, golosinas): muy peligroso para perros.'] },
  { t: 'Gatos: señales de que algo anda mal', tag: 'Felinos', img: '1514888286974-6c03e2ca1dba', body: ['Los gatos esconden el dolor: un cambio de conducta ya es una señal.', 'Ir muchas veces a la piedra sin orinar es una urgencia.', 'Dejar de comer más de 24 h puede complicar el hígado.', 'Controles anuales permiten detectar a tiempo problemas renales.'] },
  { t: 'Pulgas y garrapatas: protección todo el año', tag: 'Prevención', img: '1587300003388-59208cc962cb', body: ['Las pipetas y comprimidos actuales protegen de 1 a 3 meses.', 'Las garrapatas transmiten enfermedades graves como la ehrlichiosis.', 'Tratá también el ambiente: camas, mantas y alfombras.', 'Consultanos el producto ideal según peso y especie.'] },
]
const FAQ = [
  ['¿Atienden urgencias fuera de horario?', 'Sí. Tenemos guardia telefónica 24 h y atención de urgencias los 365 días del año.'],
  ['¿Hacen visitas a domicilio?', 'Sí, en Berazategui, Hudson y Quilmes Este para consultas, vacunas y extracciones de sangre.'],
  ['¿Qué tengo que llevar a la primera consulta?', 'Libreta sanitaria (si tiene), estudios previos y, si es posible, una muestra de materia fecal fresca.'],
  ['¿Cómo se prepara una cirugía?', 'Ayuno de sólidos de 10 h y de agua de 4 h. Te enviamos las indicaciones por WhatsApp al reservar.'],
  ['¿Qué medios de pago aceptan?', 'Efectivo, transferencia, débito, crédito en 3 cuotas y Mercado Pago.'],
]

export default function Veterinaria() {
  const [book, setBook] = useState<{ open: boolean; service?: string; vet?: string }>({ open: false })
  const [tip, setTip] = useState<number | null>(null)
  const [faq, setFaq] = useState<number | null>(0)
  const [urg, setUrg] = useState(false)

  return (
    <DemoShell slug="veterinaria" fonts="family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700" themeColor={CREAM}
      className="pb-24" style={{ background: CREAM, color: INK, fontFamily: 'Quicksand, sans-serif', ['--fd' as string]: '"Baloo 2", sans-serif' }}>
      <div className="flex items-center justify-center gap-2 py-2 text-[13px] font-bold text-white" style={{ background: TEAL }}>
        <Ambulance className="h-4 w-4" /> Guardia 24 h · <button onClick={() => setUrg(true)} className="underline">Llamar urgencia</button>
      </div>
      <header className="sticky top-0 z-40 bg-[#fff8ef]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-11 w-11 rotate-[-8deg] place-items-center rounded-2xl text-white" style={{ background: ORG }}><PawPrint className="h-6 w-6" /></div>
            <div className="leading-none"><div className="font-(family-name:--fd) text-2xl font-extrabold" style={{ color: TEAL }}>Huellitas</div><div className="text-[11px] font-bold uppercase tracking-[.2em] text-[#16302d]/50">Veterinaria</div></div>
          </div>
          <button onClick={() => setBook({ open: true })} className="rounded-full px-5 py-2.5 font-(family-name:--fd) text-[15px] font-bold text-white shadow-md" style={{ background: TEAL }}>Pedir turno</button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-6 pt-4 md:grid-cols-2 md:pt-10">
        <div className="order-2 md:order-1">
          <h1 className="animate-fade-up font-(family-name:--fd) text-[46px] font-extrabold leading-[1] sm:text-7xl" style={{ color: TEAL }}>
            Cuidamos a quien <span style={{ color: ORG }}>más te quiere.</span>
          </h1>
          <p className="animate-fade-up mt-4 max-w-md text-[17px] font-semibold leading-relaxed text-[#16302d]/70" style={{ animationDelay: '100ms' }}>
            Veterinaria de barrio con tecnología de clínica. Sacá turno online, seguí su plan de vacunas y consultanos lo que necesites.
          </p>
          <div className="animate-fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: '200ms' }}>
            <button onClick={() => setBook({ open: true })} className="flex items-center gap-2 rounded-full px-6 py-3.5 font-(family-name:--fd) text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition active:scale-95" style={{ background: ORG }}><CalendarHeart className="h-5 w-5" /> Sacar turno</button>
            <a href="#vacunas" className="rounded-full bg-white px-6 py-3.5 font-(family-name:--fd) text-lg font-bold" style={{ color: TEAL }}>Calendario de vacunas</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[13px] font-bold">
            {[['🐶', 'Perros'], ['🐱', 'Gatos'], ['🐰', 'Exóticos'], ['🏠', 'A domicilio']].map(([e, t]) => <span key={t} className="rounded-full bg-white px-3 py-1.5 shadow-sm">{e} {t}</span>)}
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="absolute inset-4 rotate-3 rounded-[48px]" style={{ background: '#ffd8b5' }} />
          <SmartImg eager src={img('1628009368231-7bb7cfcb0def', 900, 900)} alt="Veterinaria atendiendo a un perro" fallback="linear-gradient(135deg,#99f6e4,#0f766e)" className="relative aspect-square rounded-[48px]" />
          <div className="absolute -bottom-3 right-3 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl">
            <span className="text-2xl">⭐</span><div className="leading-tight"><div className="font-(family-name:--fd) text-lg font-bold">4,9 en Google</div><div className="text-[12px] text-[#16302d]/55">+800 familias felices</div></div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl font-extrabold" style={{ color: TEAL }}>Nuestros servicios</h2></Reveal>
        <Tip className="mt-3 !mx-0">cada servicio con precio orientativo y botón de turno: menos llamadas para preguntar "¿cuánto sale?" y más turnos confirmados.</Tip>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 50}>
              <button onClick={() => setBook({ open: true, service: s.id })} className="group flex h-full w-full flex-col rounded-3xl bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="grid h-12 w-12 place-items-center rounded-2xl transition group-hover:rotate-[-6deg]" style={{ background: i % 2 ? '#ffedd5' : '#ccfbf1' }}><s.i className="h-6 w-6" style={{ color: i % 2 ? ORG : TEAL }} /></div>
                <div className="mt-3 font-(family-name:--fd) text-lg font-bold leading-tight">{s.t}</div>
                <p className="mt-1 flex-1 text-[13px] font-semibold leading-snug text-[#16302d]/60">{s.d}</p>
                <div className="mt-3 flex items-center justify-between text-[13px]"><span>desde <b>{money(s.p)}</b></span><ChevronRight className="h-4 w-4" style={{ color: ORG }} /></div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VACUNAS */}
      <section id="vacunas" className="mx-auto max-w-6xl scroll-mt-16 px-5 pt-16">
        <VaccineCalc onBook={() => setBook({ open: true, service: 'vac' })} />
        <Tip className="mt-4">la calculadora de vacunas le da al cliente un motivo para volver a tu web y recordar sus próximas dosis… con vos.</Tip>
      </section>

      {/* EQUIPO */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl font-extrabold" style={{ color: TEAL }}>Nuestro equipo</h2><p className="font-semibold text-[#16302d]/60">Profesionales matriculados que aman lo que hacen.</p></Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {VETS.map((v, i) => (
            <Reveal key={v.id} delay={i * 70} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm md:flex-col md:text-center">
              <SmartImg src={img(v.img, 400, 400)} alt={v.name} fallback="linear-gradient(135deg,#99f6e4,#0f766e)" className="h-24 w-24 shrink-0 rounded-full ring-4 ring-[#ccfbf1] md:h-36 md:w-36" />
              <div className="min-w-0 flex-1">
                <div className="font-(family-name:--fd) text-xl font-bold leading-tight">{v.name}</div>
                <div className="text-[14px] font-bold" style={{ color: ORG }}>{v.role}</div>
                <div className="text-[12px] font-semibold text-[#16302d]/50">{v.mat} · {v.pets}</div>
                <button onClick={() => setBook({ open: true, vet: v.id })} className="mt-2 text-[13px] font-bold underline underline-offset-4" style={{ color: TEAL }}>Turno con {v.name.split(' ')[0] === 'Dra.' ? 'ella' : 'él'}</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ATENCIÓN + FAQ */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl font-extrabold" style={{ color: TEAL }}>Cómo atendemos</h2></Reveal>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[{ i: Clock, t: 'Consultorio', d: 'Lun a vie 9–20 h · Sáb 9–14 h' }, { i: Ambulance, t: 'Guardia 24 h', d: 'Urgencias todos los días del año' }, { i: Home, t: 'A domicilio', d: 'Consultas, vacunas y análisis' }].map(({ i: I, t, d }, k) => (
            <div key={t} className="flex items-center gap-3 rounded-3xl p-4 text-white" style={{ background: k === 1 ? ORG : TEAL }}><I className="h-8 w-8 shrink-0" /><div><div className="font-(family-name:--fd) text-lg font-bold">{t}</div><div className="text-[13px] font-semibold text-white/85">{d}</div></div></div>
          ))}
        </div>
        <div className="mt-5 divide-y divide-[#16302d]/10 rounded-3xl bg-white px-5 shadow-sm">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-3 py-4 text-left font-bold" aria-expanded={faq === i}>
                {q}<ChevronDown className={cx('h-5 w-5 shrink-0 transition', faq === i && 'rotate-180')} style={{ color: ORG }} />
              </button>
              {faq === i && <p className="animate-fade-in pb-4 text-[14px] font-semibold text-[#16302d]/65">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CONSEJOS */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal><h2 className="font-(family-name:--fd) text-4xl font-extrabold" style={{ color: TEAL }}>Consejos y cuidados</h2></Reveal>
        <div className="no-scrollbar -mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {TIPS.map((t, i) => (
            <button key={t.t} onClick={() => setTip(i)} className="w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-white text-left shadow-sm transition hover:shadow-md md:w-auto">
              <SmartImg src={img(t.img, 500, 340)} alt={t.t} fallback="linear-gradient(135deg,#fed7aa,#f97316)" className="aspect-[3/2]" />
              <div className="p-4">
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: ORG }}>{t.tag}</span>
                <div className="mt-2 font-(family-name:--fd) text-lg font-bold leading-tight">{t.t}</div>
                <div className="mt-2 text-[13px] font-bold" style={{ color: TEAL }}>Leer consejo →</div>
              </div>
            </button>
          ))}
        </div>
        <Tip className="mt-4 !mx-0">publicar consejos útiles mejora tu posicionamiento en Google y te muestra como referente en el barrio.</Tip>
      </section>

      {/* CONTACTO */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <Reveal className="overflow-hidden rounded-[36px] bg-white shadow-sm md:grid md:grid-cols-2">
          <div className="relative h-56 md:h-auto" style={{ background: '#d1fae5' }}>
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <path d="M0 200 Q200 160 400 210" stroke="#fff" strokeWidth="18" fill="none" /><path d="M120 0 L160 300" stroke="#fff" strokeWidth="14" /><path d="M300 0 L280 300" stroke="#fff" strokeWidth="10" />
              <circle cx="60" cy="70" r="30" fill="#a7f3d0" /><circle cx="350" cy="90" r="40" fill="#a7f3d0" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"><div className="animate-bounce rounded-full p-3 text-white shadow-lg" style={{ background: ORG }}><PawPrint className="h-6 w-6" /></div></div>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="font-(family-name:--fd) text-3xl font-extrabold" style={{ color: TEAL }}>Vení a visitarnos</h2>
            <div className="mt-4 space-y-3 font-semibold">
              <div className="flex gap-3"><MapPin className="h-5 w-5 shrink-0" style={{ color: ORG }} /> Av. Mitre 1840, Berazategui<br />(estacionamiento propio)</div>
              <div className="flex gap-3"><Phone className="h-5 w-5 shrink-0" style={{ color: ORG }} /> (011) 4216-0000</div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <WAButton />
              <button onClick={() => toast('En la web real abre Google Maps')} className="rounded-full py-3 font-(family-name:--fd) font-bold text-white" style={{ background: TEAL }}>Cómo llegar</button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="px-5 py-12 text-center">
        <div className="font-(family-name:--fd) text-2xl font-extrabold" style={{ color: TEAL }}>Huellitas 🐾</div>
        <div className="text-[13px] font-semibold text-[#16302d]/50">Directora médica: Dra. V. Ríos MP 8241 · @huellitas.vet</div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button onClick={() => setBook({ open: true })} className="flex h-12 items-center gap-2 rounded-full px-5 font-(family-name:--fd) text-[16px] font-bold text-white shadow-xl shadow-orange-500/30" style={{ background: ORG }}><PawPrint className="h-5 w-5" /> Turno</button>
      </div>

      <TipSheet i={tip} onClose={() => setTip(null)} onBook={() => { setTip(null); setBook({ open: true, service: 'cons' }) }} />
      <BookingSheet state={book} onClose={() => setBook({ open: false })} />
      <Sheet open={urg} onClose={() => setUrg(false)} side="center" className="bg-white" label="Urgencias">
        <div className="p-6 text-center" style={{ fontFamily: 'Quicksand, sans-serif', color: INK }}>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: '#dc2626' }}><Ambulance className="h-8 w-8" /></div>
          <div className="mt-3 font-(family-name:--fd) text-2xl font-extrabold">Guardia veterinaria 24 h</div>
          <p className="mt-1 font-semibold text-[#16302d]/65">Si tu mascota tiene una urgencia, llamanos ya. Un profesional te atiende al instante.</p>
          <div className="mt-4 font-(family-name:--fd) text-3xl font-extrabold" style={{ color: TEAL }}>(011) 4216-0000</div>
          <button onClick={() => { toast('En la web real inicia la llamada a la guardia'); setUrg(false) }} className="mt-5 w-full rounded-full py-4 font-(family-name:--fd) text-lg font-bold text-white" style={{ background: '#dc2626' }}>Llamar ahora</button>
          <button onClick={() => setUrg(false)} className="mt-2 w-full py-2 text-sm font-bold underline">Cerrar</button>
        </div>
      </Sheet>
    </DemoShell>
  )
}

function WAButton() {
  const [o, setO] = useState(false)
  return (
    <>
      <button onClick={() => setO(true)} className="rounded-full bg-[#25d366] py-3 font-(family-name:--fd) font-bold text-white">WhatsApp</button>
      <WhatsAppSim open={o} onClose={() => setO(false)} business={BIZ} message="¡Hola! Mi perrita Luna no quiere comer desde ayer y está decaída. ¿Tienen turno para hoy?" />
    </>
  )
}

function VaccineCalc({ onBook }: { onBook: () => void }) {
  const [sp, setSp] = useState<'Perro' | 'Gato'>('Perro')
  const [birth, setBirth] = useState(() => { const d = new Date(); d.setDate(d.getDate() - 50); return d.toISOString().slice(0, 10) })
  const b = new Date(birth + 'T12:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const plan = VACCINES[sp].map((v) => { const d = new Date(b); d.setDate(d.getDate() + v.d); return { ...v, date: d, past: d < today } })
  const next = plan.find((p) => !p.past)
  return (
    <Reveal className="overflow-hidden rounded-[36px] text-white" style={{ background: TEAL }}>
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2 font-bold text-[#99f6e4]"><Syringe className="h-5 w-5" /> Calendario de vacunación</div>
        <h2 className="mt-1 font-(family-name:--fd) text-3xl font-extrabold sm:text-4xl">¿Cuándo le toca su próxima vacuna?</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="grid grid-cols-2 gap-2">
            {(['Perro', 'Gato'] as const).map((s) => <button key={s} onClick={() => setSp(s)} className={cx('flex items-center justify-center gap-2 rounded-2xl py-3 font-(family-name:--fd) text-lg font-bold transition', sp === s ? 'bg-white text-[#0f766e]' : 'bg-white/10')}>{s === 'Perro' ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}{s}</button>)}
          </div>
          <label className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2">
            <span className="text-[13px] font-bold text-white/75">Fecha de nacimiento</span>
            <input type="date" value={birth} max={today.toISOString().slice(0, 10)} onChange={(e) => e.target.value && setBirth(e.target.value)} className="min-w-0 flex-1 bg-transparent text-right font-bold text-white outline-none [color-scheme:dark]" />
          </label>
        </div>
      </div>
      <div className="bg-[#0b5f58] p-6 sm:p-8">
        <ol className="relative space-y-4 border-l-2 border-dashed border-white/25 pl-6">
          {plan.map((p) => (
            <li key={p.n} className="relative">
              <span className={cx('absolute -left-[33px] top-0.5 grid h-5 w-5 place-items-center rounded-full ring-4 ring-[#0b5f58]', p.past ? 'bg-[#99f6e4] text-[#0f766e]' : p === next ? 'bg-[#f97316]' : 'bg-white/30')}>{p.past && <Check className="h-3 w-3" />}</span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className={cx('font-(family-name:--fd) text-lg font-bold', p.past && 'text-white/55 line-through')}>{p.n}</span>
                <span className={cx('text-[13px] font-bold', p === next ? 'text-[#fdba74]' : 'text-white/60')}>{p.date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}{p === next && ' · próxima'}</span>
              </div>
              <p className="text-[13px] font-semibold text-white/65">{p.info}</p>
            </li>
          ))}
        </ol>
        {next && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 text-[#16302d]">
            <div><div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: ORG }}>Próxima dosis</div><div className="font-(family-name:--fd) text-lg font-bold">{next.n} · {longDate(next.date)}</div></div>
            <button onClick={onBook} className="rounded-full px-5 py-2.5 font-(family-name:--fd) font-bold text-white" style={{ background: ORG }}>Reservar vacuna</button>
          </div>
        )}
        <p className="mt-3 text-[12px] font-semibold text-white/50">Plan orientativo. El veterinario lo ajusta según cada mascota.</p>
      </div>
    </Reveal>
  )
}

function TipSheet({ i, onClose, onBook }: { i: number | null; onClose: () => void; onBook: () => void }) {
  if (i === null) return null
  const t = TIPS[i]
  return (
    <Sheet open onClose={onClose} className="bg-[#fff8ef]" label={t.t}>
      <div className="overflow-y-auto" style={{ fontFamily: 'Quicksand, sans-serif', color: INK }}>
        <div className="relative"><SmartImg src={img(t.img, 900, 500)} alt={t.t} fallback="linear-gradient(135deg,#fed7aa,#f97316)" className="aspect-[9/5]" /><button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Cerrar"><X className="h-5 w-5" /></button></div>
        <div className="p-5">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: ORG }}>{t.tag}</span>
          <h3 className="mt-2 font-(family-name:--fd) text-2xl font-extrabold" style={{ color: TEAL }}>{t.t}</h3>
          <ul className="mt-3 space-y-3">{t.body.map((b) => <li key={b} className="flex gap-3 text-[15px] font-semibold leading-relaxed"><Bone className="mt-1 h-4 w-4 shrink-0" style={{ color: ORG }} />{b}</li>)}</ul>
          <div className="mt-5 rounded-2xl bg-white p-4 text-[14px] font-semibold">¿Tenés dudas sobre tu mascota? <button onClick={onBook} className="font-bold underline" style={{ color: TEAL }}>Sacá un turno de consulta</button></div>
        </div>
      </div>
    </Sheet>
  )
}

function BookingSheet({ state, onClose }: { state: { open: boolean; service?: string; vet?: string }; onClose: () => void }) {
  const days = useMemo(() => nextDays(14, [0]), [])
  const [species, setSpecies] = useState<Species>('Perro')
  const [pet, setPet] = useState('')
  const [service, setService] = useState('cons')
  const [vet, setVet] = useState('any')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [owner, setOwner] = useState('')
  const [phone, setPhone] = useState('')
  const [home, setHome] = useState(false)
  const [done, setDone] = useState(false)
  const [was, setWas] = useState(false)
  if (state.open && !was) { setWas(true); setService(state.service ?? 'cons'); setVet(state.vet ?? 'any'); setDay(days[1].closed ? days[2].key : days[1].key); setTime(''); setDone(false) }
  if (!state.open && was) setWas(false)
  const dObj = days.find((d) => d.key === day)
  const sat = dObj?.date.getDay() === 6
  const slots = day ? slotsFor(day, 9, sat ? 14 : 20, 30, vet === 'any' ? 4 : +vet.slice(1) * 5) : []
  const svc = SERVICES.find((s) => s.id === service)!
  const v = VETS.find((x) => x.id === vet)
  const ok = pet.trim().length > 1 && time && owner.trim().length > 1 && phone.replace(/\D/g, '').length >= 8
  const SpIcon = species === 'Perro' ? Dog : species === 'Gato' ? Cat : Rabbit
  return (
    <Sheet open={state.open} onClose={onClose} side="right" className="bg-[#fff8ef]" label="Sacar turno">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Quicksand, sans-serif', color: INK }}>
        <div className="flex items-center justify-between px-5 py-4">
          <div className="font-(family-name:--fd) text-3xl font-extrabold" style={{ color: TEAL }}>{done ? '¡Turno reservado!' : 'Sacá tu turno'}</div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>
        {done ? (
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            <div className="animate-pop overflow-hidden rounded-[28px] bg-white shadow-lg">
              <div className="flex items-center gap-4 p-5 text-white" style={{ background: TEAL }}>
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20"><SpIcon className="h-9 w-9" /></div>
                <div><div className="text-[12px] font-bold uppercase tracking-widest text-white/70">Paciente</div><div className="font-(family-name:--fd) text-3xl font-extrabold leading-none">{pet}</div><div className="text-sm font-semibold text-white/80">{species}</div></div>
              </div>
              <div className="space-y-2 p-5 text-[15px] font-semibold">
                <div className="flex justify-between gap-3"><span className="text-[#16302d]/55">Servicio</span><span className="text-right">{svc.t}</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#16302d]/55">Cuándo</span><span className="text-right">{dObj && longDate(dObj.date)} · {time} h</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#16302d]/55">Profesional</span><span className="text-right">{v?.name ?? 'Primer disponible'}</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#16302d]/55">Modalidad</span><span>{home ? '🏠 A domicilio' : '🏥 En consultorio'}</span></div>
                <div className="flex justify-between gap-3"><span className="text-[#16302d]/55">Valor orientativo</span><b>{money(svc.p + (home ? 8000 : 0))}</b></div>
              </div>
            </div>
            {service === 'cir' && <div className="mt-3 rounded-2xl bg-[#ffedd5] p-4 text-[14px] font-semibold">Recordá: ayuno de sólidos de 10 h y de agua de 4 h antes de la cirugía.</div>}
            <p className="mt-4 text-center text-[14px] font-semibold text-[#16302d]/65">Te enviamos un recordatorio por WhatsApp el día anterior. 🐾</p>
            <button onClick={onClose} className="mt-4 w-full rounded-full py-4 font-(family-name:--fd) text-lg font-bold text-white" style={{ background: ORG }}>¡Genial!</button>
            <p className="mt-2 text-center text-[12px] text-[#16302d]/45">Demostración: no se generó un turno real.</p>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 pb-5">
              <Block t="¿Quién viene?">
                <div className="grid grid-cols-3 gap-2">
                  {([['Perro', Dog], ['Gato', Cat], ['Otro', Rabbit]] as const).map(([s, I]) => <button key={s} onClick={() => setSpecies(s)} className={cx('flex flex-col items-center gap-1 rounded-2xl py-3 font-(family-name:--fd) font-bold transition', species === s ? 'text-white' : 'bg-white')} style={species === s ? { background: TEAL } : undefined}><I className="h-7 w-7" />{s}</button>)}
                </div>
                <input value={pet} onChange={(e) => setPet(e.target.value)} placeholder={`Nombre de tu ${species === 'Otro' ? 'mascota' : species.toLowerCase()}`} className="mt-2 w-full rounded-2xl bg-white px-4 py-3.5 font-semibold outline-none ring-2 ring-transparent focus:ring-[#0f766e]" />
              </Block>
              <Block t="Servicio">
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.filter((s) => s.id !== 'int').map((s) => <button key={s.id} onClick={() => setService(s.id)} className={cx('flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-[13px] font-bold transition', service === s.id ? 'text-white' : 'bg-white')} style={service === s.id ? { background: ORG } : undefined}><s.i className="h-4 w-4 shrink-0" />{s.t}</button>)}
                </div>
                {['cons', 'vac', 'lab'].includes(service) && (
                  <button onClick={() => setHome(!home)} className="mt-2 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-[14px] font-bold">
                    <span className="flex items-center gap-2"><Home className="h-4 w-4" style={{ color: TEAL }} /> Atención a domicilio (+{money(8000)})</span>
                    <span className={cx('relative h-6 w-11 rounded-full transition', home ? 'bg-[#0f766e]' : 'bg-black/15')}><span className={cx('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all', home ? 'left-[22px]' : 'left-0.5')} /></span>
                  </button>
                )}
              </Block>
              <Block t="Profesional">
                <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
                  <button onClick={() => setVet('any')} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-bold', vet === 'any' ? 'text-white' : 'bg-white')} style={vet === 'any' ? { background: TEAL } : undefined}>Cualquiera</button>
                  {VETS.map((x) => <button key={x.id} onClick={() => setVet(x.id)} className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-bold', vet === x.id ? 'text-white' : 'bg-white')} style={vet === x.id ? { background: TEAL } : undefined}>{x.name}</button>)}
                </div>
              </Block>
              <Block t="Día y horario">
                <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
                  {days.map((d) => <button key={d.key} disabled={d.closed} onClick={() => { setDay(d.key); setTime('') }} className={cx('flex w-[58px] shrink-0 flex-col items-center rounded-2xl py-2 font-bold transition disabled:opacity-30', day === d.key ? 'text-white' : 'bg-white')} style={day === d.key ? { background: TEAL } : undefined}><span className="text-[11px]">{d.dow}</span><span className="font-(family-name:--fd) text-2xl leading-tight">{d.num}</span><span className="text-[10px]">{d.closed ? 'guardia' : d.month}</span></button>)}
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {slots.map((s) => <button key={s.time} disabled={s.taken} onClick={() => setTime(s.time)} className={cx('rounded-xl py-2.5 text-[13px] font-bold transition disabled:bg-transparent disabled:text-[#16302d]/20 disabled:line-through', time === s.time ? 'text-white' : 'bg-white')} style={time === s.time ? { background: ORG } : undefined}>{s.time}</button>)}
                </div>
              </Block>
              <Block t="Tus datos">
                <div className="space-y-2">
                  <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Tu nombre" className="w-full rounded-2xl bg-white px-4 py-3.5 font-semibold outline-none ring-2 ring-transparent focus:ring-[#0f766e]" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Celular" inputMode="tel" className="w-full rounded-2xl bg-white px-4 py-3.5 font-semibold outline-none ring-2 ring-transparent focus:ring-[#0f766e]" />
                </div>
              </Block>
            </div>
            <div className="border-t border-black/5 bg-white p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between text-[14px] font-bold"><span>{svc.t}{home && ' · domicilio'}</span><span>desde {money(svc.p + (home ? 8000 : 0))}</span></div>
              <button disabled={!ok} onClick={() => setDone(true)} className="mt-3 w-full rounded-full py-4 font-(family-name:--fd) text-lg font-bold text-white transition disabled:opacity-35" style={{ background: ORG }}>
                {pet.trim().length < 2 ? 'Contanos quién viene' : !time ? 'Elegí un horario' : !ok ? 'Completá tus datos' : `Reservar turno para ${pet}`}
              </button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
const Block = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div><div className="mb-2 font-(family-name:--fd) text-lg font-bold" style={{ color: TEAL }}>{t}</div>{children}</div>
)
