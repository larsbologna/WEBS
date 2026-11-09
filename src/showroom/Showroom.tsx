import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, LayoutDashboard, CalendarCheck, Search, ShoppingCart, Smartphone, MessageCircle, Sparkles, MapPin, Store, Zap, X } from 'lucide-react'
import { DEMOS, GROUPS, BRAND, type Category, type Group } from '../demos/meta'
import { SmartImg, WhatsAppSim, Reveal } from '../shared/ui'
import { cx, img } from '../shared/format'

export default function Showroom() {
  const [q, setQ] = useState('')
  const [group, setGroupState] = useState<Group>(() => (location.hash.includes('profesionales') ? 'profesional' : 'negocio'))
  const [cat, setCat] = useState<Category | 'Todos'>('Todos')
  const setGroup = (g: Group) => { setGroupState(g); setCat('Todos') }
  const groupInfo = GROUPS.find((g) => g.id === group)!
  const [contact, setContact] = useState(false)

  useEffect(() => {
    document.title = 'Iván | Gestor de Presencia Online — Showroom'
  }, [])

  const list = useMemo(() => {
    const n = norm(q)
    // Al buscar se recorren las dos categorías; si no, se muestra la elegida.
    if (n) return DEMOS.filter((d) => norm(`${d.rubro} ${d.name} ${d.description} ${d.features.join(' ')}`).includes(n))
    return DEMOS.filter((d) => d.group === group && (cat === 'Todos' || d.category === cat))
  }, [q, cat, group])

  return (
    <div className="min-h-dvh bg-[#0b0b12] text-white selection:bg-lime-300 selection:text-black">
      {/* fondo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute -right-32 top-80 h-[380px] w-[380px] rounded-full bg-lime-400/10 blur-[120px]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime-300 font-serif-display text-2xl italic text-black">I</div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">{BRAND.name}</div>
            <div className="text-[12px] text-white/55">{BRAND.tagline}</div>
          </div>
        </div>
        <button onClick={() => setContact(true)} className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-black sm:block">
          Quiero mi web
        </button>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-6 sm:pt-14">
          <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/70">
            <MapPin className="h-3.5 w-3.5 text-lime-300" /> Webs para negocios y profesionales de Berazategui y alrededores
          </div>
          <h1 className="animate-fade-up text-[44px] font-extrabold leading-[0.95] tracking-tight sm:text-7xl" style={{ animationDelay: '80ms' }}>
            Así podría verse <br className="hidden sm:block" />
            <span className="font-serif-display font-normal italic text-lime-300">tu negocio</span> en internet.
          </h1>
          <p className="animate-fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-lg" style={{ animationDelay: '160ms' }}>
            Elegí tu rubro o tu profesión y probá una web real funcionando: pedidos por WhatsApp, turnos online, catálogo con precios y todo lo que tus clientes buscan antes de visitarte.
          </p>
          <div className="animate-fade-up mt-7 grid grid-cols-3 gap-2 sm:max-w-xl" style={{ animationDelay: '240ms' }}>
            {[
              { icon: ShoppingCart, t: 'Pedidos', s: 'sin comisiones' },
              { icon: CalendarCheck, t: 'Turnos', s: 'las 24 hs' },
              { icon: Smartphone, t: 'Pensada', s: 'para celular' },
            ].map(({ icon: I, t, s }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[.04] p-3">
                <I className="mb-2 h-5 w-5 text-lime-300" />
                <div className="text-sm font-bold">{t}</div>
                <div className="text-[12px] text-white/55">{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BUSCADOR + FILTROS */}
        <section id="demos" className="sticky top-0 z-20 border-y border-white/5 bg-[#0b0b12]/85 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-5 py-3">
            <label className="flex items-center gap-2 rounded-2xl bg-white/[.07] px-4 ring-1 ring-white/10 focus-within:ring-lime-300/60">
              <Search className="h-4 w-4 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscá tu rubro o profesión: librería, uñas, odontóloga…"
                className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-white/40"
              />
              {q && <button onClick={() => setQ('')} aria-label="Limpiar"><X className="h-4 w-4 text-white/60" /></button>}
            </label>
            <div className="mt-3 grid grid-cols-2 gap-1 rounded-2xl bg-white/[.06] p-1 ring-1 ring-white/10">
              {GROUPS.map((g) => {
                const I = g.id === 'negocio' ? Store : Briefcase
                const active = group === g.id && !q
                return (
                  <button key={g.id} onClick={() => { setGroup(g.id); setQ('') }} aria-pressed={active}
                    className={cx('flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[14px] font-extrabold transition sm:text-[15px]', active ? 'bg-lime-300 text-black' : 'text-white/75 hover:bg-white/10')}>
                    <I className="h-4 w-4 shrink-0" /><span className="sm:hidden">{g.short}</span><span className="hidden sm:inline">{g.label}</span>
                    <span className={cx('rounded-full px-1.5 text-[11px]', active ? 'bg-black/10' : 'bg-white/10')}>{DEMOS.filter((d) => d.group === g.id).length}</span>
                  </button>
                )
              })}
            </div>
            {!q && (
              <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
                {(['Todos', ...groupInfo.categories] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={cx('shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition', cat === c ? 'bg-white text-black' : 'bg-white/[.06] text-white/75 hover:bg-white/10')}
                  >
                    {c}
                    <span className="ml-1.5 opacity-50">{c === 'Todos' ? DEMOS.filter((d) => d.group === group).length : DEMOS.filter((d) => d.group === group && d.category === c).length}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-6xl px-5 py-8">
          {!q && (
            <div className="mb-5">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{groupInfo.label}</h2>
              <p className="mt-1 text-[14px] text-white/55">{group === 'negocio' ? 'Locales, comercios y servicios con atención al público.' : 'Webs personales para profesionales independientes: consultorios, estudios y más.'}</p>
            </div>
          )}
          {list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center">
              <p className="text-lg font-bold">¿Tu rubro no está?</p>
              <p className="mt-1 text-white/60">Lo diseño a medida. Estas demos son solo una muestra.</p>
              <button onClick={() => { setQ(''); setCat('Todos') }} className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black">Ver todas las demos</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 3) * 70}>
                  <div className="group overflow-hidden rounded-3xl bg-white/[.04] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-lime-300/50">
                  <Link to={`/demo/${d.slug}`} className="block">
                    <div className="relative">
                      <SmartImg src={img(d.image, 700, 460)} alt={`${d.rubro} — ${d.name}`} fallback={d.fallback} className="aspect-[16/10.5] transition duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                        <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" /><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /></span>
                        Demo interactiva
                      </span>
                      <span className="absolute right-3 top-3 font-serif-display text-3xl italic text-white/80">{d.num}</span>
                    </div>
                    <div className="p-5 pt-1">
                      <div className="text-[12px] font-semibold uppercase tracking-[.18em] text-lime-300">{d.rubro}</div>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{d.name}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-white/60">{d.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {d.features.map((f) => (
                          <span key={f} className="rounded-full bg-white/[.06] px-2.5 py-1 text-[11.5px] text-white/70">{f}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                  <div className="grid grid-cols-[1fr_auto] gap-2 px-5 pb-5">
                    <Link to={`/demo/${d.slug}`} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 font-bold text-black transition hover:bg-lime-300">
                      Ver demostración <ArrowUpRight className="h-5 w-5" />
                    </Link>
                    <Link to={`/demo/${d.slug}/admin`} className="flex items-center gap-1.5 rounded-2xl bg-white/[.08] px-3.5 py-3 text-[13px] font-bold text-white ring-1 ring-white/10 transition hover:bg-white/15" aria-label={`Panel de administración de ${d.name}`}>
                      <LayoutDashboard className="h-4 w-4 text-lime-300" /> Panel
                    </Link>
                  </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        {/* BENEFICIOS */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Una web que <span className="font-serif-display font-normal italic text-lime-300">trabaja</span> por vos.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Search, t: 'Te encuentran en Google', d: 'Cuando alguien busca tu rubro en la zona, aparecés vos con fotos, horarios y ubicación.' },
              { icon: MessageCircle, t: 'Consultas por WhatsApp', d: 'Pedidos y consultas llegan ordenados, con todo el detalle. Menos idas y vueltas.' },
              { icon: CalendarCheck, t: 'Turnos sin atender el teléfono', d: 'Tus clientes reservan solos, de día o de noche, mientras vos trabajás.' },
              { icon: Zap, t: 'Sin comisiones de apps', d: 'Tu web es tuya: no pagás un porcentaje por cada venta como en las plataformas.' },
              { icon: LayoutDashboard, t: 'Tu panel de control', d: 'Ganancias, stock, pedidos y pagos del mes en tu celular. Probalo con el botón "Panel" de cada demo.' },
            ].map(({ icon: I, t, d }, i) => (
              <Reveal key={t} delay={i * 60} className="rounded-3xl border border-white/10 bg-white/[.03] p-5">
                <I className="h-6 w-6 text-lime-300" />
                <div className="mt-4 text-lg font-bold">{t}</div>
                <p className="mt-1 text-[14px] leading-relaxed text-white/60">{d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESO */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <Reveal className="overflow-hidden rounded-[32px] bg-lime-300 p-6 text-black sm:p-10">
            <div className="text-[12px] font-bold uppercase tracking-[.2em]">Cómo trabajo</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">De la charla a tu web online, <span className="font-serif-display font-normal italic">fácil.</span></h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Charlamos', 'Me contás qué vendés, cómo atendés y qué te consultan tus clientes.'],
                ['Diseño tu web', 'Con tus fotos, tus precios y tu estilo. Vos revisás y ajustamos.'],
                ['Publicamos', 'Tu web online, conectada a tu WhatsApp, Instagram y Google Maps.'],
              ].map(([t, d], i) => (
                <li key={t} className="rounded-2xl bg-black/[.06] p-5">
                  <div className="font-serif-display text-4xl italic">0{i + 1}</div>
                  <div className="mt-2 text-lg font-extrabold">{t}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-black/70">{d}</p>
                </li>
              ))}
            </ol>
            <button onClick={() => setContact(true)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 font-bold text-white transition active:scale-95">
              <Sparkles className="h-4 w-4 text-lime-300" /> Quiero una web así para mi negocio
            </button>
          </Reveal>
        </section>

        {/* Muestra de collage */}
        <section className="overflow-hidden py-6">
          <div className="animate-marquee flex w-max gap-3">
            {[...DEMOS, ...DEMOS].map((d, i) => (
              <Link key={i} to={`/demo/${d.slug}`} className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl">
                <SmartImg src={img(d.image, 360, 240)} alt={d.rubro} fallback={d.fallback} className="h-full w-full" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-bold">{d.rubro}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto max-w-6xl px-5 pb-28 pt-10 text-[13px] text-white/45">
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <span><b className="text-white/80">{BRAND.name}</b> | {BRAND.tagline} · Berazategui, Buenos Aires</span>
          <span>Los negocios, productos y precios de estas demos son ficticios.</span>
        </div>
      </footer>

      {/* CTA fija móvil */}
      <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/90 to-transparent p-4 pt-8 sm:hidden" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <button onClick={() => setContact(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime-300 py-3.5 font-extrabold text-black shadow-lg shadow-lime-300/20 active:scale-[.98]">
          <MessageCircle className="h-5 w-5" /> Hablemos de tu web
        </button>
      </div>

      <WhatsAppSim
        open={contact}
        onClose={() => setContact(false)}
        business={`${BRAND.name} | Presencia Online`}
        message={'¡Hola Iván! Vi las demos y me interesa una web para mi negocio o profesión. ¿Cuándo podemos charlar?'}
      />
    </div>
  )
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
