import { Clock, Flower2, PenLine } from 'lucide-react'
import { ShopTemplate, type ShopConfig } from '../../shared/templates/ShopTemplate'

const cfg: ShopConfig = {
  slug: 'floreria',
  name: 'Lirio',
  logo: Flower2,
  theme: {
    bg: '#fff7f5', surface: '#ffffff', ink: '#3b1f2b', muted: '#86636f', accent: '#c2416b', accentInk: '#ffffff', soft: '#fde3ea', line: '#f3dfe3', dark: '#3b1f2b',
    fonts: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600;700',
    display: '"Cormorant Garamond", serif', body: '"Jost", sans-serif', shape: 'round', italic: true,
  },
  announce: '💐 Ramos del día · Sumá tu dedicatoria y lo coordinamos por WhatsApp',
  hero: {
    kicker: 'Florería · Plantas · Regalos',
    title: 'Flores frescas para *decir* lo que sentís.',
    text: 'Ramos armados cada mañana, rosas, girasoles, plantas y arreglos. Elegí, escribí tu dedicatoria y nosotros nos ocupamos del resto.',
    images: ['1487070183336-b863922373d4', '1563241527-3004b7be0ffd', '1591886960571-74d43a9d4166'],
    cta: 'Ver ramos', layout: 'collage',
  },
  categories: [
    { name: 'Ramos', img: '1567696153798-9111f9cd3d0d' },
    { name: 'Rosas', img: '1496062031456-07b8f162a322' },
    { name: 'Girasoles', img: '1455659817273-f96807779a8a' },
    { name: 'Tulipanes', img: '1561181286-d3fee7d55364' },
    { name: 'Plantas', img: '1485955900006-10f4d324d411' },
    { name: 'Arreglos', img: '1591886960571-74d43a9d4166' },
  ],
  featuredTitle: 'Los *favoritos*',
  products: [
    { id: 'r1', name: 'Ramo silvestre con girasoles', cat: 'Ramos', price: 32900, img: '1567696153798-9111f9cd3d0d', tag: 'Favorito', desc: 'Girasoles, flores de estación y follaje, envuelto en papel kraft.', options: { label: 'Tamaño', values: ['Mediano', 'Grande'] } },
    { id: 'r2', name: 'Ramo pastel', cat: 'Ramos', price: 38900, img: '1563241527-3004b7be0ffd', tag: 'Nuevo', desc: 'Rosas, lisianthus y flores blancas en tonos suaves.' },
    { id: 'r3', name: 'Ramo corazón', cat: 'Ramos', price: 44900, img: '1526047932273-341f2a7631f9', desc: 'Flores de colores armadas en forma de corazón. Ideal para aniversarios.' },
    { id: 'r4', name: 'Ramo de estación', cat: 'Ramos', price: 27900, img: '1457089328109-e5d9bd499191', desc: 'Lo más lindo que llegó esa mañana, elegido por nuestras floristas.' },
    { id: 'o1', name: 'Rosa roja premium', cat: 'Rosas', price: 5900, img: '1496062031456-07b8f162a322', unit: 'unidad', desc: 'Rosa de tallo largo con follaje y celofán.' },
    { id: 'o2', name: 'Docena de rosas', cat: 'Rosas', price: 54900, was: 62900, img: '1508610048659-a06b669e3321', desc: '12 rosas de tallo largo con follaje. Elegí el color.', options: { label: 'Color', values: ['Rojas', 'Rosadas', 'Blancas', 'Mix de colores'] } },
    { id: 'o3', name: 'Box de rosas y peonías', cat: 'Rosas', price: 69900, img: '1582794543139-8ac9cb0f7b11', tag: 'Premium', desc: 'Caja con rosas y peonías rosadas. Dura más de una semana.' },
    { id: 'g1', name: 'Girasoles x 5', cat: 'Girasoles', price: 24900, img: '1455659817273-f96807779a8a', desc: 'Cinco girasoles grandes con follaje verde.' },
    { id: 'g2', name: 'Girasol individual', cat: 'Girasoles', price: 6500, img: '1470509037663-253afd7f0f51', unit: 'unidad', desc: 'Un girasol con moño, para sorprender.' },
    { id: 't1', name: 'Tulipanes x 10', cat: 'Tulipanes', price: 42900, img: '1561181286-d3fee7d55364', desc: 'Diez tulipanes en florero de vidrio.', options: { label: 'Color', values: ['Rosados', 'Blancos', 'Mix'] } },
    { id: 't2', name: 'Tulipán rosa en maceta', cat: 'Tulipanes', price: 15900, img: '1520763185298-1b434c919102', desc: 'Bulbo de tulipán en flor, en maceta decorativa.' },
    { id: 'p1', name: 'Suculenta en maceta', cat: 'Plantas', price: 9900, img: '1485955900006-10f4d324d411', tag: 'Fácil de cuidar', desc: 'Haworthia en maceta de cerámica. Poca agua, mucha luz.' },
    { id: 'p2', name: 'Cactus de interior grande', cat: 'Plantas', price: 29900, img: '1558603668-6570496b66f8', desc: 'Cactus columnar en canasto de fibra natural.' },
    { id: 'p3', name: 'Mini cactus x 3', cat: 'Plantas', price: 12900, img: '1525310072745-f49212b5ac6d', desc: 'Tres mini cactus en macetitas, ideales para el escritorio.' },
    { id: 'a1', name: 'Arreglo de rosas en florero', cat: 'Arreglos', price: 58900, img: '1591886960571-74d43a9d4166', desc: 'Rosas y flores de estación en florero de vidrio, listas para regalar.' },
    { id: 'a2', name: 'Arco iris de rosas', cat: 'Arreglos', price: 64900, img: '1508610048659-a06b669e3321', desc: 'Rosas teñidas en colores arco iris. Un regalo distinto.' },
  ],
  features: [
    { icon: Flower2, t: 'Flores del día', d: 'Armamos cada ramo a la mañana' },
    { icon: PenLine, t: 'Tarjeta con dedicatoria', d: 'Escribila en el carrito' },
    { icon: Clock, t: 'Para hoy mismo', d: 'Pedí antes de las 16 h' },
  ],
  special: {
    kicker: 'Ramo a medida',
    title: '¿Tenés algo *especial* en mente?',
    text: 'Contanos para quién es, los colores o flores que le gustan y tu presupuesto. Te mandamos una propuesta con foto.',
    placeholder: 'Ej: un ramo para mi mamá, en tonos blancos y lilas, de unos $40.000…',
    button: 'Pedir propuesta por WhatsApp',
    message: (txt) => `¡Hola Lirio! Quiero un ramo a medida:\n\n${txt}`,
    image: '1520763185298-1b434c919102',
  },
  cartNote: { label: 'Dedicatoria para la tarjeta', placeholder: 'Ej: Feliz aniversario, mi amor. Por muchos más ❤️', prefix: '💌 Dedicatoria:' },
  info: { address: 'Calle 21 N° 3540', city: 'Berazategui', hours: ['Lunes a sábado', '9 a 20 h · Domingos 9 a 13 h'], instagram: '@lirio.floreria', note: 'Florería de autor. Ramos para todas las ocasiones.' },
  tips: {
    categories: 'fotos lindas venden flores: el cliente elige el ramo desde el celular sin tener que pedirte fotos por mensaje.',
    catalog: 'precio claro y dedicatoria en el pedido: te llega todo por WhatsApp, listo para armar.',
    special: 'los pedidos a medida son los de mayor valor: te llegan con toda la info para mandar una propuesta.',
  },
}

export default function Floreria() {
  return <ShopTemplate cfg={cfg} />
}
