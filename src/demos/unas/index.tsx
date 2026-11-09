import { Brush, Droplets, Footprints, Gem, Hand, Sparkles } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'unas',
  name: 'Coral Nail Bar',
  role: 'Uñas · Manos · Pies',
  logo: Sparkles,
  theme: {
    bg: '#fff8f6', surface: '#ffffff', ink: '#3d2a2a', muted: '#86696a', accent: '#e8735a', accentInk: '#ffffff', soft: '#fde5de', line: '#f4e1db', dark: '#3d2a2a',
    fonts: 'family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Manrope:wght@400;500;600;700;800',
    display: '"Playfair Display", serif', body: '"Manrope", sans-serif', shape: 'round', italic: true,
  },
  announce: '💅 Nuevos diseños de temporada · Reservá tu turno online',
  hero: {
    kicker: 'Nail bar en Berazategui',
    title: 'Uñas *perfectas* que duran semanas.',
    text: 'Semipermanente, kapping, esculpidas y nail art con productos de primera. Elegí tu servicio, el día y el horario: te confirmamos por WhatsApp.',
    image: '1607779097040-26e80aa78e66', layout: 'portrait',
    stats: [{ v: '+2.500', l: 'clientas felices' }, { v: '4.9 ★', l: 'en Google' }, { v: '3 sem.', l: 'de duración' }],
  },
  servicesKicker: 'Servicios y precios',
  servicesTitle: 'Elegí tu *servicio*',
  services: [
    { id: 'semi', name: 'Esmaltado semipermanente', desc: 'Color parejo y brillante que dura hasta 3 semanas sin descascararse.', icon: Droplets, price: 12000, duration: '60 min', img: '1610992015732-2449b76344bc' },
    { id: 'kapping', name: 'Kapping en gel', desc: 'Capa de gel sobre tu uña natural para que crezca fuerte y no se quiebre.', icon: Gem, price: 16000, duration: '75 min', img: '1519014816548-bf5fe059798b' },
    { id: 'esculpidas', name: 'Uñas esculpidas', desc: 'Largo y forma a medida en acrílico o gel. Incluye diseño simple.', icon: Hand, price: 22000, duration: '120 min', img: '1604654894610-df63bc536371' },
    { id: 'art', name: 'Nail art', desc: 'Diseños a mano alzada, francesitas, glitter y decoraciones. Traé tu foto de referencia.', icon: Brush, priceLabel: 'Desde $ 2.500', duration: 'Se suma al servicio', img: '1571290274554-6a2eaa771e5f' },
    { id: 'spa', name: 'Spa de manos', desc: 'Limpieza, exfoliación, hidratación profunda y esmaltado tradicional.', icon: Sparkles, price: 10000, duration: '50 min', img: '1604902396830-aca29e19b067' },
    { id: 'pedi', name: 'Pedicura spa', desc: 'Baño de pies, limado, cutículas, exfoliación y semipermanente.', icon: Footprints, price: 15000, duration: '70 min', img: '1519415510236-718bdfcd89c8' },
  ],
  about: {
    kicker: 'Nosotras',
    title: 'Un rato para *vos*',
    image: '1632345031435-8727f6897d53',
    text: ['Somos un equipo de manicuras certificadas que ama los detalles. Trabajamos con materiales esterilizados y productos que cuidan tu uña natural.', 'Mientras te atendemos, te ofrecemos un café y buena música. La idea es que salgas renovada.'],
    creds: ['Instrumental esterilizado en autoclave', 'Productos libres de tóxicos', 'Capacitación constante en nuevas técnicas'],
  },
  gallery: { title: 'Trabajos *recientes*', images: ['1604654894610-df63bc536371', '1519014816548-bf5fe059798b', '1571290274554-6a2eaa771e5f', '1610992015732-2449b76344bc', '1604902396830-aca29e19b067', '1607779097040-26e80aa78e66'] },
  testimonials: [
    { name: 'Agustina M.', text: 'El semi me duró casi un mes intacto. Las chicas son súper detallistas y el lugar es hermoso.' },
    { name: 'Rocío P.', text: 'Me hicieron exactamente el diseño de la foto que llevé. Reservar por la web es comodísimo.' },
    { name: 'Carla V.', text: 'La pedicura spa es un mimo total. Ya tengo turno fijo cada tres semanas.' },
  ],
  faq: [
    { q: '¿Cuánto dura el semipermanente?', a: 'Entre 2 y 3 semanas, según el crecimiento de tu uña y el cuidado en casa.' },
    { q: '¿Me retiran el material de otro lugar?', a: 'Sí. El retiro tiene un costo adicional de $ 3.000 y lo hacemos sin dañar tu uña.' },
    { q: '¿Qué pasa si llego tarde?', a: 'Tenemos 10 minutos de tolerancia. Si llegás más tarde, quizás haya que acortar el servicio o reprogramar.' },
    { q: '¿Puedo llevar una foto de referencia?', a: '¡Claro! Mandala por WhatsApp cuando confirmes el turno y te decimos si se puede hacer y el precio.' },
  ],
  booking: { cta: 'Reservar turno', noun: 'turno', closedDows: [0], hours: [10, 20], step: 30, greet: 'Coral Nail Bar' },
  info: { address: 'Calle 14 N° 4890', city: 'Berazategui', hours: ['Lunes a sábado', '10 a 20 h'], instagram: '@coral.nailbar', note: 'Nail bar · Manos y pies.' },
  tips: {
    services: 'precios y duración a la vista: la clienta llega sabiendo qué se hace y cuánto sale, sin preguntarte por mensaje.',
    booking: 'el turno te llega por WhatsApp con servicio, día y horario. Vos lo confirmás y listo, sin ida y vuelta de mensajes.',
    about: 'mostrar higiene y cuidado genera confianza: es lo primero que mira una clienta nueva.',
  },
}

export default function Unas() {
  return <BookingTemplate cfg={cfg} />
}
