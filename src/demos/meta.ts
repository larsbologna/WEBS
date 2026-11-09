export type Group = 'negocio' | 'profesional'
export type Category = 'Gastronomía' | 'Belleza y cuidado' | 'Comercios' | 'Salud y bienestar' | 'Salud' | 'Legal y finanzas'

export type DemoMeta = {
  slug: string
  num: string
  rubro: string
  name: string
  description: string
  category: Category
  /** negocio con local (tienda, gastronomía, belleza…) o profesional independiente */
  group: Group
  image: string // id de Unsplash
  fallback: string // gradiente si no carga la imagen
  features: string[]
  /** WhatsApp del negocio para recibir pedidos (solo dígitos, ej. 5491112345678). Vacío: se elige el contacto. */
  whatsapp?: string
}

export const DEMOS: DemoMeta[] = [
  {
    slug: 'restaurante', num: '01', rubro: 'Restaurante', name: 'Casa del Sabor', category: 'Gastronomía', group: 'negocio',
    description: 'Menú digital con fotos, carrito y pedido directo por WhatsApp. Sin comisiones de apps.',
    image: '1414235077428-338989a2e8c0', fallback: 'linear-gradient(135deg,#7c2d12,#c2410c)',
    features: ['Menú por categorías', 'Carrito', 'Pedido WhatsApp', 'Promos'],
  },
  {
    slug: 'pizzeria', num: '02', rubro: 'Pizzería', name: 'Forno Napoli', category: 'Gastronomía', group: 'negocio',
    description: 'Armá tu pizza: tamaño, mitad y mitad, adicionales y combos. El pedido llega listo.',
    image: '1513104890138-7c749659a591', fallback: 'linear-gradient(135deg,#991b1b,#1c1917)',
    features: ['Mitad y mitad', 'Tamaños', 'Adicionales', 'Combos'],
  },
  {
    slug: 'cafeteria', num: '03', rubro: 'Cafetería', name: 'Moka Café', category: 'Gastronomía', group: 'negocio',
    description: 'Carta de cafés, pastelería y desayunos con pedido para llevar y retiro sin fila.',
    image: '1501339847302-ac426a4a7cbb', fallback: 'linear-gradient(135deg,#78350f,#d6b38a)',
    features: ['Carta digital', 'Combos', 'Take away', 'Destacados'],
  },
  {
    slug: 'barberia', num: '04', rubro: 'Barbería', name: 'Aurum Barber Club', category: 'Belleza y cuidado', group: 'negocio',
    description: 'Turnos online 24 hs: el cliente elige servicio, barbero, día y horario.',
    image: '1503951914875-452162b0f3f1', fallback: 'linear-gradient(135deg,#0a0a0a,#a07c2c)',
    features: ['Agenda de turnos', 'Barberos', 'Galería', 'Precios'],
  },
  {
    slug: 'peluqueria', num: '05', rubro: 'Peluquería', name: 'Studio Bella', category: 'Belleza y cuidado', group: 'negocio',
    description: 'Servicios, antes/después y reserva de turnos con el estilista preferido.',
    image: '1560066984-138dadb4c035', fallback: 'linear-gradient(135deg,#be8b8b,#f4e1dc)',
    features: ['Antes / después', 'Equipo', 'Reservas', 'Precios'],
  },
  {
    slug: 'ropa', num: '06', rubro: 'Tienda de ropa', name: 'Distrito Clothing', category: 'Comercios', group: 'negocio',
    description: 'Tienda online completa: filtros, talles, colores, favoritos y pedido por WhatsApp.',
    image: '1441986300917-64674bd600d8', fallback: 'linear-gradient(135deg,#111,#525252)',
    features: ['Catálogo', 'Talles y colores', 'Favoritos', 'Pedido WhatsApp'],
  },
  {
    slug: 'perfumeria', num: '07', rubro: 'Perfumería', name: 'Essence Store', category: 'Belleza y cuidado', group: 'negocio',
    description: 'Catálogo de fragancias por marca, familia olfativa y ocasión, con fichas detalladas.',
    image: '1541643600914-78b084683601', fallback: 'linear-gradient(135deg,#3b0a2a,#c9a96e)',
    features: ['Marcas', 'Filtros', 'Fichas', 'Carrito'],
  },
  {
    slug: 'dietetica', num: '08', rubro: 'Dietética', name: 'Natural Market', category: 'Comercios', group: 'negocio',
    description: 'Productos sueltos por peso, ofertas y pedido armado para retirar o recibir.',
    image: '1542838132-92c53300491e', fallback: 'linear-gradient(135deg,#365314,#a3b18a)',
    features: ['Venta por peso', 'Filtros', 'Ofertas', 'Pedido'],
  },
  {
    slug: 'optica', num: '09', rubro: 'Óptica', name: 'Visión Óptica', category: 'Salud y bienestar', group: 'negocio',
    description: 'Catálogo de armazones y lentes de sol, servicios ópticos y turnos para control visual.',
    image: '1574258495973-f010dfbb5371', fallback: 'linear-gradient(135deg,#1e3a8a,#93c5fd)',
    features: ['Catálogo', 'Filtros por estilo', 'Servicios', 'Turnos'],
  },
  {
    slug: 'veterinaria', num: '10', rubro: 'Veterinaria', name: 'Huellitas Veterinaria', category: 'Salud y bienestar', group: 'negocio',
    description: 'Servicios, profesionales, calendario de vacunas y turnos para mascotas.',
    image: '1628009368231-7bb7cfcb0def', fallback: 'linear-gradient(135deg,#0f766e,#fb923c)',
    features: ['Turnos', 'Vacunación', 'Equipo', 'Consejos'],
  },
  {
    slug: 'tecnologia', num: '11', rubro: 'Tecnología', name: 'Conecta Tech', category: 'Comercios', group: 'negocio',
    description: 'Celulares, cables HDMI, cargadores y accesorios con fotos, buscador, guía "¿qué cable necesito?" y pedido por WhatsApp.',
    image: '1550009158-9ebf69173e03', fallback: 'linear-gradient(135deg,#1d4ed8,#0f172a)',
    features: ['Celulares', 'Buscador', 'Guía de cables', 'Pedido WhatsApp'],
  },
  {
    slug: 'iphones', num: '12', rubro: 'Tienda de iPhones', name: 'Órbita Mobile', category: 'Comercios', group: 'negocio',
    description: 'iPhones nuevos y seleccionados con capacidad, color, batería, plan canje y precio en dólares o pesos.',
    image: '1592750475338-74b7b21085ab', fallback: 'linear-gradient(135deg,#4338ca,#111827)',
    features: ['Plan canje', 'USD / ARS', 'Batería', 'Pedido WhatsApp'],
  },
  {
    slug: 'petshop', num: '13', rubro: 'Petshop', name: 'Colita Feliz', category: 'Comercios', group: 'negocio',
    description: 'Alimento por tamaño de bolsa, juguetes y accesorios, calculadora de ración y compra recurrente.',
    image: '1450778869180-41d0601e046e', fallback: 'linear-gradient(135deg,#f59e0b,#2b1747)',
    features: ['Por especie', 'Calculadora', 'Suscripción', 'Carrito'],
  },
  {
    slug: 'libreria', num: '14', rubro: 'Librería', name: 'Punto y Coma', category: 'Comercios', group: 'negocio',
    description: 'Libros, útiles escolares y papelería con catálogo, lista escolar por WhatsApp y pedido armado.',
    image: '1529473814998-077b4fec6770', fallback: 'linear-gradient(135deg,#d9542b,#2b2118)',
    features: ['Catálogo', 'Lista escolar', 'Para regalo', 'Pedido WhatsApp'],
  },
  {
    slug: 'unas', num: '15', rubro: 'Uñas', name: 'Coral Nail Bar', category: 'Belleza y cuidado', group: 'negocio',
    description: 'Semipermanente, kapping, esculpidas y nail art con precios, galería y turnos online.',
    image: '1607779097040-26e80aa78e66', fallback: 'linear-gradient(135deg,#e8735a,#3d2a2a)',
    features: ['Servicios y precios', 'Turnos online', 'Galería', 'WhatsApp'],
  },
  {
    slug: 'ferreteria', num: '16', rubro: 'Ferretería', name: 'El Tornillo', category: 'Comercios', group: 'negocio',
    description: 'Herramientas, pintura, electricidad y tornillería con buscador, presupuesto por WhatsApp y carrito.',
    image: '1426927308491-6380b6a9936f', fallback: 'linear-gradient(135deg,#ffb703,#111111)',
    features: ['Buscador', 'Presupuestos', 'Carrito', 'Pedido WhatsApp'],
  },
  {
    slug: 'floreria', num: '17', rubro: 'Florería', name: 'Lirio', category: 'Comercios', group: 'negocio',
    description: 'Ramos, rosas, plantas y arreglos con dedicatoria, ramos a medida y pedido por WhatsApp.',
    image: '1487070183336-b863922373d4', fallback: 'linear-gradient(135deg,#c2416b,#3b1f2b)',
    features: ['Ramos', 'Dedicatoria', 'A medida', 'Pedido WhatsApp'],
  },
  {
    slug: 'gimnasio', num: '18', rubro: 'Gimnasio', name: 'Pulso', category: 'Salud y bienestar', group: 'negocio',
    description: 'Planes, grilla de clases, equipo y clase de prueba gratis reservada online.',
    image: '1540497077202-7c8a3999166f', fallback: 'linear-gradient(135deg,#d4ff3a,#0e0e10)',
    features: ['Planes', 'Grilla de clases', 'Clase de prueba', 'WhatsApp'],
  },
  {
    slug: 'odontologia', num: '19', rubro: 'Odontología', name: 'Dra. Sofía Méndez', category: 'Salud', group: 'profesional',
    description: 'Consultorio odontológico con tratamientos, obras sociales, consultorio en fotos y turnos online.',
    image: '1606265752439-1f18756aa5fc', fallback: 'linear-gradient(135deg,#0e8fa8,#0f2b3a)',
    features: ['Tratamientos', 'Obras sociales', 'Turnos online', 'Preguntas'],
  },
  {
    slug: 'nutricion', num: '20', rubro: 'Nutricionista', name: 'Lic. Camila Ruiz', category: 'Salud', group: 'profesional',
    description: 'Planes de alimentación, consultas presenciales y online, packs y turnos por WhatsApp.',
    image: '1573497019236-17f8177b81e8', fallback: 'linear-gradient(135deg,#5b8c3a,#22301f)',
    features: ['Presencial u online', 'Packs', 'Turnos', 'Preguntas'],
  },
  {
    slug: 'psicologia', num: '21', rubro: 'Psicóloga', name: 'Lic. Valeria Sosa', category: 'Salud', group: 'profesional',
    description: 'Terapia para adultos, adolescentes y parejas, presencial u online, con primera entrevista online.',
    image: '1586023492125-27b2c045efd7', fallback: 'linear-gradient(135deg,#7a6aa8,#2e2a35)',
    features: ['Presencial u online', 'Primera entrevista', 'Enfoques', 'Preguntas'],
  },
  {
    slug: 'kinesiologia', num: '22', rubro: 'Kinesiólogo', name: 'Kinesio Movimiento', category: 'Salud', group: 'profesional',
    description: 'Rehabilitación, deportología y masoterapia con obras sociales, pasos del tratamiento y turnos.',
    image: '1571019614242-c5c5dee9f50b', fallback: 'linear-gradient(135deg,#ff6a3d,#0b1f33)',
    features: ['Tratamientos', 'Obras sociales', 'Turnos online', 'Preguntas'],
  },
  {
    slug: 'abogado', num: '23', rubro: 'Estudio jurídico', name: 'Ferrari & Asociados', category: 'Legal y finanzas', group: 'profesional',
    description: 'Áreas de práctica, trayectoria, consultas presenciales o por videollamada y agenda online.',
    image: '1589829545856-d10d557cf95f', fallback: 'linear-gradient(135deg,#8a6d3b,#1c1a17)',
    features: ['Áreas de práctica', 'Videollamada', 'Agenda online', 'Preguntas'],
  },
  {
    slug: 'contador', num: '24', rubro: 'Estudio contable', name: 'Estudio Gómez', category: 'Legal y finanzas', group: 'profesional',
    description: 'Monotributo, sueldos, sociedades e impuestos con abonos mensuales y reuniones agendadas online.',
    image: '1554224154-26032ffc0d07', fallback: 'linear-gradient(135deg,#12795f,#10241f)',
    features: ['Servicios', 'Abonos', 'Reuniones online', 'Preguntas'],
  },
]

export const GROUPS: { id: Group; label: string; short: string; categories: Category[] }[] = [
  { id: 'negocio', label: 'Negocios con local', short: 'Negocios', categories: ['Gastronomía', 'Belleza y cuidado', 'Comercios', 'Salud y bienestar'] },
  { id: 'profesional', label: 'Profesionales', short: 'Profesionales', categories: ['Salud', 'Legal y finanzas'] },
]
export const CATEGORIES: Category[] = GROUPS.flatMap((g) => g.categories)
export const BRAND = { name: 'Iván', tagline: 'Gestor de Presencia Online', whatsapp: '+54 9 11 0000-0000' }
