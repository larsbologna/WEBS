import { ClipboardList, Hammer, Truck, Wrench } from 'lucide-react'
import { ShopTemplate, type ShopConfig } from '../../shared/templates/ShopTemplate'

const cfg: ShopConfig = {
  slug: 'ferreteria',
  name: 'El Tornillo',
  logo: Wrench,
  theme: {
    bg: '#f4f4ef', surface: '#ffffff', ink: '#141414', muted: '#5f5f57', accent: '#ffb703', accentInk: '#141414', soft: '#fff0c2', line: '#e3e3da', dark: '#141414',
    fonts: 'family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700',
    display: '"Barlow Condensed", sans-serif', body: '"Barlow", sans-serif', shape: 'square', upper: true,
  },
  announce: '🔩 Pedí por WhatsApp y te lo preparamos · Atención de corrido de 8 a 19 h',
  hero: {
    kicker: 'Ferretería · Pinturería · Electricidad',
    title: 'Todo para *arreglar*, construir y pintar.',
    text: 'Herramientas, tornillería, pintura y materiales eléctricos. Buscá lo que necesitás, armá el pedido y te lo dejamos listo.',
    images: ['1426927308491-6380b6a9936f'],
    cta: 'Buscar productos', layout: 'full',
  },
  categories: [
    { name: 'Eléctricas', img: '1504148455328-c376907d081c' },
    { name: 'Manuales', img: '1586864387967-d02ef85d93e8' },
    { name: 'Pintura', img: '1562259949-e8e7689d7828' },
    { name: 'Electricidad', img: '1621905251189-08b45d6a269e' },
    { name: 'Tornillería', img: '1581783898377-1c85bf937427' },
    { name: 'Taller', img: '1530124566582-a618bc2615dc' },
  ],
  featuredTitle: 'Ofertas de *la semana*',
  products: [
    { id: 't1', name: 'Taladro percutor inalámbrico 18 V', brand: 'ProWork', cat: 'Eléctricas', price: 129900, was: 149900, img: '1504148455328-c376907d081c', tag: 'Oferta', desc: 'Con 2 baterías, cargador y maletín. Ideal para hormigón, madera y metal.' },
    { id: 't2', name: 'Atornillador inalámbrico 12 V', brand: 'ProWork', cat: 'Eléctricas', price: 69900, img: '1572981779307-38b8cabb2407', desc: 'Liviano y compacto, con luz LED y 2 velocidades.' },
    { id: 't3', name: 'Amoladora angular 115 mm', brand: 'ProWork', cat: 'Eléctricas', price: 74900, img: '1504917595217-d4dc5ebe6122', desc: '850 W, con disco de corte y llave. Para cortar y desbastar.' },
    { id: 't4', name: 'Sierra circular 185 mm', brand: 'ProWork', cat: 'Eléctricas', price: 159900, img: '1513467535987-fd81bc7d62f8', desc: '1400 W con guía paralela y hoja de 24 dientes.' },
    { id: 'm1', name: 'Martillo carpintero 27 mm', brand: 'Férreo', cat: 'Manuales', price: 12900, img: '1586864387967-d02ef85d93e8', tag: 'Más vendido', desc: 'Cabeza forjada y mango antideslizante.' },
    { id: 'm2', name: 'Juego de herramientas x 4', brand: 'Férreo', cat: 'Manuales', price: 24900, img: '1508873535684-277a3cbcc4e8', desc: 'Martillo, pinza, llave ajustable y destornillador.' },
    { id: 'm3', name: 'Set de destornilladores x 6', brand: 'Férreo', cat: 'Manuales', price: 15900, img: '1581783898377-1c85bf937427', desc: 'Planos y Phillips con punta imantada.' },
    { id: 'm4', name: 'Pinza universal 8"', brand: 'Férreo', cat: 'Manuales', price: 9900, img: '1530124566582-a618bc2615dc', desc: 'Acero al cromo vanadio, mango aislado.' },
    { id: 'p1', name: 'Látex interior blanco mate 20 L', brand: 'Colorpro', cat: 'Pintura', price: 89900, was: 99900, img: '1562259949-e8e7689d7828', tag: 'Oferta', desc: 'Lavable, de alto rendimiento. Rinde hasta 240 m² por mano.' },
    { id: 'p2', name: 'Rodillo antigota 22 cm', brand: 'Colorpro', cat: 'Pintura', price: 8900, img: '1589939705384-5185137a7f0f', desc: 'Lana sintética para látex y esmaltes al agua.' },
    { id: 'p3', name: 'Kit de pintor completo', brand: 'Colorpro', cat: 'Pintura', price: 19900, img: '1602052793312-b99c2a9ee797', desc: 'Rodillo, bandeja, pinceles, cinta de papel y lija.' },
    { id: 'e1', name: 'Cable unipolar 2,5 mm x 100 m', brand: 'Electro', cat: 'Electricidad', price: 64900, img: '1621905251189-08b45d6a269e', unit: 'rollo', desc: 'Normalizado IRAM, para instalaciones domiciliarias.' },
    { id: 'e2', name: 'Térmica bipolar 20 A', brand: 'Electro', cat: 'Electricidad', price: 14900, img: '1621905251189-08b45d6a269e', desc: 'Interruptor termomagnético para tablero riel DIN.' },
    { id: 'e3', name: 'Lámpara LED 12 W x 10', brand: 'Electro', cat: 'Electricidad', price: 16900, was: 19900, img: '1508873535684-277a3cbcc4e8', tag: 'Oferta', desc: 'Luz fría o cálida, rosca E27. Pack de 10 unidades.', options: { label: 'Luz', values: ['Fría', 'Cálida'] } },
    { id: 'f1', name: 'Tornillos autoperforantes x 100', brand: 'Fix', cat: 'Tornillería', price: 5900, img: '1581783898377-1c85bf937427', unit: 'caja', desc: 'Para chapa y perfiles, punta mecha. Varias medidas.', options: { label: 'Medida', values: ['8 x 1/2"', '8 x 3/4"', '10 x 1"'] } },
    { id: 'f2', name: 'Tarugos de nylon N° 8 x 100', brand: 'Fix', cat: 'Tornillería', price: 4200, img: '1508873535684-277a3cbcc4e8', unit: 'caja', desc: 'Con tornillo incluido, para ladrillo y hormigón.' },
    { id: 'f3', name: 'Clavos punta París 2" x 1 kg', brand: 'Fix', cat: 'Tornillería', price: 6900, img: '1581783898377-1c85bf937427', unit: 'kg', desc: 'Clavos de acero para carpintería y obra.' },
    { id: 'w1', name: 'Tablero organizador perforado', brand: 'Taller', cat: 'Taller', price: 34900, img: '1602052793312-b99c2a9ee797', desc: 'Panel con ganchos para ordenar las herramientas del taller.' },
    { id: 'w2', name: 'Caja de herramientas 19"', brand: 'Taller', cat: 'Taller', price: 27900, img: '1530124566582-a618bc2615dc', desc: 'Plástica reforzada con bandeja interna y cierres metálicos.' },
  ],
  features: [
    { icon: Hammer, t: 'Más de 5.000 productos', d: 'Si no está en la web, preguntanos' },
    { icon: ClipboardList, t: 'Presupuestos para obra', d: 'Mandanos la lista y te cotizamos' },
    { icon: Truck, t: 'Te lo preparamos', d: 'Retirás sin esperar o coordinamos el envío' },
  ],
  special: {
    kicker: 'Para obras y arreglos',
    title: 'Pedí tu *presupuesto*',
    text: 'Contanos qué necesitás o pegá la lista de materiales del albañil, el electricista o el pintor. Te respondemos con precios y disponibilidad.',
    placeholder: 'Ej: 10 bolsas de cemento, 3 latas de látex 20 L, 50 m de cable 2,5 mm…',
    button: 'Pedir presupuesto por WhatsApp',
    message: (txt) => `¡Hola El Tornillo! Quiero pedir un presupuesto por estos materiales:\n\n${txt}`,
    image: '1589939705384-5185137a7f0f',
  },
  info: { address: 'Calle 148 N° 1865', city: 'Berazategui', hours: ['Lunes a sábado', '8 a 19 h de corrido'], instagram: '@eltornillo.ferreteria', note: 'Ferretería, pinturería y materiales eléctricos.' },
  tips: {
    categories: 'el cliente encuentra lo que busca por rubro y llega al mostrador sabiendo qué llevar.',
    catalog: 'buscador y precios online: menos llamados preguntando "¿tenés tal cosa?" y pedidos que te llegan listos para preparar.',
    special: 'los presupuestos de obra son ventas grandes: te llegan por escrito y los respondés cuando tenés un momento.',
  },
}

export default function Ferreteria() {
  return <ShopTemplate cfg={cfg} />
}
