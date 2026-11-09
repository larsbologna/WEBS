import { Baby, HeartPulse, ScanLine, ShieldCheck, Smile, Sparkles } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'odontologia',
  name: 'Dra. Sofía Méndez',
  role: 'Odontóloga · MN 41.208',
  logo: Smile,
  theme: {
    bg: '#f6fafb', surface: '#ffffff', ink: '#0f2b3a', muted: '#58707e', accent: '#0e8fa8', accentInk: '#ffffff', soft: '#ddf2f6', line: '#dbe8ed', dark: '#0f2b3a',
    fonts: 'family=Sora:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700',
    display: '"Sora", sans-serif', body: '"Plus Jakarta Sans", sans-serif', shape: 'round',
  },
  hero: {
    kicker: 'Odontología general y estética',
    title: 'Tu sonrisa, en *buenas manos*.',
    text: 'Atención cuidada y sin apuros para toda la familia: limpiezas, arreglos, ortodoncia invisible, implantes y blanqueamiento. Pedí tu turno online en un minuto.',
    image: '1606265752439-1f18756aa5fc', layout: 'editorial',
    stats: [{ v: '15 años', l: 'de experiencia' }, { v: '+3.000', l: 'pacientes' }, { v: 'Sin dolor', l: 'anestesia computarizada' }],
  },
  trust: { title: 'Obras sociales', items: ['OSDE', 'Swiss Medical', 'Galeno', 'Medifé', 'IOMA'] },
  servicesKicker: 'Tratamientos',
  servicesTitle: 'Todo lo que tu boca *necesita*',
  services: [
    { id: 'control', name: 'Control y limpieza', desc: 'Revisión completa, limpieza con ultrasonido y aplicación de flúor. Lo ideal es cada 6 meses.', icon: ShieldCheck, duration: '40 min', priceLabel: 'Cubre obra social' },
    { id: 'caries', name: 'Arreglos y caries', desc: 'Restauraciones estéticas del color de tu diente, sin metales.', icon: HeartPulse, duration: '45 min', priceLabel: 'Cubre obra social' },
    { id: 'ortodoncia', name: 'Ortodoncia invisible', desc: 'Alineadores transparentes y removibles. Te mostramos cómo va a quedar tu sonrisa antes de empezar.', icon: ScanLine, duration: 'Primera consulta 30 min', priceLabel: 'Consultar' },
    { id: 'implantes', name: 'Implantes', desc: 'Reemplazo de piezas perdidas con implantes de titanio y coronas a medida.', icon: Smile, duration: 'Evaluación 30 min', priceLabel: 'Consultar' },
    { id: 'blanqueamiento', name: 'Blanqueamiento', desc: 'Blanqueamiento en consultorio o con cubetas para hacer en casa. Resultados desde la primera sesión.', icon: Sparkles, duration: '60 min', price: 120000 },
    { id: 'ninos', name: 'Odontopediatría', desc: 'Primera visita con juegos y mucha paciencia para que los chicos vengan contentos.', icon: Baby, duration: '30 min', priceLabel: 'Cubre obra social' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Sofía*',
    image: '1651008376811-b90baee60c1f',
    text: ['Me recibí en la UBA y me especialicé en estética dental y ortodoncia. Atiendo hace 15 años en Berazategui.', 'Mi prioridad es que te sientas cómodo: te explico cada paso, sin apuros y con presupuestos claros antes de empezar cualquier tratamiento.'],
    creds: ['Odontóloga UBA · MN 41.208', 'Especialista en ortodoncia invisible', 'Miembro de la Asociación Odontológica Argentina'],
  },
  steps: {
    title: 'Tu *primera consulta*',
    items: [
      { t: 'Revisión completa', d: 'Miramos cómo está tu boca y, si hace falta, sacamos una radiografía digital en el momento.' },
      { t: 'Plan de tratamiento', d: 'Te explico qué hay que hacer, en qué orden y cuánto cubre tu obra social.' },
      { t: 'Turnos a tu medida', d: 'Organizamos las próximas visitas según tus horarios.' },
    ],
  },
  gallery: { title: 'El *consultorio*', images: ['1629909613654-28e377c37b09', '1598256989800-fe5f95da9787', '1629909615184-74f495363b67', '1609207825181-52d3214556dd', '1588776814546-1ffcf47267a5', '1606811971618-4486d14f3f99'] },
  testimonials: [
    { name: 'Laura F.', text: 'Le tenía terror al dentista y la Dra. Méndez me cambió la experiencia. Súper paciente y cero dolor.' },
    { name: 'Pablo C.', text: 'Hice la ortodoncia invisible y quedé feliz. Me mostró el resultado antes de arrancar.' },
    { name: 'Mariana T.', text: 'Llevo a mis dos hijos y salen contentos. Sacar turno por la web es comodísimo.' },
  ],
  faq: [
    { q: '¿Atendés por obra social?', a: 'Sí, trabajo con OSDE, Swiss Medical, Galeno, Medifé e IOMA. Si tenés otra, consultame y vemos opciones.' },
    { q: '¿Qué hago si tengo una urgencia?', a: 'Escribime por WhatsApp. Reservo turnos todos los días para urgencias y dolor.' },
    { q: '¿Cuánto dura una ortodoncia invisible?', a: 'Depende de cada caso, en general entre 6 y 18 meses. En la primera consulta te doy un tiempo estimado.' },
    { q: '¿El blanqueamiento daña los dientes?', a: 'No, si se hace con control profesional. Usamos geles seguros y evaluamos antes tu sensibilidad.' },
  ],
  booking: { cta: 'Pedir turno', noun: 'turno', closedDows: [0, 6], hours: [9, 19], step: 30, greet: 'Dra. Méndez' },
  info: { address: 'Calle 13 N° 4520, 1° B', city: 'Berazategui', hours: ['Lunes a viernes', '9 a 19 h'], instagram: '@dra.sofiamendez', note: 'Odontología general, estética y ortodoncia.' },
  tips: {
    services: 'el paciente ve qué tratamientos hacés y si los cubre su obra social: llega con menos dudas y más decidido.',
    booking: 'el turno te llega por WhatsApp con tratamiento, día y hora. Lo confirmás en un mensaje, sin llamados.',
    about: 'tu foto, tu matrícula y tu forma de trabajar generan la confianza que hace que un paciente nuevo te elija.',
  },
}

export default function Odontologia() {
  return <BookingTemplate cfg={cfg} />
}
