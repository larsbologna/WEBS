import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, Circle, Clock } from 'lucide-react'
import { cx, money } from '../shared/format'

/* Piezas visuales compartidas del panel de administración */
export const INK = '#0f172a', MUTED = '#64748b', LINE = '#e2e8f0', BG = '#f5f7fa'
export const STATUS = { good: '#15803d', warn: '#b45309', crit: '#b91c1c', idle: '#64748b' }
export const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }
export const sum = <T,>(a: T[], f: (x: T) => number) => a.reduce((s, x) => s + f(x), 0)

export const Card = ({ children, className, title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) => (
  <section className={cx('rounded-2xl border bg-white p-4', className)} style={{ borderColor: LINE }}>
    {title && <div className="mb-3 flex items-center justify-between gap-2"><h3 className="text-[15px] font-extrabold">{title}</h3>{action}</div>}
    {children}
  </section>
)

export function StatusPill({ kind, label }: { kind: keyof typeof STATUS; label: string }) {
  const I = kind === 'good' ? CheckCircle2 : kind === 'crit' ? AlertTriangle : kind === 'warn' ? Clock : Circle
  return <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-bold" style={{ color: STATUS[kind], background: STATUS[kind] + '14' }}><I className="h-3.5 w-3.5" />{label}</span>
}

export function HBars({ rows, accent, fmt = money }: { rows: { label: string; value: number; sub?: string }[]; accent: string; fmt?: (n: number) => string }) {
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
