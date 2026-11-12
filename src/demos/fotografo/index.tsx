import { Aperture, Baby, Camera, Heart, Package, PartyPopper, User } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'fotografo',
  name: 'Tomás Ibarra',
  role: 'Fotografía de bodas, retratos y eventos',
  logo: Aperture,
  theme: {
    bg: '#111111', surface: '#1a1a1a', ink: '#f2efe9', muted: '#a39e94', accent: '#e9d8b4', accentInk: '#111111', soft: '#2a261f', line: '#2c2c2c', dark: '#000000',
    fonts: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600',
    display: '"Cormorant Garamond", serif', body: '"Inter", sans-serif', shape: 'square', italic: true,
  },
  hero: {
    kicker: 'Fotógrafo en zona sur y CABA',
    title: 'Momentos que *merecen* quedarse para siempre.',
    text: 'Bodas, quince, books, familias y fotos de producto. Fotografía natural y cuidada, con entrega digital en alta calidad.',
    image: '1537633552985-df8429e8048b', layout: 'full',
    stats: [{ v: '+250', l: 'bodas y eventos' }, { v: '10 años', l: 'fotografiando' }, { v: '30 días', l: 'para la entrega' }],
  },
  servicesKicker: 'Servicios',
  servicesTitle: '¿Qué querés *fotografiar*?',
  services: [
    { id: 'bodas', name: 'Bodas', desc: 'Cobertura completa del día: preparativos, ceremonia, fiesta y sesión de pareja.', icon: Heart, priceLabel: 'Desde $ 950.000', duration: 'Reunión de 45 min', img: '1606216794074-735e91aa2c92' },
    { id: 'quince', name: 'Quince y eventos', desc: 'Fiestas de 15, cumpleaños, bautismos y eventos corporativos.', icon: PartyPopper, priceLabel: 'Desde $ 480.000', duration: 'Reunión de 30 min', img: '1583939003579-730e3918a45a' },
    { id: 'book', name: 'Books y retratos', desc: 'Sesiones en exterior o estudio para books personales, artísticos o profesionales.', icon: User, price: 180000, duration: 'Sesión de 90 min', img: '1500917293891-ef795e70e1f6' },
    { id: 'familia', name: 'Familias', desc: 'Sesiones en exterior para retratar a tu familia de forma natural.', icon: Baby, price: 160000, duration: 'Sesión de 60 min', img: '1511895426328-dc8714191300' },
    { id: 'producto', name: 'Producto y gastronomía', desc: 'Fotos para tu tienda online, redes o carta, en estudio o en tu local.', icon: Package, priceLabel: 'Desde $ 140.000', duration: 'Reunión de 30 min', img: '1452587925148-ce544e77e70d' },
    { id: 'estudio', name: 'Estudio', desc: 'Alquiler de estudio con iluminación profesional por hora.', icon: Camera, price: 45000, duration: 'Por hora', img: '1471341971476-ae15ff5dd4ea' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Tomás*',
    image: '1493863641943-9b68992a8d07',
    text: ['Fotografío hace 10 años. Me gusta la luz natural, los gestos espontáneos y que las fotos se sientan como el recuerdo de ese día.', 'En cada evento trabajo con un segundo fotógrafo para no perderme nada.'],
    creds: ['10 años de experiencia', 'Equipo profesional con respaldo', 'Entrega en galería online privada'],
  },
  gallery: { title: 'Trabajos *recientes*', images: ['1511285560929-80b456fea0bc', '1465495976277-4387d4b0b4c6', '1529636798458-92182e662485', '1469371670807-013ccf25f16a', '1534528741775-53994a69daeb', '1520390138845-fd2d229dd553', '1606216794074-735e91aa2c92'] },
  testimonials: [
    { name: 'Flor y Nico', text: 'Las fotos de nuestra boda son hermosas. Tomás pasó desapercibido y captó todo.' },
    { name: 'Mariela G.', text: 'Hicimos una sesión familiar en el parque y los chicos se divirtieron un montón. Las fotos, increíbles.' },
    { name: 'Lucía, Moka Café', text: 'Las fotos de la carta y de las redes le cambiaron la cara al café.' },
  ],
  faq: [
    { q: '¿Cuándo entregás las fotos?', a: 'Las sesiones en 10 días y los eventos en 30 días, en una galería online privada para descargar.' },
    { q: '¿Cómo reservo la fecha de mi evento?', a: 'Agendá una reunión, te paso el presupuesto y la fecha queda reservada con una seña.' },
    { q: '¿Viajás fuera de zona sur?', a: 'Sí, cubro CABA, GBA y viajo al interior con gastos de traslado a cargo del cliente.' },
    { q: '¿Las fotos vienen editadas?', a: 'Sí, todas las fotos entregadas tienen edición de color y luz. Los retoques avanzados se cotizan aparte.' },
  ],
  booking: { cta: 'Consultar fecha', noun: 'reunión', modes: ['Videollamada', 'En el estudio'], closedDows: [0], hours: [10, 20], step: 30, greet: 'Tomás' },
  info: { address: 'Estudio en Calle 9 N° 4150', city: 'Berazategui · CABA y GBA', hours: ['Lunes a sábado', '10 a 20 h'], instagram: '@tomasibarra.foto', note: 'Fotografía de bodas, retratos y eventos.' },
  tips: {
    services: 'tu trabajo se vende con imágenes: una galería cuidada convence más que mil mensajes.',
    booking: 'la consulta de fecha llega por WhatsApp con el tipo de evento, así le respondés con el presupuesto justo.',
    about: 'en eventos la gente contrata a la persona: mostrar quién sos genera la confianza para reservar.',
  },
}

export default function Fotografo() {
  return <BookingTemplate cfg={cfg} />
}
