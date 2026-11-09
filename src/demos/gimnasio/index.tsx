import { Activity, Dumbbell, Flame, HeartPulse, User, Zap } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'gimnasio',
  name: 'Pulso',
  role: 'Gym · Funcional · Clases',
  logo: Zap,
  theme: {
    bg: '#0e0e10', surface: '#18181b', ink: '#f4f4f5', muted: '#a1a1aa', accent: '#d4ff3a', accentInk: '#0e0e10', soft: '#262a12', line: '#2a2a2f', dark: '#000000',
    fonts: 'family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700;800',
    display: '"Oswald", sans-serif', body: '"Inter", sans-serif', shape: 'soft', upper: true,
  },
  announce: '⚡ Tu primera clase es gratis · Reservala online',
  hero: {
    kicker: 'Abierto de 7 a 23 h',
    title: 'Entrená *distinto*. Sentí el pulso.',
    text: 'Sala de musculación completa, funcional, cross y clases grupales con profes que te acompañan. Probá una clase gratis y conocé el gym.',
    image: '1540497077202-7c8a3999166f', layout: 'full',
    stats: [{ v: '+40', l: 'clases por semana' }, { v: '600 m²', l: 'de sala' }, { v: '7 a 23', l: 'de lunes a viernes' }],
  },
  servicesKicker: 'Actividades',
  servicesTitle: 'Elegí cómo *entrenar*',
  services: [
    { id: 'muscu', name: 'Musculación', desc: 'Sala completa con máquinas, peso libre y rutina armada por un profe.', icon: Dumbbell, duration: 'Horario libre', img: '1534438327276-14e5300c3a48' },
    { id: 'funcional', name: 'Funcional', desc: 'Circuitos de fuerza y cardio en grupo reducido. Para todos los niveles.', icon: Activity, duration: '60 min', img: '1599058917212-d750089bc07e' },
    { id: 'cross', name: 'Cross training', desc: 'Alta intensidad con barras, kettlebells y trabajo metabólico.', icon: Flame, duration: '60 min', img: '1517963879433-6ad2b056d712' },
    { id: 'yoga', name: 'Yoga', desc: 'Movilidad, respiración y equilibrio para bajar el estrés.', icon: HeartPulse, duration: '60 min', img: '1544367567-0f2fcb009e0b' },
    { id: 'pilates', name: 'Pilates mat', desc: 'Core, postura y tonificación con ejercicios de bajo impacto.', icon: Activity, duration: '50 min', img: '1518611012118-696072aa579a' },
    { id: 'personal', name: 'Entrenamiento personal', desc: 'Sesiones 1 a 1 con objetivos y seguimiento personalizado.', icon: User, priceLabel: 'Consultar', duration: '60 min', img: '1584466977773-e625c37cdd50' },
  ],
  plans: {
    title: 'Planes *claros*, sin matrícula',
    items: [
      { name: '2 veces', price: 28000, period: 'mes', features: ['2 días por semana', 'Sala o clases', 'Rutina personalizada'] },
      { name: 'Libre', price: 36000, period: 'mes', features: ['Todos los días', 'Sala + todas las clases', 'Rutina y seguimiento', 'App con tus rutinas'], highlight: true },
      { name: 'Anual', price: 360000, period: 'año', features: ['2 meses de regalo', 'Pase libre todo el año', 'Evaluación física trimestral'] },
    ],
  },
  schedule: {
    title: 'Grilla de *clases*',
    days: [
      { day: 'Lunes', classes: [{ time: '08:00', name: 'Funcional' }, { time: '09:00', name: 'Yoga' }, { time: '18:00', name: 'Cross training' }, { time: '19:00', name: 'Funcional' }, { time: '20:00', name: 'Pilates mat' }] },
      { day: 'Martes', classes: [{ time: '08:00', name: 'Pilates mat' }, { time: '18:00', name: 'Funcional' }, { time: '19:00', name: 'Cross training' }, { time: '20:00', name: 'Yoga' }] },
      { day: 'Miércoles', classes: [{ time: '08:00', name: 'Funcional' }, { time: '09:00', name: 'Yoga' }, { time: '18:00', name: 'Cross training' }, { time: '19:00', name: 'Funcional' }, { time: '20:00', name: 'Pilates mat' }] },
      { day: 'Jueves', classes: [{ time: '08:00', name: 'Pilates mat' }, { time: '18:00', name: 'Funcional' }, { time: '19:00', name: 'Cross training' }, { time: '20:00', name: 'Yoga' }] },
      { day: 'Viernes', classes: [{ time: '08:00', name: 'Funcional' }, { time: '18:00', name: 'Cross training' }, { time: '19:00', name: 'Funcional' }] },
      { day: 'Sábado', classes: [{ time: '10:00', name: 'Cross training' }, { time: '11:00', name: 'Yoga' }] },
    ],
  },
  about: {
    kicker: 'El equipo',
    title: 'Profes que te *acompañan*',
    image: '1517836357463-d25dfeac3438',
    text: ['En Pulso nadie entrena solo: cada socio tiene una rutina armada según su objetivo y un profe que la ajusta mes a mes.', 'Somos un equipo de profesores de educación física y entrenadores certificados.'],
    creds: ['Profes de educación física recibidos', 'Evaluación física al empezar', 'Rutinas actualizadas cada mes'],
  },
  gallery: { title: 'Conocé el *gym*', images: ['1571902943202-507ec2618e8f', '1593079831268-3381b0db4a77', '1576678927484-cc907957088c', '1549060279-7e168fcee0c2', '1534438327276-14e5300c3a48', '1599058917212-d750089bc07e'] },
  testimonials: [
    { name: 'Martín G.', text: 'Probé la clase gratis de funcional y me quedé. Los profes están en todo.' },
    { name: 'Sofía L.', text: 'Los horarios me re sirven y la grilla online me salva para organizarme.' },
    { name: 'Diego R.', text: 'La sala está siempre impecable y nunca falta lugar en las máquinas.' },
  ],
  faq: [
    { q: '¿La clase de prueba es gratis?', a: 'Sí, tu primera clase es sin cargo. Reservala online y vení con ropa cómoda y una botella de agua.' },
    { q: '¿Hay matrícula?', a: 'No cobramos matrícula. Pagás solo el plan que elijas.' },
    { q: '¿Necesito apto físico?', a: 'Sí, te pedimos un apto médico dentro del primer mes. Si no tenés, te recomendamos dónde hacerlo.' },
    { q: '¿Puedo congelar el plan?', a: 'Con el plan anual podés congelar hasta 30 días por viaje o lesión.' },
  ],
  booking: { cta: 'Clase gratis', noun: 'clase de prueba', closedDows: [0], hours: [8, 21], step: 60, greet: 'Pulso' },
  info: { address: 'Av. Mitre 3050', city: 'Berazategui', hours: ['Lunes a viernes 7 a 23 h', 'Sábados 9 a 14 h'], instagram: '@pulso.gym', note: 'Gimnasio · Funcional · Clases grupales.' },
  tips: {
    services: 'actividades con foto y grilla de clases: el interesado ve todo antes de venir y llega decidido.',
    booking: 'la clase de prueba es tu mejor anzuelo: te llega por WhatsApp con día y horario, y lo convertís en socio.',
    about: 'mostrar al equipo genera confianza: la gente elige un gym por los profes.',
  },
}

export default function Gimnasio() {
  return <BookingTemplate cfg={cfg} />
}
