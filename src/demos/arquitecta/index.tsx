import { Building2, ClipboardCheck, FileText, Hammer, Home, Sofa } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'arquitecta',
  name: 'Julieta Moreno',
  role: 'Arquitecta · MAT. CAPBA 31.884',
  logo: Building2,
  theme: {
    bg: '#f5f4f1', surface: '#ffffff', ink: '#161616', muted: '#66625c', accent: '#9c6b4a', accentInk: '#ffffff', soft: '#ece3da', line: '#e2ded7', dark: '#161616',
    fonts: 'family=Josefin+Sans:wght@300;400;600;700&family=Inter:wght@400;500;600',
    display: '"Josefin Sans", sans-serif', body: '"Inter", sans-serif', shape: 'square', accentOnDark: '#d8a57f',
  },
  hero: {
    kicker: 'Arquitectura y dirección de obra',
    title: 'Espacios pensados para *vivir* mejor.',
    text: 'Proyecto, dirección de obra, reformas e interiorismo. Te acompaño desde la primera idea hasta la entrega de llaves, con presupuestos claros y plazos reales.',
    image: '1600585154340-be6161a56a0c', layout: 'full',
    stats: [{ v: '+80', l: 'obras terminadas' }, { v: '12 años', l: 'de experiencia' }, { v: '3D', l: 'antes de construir' }],
  },
  servicesKicker: 'Servicios',
  servicesTitle: 'De la idea *a la obra*',
  services: [
    { id: 'vivienda', name: 'Vivienda nueva', desc: 'Proyecto completo de tu casa: anteproyecto, planos, renders 3D y documentación de obra.', icon: Home, priceLabel: 'Presupuesto a medida', duration: 'Reunión de 60 min', img: '1600047509807-ba8f99d2cdde' },
    { id: 'reformas', name: 'Reformas y ampliaciones', desc: 'Cocinas, baños, ampliaciones y reciclados con el menor tiempo de obra posible.', icon: Hammer, priceLabel: 'Presupuesto a medida', duration: 'Visita de 45 min', img: '1600607687939-ce8a6c25118c' },
    { id: 'direccion', name: 'Dirección de obra', desc: 'Control de calidad, certificados de avance y coordinación de gremios para que la obra salga como se proyectó.', icon: ClipboardCheck, priceLabel: '% del costo de obra', duration: 'Reunión de 45 min', img: '1541888946425-d81bb19240f5' },
    { id: 'interiorismo', name: 'Interiorismo', desc: 'Diseño de interiores, mobiliario a medida, iluminación y selección de materiales.', icon: Sofa, priceLabel: 'Desde $ 450.000', duration: 'Reunión de 45 min', img: '1631679706909-1844bbd07221' },
    { id: 'planos', name: 'Planos municipales', desc: 'Relevamiento, planos de obra nueva o regularización y trámites ante el municipio.', icon: FileText, priceLabel: 'Desde $ 380.000', duration: 'Reunión de 30 min', img: '1503387762-592deb58ef4e' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Julieta*',
    image: '1438761681033-6461ffad8d80',
    text: ['Soy arquitecta (UNLP) y hace 12 años diseño y dirijo obras en zona sur. Me encantan las casas luminosas, simples y bien resueltas.', 'Trabajo con un equipo de constructores de confianza, y antes de empezar te muestro tu proyecto en 3D para que no haya sorpresas.'],
    creds: ['Arquitecta UNLP · Mat. CAPBA 31.884', 'Especialización en vivienda sustentable', 'Renders 3D y recorridos virtuales'],
  },
  steps: {
    title: 'Cómo *trabajamos*',
    items: [
      { t: 'Primera reunión', d: 'Escucho lo que necesitás, vemos el terreno o el espacio y tu presupuesto.' },
      { t: 'Proyecto y 3D', d: 'Te presento la propuesta con planos y renders, y la ajustamos juntos.' },
      { t: 'Obra', d: 'Dirijo la obra, coordino los gremios y te mando avances semanales con fotos.' },
    ],
  },
  gallery: { title: 'Obras *recientes*', images: ['1600596542815-ffad4c1539a9', '1512917774080-9991f1c4c750', '1600566753190-17f0baa2a6c3', '1613490493576-7fde63acd811', '1503174971373-b1f69850bded', '1600210492486-724fe5c67fb0', '1580587771525-78b9dba3b914'] },
  testimonials: [
    { name: 'Familia Rossi', text: 'Julieta diseñó nuestra casa y dirigió la obra. Se terminó en tiempo y quedó igual que en los renders.' },
    { name: 'Natalia G.', text: 'Reformamos la cocina y el baño en seis semanas. Súper ordenada y siempre disponible.' },
    { name: 'Pablo y Sol', text: 'Nos ayudó a aprovechar un terreno chico con una casa luminosa y muy funcional.' },
  ],
  faq: [
    { q: '¿Cuánto cuestan los honorarios?', a: 'Depende del tipo de obra y de los metros. Después de la primera reunión te paso un presupuesto cerrado por etapas.' },
    { q: '¿Hacés solo el proyecto o también la obra?', a: 'Las dos cosas. Podés contratarme solo para el proyecto o para el proyecto y la dirección de obra.' },
    { q: '¿Cuánto tarda una casa?', a: 'El proyecto lleva entre 1 y 2 meses. La obra de una vivienda de 100 m², entre 8 y 12 meses según el sistema constructivo.' },
    { q: '¿Te ocupás de los trámites municipales?', a: 'Sí, preparo los planos y hago todas las presentaciones ante el municipio.' },
  ],
  booking: { cta: 'Agendar reunión', noun: 'reunión', modes: ['En el estudio', 'Videollamada'], closedDows: [0, 6], hours: [9, 18], step: 60, greet: 'Julieta' },
  info: { address: 'Estudio en Calle 15 N° 4780', city: 'Berazategui · Zona sur', hours: ['Lunes a viernes', '9 a 18 h'], instagram: '@julietamoreno.arq', note: 'Arquitectura, reformas e interiorismo.' },
  tips: {
    services: 'tus obras y servicios con fotos son tu mejor carta de presentación: el cliente llega convencido de tu estilo.',
    booking: 'la primera reunión se agenda online y te llega por WhatsApp con el tipo de proyecto elegido.',
    about: 'mostrar tu matrícula, tu forma de trabajar y obras terminadas da la confianza que pide una inversión grande.',
  },
}

export default function Arquitecta() {
  return <BookingTemplate cfg={cfg} />
}
