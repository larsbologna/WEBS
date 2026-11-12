import { Building, Home, KeyRound, Trees } from 'lucide-react'
import { BookingTemplate, type BookingConfig } from '../../shared/templates/BookingTemplate'

const cfg: BookingConfig = {
  slug: 'inmobiliaria',
  name: 'Bianchi Propiedades',
  role: 'Martillero Diego Bianchi · Col. 5821',
  logo: KeyRound,
  theme: {
    bg: '#f7f8fa', surface: '#ffffff', ink: '#10213a', muted: '#5a6678', accent: '#e4572e', accentInk: '#ffffff', soft: '#fde5dc', line: '#e2e6ec', dark: '#10213a',
    fonts: 'family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600',
    display: '"Poppins", sans-serif', body: '"Inter", sans-serif', shape: 'soft',
  },
  announce: '🏡 Tasamos tu propiedad sin cargo en 48 h',
  hero: {
    kicker: 'Venta · Alquiler · Tasaciones',
    title: 'Encontrá tu *lugar* en zona sur.',
    text: 'Casas, departamentos y lotes en Berazategui, Quilmes y alrededores. Elegí la propiedad que te interesa y coordiná la visita en el horario que te quede cómodo.',
    image: '1583608205776-bfd35f0d9f83', layout: 'full',
    stats: [{ v: '+120', l: 'propiedades' }, { v: '25 años', l: 'en la zona' }, { v: '48 h', l: 'para tasar' }],
  },
  servicesNav: 'Propiedades',
  servicesKicker: 'Propiedades destacadas',
  servicesTitle: 'Elegí y *coordiná tu visita*',
  services: [
    { id: 'casa-hudson', name: 'Casa 4 ambientes con jardín', desc: 'Hudson · 180 m² cubiertos, 3 dormitorios, 2 baños, quincho y pileta. Lote de 600 m².', icon: Home, priceLabel: 'USD 185.000', duration: 'Venta', img: '1576941089067-2de3c901e126' },
    { id: 'depto-centro', name: 'Departamento 3 ambientes', desc: 'Berazategui centro · 75 m², balcón al frente, cochera y amenities. A estrenar.', icon: Building, priceLabel: 'USD 98.000', duration: 'Venta', img: '1545324418-cc1a3fa10c00' },
    { id: 'casa-ranelagh', name: 'Chalet en Ranelagh', desc: 'Ranelagh · 220 m², 4 dormitorios, galería, parque arbolado y garage doble.', icon: Home, priceLabel: 'USD 245.000', duration: 'Venta', img: '1605276374104-dee2a0ed3cd6' },
    { id: 'depto-alquiler', name: 'Departamento 2 ambientes', desc: 'Quilmes · 48 m², luminoso, cocina integrada. Apto profesional.', icon: Building, priceLabel: '$ 520.000 / mes', duration: 'Alquiler', img: '1522708323590-d24dbb6b0267' },
    { id: 'casa-pileta', name: 'Casa en barrio cerrado', desc: 'Plátanos · 160 m², 3 dormitorios en suite, pileta y seguridad 24 h.', icon: Trees, priceLabel: 'USD 210.000', duration: 'Venta', img: '1572120360610-d971b9d7767c' },
    { id: 'casa-alquiler', name: 'Casa 3 ambientes', desc: 'Berazategui oeste · 90 m², patio y cochera. Ideal familia.', icon: Home, priceLabel: '$ 780.000 / mes', duration: 'Alquiler', img: '1592595896551-12b371d546d5' },
  ],
  about: {
    kicker: 'Quiénes somos',
    title: 'Una inmobiliaria *de la zona*',
    image: '1556157382-97eda2d62296',
    text: ['Bianchi Propiedades nació en 1999. Conocemos cada barrio de zona sur y acompañamos a cada cliente hasta la escritura o la firma del contrato.', 'Si querés vender o alquilar, tasamos tu propiedad sin cargo y la publicamos con fotos profesionales.'],
    creds: ['Martillero y corredor público · Col. 5821', 'Tasaciones sin cargo en 48 h', 'Fotos profesionales y recorridos virtuales'],
  },
  steps: {
    title: '¿Querés *vender o alquilar*?',
    items: [
      { t: 'Tasación sin cargo', d: 'Visitamos tu propiedad y te damos un valor real de mercado.' },
      { t: 'Publicación', d: 'Fotos profesionales y publicación en portales y redes.' },
      { t: 'Cierre', d: 'Mostramos, negociamos y te acompañamos hasta la firma.' },
    ],
  },
  gallery: { title: 'Interiores', images: ['1502672260266-1c1ef2d93688', '1484154218962-a197022b5858', '1512918728675-ed5a9ecdebfd', '1554995207-c18c203602cb', '1560184897-ae75f418493e', '1460317442991-0ec209397118'] },
  testimonials: [
    { name: 'Vanesa y Leo', text: 'Encontramos nuestra casa en dos semanas. Diego nos acompañó en todo hasta la escritura.' },
    { name: 'Héctor P.', text: 'Tasaron mi departamento y lo vendieron en un mes al precio que esperaba.' },
    { name: 'Camila R.', text: 'Coordiné la visita desde la web un domingo y el lunes ya estaba recorriendo el depto.' },
  ],
  faq: [
    { q: '¿La tasación tiene costo?', a: 'No, tasamos tu propiedad sin cargo y sin compromiso.' },
    { q: '¿Qué necesito para alquilar?', a: 'Recibos de sueldo o ingresos demostrables y una garantía (propietaria o seguro de caución). Te asesoramos en cada caso.' },
    { q: '¿Cuál es la comisión?', a: 'En ventas, el 3% más IVA para cada parte. En alquileres, lo que establece la normativa vigente.' },
    { q: '¿Puedo ver la propiedad el fin de semana?', a: 'Sí, coordinamos visitas también los sábados por la mañana.' },
  ],
  booking: { cta: 'Coordinar visita', noun: 'visita', closedDows: [0], hours: [9, 18], step: 60, greet: 'Bianchi Propiedades' },
  info: { address: 'Av. Mitre 2180', city: 'Berazategui', hours: ['Lunes a viernes 9 a 18 h', 'Sábados 9 a 13 h'], instagram: '@bianchi.propiedades', note: 'Venta, alquiler y tasaciones en zona sur.' },
  tips: {
    services: 'cada propiedad con foto, precio y botón de visita: el interesado elige el horario y a vos te llega listo por WhatsApp.',
    booking: 'las visitas se coordinan solas y llegan con la propiedad, el día y el horario elegidos.',
    about: 'mostrar que conocés la zona y tasás sin cargo atrae a los propietarios que quieren vender.',
  },
}

export default function Inmobiliaria() {
  return <BookingTemplate cfg={cfg} />
}
