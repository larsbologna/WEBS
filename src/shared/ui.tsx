import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CheckCheck, ChevronLeft, LayoutDashboard, LayoutGrid, Lightbulb, X } from 'lucide-react'
import { createStore, safeRead, safeWrite, useStore } from './store'
import { cx } from './format'
import { DEMOS, BRAND } from '../demos/meta'

/* ───────────── Imagen con respaldo ───────────── */
export function SmartImg({ src, alt, className, style, fallback = 'linear-gradient(135deg,#d6d3d1,#a8a29e)', eager, fallbackContent, contain }: {
  src: string; alt: string; className?: string; style?: CSSProperties; fallback?: string; eager?: boolean
  /** contenido ilustrado que se ve mientras carga o si la foto no está disponible */
  fallbackContent?: ReactNode; contain?: boolean
}) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')
  return (
    <div className={cx('@container relative overflow-hidden', className)} style={{ background: fallback, ...style }}>
      {fallbackContent && state !== 'ok' && <div className="absolute inset-0 grid place-items-center">{fallbackContent}</div>}
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={cx('absolute inset-0 h-full w-full transition-opacity duration-700', contain ? 'object-contain p-3' : 'object-cover', state === 'ok' ? 'opacity-100' : 'opacity-0')}
        />
      )}
      {state === 'error' && !fallbackContent && (
        <div className="absolute inset-0 flex items-end p-3">
          <span className="hidden rounded-full bg-black/25 px-2.5 @[10rem]:inline py-1 text-[11px] font-medium text-white/90 backdrop-blur">{alt}</span>
        </div>
      )}
    </div>
  )
}

/* ───────────── Toasts ───────────── */
type ToastT = { id: number; text: string }
const toastStore = createStore<ToastT[]>([])
let tid = 0
export function toast(text: string) {
  const id = ++tid
  toastStore.set((t) => [...t.slice(-2), { id, text }])
  setTimeout(() => toastStore.set((t) => t.filter((x) => x.id !== id)), 2600)
}
export function Toasts() {
  const items = useStore(toastStore)
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex flex-col items-center gap-2 px-4">
      {items.map((t) => (
        <div key={t.id} className="animate-fade-up flex max-w-sm items-center gap-2 rounded-2xl bg-neutral-900/95 px-4 py-3 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10 backdrop-blur" style={{ fontFamily: 'Manrope, sans-serif' }}>
          <Check className="h-4 w-4 shrink-0 text-lime-300" />
          {t.text}
        </div>
      ))}
    </div>
  )
}

/* ───────────── Modal / Hoja inferior ───────────── */
export function Sheet({ open, onClose, children, side = 'bottom', className, label }: {
  open: boolean; onClose: () => void; children: ReactNode; side?: 'bottom' | 'right' | 'center'; className?: string; label?: string
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
  if (!open) return null
  const pos =
    side === 'right'
      ? 'inset-y-0 right-0 w-full max-w-md animate-slide-in'
      : side === 'center'
        ? 'inset-x-3 top-1/2 -translate-y-1/2 mx-auto max-w-lg max-h-[90dvh] rounded-3xl animate-pop'
        : 'inset-x-0 bottom-0 max-h-[92dvh] rounded-t-3xl animate-slide-up sm:inset-x-auto sm:left-1/2 sm:w-[560px] sm:-translate-x-1/2'
  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={label}>
      <div className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className={cx('absolute flex flex-col overflow-hidden shadow-2xl', pos, className)}>{children}</div>
    </div>
  )
}

/* ───────────── Simulación de WhatsApp ───────────── */
export function WhatsAppSim({ open, onClose, business, message, onSent }: {
  open: boolean; onClose: () => void; business: string; message: string; onSent?: () => void
}) {
  const [sent, setSent] = useState(false)
  useEffect(() => { if (open) setSent(false) }, [open])
  const time = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  return (
    <Sheet open={open} onClose={onClose} side="center" className="bg-[#efeae2]" label="Vista previa de WhatsApp">
      <div style={{ fontFamily: 'Manrope, sans-serif' }} className="flex min-h-0 flex-col">
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <button onClick={onClose} aria-label="Cerrar"><ChevronLeft className="h-5 w-5" /></button>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold">{business[0]}</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold">{business}</div>
            <div className="text-[11px] text-white/75">{sent ? 'escribiendo…' : 'en línea'}</div>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4" style={{ backgroundImage: 'radial-gradient(#0000000a 1px, transparent 1px)', backgroundSize: '14px 14px' }}>
          <div className="mx-auto mb-3 w-fit rounded-lg bg-[#fff8c5] px-3 py-1.5 text-center text-[11px] text-neutral-700 shadow-sm">
            🔒 Vista previa — así llega el mensaje al negocio
          </div>
          <div className="ml-auto max-w-[88%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[13.5px] leading-snug text-neutral-800 shadow-sm">
            <pre className="whitespace-pre-wrap font-[inherit]">{message}</pre>
            <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-neutral-500">
              {time} {sent ? <CheckCheck className="h-3.5 w-3.5 text-sky-500" /> : <Check className="h-3.5 w-3.5" />}
            </div>
          </div>
          {sent && (
            <div className="animate-fade-up mt-2 max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[13.5px] text-neutral-800 shadow-sm">
              ¡Hola! Recibimos tu mensaje 🙌 En breve te confirmamos. ¡Gracias por elegirnos!
              <div className="mt-1 text-right text-[10px] text-neutral-500">{time}</div>
            </div>
          )}
        </div>
        <div className="space-y-2 bg-white p-3">
          {!sent ? (
            <button
              onClick={() => { setSent(true); onSent?.() }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 font-bold text-white transition active:scale-[.98]"
            >
              Enviar por WhatsApp
            </button>
          ) : (
            <button onClick={onClose} className="w-full rounded-full bg-neutral-900 py-3 font-bold text-white">Listo</button>
          )}
          <p className="text-center text-[11px] leading-tight text-neutral-500">
            Demostración: en la web real este botón abre WhatsApp con el mensaje armado hacia el número del negocio.
          </p>
        </div>
      </div>
    </Sheet>
  )
}

/* ───────────── Modo presentación: tips de beneficio ───────────── */
const presentStore = createStore<boolean>(safeRead('demo-present-mode', true))
presentStore.subscribe(() => safeWrite('demo-present-mode', presentStore.get()))
export const usePresentMode = () => useStore(presentStore)

/** Etiqueta que explica al comerciante el beneficio de la sección. Se oculta con "Modo presentación". */
export function Tip({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  const on = usePresentMode()
  if (!on) return null
  return (
    <div className={cx('animate-fade-in mx-auto flex w-fit max-w-full items-start gap-2 rounded-2xl border border-dashed px-3 py-2 text-[12.5px] leading-snug', dark ? 'border-lime-300/50 bg-lime-300/10 text-lime-100' : 'border-violet-500/40 bg-violet-50 text-violet-900', className)}
      style={{ fontFamily: 'Manrope, sans-serif' }}>
      <Lightbulb className={cx('mt-px h-4 w-4 shrink-0', dark ? 'text-lime-300' : 'text-violet-600')} />
      <span><b>Para tu negocio:</b> {children}</span>
    </div>
  )
}

/* ───────────── Aparición al hacer scroll ───────────── */
export function Reveal({ children, className, delay = 0, as: Tag = 'div', style }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li'; style?: CSSProperties }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref as never} className={cx('reveal', className)} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Tag>
}

/* ───────────── Carcasa de cada demo ───────────── */
const loadedFonts = new Set<string>()
function useGoogleFonts(families: string) {
  useEffect(() => {
    if (!families || loadedFonts.has(families)) return
    loadedFonts.add(families)
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
    document.head.appendChild(l)
  }, [families])
}

export function DemoShell({ slug, fonts, children, className, style, themeColor }: {
  slug: string; fonts: string; children: ReactNode; className?: string; style?: CSSProperties; themeColor?: string
}) {
  useGoogleFonts(fonts)
  const meta = DEMOS.find((d) => d.slug === slug)!
  useEffect(() => {
    document.title = `${meta.name} — ${meta.rubro} | Demo`
    window.scrollTo(0, 0)
    const tc = document.querySelector('meta[name="theme-color"]')
    const prev = tc?.getAttribute('content')
    if (themeColor) tc?.setAttribute('content', themeColor)
    return () => { if (prev) tc?.setAttribute('content', prev) }
  }, [meta, themeColor])
  return (
    <div className={cx('min-h-dvh overflow-x-clip', className)} style={style}>
      {children}
      <DemoDock slug={slug} />
    </div>
  )
}

/** Botón flotante: volver al showroom, navegar entre demos y modo presentación */
function DemoDock({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false)
  const present = usePresentMode()
  const nav = useNavigate()
  const i = DEMOS.findIndex((d) => d.slug === slug)
  const prev = DEMOS[(i - 1 + DEMOS.length) % DEMOS.length]
  const next = DEMOS[(i + 1) % DEMOS.length]
  return (
    <div className="fixed bottom-4 left-4 z-[70]" style={{ fontFamily: 'Manrope, sans-serif', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="animate-fade-up absolute bottom-14 left-0 w-72 overflow-hidden rounded-2xl bg-neutral-950/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur">
            <div className="border-b border-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-widest text-white/50">Demo {DEMOS[i].num} de {DEMOS.length}</div>
              <div className="font-semibold">{DEMOS[i].name}</div>
            </div>
            <Link to="/showroom" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5">
              <LayoutGrid className="h-4 w-4 text-lime-300" /> Volver al showroom
            </Link>
            <Link to={`/demo/${slug}/admin`} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5">
              <LayoutDashboard className="h-4 w-4 text-lime-300" /> Panel de administración
              <span className="ml-auto rounded-full bg-lime-300/15 px-2 py-0.5 text-[10px] font-bold text-lime-300">NUEVO</span>
            </Link>
            <button onClick={() => { setOpen(false); nav(`/demo/${next.slug}`) }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-white/5">
              <ArrowRight className="h-4 w-4 text-white/60" /> Siguiente: {next.rubro}
            </button>
            <button onClick={() => { setOpen(false); nav(`/demo/${prev.slug}`) }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-white/5">
              <ArrowLeft className="h-4 w-4 text-white/60" /> Anterior: {prev.rubro}
            </button>
            <button onClick={() => presentStore.set(!present)} className="flex w-full items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-left text-sm hover:bg-white/5">
              <span className="flex items-center gap-3"><Lightbulb className="h-4 w-4 text-white/60" /> Notas de beneficios</span>
              <span className={cx('relative h-5 w-9 rounded-full transition', present ? 'bg-lime-400' : 'bg-white/20')}>
                <span className={cx('absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all', present ? 'left-[18px]' : 'left-0.5')} />
              </span>
            </button>
            <div className="bg-white/5 px-4 py-2.5 text-[11px] text-white/50">{BRAND.name} | {BRAND.tagline}</div>
          </div>
        </>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Menú del showroom"
        className="flex h-11 items-center gap-2 rounded-full bg-neutral-950/90 pl-3 pr-4 text-[13px] font-semibold text-white shadow-xl ring-1 ring-white/15 backdrop-blur transition active:scale-95"
      >
        {open ? <X className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4 text-lime-300" />}
        Showroom
      </button>
    </div>
  )
}

/* ───────────── Selector de cantidad genérico (sin estilo fuerte) ───────────── */
export function Stepper({ value, onDec, onInc, className, label }: { value: ReactNode; onDec: () => void; onInc: () => void; className?: string; label?: string }) {
  return (
    <div className={cx('inline-flex items-center', className)} aria-label={label}>
      <button onClick={onDec} aria-label="Restar" className="grid h-8 w-8 place-items-center text-lg leading-none">−</button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button onClick={onInc} aria-label="Sumar" className="grid h-8 w-8 place-items-center text-lg leading-none">+</button>
    </div>
  )
}
