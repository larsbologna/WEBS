import { useMemo, useState } from 'react'
import { ArrowRight, BadgePercent, Cable, Check, ChevronRight, Clock, Gamepad2, HardDrive, Headphones, Laptop, MapPin, MessageCircle, Minus, Monitor, Plus, Search, ShieldCheck, ShoppingCart, Smartphone, Sparkles, Trash2, Tv, Wifi, X, Zap } from 'lucide-react'
import { DemoShell, Reveal, Sheet, SmartImg, Tip, toast } from '../../shared/ui'
import { useCart } from '../../shared/useCart'
import { WhatsAppOrderButton } from '../../shared/whatsapp'
import { cx, img, money } from '../../shared/format'

/* Conecta Tech: celulares, accesorios y todo para conectar. El cliente arma el carrito
   y lo manda por WhatsApp; entrega y pago los coordina el local por el chat. */

const BIZ = 'Conecta Tech'
const INK = '#0a0f1f', BLUE = '#2347ff', SKY = '#eaf0ff', LIME = '#c6f432', LINE = '#e5e8f0', MUTED = '#5b6478'

type Cat = 'Celulares' | 'Audio' | 'Cables y HDMI' | 'Cargadores' | 'Computación' | 'Streaming y TV' | 'Almacenamiento' | 'Gaming' | 'Redes'
type Variant = { label: string; price: number }
type Prod = {
  id: string; name: string; brand: string; cat: Cat; price: number; was?: number; img: string
  specs: string[]; desc: string; compat?: string; variants?: Variant[]; top?: boolean; isNew?: boolean
}

const CATS: { c: Cat; i: typeof Cable; img: string }[] = [
  { c: 'Celulares', i: Smartphone, img: '1556656793-08538906a9f8' },
  { c: 'Audio', i: Headphones, img: '1505740420928-5e560c06d30e' },
  { c: 'Cables y HDMI', i: Cable, img: 'fotos/tecnologia/h1.jpg' },
  { c: 'Cargadores', i: Zap, img: '1609091839311-d5365f9ff1c5' },
  { c: 'Computación', i: Laptop, img: '1611186871348-b1ce696e52c9' },
  { c: 'Streaming y TV', i: Tv, img: '1593359677879-a4bb92f829d1' },
  { c: 'Almacenamiento', i: HardDrive, img: 'fotos/tecnologia/d3.jpg' },
  { c: 'Gaming', i: Gamepad2, img: '1592840496694-26d035b52b48' },
  { c: 'Redes', i: Wifi, img: '1606904825846-647eb07f5be2' },
]

const P: Prod[] = [
  // Celulares
  { id: 'sa56', name: 'Galaxy A56 5G', brand: 'Samsung', cat: 'Celulares', price: 749999, was: 829999, img: '1600087626014-e652e18bbff2', top: true, isNew: true,
    specs: ['6,7" AMOLED 120 Hz', 'Cámara 50 MP', '5000 mAh', '5G'], desc: 'Pantalla grande y brillante, cámara que saca buenas fotos de noche y batería para todo el día. Liberado para cualquier compañía.',
    variants: [{ label: '128 GB', price: 749999 }, { label: '256 GB', price: 829999 }] },
  { id: 'sa16', name: 'Galaxy A16', brand: 'Samsung', cat: 'Celulares', price: 329999, img: '1601784551446-20c9e07cdbdb',
    specs: ['6,7" Super AMOLED', '50 MP', '5000 mAh', '6 años de actualizaciones'], desc: 'El Samsung que rinde y dura: pantalla grande, buena batería y actualizaciones por años.',
    variants: [{ label: '128 GB', price: 329999 }, { label: '256 GB', price: 379999 }] },
  { id: 'mg85', name: 'Moto G85 5G', brand: 'Motorola', cat: 'Celulares', price: 459999, was: 499999, img: '1546054454-aa26e2b734c7', top: true,
    specs: ['6,7" pOLED curva', '50 MP con OIS', '5000 mAh', 'Carga 30 W'], desc: 'Pantalla curva, cámara estabilizada y carga rápida. Uno de los mejores en relación precio-calidad.',
    variants: [{ label: '256 GB · 8 GB RAM', price: 459999 }] },
  { id: 'me50', name: 'Edge 50 Fusion', brand: 'Motorola', cat: 'Celulares', price: 599999, img: '1585060544812-6b45742d762f',
    specs: ['6,7" pOLED 144 Hz', '50 MP Sony', 'IP68', 'Carga 68 W'], desc: 'Diseño fino, resistente al agua y con carga súper rápida: del 0 al 50% en 15 minutos.',
    variants: [{ label: '256 GB', price: 599999 }] },
  { id: 'xr14', name: 'Redmi Note 14', brand: 'Xiaomi', cat: 'Celulares', price: 399999, img: '1512054502232-10a0a035d672', isNew: true,
    specs: ['6,67" AMOLED', '108 MP', '5500 mAh', 'NFC'], desc: 'Cámara de 108 MP, batería enorme y NFC para pagar con el celular.',
    variants: [{ label: '128 GB', price: 399999 }, { label: '256 GB', price: 449999 }] },
  { id: 'ip15', name: 'iPhone 15', brand: 'Apple', cat: 'Celulares', price: 1299999, img: '1510557880182-3d4d3cba35a5', top: true,
    specs: ['6,1" Super Retina', 'Dynamic Island', '48 MP', 'USB-C'], desc: 'Nuevo, sellado, con garantía oficial. Cámara de 48 MP y conector USB-C.',
    variants: [{ label: '128 GB', price: 1299999 }, { label: '256 GB', price: 1499999 }] },
  { id: 'ip16', name: 'iPhone 16', brand: 'Apple', cat: 'Celulares', price: 1599999, img: '1511707171634-5f897ff02aa9', isNew: true,
    specs: ['6,1" Super Retina', 'Chip A18', 'Botón de cámara', 'USB-C'], desc: 'Chip A18, botón de control de cámara y batería que dura más. Nuevo y sellado.',
    variants: [{ label: '128 GB', price: 1599999 }, { label: '256 GB', price: 1799999 }] },
  // Audio
  { id: 'au1', name: 'Auriculares Bluetooth in-ear ANC', brand: 'Sonik', cat: 'Audio', price: 39900, was: 47900, img: '1590658268037-6bf12165a8df', top: true,
    specs: ['Bluetooth 5.3', 'Cancelación de ruido', '30 h con estuche'], desc: 'Cancelación de ruido activa, estuche con carga USB-C y micrófono para llamadas.' },
  { id: 'au2', name: 'Auriculares vincha inalámbricos', brand: 'Sonik', cat: 'Audio', price: 59900, img: '1505740420928-5e560c06d30e',
    specs: ['Bluetooth', '50 h de batería', 'Plegables'], desc: 'Sonido envolvente y almohadillas cómodas para usar todo el día.' },
  { id: 'au3', name: 'Parlante Bluetooth portátil', brand: 'Sonik', cat: 'Audio', price: 54900, img: '1608043152269-423dbba4e7e1',
    specs: ['20 W', 'Resistente al agua IPX7', '12 h'], desc: 'Resiste salpicaduras y chapuzones: ideal para la pileta o el asado.' },
  { id: 'au4', name: 'Auriculares inalámbricos con estuche', brand: 'Sonik', cat: 'Audio', price: 29900, img: '1610438235354-a6ae5528385c',
    specs: ['Bluetooth 5.3', '24 h con estuche', 'Táctiles'], desc: 'Livianos y cómodos, con controles táctiles y estuche de carga.' },
  // Cables y HDMI
  { id: 'h1', name: 'Cable HDMI 2.1 8K · 2 m', brand: 'Linkmax', cat: 'Cables y HDMI', price: 12900, img: 'fotos/tecnologia/h1.jpg', top: true,
    specs: ['8K 60 Hz', '4K 120 Hz', '48 Gbps'], desc: 'Para PS5, Xbox Series y TVs 4K de 120 Hz. Conectores bañados en oro.', compat: 'PS5, Xbox Series, TV 4K/8K, notebooks' },
  { id: 'h2', name: 'Cable HDMI 2.0 4K · 1,5 m', brand: 'Linkmax', cat: 'Cables y HDMI', price: 6900, img: '1588508065123-287b28e013da',
    specs: ['4K 60 Hz', 'HDR', '18 Gbps'], desc: 'El cable de siempre para TV, decodificador, notebook o consola.', compat: 'TV, deco, notebook, PS4' },
  { id: 'a1', name: 'Adaptador USB-C a HDMI 4K', brand: 'Volt', cat: 'Cables y HDMI', price: 18500, was: 22900, img: 'fotos/tecnologia/a1.jpg',
    specs: ['USB-C', 'HDMI 4K 60 Hz', 'Plug & play'], desc: 'Conectá la notebook, tablet o celular con USB-C al televisor o monitor.', compat: 'MacBook, notebooks USB-C, Samsung DeX' },
  { id: 'a2', name: 'Hub USB-C 7 en 1', brand: 'Volt', cat: 'Cables y HDMI', price: 39900, img: 'fotos/tecnologia/a2.jpg',
    specs: ['HDMI 4K', '3× USB 3.0', 'SD/microSD', 'Carga 100 W'], desc: 'Sumale puertos a tu notebook: HDMI, USB, lector de tarjetas y carga.', compat: 'Notebooks y tablets con USB-C' },
  { id: 'c2', name: 'Cable USB-C a USB-C 100 W · 2 m', brand: 'Volt', cat: 'Cables y HDMI', price: 9900, img: 'fotos/tecnologia/c2.jpg',
    specs: ['100 W', 'Trenzado', '2 m'], desc: 'Carga rápida para celulares, tablets y notebooks.', compat: 'iPhone 15+, Android, notebooks USB-C' },
  { id: 'c3', name: 'Cable Lightning a USB-C', brand: 'Volt', cat: 'Cables y HDMI', price: 8900, img: '1583863788434-e58a36330cf0',
    specs: ['1 m', 'Carga rápida 20 W', 'Certificado'], desc: 'Para iPhone 14 o anteriores con cargador USB-C.', compat: 'iPhone 5 a 14, AirPods' },
  // Cargadores
  { id: 'e1', name: 'Cargador USB-C 25 W', brand: 'Volt', cat: 'Cargadores', price: 16900, img: 'fotos/tecnologia/e1.jpg', top: true,
    specs: ['25 W', 'PD 3.0', 'PPS'], desc: 'Carga rápida para iPhone y Android: del 0 al 50% en unos 30 minutos.', compat: 'iPhone, Samsung, Motorola, Xiaomi' },
  { id: 'e2', name: 'Cargador GaN 65 W · 3 puertos', brand: 'Volt', cat: 'Cargadores', price: 45900, img: 'fotos/tecnologia/e2.jpg',
    specs: ['65 W', '2× USB-C + USB-A', 'GaN'], desc: 'Un solo cargador para notebook, celular y auriculares.' },
  { id: 'e3', name: 'Power bank 20.000 mAh', brand: 'Volt', cat: 'Cargadores', price: 42900, was: 49900, img: '1609091839311-d5365f9ff1c5',
    specs: ['20.000 mAh', '22,5 W', 'USB-C + USB-A'], desc: 'Hasta 4 cargas completas de celular.' },
  { id: 'e5', name: 'Cargador inalámbrico magnético', brand: 'Volt', cat: 'Cargadores', price: 24900, img: '1615526675159-e248c3021d3f',
    specs: ['15 W', 'Magnético', 'USB-C'], desc: 'Apoyás el celular y carga. Compatible con fundas magnéticas.', compat: 'iPhone 12 o superior, Android con carga inalámbrica' },
  { id: 'e4', name: 'Zapatilla 6 tomas con USB', brand: 'Fijo', cat: 'Cargadores', price: 19900, img: 'fotos/tecnologia/e4.jpg',
    specs: ['6 tomas', '2× USB', 'Protección'], desc: 'Con interruptor, protección contra picos de tensión y cable de 1,5 m.' },
  // Computación
  { id: 'nb1', name: 'Notebook 15,6" Core i5 · 16 GB', brand: 'Nova', cat: 'Computación', price: 949999, img: '1611186871348-b1ce696e52c9', isNew: true,
    specs: ['Intel Core i5', '16 GB RAM', 'SSD 512 GB', 'Full HD'], desc: 'Para estudiar, trabajar y hacer de todo sin trabas. Windows 11 instalado.' },
  { id: 'tb1', name: 'Tablet 11" 128 GB', brand: 'Nova', cat: 'Computación', price: 399999, img: '1544244015-0df4b3ffc6b0',
    specs: ['11" 2K', '128 GB', '8000 mAh', 'Wi-Fi'], desc: 'Pantalla grande para series, clases y videollamadas.' },
  { id: 'mo1', name: 'Monitor 24" Full HD IPS', brand: 'Nova', cat: 'Computación', price: 189999, img: '1619953942547-233eab5a70d6',
    specs: ['24" IPS', '75 Hz', 'HDMI + VGA'], desc: 'Más pantalla para el home office. Colores fieles y bordes finos.' },
  { id: 'p1', name: 'Mouse inalámbrico silencioso', brand: 'Clik', cat: 'Computación', price: 15900, img: '1527864550417-7fd91fc51a46',
    specs: ['2.4 GHz', '1.600 DPI', 'Clic silencioso'], desc: 'Ergonómico, con receptor nano USB.' },
  { id: 'p2', name: 'Combo teclado + mouse inalámbrico', brand: 'Clik', cat: 'Computación', price: 34900, img: '1587829741301-dc798b83add3',
    specs: ['Español con Ñ', '2.4 GHz', 'Pilas incluidas'], desc: 'Para la oficina o el home office.' },
  { id: 'p3', name: 'Webcam Full HD con micrófono', brand: 'Clik', cat: 'Computación', price: 42900, img: 'fotos/tecnologia/p3.jpg',
    specs: ['1080p', 'Micrófono estéreo', 'USB'], desc: 'Para videollamadas por Zoom, Meet o Teams.' },
  { id: 'pr1', name: 'Impresora multifunción Wi-Fi', brand: 'Printa', cat: 'Computación', price: 219999, img: '1612815154858-60aa4c59eaa6',
    specs: ['Imprime, copia y escanea', 'Wi-Fi', 'Desde el celular'], desc: 'Imprimí desde el celular o la compu, sin cables.' },
  // Streaming y TV
  { id: 's1', name: 'Chromecast con Google TV 4K', brand: 'Google', cat: 'Streaming y TV', price: 79900, img: '1593359677879-a4bb92f829d1', top: true,
    specs: ['4K HDR', 'Control remoto', 'Wi-Fi'], desc: 'Convertí cualquier TV con HDMI en Smart TV: Netflix, YouTube, Disney+ y más.', compat: 'Cualquier TV con entrada HDMI' },
  { id: 's2', name: 'TV Box Android 4K', brand: 'Streamy', cat: 'Streaming y TV', price: 54900, was: 64900, img: 'fotos/tecnologia/s2.jpg',
    specs: ['4K', 'Android TV', '4 GB RAM'], desc: 'Apps de streaming, YouTube y juegos en tu tele de siempre.', compat: 'TV con HDMI' },
  { id: 's3', name: 'Soporte de TV articulado 32–65"', brand: 'Fijo', cat: 'Streaming y TV', price: 32900, img: 'fotos/tecnologia/s3.jpg',
    specs: ['Hasta 40 kg', 'VESA 400×400', 'Giro 180°'], desc: 'Brazo extensible con inclinación. Incluye tornillería.' },
  // Almacenamiento
  { id: 'd1', name: 'Pendrive 64 GB USB 3.2', brand: 'Memo', cat: 'Almacenamiento', price: 11900, img: 'fotos/tecnologia/d1.jpg', specs: ['64 GB', 'USB 3.2', '100 MB/s'], desc: 'Compacto, con argolla para llavero.' },
  { id: 'd2', name: 'Pendrive USB-C 128 GB', brand: 'Memo', cat: 'Almacenamiento', price: 19900, img: 'fotos/tecnologia/d2.jpg', specs: ['128 GB', 'USB-C + USB-A', '150 MB/s'], desc: 'Pasá fotos del celular a la compu sin cables.' },
  { id: 'd3', name: 'Tarjeta microSD 128 GB', brand: 'Memo', cat: 'Almacenamiento', price: 17500, img: 'fotos/tecnologia/d3.jpg', specs: ['128 GB', 'A2 / V30', 'Con adaptador'], desc: 'Para celulares, cámaras, drones y Nintendo Switch.' },
  { id: 'd4', name: 'Disco externo 1 TB', brand: 'Memo', cat: 'Almacenamiento', price: 129000, img: '1531492746076-161ca9bcad58', specs: ['1 TB', 'USB 3.2', 'Backup automático'], desc: 'Todas tus fotos y archivos a salvo.' },
  // Gaming
  { id: 'g1', name: 'Joystick inalámbrico PC / Android', brand: 'Playr', cat: 'Gaming', price: 49900, img: '1592840496694-26d035b52b48', top: true, specs: ['Bluetooth', 'Vibración', '20 h'], desc: 'Compatible con PC, Android, Smart TV y Switch.' },
  { id: 'g2', name: 'Teclado mecánico RGB', brand: 'Playr', cat: 'Gaming', price: 69900, img: '1612198188060-c7c2a3b66eae', specs: ['Switches rojos', 'RGB', 'Español'], desc: 'Teclas mecánicas rápidas y silenciosas, con luces configurables.' },
  // Redes
  { id: 'n1', name: 'Router Wi-Fi 6 doble banda', brand: 'Netix', cat: 'Redes', price: 89900, img: '1606904825846-647eb07f5be2', specs: ['AX1800', '2.4 + 5 GHz', '4 antenas'], desc: 'Más velocidad y menos cortes con muchos dispositivos conectados.' },
  { id: 'n2', name: 'Repetidor Wi-Fi', brand: 'Netix', cat: 'Redes', price: 29900, img: 'fotos/tecnologia/n2.jpg', specs: ['300 Mbps', 'Enchufable', 'Puerto LAN'], desc: 'Llevá el Wi-Fi a los ambientes donde no llega.' },
  { id: 'n3', name: 'Cable de red Cat6 · 5 m', brand: 'Linkmax', cat: 'Redes', price: 6500, img: 'fotos/tecnologia/n3.jpg', specs: ['Cat6', '1 Gbps'], desc: 'Para conectar la Smart TV, la consola o la PC por cable.' },
]
const byId = (id: string) => P.find((p) => p.id === id)!
const PAIRS: Record<string, string[]> = { sa56: ['e1', 'au1'], sa16: ['e1', 'd3'], mg85: ['e1', 'au4'], me50: ['au1', 'e3'], xr14: ['e1', 'd3'], ip15: ['c2', 'e5'], ip16: ['c2', 'e5'], s1: ['h1'], a1: ['h2'], nb1: ['p1', 'a2'], tb1: ['e1'], mo1: ['h2', 'p2'], n1: ['n3', 'n2'] }

/* Guía ¿qué cable necesito? */
const FROM = [{ id: 'note-c', t: 'Notebook con USB-C', i: Laptop }, { id: 'note-h', t: 'Notebook con HDMI', i: Laptop }, { id: 'cel', t: 'Celular', i: Smartphone }, { id: 'tv', t: 'TV común (no Smart)', i: Tv }]
const TO = [{ id: 'tv', t: 'Verlo en la tele', i: Tv }, { id: 'mon', t: 'Usar un monitor', i: Monitor }, { id: 'charge', t: 'Cargarlo más rápido', i: Zap }]
const GUIDE: Record<string, { ids: string[]; why: string }> = {
  'note-c>tv': { ids: ['a1', 'h2'], why: 'Tu notebook sale por USB-C: un adaptador USB-C a HDMI y un cable HDMI hasta la tele.' },
  'note-c>mon': { ids: ['a2', 'h2'], why: 'Con un hub sumás HDMI para el monitor, más USB y carga, todo por un cable.' },
  'note-c>charge': { ids: ['e2', 'c2'], why: 'Un cargador GaN de 65 W carga la notebook y el celular a la vez.' },
  'note-h>tv': { ids: ['h2'], why: 'Con un cable HDMI alcanza. Si tu tele es de 120 Hz, mejor el HDMI 2.1.' },
  'note-h>mon': { ids: ['h2'], why: 'Un cable HDMI 4K conecta directo la notebook al monitor.' },
  'note-h>charge': { ids: ['e4'], why: 'Usá su cargador original y sumá una zapatilla con protección.' },
  'cel>tv': { ids: ['s1'], why: 'La forma más simple: con un Chromecast mandás videos y fotos del celular a la tele, sin cables.' },
  'cel>mon': { ids: ['a1', 'h2'], why: 'Si tu celular admite salida de video, un adaptador USB-C a HDMI y listo.' },
  'cel>charge': { ids: ['e1', 'c2'], why: 'Un cargador de 25 W con cable USB-C carga al 50% en unos 30 minutos.' },
  'tv>tv': { ids: ['s1', 'h1'], why: 'Con un Chromecast tu tele de siempre se vuelve Smart: Netflix, YouTube y más.' },
  'tv>mon': { ids: ['s1'], why: 'El Chromecast también funciona en monitores con HDMI.' },
  'tv>charge': { ids: ['s1'], why: 'Lo que buscás es convertirla en Smart: el Chromecast con Google TV.' },
}
const SORTS = ['Destacados', 'Menor precio', 'Mayor precio'] as const
const off = (p: Prod) => (p.was ? Math.round((1 - p.price / p.was) * 100) : 0)
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const matches = (p: Prod, q: string) => !q || norm(`${p.name} ${p.brand} ${p.cat} ${p.specs.join(' ')} ${p.compat ?? ''}`).includes(norm(q))

function Photo({ p, className, w = 500, eager }: { p: Prod; className?: string; w?: number; eager?: boolean }) {
  const I = CATS.find((c) => c.c === p.cat)!.i
  return <SmartImg src={img(p.img, w, w)} alt={`${p.brand} ${p.name}`} eager={eager} className={className} fallback={`linear-gradient(160deg,#fff,${SKY})`}
    fallbackContent={<I className="h-10 w-10" style={{ color: BLUE }} strokeWidth={1.5} />} />
}

export default function Tecnologia() {
  const cart = useCart('tecnologia-v2')
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)
  const [cat, setCat] = useState<Cat | 'Todo'>('Todo')
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Destacados')
  const [prod, setProd] = useState<Prod | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [from, setFrom] = useState<string | null>(null)
  const [to, setTo] = useState<string | null>(null)

  const suggestions = q.length > 1 ? P.filter((p) => matches(p, q)).slice(0, 6) : []
  const list = useMemo(() => {
    const l = P.filter((p) => (cat === 'Todo' || p.cat === cat) && matches(p, q))
    if (sort === 'Menor precio') return [...l].sort((a, b) => a.price - b.price)
    if (sort === 'Mayor precio') return [...l].sort((a, b) => b.price - a.price)
    return [...l].sort((a, b) => +!!b.top - +!!a.top)
  }, [cat, q, sort])
  const deals = P.filter((p) => p.was)
  const phones = P.filter((p) => p.cat === 'Celulares')
  const guide = from && to ? GUIDE[`${from}>${to}`] : null

  const add = (p: Prod, v?: Variant, qty = 1) => {
    const variant = v ?? p.variants?.[0]
    cart.add({ key: variant ? `${p.id}:${variant.label}` : p.id, name: `${p.brand} ${p.name}`, price: variant?.price ?? p.price, image: p.img, detail: variant?.label, qty })
    toast(`${p.name} al carrito`)
  }
  const inCart = (p: Prod) => cart.lines.filter((l) => l.key.split(':')[0] === p.id).reduce((s, l) => s + l.qty, 0)
  const goShop = (c?: Cat) => { if (c) setCat(c); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <DemoShell slug="tecnologia" fonts="family=Inter+Tight:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700" themeColor={INK}
      className="pb-28" style={{ background: '#f6f7fb', color: INK, fontFamily: 'Inter, sans-serif', ['--fd' as string]: '"Inter Tight", sans-serif' }}>
      {/* Barra superior */}
      <div className="py-2 text-center text-[12.5px] font-semibold text-white" style={{ background: INK }}>
        <span style={{ color: LIME }}>●</span> Armá tu carrito y pedí por WhatsApp · Respondemos en minutos
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: BLUE }}><Zap className="h-5 w-5" fill="currentColor" /></span>
            <span className="hidden font-(family-name:--fd) text-[19px] font-extrabold tracking-tight sm:block">Conecta<span style={{ color: BLUE }}>Tech</span></span>
          </a>
          <div className="relative min-w-0 flex-1">
            <label className="flex items-center gap-2 rounded-full border bg-[#f6f7fb] px-4" style={{ borderColor: LINE }}>
              <Search className="h-4 w-4 shrink-0" style={{ color: MUTED }} />
              <input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)}
                placeholder="Buscá celulares, HDMI, cargadores…" aria-label="Buscar productos" className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none" />
              {q && <button onClick={() => setQ('')} aria-label="Borrar búsqueda"><X className="h-4 w-4" /></button>}
            </label>
            {focus && suggestions.length > 0 && (
              <div className="animate-fade-in absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-white shadow-xl" style={{ borderColor: LINE }}>
                {suggestions.map((p) => (
                  <button key={p.id} onMouseDown={() => setProd(p)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#f6f7fb]">
                    <Photo p={p} w={96} className="h-11 w-11 shrink-0 rounded-lg" />
                    <span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-semibold">{p.brand} {p.name}</span><span className="text-[12px]" style={{ color: MUTED }}>{p.cat}</span></span>
                    <span className="font-(family-name:--fd) text-[14px] font-bold">{money(p.price)}</span>
                  </button>
                ))}
                <button onMouseDown={() => goShop()} className="w-full border-t px-3 py-2.5 text-left text-[13px] font-semibold" style={{ borderColor: LINE, color: BLUE }}>Ver todos los resultados para “{q}”</button>
              </div>
            )}
          </div>
          <button onClick={() => setCartOpen(true)} aria-label="Abrir carrito" className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ background: INK }}>
            <ShoppingCart className="h-5 w-5" />
            {cart.count > 0 && <span className="animate-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-extrabold" style={{ background: LIME, color: INK }}>{cart.count}</span>}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-10 text-white md:px-12 md:py-14" style={{ background: `radial-gradient(120% 120% at 100% 0%, #3a5bff 0%, ${BLUE} 35%, ${INK} 100%)` }}>
          <div className="relative z-10 max-w-xl">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12.5px] font-semibold ring-1 ring-white/20"><Sparkles className="h-3.5 w-3.5" style={{ color: LIME }} /> Nuevos ingresos de celulares</div>
            <h1 className="animate-fade-up mt-4 font-(family-name:--fd) text-[40px] font-black leading-[0.95] tracking-tight md:text-[64px]" style={{ animationDelay: '80ms' }}>Celulares y todo<br />para <span style={{ color: LIME }}>conectar.</span></h1>
            <p className="animate-fade-up mt-4 max-w-md text-[16px] leading-relaxed text-white/75" style={{ animationDelay: '160ms' }}>Samsung, Motorola, Xiaomi e iPhone. Cables HDMI, cargadores, auriculares y más. Elegí, sumá al carrito y lo cerrás por WhatsApp.</p>
            <div className="animate-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <button onClick={() => goShop('Celulares')} className="flex items-center gap-2 rounded-full px-6 py-3.5 font-bold transition active:scale-95" style={{ background: LIME, color: INK }}>Ver celulares <ArrowRight className="h-4 w-4" /></button>
              <button onClick={() => goShop()} className="rounded-full px-6 py-3.5 font-bold ring-1 ring-white/30 transition hover:bg-white/10">Todo el catálogo</button>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-10 right-[-60px] hidden w-[46%] md:block">
            <div className="grid grid-cols-2 gap-3 rotate-[-6deg]">
              {['1511707171634-5f897ff02aa9', '1600087626014-e652e18bbff2', '1590658268037-6bf12165a8df', '1546054454-aa26e2b734c7'].map((id, i) => (
                <SmartImg key={id} src={img(id, 400, 400)} alt="" eager className={cx('aspect-square rounded-3xl shadow-2xl ring-1 ring-white/10', i % 2 === 1 && 'translate-y-8')} fallback="linear-gradient(135deg,#3a5bff,#0a0f1f)" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12.5px] font-semibold md:text-[14px]">
          {[{ i: ShieldCheck, t: 'Garantía en todo' }, { i: MessageCircle, t: 'Pedido por WhatsApp' }, { i: BadgePercent, t: 'Precios claros' }].map(({ i: I, t }) => (
            <div key={t} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-2 py-3 ring-1 ring-[#e5e8f0]"><I className="h-4 w-4 shrink-0" style={{ color: BLUE }} />{t}</div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <h2 className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight md:text-3xl">¿Qué estás buscando?</h2>
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:grid-cols-9">
          {CATS.map(({ c, img: im }, i) => (
            <Reveal key={c} delay={i * 30}>
              <button onClick={() => goShop(c)} className="group w-full overflow-hidden rounded-2xl bg-white text-left ring-1 transition hover:-translate-y-0.5 hover:shadow-lg ring-[#e5e8f0]">
                <SmartImg src={img(im, 300, 300)} alt={c} className="aspect-square transition duration-500 group-hover:scale-105" fallback={`linear-gradient(160deg,#fff,${SKY})`} />
                <div className="px-2.5 py-2 text-[12.5px] font-bold leading-tight">{c}</div>
              </button>
            </Reveal>
          ))}
        </div>
        <Tip className="mt-4 !mx-0">categorías con foto: el cliente encuentra lo que busca en un toque, sin escribirte para preguntar si lo tenés.</Tip>
      </section>

      {/* Celulares destacados */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex items-end justify-between gap-3">
          <div><div className="text-[12px] font-bold uppercase tracking-widest" style={{ color: BLUE }}>Celulares</div><h2 className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight md:text-3xl">Los más pedidos</h2></div>
          <button onClick={() => goShop('Celulares')} className="flex items-center gap-1 text-[14px] font-bold" style={{ color: BLUE }}>Ver todos <ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="no-scrollbar -mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
          {phones.map((p) => (
            <button key={p.id} onClick={() => setProd(p)} className="group w-[230px] shrink-0 snap-start overflow-hidden rounded-3xl bg-white text-left ring-1 transition hover:shadow-xl ring-[#e5e8f0]">
              <div className="relative"><Photo p={p} className="aspect-[4/5] transition duration-500 group-hover:scale-[1.03]" />
                {p.isNew && <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold" style={{ background: LIME, color: INK }}>Nuevo</span>}
                {off(p) > 0 && <span className="absolute right-3 top-3 rounded-full bg-[#ff3b30] px-2.5 py-1 text-[11px] font-extrabold text-white">-{off(p)}%</span>}
              </div>
              <div className="p-4">
                <div className="text-[12px] font-semibold" style={{ color: MUTED }}>{p.brand}</div>
                <div className="font-(family-name:--fd) text-[17px] font-bold leading-tight">{p.name}</div>
                <div className="mt-1 text-[12px]" style={{ color: MUTED }}>{p.variants?.map((v) => v.label.split(' ·')[0]).join(' · ')}</div>
                <div className="mt-2 flex items-baseline gap-2"><span className="font-(family-name:--fd) text-[19px] font-extrabold">{money(p.price)}</span>{p.was && <span className="text-[12.5px] line-through" style={{ color: MUTED }}>{money(p.was)}</span>}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="rounded-[28px] p-5 md:p-7" style={{ background: INK }}>
          <div className="flex items-center gap-2 text-white"><BadgePercent className="h-6 w-6" style={{ color: LIME }} /><h2 className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight">Ofertas de la semana</h2></div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {deals.slice(0, 4).map((p) => (
              <button key={p.id} onClick={() => setProd(p)} className="overflow-hidden rounded-2xl bg-white text-left">
                <div className="relative"><Photo p={p} className="aspect-square" /><span className="absolute left-2 top-2 rounded-full bg-[#ff3b30] px-2 py-0.5 text-[11px] font-extrabold text-white">-{off(p)}%</span></div>
                <div className="p-3"><div className="line-clamp-2 text-[13.5px] font-semibold leading-tight">{p.name}</div><div className="mt-1 font-(family-name:--fd) text-[16px] font-extrabold">{money(p.price)} <span className="text-[12px] font-medium line-through" style={{ color: MUTED }}>{money(p.was!)}</span></div></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight md:text-3xl">{cat === 'Todo' ? 'Todo el catálogo' : cat}{q && <span className="text-[16px] font-semibold" style={{ color: MUTED }}> · “{q}”</span>}</h2>
          <select value={sort} onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])} aria-label="Ordenar" className="rounded-full border bg-white px-4 py-2 text-[14px] font-semibold outline-none" style={{ borderColor: LINE }}>
            {SORTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {(['Todo', ...CATS.map((c) => c.c)] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cx('shrink-0 rounded-full px-4 py-2 text-[13.5px] font-bold ring-1 transition', cat === c ? 'text-white ring-transparent' : 'bg-white ring-[#e5e8f0]')} style={cat === c ? { background: INK } : undefined}>{c}</button>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-[#e5e8f0]">
            <Search className="mx-auto h-8 w-8" style={{ color: MUTED }} />
            <p className="mt-2 font-bold">No encontramos “{q}”</p>
            <p className="text-[14px]" style={{ color: MUTED }}>Escribinos y te decimos si lo conseguimos.</p>
            <button onClick={() => { setQ(''); setCat('Todo') }} className="mt-4 rounded-full px-5 py-2.5 text-[14px] font-bold text-white" style={{ background: BLUE }}>Ver todo</button>
          </div>
        ) : (
          <div key={`${cat}-${sort}`} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => {
              const n = inCart(p)
              return (
                <article key={p.id} className="animate-fade-up group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#e5e8f0] transition hover:shadow-xl" style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
                  <button onClick={() => setProd(p)} className="relative block overflow-hidden text-left" aria-label={`Ver ${p.name}`}>
                    <Photo p={p} className="aspect-square transition duration-500 group-hover:scale-[1.04]" />
                    {off(p) > 0 && <span className="absolute left-2.5 top-2.5 rounded-full bg-[#ff3b30] px-2 py-0.5 text-[11px] font-extrabold text-white">-{off(p)}%</span>}
                    {p.isNew && !off(p) && <span className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[11px] font-extrabold" style={{ background: LIME, color: INK }}>Nuevo</span>}
                  </button>
                  <div className="flex flex-1 flex-col p-3.5">
                    <div className="text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>{p.brand}</div>
                    <button onClick={() => setProd(p)} className="line-clamp-2 text-left text-[14.5px] font-semibold leading-snug">{p.name}</button>
                    <div className="mt-1 line-clamp-1 text-[12px]" style={{ color: MUTED }}>{p.specs.slice(0, 2).join(' · ')}</div>
                    <div className="mt-auto pt-3">
                      {p.was && <div className="text-[12px] line-through" style={{ color: MUTED }}>{money(p.was)}</div>}
                      <div className="font-(family-name:--fd) text-[19px] font-extrabold leading-none">{p.variants && p.variants.length > 1 && <span className="text-[12px] font-semibold" style={{ color: MUTED }}>desde </span>}{money(p.price)}</div>
                      <button onClick={() => (p.variants && p.variants.length > 1 ? setProd(p) : add(p))} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[13.5px] font-bold transition active:scale-95"
                        style={n ? { background: SKY, color: BLUE } : { background: BLUE, color: '#fff' }}>
                        {n ? <><Check className="h-4 w-4" /> En el carrito ({n})</> : <><Plus className="h-4 w-4" /> {p.variants && p.variants.length > 1 ? 'Elegir' : 'Agregar'}</>}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
        <Tip className="mt-4 !mx-0">cada producto con foto, precio y botón de agregar: el cliente arma el pedido solo y a vos te llega completo por WhatsApp.</Tip>
      </section>

      {/* Guía de cables */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="rounded-[28px] bg-white p-5 ring-1 md:p-8 ring-[#e5e8f0]">
          <div className="flex items-center gap-2"><Cable className="h-6 w-6" style={{ color: BLUE }} /><h2 className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight">¿Qué cable necesito?</h2></div>
          <p className="mt-1 text-[14px]" style={{ color: MUTED }}>Contanos qué querés conectar y te decimos qué llevar.</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <div className="text-[13px] font-bold">1. Tengo…</div>
              <div className="mt-2 grid grid-cols-2 gap-2">{FROM.map((f) => <button key={f.id} onClick={() => setFrom(f.id)} className={cx('flex items-center gap-2 rounded-2xl p-3 text-left text-[13px] font-semibold ring-2 transition', from === f.id ? 'bg-[#eaf0ff] ring-[#2347ff]' : 'bg-[#f6f7fb] ring-transparent')} ><f.i className="h-5 w-5 shrink-0" style={{ color: BLUE }} />{f.t}</button>)}</div>
            </div>
            <div>
              <div className="text-[13px] font-bold">2. Quiero…</div>
              <div className="mt-2 grid gap-2">{TO.map((f) => <button key={f.id} onClick={() => setTo(f.id)} className={cx('flex items-center gap-2 rounded-2xl p-3 text-left text-[13px] font-semibold ring-2 transition', to === f.id ? 'bg-[#eaf0ff] ring-[#2347ff]' : 'bg-[#f6f7fb] ring-transparent')} ><f.i className="h-5 w-5 shrink-0" style={{ color: BLUE }} />{f.t}</button>)}</div>
            </div>
          </div>
          {guide && (
            <div key={`${from}${to}`} className="animate-fade-up mt-5 rounded-2xl p-4" style={{ background: SKY }}>
              <p className="text-[14px] font-semibold">{guide.why}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {guide.ids.map(byId).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white p-2.5">
                    <Photo p={p} w={120} className="h-14 w-14 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1"><div className="truncate text-[13.5px] font-semibold">{p.name}</div><div className="font-(family-name:--fd) font-extrabold">{money(p.price)}</div></div>
                    <button onClick={() => add(p)} aria-label={`Agregar ${p.name}`} className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: BLUE }}><Plus className="h-5 w-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Tip className="mt-4 !mx-0">la guía responde la pregunta que más te hacen en el mostrador y suma productos al carrito.</Tip>
        </div>
      </section>

      {/* Cómo comprar */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight md:text-3xl">Comprar es así de fácil</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[{ n: '1', t: 'Elegí tus productos', d: 'Sumalos al carrito con el precio a la vista.', i: ShoppingCart }, { n: '2', t: 'Mandá el pedido por WhatsApp', d: 'Se abre el chat con todo el pedido ya escrito.', i: MessageCircle }, { n: '3', t: 'Coordinamos con vos', d: 'Te confirmamos stock y acordamos entrega y pago.', i: Check }].map((s) => (
            <div key={s.n} className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-[#e5e8f0]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-(family-name:--fd) text-lg font-black" style={{ background: LIME, color: INK }}>{s.n}</span>
              <div><div className="font-bold">{s.t}</div><div className="text-[14px]" style={{ color: MUTED }}>{s.d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto mt-12 max-w-6xl px-4">
        <div className="grid gap-4 rounded-[28px] p-6 text-white md:grid-cols-3 md:p-8" style={{ background: INK }}>
          <div>
            <div className="font-(family-name:--fd) text-2xl font-extrabold">Conecta<span style={{ color: LIME }}>Tech</span></div>
            <p className="mt-1 text-[14px] text-white/60">Celulares, accesorios y tecnología.</p>
          </div>
          <div className="flex items-start gap-3 text-[14px]"><MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: LIME }} /><div><b>Av. Mitre 1450, local 4</b><br /><span className="text-white/60">Berazategui</span></div></div>
          <div className="flex items-start gap-3 text-[14px]"><Clock className="mt-0.5 h-5 w-5 shrink-0" style={{ color: LIME }} /><div><b>Lunes a sábado</b><br /><span className="text-white/60">9 a 20 h</span></div></div>
        </div>
        <p className="py-6 text-center text-[12px]" style={{ color: MUTED }}>Demo · Precios y productos de ejemplo</p>
      </footer>

      {/* Barra flotante del carrito */}
      {cart.count > 0 && !cartOpen && !prod && (
        <div className="animate-slide-up fixed inset-x-0 bottom-0 z-40 px-4 pb-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <button onClick={() => setCartOpen(true)} className="mx-auto flex w-full max-w-md items-center justify-between rounded-full py-3 pl-5 pr-3 text-white shadow-2xl" style={{ background: INK }}>
            <span className="flex items-center gap-2 font-bold"><ShoppingCart className="h-5 w-5" /> {cart.count} {cart.count === 1 ? 'producto' : 'productos'} · {money(cart.total)}</span>
            <span className="rounded-full px-4 py-2 text-[14px] font-extrabold" style={{ background: LIME, color: INK }}>Ver pedido</span>
          </button>
        </div>
      )}

      <ProductSheet p={prod} onClose={() => setProd(null)} onAdd={(p, v, qty) => { add(p, v, qty); setProd(null) }} onOpen={setProd} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </DemoShell>
  )
}

function ProductSheet({ p, onClose, onAdd, onOpen }: { p: Prod | null; onClose: () => void; onAdd: (p: Prod, v: Variant | undefined, qty: number) => void; onOpen: (p: Prod) => void }) {
  const [vi, setVi] = useState(0)
  const [qty, setQty] = useState(1)
  const [last, setLast] = useState<string | null>(null)
  if (p && p.id !== last) { setLast(p.id); setVi(0); setQty(1) }
  if (!p) return <Sheet open={false} onClose={onClose} label="Producto"><div /></Sheet>
  const v = p.variants?.[vi]
  const price = v?.price ?? p.price
  const pairs = (PAIRS[p.id] ?? []).map(byId)
  return (
    <Sheet open onClose={onClose} side="right" className="bg-white" label={p.name}>
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Inter, sans-serif', color: INK }}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative"><Photo p={p} w={800} eager className="aspect-square" />
            <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow"><X className="h-5 w-5" /></button>
            {off(p) > 0 && <span className="absolute left-3 top-3 rounded-full bg-[#ff3b30] px-2.5 py-1 text-[12px] font-extrabold text-white">-{off(p)}%</span>}
          </div>
          <div className="p-5">
            <div className="text-[12.5px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>{p.brand} · {p.cat}</div>
            <h3 className="mt-1 font-(family-name:--fd) text-[26px] font-extrabold leading-tight tracking-tight">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-2"><span className="font-(family-name:--fd) text-[28px] font-black">{money(price)}</span>{p.was && vi === 0 && <span className="line-through" style={{ color: MUTED }}>{money(p.was)}</span>}</div>
            {p.variants && p.variants.length > 1 && (
              <div className="mt-4">
                <div className="text-[13px] font-bold">Capacidad</div>
                <div className="mt-2 flex flex-wrap gap-2">{p.variants.map((x, i) => <button key={x.label} onClick={() => setVi(i)} className={cx('rounded-full px-4 py-2 text-[14px] font-semibold ring-2 transition', vi === i ? 'bg-[#eaf0ff] ring-[#2347ff]' : 'bg-[#f6f7fb] ring-transparent')} >{x.label}</button>)}</div>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-1.5">{p.specs.map((s) => <span key={s} className="rounded-full px-3 py-1 text-[12.5px] font-semibold" style={{ background: SKY, color: BLUE }}>{s}</span>)}</div>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: '#2c3446' }}>{p.desc}</p>
            {p.compat && <div className="mt-3 rounded-2xl p-3 text-[13.5px]" style={{ background: '#f6f7fb' }}><b>Compatible con:</b> {p.compat}</div>}
            {pairs.length > 0 && (
              <div className="mt-5">
                <div className="text-[13px] font-bold">Combina con</div>
                <div className="mt-2 space-y-2">
                  {pairs.map((x) => (
                    <button key={x.id} onClick={() => onOpen(x)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left ring-1 ring-[#e5e8f0]">
                      <Photo p={x} w={120} className="h-12 w-12 shrink-0 rounded-xl" />
                      <span className="min-w-0 flex-1 truncate text-[14px] font-semibold">{x.name}</span>
                      <span className="font-(family-name:--fd) text-[14px] font-bold">{money(x.price)}</span>
                      <ChevronRight className="h-4 w-4" style={{ color: MUTED }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 border-t p-4" style={{ borderColor: LINE, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center rounded-full" style={{ background: '#f6f7fb' }}>
            <button onClick={() => setQty((x) => Math.max(1, x - 1))} className="grid h-12 w-11 place-items-center" aria-label="Restar"><Minus className="h-4 w-4" /></button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <button onClick={() => setQty((x) => x + 1)} className="grid h-12 w-11 place-items-center" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={() => onAdd(p, v, qty)} className="flex h-12 flex-1 items-center justify-between rounded-full px-5 font-bold text-white transition active:scale-[.98]" style={{ background: BLUE }}>
            <span>Agregar</span><span className="font-(family-name:--fd)">{money(price * qty)}</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}

function CartSheet({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: ReturnType<typeof useCart> }) {
  return (
    <Sheet open={open} onClose={onClose} side="right" className="bg-[#f6f7fb]" label="Carrito">
      <div className="flex h-full min-h-0 flex-col" style={{ fontFamily: 'Inter, sans-serif', color: INK }}>
        <div className="flex items-center justify-between border-b bg-white px-5 py-4" style={{ borderColor: LINE }}>
          <div className="font-(family-name:--fd) text-2xl font-extrabold tracking-tight">Tu pedido</div>
          <button onClick={onClose} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full" style={{ background: '#f6f7fb' }}><X className="h-5 w-5" /></button>
        </div>
        {cart.lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div><ShoppingCart className="mx-auto h-10 w-10" style={{ color: MUTED }} /><p className="mt-3 font-bold">Tu carrito está vacío</p><button onClick={onClose} className="mt-4 rounded-full px-6 py-3 text-[14px] font-bold text-white" style={{ background: BLUE }}>Ver productos</button></div>
          </div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
              {cart.lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-[#e5e8f0]">
                  <SmartImg src={img(l.image!, 160, 160)} alt={l.name} className="h-16 w-16 shrink-0 rounded-xl" fallback={`linear-gradient(160deg,#fff,${SKY})`} />
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-[14px] font-semibold leading-tight">{l.name}</div>
                    {l.detail && <div className="text-[12px]" style={{ color: MUTED }}>{l.detail}</div>}
                    <div className="mt-0.5 font-(family-name:--fd) font-extrabold">{money(l.price * l.qty)}</div>
                  </div>
                  <div className="flex items-center rounded-full" style={{ background: '#f6f7fb' }}>
                    <button onClick={() => cart.inc(l.key, -1)} className="grid h-8 w-8 place-items-center" aria-label="Restar">{l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                    <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                    <button onClick={() => cart.inc(l.key, 1)} className="grid h-8 w-8 place-items-center" aria-label="Sumar"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t bg-white p-5" style={{ borderColor: LINE, paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <div className="mb-4 flex items-baseline justify-between"><span className="font-semibold">Total</span><span className="font-(family-name:--fd) text-[26px] font-black">{money(cart.total)}</span></div>
              <WhatsAppOrderButton slug="tecnologia" business={BIZ} lines={cart.lines} total={cart.total} />
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
