import { Brain, Compass, Feather, HeartHandshake, MessageCircleHeart, Users } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'psicologia',
  name: 'Lic. Valeria Sosa',
  role: 'Psicóloga clínica · MN 51.302',
  logo: Feather,
  theme: {
    bg: '#f6f3ef', surface: '#fffdfa', ink: '#2e2a35', muted: '#6e6877', accent: '#7a6aa8', accentInk: '#ffffff', soft: '#ebe6f5', line: '#e7e1d9', dark: '#2e2a35',
    fonts: 'family=Cormorant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Nunito+Sans:wght@400;600;700',
    display: '"Cormorant", serif', body: '"Nunito Sans", sans-serif', shape: 'soft', italic: true,
  },
  hero: {
    kicker: 'Terapia presencial y online',
    title: 'Un espacio para *escucharte*.',
    text: 'Acompaño a adultos, adolescentes y parejas a atravesar momentos difíciles, entender lo que les pasa y encontrar nuevas formas de estar bien.',
    image: '1586023492125-27b2c045efd7', layout: 'portrait',
  },
  servicesKicker: 'Cómo trabajo',
  servicesTitle: 'Terapia a la *medida de cada persona*',
  services: [
    { id: 'adultos', name: 'Terapia individual', desc: 'Un espacio semanal para trabajar lo que te preocupa: vínculos, trabajo, duelos o cambios de etapa.', icon: Brain, duration: 'Sesión de 50 min', priceLabel: 'Particular o con reintegro' },
    { id: 'ansiedad', name: 'Ansiedad y estrés', desc: 'Herramientas concretas para manejar la ansiedad, los ataques de pánico y el estrés del día a día.', icon: Feather, duration: 'Sesión de 50 min', priceLabel: 'Particular o con reintegro' },
    { id: 'adolescentes', name: 'Adolescentes', desc: 'Acompañamiento para chicos de 13 a 18 años, con encuentros de orientación para la familia.', icon: MessageCircleHeart, duration: 'Sesión de 50 min', priceLabel: 'Particular o con reintegro' },
    { id: 'pareja', name: 'Terapia de pareja', desc: 'Para mejorar la comunicación, resolver conflictos o decidir juntos cómo seguir.', icon: HeartHandshake, duration: 'Sesión de 60 min', priceLabel: 'Particular' },
    { id: 'vocacional', name: 'Orientación vocacional', desc: 'Encuentros para descubrir qué estudiar o cómo reorientar tu carrera.', icon: Compass, duration: '4 encuentros', priceLabel: 'Consultar' },
    { id: 'grupos', name: 'Talleres grupales', desc: 'Grupos reducidos sobre manejo de la ansiedad y autoestima.', icon: Users, duration: '6 encuentros', priceLabel: 'Consultar' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Valeria*',
    image: '1573497019940-1c28c88b4f3e',
    text: ['Soy psicóloga clínica (UBA) con orientación cognitivo-conductual. Hace 12 años acompaño a personas en procesos de cambio.', 'Creo en una terapia cercana, activa y con objetivos claros, donde te sientas cómodo para hablar de lo que necesites.'],
    creds: ['Lic. en Psicología UBA · MN 51.302', 'Especialización en terapia cognitivo-conductual', 'Supervisión clínica permanente'],
  },
  steps: {
    title: '¿Cómo *empezamos*?',
    items: [
      { t: 'Primera entrevista', d: 'Nos conocemos, me contás qué te trae y vemos juntos si puedo ayudarte.' },
      { t: 'Definimos objetivos', d: 'Acordamos frecuencia, modalidad y lo que queremos trabajar.' },
      { t: 'Sesiones semanales', d: 'Presenciales u online, en un horario fijo que te quede cómodo.' },
    ],
  },
  gallery: { title: 'Un lugar *tranquilo*', images: ['1586023492125-27b2c045efd7', '1555041469-a586c61ea9bc', '1524758631624-e2822e304c36', '1506126613408-eca07ce68773'] },
  testimonials: [
    { name: 'M., 34 años', text: 'Llegué con muchísima ansiedad y hoy tengo herramientas para manejarla. Me sentí escuchada desde el primer día.' },
    { name: 'J., 41 años', text: 'Hacer terapia online me permitió sostenerla con mi trabajo. Valeria es muy cálida y clara.' },
    { name: 'L. y F.', text: 'La terapia de pareja nos ayudó a volver a hablar sin pelear. Ojalá la hubiéramos empezado antes.' },
  ],
  faq: [
    { q: '¿La terapia online funciona igual?', a: 'Sí. Los estudios muestran resultados similares y te ahorrás el traslado. Solo necesitás un lugar tranquilo y buena conexión.' },
    { q: '¿Atendés por obra social?', a: 'Atiendo de forma particular y te doy factura para que pidas el reintegro a tu prepaga.' },
    { q: '¿Cuánto dura un tratamiento?', a: 'Depende de cada persona y de lo que quiera trabajar. Lo vamos revisando juntos cada algunos meses.' },
    { q: '¿Lo que hablamos es confidencial?', a: 'Sí, totalmente. El secreto profesional es la base de la terapia.' },
  ],
  booking: { cta: 'Pedir entrevista', noun: 'primera entrevista', modes: ['Presencial', 'Online'], closedDows: [0, 6], hours: [9, 21], step: 60, greet: 'Valeria' },
  info: { address: 'Consultorio en Calle 12 N° 4310', city: 'Berazategui · y online', hours: ['Lunes a viernes', '9 a 21 h'], instagram: '@lic.valeriasosa', note: 'Psicología clínica para adultos, adolescentes y parejas.' },
  tips: {
    services: 'explicar cómo trabajás baja la ansiedad de quien nunca hizo terapia y le da el empujón para escribirte.',
    booking: 'pedir la primera entrevista online es mucho más fácil que llamar: llega por WhatsApp y vos respondés cuando podés.',
    about: 'tu foto y tu enfoque ayudan a que el paciente sienta que te conoce antes de la primera sesión.',
  },
}

export default function Psicologia() {
  return <BookingTemplate cfg={cfg} />
}
