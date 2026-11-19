import { useEffect, useMemo, useState } from 'react'
import { AlarmClock, CalendarDays, Check, CheckCircle2, Clock, LayoutList, Rows3, Send, Sparkles, UserX, X } from 'lucide-react'
import type { AdminConfig } from './types'
import type { Sale } from './data'
import { dayKeyOf } from './data'
import { cap, type Vertical } from './verticals'
import { Card, HBars, INK, LINE, MUTED, STATUS, StatusPill, startOfToday, sum } from './ui'
import { Sheet, toast } from '../shared/ui'
import { WhatsAppIcon, whatsappLink } from '../shared/whatsapp'
import { longDate } from '../shared/booking'
import { cx, money } from '../shared/format'

const PALETTE = ['#6366f1', '#f97316', '#10b981', '#ec4899', '#0ea5e9', '#eab308']
const PX = 1.6 // píxeles por minuto en la línea de tiempo
const DOW = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const toMin = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3, 5)
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes() }

type Props = {
  cfg: AdminConfig; v: Vertical; sales: Sale[]; accent: string
  setStatusOv: (f: (s: Record<string, string>) => Record<string, string>) => void
}

export function Agenda({ cfg, v, sales, accent, setStatusOv }: Props) {
  const todayKey = dayKeyOf(new Date())
  const [h0, h1] = cfg.hours ?? [9, 20]
  const staffAll = cfg.staff?.length ? cfg.staff : [cfg.name]
  const color = (st?: string) => PALETTE[Math.max(0, staffAll.indexOf(st ?? cfg.name)) % PALETTE.length]
  const label = (s: string) => (s === 'Atendido' ? v.done : s === 'Ausente' ? v.absent : s)
  const kindOf = (s: string): keyof typeof STATUS => (s === 'Atendido' ? 'good' : s === 'Ausente' ? 'crit' : s === 'A confirmar' ? 'warn' : 'idle')

  // días: 6 para atrás y 6 para adelante, salvo los cerrados
  const days = useMemo(() => {
    const out: Date[] = []
    for (let i = -6; i <= 6; i++) { const d = startOfToday(); d.setDate(d.getDate() + i); if (!cfg.closedDows?.includes(d.getDay())) out.push(d) }
    return out
  }, [cfg.closedDows])
  const firstOpen = days.find((d) => dayKeyOf(d) >= todayKey) ?? days[days.length - 1]
  const [day, setDay] = useState(dayKeyOf(firstOpen))
  const [view, setView] = useState<'timeline' | 'list'>('timeline')
  const [who, setWho] = useState('Todos')
  const [sel, setSel] = useState<Sale | null>(null)
  const [, tick] = useState(0)
  useEffect(() => { const id = setInterval(() => tick((x) => x + 1), 60000); return () => clearInterval(id) }, [])

  const capacity = staffAll.length * (h1 - h0) * 60
  const stats = (k: string) => { const l = sales.filter((s) => s.dayKey === k && s.status !== 'Ausente'); return { n: l.length, occ: Math.min(1, sum(l, (s) => s.min ?? v.duration) / capacity), total: sum(l, (s) => s.total) } }
  const dayList = sales.filter((s) => s.dayKey === day)
  const shown = dayList.filter((s) => who === 'Todos' || s.staff === who || (!s.staff && who === cfg.name))
  const staffShown = who === 'Todos' ? staffAll : [who]
  const st = stats(day)
  const isToday = day === todayKey
  const dayDate = new Date(day + 'T12:00')
  const nm = nowMin()
  const next = isToday ? dayList.filter((s) => s.status !== 'Ausente' && toMin(s.time) >= nm).sort((a, b) => a.time.localeCompare(b.time))[0] : undefined
  const pending = dayList.filter((s) => s.status === 'A confirmar')

  const set = (s: Sale, status: string, msg?: string) => { setStatusOv((o) => ({ ...o, [s.id]: status })); setSel(sel && sel.id === s.id ? { ...sel, status } : sel); toast(msg ?? `${s.customer.split(' ')[0]}: ${label(status).toLowerCase()}`) }
  const reminder = (s: Sale) => whatsappLink(`¡Hola ${s.customer.split(' ')[0]}! Te recordamos tu ${v.unit[0]} de ${s.items.map((i) => i.name).join(' + ')} el ${longDate(new Date(s.dayKey + 'T12:00')).toLowerCase()} a las ${s.time} h en ${cfg.name}. ¿Nos confirmás que venís? 🙌`)

  // huecos libres del día (desde ahora si es hoy)
  const gaps = useMemo(() => {
    const out: { time: string; staff: string }[] = []
    for (const stf of staffAll) {
      const busy = dayList.filter((s) => (s.staff ?? cfg.name) === stf && s.status !== 'Ausente').map((s) => [toMin(s.time), toMin(s.time) + (s.min ?? v.duration)] as const)
      for (let m = h0 * 60; m + v.duration <= h1 * 60; m += 30) {
        if (isToday && m < nm + 15) continue
        if (!busy.some(([a, b]) => m < b && m + v.duration > a)) out.push({ time: hhmm(m), staff: stf })
      }
    }
    return out.sort((a, b) => a.time.localeCompare(b.time))
  }, [dayList, staffAll, h0, h1, v.duration, isToday, nm, cfg.name])
  const gapTimes = [...new Set(gaps.map((g) => g.time))]
  const offer = whatsappLink(`¡Hola! En ${cfg.name} tenemos ${v.unit[1]} libres ${isToday ? 'hoy' : `el ${longDate(dayDate).toLowerCase()}`}: ${gapTimes.slice(0, 6).join(', ')} h. ¿Te reservo uno? 😊`)

  const cut = startOfToday(); cut.setDate(cut.getDate() - 29)
  const month = sales.filter((s) => s.date >= cut && s.date <= startOfToday())
  const absent = month.filter((s) => s.status === 'Ausente').length
  const byStaff = staffAll.map((stf) => { const l = month.filter((s) => (s.staff ?? cfg.name) === stf && s.status === 'Atendido'); return { label: stf, value: sum(l, (s) => s.total), sub: `${l.length} ${v.unit[1]}` } }).sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-4">
      {/* Cabecera del día */}
      <section className="relative overflow-hidden rounded-3xl p-5 text-white md:p-7" style={{ background: `radial-gradient(120% 140% at 100% 0%, ${accent} 0%, ${INK} 62%)` }}>
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20 blur-2xl" style={{ background: accent }} />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.18em] text-white/60"><CalendarDays className="h-4 w-4" /> {v.agendaTitle}</div>
            <h2 className="mt-1 text-[28px] font-extrabold leading-tight tracking-tight md:text-[34px]">{isToday ? 'Hoy, ' : ''}{isToday ? longDate(dayDate).toLowerCase() : longDate(dayDate)}</h2>
            <p className="mt-1 text-[14px] text-white/65">{v.pitch}</p>
          </div>
          <div className="flex items-center gap-4">
            <Ring value={st.occ} color={accent} />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[13px]">
              <div><div className="text-[26px] font-extrabold leading-none tabular-nums">{st.n}</div><div className="text-white/60">{v.unit[1]}</div></div>
              <div><div className="text-[26px] font-extrabold leading-none tabular-nums">{st.total >= 1e6 ? `$${(st.total / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })}M` : `$${Math.round(st.total / 1e3)}k`}</div><div className="text-white/60">estimado</div></div>
            </div>
          </div>
        </div>
        {next ? (
          <button onClick={() => setSel(next)} className="relative mt-5 flex w-full items-center gap-3 rounded-2xl bg-white/10 p-3 text-left ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: color(next.staff) }}><AlarmClock className="h-5 w-5" /><span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-lime-300" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-bold uppercase tracking-wide text-white/60">Próximo · {toMin(next.time) - nm <= 0 ? 'ahora' : `en ${fmtWait(toMin(next.time) - nm)}`}</span>
              <span className="block truncate text-[16px] font-extrabold">{next.time} · {next.customer}</span>
              <span className="block truncate text-[13px] text-white/70">{next.items.map((i) => i.name).join(' + ')}{next.extras?.[0] ? ` · ${next.extras[0].value}` : ''}{next.staff ? ` · ${next.staff}` : ''}</span>
            </span>
          </button>
        ) : isToday ? <div className="relative mt-5 flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-[14px] font-semibold ring-1 ring-white/15"><CheckCircle2 className="h-5 w-5 text-lime-300" /> No quedan {v.unit[1]} por hoy.</div> : null}
        {pending.length > 0 && <div className="relative mt-2 flex items-center gap-2 text-[13px] text-amber-200"><Clock className="h-4 w-4" /> {pending.length} {pending.length === 1 ? v.unit[0] : v.unit[1]} sin confirmar: mandales un recordatorio por WhatsApp.</div>}
      </section>

      {/* Días */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {days.map((d) => {
          const k = dayKeyOf(d), s = stats(k), active = k === day, past = k < todayKey
          return (
            <button key={k} onClick={() => setDay(k)} className={cx('flex w-[74px] shrink-0 flex-col items-center rounded-2xl border px-2 pb-2 pt-1.5 transition', active ? 'text-white shadow-lg' : 'bg-white', past && !active && 'opacity-60')} style={active ? { background: INK, borderColor: INK } : { borderColor: LINE }}>
              <span className="text-[11px] font-bold uppercase">{k === todayKey ? 'Hoy' : DOW[d.getDay()]}</span>
              <span className="text-[22px] font-extrabold leading-tight">{d.getDate()}</span>
              <span className="text-[11px] font-semibold tabular-nums" style={{ color: active ? 'rgba(255,255,255,.7)' : MUTED }}>{s.n} {s.n === 1 ? v.unit[0] : v.unit[1]}</span>
              <span className="mt-1 h-1.5 w-full overflow-hidden rounded-full" style={{ background: active ? 'rgba(255,255,255,.2)' : LINE }}><span className="block h-full rounded-full" style={{ width: `${Math.round(s.occ * 100)}%`, background: s.occ > 0.8 ? '#ef4444' : s.occ > 0.55 ? '#f59e0b' : accent }} /></span>
            </button>
          )
        })}
      </div>

      {/* Herramientas */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border bg-white p-1" style={{ borderColor: LINE }}>
          {([['timeline', 'Línea de tiempo', Rows3], ['list', 'Lista', LayoutList]] as const).map(([id, t, I]) => (
            <button key={id} onClick={() => setView(id)} className={cx('flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold transition', view === id ? 'text-white' : '')} style={view === id ? { background: accent } : { color: MUTED }}><I className="h-4 w-4" />{t}</button>
          ))}
        </div>
        {staffAll.length > 1 && (
          <div className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
            {['Todos', ...staffAll].map((s) => (
              <button key={s} onClick={() => setWho(s)} className={cx('flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-bold', who === s ? 'text-white' : 'bg-white')} style={who === s ? { background: INK, borderColor: INK } : { borderColor: LINE }}>
                {s !== 'Todos' && <span className="h-2.5 w-2.5 rounded-full" style={{ background: color(s) }} />}{s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
        <div className="lg:col-span-2">
          {shown.length === 0 && <Card><p className="py-8 text-center font-semibold" style={{ color: MUTED }}>Sin {v.unit[1]} este día.</p></Card>}
          {shown.length > 0 && view === 'timeline' && (
            <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: LINE }}>
              <div className="overflow-x-auto">
                <div className="flex" style={{ minWidth: 56 + staffShown.length * 150 }}>
                  {/* horas */}
                  <div className="sticky left-0 z-20 w-14 shrink-0 border-r bg-white" style={{ borderColor: LINE }}>
                    <div className="h-11 border-b" style={{ borderColor: LINE }} />
                    <div className="relative" style={{ height: (h1 - h0) * 60 * PX }}>
                      {Array.from({ length: h1 - h0 }, (_, i) => <div key={i} className="absolute right-2 -translate-y-1/2 text-[11px] font-bold tabular-nums" style={{ top: i * 60 * PX, color: MUTED }}>{i === 0 ? '' : `${h0 + i}:00`}</div>)}
                    </div>
                  </div>
                  {staffShown.map((stf) => (
                    <div key={stf} className="min-w-[150px] flex-1 border-r last:border-r-0" style={{ borderColor: LINE }}>
                      <div className="sticky top-0 z-10 flex h-11 items-center gap-2 border-b bg-white px-3" style={{ borderColor: LINE }}>
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white" style={{ background: color(stf) }}>{stf.replace(/^(Dra?\.|Lic\.|Esc\.|Arq\.)\s*/, '')[0]}</span>
                        <span className="truncate text-[13px] font-extrabold">{stf}</span>
                      </div>
                      <div className="relative" style={{ height: (h1 - h0) * 60 * PX, backgroundImage: `repeating-linear-gradient(to bottom, ${LINE} 0 1px, transparent 1px ${60 * PX}px)` }}>
                        {shown.filter((s) => (s.staff ?? cfg.name) === stf).map((s) => {
                          const top = (toMin(s.time) - h0 * 60) * PX, h = (s.min ?? v.duration) * PX - 3, c = color(stf)
                          const done = s.status === 'Atendido', abs = s.status === 'Ausente', pend = s.status === 'A confirmar'
                          return (
                            <button key={s.id} onClick={() => setSel(s)} className={cx('absolute inset-x-1.5 overflow-hidden rounded-xl px-2.5 py-1.5 text-left transition hover:z-10 hover:scale-[1.02] hover:shadow-lg', abs && 'line-through')}
                              style={{ top, height: h, background: abs ? '#fef2f2' : pend ? '#fff' : c + (done ? '14' : '26'), borderLeft: `4px solid ${abs ? STATUS.crit : c}`, outline: pend ? `1.5px dashed ${c}` : undefined, outlineOffset: -1.5, color: abs ? STATUS.crit : INK, opacity: done ? 0.75 : 1 }}>
                              <div className="flex items-center justify-between gap-1 text-[11px] font-bold tabular-nums" style={{ color: abs ? STATUS.crit : c }}>
                                <span>{s.time}–{hhmm(toMin(s.time) + (s.min ?? v.duration))}</span>
                                {done ? <Check className="h-3.5 w-3.5 shrink-0" /> : abs ? <UserX className="h-3.5 w-3.5 shrink-0" /> : pend ? <span className="shrink-0 rounded-full bg-amber-100 px-1.5 text-[9.5px] text-amber-700">A confirmar</span> : null}
                              </div>
                              {h > 38 && <div className="truncate text-[13px] font-extrabold leading-tight">{s.customer}</div>}
                              {h > 60 && <div className="truncate text-[12px]" style={{ color: MUTED }}>{s.items.map((i) => i.name).join(' + ')}</div>}
                              {h > 84 && s.extras?.[0] && <div className="mt-1 inline-block max-w-full truncate rounded-md bg-white/80 px-1.5 py-0.5 text-[11px] font-bold">{s.extras[0].value}</div>}
                            </button>
                          )
                        })}
                        {isToday && nm > h0 * 60 && nm < h1 * 60 && (
                          <div className="pointer-events-none absolute inset-x-0 z-20" style={{ top: (nm - h0 * 60) * PX }}>
                            <div className="h-0.5 bg-red-500" /><div className="absolute -left-1 -top-[5px] h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t px-4 py-2.5 text-[12px] font-semibold" style={{ borderColor: LINE, color: MUTED }}>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded" style={{ background: accent + '26', borderLeft: `3px solid ${accent}` }} /> Confirmado</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-dashed" style={{ borderColor: accent }} /> A confirmar</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> {v.done}</span>
                <span className="flex items-center gap-1.5" style={{ color: STATUS.crit }}><UserX className="h-3.5 w-3.5" /> {v.absent}</span>
                {isToday && <span className="flex items-center gap-1.5 text-red-500"><span className="h-2 w-2 rounded-full bg-red-500" /> Ahora</span>}
              </div>
            </div>
          )}
          {shown.length > 0 && view === 'list' && (
            <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: LINE }}>
              {shown.map((s) => (
                <button key={s.id} onClick={() => setSel(s)} className="flex w-full items-center gap-3 border-b px-4 py-3 text-left last:border-0 hover:bg-slate-50" style={{ borderColor: LINE }}>
                  <div className="w-14 shrink-0 text-center"><div className="font-extrabold tabular-nums">{s.time}</div><div className="text-[11px] tabular-nums" style={{ color: MUTED }}>{s.min ?? v.duration} min</div></div>
                  <span className="h-10 w-1 shrink-0 rounded-full" style={{ background: color(s.staff) }} />
                  <div className="min-w-0 flex-1">
                    <div className={cx('truncate font-bold', s.status === 'Ausente' && 'line-through')}>{s.customer}</div>
                    <div className="truncate text-[12.5px]" style={{ color: MUTED }}>{s.items.map((i) => i.name).join(' + ')}{s.staff ? ` · ${s.staff}` : ''}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5"><StatusPill kind={kindOf(s.status)} label={label(s.status)} />{s.extras?.map((e) => <span key={e.label} className="rounded-md px-1.5 py-0.5 text-[11px] font-bold" style={{ background: '#f1f5f9' }}>{e.value}</span>)}</div>
                  </div>
                  <div className="shrink-0 font-extrabold tabular-nums">{money(s.total)}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card title={isToday ? 'Huecos libres hoy' : 'Huecos libres'}>
            {gapTimes.length === 0 ? <p className="text-[13px] font-semibold" style={{ color: STATUS.good }}>¡Agenda completa! 🎉</p> : (
              <>
                <div className="flex flex-wrap gap-1.5">{gapTimes.slice(0, 10).map((t) => <span key={t} className="rounded-lg px-2.5 py-1 text-[13px] font-extrabold tabular-nums" style={{ background: accent + '14', color: accent }}>{t}</span>)}{gapTimes.length > 10 && <span className="px-1 py-1 text-[12px] font-bold" style={{ color: MUTED }}>+{gapTimes.length - 10}</span>}</div>
                <a href={offer} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25d366] py-2.5 text-[13px] font-extrabold text-white"><WhatsAppIcon className="h-4 w-4" /> Ofrecer por WhatsApp</a>
                <p className="mt-2 text-[12px]" style={{ color: MUTED }}>Mandá los horarios libres a tu lista o a tu estado y llená la agenda.</p>
              </>
            )}
          </Card>
          {byStaff.length > 1 && <Card title={`Por ${v.staffLabel.toLowerCase()} · 30 días`}><HBars rows={byStaff} accent={accent} /></Card>}
          <Card title="Faltas del mes">
            <div className="flex items-end gap-2"><span className="text-3xl font-extrabold tabular-nums">{absent}</span><span className="pb-1 text-[13px] font-bold" style={{ color: MUTED }}>{month.length ? Math.round((absent / month.length) * 100) : 0}% de los {v.unit[1]}</span></div>
            <p className="mt-1 text-[13px]" style={{ color: MUTED }}>Un recordatorio por WhatsApp el día anterior baja mucho las ausencias. Lo mandás desde cada {v.unit[0]}.</p>
          </Card>
        </div>
      </div>

      {/* Detalle del turno */}
      <Sheet open={!!sel} onClose={() => setSel(null)} side="right" className="bg-white" label={`Detalle del ${v.unit[0]}`}>
        {sel && (
          <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Manrope, sans-serif', color: INK }}>
            <div className="relative p-5 text-white" style={{ background: `linear-gradient(135deg, ${color(sel.staff)}, ${INK})` }}>
              <button onClick={() => setSel(null)} aria-label="Cerrar" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15"><X className="h-5 w-5" /></button>
              <div className="text-[12px] font-bold uppercase tracking-[.15em] text-white/70">{cap(v.unit[0])} · {longDate(new Date(sel.dayKey + 'T12:00'))}</div>
              <div className="mt-1 text-[32px] font-extrabold tabular-nums leading-none">{sel.time} <span className="text-[18px] text-white/70">– {hhmm(toMin(sel.time) + (sel.min ?? v.duration))}</span></div>
              <div className="mt-3 text-[20px] font-extrabold">{sel.customer}</div>
              <div className="text-[14px] text-white/75">{v.client}{sel.staff ? ` · con ${sel.staff}` : ''}</div>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
              <div className="flex items-center justify-between"><StatusPill kind={kindOf(sel.status)} label={label(sel.status)} /><span className="text-[13px] font-semibold" style={{ color: MUTED }}>Reservó por {sel.channel}</span></div>
              <div className="rounded-2xl border p-4" style={{ borderColor: LINE }}>
                {sel.items.map((i) => <div key={i.name} className="flex justify-between gap-3 text-[15px]"><span className="font-bold">{i.name}</span><span className="font-extrabold tabular-nums">{money(i.price)}</span></div>)}
                <div className="mt-1 text-[13px]" style={{ color: MUTED }}>{sel.min ?? v.duration} minutos</div>
              </div>
              {sel.extras && sel.extras.length > 0 && (
                <div className="grid grid-cols-2 gap-2">{sel.extras.map((e) => <div key={e.label} className="rounded-2xl p-3" style={{ background: '#f1f5f9' }}><div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: MUTED }}>{e.label}</div><div className="mt-0.5 font-extrabold">{e.value}</div></div>)}</div>
              )}
              {(sel.status === 'Confirmado' || sel.status === 'A confirmar') && (
                <a href={reminder(sel)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border p-3.5 transition hover:bg-slate-50" style={{ borderColor: LINE }}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#25d366] text-white"><WhatsAppIcon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block font-extrabold">Enviar recordatorio</span><span className="block text-[12.5px]" style={{ color: MUTED }}>Se abre WhatsApp con el mensaje listo</span></span>
                  <Send className="h-4 w-4" style={{ color: MUTED }} />
                </a>
              )}
            </div>
            <div className="space-y-2 border-t p-4" style={{ borderColor: LINE, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              {sel.status === 'A confirmar' && <button onClick={() => set(sel, 'Confirmado', `${cap(v.unit[0])} confirmado`)} className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-extrabold text-white" style={{ background: accent }}><Sparkles className="h-4 w-4" /> Confirmar {v.unit[0]}</button>}
              {(sel.status === 'Confirmado' || sel.status === 'A confirmar') && sel.dayKey <= todayKey ? (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => set(sel, 'Atendido')} className="flex items-center justify-center gap-1.5 rounded-xl py-3 font-extrabold text-white" style={{ background: STATUS.good }}><Check className="h-4 w-4" /> {v.done}</button>
                  <button onClick={() => set(sel, 'Ausente')} className="flex items-center justify-center gap-1.5 rounded-xl border py-3 font-extrabold" style={{ borderColor: LINE, color: STATUS.crit }}><UserX className="h-4 w-4" /> {v.absent}</button>
                </div>
              ) : (sel.status === 'Atendido' || sel.status === 'Ausente') && <button onClick={() => set(sel, 'Confirmado', 'Cambio deshecho')} className="w-full rounded-xl border py-3 text-[14px] font-bold" style={{ borderColor: LINE, color: MUTED }}>Deshacer</button>}
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}

function fmtWait(m: number) { return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60 ? `${m % 60} min` : ''}`.trim() }

function Ring({ value, color }: { value: number; color: string }) {
  const r = 26, c = 2 * Math.PI * r
  return (
    <div className="relative h-[68px] w-[68px] shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90"><circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="7" /><circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value)} style={{ transition: 'stroke-dashoffset .8s' }} /></svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none"><div><div className="text-[16px] font-extrabold tabular-nums">{Math.round(value * 100)}%</div><div className="text-[9px] font-bold uppercase text-white/60">ocupado</div></div></div>
    </div>
  )
}
