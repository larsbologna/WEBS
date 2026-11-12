import { Car, HeartHandshake, Home, PiggyBank, ShieldCheck, Store } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'seguros',
  name: 'Romina Paz Seguros',
  role: 'Productora asesora de seguros · Mat. SSN 85.412',
  logo: ShieldCheck,
  theme: {
    bg: '#f4f8ff', surface: '#ffffff', ink: '#0b2545', muted: '#56688a', accent: '#1d64f2', accentInk: '#ffffff', soft: '#e0eaff', line: '#dfe7f5', dark: '#0b2545',
    fonts: 'family=Lexend:wght@500;600;700;800&family=Inter:wght@400;500;600',
    display: '"Lexend", sans-serif', body: '"Inter", sans-serif', shape: 'round', accentOnDark: '#7fb0ff',
  },
  announce: '🛡️ Cotizá tu seguro en minutos · Comparamos 8 aseguradoras',
  hero: {
    kicker: 'Seguros para vos, tu familia y tu negocio',
    title: 'Asegurá lo que *más querés*, sin letra chica.',
    text: 'Comparo las mejores aseguradoras para encontrar la cobertura justa al mejor precio. Y si tenés un siniestro, me ocupo yo del trámite.',
    image: '1511632765486-a01980e01a18', layout: 'portrait',
    stats: [{ v: '8', l: 'aseguradoras' }, { v: '+1.500', l: 'clientes' }, { v: '24 h', l: 'asistencia en siniestros' }],
  },
  trust: { title: 'Trabajo con', items: ['La Segunda', 'Sancor Seguros', 'Federación Patronal', 'Rivadavia', 'San Cristóbal'] },
  servicesKicker: 'Coberturas',
  servicesTitle: '¿Qué querés *asegurar*?',
  services: [
    { id: 'auto', name: 'Auto y moto', desc: 'Responsabilidad civil, terceros completo o todo riesgo, con grúa y asistencia en todo el país.', icon: Car, priceLabel: 'Cotización sin cargo', duration: 'Llamada de 15 min', img: '1449965408869-eaa3f722e40d' },
    { id: 'hogar', name: 'Hogar', desc: 'Incendio, robo, daños por agua y responsabilidad civil para casas y departamentos.', icon: Home, priceLabel: 'Cotización sin cargo', duration: 'Llamada de 15 min', img: '1532629345422-7515f3d16bb6' },
    { id: 'vida', name: 'Vida', desc: 'Protección económica para tu familia, con opciones de ahorro.', icon: HeartHandshake, priceLabel: 'Cotización sin cargo', duration: 'Llamada de 20 min', img: '1609220136736-443140cffec6' },
    { id: 'comercio', name: 'Comercio', desc: 'Integral de comercio, ART y responsabilidad civil para tu negocio.', icon: Store, priceLabel: 'Cotización sin cargo', duration: 'Llamada de 20 min', img: '1556742049-0cfed4f6a45d' },
    { id: 'retiro', name: 'Ahorro y retiro', desc: 'Planes para ahorrar a largo plazo y complementar tu jubilación.', icon: PiggyBank, priceLabel: 'Consultar', duration: 'Llamada de 20 min', img: '1607863680198-23d4b2565df0' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy *Romina*',
    image: '1573497161161-c3e73707e25c',
    text: ['Soy productora asesora de seguros matriculada y hace 15 años asesoro a familias y comercios de zona sur.', 'No trabajo para una aseguradora: trabajo para vos. Comparo opciones y te explico qué cubre cada póliza en palabras simples.'],
    creds: ['Productora asesora · Mat. SSN 85.412', 'Más de 1.500 pólizas vigentes', 'Atención personalizada en siniestros'],
  },
  steps: {
    title: 'Asegurarte es *simple*',
    items: [
      { t: 'Contame qué necesitás', d: 'Una llamada corta para conocer tu auto, tu casa o tu negocio.' },
      { t: 'Te mando opciones', d: 'Comparo aseguradoras y te paso 2 o 3 propuestas por WhatsApp.' },
      { t: 'Listo', d: 'Elegís, emitimos la póliza y te queda todo en el celular.' },
    ],
  },
  testimonials: [
    { name: 'Esteban M.', text: 'Choqué y Romina se ocupó de todo el trámite. En dos semanas tenía el auto arreglado.' },
    { name: 'Laura T.', text: 'Me consiguió el seguro del auto y de la casa más baratos y con mejor cobertura.' },
    { name: 'Diego, Pulso Gym', text: 'Nos asesoró con el integral de comercio y la ART. Siempre responde rápido.' },
  ],
  faq: [
    { q: '¿Cobrás por cotizar?', a: 'No, la cotización y el asesoramiento son sin cargo. Mi comisión la paga la aseguradora.' },
    { q: '¿Qué hago si tengo un siniestro?', a: 'Escribime por WhatsApp. Te digo qué hacer en el momento y me ocupo de hacer la denuncia y el seguimiento.' },
    { q: '¿Puedo cambiarme de aseguradora?', a: 'Sí, en cualquier momento. Coordinamos la nueva póliza para que no te quedes sin cobertura ni un día.' },
    { q: '¿Cómo pago la póliza?', a: 'Lo vemos por WhatsApp según la aseguradora que elijas: hay varias opciones.' },
  ],
  booking: { cta: 'Pedir cotización', noun: 'llamada', modes: ['Llamada', 'Videollamada'], closedDows: [0, 6], hours: [9, 19], step: 30, greet: 'Romina' },
  info: { address: 'Calle 16 N° 4410', city: 'Berazategui', hours: ['Lunes a viernes', '9 a 19 h'], instagram: '@rominapaz.seguros', note: 'Productora asesora de seguros.' },
  tips: {
    services: 'cada cobertura explicada en simple y con botón de cotizar: el cliente se anima a pedir presupuesto sin compromiso.',
    booking: 'el pedido de cotización te llega por WhatsApp con el tipo de seguro y el horario para llamar.',
    about: 'mostrar que trabajás para el cliente y no para una aseguradora es tu gran diferencial.',
  },
}

export default function Seguros() {
  return <BookingTemplate cfg={cfg} />
}
