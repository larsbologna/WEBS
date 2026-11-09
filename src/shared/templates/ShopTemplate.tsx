import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../ui'
import { useCart } from '../useCart'
import { WhatsAppIcon, WhatsAppOrderButton, whatsappLink } from '../whatsapp'
import { DEMOS } from '../../demos/meta'
import { cx, img, money } from '../format'
import { IconBadge, InfoFooter, Kicker, Section, Title, pill, radius, rootStyle, type Info, type Theme } from './kit'

export type ShopProduct = {
  id: string; name: string; cat: string; price: number; was?: number; img: string; desc: string
  brand?: string; unit?: string; tag?: string; options?: { label: string; values: string[] }
}

export type ShopConfig = {
  slug: string
  name: string
  logo: LucideIcon
  theme: Theme
  announce: string
  hero: { kicker: string; title: string; text: string; images: string[]; cta: string; layout: 'split' | 'full' | 'collage' }
  categories: { name: string; img: string }[]
  products: ShopProduct[]
  featuredTitle: string
  features: { icon: LucideIcon; t: string; d: string }[]
  /** bloque propio del rubro (lista escolar, presupuesto, etc.): un formulario que manda el texto por WhatsApp */
  special?: { kicker: string; title: string; text: string; placeholder: string; button: string; message: (txt: string) => string; image: string }
  /** campo libre en el carrito que viaja en el pedido (ej. dedicatoria de la tarjeta) */
  cartNote?: { label: string; placeholder: string; prefix: string }
  info: Info
  tips: { categories: string; catalog: string; special?: string }
}

export function ShopTemplate({ cfg }: { cfg: ShopConfig }) {
  const t = cfg.theme
  const cart = useCart(cfg.slug)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todo')
  const [prod, setProd] = useState<ShopProduct | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const list = useMemo(() => cfg.products.filter((p) => (cat === 'Todo' || p.cat === cat) && (!q || norm(`${p.name} ${p.cat} ${p.brand ?? ''} ${p.desc}`).includes(norm(q)))), [cat, q, cfg.products])
  const featured = cfg.products.filter((p) => p.tag).slice(0, 4)
  const goShop = (c?: string) => { if (c) setCat(c); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }
  const add = (p: ShopProduct, opt?: string, qty = 1) => {
    cart.add({ key: opt ? `${p.id}:${opt}` : p.id, name: p.name, price: p.price, image: p.img, detail: [opt, p.unit].filter(Boolean).join(' · ') || undefined, qty })
    toast(`${p.name} al carrito`)
  }
  const inCart = (p: ShopProduct) => cart.lines.filter((l) => l.key.split(':')[0] === p.id).reduce((s, l) => s + l.qty, 0)
  const meta = DEMOS.find((d) => d.slug === cfg.slug)!
  const Logo = cfg.logo

  return (
    <DemoShell slug={cfg.slug} fonts={cfg.theme.fonts} themeColor={t.bg} className="pb-28" style={rootStyle(t)}>
      <div className="px-4 py-2 text-center text-[12.5px] font-semibold" style={{ background: t.dark, color: '#fff' }}>{cfg.announce}</div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ background: `${t.bg}e6`, borderColor: t.line }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <span className="grid h-10 w-10 place-items-center" style={{ background: t.accent, color: t.accentInk, borderRadius: radius(t, 'sm') === '999px' ? 999 : radius(t, 'sm') }}><Logo className="h-5 w-5" /></span>
            <span className={cx('hidden font-(family-name:--fd) text-[20px] leading-none sm:block', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800 }}>{cfg.name}</span>
          </a>
          <label className="flex min-w-0 flex-1 items-center gap-2 border px-4" style={{ borderColor: t.line, background: t.surface, borderRadius: pill(t) }}>
            <Search className="h-4 w-4 shrink-0" style={{ color: t.muted }} />
            <input value={q} onChange={(e) => { setQ(e.target.value); if (e.target.value) setCat('Todo') }} placeholder="¿Qué estás buscando?" aria-label="Buscar" className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none" />
            {q && <button onClick={() => setQ('')} aria-label="Borrar búsqueda"><X className="h-4 w-4" /></button>}
          </label>
          <button onClick={() => setCartOpen(true)} aria-label="Abrir carrito" className="relative grid h-11 w-11 shrink-0 place-items-center" style={{ background: t.ink, color: t.bg, borderRadius: pill(t) }}>
            <ShoppingBag className="h-5 w-5" />
            {cart.count > 0 && <span className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-extrabold" style={{ background: t.accent, color: t.accentInk }}>{cart.count}</span>}
          </button>
        </div>
      </header>

      <Hero cfg={cfg} onShop={() => goShop()} />

      {/* Beneficios */}
      <div className="mx-auto mt-4 grid max-w-6xl gap-2 px-4 sm:grid-cols-3">
        {cfg.features.map(({ icon, t: title, d }) => (
          <div key={title} className="flex items-center gap-3 border p-3.5" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
            <IconBadge icon={icon} t={t} size={40} />
            <div><div className="text-[14px] font-bold leading-tight">{title}</div><div className="text-[12.5px]" style={{ color: t.muted }}>{d}</div></div>
          </div>
        ))}
      </div>

      {/* Categorías */}
      <Section>
        <Title t={t} text="Elegí por *categoría*" className="text-3xl md:text-4xl" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cfg.categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 40}>
              <button onClick={() => goShop(c.name)} className="group relative block w-full overflow-hidden text-left" style={{ borderRadius: radius(t) }}>
                <SmartImg src={img(c.img, 400, 480)} alt="" className="aspect-[5/6] transition duration-700 group-hover:scale-105" fallback={`linear-gradient(160deg,${t.soft},${t.accent})`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className={cx('absolute inset-x-3 bottom-3 font-(family-name:--fd) text-[17px] leading-tight text-white', t.upper && 'uppercase')} style={{ fontWeight: t.italic ? 500 : 800 }}>{c.name}</div>
              </button>
            </Reveal>
          ))}
        </div>
        <Tip className="mt-4 !mx-0">{cfg.tips.categories}</Tip>
      </Section>

      {/* Destacados */}
      {featured.length > 0 && (
        <Section>
          <div className="flex items-end justify-between gap-3"><Title t={t} text={cfg.featuredTitle} className="text-3xl md:text-4xl" /><button onClick={() => goShop()} className="flex shrink-0 items-center gap-1 text-[14px] font-bold" style={{ color: t.accent }}>Ver todo <ArrowRight className="h-4 w-4" /></button></div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {featured.map((p) => <Card key={p.id} p={p} t={t} n={inCart(p)} onOpen={() => setProd(p)} onAdd={() => (p.options ? setProd(p) : add(p))} big />)}
          </div>
        </Section>
      )}

      {/* Bloque especial del rubro */}
      {cfg.special && <Special cfg={cfg} />}

      {/* Catálogo */}
      <Section id="catalogo">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <Title t={t} text={cat === 'Todo' ? 'Todo el *catálogo*' : cat} className="text-3xl md:text-4xl" />
          {q && <span className="text-[14px]" style={{ color: t.muted }}>Resultados para “{q}”</span>}
        </div>
        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {['Todo', ...cfg.categories.map((c) => c.name)].map((c) => (
            <button key={c} onClick={() => setCat(c)} className="shrink-0 border px-4 py-2 text-[13.5px] font-bold transition" style={cat === c ? { background: t.ink, color: t.bg, borderColor: t.ink, borderRadius: pill(t) } : { background: t.surface, borderColor: t.line, borderRadius: pill(t) }}>{c}</button>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="mt-6 border p-10 text-center" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
            <p className="font-bold">No encontramos “{q}”</p>
            <p className="text-[14px]" style={{ color: t.muted }}>Escribinos por WhatsApp y te decimos si lo tenemos.</p>
          </div>
        ) : (
          <div key={cat + q} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => <Card key={p.id} p={p} t={t} n={inCart(p)} delay={Math.min(i, 12) * 30} onOpen={() => setProd(p)} onAdd={() => (p.options ? setProd(p) : add(p))} />)}
          </div>
        )}
        <Tip className="mt-4 !mx-0">{cfg.tips.catalog}</Tip>
      </Section>

      {/* Cómo comprar */}
      <Section>
        <Title t={t} text="Comprar es *así de fácil*" className="text-3xl md:text-4xl" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[['Elegí tus productos', 'Sumalos al carrito con el precio a la vista.'], ['Mandá el pedido por WhatsApp', 'Se abre el chat con todo el pedido ya escrito.'], ['Coordinamos con vos', 'Te confirmamos stock, entrega y forma de pago.']].map(([a, b], i) => (
            <div key={a} className="flex gap-4 border p-5" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center font-(family-name:--fd) text-lg font-black" style={{ background: t.accent, color: t.accentInk, borderRadius: radius(t, 'sm') === '999px' ? 999 : radius(t, 'sm') }}>{i + 1}</span>
              <div><div className="font-bold">{a}</div><div className="text-[14px]" style={{ color: t.muted }}>{b}</div></div>
            </div>
          ))}
        </div>
      </Section>

      <InfoFooter t={t} name={cfg.name} info={cfg.info} logo={cfg.logo} />

      {cart.count > 0 && !cartOpen && !prod && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-40 px-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between py-3 pl-5 pr-3 shadow-2xl" style={{ background: t.ink, color: t.bg, borderRadius: pill(t) }}>
            <span className="flex items-center gap-2 font-bold"><ShoppingBag className="h-5 w-5" /> {cart.count} · {money(cart.total)}</span>
            <span className="px-4 py-2 text-[14px] font-extrabold" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}>Ver pedido</span>
          </button>
        </div>
      )}

      <ProductSheet p={prod} t={t} onClose={() => setProd(null)} onAdd={(p, o, qty) => { add(p, o, qty); setProd(null) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} cfg={cfg} business={meta.name} />
    </DemoShell>
  )
}

function Hero({ cfg, onShop }: { cfg: ShopConfig; onShop: () => void }) {
  const t = cfg.theme, h = cfg.hero
  const text = (light: boolean) => (
    <>
      <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 text-[12.5px] font-bold" style={{ background: light ? 'rgba(255,255,255,.15)' : t.soft, color: light ? '#fff' : t.accent, borderRadius: pill(t) }}>{h.kicker}</div>
      <Title as="h1" t={t} text={h.title} className="animate-fade-up mt-4 text-[44px] leading-[0.95] md:text-[68px]" style={{ animationDelay: '80ms', color: light ? '#fff' : undefined }} onDark={light} />
      <p className="animate-fade-up mt-4 max-w-md text-[16px] leading-relaxed" style={{ animationDelay: '160ms', color: light ? 'rgba(255,255,255,.8)' : t.muted }}>{h.text}</p>
      <button onClick={onShop} className="animate-fade-up mt-7 inline-flex items-center gap-2 px-7 py-4 font-bold transition active:scale-95" style={{ animationDelay: '240ms', background: t.accent, color: t.accentInk, borderRadius: pill(t) }}>{h.cta} <ArrowRight className="h-4 w-4" /></button>
    </>
  )
  if (h.layout === 'full')
    return (
      <section id="top" className="mx-auto max-w-6xl px-4 pt-5">
        <div className="relative overflow-hidden" style={{ borderRadius: radius(t, 'lg') }}>
          <SmartImg src={img(h.images[0], 1400, 800)} alt="" eager className="absolute inset-0 h-full w-full" fallback={`linear-gradient(135deg,${t.accent},${t.dark})`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="relative max-w-xl px-6 py-16 md:px-12 md:py-24">{text(true)}</div>
        </div>
      </section>
    )
  if (h.layout === 'collage')
    return (
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 md:grid-cols-2">
        <div>{text(false)}</div>
        <div className="grid grid-cols-2 gap-3">
          {h.images.slice(0, 3).map((id, i) => (
            <SmartImg key={id} src={img(id, 600, i === 0 ? 900 : 600)} alt="" eager className={cx(i === 0 ? 'row-span-2 h-full min-h-[320px]' : 'aspect-square', 'animate-fade-up')} style={{ borderRadius: radius(t, 'lg'), animationDelay: `${i * 90}ms` }} fallback={`linear-gradient(135deg,${t.soft},${t.accent})`} />
          ))}
        </div>
      </section>
    )
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-5">
      <div className="grid items-center gap-6 overflow-hidden p-6 md:grid-cols-[1.1fr_1fr] md:p-10" style={{ background: t.soft, borderRadius: radius(t, 'lg') }}>
        <div>{text(false)}</div>
        <SmartImg src={img(h.images[0], 800, 800)} alt="" eager className="aspect-square" style={{ borderRadius: radius(t, 'lg') }} fallback={`linear-gradient(135deg,${t.surface},${t.accent})`} />
      </div>
    </section>
  )
}

function Card({ p, t, n, onOpen, onAdd, delay = 0, big }: { p: ShopProduct; t: Theme; n: number; onOpen: () => void; onAdd: () => void; delay?: number; big?: boolean }) {
  const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0
  return (
    <article className="animate-fade-up group flex flex-col overflow-hidden border transition hover:shadow-xl" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t), animationDelay: `${delay}ms` }}>
      <button onClick={onOpen} className="relative block overflow-hidden" aria-label={`Ver ${p.name}`}>
        <SmartImg src={img(p.img, 500, 500)} alt={p.name} className={cx(big ? 'aspect-[4/5]' : 'aspect-square', 'transition duration-500 group-hover:scale-[1.04]')} fallback={`linear-gradient(160deg,${t.soft},${t.surface})`} />
        {(off > 0 || p.tag) && <span className="absolute left-2.5 top-2.5 px-2.5 py-1 text-[11px] font-extrabold" style={{ background: off ? '#e5484d' : t.accent, color: off ? '#fff' : t.accentInk, borderRadius: pill(t) }}>{off ? `-${off}%` : p.tag}</span>}
      </button>
      <div className="flex flex-1 flex-col p-3.5">
        {p.brand && <div className="text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: t.muted }}>{p.brand}</div>}
        <button onClick={onOpen} className="line-clamp-2 text-left text-[14.5px] font-semibold leading-snug">{p.name}</button>
        <div className="mt-auto pt-3">
          {p.was && <div className="text-[12px] line-through" style={{ color: t.muted }}>{money(p.was)}</div>}
          <div className="font-(family-name:--fd) text-[19px] font-extrabold leading-none">{money(p.price)}{p.unit && <span className="text-[12px] font-semibold" style={{ color: t.muted }}> / {p.unit}</span>}</div>
          <button onClick={onAdd} className="mt-3 flex w-full items-center justify-center gap-1.5 py-2.5 text-[13.5px] font-bold transition active:scale-95" style={{ ...(n ? { background: t.soft, color: t.accent } : { background: t.accent, color: t.accentInk }), borderRadius: pill(t) }}>
            {n ? <><Check className="h-4 w-4" /> En el carrito ({n})</> : <><Plus className="h-4 w-4" /> {p.options ? 'Elegir' : 'Agregar'}</>}
          </button>
        </div>
      </div>
    </article>
  )
}

function Special({ cfg }: { cfg: ShopConfig }) {
  const t = cfg.theme, s = cfg.special!
  const [txt, setTxt] = useState('')
  const phone = DEMOS.find((d) => d.slug === cfg.slug)?.whatsapp ?? ''
  return (
    <Section>
      <div className="grid overflow-hidden md:grid-cols-2" style={{ background: t.dark, borderRadius: radius(t, 'lg') }}>
        <SmartImg src={img(s.image, 900, 700)} alt="" className="min-h-[220px]" fallback={`linear-gradient(135deg,${t.accent},${t.dark})`} />
        <div className="p-6 text-white md:p-10">
          <Kicker t={t}>{s.kicker}</Kicker>
          <Title t={t} text={s.title} className="mt-2 text-3xl md:text-4xl" style={{ color: '#fff' }} onDark />
          <p className="mt-3 text-[15px] text-white/70">{s.text}</p>
          <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={4} placeholder={s.placeholder} className="mt-4 w-full bg-white/10 p-4 text-[15px] text-white outline-none ring-1 ring-white/15 placeholder:text-white/40 focus:ring-white/40" style={{ borderRadius: radius(t, 'sm') === '999px' ? 18 : radius(t, 'sm') }} />
          <a href={txt.trim() ? whatsappLink(s.message(txt.trim()), phone) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!txt.trim()}
            className={cx('mt-3 flex w-full items-center justify-center gap-2 bg-[#25d366] py-4 font-extrabold text-white transition', !txt.trim() && 'pointer-events-none opacity-40')} style={{ borderRadius: pill(t) }}>
            <WhatsAppIcon className="h-5 w-5" /> {s.button}
          </a>
          {cfg.tips.special && <Tip dark className="mt-4 !mx-0">{cfg.tips.special}</Tip>}
        </div>
      </div>
    </Section>
  )
}

function ProductSheet({ p, t, onClose, onAdd }: { p: ShopProduct | null; t: Theme; onClose: () => void; onAdd: (p: ShopProduct, opt: string | undefined, qty: number) => void }) {
  const [opt, setOpt] = useState<string | undefined>()
  const [qty, setQty] = useState(1)
  const [last, setLast] = useState<string | null>(null)
  if (p && p.id !== last) { setLast(p.id); setOpt(p.options?.values[0]); setQty(1) }
  if (!p) return null
  return (
    <Sheet open onClose={onClose} side="right" label={p.name} className="bg-white">
      <div className="flex h-full min-h-0 flex-col" style={{ background: t.bg, color: t.ink, fontFamily: t.body, ['--fd' as string]: t.display }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative">
            <SmartImg src={img(p.img, 800, 800)} alt={p.name} eager className="aspect-square" fallback={`linear-gradient(160deg,${t.soft},${t.surface})`} />
            <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow"><X className="h-5 w-5" /></button>
          </div>
          <div className="p-5">
            <div className="text-[12.5px] font-semibold uppercase tracking-wide" style={{ color: t.muted }}>{[p.brand, p.cat].filter(Boolean).join(' · ')}</div>
            <Title as="h3" t={t} text={p.name} className="mt-1 text-[28px] leading-tight" />
            <div className="mt-2 flex items-baseline gap-2"><span className="font-(family-name:--fd) text-[28px] font-black">{money(p.price)}</span>{p.unit && <span style={{ color: t.muted }}>/ {p.unit}</span>}{p.was && <span className="line-through" style={{ color: t.muted }}>{money(p.was)}</span>}</div>
            {p.options && (
              <div className="mt-4">
                <div className="text-[13px] font-bold">{p.options.label}</div>
                <div className="mt-2 flex flex-wrap gap-2">{p.options.values.map((v) => <button key={v} onClick={() => setOpt(v)} className="border px-4 py-2 text-[14px] font-semibold transition" style={{ borderRadius: pill(t), ...(opt === v ? { background: t.soft, borderColor: t.accent, color: t.accent } : { borderColor: t.line, background: t.surface }) }}>{v}</button>)}</div>
              </div>
            )}
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: t.muted }}>{p.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t p-4" style={{ borderColor: t.line, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center border" style={{ borderColor: t.line, borderRadius: pill(t) }}>
            <button onClick={() => setQty((x) => Math.max(1, x - 1))} className="grid h-12 w-11 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <button onClick={() => setQty((x) => x + 1)} className="grid h-12 w-11 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={() => onAdd(p, opt, qty)} className="flex h-12 flex-1 items-center justify-between px-5 font-bold transition active:scale-[.98]" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}>
            <span>Agregar</span><span className="font-(family-name:--fd)">{money(p.price * qty)}</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart, cfg, business }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart>; cfg: ShopConfig; business: string }) {
  const t = cfg.theme
  const [note, setNote] = useState('')
  const extra: string[] = cfg.cartNote && note.trim() ? ['', `${cfg.cartNote.prefix} ${note.trim()}`] : []
  return (
    <Sheet open={open} onClose={onClose} side="right" label="Carrito" className="bg-white">
      <div className="flex h-full min-h-0 flex-col" style={{ background: t.bg, color: t.ink, fontFamily: t.body, ['--fd' as string]: t.display }}>
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: t.line }}>
          <Title as="h3" t={t} text="Tu pedido" className="text-2xl" />
          <button onClick={onClose} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full" style={{ background: t.surface }}><X className="h-5 w-5" /></button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingBag className="mx-auto h-10 w-10" style={{ color: t.muted }} /><p className="mt-3 font-bold">Tu carrito está vacío</p><button onClick={onClose} className="mt-4 px-6 py-3 text-[14px] font-bold" style={{ background: t.accent, color: t.accentInk, borderRadius: pill(t) }}>Ver productos</button></div></div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              <ul className="space-y-2">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-3 border p-2.5" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t) }}>
                    <SmartImg src={img(l.image!, 160, 160)} alt={l.name} className="h-16 w-16 shrink-0" style={{ borderRadius: radius(t, 'sm') === '999px' ? 14 : radius(t, 'sm') }} fallback={`linear-gradient(160deg,${t.soft},${t.surface})`} />
                    <div className="min-w-0 flex-1"><div className="line-clamp-2 text-[14px] font-semibold leading-tight">{l.name}</div>{l.detail && <div className="text-[12px]" style={{ color: t.muted }}>{l.detail}</div>}<div className="mt-0.5 font-(family-name:--fd) font-extrabold">{money(l.price * l.qty)}</div></div>
                    <div className="flex items-center rounded-full" style={{ background: t.bg }}>
                      <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                      <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                      <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </li>
                ))}
              </ul>
              {cfg.cartNote && (
                <label className="block">
                  <span className="text-[13px] font-bold">{cfg.cartNote.label}</span>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder={cfg.cartNote.placeholder} className="mt-1.5 w-full border p-3 text-[14px] outline-none" style={{ background: t.surface, borderColor: t.line, borderRadius: radius(t, 'sm') === '999px' ? 16 : radius(t, 'sm') }} />
                </label>
              )}
            </div>
            <div className="border-t p-5" style={{ borderColor: t.line, background: t.surface, paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="mb-4 flex items-baseline justify-between"><span className="font-semibold">Total</span><span className="font-(family-name:--fd) text-[26px] font-black">{money(cart.total)}</span></div>
              <WhatsAppOrderButton slug={cfg.slug} business={business} lines={cart.lines} total={cart.total} extra={extra} style={{ borderRadius: pill(t) }} />
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

