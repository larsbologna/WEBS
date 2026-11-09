import { Apple, Baby, Dumbbell, Leaf, Salad, Video } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'nutricion',
  name: 'Camila Ruiz',
  role: 'Lic. en Nutrición · MN 9.874',
  logo: Leaf,
  theme: {
    bg: '#f6f8f1', surface: '#ffffff', ink: '#22301f', muted: '#65735f', accent: '#5b8c3a', accentInk: '#ffffff', soft: '#e3eed6', line: '#e1e7d5', dark: '#22301f',
    fonts: 'family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700',
    display: '"DM Serif Display", serif', body: '"DM Sans", sans-serif', shape: 'round', italic: true,
  },
  announce: '🥗 Consultas presenciales y online · Pedí tu turno',
  hero: {
    kicker: 'Nutrición sin dietas imposibles',
    title: 'Comer *rico* y sentirte bien, todos los días.',
    text: 'Planes de alimentación a tu medida, pensados para tu rutina, tus gustos y tu bolsillo. Sin prohibiciones y con acompañamiento real.',
    image: '1573497019236-17f8177b81e8', layout: 'portrait',
    stats: [{ v: '+1.200', l: 'pacientes' }, { v: 'Online', l: 'a todo el país' }, { v: '100%', l: 'personalizado' }],
  },
  trust: { title: 'Atiendo por', items: ['OSDE', 'Swiss Medical', 'Particular con reintegro'] },
  servicesKicker: 'Cómo te puedo ayudar',
  servicesTitle: 'Un plan para *cada objetivo*',
  services: [
    { id: 'inicial', name: 'Consulta inicial', desc: 'Evaluación completa, medidas, hábitos y objetivos. Te llevás tu plan personalizado.', icon: Salad, price: 28000, duration: '60 min', img: '1512621776951-a57141f2eefd' },
    { id: 'peso', name: 'Descenso de peso', desc: 'Bajar de peso de forma sostenible, sin pasar hambre ni dejar de salir a comer.', icon: Apple, price: 24000, duration: 'Control 40 min', img: '1546069901-ba9599a7e63c' },
    { id: 'deporte', name: 'Nutrición deportiva', desc: 'Alimentación para rendir más, recuperarte mejor y ganar masa muscular.', icon: Dumbbell, price: 24000, duration: 'Control 40 min', img: '1490645935967-10de6ba17061' },
    { id: 'veggie', name: 'Vegetariana y vegana', desc: 'Planes completos y variados, cuidando proteínas, hierro y vitamina B12.', icon: Leaf, price: 24000, duration: 'Control 40 min', img: '1540420773420-3366772f4999' },
    { id: 'embarazo', name: 'Embarazo y lactancia', desc: 'Acompañamiento en cada etapa para vos y tu bebé.', icon: Baby, price: 24000, duration: 'Control 40 min', img: '1494390248081-4e521a5940db' },
    { id: 'online', name: 'Consulta online', desc: 'Por videollamada, desde donde estés. Mismo plan y seguimiento por WhatsApp.', icon: Video, price: 22000, duration: '45 min', img: '1505576399279-565b52d4ac71' },
  ],
  plans: {
    title: 'Packs de *acompañamiento*',
    items: [
      { name: 'Consulta única', price: 28000, period: 'consulta', features: ['Evaluación completa', 'Plan de alimentación', 'Lista de compras'] },
      { name: 'Pack 3 meses', price: 69000, period: '3 meses', features: ['Consulta inicial + 3 controles', 'Ajustes del plan', 'Seguimiento por WhatsApp', 'Recetario semanal'], highlight: true },
      { name: 'Pack 6 meses', price: 129000, period: '6 meses', features: ['Consulta inicial + 6 controles', 'Mediciones de composición corporal', 'Seguimiento prioritario'] },
    ],
  },
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Camila*',
    image: '1610832958506-aa56368176cf',
    text: ['Soy licenciada en Nutrición (UBA) y hace 10 años acompaño a personas que quieren comer mejor sin vivir a dieta.', 'Creo en los planes que se adaptan a tu vida real: con tus horarios, tus comidas favoritas y lo que hay en tu barrio.'],
    creds: ['Lic. en Nutrición UBA · MN 9.874', 'Posgrado en nutrición deportiva', 'Antropometrista ISAK nivel 1'],
  },
  steps: {
    title: '¿Cómo es la *primera consulta*?',
    items: [
      { t: 'Te conozco', d: 'Hablamos de tus hábitos, tus gustos, tu rutina y lo que querés lograr.' },
      { t: 'Medimos', d: 'Peso, medidas y composición corporal para tener un punto de partida.' },
      { t: 'Tu plan', d: 'Te llevás un plan con opciones, recetas y lista de compras.' },
    ],
  },
  testimonials: [
    { name: 'Florencia D.', text: 'Bajé 9 kilos en 5 meses sin sentir que estaba a dieta. Camila te escucha de verdad.' },
    { name: 'Nicolás A.', text: 'Me armó un plan para el gimnasio que se adapta a mis horarios de trabajo. Rindo mucho más.' },
    { name: 'Julia S.', text: 'Hago las consultas online desde Córdoba y el seguimiento por WhatsApp es un golazo.' },
  ],
  faq: [
    { q: '¿La consulta online es igual a la presencial?', a: 'Sí, el plan y el seguimiento son los mismos. Solo cambian las mediciones: te enseño a tomarlas en casa.' },
    { q: '¿Tengo que dejar de comer lo que me gusta?', a: 'No. El plan incluye tus comidas favoritas en cantidades y momentos que te ayuden a cumplir tu objetivo.' },
    { q: '¿Atendés por obra social?', a: 'Atiendo OSDE y Swiss Medical. Si tenés otra, te doy factura para que pidas el reintegro.' },
    { q: '¿Cada cuánto son los controles?', a: 'En general cada 3 o 4 semanas, según tu objetivo.' },
  ],
  booking: { cta: 'Pedir turno', noun: 'turno', modes: ['Presencial', 'Online'], closedDows: [0, 6], hours: [9, 20], step: 45, greet: 'Camila' },
  info: { address: 'Calle 149 N° 1260', city: 'Berazategui · y online a todo el país', hours: ['Lunes a viernes', '9 a 20 h'], instagram: '@camilaruiz.nutri', note: 'Nutrición clínica, deportiva y vegetariana.' },
  tips: {
    services: 'precios y servicios claros filtran consultas: te escriben los que ya saben lo que buscan.',
    booking: 'el paciente elige presencial u online, día y horario. A vos te llega todo en un WhatsApp para confirmar.',
    about: 'contar tu enfoque y tu formación es lo que hace que alguien te elija entre tantas opciones.',
  },
}

export default function Nutricion() {
  return <BookingTemplate cfg={cfg} />
}
