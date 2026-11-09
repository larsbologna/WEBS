import { Building2, Calculator, FileSpreadsheet, Landmark, Rocket, Users } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'contador',
  name: 'Estudio Gómez',
  role: 'Cra. Laura Gómez · Contadora pública',
  logo: Calculator,
  theme: {
    bg: '#f4f7f6', surface: '#ffffff', ink: '#10241f', muted: '#5b6e68', accent: '#12795f', accentInk: '#ffffff', soft: '#dbeee7', line: '#dde7e3', dark: '#10241f',
    fonts: 'family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700',
    display: '"Space Grotesk", sans-serif', body: '"Manrope", sans-serif', shape: 'soft', accentOnDark: '#7fe0bc',
  },
  announce: '📅 Vencimientos al día · Agendá una reunión sin cargo',
  hero: {
    kicker: 'Estudio contable e impositivo',
    title: 'Tus impuestos *ordenados*, vos tranquilo.',
    text: 'Monotributo, autónomos, sueldos y sociedades. Nos ocupamos de los vencimientos y te explicamos todo en simple, con un abono mensual fijo.',
    image: '1554224154-26032ffc0d07', layout: 'full',
    stats: [{ v: '+300', l: 'clientes activos' }, { v: '0', l: 'vencimientos olvidados' }, { v: '24 h', l: 'para responderte' }],
  },
  servicesKicker: 'Servicios',
  servicesTitle: 'Lo que *hacemos por vos*',
  services: [
    { id: 'monotributo', name: 'Monotributo', desc: 'Alta, recategorización, facturación y pago mensual. Te avisamos antes de cada vencimiento.', icon: FileSpreadsheet, priceLabel: 'Desde $ 25.000 / mes', duration: 'Reunión de 30 min' },
    { id: 'autonomos', name: 'Responsables inscriptos', desc: 'IVA, ganancias y bienes personales para profesionales y comercios.', icon: Landmark, priceLabel: 'Desde $ 60.000 / mes', duration: 'Reunión de 45 min' },
    { id: 'sueldos', name: 'Sueldos y cargas sociales', desc: 'Liquidación de sueldos, F.931, altas y bajas de empleados y convenios.', icon: Users, priceLabel: 'Desde $ 8.000 / empleado', duration: 'Reunión de 30 min' },
    { id: 'sociedades', name: 'Sociedades', desc: 'Constitución de SAS y SRL, balances, libros y presentaciones ante organismos.', icon: Building2, priceLabel: 'Consultar', duration: 'Reunión de 45 min' },
    { id: 'emprendedores', name: 'Emprendedores', desc: 'Te ayudamos a arrancar: qué régimen te conviene, cómo facturar y cuánto vas a pagar.', icon: Rocket, priceLabel: 'Primera reunión sin cargo', duration: 'Reunión de 30 min' },
    { id: 'ganancias', name: 'Ganancias y bienes personales', desc: 'Declaraciones juradas anuales para personas humanas y planificación fiscal.', icon: Calculator, priceLabel: 'Consultar', duration: 'Reunión de 30 min' },
  ],
  plans: {
    title: 'Abonos *mensuales*',
    items: [
      { name: 'Monotributo', price: 25000, period: 'mes', features: ['Facturación y pago mensual', 'Recategorizaciones', 'Aviso de vencimientos'] },
      { name: 'Comercio', price: 60000, period: 'mes', features: ['IVA y ganancias', 'Hasta 3 empleados', 'Reunión mensual', 'Respuesta en 24 h'], highlight: true },
      { name: 'Empresa', price: 140000, period: 'mes', features: ['Sociedad completa', 'Sueldos sin límite', 'Balance anual', 'Asesor dedicado'] },
    ],
  },
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Laura*',
    image: '1508214751196-bcfd4ca60f91',
    text: ['Soy contadora pública (UNLP) y hace 14 años acompaño a monotributistas, comercios y pymes de la zona sur.', 'Mi objetivo es que entiendas tus números y no tengas sorpresas con ARCA (ex AFIP).'],
    creds: ['Contadora pública UNLP · CPCEPBA T° 112', 'Especialista en tributación', 'Atención presencial y 100% online'],
  },
  steps: {
    title: 'Empezar es *simple*',
    items: [
      { t: 'Reunión inicial', d: 'Sin cargo, en el estudio o por videollamada. Vemos tu situación actual.' },
      { t: 'Te ordenamos', d: 'Revisamos deudas, categorías y presentaciones pendientes.' },
      { t: 'Abono fijo', d: 'Nos ocupamos de todo cada mes y te avisamos de cada vencimiento.' },
    ],
  },
  gallery: { title: 'El *estudio*', images: ['1554224155-6726b3ff858f', '1460925895917-afdab827c52f', '1600880292203-757bb62b4baf', '1590650153855-d9e808231d41'] },
  testimonials: [
    { name: 'Carolina B.', text: 'Tenía el monotributo hecho un lío y en un mes estaba todo al día. Laura explica todo con paciencia.' },
    { name: 'Hernán R.', text: 'Llevan los sueldos de mi local hace 5 años. Nunca tuve un problema con un vencimiento.' },
    { name: 'Agustín V.', text: 'Me ayudaron a armar mi SAS y a elegir cómo facturar. Súper recomendables.' },
  ],
  faq: [
    { q: '¿La primera reunión tiene costo?', a: 'No, la primera reunión es sin cargo y sin compromiso.' },
    { q: '¿Atienden online?', a: 'Sí, podés hacer todo online: reuniones por videollamada y documentación por mail o WhatsApp.' },
    { q: '¿Qué necesito para empezar?', a: 'Tu CUIT y clave fiscal. Con eso revisamos tu situación y te decimos qué hace falta.' },
    { q: '¿Qué pasa si tengo deudas con ARCA (ex AFIP)?', a: 'Las revisamos y te proponemos la mejor forma de regularizarlas, con planes de pago si conviene.' },
  ],
  booking: { cta: 'Agendar reunión', noun: 'reunión', modes: ['En el estudio', 'Videollamada'], closedDows: [0, 6], hours: [9, 18], step: 30, greet: 'Estudio Gómez' },
  info: { address: 'Calle 14 N° 4620, of. 3', city: 'Berazategui', hours: ['Lunes a viernes', '9 a 18 h'], instagram: '@estudiogomez.contable', note: 'Estudio contable e impositivo.' },
  tips: {
    services: 'mostrar servicios con precio orientativo filtra consultas y atrae a los clientes que buscás.',
    booking: 'el potencial cliente agenda la reunión cuando quiere y a vos te llega por WhatsApp con el tema elegido.',
    about: 'tu cara y tu experiencia transmiten la confianza necesaria para que alguien te dé su clave fiscal.',
  },
}

export default function Contador() {
  return <BookingTemplate cfg={cfg} />
}
