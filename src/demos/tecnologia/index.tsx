import { useMemo, useState } from 'react'
import { ArrowLeft, Battery, Cable, Check, CreditCard, Gamepad2, HardDrive, Headphones, Keyboard, Lock, Minus, Monitor, Mouse, PackageCheck, Plug, Plus, Router, Search, ShieldCheck, ShoppingCart, Smartphone, Speaker, Store, Truck, Tv, Usb, Webcam, Wifi, X, Zap, Laptop, Sparkles, Trash2 } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { cx, img, money } from '../../shared/format'

const BLUE = '#1d4ed8', INK = '#0b1220', YEL = '#facc15', SOFT = '#eef2fb'
type Cat = 'Cables y adaptadores' | 'Streaming y TV' | 'Cargadores y energía' | 'Almacenamiento' | 'Audio' | 'Periféricos' | 'Redes' | 'Gaming'
type Prod = { id: string; name: string; brand: string; cat: Cat; price: number; was?: number; stock: number; icon: typeof Cable; img: string; specs: string[]; desc: string; compat?: string; free?: boolean; top?: boolean }

const CATS: { c: Cat; i: typeof Cable }[] = [
  { c: 'Cables y adaptadores', i: Cable }, { c: 'Streaming y TV', i: Tv }, { c: 'Cargadores y energía', i: Zap }, { c: 'Almacenamiento', i: HardDrive },
  { c: 'Audio', i: Headphones }, { c: 'Periféricos', i: Mouse }, { c: 'Redes', i: Wifi }, { c: 'Gaming', i: Gamepad2 },
]
const P: Prod[] = [
  { id: 'h1', img: 'fotos/tecnologia/h1.jpg', name: 'Cable HDMI 2.1 8K', brand: 'Linkmax', cat: 'Cables y adaptadores', price: 12900, stock: 42, icon: Cable, specs: ['2 m', '8K 60 Hz', '4K 120 Hz', '48 Gbps'], desc: 'Ideal para consolas de nueva generación y TVs 4K de 120 Hz. Conectores bañados en oro y malla trenzada.', compat: 'PS5, Xbox Series, TV 4K/8K, notebooks', top: true },
  { id: 'h2', img: '1588508065123-287b28e013da', name: 'Cable HDMI 2.0 4K', brand: 'Linkmax', cat: 'Cables y adaptadores', price: 6900, stock: 80, icon: Cable, specs: ['1,5 m', '4K 60 Hz', 'HDR', '18 Gbps'], desc: 'El cable de siempre para TV, deco, notebook o consola.', compat: 'TV, decodificador, notebook, PS4' },
  { id: 'a1', img: 'fotos/tecnologia/a1.jpg', name: 'Adaptador USB-C a HDMI 4K', brand: 'Volt', cat: 'Cables y adaptadores', price: 18500, was: 22900, stock: 6, icon: Usb, specs: ['USB-C', 'HDMI 4K 60 Hz', 'Plug & play'], desc: 'Conectá tu notebook, tablet o celular con USB-C al televisor o monitor.', compat: 'MacBook, notebooks USB-C, Samsung DeX, iPad Pro', top: true },
  { id: 'a2', img: 'fotos/tecnologia/a2.jpg', name: 'Hub USB-C 7 en 1', brand: 'Volt', cat: 'Cables y adaptadores', price: 39900, stock: 14, icon: Usb, specs: ['HDMI 4K', '3× USB 3.0', 'SD/microSD', 'PD 100 W'], desc: 'Sumá puertos a tu notebook: HDMI, USB, lector de tarjetas y carga.', compat: 'Notebooks y tablets con USB-C' },
  { id: 'c2', img: 'fotos/tecnologia/c2.jpg', name: 'Cable USB-C a USB-C 100 W', brand: 'Volt', cat: 'Cables y adaptadores', price: 9900, stock: 65, icon: Cable, specs: ['2 m', '100 W', 'USB 2.0', 'Trenzado'], desc: 'Carga rápida para celulares, tablets y notebooks.', compat: 'iPhone 15+, Android, notebooks USB-C' },
  { id: 'c3', img: '1583863788434-e58a36330cf0', name: 'Cable Lightning a USB-C', brand: 'Volt', cat: 'Cables y adaptadores', price: 8900, stock: 3, icon: Cable, specs: ['1 m', 'Carga rápida 20 W', 'Certificado'], desc: 'Para iPhone 14 o anteriores con cargador USB-C.', compat: 'iPhone 5 a 14, AirPods' },
  { id: 's1', name: 'Chromecast con Google TV 4K', brand: 'Google', cat: 'Streaming y TV', price: 79900, stock: 11, icon: Tv, img: '1593359677879-a4bb92f829d1', specs: ['4K HDR', 'Dolby Vision', 'Control remoto', 'Wi-Fi'], desc: 'Convertí cualquier TV con HDMI en Smart TV: Netflix, YouTube, Disney+, Prime Video y más.', compat: 'Cualquier TV con entrada HDMI', free: true, top: true },
  { id: 's2', img: 'fotos/tecnologia/s2.jpg', name: 'TV Box Android 4K', brand: 'Streamy', cat: 'Streaming y TV', price: 54900, was: 64900, stock: 9, icon: Tv, specs: ['4K', 'Android TV', '4 GB RAM', '32 GB'], desc: 'Apps de streaming, YouTube y juegos en tu tele de siempre.', compat: 'TV con HDMI' },
  { id: 's3', img: 'fotos/tecnologia/s3.jpg', name: 'Soporte de TV articulado 32–65"', brand: 'Fijo', cat: 'Streaming y TV', price: 32900, stock: 18, icon: Monitor, specs: ['Hasta 40 kg', 'VESA 400×400', 'Giro 180°'], desc: 'Brazo extensible con inclinación. Incluye tornillería.' },
  { id: 'e1', img: 'fotos/tecnologia/e1.jpg', name: 'Cargador USB-C 25 W', brand: 'Volt', cat: 'Cargadores y energía', price: 16900, stock: 50, icon: Plug, specs: ['25 W', 'PD 3.0', 'PPS'], desc: 'Carga rápida para iPhone y Android.', compat: 'iPhone, Samsung, Motorola, Xiaomi' },
  { id: 'e2', img: 'fotos/tecnologia/e2.jpg', name: 'Cargador GaN 65 W 3 puertos', brand: 'Volt', cat: 'Cargadores y energía', price: 45900, stock: 12, icon: Plug, specs: ['65 W', '2× USB-C', '1× USB-A', 'GaN'], desc: 'Un solo cargador para notebook, celular y auriculares.', compat: 'Notebooks USB-C, celulares, tablets', free: true },
  { id: 'e3', name: 'Power bank 20.000 mAh', brand: 'Volt', cat: 'Cargadores y energía', price: 42900, was: 49900, stock: 20, icon: Battery, img: '1609091839311-d5365f9ff1c5', specs: ['20.000 mAh', '22,5 W', 'USB-C + USB-A'], desc: 'Hasta 4 cargas completas de celular.', top: true },
  { id: 'e4', img: 'fotos/tecnologia/e4.jpg', name: 'Zapatilla 6 tomas con USB', brand: 'Fijo', cat: 'Cargadores y energía', price: 19900, stock: 25, icon: Plug, specs: ['6 tomas', '2× USB', 'Protección sobretensión'], desc: 'Con interruptor y cable de 1,5 m.' },
  { id: 'd1', img: 'fotos/tecnologia/d1.jpg', name: 'Pendrive 64 GB USB 3.2', brand: 'Memo', cat: 'Almacenamiento', price: 11900, stock: 70, icon: Usb, specs: ['64 GB', 'USB 3.2', '100 MB/s'], desc: 'Metálico, con argolla para llavero.' },
  { id: 'd2', img: 'fotos/tecnologia/d2.jpg', name: 'Pendrive 128 GB USB 3.2', brand: 'Memo', cat: 'Almacenamiento', price: 19900, stock: 40, icon: Usb, specs: ['128 GB', 'USB 3.2', '150 MB/s'], desc: 'Para fotos, películas y backups.' },
  { id: 'd3', img: 'fotos/tecnologia/d3.jpg', name: 'Tarjeta microSD 128 GB', brand: 'Memo', cat: 'Almacenamiento', price: 17500, stock: 33, icon: HardDrive, specs: ['128 GB', 'A2 / V30', '160 MB/s'], desc: 'Para celulares, cámaras, drones y Nintendo Switch.' },
  { id: 'd4', img: '1531492746076-161ca9bcad58', name: 'Disco SSD externo 1 TB', brand: 'Memo', cat: 'Almacenamiento', price: 129000, stock: 5, icon: HardDrive, specs: ['1 TB', 'USB-C 3.2', '1.050 MB/s'], desc: 'Del tamaño de una tarjeta, resistente a golpes.', free: true },
  { id: 'u1', name: 'Auriculares Bluetooth in-ear', brand: 'Sonik', cat: 'Audio', price: 39900, was: 47900, stock: 28, icon: Headphones, img: '1590658268037-6bf12165a8df', specs: ['Bluetooth 5.3', '30 h con estuche', 'ANC'], desc: 'Cancelación de ruido activa y estuche con carga USB-C.', top: true },
  { id: 'u2', name: 'Auriculares vincha', brand: 'Sonik', cat: 'Audio', price: 59900, stock: 10, icon: Headphones, img: '1505740420928-5e560c06d30e', specs: ['Bluetooth', '50 h', 'Plegables'], desc: 'Sonido envolvente y almohadillas memory foam.' },
  { id: 'u3', name: 'Parlante Bluetooth portátil', brand: 'Sonik', cat: 'Audio', price: 54900, stock: 15, icon: Speaker, img: '1608043152269-423dbba4e7e1', specs: ['20 W', 'IPX7', '12 h'], desc: 'Resistente al agua, ideal para la pileta.' },
  { id: 'p1', name: 'Mouse inalámbrico silencioso', brand: 'Clik', cat: 'Periféricos', price: 15900, stock: 45, icon: Mouse, img: '1527864550417-7fd91fc51a46', specs: ['2.4 GHz', '1.600 DPI', 'Clic silencioso'], desc: 'Ergonómico, con receptor nano USB.' },
  { id: 'p2', name: 'Combo teclado + mouse inalámbrico', brand: 'Clik', cat: 'Periféricos', price: 34900, stock: 19, icon: Keyboard, img: '1587829741301-dc798b83add3', specs: ['Español con Ñ', '2.4 GHz', 'Pilas incluidas'], desc: 'Para la oficina o el home office.' },
  { id: 'p3', img: 'fotos/tecnologia/p3.jpg', name: 'Webcam Full HD con micrófono', brand: 'Clik', cat: 'Periféricos', price: 42900, stock: 4, icon: Webcam, specs: ['1080p 30 fps', 'Micrófono estéreo', 'USB'], desc: 'Para videollamadas por Zoom, Meet o Teams.' },
  { id: 'n1', img: '1606904825846-647eb07f5be2', name: 'Router Wi-Fi 6 doble banda', brand: 'Netix', cat: 'Redes', price: 89900, stock: 7, icon: Router, specs: ['AX1800', '2.4 + 5 GHz', '4 antenas'], desc: 'Más velocidad y menos cortes con muchos dispositivos.', free: true },
  { id: 'n2', img: 'fotos/tecnologia/n2.jpg', name: 'Repetidor Wi-Fi', brand: 'Netix', cat: 'Redes', price: 29900, stock: 16, icon: Wifi, specs: ['300 Mbps', 'Enchufable', 'Puerto LAN'], desc: 'Llevá el Wi-Fi a los ambientes donde no llega.' },
  { id: 'n3', img: 'fotos/tecnologia/n3.jpg', name: 'Cable de red Cat6 5 m', brand: 'Linkmax', cat: 'Redes', price: 6500, stock: 90, icon: Cable, specs: ['Cat6', '5 m', '1 Gbps'], desc: 'Para conectar la Smart TV, la consola o la PC por cable.' },
  { id: 'g1', name: 'Joystick inalámbrico PC / Android', brand: 'Playr', cat: 'Gaming', price: 49900, stock: 13, icon: Gamepad2, img: '1592840496694-26d035b52b48', specs: ['Bluetooth', 'Vibración', '20 h'], desc: 'Compatible con PC, Android, Smart TV y Switch.' },
]
const BUNDLES: Record<string, string[]> = { s1: ['h1', 'e1'], a1: ['h2', 'c2'], u1: ['e1'], p3: ['p2'], n1: ['n3', 'n2'], d4: ['c2'] }

/* guía ¿qué cable necesito? */
const FROM = [{ id: 'note-c', t: 'Notebook con USB-C', i: Laptop }, { id: 'note-h', t: 'Notebook con HDMI', i: Laptop }, { id: 'cel-c', t: 'Celular Android / iPhone 15+', i: Smartphone }, { id: 'tv', t: 'TV sin Smart', i: Tv }]
const TO = [{ id: 'tv', t: 'Televisor', i: Tv }, { id: 'mon', t: 'Monitor', i: Monitor }, { id: 'charge', t: 'Cargarlo rápido', i: Zap }]
const GUIDE: Record<string, { ids: string[]; why: string }> = {
  'note-c>tv': { ids: ['a1', 'h2'], why: 'Tu notebook sale por USB-C: necesitás un adaptador USB-C a HDMI y un cable HDMI hasta la tele.' },
  'note-c>mon': { ids: ['a2', 'h2'], why: 'Con un hub sumás HDMI para el monitor, más puertos USB y carga, todo por un solo cable.' },
  'note-c>charge': { ids: ['e2', 'c2'], why: 'Un cargador GaN de 65 W carga la notebook y el celular a la vez.' },
  'note-h>tv': { ids: ['h2'], why: 'Con un cable HDMI alcanza. Si tu tele es de 120 Hz, mejor el HDMI 2.1.' },
  'note-h>mon': { ids: ['h2'], why: 'Un cable HDMI 4K conecta directo la notebook al monitor.' },
  'note-h>charge': { ids: ['e4'], why: 'Tu notebook usa su cargador original; sumá una zapatilla con protección.' },
  'cel-c>tv': { ids: ['a1', 'h2'], why: 'Si tu celular admite salida de video, usá el adaptador USB-C a HDMI. Si no, el Chromecast es la opción inalámbrica.' },
  'cel-c>mon': { ids: ['a1', 'h2'], why: 'El adaptador USB-C a HDMI te permite usar el celular en un monitor.' },
  'cel-c>charge': { ids: ['e1', 'c2'], why: 'Un cargador de 25 W con cable USB-C carga al 50% en unos 30 minutos.' },
  'tv>tv': { ids: ['s1', 'h1'], why: 'Con un Chromecast tu tele de siempre se vuelve Smart: Netflix, YouTube y más.' },
  'tv>mon': { ids: ['s1'], why: 'El Chromecast también funciona en monitores con HDMI y parlantes.' },
  'tv>charge': { ids: ['s1'], why: 'Lo que buscás es convertirla en Smart: el Chromecast con Google TV.' },
}
const FREE = 60000
const off = (p: Prod) => (p.was ? Math.round((1 - p.price / p.was) * 100) : 0)

function Visual({ p, className, big }: { p: Prod; className?: string; big?: boolean }) {
  const I = p.icon
  const art = <div className="grid place-items-center rounded-full bg-white shadow-sm" style={{ width: big ? 112 : 64, height: big ? 112 : 64 }}><I className={big ? 'h-14 w-14' : 'h-8 w-8'} style={{ color: BLUE }} strokeWidth={1.6} /></div>
  return <SmartImg src={img(p.img, big ? 800 : 400, big ? 600 : 400)} alt={p.name} className={className} fallback={`linear-gradient(160deg,#fff,${SOFT})`} fallbackContent={art} />
}

export default function Tecnologia() {
  const cart = useCart('tecnologia')
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)
  const [cat, setCat] = useState<Cat | 'Todo'>('Todo')
  const [sort, setSort] = useState('Relevancia')
  const [onlyStock, setOnlyStock] = useState(false)
  const [onlyOff, setOnlyOff] = useState(false)
  const [prod, setProd] = useState<Prod | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [from, setFrom] = useState<string | null>(null)
  const [to, setTo] = useState<string | null>(null)

  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const match = (p: Prod, qq: string) => !qq || norm(`${p.name} ${p.brand} ${p.cat} ${p.specs.join(' ')} ${p.compat ?? ''}`).includes(norm(qq))
  const suggestions = q.length > 1 ? P.filter((p) => match(p, q)).slice(0, 5) : []
  const list = useMemo(() => {
    const l = P.filter((p) => (cat === 'Todo' || p.cat === cat) && match(p, q) && (!onlyStock || p.stock > 0) && (!onlyOff || p.was))
    if (sort === 'Menor precio') return [...l].sort((a, b) => a.price - b.price)
    if (sort === 'Mayor precio') return [...l].sort((a, b) => b.price - a.price)
    return [...l].sort((a, b) => +!!b.top - +!!a.top)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q, sort, onlyStock, onlyOff])
  const add = (p: Prod, qty = 1) => { cart.add({ key: p.id, name: p.name, price: p.price, detail: p.specs.slice(0, 2).join(' · '), qty }); toast(`${p.name} al carrito`) }
  const goShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  const guide = from && to ? GUIDE[`${from}>${to}`] : null

  return (
    <DemoShell slug="tecnologia" fonts="family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700" themeColor="#ffffff"
      className="pb-24" style={{ background: '#fff', color: INK, fontFamily: '"Plus Jakarta Sans", sans-serif', ['--fm' as string]: '"JetBrains Mono", monospace' }}>
      <div className="py-2 text-center text-[12.5px] font-bold" style={{ background: YEL }}>⚡ Envío gratis desde {money(FREE)} · Retiro en el día · 6 cuotas sin interés</div>
      <header className="sticky top-0 z-40 text-white" style={{ background: BLUE }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="flex shrink-0 items-center gap-1.5"><div className="grid h-9 w-9 place-items-center rounded-lg bg-white"><Plug className="h-5 w-5" style={{ color: BLUE }} /></div><div className="hidden text-lg font-extrabold leading-none tracking-tight sm:block">Conecta<span style={{ color: YEL }}>Tech</span></div></div>
          <div className="relative min-w-0 flex-1">
            <label className="flex items-center gap-2 rounded-xl bg-white px-3 text-[#0b1220]">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)} onKeyDown={(e) => { if (e.key === 'Enter') { setFocus(false); goShop() } }} placeholder="Buscá HDMI, cargador, pendrive…" className="h-11 w-full min-w-0 bg-transparent text-[15px] outline-none" />
              {q && <button onClick={() => setQ('')} aria-label="Limpiar"><X className="h-4 w-4 text-slate-400" /></button>}
            </label>
            {focus && suggestions.length > 0 && (
              <div className="animate-fade-in absolute inset-x-0 top-12 z-50 overflow-hidden rounded-xl bg-white text-[#0b1220] shadow-2xl ring-1 ring-black/5">
                {suggestions.map((p) => (
                  <button key={p.id} onMouseDown={() => { setProd(p); setFocus(false) }} className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50">
                    <p.icon className="h-5 w-5 shrink-0" style={{ color: BLUE }} /><span className="min-w-0 flex-1 truncate text-sm font-semibold">{p.name}</span><span className="text-sm font-bold">{money(p.price)}</span>
                  </button>
                ))}
                <button onMouseDown={goShop} className="w-full border-t px-3 py-2.5 text-left text-sm font-bold" style={{ color: BLUE }}>Ver todos los resultados para “{q}”</button>
              </div>
            )}
          </div>
          <button onClick={() => setCartOpen(true)} className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: YEL, color: INK }} aria-label="Carrito">
            <ShoppingCart className="h-5 w-5" />
            {cart.count > 0 && <span key={cart.count} className="animate-pop absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#0b1220] px-1 text-[11px] font-bold text-white">{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl text-white" style={{ background: `linear-gradient(120deg, ${INK} 30%, ${BLUE})` }}>
          <SmartImg eager src={img('1550009158-9ebf69173e03', 1200, 800)} alt="Accesorios de tecnología" fallback="transparent" className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 md:block" />
          <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-(family-name:--fm) text-[11px] font-bold uppercase tracking-wider">Semana del streaming · hasta 20% off</div>
              <h1 className="animate-fade-up mt-3 text-[38px] font-extrabold leading-[1.02] tracking-tight sm:text-6xl" style={{ animationDelay: '80ms' }}>Tu tele, Smart.<br /><span style={{ color: YEL }}>Hoy mismo.</span></h1>
              <p className="animate-fade-up mt-3 max-w-md text-[15px] text-white/75" style={{ animationDelay: '160ms' }}>Chromecast, cables, cargadores y todo lo que tu casa necesita para conectarse. Comprá online y retiralo en una hora.</p>
              <div className="animate-fade-up mt-5 flex flex-wrap gap-2" style={{ animationDelay: '240ms' }}>
                <button onClick={() => setProd(P.find((p) => p.id === 's1')!)} className="rounded-xl px-5 py-3.5 font-extrabold" style={{ background: YEL, color: INK }}>Ver Chromecast · {money(79900)}</button>
                <a href="#guia" className="rounded-xl bg-white/10 px-5 py-3.5 font-bold">¿Qué cable necesito?</a>
              </div>
            </div>
            <div className="hidden justify-self-center md:block">
              <div className="relative grid h-56 w-56 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"><Tv className="h-24 w-24" strokeWidth={1.2} /><span className="absolute -right-2 top-6 rotate-12 rounded-lg px-3 py-1.5 font-(family-name:--fm) text-sm font-bold" style={{ background: YEL, color: INK }}>4K HDR</span></div>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px] font-semibold">
          {[{ i: Truck, t: 'Envío en 24 h' }, { i: Store, t: 'Retiro en 1 hora' }, { i: ShieldCheck, t: 'Garantía 6 meses' }].map(({ i: I, t }) => <div key={t} className="flex flex-col items-center gap-1 rounded-2xl p-3" style={{ background: SOFT }}><I className="h-5 w-5" style={{ color: BLUE }} />{t}</div>)}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <h2 className="text-2xl font-extrabold tracking-tight">Categorías</h2>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {CATS.map(({ c, i: I }) => (
            <button key={c} onClick={() => { setCat(cat === c ? 'Todo' : c); goShop() }} className={cx('flex flex-col items-center gap-1.5 rounded-2xl p-2.5 text-center text-[11.5px] font-bold leading-tight transition', cat === c ? 'text-white' : '')} style={{ background: cat === c ? BLUE : SOFT }}>
              <I className="h-6 w-6" style={{ color: cat === c ? YEL : BLUE }} />{c}
            </button>
          ))}
        </div>
      </section>

      {/* GUÍA */}
      <section id="guia" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-12">
        <Reveal className="rounded-3xl p-5 sm:p-8" style={{ background: SOFT }}>
          <div className="flex items-center gap-2 font-(family-name:--fm) text-[12px] font-bold uppercase tracking-wider" style={{ color: BLUE }}><Sparkles className="h-4 w-4" /> Asistente</div>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight">¿Qué cable necesito?</h2>
          <p className="text-[14px] text-slate-600">Elegí qué querés conectar y te decimos exactamente qué llevar.</p>
          <div className="mt-4 text-[13px] font-bold">1. Tengo…</div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FROM.map((f) => <button key={f.id} onClick={() => setFrom(f.id)} className={cx('flex items-center gap-2 rounded-xl bg-white p-3 text-left text-[13px] font-semibold ring-2 transition', from === f.id ? 'ring-[#1d4ed8]' : 'ring-transparent')}><f.i className="h-5 w-5 shrink-0" style={{ color: BLUE }} />{f.t}</button>)}
          </div>
          <div className="mt-4 text-[13px] font-bold">2. Quiero…</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {TO.map((f) => <button key={f.id} onClick={() => setTo(f.id)} className={cx('flex items-center gap-2 rounded-xl bg-white p-3 text-left text-[13px] font-semibold ring-2 transition', to === f.id ? 'ring-[#1d4ed8]' : 'ring-transparent')}><f.i className="h-5 w-5 shrink-0" style={{ color: BLUE }} /><span>{f.id === 'charge' ? f.t : `Conectarlo a ${f.t.toLowerCase()}`}</span></button>)}
          </div>
          {guide && (
            <div className="animate-fade-up mt-5 rounded-2xl bg-white p-4">
              <p className="text-[14px] font-semibold">{guide.why}</p>
              <div className="mt-3 space-y-2">
                {guide.ids.map((id) => { const p = P.find((x) => x.id === id)!; return (
                  <div key={id} className="flex items-center gap-3 rounded-xl p-2" style={{ background: SOFT }}>
                    <Visual p={p} className="h-12 w-12 shrink-0 rounded-lg" />
                    <button onClick={() => setProd(p)} className="min-w-0 flex-1 text-left"><div className="truncate text-sm font-bold">{p.name}</div><div className="text-[12px] text-slate-500">{money(p.price)}</div></button>
                  </div>) })}
              </div>
              <button onClick={() => { guide.ids.forEach((id) => add(P.find((x) => x.id === id)!)); setCartOpen(true) }} className="mt-3 w-full rounded-xl py-3 font-extrabold text-white" style={{ background: BLUE }}>Agregar todo · {money(guide.ids.reduce((s, id) => s + P.find((x) => x.id === id)!.price, 0))}</button>
            </div>
          )}
        </Reveal>
        <Tip className="mt-4">el asistente responde la pregunta que más te hacen en el mostrador, y convierte la duda en una venta de 2 o 3 productos.</Tip>
      </section>

      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight">{cat === 'Todo' ? (q ? `Resultados para “${q}”` : 'Todos los productos') : cat}</h2>
          <span className="shrink-0 font-(family-name:--fm) text-[12px] text-slate-500">{list.length} ítems</span>
        </div>
        <Tip className="mt-3 !mx-0">el stock se ve en cada producto: el cliente sabe si lo tenés antes de venir, y "últimas unidades" acelera la decisión.</Tip>
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-[13px] font-bold" aria-label="Ordenar">{['Relevancia', 'Menor precio', 'Mayor precio'].map((s) => <option key={s}>{s}</option>)}</select>
          <button onClick={() => setOnlyOff(!onlyOff)} className={cx('shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-bold', onlyOff ? 'border-transparent' : 'border-slate-200')} style={onlyOff ? { background: YEL } : undefined}>% Ofertas</button>
          <button onClick={() => setOnlyStock(!onlyStock)} className={cx('shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-bold', onlyStock ? 'border-transparent text-white' : 'border-slate-200')} style={onlyStock ? { background: BLUE } : undefined}>Con stock</button>
          {cat !== 'Todo' && <button onClick={() => setCat('Todo')} className="shrink-0 rounded-full border border-slate-200 px-3.5 py-2 text-[13px] font-bold">✕ {cat}</button>}
          {q && <button onClick={() => setQ('')} className="shrink-0 rounded-full border border-slate-200 px-3.5 py-2 text-[13px] font-bold">✕ “{q}”</button>}
        </div>
        {list.length === 0 ? (
          <div className="mt-5 rounded-3xl p-8 text-center" style={{ background: SOFT }}><p className="font-bold">No encontramos “{q}”.</p><p className="text-sm text-slate-500">Escribinos y te lo conseguimos.</p><button onClick={() => { setQ(''); setCat('Todo'); setOnlyOff(false) }} className="mt-3 rounded-xl px-5 py-2.5 text-sm font-bold text-white" style={{ background: BLUE }}>Ver todo</button></div>
        ) : (
          <div key={cat + q + sort + onlyOff + onlyStock} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {list.map((p, i) => (
              <div key={p.id} className="animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg" style={{ animationDelay: `${Math.min(i, 8) * 35}ms` }}>
                <button onClick={() => setProd(p)} className="relative block" aria-label={`Ver ${p.name}`}>
                  <Visual p={p} className="aspect-square" />
                  {p.was && <span className="absolute left-2 top-2 rounded-md px-1.5 py-0.5 font-(family-name:--fm) text-[11px] font-bold" style={{ background: YEL }}>-{off(p)}%</span>}
                  {p.free && <span className="absolute right-2 top-2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">Envío gratis</span>}
                </button>
                <div className="flex flex-1 flex-col p-3">
                  <div className="font-(family-name:--fm) text-[10.5px] uppercase text-slate-400">{p.brand}</div>
                  <button onClick={() => setProd(p)} className="text-left text-[14px] font-bold leading-tight">{p.name}</button>
                  <div className="mt-1.5 flex flex-wrap gap-1">{p.specs.slice(0, 2).map((s) => <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 font-(family-name:--fm) text-[10px] font-bold text-slate-600">{s}</span>)}</div>
                  <div className="mt-auto pt-2">
                    {p.was && <div className="text-[11px] text-slate-400 line-through">{money(p.was)}</div>}
                    <div className="text-lg font-extrabold leading-tight">{money(p.price)}</div>
                    <div className="text-[11px] text-slate-500">6 × {money(p.price / 6)} sin interés</div>
                    <div className={cx('mt-1 text-[11px] font-bold', p.stock <= 6 ? 'text-orange-600' : 'text-emerald-600')}>{p.stock <= 6 ? `¡Últimas ${p.stock} unidades!` : 'En stock'}</div>
                    <button onClick={() => add(p)} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-extrabold text-white transition active:scale-95" style={{ background: BLUE }}><Plus className="h-4 w-4" /> Agregar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LOCAL */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <Reveal className="grid gap-4 rounded-3xl p-6 text-white sm:grid-cols-3" style={{ background: INK }}>
          <div className="sm:col-span-2">
            <h2 className="text-2xl font-extrabold">Vení al local</h2>
            <p className="mt-1 text-white/70">Calle 14 N° 4620, Berazategui · Lun a sáb 9:30 a 20:00. Te probamos el producto antes de llevarlo.</p>
          </div>
          <button onClick={() => toast('En la web real abre Google Maps')} className="self-center rounded-xl py-3.5 font-extrabold" style={{ background: YEL, color: INK }}>Cómo llegar</button>
        </Reveal>
      </section>
      <footer className="px-4 py-10 text-center text-[13px] text-slate-500">Conecta Tech · Accesorios y tecnología · @conectatech.bera</footer>

      {cart.count > 0 && !cartOpen && !prod && !checkout && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 p-3 pl-[150px] sm:pl-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-2xl px-5 py-3.5 font-extrabold shadow-2xl" style={{ background: YEL, color: INK }}><span className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> {cart.count}</span><span>Ver carrito · {money(cart.total)}</span></button>
        </div>
      )}

      <ProductSheet p={prod} onClose={() => setProd(null)} onAdd={(p, qty) => { add(p, qty); setProd(null) }} onBundle={(ids) => { ids.forEach((id) => add(P.find((x) => x.id === id)!)); setProd(null); setCartOpen(true) }} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onCheckout={() => { setCartOpen(false); setCheckout(true) }} />
      <Checkout open={checkout} onClose={() => setCheckout(false)} cart={cart} />
    </DemoShell>
  )
}

function ProductSheet({ p, onClose, onAdd, onBundle }: { p: Prod | null; onClose: () => void; onAdd: (p: Prod, qty: number) => void; onBundle: (ids: string[]) => void }) {
  const [qty, setQty] = useState(1)
  const [last, setLast] = useState<string | null>(null)
  if (p && p.id !== last) { setLast(p.id); setQty(1) }
  if (!p) return null
  const bundle = BUNDLES[p.id]?.map((id) => P.find((x) => x.id === id)!)
  const bTotal = bundle ? (p.price + bundle.reduce((s, x) => s + x.price, 0)) : 0
  return (
    <Sheet open onClose={onClose} side="right" className="bg-white" label={p.name}>
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: INK }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative"><Visual p={p} className="aspect-[4/3]" big /><button onClick={onClose} className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white shadow" aria-label="Volver"><ArrowLeft className="h-5 w-5" /></button></div>
          <div className="p-5">
            <div className="font-(family-name:--fm) text-[12px] uppercase text-slate-400">{p.brand} · {p.cat}</div>
            <h3 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-extrabold">{money(p.price)}</span>{p.was && <><span className="text-slate-400 line-through">{money(p.was)}</span><span className="rounded px-1.5 font-(family-name:--fm) text-sm font-bold" style={{ background: YEL }}>-{off(p)}%</span></>}</div>
            <div className="text-[13px] text-slate-500">6 cuotas sin interés de {money(p.price / 6)} · 10% off con transferencia</div>
            <div className={cx('mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold', p.stock <= 6 ? 'bg-orange-50 text-orange-700' : 'bg-emerald-50 text-emerald-700')}><span className="h-2 w-2 rounded-full bg-current" />{p.stock <= 6 ? `Quedan ${p.stock} unidades` : `${p.stock} unidades disponibles`}</div>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{p.desc}</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <div className="bg-slate-50 px-3 py-2 text-[12px] font-bold uppercase tracking-wider text-slate-500">Especificaciones</div>
              {p.specs.map((s) => <div key={s} className="flex items-center gap-2 border-t border-slate-100 px-3 py-2 font-(family-name:--fm) text-[13px]"><Check className="h-4 w-4 text-emerald-600" />{s}</div>)}
              {p.compat && <div className="border-t border-slate-100 px-3 py-2 text-[13px]"><b>Compatible con:</b> {p.compat}</div>}
            </div>
            {bundle && (
              <div className="mt-5 rounded-2xl p-4" style={{ background: SOFT }}>
                <div className="text-sm font-extrabold">Comprados juntos habitualmente</div>
                <div className="mt-3 flex items-center gap-2">
                  {[p, ...bundle].map((x, i) => <div key={x.id} className="flex items-center gap-2">{i > 0 && <Plus className="h-4 w-4 text-slate-400" />}<Visual p={x} className="h-14 w-14 rounded-xl" /></div>)}
                </div>
                <div className="mt-2 text-[13px] text-slate-600">{[p, ...bundle].map((x) => x.name).join(' + ')}</div>
                <button onClick={() => onBundle([p.id, ...bundle.map((x) => x.id)])} className="mt-3 w-full rounded-xl py-3 text-[14px] font-extrabold text-white" style={{ background: INK }}>Llevar los {bundle.length + 1} · {money(bTotal)}</button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-slate-200 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center rounded-xl border border-slate-200">
            <button onClick={() => setQty((x) => Math.max(1, x - 1))} className="grid h-12 w-10 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <button onClick={() => setQty((x) => Math.min(p.stock, x + 1))} className="grid h-12 w-10 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={() => onAdd(p, qty)} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl font-extrabold text-white" style={{ background: BLUE }}><ShoppingCart className="h-5 w-5" /> Agregar · {money(p.price * qty)}</button>
        </div>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart, onCheckout }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart>; onCheckout: () => void }) {
  const pct = Math.min(100, (cart.total / FREE) * 100)
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-white" label="Carrito">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: INK }}>
        <div className="flex items-center justify-between border-b border-slate-200 p-4"><div className="text-xl font-extrabold">Tu carrito</div><button onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6" /></button></div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingCart className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 font-bold">Tu carrito está vacío</p><button onClick={onClose} className="mt-4 rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ background: BLUE }}>Ver productos</button></div></div>
        ) : (
          <>
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="text-[13px]">{pct >= 100 ? <b className="text-emerald-700">¡Tenés envío gratis!</b> : <>Sumá <b>{money(FREE - cart.total)}</b> y el envío es gratis</>}</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: pct >= 100 ? '#059669' : BLUE }} /></div>
            </div>
            <ul className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto px-4">
              {cart.lines.map((l) => { const p = P.find((x) => x.id === l.key)!; return (
                <li key={l.key} className="flex items-center gap-3 py-3">
                  <Visual p={p} className="h-16 w-16 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1"><div className="truncate text-sm font-bold">{l.name}</div><div className="font-(family-name:--fm) text-[11px] text-slate-500">{l.detail}</div><div className="font-extrabold">{money(l.price * l.qty)}</div></div>
                  <div className="flex items-center rounded-lg border border-slate-200">
                    <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                    <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                    <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </li>) })}
            </ul>
            <div className="border-t border-slate-200 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between text-lg font-extrabold"><span>Subtotal</span><span>{money(cart.total)}</span></div>
              <div className="text-[12px] text-slate-500">6 cuotas sin interés de {money(cart.total / 6)}</div>
              <button onClick={onCheckout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-extrabold text-white" style={{ background: BLUE }}><Lock className="h-4 w-4" /> Finalizar compra</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}

function Checkout({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState({ name: '', email: '', ship: 'retiro', addr: '', pay: 'tarjeta', cuotas: 6 })
  const [done, setDone] = useState<null | { n: string; total: number }>(null)
  const [busy, setBusy] = useState(false)
  const ship = d.ship === 'envio' && cart.total < FREE ? 3900 : 0
  const disc = d.pay === 'transferencia' ? cart.total * 0.1 : 0
  const total = cart.total - disc + ship
  const ok = [d.name.trim().length > 2 && /\S+@\S+\.\S+/.test(d.email), d.ship === 'retiro' || d.addr.trim().length > 4, true][step]
  const close = () => { onClose(); if (done) { setDone(null); setStep(0) } }
  const field = 'w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#1d4ed8]'
  return (
    <Sheet open={open} onClose={close} side="right" className="bg-white" label="Finalizar compra">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: INK }}>
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          {!done && step > 0 ? <button onClick={() => setStep(step - 1)} aria-label="Atrás"><ArrowLeft className="h-6 w-6" /></button> : <span className="w-6" />}
          <div className="flex items-center gap-1.5 font-extrabold"><Lock className="h-4 w-4" /> Compra segura</div>
          <button onClick={close} aria-label="Cerrar"><X className="h-6 w-6" /></button>
        </div>
        {done ? (
          <div className="flex-1 overflow-y-auto p-6 text-center">
            <div className="animate-pop mx-auto grid h-20 w-20 place-items-center rounded-full text-white" style={{ background: BLUE }}><PackageCheck className="h-10 w-10" /></div>
            <div className="mt-4 text-2xl font-extrabold">¡Compra confirmada!</div>
            <p className="text-slate-500">Pedido <b className="font-(family-name:--fm)">{done.n}</b> · {money(done.total)}</p>
            <div className="mt-5 rounded-2xl p-4 text-left text-sm" style={{ background: SOFT }}>{d.ship === 'retiro' ? <>🏪 <b>Retiralo en 1 hora</b> en Calle 14 N° 4620 mostrando el número de pedido.</> : <>🚚 <b>Llega en 24 h</b> a {d.addr}. Te avisamos por WhatsApp cuando sale.</>}</div>
            <p className="mt-3 text-[12px] text-slate-400">Demostración: no se realizó ningún cobro.</p>
            <button onClick={close} className="mt-4 w-full rounded-xl py-4 font-extrabold text-white" style={{ background: BLUE }}>Seguir comprando</button>
          </div>
        ) : (
          <>
            <div className="flex gap-1 px-4 pt-4">{['Datos', 'Entrega', 'Pago'].map((s, i) => <div key={s} className="flex-1"><div className="h-1 rounded-full" style={{ background: i <= step ? BLUE : '#e2e8f0' }} /><div className={cx('mt-1 text-[11px] font-bold', i > step && 'text-slate-400')}>{s}</div></div>)}</div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {step === 0 && <><input className={field} placeholder="Nombre y apellido" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /><input className={field} type="email" placeholder="Email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} /></>}
              {step === 1 && <>
                {[{ v: 'retiro', t: 'Retiro en el local', s: 'Gratis · listo en 1 hora', i: Store }, { v: 'envio', t: 'Envío a domicilio', s: cart.total >= FREE ? 'Gratis · 24 h' : `${money(3900)} · 24 h`, i: Truck }].map((o) => (
                  <button key={o.v} onClick={() => setD({ ...d, ship: o.v })} className={cx('flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left', d.ship === o.v ? 'border-[#1d4ed8]' : 'border-slate-200')}><o.i className="h-5 w-5" style={{ color: BLUE }} /><div className="flex-1"><div className="font-bold">{o.t}</div><div className="text-[13px] text-slate-500">{o.s}</div></div>{d.ship === o.v && <Check className="h-5 w-5" style={{ color: BLUE }} />}</button>
                ))}
                {d.ship === 'envio' && <input className={field} placeholder="Dirección de entrega" value={d.addr} onChange={(e) => setD({ ...d, addr: e.target.value })} />}
              </>}
              {step === 2 && <>
                {[{ v: 'tarjeta', t: 'Tarjeta de crédito', s: 'Hasta 6 cuotas sin interés', i: CreditCard }, { v: 'transferencia', t: 'Transferencia', s: '10% de descuento', i: Zap }, { v: 'local', t: 'Pagar al retirar', s: 'Efectivo o débito', i: Store }].map((o) => (
                  <button key={o.v} onClick={() => setD({ ...d, pay: o.v })} className={cx('flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left', d.pay === o.v ? 'border-[#1d4ed8]' : 'border-slate-200')}><o.i className="h-5 w-5" style={{ color: BLUE }} /><div className="flex-1"><div className="font-bold">{o.t}</div><div className="text-[13px] text-slate-500">{o.s}</div></div>{d.pay === o.v && <Check className="h-5 w-5" style={{ color: BLUE }} />}</button>
                ))}
                {d.pay === 'tarjeta' && <div className="grid grid-cols-3 gap-2">{[1, 3, 6].map((c) => <button key={c} onClick={() => setD({ ...d, cuotas: c })} className={cx('rounded-xl border-2 py-2.5 text-center text-sm font-bold', d.cuotas === c ? 'border-[#1d4ed8]' : 'border-slate-200')}>{c} × {money(total / c)}</button>)}</div>}
              </>}
            </div>
            <div className="border-t border-slate-200 p-4 text-sm" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              {disc > 0 && <div className="flex justify-between text-emerald-700"><span>10% transferencia</span><span>−{money(disc)}</span></div>}
              <div className="flex justify-between"><span>Envío</span><span>{ship ? money(ship) : 'Gratis'}</span></div>
              <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>{money(total)}</span></div>
              <button disabled={!ok || busy || !cart.lines.length} onClick={() => { if (step < 2) setStep(step + 1); else { setBusy(true); setTimeout(() => { setDone({ n: `CT-${Math.floor(10000 + Math.random() * 89999)}`, total }); cart.clear(); setBusy(false) }, 1200) } }} className="mt-3 w-full rounded-xl py-4 font-extrabold text-white disabled:opacity-35" style={{ background: BLUE }}>{busy ? 'Procesando…' : step < 2 ? 'Continuar' : `Confirmar · ${money(total)}`}</button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
