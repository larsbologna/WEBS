import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { AtSign, Clock, MapPin } from 'lucide-react'
import { cx } from '../format'

/** Identidad visual de cada demo hecha con plantilla. */
export type Theme = {
  bg: string // fondo general
  surface: string // tarjetas
  ink: string // texto principal
  muted: string // texto secundario
  accent: string // color de marca
  accentInk: string // texto sobre el color de marca
  soft: string // fondo suave de la marca
  line: string // bordes
  dark: string // bloques oscuros (footer, banda)
  /** familias de Google Fonts, formato css2 (family=...&family=...) */
  fonts: string
  display: string // tipografía de títulos
  body: string // tipografía de texto
  /** forma general: redondeada, suave o recta */
  shape: 'round' | 'soft' | 'square'
  /** títulos en mayúsculas */
  upper?: boolean
  /** títulos en itálica (serif editorial) */
  italic?: boolean
  /** color del resaltado sobre fondos oscuros (si el de marca no contrasta) */
  accentOnDark?: string
}

export type Info = { address: string; city: string; hours: string[]; instagram: string; note?: string }

export const radius = (t: Theme, size: 'sm' | 'md' | 'lg' = 'md') =>
  t.shape === 'square' ? (size === 'lg' ? '6px' : '2px') : t.shape === 'soft' ? ({ sm: '10px', md: '16px', lg: '24px' } as const)[size] : ({ sm: '999px', md: '22px', lg: '32px' } as const)[size]

export const pill = (t: Theme) => (t.shape === 'square' ? '2px' : '999px')

/** Estilo raíz: variables de la marca para usar en clases. */
export const rootStyle = (t: Theme): CSSProperties => ({ background: t.bg, color: t.ink, fontFamily: t.body, ['--fd' as string]: t.display })

/** Convierte "Texto con *resaltado*" en un título con la palabra en color de marca. */
export function Title({ text, t, className, as: Tag = 'h2', style, onDark }: { text: string; t: Theme; className?: string; as?: 'h1' | 'h2' | 'h3'; style?: CSSProperties; onDark?: boolean }) {
  const parts = text.split('*')
  return (
    <Tag className={cx('font-(family-name:--fd) tracking-tight', t.upper && 'uppercase', className)} style={{ fontWeight: t.italic ? 500 : 800, ...style }}>
      {parts.map((p, i) => (i % 2 ? <span key={i} style={{ color: onDark ? (t.accentOnDark ?? t.accent) : t.accent, fontStyle: t.italic ? 'italic' : undefined }}>{p}</span> : p))}
    </Tag>
  )
}

export function Kicker({ t, children, className }: { t: Theme; children: ReactNode; className?: string }) {
  return <div className={cx('text-[12px] font-bold uppercase tracking-[.2em]', className)} style={{ color: t.accent }}>{children}</div>
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={cx('mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 md:pt-20', className)}>{children}</section>
}

export function IconBadge({ icon: I, t, size = 44 }: { icon: LucideIcon; t: Theme; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center" style={{ width: size, height: size, borderRadius: radius(t, 'sm') === '999px' ? 999 : radius(t, 'sm'), background: t.soft, color: t.accent }}>
      <I style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.8} />
    </span>
  )
}

export function InfoFooter({ t, name, info, logo: Logo }: { t: Theme; name: string; info: Info; logo: LucideIcon }) {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-4">
      <div className="grid gap-6 p-6 text-white md:grid-cols-[1.3fr_1fr_1fr] md:p-10" style={{ background: t.dark, borderRadius: radius(t, 'lg') }}>
        <div>
          <div className="flex items-center gap-2"><Logo className="h-6 w-6" style={{ color: t.accent === t.dark ? '#fff' : t.accent }} /><span className={cx('font-(family-name:--fd) text-2xl', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800 }}>{name}</span></div>
          {info.note && <p className="mt-2 max-w-sm text-[14px] text-white/60">{info.note}</p>}
          <div className="mt-4 flex items-center gap-2 text-[14px] text-white/75"><AtSign className="h-4 w-4" /> {info.instagram}</div>
        </div>
        <div className="flex items-start gap-3 text-[14px]"><MapPin className="mt-0.5 h-5 w-5 shrink-0 opacity-70" /><div><b>{info.address}</b><br /><span className="text-white/60">{info.city}</span></div></div>
        <div className="flex items-start gap-3 text-[14px]"><Clock className="mt-0.5 h-5 w-5 shrink-0 opacity-70" /><div>{info.hours.map((h, i) => <div key={h} className={i ? 'text-white/60' : 'font-bold'}>{h}</div>)}</div></div>
      </div>
      <p className="py-6 text-center text-[12px]" style={{ color: t.muted }}>Demo · Negocio, datos y precios de ejemplo</p>
    </footer>
  )
}
