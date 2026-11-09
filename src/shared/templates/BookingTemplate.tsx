import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, CalendarCheck, Check, ChevronDown, ChevronLeft, Quote, Star, X } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip } from '../ui'
import { longDate, nextDays, slotsFor } from '../booking'
import { WhatsAppIcon, whatsappLink } from '../whatsapp'
import { DEMOS } from '../../demos/meta'
import { cx, img, money } from '../format'
import { IconBadge, InfoFooter, Kicker, Section, Title, pill, radius, rootStyle, type Info, type Theme } from './kit'

export type Service = { id: string; name: string; desc: string; icon: LucideIcon; price?: number; priceLabel?: string; duration?: string; img?: string }

export type BookingConfig = {
  slug: string
  /** nombre de la marca (como se ve en el logo) */
  name: string
  /** quién atiende o qué es: "Odontóloga · MN 41.208" */
  role: string
  logo: LucideIcon
  theme: Theme
  announce?: string
  hero: { kicker: string; title: string; text: string; image: string; layout: 'portrait' | 'full' | 'editorial'; stats?: { v: string; l: string }[] }
  /** franja de confianza: obras sociales, medios de pago, etc. */
  trust?: { title: string; items: string[] }
  servicesKicker: string
  servicesTitle: string
  services: Service[]
  plans?: { title: string; items: { name: string; price: number; period: string; features: string[]; highlight?: boolean }[] }
  schedule?: { title: string; days: { day: string; classes: { time: string; name: string }[] }[] }
  about: { kicker: string; title: string; image: string; text: string[]; creds: string[] }
  steps?: { title: string; items: { t: string; d: string }[] }
  gallery?: { title: string; images: string[] }
  testimonials: { name: string; text: string }[]
  faq: { q: string; a: string }[]
  booking: {
    cta: string // "Pedir turno"
    noun: string // "turno", "consulta", "clase de prueba"
    modes?: string[] // Presencial / Online
    closedDows: number[]
    hours: [number, number]
    step: number
    /** a quién se le escribe (para el saludo del mensaje) */
    greet: string
  }
  info: Info
  tips: { services: string; booking: string; about: string }
}

export function BookingTemplate({ cfg }: { cfg: BookingConfig }) {
  const t = cfg.theme
  const [book, setBook] = useState<{ open: boolean; service?: string }>({ open: false })
  const open = (service?: string) => setBook({ open: true, service })
  const Logo = cfg.logo
  const phone = DEMOS.find((d) => d.slug === cfg.slug)?.whatsapp ?? ''

  return (
    <DemoShell slug={cfg.slug} fonts={t.fonts} themeColor={t.bg} className="pb-28" style={rootStyle(t)}>
      {cfg.announce && <div className="px-4 py-2 text-center text-[12.5px] font-semibold text-white" style={{ background: t.dark }}>{cfg.announce}</div>}

      <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ background: `${t.bg}e6`, borderColor: t.line }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <a href="#top" className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center" style={{ background: t.accent, color: t.accentInk, borderRadius: radius(t, 'sm') === '999px' ? 999 : radius(t, 'sm') }}><Logo className="h-5 w-5" /></span>
            <span className="min-w-0 leading-tight">
              <span className={cx('block truncate font-(family-name:--fd) text-[18px]', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800 }}>{cfg.name}</span>
              <span className="block truncate text-[12px]" style={{ color: t.muted }}>{cfg.role}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-[14px] font-semibold md:flex">
            <a href="#servicios">Servicios</a><a href="#sobre">{cfg.about.kicker}</a><a href="#preguntas">Preguntas</a>
          </nav>
          <button onClick={() => open()} className="shrink-0 px-4 py-2.5 text-[14px] font-bold transition active:scale-95" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}>{cfg.booking.cta}</button>
        </div>
      </header>

      <Hero cfg={cfg} onBook={() => open()} />

      {cfg.trust && (
        <div className="mx-auto mt-6 max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border px-5 py-4" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
            <span className="text-[12px] font-bold uppercase tracking-[.15em]" style={{ color: t.muted }}>{cfg.trust.title}</span>
            {cfg.trust.items.map((x) => <span key={x} className="font-(family-name:--fd) text-[15px] font-bold" style={{ color: t.ink }}>{x}</span>)}
          </div>
        </div>
      )}

      {/* Servicios */}
      <Section id="servicios">
        <Kicker t={t}>{cfg.servicesKicker}</Kicker>
        <Title t={t} text={cfg.servicesTitle} className="mt-2 max-w-2xl text-3xl md:text-5xl" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cfg.services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 60}>
              <article className="flex h-full flex-col overflow-hidden border transition hover:shadow-xl" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
                {s.img && <SmartImg src={img(s.img, 600, 380)} alt={s.name} className="aspect-[16/10]" fallback={`linear-gradient(135deg,${t.soft},${t.accent})`} />}
                <div className="flex flex-1 flex-col p-5">
                  {!s.img && <IconBadge icon={s.icon} t={t} />}
                  <h3 className={cx('font-(family-name:--fd) text-[20px] leading-tight', !s.img && 'mt-4', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800 }}>{s.name}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed" style={{ color: t.muted }}>{s.desc}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <div className="text-[13px]" style={{ color: t.muted }}>
                      {(s.price || s.priceLabel) && <div className="font-(family-name:--fd) text-[17px] font-extrabold" style={{ color: t.ink }}>{s.price ? money(s.price) : s.priceLabel}</div>}
                      {s.duration}
                    </div>
                    <button onClick={() => open(s.id)} className="flex shrink-0 items-center gap-1.5 border px-4 py-2 text-[13.5px] font-bold transition hover:opacity-80" style={{ borderColor: t.accent, color: t.accent, borderRadius: pill(t) }}>{cfg.booking.cta} <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Tip className="mt-4 !mx-0">{cfg.tips.services}</Tip>
      </Section>

      {/* Planes */}
      {cfg.plans && (
        <Section>
          <Title t={t} text={cfg.plans.title} className="text-3xl md:text-5xl" />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {cfg.plans.items.map((p) => (
              <div key={p.name} className="relative flex flex-col border p-6" style={{ background: p.highlight ? t.dark : t.surface, color: p.highlight ? '#fff' : t.ink, borderColor: p.highlight ? t.dark : t.line, borderRadius: radius(t, 'lg') }}>
                {p.highlight && <span className="absolute right-5 top-5 px-3 py-1 text-[11px] font-extrabold" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}>Más elegido</span>}
                <div className={cx('font-(family-name:--fd) text-[22px]', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800 }}>{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1"><span className="font-(family-name:--fd) text-[40px] font-black leading-none">{money(p.price)}</span><span className="text-[14px] opacity-60">/ {p.period}</span></div>
                <ul className="mt-5 space-y-2 text-[14.5px]">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: t.accent }} />{f}</li>)}</ul>
                <a href={whatsappLink(`¡Hola ${cfg.booking.greet}! Me interesa el plan ${p.name} (${money(p.price)} / ${p.period}). ¿Cómo hago para empezar?`, phone)} target="_blank" rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 py-3.5 font-bold" style={{ background: p.highlight ? t.accent : t.soft, color: p.highlight ? t.accentInk : t.accent, borderRadius: pill(t) }}>
                  <WhatsAppIcon className="h-5 w-5" /> Quiero este plan
                </a>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Horarios de clases */}
      {cfg.schedule && <Schedule cfg={cfg} onBook={open} />}

      {/* Sobre */}
      <Section id="sobre">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <SmartImg src={img(cfg.about.image, 800, 900)} alt={cfg.role} className="aspect-[4/4.4]" style={{ borderRadius: t.shape === 'round' ? '200px 200px 32px 32px' : radius(t, 'lg') }} fallback={`linear-gradient(135deg,${t.soft},${t.accent})`} />
          <div>
            <Kicker t={t}>{cfg.about.kicker}</Kicker>
            <Title t={t} text={cfg.about.title} className="mt-2 text-3xl md:text-5xl" />
            {cfg.about.text.map((p) => <p key={p} className="mt-4 text-[16px] leading-relaxed" style={{ color: t.muted }}>{p}</p>)}
            <ul className="mt-5 space-y-2.5">
              {cfg.about.creds.map((c) => <li key={c} className="flex items-start gap-3 text-[15px] font-semibold"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: t.soft, color: t.accent }}><Check className="h-3.5 w-3.5" /></span>{c}</li>)}
            </ul>
            <Tip className="mt-5 !mx-0">{cfg.tips.about}</Tip>
          </div>
        </div>
      </Section>

      {/* Pasos */}
      {cfg.steps && (
        <Section>
          <Title t={t} text={cfg.steps.title} className="text-3xl md:text-5xl" />
          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {cfg.steps.items.map((s, i) => (
              <li key={s.t} className="border p-5" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
                <div className="font-(family-name:--fd) text-[40px] font-black leading-none" style={{ color: t.accent }}>0{i + 1}</div>
                <div className="mt-3 text-[17px] font-bold">{s.t}</div>
                <p className="mt-1 text-[14.5px] leading-relaxed" style={{ color: t.muted }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Galería */}
      {cfg.gallery && (
        <Section>
          <Title t={t} text={cfg.gallery.title} className="text-3xl md:text-5xl" />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {cfg.gallery.images.map((id, i) => <SmartImg key={id} src={img(id, 500, i % 3 === 0 ? 650 : 500)} alt="" className={i % 3 === 0 ? 'row-span-2 h-full min-h-[260px]' : 'aspect-square'} style={{ borderRadius: radius(t) }} fallback={`linear-gradient(135deg,${t.soft},${t.accent})`} />)}
          </div>
        </Section>
      )}

      {/* Testimonios */}
      <Section>
        <Title t={t} text="Lo que dicen *quienes ya vinieron*" className="text-3xl md:text-5xl" />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {cfg.testimonials.map((r) => (
            <figure key={r.name} className="flex flex-col border p-6" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
              <Quote className="h-7 w-7" style={{ color: t.accent }} />
              <blockquote className="mt-3 flex-1 text-[15.5px] leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-4 flex items-center justify-between text-[14px] font-bold">{r.name}<span className="flex gap-0.5" style={{ color: '#f5a524' }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />)}</span></figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Preguntas */}
      <Section id="preguntas">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Title t={t} text="Preguntas *frecuentes*" className="text-3xl md:text-5xl" />
            <p className="mt-3 text-[15px]" style={{ color: t.muted }}>¿Te quedó alguna duda? Escribinos y te respondemos.</p>
            <a href={whatsappLink(`¡Hola ${cfg.booking.greet}! Tengo una consulta:`, phone)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 bg-[#25d366] px-6 py-3.5 font-bold text-white" style={{ borderRadius: pill(t) }}><WhatsAppIcon className="h-5 w-5" /> Consultar por WhatsApp</a>
          </div>
          <div className="space-y-2">{cfg.faq.map((f) => <Faq key={f.q} f={f} t={t} />)}</div>
        </div>
      </Section>

      {/* Banda final */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-5 p-7 md:flex-row md:items-center md:p-10" style={{ background: t.accent, color: t.accentInk, borderRadius: radius(t, 'lg') }}>
          <div>
            <div className={cx('font-(family-name:--fd) text-3xl leading-tight md:text-4xl', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800, fontStyle: t.italic ? 'italic' : undefined }}>Reservá tu {cfg.booking.noun} en un minuto.</div>
            <p className="mt-1 opacity-80">Elegís día y horario, y nos llega tu pedido por WhatsApp.</p>
          </div>
          <button onClick={() => open()} className="flex shrink-0 items-center gap-2 px-7 py-4 font-bold" style={{ background: t.accentInk, color: t.accent, borderRadius: pill(t) }}><CalendarCheck className="h-5 w-5" /> {cfg.booking.cta}</button>
        </div>
      </Section>

      <InfoFooter t={t} name={cfg.name} info={cfg.info} logo={cfg.logo} />

      {!book.open && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 md:hidden" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => open()} className="ml-auto flex items-center gap-2 px-5 py-3.5 font-bold shadow-2xl" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}><CalendarCheck className="h-5 w-5" /> {cfg.booking.cta}</button>
        </div>
      )}

      <BookingSheet cfg={cfg} open={book.open} initial={book.service} onClose={() => setBook({ open: false })} phone={phone} />
    </DemoShell>
  )
}

function Hero({ cfg, onBook }: { cfg: BookingConfig; onBook: () => void }) {
  const t = cfg.theme, h = cfg.hero
  const body = (light: boolean) => (
    <>
      <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 text-[12.5px] font-bold" style={{ background: light ? 'rgba(255,255,255,.15)' : t.soft, color: light ? '#fff' : t.accent, borderRadius: pill(t) }}>{h.kicker}</div>
      <Title as="h1" t={t} text={h.title} className="animate-fade-up mt-4 text-[42px] leading-[0.98] md:text-[64px]" style={{ animationDelay: '80ms', color: light ? '#fff' : undefined }} onDark={light} />
      <p className="animate-fade-up mt-4 max-w-lg text-[16.5px] leading-relaxed" style={{ animationDelay: '160ms', color: light ? 'rgba(255,255,255,.8)' : t.muted }}>{h.text}</p>
      <div className="animate-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
        <button onClick={onBook} className="flex items-center gap-2 px-7 py-4 font-bold transition active:scale-95" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}><CalendarCheck className="h-5 w-5" /> {cfg.booking.cta}</button>
        <a href="#servicios" className="px-6 py-4 font-bold" style={{ border: `1.5px solid ${light ? 'rgba(255,255,255,.4)' : t.line}`, color: light ? '#fff' : t.ink, borderRadius: pill(t) }}>Ver servicios</a>
      </div>
      {h.stats && (
        <div className="animate-fade-up mt-8 flex flex-wrap gap-6" style={{ animationDelay: '320ms' }}>
          {h.stats.map((s) => <div key={s.l}><div className="font-(family-name:--fd) text-[30px] font-black leading-none" style={{ color: light ? '#fff' : t.ink }}>{s.v}</div><div className="mt-1 text-[13px]" style={{ color: light ? 'rgba(255,255,255,.7)' : t.muted }}>{s.l}</div></div>)}
        </div>
      )}
    </>
  )
  if (h.layout === 'full')
    return (
      <section id="top" className="relative">
        <SmartImg src={img(h.image, 1600, 1000)} alt="" eager className="absolute inset-0 h-full w-full" fallback={`linear-gradient(135deg,${t.accent},${t.dark})`} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${t.dark}f2 0%, ${t.dark}b3 45%, ${t.dark}33 100%)` }} />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-32"><div className="max-w-xl">{body(true)}</div></div>
      </section>
    )
  if (h.layout === 'editorial')
    return (
      <section id="top" className="mx-auto grid max-w-6xl items-end gap-8 px-4 pt-10 md:grid-cols-[1.2fr_1fr] md:pt-16">
        <div className="pb-2">{body(false)}</div>
        <div className="relative">
          <div className="absolute -left-3 -top-3 h-full w-full border" style={{ borderColor: t.accent, borderRadius: radius(t, 'lg') }} />
          <SmartImg src={img(h.image, 800, 1000)} alt="" eager className="relative aspect-[4/5]" style={{ borderRadius: radius(t, 'lg') }} fallback={`linear-gradient(135deg,${t.soft},${t.accent})`} />
        </div>
      </section>
    )
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 md:grid-cols-2 md:pt-14">
      <div>{body(false)}</div>
      <div className="relative">
        <div className="absolute inset-6 -z-0 rotate-3" style={{ background: t.soft, borderRadius: '220px 220px 40px 40px' }} />
        <SmartImg src={img(h.image, 800, 960)} alt="" eager className="relative aspect-[5/6]" style={{ borderRadius: '220px 220px 40px 40px' }} fallback={`linear-gradient(135deg,${t.soft},${t.accent})`} />
      </div>
    </section>
  )
}

function Schedule({ cfg, onBook }: { cfg: BookingConfig; onBook: (s?: string) => void }) {
  const t = cfg.theme, s = cfg.schedule!
  const [day, setDay] = useState(0)
  return (
    <Section>
      <Title t={t} text={s.title} className="text-3xl md:text-5xl" />
      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4">
        {s.days.map((d, i) => <button key={d.day} onClick={() => setDay(i)} className="shrink-0 border px-5 py-2.5 text-[14px] font-bold" style={day === i ? { background: t.ink, color: t.bg, borderColor: t.ink, borderRadius: pill(t) } : { background: t.surface, borderColor: t.line, borderRadius: pill(t) }}>{d.day}</button>)}
      </div>
      <div key={day} className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {s.days[day].classes.map((c, i) => (
          <button key={c.time + c.name} onClick={() => onBook(cfg.services.find((x) => x.name === c.name)?.id)} className="animate-fade-up flex items-center gap-4 border p-4 text-left transition hover:shadow-lg" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t), animationDelay: `${i * 30}ms` }}>
            <span className="font-(family-name:--fd) text-[22px] font-black" style={{ color: t.accent }}>{c.time}</span>
            <span className="flex-1 font-bold">{c.name}</span>
            <ArrowRight className="h-4 w-4" style={{ color: t.muted }} />
          </button>
        ))}
      </div>
    </Section>
  )
}

function Faq({ f, t }: { f: { q: string; a: string }; t: Theme }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold" aria-expanded={open}>{f.q}<ChevronDown className={cx('h-5 w-5 shrink-0 transition', open && 'rotate-180')} /></button>
      {open && <p className="animate-fade-in px-5 pb-5 text-[15px] leading-relaxed" style={{ color: t.muted }}>{f.a}</p>}
    </div>
  )
}

function BookingSheet({ cfg, open, initial, onClose, phone }: { cfg: BookingConfig; open: boolean; initial?: string; onClose: () => void; phone: string }) {
  const t = cfg.theme, b = cfg.booking
  const [step, setStep] = useState(0)
  const [service, setService] = useState<string | undefined>()
  const [mode, setMode] = useState(b.modes?.[0])
  const [dayKey, setDayKey] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [wasOpen, setWasOpen] = useState(false)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) { setService(initial); setStep(initial ? 1 : 0); setDayKey(null); setTime(null) }
  }
  const days = useMemo(() => nextDays(14, b.closedDows), [b.closedDows])
  const day = days.find((d) => d.key === dayKey)
  const slots = dayKey ? slotsFor(dayKey, b.hours[0], b.hours[1], b.step, cfg.slug.length) : []
  const svc = cfg.services.find((s) => s.id === service)
  const msg = svc && day && time
    ? `¡Hola ${b.greet}! Soy ${name.trim() || '…'} y quiero pedir ${b.noun === 'turno' ? 'un turno' : `una ${b.noun}`}:\n\n• ${svc.name}${mode ? ` (${mode})` : ''}\n• ${longDate(day.date)} a las ${time} h\n\n¿Me lo confirman?`
    : ''
  if (!open) return null
  const choice = (active: boolean) => (active ? { background: t.soft, borderColor: t.accent, color: t.accent } : { background: t.surface, borderColor: t.line })
  return (
    <Sheet open onClose={onClose} side="right" label={b.cta} className="bg-white">
      <div className="flex h-full min-h-0 flex-col" style={{ background: t.bg, color: t.ink, fontFamily: t.body, ['--fd' as string]: t.display }}>
        <div className="flex items-center gap-2 border-b px-4 py-4" style={{ borderColor: t.line }}>
          {step > 0 && <button onClick={() => setStep(step - 1)} aria-label="Volver" className="grid h-10 w-10 place-items-center rounded-full" style={{ background: t.surface }}><ChevronLeft className="h-5 w-5" /></button>}
          <Title as="h3" t={t} text={b.cta} className="flex-1 text-2xl" />
          <button onClick={onClose} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full" style={{ background: t.surface }}><X className="h-5 w-5" /></button>
        </div>
        <div className="flex gap-1 px-4 pt-3">{[0, 1, 2].map((i) => <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? t.accent : t.line }} />)}</div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {step === 0 && (
            <div className="space-y-2">
              <div className="text-[13px] font-bold">1. ¿Qué necesitás?</div>
              {cfg.services.map((s) => (
                <button key={s.id} onClick={() => { setService(s.id); setStep(1) }} className="flex w-full items-center gap-3 border p-3.5 text-left" style={{ ...choice(service === s.id), borderRadius: radius(t) }}>
                  <IconBadge icon={s.icon} t={t} size={38} />
                  <span className="min-w-0 flex-1"><span className="block font-bold" style={{ color: t.ink }}>{s.name}</span><span className="block text-[12.5px]" style={{ color: t.muted }}>{[s.duration, s.price ? money(s.price) : s.priceLabel].filter(Boolean).join(' · ')}</span></span>
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div>
              <div className="mb-3 border p-3 text-[14px]" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t, 'sm') === '999px' ? 16 : radius(t, 'sm') }}><b>{svc?.name}</b>{svc?.duration && <span style={{ color: t.muted }}> · {svc.duration}</span>}</div>
              {b.modes && (
                <>
                  <div className="text-[13px] font-bold">Modalidad</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">{b.modes.map((m) => <button key={m} onClick={() => setMode(m)} className="border py-3 text-[14px] font-bold" style={{ ...choice(mode === m), borderRadius: pill(t) }}>{m}</button>)}</div>
                </>
              )}
              <div className="mt-4 text-[13px] font-bold">2. Elegí el día</div>
              <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
                {days.map((d) => (
                  <button key={d.key} disabled={d.closed} onClick={() => { setDayKey(d.key); setTime(null) }} className="w-16 shrink-0 border py-2.5 text-center disabled:opacity-30" style={{ ...choice(dayKey === d.key), borderRadius: radius(t, 'sm') === '999px' ? 18 : radius(t, 'sm') }}>
                    <div className="text-[11px] font-bold uppercase">{d.dow}</div><div className="font-(family-name:--fd) text-[22px] font-black leading-tight">{d.num}</div><div className="text-[11px]">{d.month}</div>
                  </button>
                ))}
              </div>
              {dayKey && (
                <>
                  <div className="mt-4 text-[13px] font-bold">Horarios disponibles</div>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {slots.map((s) => <button key={s.time} disabled={s.taken} onClick={() => { setTime(s.time); setStep(2) }} className="border py-2.5 text-[14px] font-bold disabled:line-through disabled:opacity-30" style={{ ...choice(time === s.time), borderRadius: pill(t) }}>{s.time}</button>)}
                  </div>
                </>
              )}
            </div>
          )}
          {step === 2 && svc && day && time && (
            <div>
              <div className="text-[13px] font-bold">3. Confirmá por WhatsApp</div>
              <div className="mt-2 space-y-1.5 border p-4 text-[15px]" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
                <div><b>{svc.name}</b>{mode && ` · ${mode}`}</div>
                <div>{longDate(day.date)} · <b>{time} h</b></div>
                {(svc.price || svc.priceLabel) && <div style={{ color: t.muted }}>{svc.price ? money(svc.price) : svc.priceLabel}</div>}
              </div>
              <label className="mt-4 block text-[13px] font-bold">Tu nombre
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" className="mt-1.5 w-full border px-4 py-3.5 text-[15px] font-normal outline-none" style={{ background: t.surface, borderColor: t.line, borderRadius: pill(t) === '999px' ? 18 : 4 }} />
              </label>
              <Tip className="mt-4 !mx-0">{cfg.tips.booking}</Tip>
            </div>
          )}
        </div>
        {step === 2 && (
          <div className="border-t p-4" style={{ borderColor: t.line, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <a href={name.trim().length > 1 ? whatsappLink(msg, phone) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={name.trim().length < 2}
              className={cx('flex w-full items-center justify-center gap-2 bg-[#25d366] py-4 font-extrabold text-white transition', name.trim().length < 2 && 'pointer-events-none opacity-40')} style={{ borderRadius: pill(t) }}>
              <WhatsAppIcon className="h-5 w-5" /> {name.trim().length < 2 ? 'Escribí tu nombre' : `Pedir ${b.noun} por WhatsApp`}
            </a>
            <p className="mt-2 text-center text-[12px]" style={{ color: t.muted }}>Se abre WhatsApp con tu pedido y te confirmamos por ahí.</p>
          </div>
        )}
      </div>
    </Sheet>
  )
}
