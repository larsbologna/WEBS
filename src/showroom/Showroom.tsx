import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Boxes, Briefcase, LayoutDashboard, CalendarCheck, Search, MessageCircle, Sparkles, MapPin, Store, Wallet, X, TrendingUp, Globe } from 'lucide-react'
import { DEMOS, GROUPS, BRAND, type Category, type Group } from '../demos/meta'
import { SmartImg, WhatsAppSim, Reveal } from '../shared/ui'
import { cx, img } from '../shared/format'
import { verticalOf } from '../admin/verticals'
import { KIND } from '../admin/kinds'

export default function Showroom() {
  const [q, setQ] = useState('')
  const [group, setGroupState] = useState<Group>(() => (location.hash.includes('profesionales') ? 'profesional' : 'negocio'))
  const [cat, setCat] = useState<Category | 'Todos'>('Todos')
  const setGroup = (g: Group) => { setGroupState(g); setCat('Todos') }
  const groupInfo = GROUPS.find((g) => g.id === group)!
  const [contact, setContact] = useState(false)

  useEffect(() => {
    document.title = 'Iván | Sistema de gestión para negocios — Showroom'
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
          Quiero el panel
        </button>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-6 sm:pt-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
          <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/70">
            <MapPin className="h-3.5 w-3.5 text-lime-300" /> Sistema de gestión para negocios y profesionales
          </div>
          <h1 className="animate-fade-up text-[44px] font-extrabold leading-[0.95] tracking-tight sm:text-7xl" style={{ animationDelay: '80ms' }}>
            Tu negocio, <br className="hidden sm:block" />
            <span className="font-serif-display font-normal italic text-lime-300">ordenado</span> en un solo panel.
          </h1>
          <p className="animate-fade-up mt-5 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-lg" style={{ animationDelay: '160ms' }}>
            Agenda de turnos, pedidos, stock, gastos y ganancias desde el celular, adaptado a tu rubro. Elegí el tuyo y probá el panel funcionando. Y si querés, sumale tu web con pedidos y turnos por WhatsApp.
          </p>
          <div className="animate-fade-up mt-7 grid grid-cols-3 gap-2 sm:max-w-xl" style={{ animationDelay: '240ms' }}>
            {[
              { icon: CalendarCheck, t: 'Agenda', s: 'turnos y recordatorios' },
              { icon: Wallet, t: 'Finanzas', s: 'tu ganancia real' },
              { icon: Boxes, t: 'Stock', s: 'avisos de reposición' },
            ].map(({ icon: I, t, s }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[.04] p-3">
                <I className="mb-2 h-5 w-5 text-lime-300" />
                <div className="text-sm font-bold">{t}</div>
                <div className="text-[12px] text-white/55">{s}</div>
              </div>
            ))}
          </div>
          </div>
          <PanelPreview />
        </section>

        {/* BUSCADOR + FILTROS */}
        <section id="demos" className="sticky top-0 z-20 border-y border-white/5 bg-[#0b0b12]/85 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-5 py-3">
            <label className="flex items-center gap-2 rounded-2xl bg-white/[.07] px-4 ring-1 ring-white/10 focus-within:ring-lime-300/60">
              <Search className="h-4 w-4 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscá tu rubro o profesión: barbería, veterinaria, contador…"
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
                  <Link to={`/demo/${d.slug}/admin`} className="block">
                    <div className="relative">
                      <SmartImg src={img(d.image, 700, 460)} alt={`${d.rubro} — ${d.name}`} fallback={d.fallback} className="aspect-[16/10.5] transition duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/10 to-transparent" />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                        <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" /><span className="h-1.5 w-1.5 rounded-full bg-lime-300" /></span>
                        Panel + web
                      </span>
                      <span className="absolute right-3 top-3 font-serif-display text-3xl italic text-white/80">{d.num}</span>
                    </div>
                    <div className="p-5 pt-1">
                      <div className="text-[12px] font-semibold uppercase tracking-[.18em] text-lime-300">{d.rubro}</div>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{d.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {panelModules(d.slug).map((m, j) => (
                          <span key={m} className={cx('rounded-full px-2.5 py-1 text-[11.5px] font-bold', j === 0 ? 'bg-lime-300 text-black' : 'bg-white/[.08] text-white/80')}>{m}</span>
                        ))}
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-white/50"><span className="font-bold text-white/70">Web incluida:</span> {d.description}</p>
                    </div>
                  </Link>
                  <div className="grid grid-cols-[1fr_auto] gap-2 px-5 pb-5">
                    <Link to={`/demo/${d.slug}/admin`} className="flex items-center justify-between rounded-2xl bg-lime-300 px-4 py-3 font-extrabold text-black transition hover:bg-white">
                      <span className="flex items-center gap-2"><LayoutDashboard className="h-5 w-5" /> Probar el panel</span> <ArrowUpRight className="h-5 w-5" />
                    </Link>
                    <Link to={`/demo/${d.slug}`} className="flex items-center gap-1.5 rounded-2xl bg-white/[.08] px-3.5 py-3 text-[13px] font-bold text-white ring-1 ring-white/10 transition hover:bg-white/15" aria-label={`Web de ${d.name}`}>
                      <Globe className="h-4 w-4 text-lime-300" /> Web
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
              Un sistema que <span className="font-serif-display font-normal italic text-lime-300">trabaja</span> por vos.
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] text-white/60">Dejá el cuaderno, el Excel y las notas del celular. Todo tu negocio en un panel simple, armado para tu rubro.</p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: CalendarCheck, t: 'Agenda que no se te escapa', d: 'Turnos por profesional, quién viene y quién faltó, recordatorios por WhatsApp y huecos libres para ofrecer.' },
              { icon: TrendingUp, t: 'Sabés cuánto ganás', d: 'Ingresos, gastos y ganancia neta del mes, comparados con el mes anterior. Sin hacer cuentas.' },
              { icon: Wallet, t: 'Ningún pago vencido', d: 'Alquiler, proveedores, sueldos e impuestos con aviso antes de que venzan.' },
              { icon: Boxes, t: 'Stock e insumos al día', d: 'Te avisa lo que se está terminando y cargás el pedido al proveedor en un toque.' },
              { icon: Globe, t: 'Y tu web, si la querés', d: 'Una web con tus servicios y precios, conectada a tu WhatsApp para recibir pedidos y turnos.' },
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
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">De la charla a tu negocio ordenado, <span className="font-serif-display font-normal italic">fácil.</span></h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Charlamos', 'Me contás cómo trabajás: tus servicios o productos, tu equipo, tus gastos fijos.'],
                ['Armo tu panel', 'Cargado con tus precios, tus profesionales y tu stock. Y tu web, si la querés.'],
                ['Te acompaño', 'Te enseño a usarlo en una charla y quedo a mano para lo que necesites.'],
              ].map(([t, d], i) => (
                <li key={t} className="rounded-2xl bg-black/[.06] p-5">
                  <div className="font-serif-display text-4xl italic">0{i + 1}</div>
                  <div className="mt-2 text-lg font-extrabold">{t}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-black/70">{d}</p>
                </li>
              ))}
            </ol>
            <button onClick={() => setContact(true)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 font-bold text-white transition active:scale-95">
              <Sparkles className="h-4 w-4 text-lime-300" /> Quiero el panel para mi negocio
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
          <MessageCircle className="h-5 w-5" /> Quiero el panel para mi negocio
        </button>
      </div>

      <WhatsAppSim
        open={contact}
        onClose={() => setContact(false)}
        business={`${BRAND.name} | Presencia Online`}
        message={'¡Hola Iván! Vi las demos y me interesa el panel de gestión para mi negocio. ¿Cuándo podemos charlar?'}
      />
    </div>
  )
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Módulos del panel de cada rubro, para mostrar en la tarjeta */
function panelModules(slug: string) {
  const v = verticalOf(slug)
  return KIND(slug) === 'shop' ? [v.ordersTitle!, v.stockTitle!, 'Finanzas', 'Pagos'] : [v.tab, 'Finanzas', 'Insumos', 'Pagos']
}

/** Vista previa decorativa del panel en la portada (lleva a la demo real) */
function PanelPreview() {
  const bars = [38, 52, 44, 61, 57, 70, 49, 66, 74, 69, 82, 91]
  const next = [['16:30', 'Lucía Fernández', 'Fade / degradé', '#6366f1'], ['17:00', 'Martín Gómez', 'Corte + barba', '#f97316'], ['17:30', 'Sofía Romero', 'Barba completa', '#10b981']]
  return (
    <Link to="/demo/barberia/admin" className="group relative hidden lg:block" aria-label="Probar el panel de una barbería">
      <div className="absolute -inset-6 rounded-[40px] bg-lime-300/10 blur-2xl" />
      <div className="relative rotate-[1.5deg] rounded-[28px] bg-[#f5f7fa] p-4 text-slate-900 shadow-2xl ring-1 ring-white/20 transition duration-500 group-hover:rotate-0" style={{ fontFamily: 'Manrope, sans-serif' }} aria-hidden>
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#a07c2c] font-extrabold text-white">A</div>
          <div className="leading-tight"><div className="text-[14px] font-extrabold">Aurum Barber Club</div><div className="text-[11px] text-slate-500">Panel · hoy</div></div>
          <div className="ml-auto flex gap-1">{['Finanzas', 'Agenda', 'Insumos'].map((t, i) => <span key={t} className={cx('rounded-full px-2.5 py-1 text-[10.5px] font-bold', i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-500')}>{t}</span>)}</div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[['Ganancia neta', '$ 2,3 M', '▲ 14%'], ['Ingresos', '$ 6,4 M', '▲ 9%'], ['Turnos hoy', '19', '4 libres']].map(([l, v, d]) => (
            <div key={l} className="rounded-2xl bg-white p-2.5"><div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{l}</div><div className="text-[18px] font-extrabold tabular-nums">{v}</div><div className="text-[10.5px] font-bold text-emerald-600">{d}</div></div>
          ))}
        </div>
        <div className="mt-2 rounded-2xl bg-white p-3">
          <div className="text-[11px] font-extrabold">Ingresos por día</div>
          <div className="mt-2 flex h-20 items-end gap-1.5">{bars.map((h, i) => <div key={i} className="flex-1 rounded-t-md bg-[#a07c2c]" style={{ height: `${h}%`, opacity: i === bars.length - 1 ? 1 : 0.55 + i * 0.03 }} />)}</div>
        </div>
        <div className="mt-2 grid grid-cols-[1.4fr_1fr] gap-2">
          <div className="rounded-2xl bg-white p-3">
            <div className="text-[11px] font-extrabold">Próximos turnos</div>
            {next.map(([t, n, sv, c]) => <div key={t} className="mt-2 flex items-center gap-2"><span className="h-8 w-1 rounded-full" style={{ background: c }} /><span className="w-10 text-[12px] font-extrabold tabular-nums">{t}</span><span className="min-w-0 leading-tight"><span className="block truncate text-[12px] font-bold">{n}</span><span className="block truncate text-[10.5px] text-slate-500">{sv}</span></span></div>)}
          </div>
          <div className="space-y-2">
            <div className="rounded-2xl bg-amber-50 p-2.5 text-[11px] font-bold text-amber-700">⏰ Alquiler vence en 3 días</div>
            <div className="rounded-2xl bg-red-50 p-2.5 text-[11px] font-bold text-red-700">📦 Aceite para barba: quedan 4</div>
            <div className="rounded-2xl bg-emerald-50 p-2.5 text-[11px] font-bold text-emerald-700">✓ 3 recordatorios enviados</div>
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex items-center justify-center gap-2 text-[14px] font-bold text-lime-300">Probá este panel <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div>
    </Link>
  )
}
