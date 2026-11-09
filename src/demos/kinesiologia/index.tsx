import { Activity, Bone, Dumbbell, HandHeart, PersonStanding, Zap } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'kinesiologia',
  name: 'Kinesio Movimiento',
  role: 'Lic. Tomás Ríos · Kinesiólogo · MN 12.775',
  logo: Activity,
  theme: {
    bg: '#f4f7fa', surface: '#ffffff', ink: '#0b1f33', muted: '#5a6b7c', accent: '#ff6a3d', accentInk: '#ffffff', soft: '#ffe6dd', line: '#e0e7ee', dark: '#0b1f33',
    fonts: 'family=Outfit:wght@500;600;700;800&family=Inter:wght@400;500;600;700',
    display: '"Outfit", sans-serif', body: '"Inter", sans-serif', shape: 'soft',
  },
  announce: '🩺 Atendemos obras sociales · Turnos en el día para lesiones agudas',
  hero: {
    kicker: 'Kinesiología y rehabilitación',
    title: 'Volvé a *moverte* sin dolor.',
    text: 'Rehabilitación de lesiones, kinesiología deportiva y tratamientos para dolores de espalda y cuello. Sesiones individuales de 45 minutos, sin compartir camilla.',
    image: '1571019614242-c5c5dee9f50b', layout: 'full',
    stats: [{ v: '1 a 1', l: 'sesiones individuales' }, { v: '45 min', l: 'por sesión' }, { v: '+15', l: 'obras sociales' }],
  },
  trust: { title: 'Obras sociales', items: ['OSDE', 'Swiss Medical', 'Galeno', 'OSECAC', 'IOMA', 'PAMI'] },
  servicesKicker: 'Tratamientos',
  servicesTitle: 'Te ayudamos a *recuperarte*',
  services: [
    { id: 'lesiones', name: 'Rehabilitación de lesiones', desc: 'Esguinces, fracturas, tendinitis y postoperatorios de rodilla, hombro o tobillo.', icon: Bone, duration: '45 min', priceLabel: 'Con obra social' },
    { id: 'deportiva', name: 'Kinesiología deportiva', desc: 'Recuperación y prevención de lesiones para que vuelvas a entrenar cuanto antes.', icon: Dumbbell, duration: '45 min', priceLabel: 'Con obra social' },
    { id: 'columna', name: 'Dolor de espalda y cuello', desc: 'Tratamiento de contracturas, lumbalgias, cervicalgias y hernias de disco.', icon: PersonStanding, duration: '45 min', priceLabel: 'Con obra social' },
    { id: 'rpg', name: 'RPG y postura', desc: 'Reeducación postural global para corregir la postura y aliviar dolores crónicos.', icon: Activity, duration: '50 min', price: 22000 },
    { id: 'masoterapia', name: 'Masoterapia', desc: 'Masajes descontracturantes y de recuperación muscular.', icon: HandHeart, duration: '40 min', price: 18000 },
    { id: 'fisio', name: 'Fisioterapia', desc: 'Magnetoterapia, ultrasonido, láser y electroestimulación como complemento.', icon: Zap, duration: '30 min', priceLabel: 'Con obra social' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Tomás*',
    image: '1622902046580-2b47f47f5471',
    text: ['Soy kinesiólogo y fisiatra, especializado en deportología. Trabajé con clubes de fútbol y rugby de la zona.', 'En cada sesión trabajo solo con vos: evaluación, tratamiento y ejercicios para que sigas en casa.'],
    creds: ['Lic. en Kinesiología y Fisiatría UBA · MN 12.775', 'Posgrado en kinesiología deportiva', 'Certificado en RPG'],
  },
  steps: {
    title: '¿Cómo es el *tratamiento*?',
    items: [
      { t: 'Evaluación', d: 'En la primera sesión evaluamos tu lesión y armamos un plan con objetivos.' },
      { t: 'Sesiones 1 a 1', d: 'Terapia manual, ejercicios y fisioterapia, siempre personalizado.' },
      { t: 'Alta y prevención', d: 'Te damos una rutina para que la lesión no vuelva.' },
    ],
  },
  testimonials: [
    { name: 'Gonzalo P.', text: 'Me operé de los ligamentos y en 4 meses volví a jugar al fútbol. Tomás es un crack.' },
    { name: 'Silvia M.', text: 'Tenía dolor de cintura hace años y con RPG cambió todo. Atención súper personalizada.' },
    { name: 'Lucas B.', text: 'Saqué turno por la web un domingo a la noche y el lunes ya estaba atendido.' },
  ],
  faq: [
    { q: '¿Necesito orden médica?', a: 'Para usar tu obra social sí, necesitás la orden con el diagnóstico. Si venís de forma particular, no hace falta.' },
    { q: '¿Cuántas sesiones voy a necesitar?', a: 'Depende de la lesión. Después de la evaluación te damos un estimado.' },
    { q: '¿Qué ropa llevo?', a: 'Ropa cómoda que permita mover y descubrir la zona a tratar.' },
    { q: '¿Atienden urgencias?', a: 'Sí, guardamos turnos en el día para lesiones agudas y contracturas.' },
  ],
  booking: { cta: 'Pedir turno', noun: 'turno', closedDows: [0], hours: [8, 20], step: 45, greet: 'Kinesio Movimiento' },
  info: { address: 'Av. 14 N° 5210', city: 'Berazategui', hours: ['Lunes a viernes 8 a 20 h', 'Sábados 9 a 13 h'], instagram: '@kinesio.movimiento', note: 'Kinesiología, deportología y rehabilitación.' },
  tips: {
    services: 'listar tratamientos y obras sociales responde las dos preguntas que más te hacen antes de pedir turno.',
    booking: 'el paciente saca turno a cualquier hora y a vos te llega ordenado por WhatsApp para confirmar.',
    about: 'contar tu experiencia con deportistas y tu especialidad te diferencia de otros consultorios de la zona.',
  },
}

export default function Kinesiologia() {
  return <BookingTemplate cfg={cfg} />
}
