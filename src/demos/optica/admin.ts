import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Visión Óptica', accent: '#2f7cf6', kind: 'services', perDay: [8, 15], hours: [9, 19], closedDows: [0],
  channels: ['Web', 'WhatsApp', 'Mostrador'], staff: ['Lic. Fernández', 'Lic. Castro'],
  services: [
    { name: 'Control visual', price: 15000, weight: 4 }, { name: 'Anteojos completos monofocales', price: 128000, weight: 2 }, { name: 'Multifocales', price: 245000, weight: 0.7 },
    { name: 'Lentes de sol', price: 89000, weight: 1.2 }, { name: 'Lentes de contacto (adaptación)', price: 42000, weight: 1 }, { name: 'Ajuste / reparación', price: 6000, weight: 2 },
  ],
  products: [
    { name: 'Armazones acetato', cat: 'Armazones', cost: 28000, price: 0, stock: 84, min: 40 },
    { name: 'Armazones metal / titanio', cat: 'Armazones', cost: 36000, price: 0, stock: 41, min: 25 },
    { name: 'Lentes de sol Solaris', cat: 'Sol', cost: 42000, price: 0, stock: 19, min: 12 },
    { name: 'Cristales orgánicos antirreflejo (par)', cat: 'Cristales', cost: 14500, price: 0, stock: 26, min: 20 },
    { name: 'Cristales filtro azul (par)', cat: 'Cristales', cost: 19800, price: 0, stock: 9, min: 12 },
    { name: 'Lentes de contacto mensuales (caja)', cat: 'Contacto', cost: 18000, price: 0, stock: 14, min: 10 },
    { name: 'Líquido multipropósito 360 ml', cat: 'Contacto', cost: 6200, price: 0, stock: 22, min: 10 },
    { name: 'Estuches y paños', cat: 'Accesorios', cost: 1500, price: 0, stock: 120, min: 50 },
  ],
  expenses: [
    { concept: 'Alquiler', cat: 'Alquiler', amount: 980000, day: 5 },
    { concept: 'Laboratorio de cristales', cat: 'Proveedores', amount: 1850000, day: 10, provider: 'Lab. Óptico Sur' },
    { concept: 'Armazones', cat: 'Proveedores', amount: 1200000, day: 18, provider: 'Importadora Lumen' },
    { concept: 'Sueldos (óptico + recepción)', cat: 'Sueldos', amount: 2300000, day: 4 },
    { concept: 'Luz', cat: 'Servicios', amount: 92000, day: 15 },
    { concept: 'Sistema de obras sociales', cat: 'Servicios', amount: 58000, day: 8 },
    { concept: 'IIBB + IVA', cat: 'Impuestos', amount: 480000, day: 20 },
    { concept: 'Calibración de equipos', cat: 'Otros', amount: 120000, day: 27 },
  ],
}
export default cfg
