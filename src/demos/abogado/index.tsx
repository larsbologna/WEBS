import { Briefcase, Car, FileSignature, Home, Scale, ShoppingCart, Users } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'abogado',
  name: 'Ferrari & Asociados',
  role: 'Estudio jurídico · Dr. Ignacio Ferrari',
  logo: Scale,
  theme: {
    bg: '#f7f5f0', surface: '#ffffff', ink: '#1c1a17', muted: '#6a645a', accent: '#8a6d3b', accentInk: '#ffffff', soft: '#efe7d6', line: '#e4ddcf', dark: '#1c1a17',
    fonts: 'family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700',
    display: '"Libre Caslon Text", serif', body: '"Inter", sans-serif', shape: 'square', italic: true,
  },
  hero: {
    kicker: 'Estudio jurídico desde 2004',
    title: 'Defendemos tus derechos con *compromiso* y claridad.',
    text: 'Asesoramiento legal en temas laborales, accidentes, familia, sucesiones y contratos. Te explicamos tu caso en palabras simples y sin compromiso.',
    image: '1589829545856-d10d557cf95f', layout: 'editorial',
    stats: [{ v: '20 años', l: 'de trayectoria' }, { v: '+1.500', l: 'casos resueltos' }, { v: '1ª consulta', l: 'sin cargo en laboral' }],
  },
  servicesKicker: 'Áreas de práctica',
  servicesTitle: 'En qué te podemos *ayudar*',
  services: [
    { id: 'laboral', name: 'Derecho laboral', desc: 'Despidos, trabajo no registrado, indemnizaciones y accidentes de trabajo (ART).', icon: Briefcase, duration: 'Consulta de 30 min', priceLabel: 'Primera consulta sin cargo' },
    { id: 'transito', name: 'Accidentes de tránsito', desc: 'Reclamos a aseguradoras por daños materiales y lesiones. Cobramos al finalizar el juicio.', icon: Car, duration: 'Consulta de 30 min', priceLabel: 'Sin adelantos' },
    { id: 'familia', name: 'Familia', desc: 'Divorcios, cuota alimentaria, régimen de comunicación y cuidado personal de los hijos.', icon: Users, duration: 'Consulta de 45 min', priceLabel: 'Consultar' },
    { id: 'sucesiones', name: 'Sucesiones', desc: 'Tramitamos la sucesión completa, desde la declaratoria hasta la inscripción de bienes.', icon: FileSignature, duration: 'Consulta de 45 min', priceLabel: 'Presupuesto cerrado' },
    { id: 'contratos', name: 'Contratos y alquileres', desc: 'Redacción y revisión de contratos, desalojos y conflictos entre propietarios e inquilinos.', icon: Home, duration: 'Consulta de 30 min', priceLabel: 'Consultar' },
    { id: 'consumidor', name: 'Defensa del consumidor', desc: 'Reclamos contra bancos, empresas de servicios y comercios por cobros indebidos.', icon: ShoppingCart, duration: 'Consulta de 30 min', priceLabel: 'Consultar' },
  ],
  about: {
    kicker: 'El estudio',
    title: 'Abogados *cerca tuyo*',
    image: '1507679799987-c73779587ccf',
    text: ['El Dr. Ignacio Ferrari fundó el estudio en 2004. Hoy somos un equipo de cuatro abogados con especialidades complementarias.', 'Trabajamos con honorarios claros desde el primer día y te mantenemos al tanto de cada novedad de tu causa.'],
    creds: ['Abogado UBA · CALQ T° XII F° 245', 'Especialista en derecho laboral', 'Mediador prejudicial registrado'],
  },
  steps: {
    title: 'Cómo *trabajamos*',
    items: [
      { t: 'Nos contás tu caso', d: 'En la primera consulta, presencial o por videollamada, analizamos tu situación.' },
      { t: 'Te damos opciones', d: 'Te explicamos qué se puede hacer, cuánto puede tardar y los honorarios, sin letra chica.' },
      { t: 'Te acompañamos', d: 'Nos ocupamos de todo y te informamos de cada avance por WhatsApp.' },
    ],
  },
  gallery: { title: 'El *estudio*', images: ['1505664194779-8beaceb93744', '1436450412740-6b988f486c6b', '1450101499163-c8848c66ca85', '1521791136064-7986c2920216'] },
  testimonials: [
    { name: 'Raúl G.', text: 'Me despidieron sin causa y el estudio consiguió la indemnización completa. Siempre me explicaron todo.' },
    { name: 'Andrea L.', text: 'Hicieron la sucesión de mis padres sin complicaciones y con un presupuesto que respetaron.' },
    { name: 'Javier M.', text: 'La consulta por videollamada me ahorró viajar. Muy profesionales y claros.' },
  ],
  faq: [
    { q: '¿La primera consulta tiene costo?', a: 'En temas laborales y accidentes de tránsito la primera consulta es sin cargo. En otras áreas te informamos el valor al agendar.' },
    { q: '¿Puedo hacer la consulta por videollamada?', a: 'Sí, atendemos presencial en el estudio o por videollamada, como te quede más cómodo.' },
    { q: '¿Tengo que pagar algo por adelantado en un juicio laboral?', a: 'No. En juicios laborales y de accidentes cobramos un porcentaje al finalizar, solo si se gana.' },
    { q: '¿Qué documentación llevo?', a: 'Todo lo que tengas sobre el caso: recibos, telegramas, contratos o denuncias. Si no tenés nada, igual podemos asesorarte.' },
  ],
  booking: { cta: 'Agendar consulta', noun: 'consulta', modes: ['En el estudio', 'Videollamada'], closedDows: [0, 6], hours: [9, 18], step: 30, greet: 'Ferrari & Asociados' },
  info: { address: 'Calle 147 N° 1430, piso 2', city: 'Berazategui', hours: ['Lunes a viernes', '9 a 18 h'], instagram: '@ferrari.abogados', note: 'Estudio jurídico. Laboral, familia, sucesiones y accidentes.' },
  tips: {
    services: 'explicar tus áreas en palabras simples hace que el cliente sepa que sos el abogado indicado para su problema.',
    booking: 'agendar una consulta online es mucho más fácil que llamar: te llega con el tema y el horario elegidos.',
    about: 'trayectoria, matrícula y honorarios claros son lo que más confianza da a alguien que nunca contrató un abogado.',
  },
}

export default function Abogado() {
  return <BookingTemplate cfg={cfg} />
}
