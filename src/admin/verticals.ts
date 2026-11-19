/**
 * Vocabulario y datos propios de cada rubro para el panel de administración.
 * Una barbería tiene "turnos" y "clientes"; una veterinaria, "pacientes" con mascota;
 * una inmobiliaria, "visitas" a propiedades; un gimnasio, "reservas" de clases.
 */
export type Vertical = {
  /** pestaña y título de la agenda */
  tab: string
  agendaTitle: string
  /** unidad: singular y plural ("turno", "turnos") */
  unit: [string, string]
  /** cómo se llama quien reserva */
  client: string
  /** cómo se llama quien atiende */
  staffLabel: string
  /** estados al terminar */
  done: string
  absent: string
  /** duración típica en minutos */
  duration: number
  /** datos propios del rubro que se muestran en cada turno */
  extras?: { label: string; values: string[] }[]
  /** tiendas: flujo de pedidos y nombre del stock */
  flow?: string[]
  ordersTitle?: string
  stockTitle?: string
  /** frase de la cabecera de la agenda */
  pitch: string
}

const OBRAS = ['OSDE', 'Swiss Medical', 'Galeno', 'Medifé', 'IOMA', 'Particular']
const MODO = ['Presencial', 'Online']

const base: Vertical = {
  tab: 'Agenda', agendaTitle: 'Agenda', unit: ['turno', 'turnos'], client: 'Cliente', staffLabel: 'Profesional',
  done: 'Atendido', absent: 'Ausente', duration: 30, pitch: 'Tus turnos del día, ordenados y sin papel.',
}

const PROFILES: Record<string, Partial<Vertical>> = {
  barberia: { staffLabel: 'Barbero', duration: 30, pitch: 'Cada silla, cada turno, a la vista.' },
  peluqueria: { client: 'Clienta', staffLabel: 'Estilista', duration: 60, pitch: 'La agenda del salón, estilista por estilista.' },
  unas: { client: 'Clienta', staffLabel: 'Manicura', duration: 60, extras: [{ label: 'Diseño', values: ['Liso', 'Francesita', 'Nail art', 'Glitter', 'Baby boomer'] }], pitch: 'Tus turnos de hoy, mesa por mesa.' },
  veterinaria: {
    agendaTitle: 'Agenda veterinaria', client: 'Tutor', staffLabel: 'Veterinario/a', duration: 30,
    extras: [{ label: 'Paciente', values: ['Toby · perro', 'Mora · gata', 'Simón · perro', 'Luna · gata', 'Rocco · perro', 'Nala · perra', 'Coco · conejo', 'Milo · gato', 'Firulais · perro', 'Kiara · gata'] }],
    pitch: 'Consultas, vacunas y controles de cada paciente.',
  },
  optica: { client: 'Paciente', staffLabel: 'Óptico/a', duration: 30, extras: [{ label: 'Obra social', values: OBRAS }], pitch: 'Controles visuales y entregas del día.' },
  gimnasio: {
    tab: 'Clases', agendaTitle: 'Clases y reservas', unit: ['reserva', 'reservas'], client: 'Socio', staffLabel: 'Profe',
    done: 'Asistió', absent: 'No vino', duration: 60, extras: [{ label: 'Plan', values: ['Libre', '2 veces', 'Anual', 'Pase diario'] }],
    pitch: 'Quién viene a cada clase y quién faltó.',
  },
  odontologia: { client: 'Paciente', staffLabel: 'Odontólogo/a', duration: 45, extras: [{ label: 'Obra social', values: OBRAS }], pitch: 'Tu consultorio, turno por turno.' },
  nutricion: { tab: 'Consultas', agendaTitle: 'Consultas', unit: ['consulta', 'consultas'], client: 'Paciente', staffLabel: 'Nutricionista', done: 'Realizada', duration: 45, extras: [{ label: 'Modalidad', values: MODO }], pitch: 'Consultas presenciales y online en un solo lugar.' },
  psicologia: { tab: 'Sesiones', agendaTitle: 'Sesiones', unit: ['sesión', 'sesiones'], client: 'Paciente', staffLabel: 'Psicóloga', done: 'Realizada', absent: 'Canceló', duration: 60, extras: [{ label: 'Modalidad', values: MODO }], pitch: 'Tus sesiones de la semana, con quién y cómo.' },
  kinesiologia: { tab: 'Sesiones', agendaTitle: 'Sesiones', unit: ['sesión', 'sesiones'], client: 'Paciente', staffLabel: 'Kinesiólogo/a', done: 'Realizada', duration: 45, extras: [{ label: 'Tratamiento', values: ['Sesión 1 de 10', 'Sesión 3 de 10', 'Sesión 5 de 10', 'Sesión 8 de 10', 'Sesión 10 de 10'] }, { label: 'Obra social', values: OBRAS }], pitch: 'Cada paciente y en qué sesión de su tratamiento está.' },
  pediatra: { client: 'Paciente', staffLabel: 'Pediatra', duration: 20, extras: [{ label: 'Edad', values: ['15 días', '3 meses', '9 meses', '1 año', '2 años', '4 años', '7 años', '11 años'] }, { label: 'Obra social', values: OBRAS }], pitch: 'Controles y consultas del día, con la edad de cada paciente.' },
  abogado: { tab: 'Consultas', agendaTitle: 'Consultas', unit: ['consulta', 'consultas'], staffLabel: 'Abogado/a', done: 'Realizada', duration: 30, extras: [{ label: 'Tema', values: ['Despido', 'Accidente de tránsito', 'Divorcio', 'Sucesión', 'Alquiler', 'Reclamo a empresa'] }, { label: 'Modalidad', values: ['En el estudio', 'Videollamada'] }], pitch: 'Consultas del estudio, con el tema de cada una.' },
  contador: { tab: 'Reuniones', agendaTitle: 'Reuniones', unit: ['reunión', 'reuniones'], staffLabel: 'Contador/a', done: 'Realizada', duration: 30, extras: [{ label: 'Tema', values: ['Monotributo', 'Sueldos', 'Ganancias', 'Alta de SAS', 'Plan de pagos ARCA', 'IVA'] }], pitch: 'Reuniones con clientes y el tema de cada una.' },
  escribania: { client: 'Cliente', staffLabel: 'Escribano/a', duration: 30, extras: [{ label: 'Trámite', values: ['Compraventa', 'Poder general', 'Certificación', 'Autorización de viaje', 'Donación'] }], pitch: 'Firmas, certificaciones y escrituras del día.' },
  arquitecta: { tab: 'Reuniones', agendaTitle: 'Reuniones y visitas de obra', unit: ['reunión', 'reuniones'], staffLabel: 'Responsable', done: 'Realizada', duration: 60, extras: [{ label: 'Obra', values: ['Casa Rossi · Hudson', 'Reforma cocina · Quilmes', 'Local · Berazategui centro', 'Ampliación · Ranelagh', 'Dúplex · Plátanos'] }], pitch: 'Reuniones con clientes y visitas a cada obra.' },
  inmobiliaria: { tab: 'Visitas', agendaTitle: 'Visitas', unit: ['visita', 'visitas'], client: 'Interesado', staffLabel: 'Asesor', done: 'Visitada', absent: 'No vino', duration: 60, extras: [{ label: 'Propiedad', values: ['Casa 4 amb · Hudson', 'Depto 3 amb · Centro', 'Chalet · Ranelagh', 'Depto 2 amb · Quilmes', 'Casa · Plátanos', 'Casa 3 amb · Bera oeste'] }], pitch: 'Qué propiedad se muestra, a quién y con qué asesor.' },
  seguros: { tab: 'Llamadas', agendaTitle: 'Llamadas y reuniones', unit: ['llamada', 'llamadas'], staffLabel: 'Asesora', done: 'Realizada', absent: 'No atendió', duration: 30, extras: [{ label: 'Seguro', values: ['Auto', 'Hogar', 'Comercio', 'Vida', 'Moto'] }], pitch: 'Cotizaciones y renovaciones para llamar hoy.' },
  fotografo: { tab: 'Sesiones', agendaTitle: 'Sesiones y eventos', unit: ['sesión', 'sesiones'], staffLabel: 'Fotógrafo', done: 'Realizada', duration: 90, extras: [{ label: 'Lugar', values: ['Estudio', 'Parque Pereyra', 'Salón Las Lomas', 'Costanera de Quilmes', 'Domicilio'] }], pitch: 'Sesiones, eventos y dónde es cada uno.' },
  ingles: { tab: 'Clases', agendaTitle: 'Clases', unit: ['clase', 'clases'], client: 'Alumno', staffLabel: 'Profe', done: 'Asistió', absent: 'Faltó', duration: 60, extras: [{ label: 'Nivel', values: ['Kids', 'Teens B1', 'Adultos A2', 'First', 'Conversación'] }, { label: 'Modalidad', values: MODO }], pitch: 'Clases del día, alumno por alumno.' },
  marketing: { tab: 'Reuniones', agendaTitle: 'Reuniones', unit: ['reunión', 'reuniones'], staffLabel: 'Responsable', done: 'Realizada', duration: 30, extras: [{ label: 'Marca', values: ['Moka Café', 'El Tornillo', 'Coral Nail Bar', 'Pulso Gym', 'Lirio Florería'] }], pitch: 'Reuniones con clientes y la marca de cada uno.' },
  // tiendas y gastronomía
  restaurante: { flow: ['Nuevo', 'En cocina', 'Listo', 'Entregado'], ordersTitle: 'Pedidos', stockTitle: 'Mercadería' },
  pizzeria: { flow: ['Nuevo', 'En el horno', 'Listo', 'Entregado'], ordersTitle: 'Pedidos', stockTitle: 'Mercadería' },
  cafeteria: { flow: ['Nuevo', 'Preparando', 'Listo', 'Retirado'], ordersTitle: 'Pedidos', stockTitle: 'Mercadería' },
  floreria: { flow: ['Nuevo', 'Armando', 'Listo', 'Entregado'] },
}

export function verticalOf(slug: string): Vertical {
  return { flow: ['Nuevo', 'Preparando', 'Listo', 'Entregado'], ordersTitle: 'Pedidos', stockTitle: 'Stock', ...base, ...PROFILES[slug] }
}

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
