export type Category = 'Gastronomía' | 'Belleza y cuidado' | 'Comercios' | 'Salud'

export type DemoMeta = {
  slug: string
  num: string
  rubro: string
  name: string
  description: string
  category: Category
  image: string // id de Unsplash
  fallback: string // gradiente si no carga la imagen
  features: string[]
  /** WhatsApp del negocio para recibir pedidos (solo dígitos, ej. 5491112345678). Vacío: se elige el contacto. */
  whatsapp?: string
}

export const DEMOS: DemoMeta[] = [
  {
    slug: 'restaurante', num: '01', rubro: 'Restaurante', name: 'Casa del Sabor', category: 'Gastronomía',
    description: 'Menú digital con fotos, carrito y pedido directo por WhatsApp. Sin comisiones de apps.',
    image: '1414235077428-338989a2e8c0', fallback: 'linear-gradient(135deg,#7c2d12,#c2410c)',
    features: ['Menú por categorías', 'Carrito', 'Pedido WhatsApp', 'Promos'],
  },
  {
    slug: 'pizzeria', num: '02', rubro: 'Pizzería', name: 'Forno Napoli', category: 'Gastronomía',
    description: 'Armá tu pizza: tamaño, mitad y mitad, adicionales y combos. El pedido llega listo.',
    image: '1513104890138-7c749659a591', fallback: 'linear-gradient(135deg,#991b1b,#1c1917)',
    features: ['Mitad y mitad', 'Tamaños', 'Adicionales', 'Combos'],
  },
  {
    slug: 'cafeteria', num: '03', rubro: 'Cafetería', name: 'Moka Café', category: 'Gastronomía',
    description: 'Carta de cafés, pastelería y desayunos con pedido para llevar y retiro sin fila.',
    image: '1501339847302-ac426a4a7cbb', fallback: 'linear-gradient(135deg,#78350f,#d6b38a)',
    features: ['Carta digital', 'Combos', 'Take away', 'Destacados'],
  },
  {
    slug: 'barberia', num: '04', rubro: 'Barbería', name: 'Aurum Barber Club', category: 'Belleza y cuidado',
    description: 'Turnos online 24 hs: el cliente elige servicio, barbero, día y horario.',
    image: '1503951914875-452162b0f3f1', fallback: 'linear-gradient(135deg,#0a0a0a,#a07c2c)',
    features: ['Agenda de turnos', 'Barberos', 'Galería', 'Precios'],
  },
  {
    slug: 'peluqueria', num: '05', rubro: 'Peluquería', name: 'Studio Bella', category: 'Belleza y cuidado',
    description: 'Servicios, antes/después y reserva de turnos con el estilista preferido.',
    image: '1560066984-138dadb4c035', fallback: 'linear-gradient(135deg,#be8b8b,#f4e1dc)',
    features: ['Antes / después', 'Equipo', 'Reservas', 'Precios'],
  },
  {
    slug: 'ropa', num: '06', rubro: 'Tienda de ropa', name: 'Distrito Clothing', category: 'Comercios',
    description: 'Tienda online completa: filtros, talles, colores, favoritos y pedido por WhatsApp.',
    image: '1441986300917-64674bd600d8', fallback: 'linear-gradient(135deg,#111,#525252)',
    features: ['Catálogo', 'Talles y colores', 'Favoritos', 'Pedido WhatsApp'],
  },
  {
    slug: 'perfumeria', num: '07', rubro: 'Perfumería', name: 'Essence Store', category: 'Belleza y cuidado',
    description: 'Catálogo de fragancias por marca, familia olfativa y ocasión, con fichas detalladas.',
    image: '1541643600914-78b084683601', fallback: 'linear-gradient(135deg,#3b0a2a,#c9a96e)',
    features: ['Marcas', 'Filtros', 'Fichas', 'Carrito'],
  },
  {
    slug: 'dietetica', num: '08', rubro: 'Dietética', name: 'Natural Market', category: 'Comercios',
    description: 'Productos sueltos por peso, ofertas y pedido armado para retirar o recibir.',
    image: '1542838132-92c53300491e', fallback: 'linear-gradient(135deg,#365314,#a3b18a)',
    features: ['Venta por peso', 'Filtros', 'Ofertas', 'Pedido'],
  },
  {
    slug: 'optica', num: '09', rubro: 'Óptica', name: 'Visión Óptica', category: 'Salud',
    description: 'Catálogo de armazones y lentes de sol, servicios ópticos y turnos para control visual.',
    image: '1574258495973-f010dfbb5371', fallback: 'linear-gradient(135deg,#1e3a8a,#93c5fd)',
    features: ['Catálogo', 'Filtros por estilo', 'Servicios', 'Turnos'],
  },
  {
    slug: 'veterinaria', num: '10', rubro: 'Veterinaria', name: 'Huellitas Veterinaria', category: 'Salud',
    description: 'Servicios, profesionales, calendario de vacunas y turnos para mascotas.',
    image: '1628009368231-7bb7cfcb0def', fallback: 'linear-gradient(135deg,#0f766e,#fb923c)',
    features: ['Turnos', 'Vacunación', 'Equipo', 'Consejos'],
  },
  {
    slug: 'tecnologia', num: '11', rubro: 'Tecnología', name: 'Conecta Tech', category: 'Comercios',
    description: 'Celulares, cables HDMI, cargadores y accesorios con fotos, buscador, guía "¿qué cable necesito?" y pedido por WhatsApp.',
    image: '1550009158-9ebf69173e03', fallback: 'linear-gradient(135deg,#1d4ed8,#0f172a)',
    features: ['Celulares', 'Buscador', 'Guía de cables', 'Pedido WhatsApp'],
  },
  {
    slug: 'iphones', num: '12', rubro: 'Tienda de iPhones', name: 'Órbita Mobile', category: 'Comercios',
    description: 'iPhones nuevos y seleccionados con capacidad, color, batería, plan canje y precio en dólares o pesos.',
    image: '1592750475338-74b7b21085ab', fallback: 'linear-gradient(135deg,#4338ca,#111827)',
    features: ['Plan canje', 'USD / ARS', 'Batería', 'Pedido WhatsApp'],
  },
  {
    slug: 'petshop', num: '13', rubro: 'Petshop', name: 'Colita Feliz', category: 'Comercios',
    description: 'Alimento por tamaño de bolsa, juguetes y accesorios, calculadora de ración y compra recurrente.',
    image: '1450778869180-41d0601e046e', fallback: 'linear-gradient(135deg,#f59e0b,#2b1747)',
    features: ['Por especie', 'Calculadora', 'Suscripción', 'Carrito'],
  },
]

export const CATEGORIES: Category[] = ['Gastronomía', 'Belleza y cuidado', 'Comercios', 'Salud']
export const BRAND = { name: 'Iván', tagline: 'Gestor de Presencia Online', whatsapp: '+54 9 11 0000-0000' }
