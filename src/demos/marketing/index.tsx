import { BarChart3, Camera, Globe, Megaphone, Palette, Target } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'marketing',
  name: 'Agustina Vera',
  role: 'Marketing digital y redes',
  logo: Megaphone,
  theme: {
    bg: '#fffaf3', surface: '#ffffff', ink: '#1a1033', muted: '#665d7a', accent: '#ff4d8d', accentInk: '#ffffff', soft: '#ffe3ee', line: '#efe6f0', dark: '#1a1033',
    fonts: 'family=Unbounded:wght@500;600;700;800&family=Inter:wght@400;500;600;700',
    display: '"Unbounded", sans-serif', body: '"Inter", sans-serif', shape: 'round',
  },
  announce: '🚀 Auditoría de tus redes sin cargo · Agendá una llamada',
  hero: {
    kicker: 'Marketing para negocios y marcas',
    title: 'Que tu negocio se *vea*, se elija y *venda*.',
    text: 'Gestión de redes, campañas en Instagram, Facebook y Google, contenido y estrategia. Te ayudo a conseguir clientes, no solo likes.',
    image: '1432888498266-38ffec3eaf0a', layout: 'editorial',
    stats: [{ v: '+60', l: 'marcas acompañadas' }, { v: 'x3', l: 'consultas promedio' }, { v: '8 años', l: 'de experiencia' }],
  },
  servicesKicker: 'Servicios',
  servicesTitle: 'Todo tu marketing, *en un solo lugar*',
  services: [
    { id: 'redes', name: 'Gestión de redes', desc: 'Planificación, diseño y publicación de contenido, respuesta de mensajes y reportes mensuales.', icon: Camera, priceLabel: 'Desde $ 180.000 / mes', duration: 'Llamada de 30 min', img: '1563986768609-322da13575f3' },
    { id: 'ads', name: 'Campañas publicitarias', desc: 'Anuncios en Meta y Google segmentados a tu zona y a tu cliente ideal, con seguimiento de resultados.', icon: Target, priceLabel: 'Desde $ 150.000 / mes', duration: 'Llamada de 30 min', img: '1551288049-bebda4e38f71' },
    { id: 'estrategia', name: 'Estrategia y consultoría', desc: 'Analizamos tu negocio y armamos un plan de marketing de 3 meses para que lo ejecutes vos o tu equipo.', icon: BarChart3, price: 120000, duration: 'Sesión de 90 min', img: '1533750349088-cd871a92f312' },
    { id: 'contenido', name: 'Producción de contenido', desc: 'Fotos y videos para reels, historias y anuncios, con guion y edición.', icon: Palette, priceLabel: 'Desde $ 90.000', duration: 'Llamada de 30 min', img: '1512758017271-d7b84c2113f1' },
    { id: 'web', name: 'Web y Google', desc: 'Página web, ficha de Google Maps y posicionamiento para que te encuentren en tu zona.', icon: Globe, priceLabel: 'Consultar', duration: 'Llamada de 30 min', img: '1556155092-490a1ba16284' },
  ],
  plans: {
    title: 'Planes *mensuales*',
    items: [
      { name: 'Arranque', price: 180000, period: 'mes', features: ['12 publicaciones al mes', 'Diseño de historias', 'Reporte mensual'] },
      { name: 'Crecimiento', price: 320000, period: 'mes', features: ['20 publicaciones + reels', 'Campañas en Meta Ads', 'Respuesta de mensajes', 'Reunión mensual'], highlight: true },
      { name: 'Full', price: 520000, period: 'mes', features: ['Todo lo de Crecimiento', 'Google Ads', 'Producción de contenido', 'Estrategia trimestral'] },
    ],
  },
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Agus*',
    image: '1494790108377-be9c29b29330',
    text: ['Soy licenciada en Comunicación y especialista en marketing digital. Trabajé en agencias y hoy acompaño a negocios de barrio y marcas personales.', 'Mi forma de trabajar: objetivos claros, contenido que se parezca a vos y números que puedas entender.'],
    creds: ['Lic. en Comunicación Social', 'Certificada en Meta Blueprint y Google Ads', 'Más de 60 marcas acompañadas'],
  },
  steps: {
    title: '¿Cómo *empezamos*?',
    items: [
      { t: 'Llamada inicial', d: 'Me contás de tu negocio y revisamos tus redes juntos, sin cargo.' },
      { t: 'Propuesta', d: 'Te mando un plan con objetivos, acciones y presupuesto.' },
      { t: 'Manos a la obra', d: 'Arrancamos y cada mes vemos los resultados en un reporte simple.' },
    ],
  },
  gallery: { title: 'Así *trabajamos*', images: ['1552664730-d307ca884978', '1522202176988-66273c2fd55f', '1557804506-669a67965ba0', '1519389950473-47ba0277781c'] },
  testimonials: [
    { name: 'Lucía, Moka Café', text: 'Desde que Agus maneja nuestras redes duplicamos los pedidos para llevar. Y los reels quedan increíbles.' },
    { name: 'Martín, El Tornillo', text: 'Las campañas en Google nos traen consultas todos los días. Muy clara con los números.' },
    { name: 'Carla, Coral Nail Bar', text: 'Me ordenó el Instagram y ahora la agenda se llena sola. Súper recomendable.' },
  ],
  faq: [
    { q: '¿En cuánto tiempo veo resultados?', a: 'Las campañas dan resultados desde la primera semana. El crecimiento orgánico en redes se nota a partir del segundo o tercer mes.' },
    { q: '¿La publicidad está incluida en el plan?', a: 'No, el presupuesto para anuncios lo pagás directo a Meta o Google. Te recomiendo cuánto invertir según tu objetivo.' },
    { q: '¿Hay contrato de permanencia?', a: 'No. Trabajamos mes a mes, aunque recomiendo al menos 3 meses para medir bien.' },
    { q: '¿Trabajás con negocios de cualquier rubro?', a: 'Sí, sobre todo comercios, gastronomía, salud y profesionales independientes.' },
  ],
  booking: { cta: 'Agendar llamada', noun: 'llamada', modes: ['Videollamada', 'Llamada'], closedDows: [0, 6], hours: [9, 19], step: 30, greet: 'Agus' },
  info: { address: 'Atención 100% online', city: 'Berazategui y todo el país', hours: ['Lunes a viernes', '9 a 19 h'], instagram: '@agusvera.mkt', note: 'Marketing digital, redes y publicidad online.' },
  tips: {
    services: 'mostrar servicios con precio orientativo filtra a los que no son tu cliente y te ahorra reuniones que no cierran.',
    booking: 'la llamada inicial se agenda sola: te llega por WhatsApp con día, hora y servicio de interés.',
    about: 'en marketing la confianza lo es todo: tu cara, tus resultados y testimonios de clientes reales venden por vos.',
  },
}

export default function Marketing() {
  return <BookingTemplate cfg={cfg} />
}
