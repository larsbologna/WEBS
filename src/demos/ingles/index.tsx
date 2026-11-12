import { Award, Briefcase, GraduationCap, Languages, MessagesSquare, Smile } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'ingles',
  name: 'Miss Lucía Ortiz',
  role: 'Profesora de inglés · Traductora pública',
  logo: Languages,
  theme: {
    bg: '#fffbf2', surface: '#ffffff', ink: '#1d2a5b', muted: '#5f6789', accent: '#2f5bea', accentInk: '#ffffff', soft: '#e3eaff', line: '#ece7da', dark: '#1d2a5b',
    fonts: 'family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800',
    display: '"Fredoka", sans-serif', body: '"Nunito", sans-serif', shape: 'round', accentOnDark: '#ffd166',
  },
  announce: '📚 Inscripciones abiertas · Primera clase de nivelación sin cargo',
  hero: {
    kicker: 'Clases particulares y grupales',
    title: 'Hablá inglés con *confianza*.',
    text: 'Clases para chicos, adolescentes y adultos, presenciales u online. Preparación de exámenes internacionales e inglés para el trabajo.',
    image: '1544717305-2782549b5136', layout: 'portrait',
    stats: [{ v: '+400', l: 'alumnos' }, { v: '98%', l: 'aprueban sus exámenes' }, { v: 'Online', l: 'o presencial' }],
  },
  servicesNav: 'Cursos',
  servicesKicker: 'Clases',
  servicesTitle: 'Un curso para *cada etapa*',
  services: [
    { id: 'kids', name: 'Kids (6 a 11 años)', desc: 'Juegos, canciones y cuentos para que aprendan inglés divirtiéndose.', icon: Smile, priceLabel: '$ 48.000 / mes', duration: '2 clases por semana', img: '1588072432904-843af37f03ed' },
    { id: 'teens', name: 'Teens (12 a 17 años)', desc: 'Apoyo escolar, conversación y preparación para exámenes.', icon: GraduationCap, priceLabel: '$ 52.000 / mes', duration: '2 clases por semana', img: '1571260899304-425eee4c7efc' },
    { id: 'adultos', name: 'Adultos', desc: 'Desde cero o para retomar, con foco en hablar desde la primera clase.', icon: MessagesSquare, priceLabel: '$ 56.000 / mes', duration: '2 clases por semana', img: '1543269865-cbf427effbad' },
    { id: 'examenes', name: 'Exámenes internacionales', desc: 'Preparación para First, Advanced, IELTS y TOEFL con simulacros.', icon: Award, priceLabel: '$ 64.000 / mes', duration: '2 clases por semana', img: '1434030216411-0b793f4b4173' },
    { id: 'business', name: 'Inglés para el trabajo', desc: 'Reuniones, mails, entrevistas y presentaciones en inglés. También para empresas.', icon: Briefcase, priceLabel: 'Consultar', duration: 'Horario a convenir', img: '1524178232363-1fb2b075b655' },
    { id: 'conversacion', name: 'Conversación', desc: 'Clases para ganar fluidez hablando de temas de actualidad.', icon: Languages, price: 18000, duration: 'Clase de 60 min', img: '1546410531-bb4caa6b424d' },
  ],
  about: {
    kicker: 'Sobre mí',
    title: 'Hi, I\'m *Lucía*!',
    image: '1488190211105-8b0e65b80b4e',
    text: ['Soy profesora de inglés y traductora pública (UBA). Viví dos años en Londres y hace 12 años doy clases.', 'Mis clases son dinámicas y prácticas: menos memorizar y más usar el idioma desde el primer día.'],
    creds: ['Profesora y traductora pública UBA', 'Certificación CELTA (Cambridge)', 'Centro preparador de exámenes Cambridge'],
  },
  steps: {
    title: '¿Cómo *empezás*?',
    items: [
      { t: 'Clase de nivelación', d: 'Sin cargo: charlamos en inglés para conocer tu nivel y tus objetivos.' },
      { t: 'Elegís el curso', d: 'Grupal o individual, presencial u online, en el horario que te quede cómodo.' },
      { t: 'A practicar', d: 'Material incluido y seguimiento de tu progreso cada mes.' },
    ],
  },
  testimonials: [
    { name: 'Mamá de Benja, 8 años', text: 'Benja ama ir a inglés. En un año aprendió un montón y sin presiones.' },
    { name: 'Federico L.', text: 'Me preparé para una entrevista en una empresa internacional y quedé. Clases súper prácticas.' },
    { name: 'Julieta M.', text: 'Aprobé el First con muy buena nota gracias a los simulacros de Lucía.' },
  ],
  faq: [
    { q: '¿La clase de nivelación tiene costo?', a: 'No, es sin cargo y dura unos 30 minutos.' },
    { q: '¿Las clases online son en vivo?', a: 'Sí, son por videollamada en vivo, con el mismo material que las presenciales.' },
    { q: '¿Cuántos alumnos hay por grupo?', a: 'Máximo 6 alumnos por grupo, para que todos puedan hablar en cada clase.' },
    { q: '¿Se puede empezar en cualquier momento del año?', a: 'Sí, después de la nivelación te sumás al grupo de tu nivel.' },
  ],
  booking: { cta: 'Clase de nivelación', noun: 'clase de nivelación', modes: ['Presencial', 'Online'], closedDows: [0], hours: [9, 21], step: 60, greet: 'Lucía' },
  info: { address: 'Calle 21 N° 4220', city: 'Berazategui · y online', hours: ['Lunes a viernes 9 a 21 h', 'Sábados 9 a 13 h'], instagram: '@missluciaortiz', note: 'Clases de inglés para chicos, adolescentes y adultos.' },
  tips: {
    services: 'cursos con precio y frecuencia claros: los papás y alumnos llegan sabiendo qué buscan.',
    booking: 'la clase de nivelación es tu mejor puerta de entrada: te llega por WhatsApp con el curso y el horario elegidos.',
    about: 'tu formación y tus certificaciones son lo que diferencia tus clases de cualquier aviso.',
  },
}

export default function Ingles() {
  return <BookingTemplate cfg={cfg} />
}
