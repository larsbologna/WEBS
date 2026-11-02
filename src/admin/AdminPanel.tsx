import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Boxes, CalendarClock, Check, CheckCircle2, ChevronDown, Circle, Clock, ExternalLink, LayoutDashboard, LayoutGrid, Lock, Minus, Plus, Receipt, Search, ShoppingBag, Truck, Wallet, X } from 'lucide-react'
import type { AdminConfig } from './types'
import { generateExpenses, generateSales, dayKeyOf, type Expense, type Sale } from './data'
import { Sheet, toast } from '../shared/ui'
import { safeRead, safeWrite } from '../shared/store'
import { cx, money } from '../shared/format'
import { DEMOS } from '../demos/meta'

type Tab = 'resumen' | 'ventas' | 'stock' | 'pagos'
const INK = '#0f172a', MUTED = '#64748b', LINE = '#e2e8f0', BG = '#f5f7fa'
const STATUS = { good: '#15803d', warn: '#b45309', crit: '#b91c1c', idle: '#64748b' }
const short = (n: number) => (Math.abs(n) >= 1e6 ? `$ ${(n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })} M` : Math.abs(n) >= 1e4 ? `$ ${Math.round(n / 1e3).toLocaleString('es-AR')} mil` : money(n))
const pct = (a: number, b: number) => (b ? ((a - b) / b) * 100 : 0)
const DAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']

/* estado persistido por negocio */
function usePersist<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => safeRead(key, init))
  useEffect(() => safeWrite(key, v), [key, v])
  return [v, setV] as const
}

export default function AdminPanel({ slug, cfg }: { slug: string; cfg: AdminConfig }) {
  const meta = DEMOS.find((d) => d.slug === slug)!
  const [auth, setAuth] = useState(() => { try { return sessionStorage.getItem('admin-auth:' + slug) === '1' } catch { return false } })
  const [tab, setTab] = useState<Tab>('resumen')
  const baseSales = useMemo(() => generateSales(slug, cfg), [slug, cfg])
  const baseExp = useMemo(() => generateExpenses(slug, cfg), [slug, cfg])
  const [statusOv, setStatusOv] = usePersist<Record<string, string>>(`admin:${slug}:status`, {})
  const [paidOv, setPaidOv] = usePersist<Record<string, boolean>>(`admin:${slug}:paid`, {})
  const [customExp, setCustomExp] = usePersist<(Omit<Expense, 'due'> & { due: string })[]>(`admin:${slug}:exp`, [])
  const [stockDelta, setStockDelta] = usePersist<Record<string, number>>(`admin:${slug}:stock`, {})

  useEffect(() => { document.title = `Panel · ${cfg.name}`; window.scrollTo(0, 0) }, [cfg.name])

  const sales = useMemo(() => baseSales.map((s) => (statusOv[s.id] ? { ...s, status: statusOv[s.id] } : s)), [baseSales, statusOv])
  const expenses: Expense[] = useMemo(() => [
    ...baseExp.map((e) => ({ ...e, paid: paidOv[e.id] ?? e.paid })),
    ...customExp.map((e) => ({ ...e, due: new Date(e.due), paid: paidOv[e.id] ?? e.paid })),
  ].sort((a, b) => a.due.getTime() - b.due.getTime()), [baseExp, customExp, paidOv])
  const stock = useMemo(() => cfg.products.map((p) => ({ ...p, stock: Math.max(0, p.stock + (stockDelta[p.name] ?? 0)) })), [cfg.products, stockDelta])

  const ctx = { cfg, sales, expenses, stock, setStatusOv, setPaidOv, setCustomExp, setStockDelta, accent: cfg.accent }

  if (!auth) return <Login cfg={cfg} onIn={() => { try { sessionStorage.setItem('admin-auth:' + slug, '1') } catch { /* sin storage */ } setAuth(true) }} slug={slug} />

  const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'resumen', label: 'Resumen', icon: LayoutDashboard },
    { id: 'ventas', label: cfg.kind === 'shop' ? 'Pedidos' : 'Agenda', icon: cfg.kind === 'shop' ? ShoppingBag : CalendarClock },
    { id: 'stock', label: cfg.kind === 'shop' ? 'Stock' : 'Insumos', icon: Boxes },
    { id: 'pagos', label: 'Pagos', icon: Wallet },
  ]
  const lowCount = stock.filter((p) => p.stock <= p.min).length
  const overdue = expenses.filter((e) => !e.paid && e.due < startOfToday()).length
  const newOrders = cfg.kind === 'shop' ? sales.filter((s) => s.status === 'Nuevo').length : sales.filter((s) => s.dayKey === dayKeyOf(new Date()) && s.status === 'Confirmado').length
  const badge: Partial<Record<Tab, number>> = { ventas: newOrders, stock: lowCount, pagos: overdue }

  return (
    <div className="min-h-dvh overflow-x-clip pb-24 md:pb-10" style={{ background: BG, color: INK, fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg font-extrabold text-white" style={{ background: cfg.accent }}>{cfg.name[0]}</div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate font-extrabold">{cfg.name}</div>
            <div className="text-[12px]" style={{ color: MUTED }}>Panel de administración · {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          </div>
          <Link to={`/demo/${slug}`} className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] font-bold" style={{ borderColor: LINE }}><ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">Ver la web</span><span className="sm:hidden">Web</span></Link>
          <Link to="/showroom" className="hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-bold text-white sm:flex" style={{ background: INK }}><LayoutGrid className="h-4 w-4" /> Showroom</Link>
        </div>
        <nav className="mx-auto hidden max-w-6xl gap-1 px-4 md:flex">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cx('relative flex items-center gap-2 px-4 py-3 text-sm font-bold transition', tab === t.id ? '' : 'text-slate-500 hover:text-slate-800')}>
              <t.icon className="h-4 w-4" /> {t.label}
              {!!badge[t.id] && <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] text-white" style={{ background: t.id === 'ventas' ? cfg.accent : STATUS.crit }}>{badge[t.id]}</span>}
              {tab === t.id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full" style={{ background: cfg.accent }} />}
            </button>
          ))}
        </nav>
      </header>

      <main key={tab} className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4 flex items-center gap-2 rounded-2xl border border-dashed border-violet-400/50 bg-violet-50 px-3 py-2 text-[12.5px] text-violet-900">
          <Lock className="h-4 w-4 shrink-0 text-violet-600" />
          <span><b>Para tu negocio:</b> solo vos ves este panel. Ventas, stock y pagos en un lugar, desde el celular. Datos de ejemplo de {meta.name}.</span>
        </div>
        {tab === 'resumen' && <Resumen {...ctx} go={setTab} />}
        {tab === 'ventas' && (cfg.kind === 'shop' ? <Pedidos {...ctx} /> : <Agenda {...ctx} />)}
        {tab === 'stock' && <Stock {...ctx} />}
        {tab === 'pagos' && <Pagos {...ctx} />}
      </main>

      {/* barra inferior móvil */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-white md:hidden" style={{ borderColor: LINE, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); window.scrollTo(0, 0) }} className="relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold" style={{ color: tab === t.id ? cfg.accent : MUTED }}>
            <t.icon className="h-5 w-5" />{t.label}
            {!!badge[t.id] && <span className="absolute right-[22%] top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] text-white" style={{ background: t.id === 'ventas' ? cfg.accent : STATUS.crit }}>{badge[t.id]}</span>}
          </button>
        ))}
      </nav>
    </div>
  )
}

const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }

type Ctx = {
  cfg: AdminConfig; sales: Sale[]; expenses: Expense[]; stock: AdminConfig['products']; accent: string
  setStatusOv: (f: (s: Record<string, string>) => Record<string, string>) => void
  setPaidOv: (f: (s: Record<string, boolean>) => Record<string, boolean>) => void
  setCustomExp: (f: (s: (Omit<Expense, 'due'> & { due: string })[]) => (Omit<Expense, 'due'> & { due: string })[]) => void
  setStockDelta: (f: (s: Record<string, number>) => Record<string, number>) => void
}

/* ───────────── Login demo ───────────── */
function Login({ cfg, onIn, slug }: { cfg: AdminConfig; onIn: () => void; slug: string }) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="grid min-h-dvh place-items-center px-4" style={{ backgroundColor: BG, backgroundImage: `linear-gradient(160deg, ${cfg.accent}22, transparent 50%)`, color: INK, fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <div className="animate-fade-up w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl" style={{ boxShadow: `0 24px 60px -20px ${cfg.accent}55` }}>
        <div className="grid h-12 w-12 place-items-center rounded-2xl text-xl font-extrabold text-white" style={{ background: cfg.accent }}>{cfg.name[0]}</div>
        <div className="mt-4 text-2xl font-extrabold tracking-tight">{cfg.name}</div>
        <div className="text-sm" style={{ color: MUTED }}>Panel de administración</div>
        <form className="mt-5 space-y-2" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(onIn, 600) }}>
          <label className="block text-[12px] font-bold" htmlFor="adm-user" style={{ color: MUTED }}>Usuario</label>
          <input id="adm-user" defaultValue="dueño@minegocio.com" className="w-full rounded-xl border px-4 py-3 outline-none" style={{ borderColor: LINE }} />
          <label className="block pt-1 text-[12px] font-bold" htmlFor="adm-pass" style={{ color: MUTED }}>Contraseña</label>
          <input id="adm-pass" type="password" defaultValue="demo1234" className="w-full rounded-xl border px-4 py-3 outline-none" style={{ borderColor: LINE }} />
          <button disabled={loading} className="mt-3 w-full rounded-xl py-3.5 font-extrabold text-white transition active:scale-[.98] disabled:opacity-70" style={{ background: cfg.accent }}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
        </form>
        <p className="mt-3 text-center text-[12px]" style={{ color: MUTED }}>Demostración: los datos ya están completos, tocá Ingresar.</p>
        <div className="mt-4 flex justify-center gap-4 text-[13px] font-bold">
          <Link to={`/demo/${slug}`} style={{ color: cfg.accent }}>← Ver la web</Link>
          <Link to="/showroom" style={{ color: MUTED }}>Showroom</Link>
        </div>
      </div>
    </div>
  )
}

/* ───────────── piezas ───────────── */
const Card = ({ children, className, title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) => (
  <section className={cx('rounded-2xl border bg-white p-4', className)} style={{ borderColor: LINE }}>
    {title && <div className="mb-3 flex items-center justify-between gap-2"><h3 className="text-[15px] font-extrabold">{title}</h3>{action}</div>}
    {children}
  </section>
)
function Kpi({ label, value, delta, sub, invert }: { label: string; value: string; delta?: number; sub?: string; invert?: boolean }) {
  const good = delta === undefined ? true : invert ? delta <= 0 : delta >= 0
  return (
    <div className="rounded-2xl border bg-white p-4" style={{ borderColor: LINE }}>
      <div className="text-[12px] font-bold uppercase tracking-wide" style={{ color: MUTED }}>{label}</div>
      <div className="mt-1 text-[22px] font-extrabold tabular-nums tracking-tight sm:text-2xl">{value}</div>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[12px]">
        {delta !== undefined && <span className="flex items-center font-bold" style={{ color: good ? STATUS.good : STATUS.crit }}>{delta >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{Math.abs(delta).toFixed(1).replace('.', ',')}%</span>}
        {sub && <span style={{ color: MUTED }}>{sub}</span>}
      </div>
    </div>
  )
}
export function StatusPill({ kind, label }: { kind: keyof typeof STATUS; label: string }) {
  const I = kind === 'good' ? CheckCircle2 : kind === 'crit' ? AlertTriangle : kind === 'warn' ? Clock : Circle
  return <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-bold" style={{ color: STATUS[kind], background: STATUS[kind] + '14' }}><I className="h-3.5 w-3.5" />{label}</span>
}

/* Gráfico de barras de una serie con tooltip */
function DailyChart({ data, accent, unit }: { data: { label: string; sub: string; value: number; count: number }[]; accent: string; unit: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 640, H = 200, PL = 44, PB = 22, PT = 8
  const max = Math.max(...data.map((d) => d.value), 1)
  const step = niceStep(max / 3)
  const top = Math.ceil(max / step) * step
  const bw = (W - PL) / data.length
  const y = (v: number) => PT + (H - PT - PB) * (1 - v / top)
  const h = hover !== null ? data[hover] : null
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Ingresos por día, últimos 30 días" onMouseLeave={() => setHover(null)}>
        {Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step).map((v) => (
          <g key={v}>
            <line x1={PL} x2={W} y1={y(v)} y2={y(v)} stroke={LINE} strokeWidth="1" />
            <text x={PL - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill={MUTED}>{v === 0 ? '0' : v >= 1e6 ? `${(v / 1e6).toLocaleString('es-AR')}M` : `${Math.round(v / 1e3)}k`}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = PL + i * bw + 1, w = Math.max(2, bw - 2), yy = y(d.value), hh = H - PB - yy
          const r = Math.min(4, w / 2, hh)
          return (
            <g key={i}>
              {d.value > 0 && <path d={`M${x} ${H - PB} V${yy + r} Q${x} ${yy} ${x + r} ${yy} H${x + w - r} Q${x + w} ${yy} ${x + w} ${yy + r} V${H - PB} Z`} fill={accent} opacity={hover === null || hover === i ? 1 : 0.45} />}
              {i % 5 === (data.length - 1) % 5 && <text x={x + w / 2} y={H - 6} textAnchor="middle" fontSize="10" fill={MUTED}>{d.label}</text>}
              <rect x={PL + i * bw} y={0} width={bw} height={H - PB} fill="transparent" onMouseEnter={() => setHover(i)} onClick={() => setHover(i)} />
            </g>
          )
        })}
      </svg>
      {h && (
        <div className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-xl px-3 py-2 text-[12px] text-white shadow-lg" style={{ left: `${Math.min(84, Math.max(16, ((PL + (hover! + 0.5) * bw) / W) * 100))}%`, background: INK }}>
          <div className="font-bold">{h.sub}</div>
          <div className="whitespace-nowrap tabular-nums">{money(h.value)} · {h.count} {unit}</div>
        </div>
      )}
    </div>
  )
}
function niceStep(x: number) { const p = Math.pow(10, Math.floor(Math.log10(x || 1))); const n = x / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p }

function HBars({ rows, accent, fmt = money }: { rows: { label: string; value: number; sub?: string }[]; accent: string; fmt?: (n: number) => string }) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex justify-between gap-3 text-[13px]"><span className="min-w-0 truncate font-semibold">{r.label}</span><span className="shrink-0 tabular-nums" style={{ color: MUTED }}>{r.sub ? `${r.sub} · ` : ''}<b style={{ color: INK }}>{fmt(r.value)}</b></span></div>
          <div className="mt-1 h-2 rounded-full" style={{ background: LINE }}><div className="h-2 rounded-full transition-all duration-700" style={{ width: `${(r.value / max) * 100}%`, background: accent }} /></div>
        </li>
      ))}
    </ul>
  )
}

/* ───────────── Resumen ───────────── */
function Resumen({ cfg, sales, expenses, stock, accent, go }: Ctx & { go: (t: Tab) => void }) {
  const today = startOfToday()
  const cut = new Date(today); cut.setDate(today.getDate() - 29)
  const prevCut = new Date(today); prevCut.setDate(today.getDate() - 59)
  const valid = sales.filter((s) => s.status !== 'Cancelado' && s.status !== 'Ausente')
  const cur = valid.filter((s) => s.date >= cut), prev = valid.filter((s) => s.date >= prevCut && s.date < cut)
  const income = sum(cur, (s) => s.total), prevIncome = sum(prev, (s) => s.total)
  const cogs = cfg.kind === 'shop' ? sum(cur, (s) => s.cost) : 0
  const prevCogs = cfg.kind === 'shop' ? sum(prev, (s) => s.cost) : 0
  const exp = sum(expenses, (e) => e.amount)
  const net = income - cogs - exp, prevNet = prevIncome - prevCogs - exp
  const ticket = cur.length ? income / cur.length : 0, prevTicket = prev.length ? prevIncome / prev.length : 0
  const todayKey = dayKeyOf(today)
  const todaySales = valid.filter((s) => s.dayKey === todayKey)

  const days = Array.from({ length: 30 }, (_, i) => { const d = new Date(cut); d.setDate(cut.getDate() + i); return d })
  const chart = days.map((d) => { const k = dayKeyOf(d); const ss = valid.filter((s) => s.dayKey === k); return { label: `${d.getDate()}/${d.getMonth() + 1}`, sub: `${DAYS[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`, value: sum(ss, (s) => s.total), count: ss.length } })

  const top = new Map<string, { v: number; q: number }>()
  cur.forEach((s) => s.items.forEach((it) => { const t = top.get(it.name) ?? { v: 0, q: 0 }; t.v += it.price * it.qty; t.q += it.qty; top.set(it.name, t) }))
  const topRows = [...top.entries()].sort((a, b) => b[1].v - a[1].v).slice(0, 5).map(([label, t]) => ({ label, value: t.v, sub: `${t.q} u.` }))
  const pays = new Map<string, number>(); cur.forEach((s) => pays.set(s.pay, (pays.get(s.pay) ?? 0) + s.total))
  const payRows = [...pays.entries()].sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value, sub: `${Math.round((value / income) * 100)}%` }))

  const low = stock.filter((p) => p.stock <= p.min)
  const overdue = expenses.filter((e) => !e.paid && e.due < today)
  const soon = expenses.filter((e) => !e.paid && e.due >= today && (e.due.getTime() - today.getTime()) / 864e5 <= 5)

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between"><h2 className="text-2xl font-extrabold tracking-tight">Resumen</h2><span className="text-[12px] font-semibold" style={{ color: MUTED }}>Últimos 30 días vs. 30 anteriores</span></div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Ingresos" value={short(income)} delta={pct(income, prevIncome)} />
        <Kpi label="Ganancia neta" value={short(net)} delta={pct(net, prevNet)} sub={`margen ${Math.round((net / income) * 100)}%`} />
        <Kpi label="Gastos del mes" value={short(exp + cogs)} sub={cfg.kind === 'shop' ? `mercadería ${short(cogs)}` : `${expenses.filter((e) => !e.paid).length} pagos pendientes`} />
        <Kpi label={cfg.kind === 'shop' ? 'Ticket promedio' : 'Turnos'} value={cfg.kind === 'shop' ? money(ticket) : String(cur.length)} delta={cfg.kind === 'shop' ? pct(ticket, prevTicket) : pct(cur.length, prev.length)} sub={cfg.kind === 'shop' ? `${cur.length} ventas` : `promedio ${money(ticket)}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
        <Card title="Ingresos por día" className="lg:col-span-2">
          <DailyChart data={chart} accent={accent} unit={cfg.kind === 'shop' ? 'ventas' : 'turnos'} />
        </Card>
        <Card title="Hoy">
          <div className="text-3xl font-extrabold tabular-nums">{money(sum(todaySales, (s) => s.total))}</div>
          <div className="text-[13px]" style={{ color: MUTED }}>{todaySales.length} {cfg.kind === 'shop' ? 'ventas hasta ahora' : 'turnos en la agenda'}</div>
          <div className="mt-4 space-y-2">
            {(low.length > 0 || overdue.length > 0 || soon.length > 0) ? <>
              {overdue.length > 0 && <button onClick={() => go('pagos')} className="flex w-full items-center gap-2 rounded-xl p-2.5 text-left text-[13px] font-semibold" style={{ background: STATUS.crit + '10', color: STATUS.crit }}><AlertTriangle className="h-4 w-4 shrink-0" /> {overdue.length} pago{overdue.length > 1 ? 's' : ''} vencido{overdue.length > 1 ? 's' : ''} · {money(sum(overdue, (e) => e.amount))}</button>}
              {soon.length > 0 && <button onClick={() => go('pagos')} className="flex w-full items-center gap-2 rounded-xl p-2.5 text-left text-[13px] font-semibold" style={{ background: STATUS.warn + '12', color: STATUS.warn }}><Clock className="h-4 w-4 shrink-0" /> {soon.length} vence{soon.length > 1 ? 'n' : ''} esta semana · {money(sum(soon, (e) => e.amount))}</button>}
              {low.length > 0 && <button onClick={() => go('stock')} className="flex w-full items-center gap-2 rounded-xl p-2.5 text-left text-[13px] font-semibold" style={{ background: STATUS.warn + '12', color: STATUS.warn }}><Boxes className="h-4 w-4 shrink-0" /> {low.length} producto{low.length > 1 ? 's' : ''} con stock bajo</button>}
            </> : <div className="flex items-center gap-2 rounded-xl p-2.5 text-[13px] font-semibold" style={{ background: STATUS.good + '10', color: STATUS.good }}><CheckCircle2 className="h-4 w-4" /> Todo en orden</div>}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title={cfg.kind === 'shop' ? 'Lo más vendido' : 'Servicios que más facturan'}><HBars rows={topRows} accent={accent} /></Card>
        <Card title="Cómo te pagan"><HBars rows={payRows} accent={accent} /></Card>
      </div>

      <Card title="Resultado del mes">
        <div className="space-y-1.5 text-[14px] tabular-nums">
          <Row k="Ingresos por ventas" v={money(income)} />
          {cfg.kind === 'shop' && <Row k="Costo de la mercadería vendida" v={`− ${money(cogs)}`} />}
          {groupBy(expenses, (e) => e.cat).map(([cat, list]) => <Row key={cat} k={cat} v={`− ${money(sum(list, (e) => e.amount))}`} muted />)}
          <div className="flex justify-between border-t pt-2 text-[16px] font-extrabold" style={{ borderColor: LINE, color: net >= 0 ? STATUS.good : STATUS.crit }}><span>Ganancia neta</span><span>{money(net)}</span></div>
        </div>
      </Card>
    </div>
  )
}
const Row = ({ k, v, muted }: { k: string; v: string; muted?: boolean }) => <div className="flex justify-between gap-3"><span style={{ color: muted ? MUTED : INK }}>{k}</span><span className={muted ? '' : 'font-bold'}>{v}</span></div>
const sum = <T,>(a: T[], f: (x: T) => number) => a.reduce((s, x) => s + f(x), 0)
const groupBy = <T,>(a: T[], f: (x: T) => string) => { const m = new Map<string, T[]>(); a.forEach((x) => { const k = f(x); m.set(k, [...(m.get(k) ?? []), x]) }); return [...m.entries()] }

/* ───────────── Pedidos (tiendas) ───────────── */
const FLOW = ['Nuevo', 'Preparando', 'Listo', 'Entregado']
const orderKind = (s: string): keyof typeof STATUS => (s === 'Entregado' ? 'good' : s === 'Cancelado' ? 'crit' : s === 'Nuevo' ? 'warn' : 'idle')
function Pedidos({ sales, setStatusOv, accent }: Ctx) {
  const [filter, setFilter] = useState('Activos')
  const [open, setOpen] = useState<string | null>(null)
  const [limit, setLimit] = useState(15)
  const recent = [...sales].reverse().slice(0, 120)
  const counts = (f: string) => recent.filter((s) => match(s, f)).length
  const match = (s: Sale, f: string) => f === 'Todos' ? true : f === 'Activos' ? ['Nuevo', 'Preparando', 'Listo'].includes(s.status) : s.status === f
  const list = recent.filter((s) => match(s, filter))
  const advance = (s: Sale) => { const nx = FLOW[FLOW.indexOf(s.status) + 1]; if (!nx) return; setStatusOv((o) => ({ ...o, [s.id]: nx })); toast(`Pedido ${s.id}: ${nx}`) }
  const todayKey = dayKeyOf(new Date())
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold tracking-tight">Pedidos</h2>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {['Activos', 'Nuevo', 'Preparando', 'Listo', 'Entregado', 'Todos'].map((f) => (
          <button key={f} onClick={() => { setFilter(f); setLimit(15) }} className={cx('shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-bold transition', filter === f ? 'text-white' : 'bg-white')} style={filter === f ? { background: accent, borderColor: accent } : { borderColor: LINE }}>{f} <span className="opacity-60">{counts(f)}</span></button>
        ))}
      </div>
      {list.length === 0 ? <Card><p className="py-6 text-center font-semibold" style={{ color: MUTED }}>No hay pedidos en este estado. 🎉</p></Card> : (
        <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: LINE }}>
          {list.slice(0, limit).map((s) => (
            <div key={s.id} className="border-b last:border-0" style={{ borderColor: LINE }}>
              <button onClick={() => setOpen(open === s.id ? null : s.id)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><span className="font-extrabold">{s.id}</span><StatusPill kind={orderKind(s.status)} label={s.status} /></div>
                  <div className="truncate text-[13px]" style={{ color: MUTED }}>{s.customer} · {s.dayKey === todayKey ? 'hoy' : `${s.date.getDate()}/${s.date.getMonth() + 1}`} {s.time} · {s.channel}</div>
                </div>
                <div className="text-right"><div className="font-extrabold tabular-nums">{money(s.total)}</div><div className="text-[12px]" style={{ color: MUTED }}>{s.items.reduce((a, b) => a + b.qty, 0)} ítems</div></div>
                <ChevronDown className={cx('h-4 w-4 shrink-0 transition', open === s.id && 'rotate-180')} style={{ color: MUTED }} />
              </button>
              {open === s.id && (
                <div className="animate-fade-in space-y-3 px-4 pb-4">
                  <ul className="space-y-1 rounded-xl p-3 text-[13px]" style={{ background: BG }}>
                    {s.items.map((it) => <li key={it.name} className="flex justify-between gap-2"><span>{it.qty}× {it.name}</span><span className="tabular-nums">{money(it.price * it.qty)}</span></li>)}
                    <li className="flex justify-between border-t pt-1 text-[12px]" style={{ borderColor: LINE, color: MUTED }}><span>Pago: {s.pay}</span><span>Ganancia: {money(s.total - s.cost)}</span></li>
                  </ul>
                  {FLOW.indexOf(s.status) >= 0 && FLOW.indexOf(s.status) < 3 && (
                    <div className="flex gap-2">
                      <button onClick={() => advance(s)} className="flex-1 rounded-xl py-2.5 text-[13px] font-extrabold text-white" style={{ background: accent }}>Marcar como {FLOW[FLOW.indexOf(s.status) + 1].toLowerCase()} →</button>
                      <button onClick={() => { setStatusOv((o) => ({ ...o, [s.id]: 'Cancelado' })); toast(`Pedido ${s.id} cancelado`) }} className="rounded-xl border px-3 text-[13px] font-bold" style={{ borderColor: LINE, color: STATUS.crit }}>Cancelar</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {list.length > limit && <button onClick={() => setLimit((l) => l + 15)} className="w-full py-3 text-[13px] font-bold" style={{ color: accent }}>Ver más ({list.length - limit})</button>}
        </div>
      )}
    </div>
  )
}

/* ───────────── Agenda (servicios) ───────────── */
const apptKind = (s: string): keyof typeof STATUS => (s === 'Atendido' ? 'good' : s === 'Ausente' ? 'crit' : 'warn')
function Agenda({ cfg, sales, setStatusOv, accent }: Ctx) {
  const keys = [...new Set(sales.map((s) => s.dayKey))].slice(-7).reverse()
  const [day, setDay] = useState(keys[0])
  const [who, setWho] = useState('Todos')
  const list = sales.filter((s) => s.dayKey === day && (who === 'Todos' || s.staff === who))
  const todayKey = dayKeyOf(new Date())
  const cut = new Date(); cut.setDate(cut.getDate() - 29); cut.setHours(0, 0, 0, 0)
  const byStaff = (cfg.staff ?? []).map((st) => { const ss = sales.filter((s) => s.staff === st && s.date >= cut && s.status === 'Atendido'); return { label: st, value: sum(ss, (s) => s.total), sub: `${ss.length} turnos` } }).sort((a, b) => b.value - a.value)
  const set = (s: Sale, st: string) => { setStatusOv((o) => ({ ...o, [s.id]: st })); toast(`${s.customer}: ${st.toLowerCase()}`) }
  const absent = sales.filter((s) => s.date >= cut && s.status === 'Ausente').length
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold tracking-tight">Agenda</h2>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {keys.map((k) => { const d = new Date(k + 'T12:00'); return (
          <button key={k} onClick={() => setDay(k)} className={cx('flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2 transition', day === k ? 'text-white' : 'bg-white')} style={day === k ? { background: accent, borderColor: accent } : { borderColor: LINE }}>
            <span className="text-[11px] font-bold uppercase">{k === todayKey ? 'Hoy' : DAYS[d.getDay()]}</span><span className="text-xl font-extrabold">{d.getDate()}</span>
          </button>) })}
      </div>
      {cfg.staff && <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">{['Todos', ...cfg.staff].map((s) => <button key={s} onClick={() => setWho(s)} className={cx('shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-bold', who === s ? 'text-white' : 'bg-white')} style={who === s ? { background: INK, borderColor: INK } : { borderColor: LINE }}>{s}</button>)}</div>}
      <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
        <div className="overflow-hidden rounded-2xl border bg-white lg:col-span-2" style={{ borderColor: LINE }}>
          <div className="flex justify-between border-b px-4 py-3 text-[13px]" style={{ borderColor: LINE }}><b>{list.length} turnos</b><span className="tabular-nums" style={{ color: MUTED }}>Facturación: <b style={{ color: INK }}>{money(sum(list.filter((s) => s.status !== 'Ausente'), (s) => s.total))}</b></span></div>
          {list.length === 0 && <p className="py-8 text-center font-semibold" style={{ color: MUTED }}>Sin turnos este día.</p>}
          {list.map((s) => (
            <div key={s.id} className="flex items-center gap-3 border-b px-4 py-3 last:border-0" style={{ borderColor: LINE }}>
              <div className="w-12 shrink-0 text-center font-extrabold tabular-nums">{s.time}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-bold">{s.customer}</div>
                <div className="truncate text-[12.5px]" style={{ color: MUTED }}>{s.items.map((i) => i.name).join(' + ')}{s.staff ? ` · ${s.staff}` : ''}</div>
                <div className="mt-1 flex items-center gap-2"><StatusPill kind={apptKind(s.status)} label={s.status} /><span className="text-[12px] font-bold tabular-nums">{money(s.total)}</span></div>
              </div>
              {s.status === 'Confirmado' ? (
                <div className="flex shrink-0 flex-col gap-1">
                  <button onClick={() => set(s, 'Atendido')} className="rounded-lg px-2.5 py-1.5 text-[12px] font-extrabold text-white" style={{ background: STATUS.good }}>Atendido</button>
                  <button onClick={() => set(s, 'Ausente')} className="rounded-lg border px-2.5 py-1 text-[12px] font-bold" style={{ borderColor: LINE, color: STATUS.crit }}>Ausente</button>
                </div>
              ) : <button onClick={() => set(s, 'Confirmado')} className="shrink-0 text-[12px] font-bold underline" style={{ color: MUTED }}>Deshacer</button>}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {byStaff.length > 0 && <Card title="Facturación por profesional"><HBars rows={byStaff} accent={accent} /></Card>}
          <Card title="Ausencias del mes">
            <div className="text-3xl font-extrabold">{absent}</div>
            <p className="text-[13px]" style={{ color: MUTED }}>Con recordatorios automáticos por WhatsApp se reducen los clientes que no vienen.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ───────────── Stock ───────────── */
function Stock({ cfg, stock, setStockDelta, setCustomExp, accent }: Ctx) {
  const [q, setQ] = useState('')
  const [onlyLow, setOnlyLow] = useState(false)
  const [order, setOrder] = useState<AdminConfig['products'][number] | null>(null)
  const [qty, setQty] = useState(10)
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const list = stock.filter((p) => (!onlyLow || p.stock <= p.min) && (!q || norm(p.name + p.cat).includes(norm(q))))
  const value = sum(stock, (p) => p.stock * p.cost)
  const low = stock.filter((p) => p.stock <= p.min).length
  const adj = (name: string, d: number) => setStockDelta((s) => ({ ...s, [name]: (s[name] ?? 0) + d }))
  const isShop = cfg.kind === 'shop'
  const confirmOrder = () => {
    if (!order) return
    const due = new Date(); due.setDate(due.getDate() + 7)
    setCustomExp((e) => [...e, { id: `c${Date.now()}`, concept: `Reposición: ${order.name} (${qty} ${order.unit ?? 'u.'})`, cat: 'Proveedores', amount: qty * order.cost, due: due.toISOString(), provider: 'Proveedor habitual', paid: false, custom: true }])
    adj(order.name, qty); toast(`Pedido cargado: ${qty} ${order.unit ?? 'u.'} de ${order.name}. Pago agregado a Pagos.`); setOrder(null)
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold tracking-tight">{isShop ? 'Stock' : 'Insumos'}</h2>
      <div className="grid grid-cols-3 gap-3">
        <Kpi label={isShop ? 'Productos' : 'Insumos'} value={String(stock.length)} sub={`${sum(stock, (p) => p.stock)} unidades`} />
        <Kpi label="Valor (costo)" value={short(value)} />
        <Kpi label="Stock bajo" value={String(low)} sub={low ? 'para reponer' : 'todo ok'} />
      </div>
      <div className="flex gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border bg-white px-3" style={{ borderColor: LINE }}><Search className="h-4 w-4 shrink-0" style={{ color: MUTED }} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar producto…" className="h-11 w-full min-w-0 bg-transparent text-[15px] outline-none" /></label>
        <button onClick={() => setOnlyLow(!onlyLow)} className={cx('shrink-0 rounded-xl border px-3 text-[13px] font-bold', onlyLow ? 'text-white' : 'bg-white')} style={onlyLow ? { background: STATUS.warn, borderColor: STATUS.warn } : { borderColor: LINE }}>Stock bajo</button>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: LINE }}>
        {list.length === 0 && <p className="py-8 text-center font-semibold" style={{ color: MUTED }}>Nada para mostrar.</p>}
        {list.map((p) => {
          const lowP = p.stock <= p.min
          const margin = isShop ? Math.round(((p.price - p.cost) / p.price) * 100) : 0
          return (
            <div key={p.name} className="flex items-center gap-3 border-b px-4 py-3 last:border-0" style={{ borderColor: LINE }}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><span className="truncate font-bold">{p.name}</span>{lowP && <StatusPill kind={p.stock === 0 ? 'crit' : 'warn'} label={p.stock === 0 ? 'Sin stock' : 'Bajo'} />}</div>
                <div className="text-[12.5px] tabular-nums" style={{ color: MUTED }}>{p.cat} · costo {money(p.cost)}{isShop && <> · venta {money(p.price)} · <b style={{ color: STATUS.good }}>margen {margin}%</b></>}</div>
                <div className="mt-1.5 h-1.5 w-full max-w-48 rounded-full" style={{ background: LINE }}><div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, (p.stock / (p.min * 3 || 1)) * 100)}%`, background: lowP ? STATUS.warn : accent }} /></div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <div className="flex items-center rounded-lg border" style={{ borderColor: LINE }}>
                  <button onClick={() => adj(p.name, -1)} disabled={p.stock === 0} className="grid h-8 w-8 place-items-center disabled:opacity-30" aria-label={`Restar ${p.name}`}><Minus className="h-3.5 w-3.5" /></button>
                  <span className="min-w-9 text-center text-[14px] font-extrabold tabular-nums">{p.stock}</span>
                  <button onClick={() => adj(p.name, 1)} className="grid h-8 w-8 place-items-center" aria-label={`Sumar ${p.name}`}><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => { setOrder(p); setQty(Math.max(p.min * 2, 5)) }} className="flex items-center gap-1 text-[12px] font-bold" style={{ color: accent }}><Truck className="h-3.5 w-3.5" /> Pedir</button>
              </div>
            </div>
          )
        })}
      </div>
      <Sheet open={!!order} onClose={() => setOrder(null)} className="bg-white" label="Pedido al proveedor">
        {order && (
          <div className="p-5" style={{ fontFamily: 'Manrope, sans-serif', color: INK }}>
            <div className="flex items-center justify-between"><div className="text-xl font-extrabold">Pedir al proveedor</div><button onClick={() => setOrder(null)} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
            <p className="mt-1 text-sm" style={{ color: MUTED }}>{order.name} · stock actual {order.stock} · mínimo {order.min}</p>
            <div className="mt-5 flex items-center justify-between rounded-2xl p-3" style={{ background: BG }}>
              <button onClick={() => setQty((x) => Math.max(1, x - 5))} className="grid h-11 w-11 place-items-center rounded-xl bg-white" aria-label="Menos"><Minus className="h-4 w-4" /></button>
              <div className="text-center"><div className="text-3xl font-extrabold tabular-nums">{qty}</div><div className="text-[12px]" style={{ color: MUTED }}>{order.unit ?? 'unidades'}</div></div>
              <button onClick={() => setQty((x) => x + 5)} className="grid h-11 w-11 place-items-center rounded-xl bg-white" aria-label="Más"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 flex justify-between text-[15px]"><span>Total a pagar (a 7 días)</span><b className="tabular-nums">{money(qty * order.cost)}</b></div>
            <button onClick={confirmOrder} className="mt-4 w-full rounded-xl py-3.5 font-extrabold text-white" style={{ background: accent, marginBottom: 'env(safe-area-inset-bottom)' }}>Confirmar pedido</button>
          </div>
        )}
      </Sheet>
    </div>
  )
}

/* ───────────── Pagos ───────────── */
function payStatus(e: Expense): { kind: keyof typeof STATUS; label: string } {
  const t = startOfToday()
  if (e.paid) return { kind: 'good', label: 'Pagado' }
  if (e.due < t) return { kind: 'crit', label: 'Vencido' }
  if ((e.due.getTime() - t.getTime()) / 864e5 <= 5) return { kind: 'warn', label: 'Por vencer' }
  return { kind: 'idle', label: 'Pendiente' }
}
function Pagos({ expenses, setPaidOv, setCustomExp, accent }: Ctx) {
  const [filter, setFilter] = useState('Todos')
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ concept: '', cat: 'Proveedores', amount: '', due: dayKeyOf(new Date()) })
  const total = sum(expenses, (e) => e.amount), paid = sum(expenses.filter((e) => e.paid), (e) => e.amount)
  const overdue = expenses.filter((e) => payStatus(e).kind === 'crit')
  const list = expenses.filter((e) => filter === 'Todos' || payStatus(e).label === filter || (filter === 'Pendientes' && !e.paid))
  const toggle = (e: Expense) => { setPaidOv((o) => ({ ...o, [e.id]: !e.paid })); toast(e.paid ? 'Marcado como pendiente' : `${e.concept}: pagado`) }
  const cats = groupBy(expenses, (e) => e.cat).map(([label, l]) => ({ label, value: sum(l, (e) => e.amount) })).sort((a, b) => b.value - a.value)
  const valid = form.concept.trim().length > 2 && +form.amount > 0
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-extrabold tracking-tight">Pagos del mes</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13px] font-extrabold text-white" style={{ background: accent }}><Plus className="h-4 w-4" /> Nuevo gasto</button>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Total del mes" value={short(total)} sub={`${expenses.length} conceptos`} />
        <Kpi label="Pagado" value={short(paid)} sub={`${Math.round((paid / total) * 100)}%`} />
        <Kpi label="Pendiente" value={short(total - paid)} />
        <Kpi label="Vencido" value={short(sum(overdue, (e) => e.amount))} sub={`${overdue.length} pagos`} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
        <div className="space-y-3 lg:col-span-2">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {['Todos', 'Pendientes', 'Vencido', 'Por vencer', 'Pagado'].map((f) => <button key={f} onClick={() => setFilter(f)} className={cx('shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-bold', filter === f ? 'text-white' : 'bg-white')} style={filter === f ? { background: INK, borderColor: INK } : { borderColor: LINE }}>{f}</button>)}
          </div>
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: LINE }}>
            {list.length === 0 && <p className="py-8 text-center font-semibold" style={{ color: MUTED }}>Nada en este filtro.</p>}
            {list.map((e) => { const st = payStatus(e); return (
              <div key={e.id} className="flex items-center gap-3 border-b px-4 py-3 last:border-0" style={{ borderColor: LINE }}>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: BG }}><Receipt className="h-5 w-5" style={{ color: MUTED }} /></div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{e.concept}</div>
                  <div className="truncate text-[12.5px]" style={{ color: MUTED }}>{e.cat}{e.provider ? ` · ${e.provider}` : ''} · vence {e.due.getDate()}/{e.due.getMonth() + 1}</div>
                  <div className="mt-1"><StatusPill {...st} /></div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="font-extrabold tabular-nums">{money(e.amount)}</span>
                  <button onClick={() => toggle(e)} className={cx('flex items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] font-bold', e.paid ? 'border' : 'text-white')} style={e.paid ? { borderColor: LINE, color: MUTED } : { background: STATUS.good }}>{e.paid ? 'Deshacer' : <><Check className="h-3.5 w-3.5" /> Pagar</>}</button>
                </div>
              </div>) })}
          </div>
        </div>
        <Card title="Gastos por categoría"><HBars rows={cats} accent={accent} /></Card>
      </div>
      <Sheet open={adding} onClose={() => setAdding(false)} className="bg-white" label="Nuevo gasto">
        <form className="space-y-3 p-5" style={{ fontFamily: 'Manrope, sans-serif', color: INK }} onSubmit={(ev) => {
          ev.preventDefault(); if (!valid) return
          setCustomExp((x) => [...x, { id: `c${Date.now()}`, concept: form.concept.trim(), cat: form.cat, amount: +form.amount, due: new Date(form.due + 'T12:00').toISOString(), paid: false, custom: true }])
          toast('Gasto agregado'); setAdding(false); setForm({ concept: '', cat: 'Proveedores', amount: '', due: dayKeyOf(new Date()) })
        }}>
          <div className="flex items-center justify-between"><div className="text-xl font-extrabold">Nuevo gasto</div><button type="button" onClick={() => setAdding(false)} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
          <label className="block text-[12px] font-bold" style={{ color: MUTED }} htmlFor="g-concept">Concepto</label>
          <input id="g-concept" value={form.concept} onChange={(e) => setForm({ ...form, concept: e.target.value })} placeholder="Ej: Factura de gas" className="w-full rounded-xl border px-4 py-3 outline-none" style={{ borderColor: LINE }} />
          <label className="block text-[12px] font-bold" style={{ color: MUTED }} htmlFor="g-cat">Categoría</label>
          <select id="g-cat" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} className="w-full rounded-xl border bg-white px-4 py-3" style={{ borderColor: LINE }}>{['Alquiler', 'Proveedores', 'Servicios', 'Sueldos', 'Impuestos', 'Otros'].map((c) => <option key={c}>{c}</option>)}</select>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-[12px] font-bold" style={{ color: MUTED }} htmlFor="g-amount">Monto</label><input id="g-amount" inputMode="numeric" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value.replace(/\D/g, '') })} placeholder="$" className="mt-1 w-full rounded-xl border px-4 py-3 outline-none" style={{ borderColor: LINE }} /></div>
            <div><label className="block text-[12px] font-bold" style={{ color: MUTED }} htmlFor="g-due">Vence</label><input id="g-due" type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="mt-1 w-full rounded-xl border bg-white px-3 py-3" style={{ borderColor: LINE }} /></div>
          </div>
          <button disabled={!valid} className="w-full rounded-xl py-3.5 font-extrabold text-white disabled:opacity-40" style={{ background: accent, marginBottom: 'env(safe-area-inset-bottom)' }}>Guardar gasto</button>
        </form>
      </Sheet>
    </div>
  )
}
