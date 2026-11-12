import { Apple, Baby, HeartPulse, Ruler, Stethoscope, Syringe } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'pediatra',
  name: 'Dra. Paula Correa',
  role: 'Pediatra · MN 98.215',
  logo: Baby,
  theme: {
    bg: '#f7fbfa', surface: '#ffffff', ink: '#1f3b4d', muted: '#5b7181', accent: '#2bb3a3', accentInk: '#ffffff', soft: '#d9f2ee', line: '#dceae7', dark: '#1f3b4d',
    fonts: 'family=Baloo+2:wght@500;600;700;800&family=Nunito+Sans:wght@400;600;700',
    display: '"Baloo 2", sans-serif', body: '"Nunito Sans", sans-serif', shape: 'round', accentOnDark: '#7fe3d6',
  },
  announce: '👶 Turnos para recién nacidos dentro de la semana',
  hero: {
    kicker: 'Pediatría y control del niño sano',
    title: 'Cuidamos a tus hijos *como a los nuestros*.',
    text: 'Controles desde el nacimiento hasta la adolescencia, vacunas, consultas por enfermedad y orientación en alimentación. Con tiempo para escucharte.',
    image: '1503454537195-1dcabb73ffb9', layout: 'portrait',
    stats: [{ v: '0 a 18', l: 'años' }, { v: '20 años', l: 'de experiencia' }, { v: 'WhatsApp', l: 'para dudas' }],
  },
  trust: { title: 'Obras sociales', items: ['OSDE', 'Swiss Medical', 'Galeno', 'Medifé', 'Omint'] },
  servicesKicker: 'Consultas',
  servicesTitle: 'Acompañamos *cada etapa*',
  services: [
    { id: 'nacido', name: 'Control del recién nacido', desc: 'Primera consulta después del alta, lactancia, sueño y todas tus dudas de los primeros días.', icon: Baby, duration: '45 min', priceLabel: 'Cubre obra social' },
    { id: 'sano', name: 'Control del niño sano', desc: 'Crecimiento, desarrollo, vacunas y certificados para el colegio y el club.', icon: Ruler, duration: '30 min', priceLabel: 'Cubre obra social' },
    { id: 'enfermedad', name: 'Consulta por enfermedad', desc: 'Fiebre, tos, dolor de oído o de panza. Turnos en el día para urgencias.', icon: Stethoscope, duration: '20 min', priceLabel: 'Cubre obra social' },
    { id: 'vacunas', name: 'Vacunas', desc: 'Calendario oficial y vacunas opcionales, con control del carnet.', icon: Syringe, duration: '15 min', priceLabel: 'Consultar' },
    { id: 'alimentacion', name: 'Alimentación', desc: 'Inicio de sólidos, alimentación saludable y seguimiento del peso.', icon: Apple, duration: '30 min', priceLabel: 'Cubre obra social' },
    { id: 'adolescencia', name: 'Adolescencia', desc: 'Consultas en un espacio de confianza para adolescentes y sus familias.', icon: HeartPulse, duration: '40 min', priceLabel: 'Cubre obra social' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Paula*',
    image: '1631217868264-e5b90bb7e133',
    text: ['Soy médica pediatra (UBA) y hace 20 años acompaño a familias de la zona. Trabajé muchos años en la guardia pediátrica de un hospital público.', 'Me gusta que las consultas sean tranquilas, con tiempo para explicar y para que los chicos se sientan cómodos.'],
    creds: ['Médica pediatra UBA · MN 98.215', 'Especialista certificada por la Sociedad Argentina de Pediatría', 'Puericultura y lactancia'],
  },
  steps: {
    title: 'La *primera consulta*',
    items: [
      { t: 'Historia clínica', d: 'Repasamos el embarazo, el parto, las vacunas y los antecedentes de la familia.' },
      { t: 'Examen completo', d: 'Peso, talla, desarrollo y revisión general, siempre con paciencia.' },
      { t: 'Plan de controles', d: 'Te explico cada cuánto venir y te dejo un canal para dudas.' },
    ],
  },
  gallery: { title: 'Nuestros *pacientes*', images: ['1566004100631-35d015d6a491', '1491013516836-7db643ee125a', '1471286174890-9c112ffca5b4', '1516627145497-ae6968895b74'] },
  testimonials: [
    { name: 'Mamá de Emma', text: 'La Dra. Correa nos acompañó desde el primer día. Súper paciente y siempre responde las dudas.' },
    { name: 'Papá de Thiago', text: 'Conseguimos turno en el día por una fiebre alta. Excelente atención.' },
    { name: 'Mamá de Juli y Valen', text: 'Los chicos la adoran. Saco los turnos desde la web en un minuto.' },
  ],
  faq: [
    { q: '¿Cuándo hago la primera consulta del bebé?', a: 'Entre los 3 y 7 días después del alta. Reservamos turnos para recién nacidos dentro de la semana.' },
    { q: '¿Atendés urgencias?', a: 'Guardamos turnos en el día para consultas por enfermedad. Ante una emergencia, andá a la guardia más cercana.' },
    { q: '¿Qué llevo al control?', a: 'La libreta sanitaria, el carnet de vacunas y la credencial de la obra social.' },
    { q: '¿Hacés certificados para el colegio?', a: 'Sí, en el control del niño sano completamos el certificado de aptitud física y buco-dental si lo traés.' },
  ],
  booking: { cta: 'Pedir turno', noun: 'turno', closedDows: [0, 6], hours: [9, 19], step: 20, greet: 'Dra. Correa' },
  info: { address: 'Consultorio en Calle 145 N° 1540', city: 'Berazategui', hours: ['Lunes a viernes', '9 a 19 h'], instagram: '@dra.paulacorrea.pediatra', note: 'Pediatría y control del niño sano.' },
  tips: {
    services: 'los papás ven qué consultas hacés y qué cubre su obra social antes de pedir turno.',
    booking: 'pedir turno a la noche, con el bebé dormido, sin llamar: llega por WhatsApp y lo confirmás a la mañana.',
    about: 'para una familia elegir pediatra es elegir a alguien de confianza: tu historia y tu forma de atender son clave.',
  },
}

export default function Pediatra() {
  return <BookingTemplate cfg={cfg} />
}
