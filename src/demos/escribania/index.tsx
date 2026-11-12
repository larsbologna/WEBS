import { FileCheck2, FileSignature, Home, Landmark, ScrollText, Stamp } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'escribania',
  name: 'Escribanía Ledesma',
  role: 'Esc. Martín Ledesma · Registro N° 42',
  logo: Stamp,
  theme: {
    bg: '#f6f6f2', surface: '#ffffff', ink: '#14213d', muted: '#5d6478', accent: '#1f3a68', accentInk: '#ffffff', soft: '#e2e8f3', line: '#e1e2dc', dark: '#14213d',
    fonts: 'family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:wght@400;500;600;700',
    display: '"Playfair Display", serif', body: '"Source Sans 3", sans-serif', shape: 'square', italic: true, accentOnDark: '#d9b85c',
  },
  hero: {
    kicker: 'Escribanía desde 1987',
    title: 'Seguridad jurídica para tus *decisiones importantes*.',
    text: 'Escrituras de compraventa, hipotecas, donaciones, poderes, certificaciones y actas. Te explicamos cada paso y te damos presupuesto antes de empezar.',
    image: '1450101499163-c8848c66ca85', layout: 'editorial',
    stats: [{ v: '+35 años', l: 'de trayectoria' }, { v: '+8.000', l: 'escrituras' }, { v: '48 h', l: 'para certificaciones' }],
  },
  servicesKicker: 'Servicios notariales',
  servicesTitle: 'En qué te podemos *ayudar*',
  services: [
    { id: 'compraventa', name: 'Compraventa de inmuebles', desc: 'Estudio de títulos, certificados, escritura e inscripción en el Registro de la Propiedad.', icon: Home, priceLabel: 'Presupuesto sin cargo', duration: 'Turno de 30 min' },
    { id: 'hipotecas', name: 'Hipotecas y créditos', desc: 'Escrituras de hipoteca para créditos bancarios y cancelaciones.', icon: Landmark, priceLabel: 'Presupuesto sin cargo', duration: 'Turno de 30 min' },
    { id: 'donaciones', name: 'Donaciones y herencias', desc: 'Donaciones entre familiares, tractos abreviados y asesoramiento en sucesiones.', icon: ScrollText, priceLabel: 'Consultar', duration: 'Turno de 30 min' },
    { id: 'poderes', name: 'Poderes', desc: 'Poderes generales y especiales para trámites, ventas, cobros o representación.', icon: FileSignature, priceLabel: 'Desde $ 65.000', duration: 'Turno de 20 min' },
    { id: 'certificaciones', name: 'Certificación de firmas', desc: 'Certificaciones de firmas y copias para contratos, autorizaciones de viaje y formularios.', icon: FileCheck2, priceLabel: 'Desde $ 25.000', duration: 'Turno de 15 min' },
    { id: 'actas', name: 'Actas y autorizaciones', desc: 'Actas de constatación, autorizaciones para viajar con menores y declaraciones juradas.', icon: Stamp, priceLabel: 'Consultar', duration: 'Turno de 20 min' },
  ],
  about: {
    kicker: 'La escribanía',
    title: 'Tres generaciones de *confianza*',
    image: '1560250097-0b93528c311a',
    text: ['La escribanía fue fundada en 1987 y hoy está a cargo del Esc. Martín Ledesma, titular del Registro N° 42.', 'Atendemos con turno para que no tengas que esperar, y te acompañamos en todo el proceso con un trato cercano y claro.'],
    creds: ['Escribano titular · Registro N° 42', 'Colegio de Escribanos de la Provincia de Buenos Aires', 'Firma digital y gestión online de certificados'],
  },
  steps: {
    title: 'Cómo es una *escritura*',
    items: [
      { t: 'Consulta y presupuesto', d: 'Te explicamos los pasos, los costos y la documentación que necesitás.' },
      { t: 'Estudio de títulos', d: 'Pedimos los certificados y revisamos que todo esté en orden.' },
      { t: 'Firma', d: 'Coordinamos el día de la firma con todas las partes y nos ocupamos de la inscripción.' },
    ],
  },
  gallery: { title: 'La *escribanía*', images: ['1517502884422-41eaead166d4', '1497366811353-6870744d04b2', '1497366754035-f200968a6e72', '1521737604893-d14cc237f11d'] },
  testimonials: [
    { name: 'Gabriela S.', text: 'Escrituramos nuestro primer departamento. Nos explicaron todo con mucha paciencia y sin sorpresas en los costos.' },
    { name: 'Roberto A.', text: 'Saqué turno online para una certificación y en 15 minutos estaba resuelto.' },
    { name: 'Familia Duarte', text: 'Nos asesoraron con la donación de la casa de nuestros padres. Muy profesionales.' },
  ],
  faq: [
    { q: '¿Cuánto cuesta escriturar?', a: 'Depende del valor del inmueble y del tipo de operación. Te damos un presupuesto detallado sin cargo con todos los impuestos y gastos.' },
    { q: '¿Qué documentación necesito para un poder?', a: 'Tu DNI y los datos de la persona a la que vas a dar el poder. Si es para un trámite puntual, traé la información del trámite.' },
    { q: '¿Hacen autorizaciones de viaje para menores?', a: 'Sí, con turno. Tienen que venir los padres con su DNI y la partida de nacimiento del menor.' },
    { q: '¿Atienden sin turno?', a: 'Atendemos con turno para que no esperes. Para urgencias, escribinos por WhatsApp.' },
  ],
  booking: { cta: 'Pedir turno', noun: 'turno', closedDows: [0, 6], hours: [9, 17], step: 30, greet: 'Escribanía Ledesma' },
  info: { address: 'Calle 148 N° 1320', city: 'Berazategui', hours: ['Lunes a viernes', '9 a 17 h'], instagram: '@escribania.ledesma', note: 'Escribanía. Registro N° 42.' },
  tips: {
    services: 'explicar cada trámite en simple responde las dudas que hoy te hacen por teléfono, y el cliente llega con la documentación correcta.',
    booking: 'los turnos para certificaciones y poderes se piden solos y te llegan ordenados por WhatsApp.',
    about: 'la trayectoria y el registro a tu cargo son lo que da tranquilidad para firmar algo tan importante.',
  },
}

export default function Escribania() {
  return <BookingTemplate cfg={cfg} />
}
