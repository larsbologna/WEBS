import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Natural Market', accent: '#2f4a2b', kind: 'shop', perDay: [25, 45], itemsPerSale: [1, 4], hours: [9, 20], closedDows: [0],
  channels: ['Pedido web', 'Mostrador', 'WhatsApp'],
  products: [
    { name: 'Almendras (250 g)', cat: 'Frutos secos', cost: 3100, price: 5450, stock: 48, min: 20, unit: 'bolsas' },
    { name: 'Mix energético (250 g)', cat: 'Frutos secos', cost: 2300, price: 4230, stock: 36, min: 20, unit: 'bolsas' },
    { name: 'Avena arrollada (500 g)', cat: 'Cereales', cost: 900, price: 1600, stock: 70, min: 25, unit: 'bolsas' },
    { name: 'Semillas de chía (250 g)', cat: 'Semillas', cost: 1300, price: 2450, stock: 12, min: 15, unit: 'bolsas' },
    { name: 'Granola casera (500 g)', cat: 'Cereales', cost: 3300, price: 5950, stock: 22, min: 12, unit: 'bolsas' },
    { name: 'Proteína vegetal 1 kg', cat: 'Suplementos', cost: 21000, price: 32900, stock: 6, min: 4 },
    { name: 'Miel pura 500 g', cat: 'Endulzantes', cost: 5200, price: 8900, stock: 18, min: 8 },
    { name: 'Harina de almendras (500 g)', cat: 'Harinas', cost: 8200, price: 13450, stock: 4, min: 6, unit: 'bolsas' },
    { name: 'Colágeno hidrolizado', cat: 'Suplementos', cost: 12500, price: 19800, stock: 9, min: 4 },
  ],
  expenses: [
    { concept: 'Alquiler', cat: 'Alquiler', amount: 650000, day: 5 },
    { concept: 'Frutos secos a granel', cat: 'Proveedores', amount: 1350000, day: 9, provider: 'Mayorista Granix' },
    { concept: 'Suplementos', cat: 'Proveedores', amount: 480000, day: 16, provider: 'Lab. NutriVida' },
    { concept: 'Bolsas kraft compostables', cat: 'Proveedores', amount: 72000, day: 13 },
    { concept: 'Sueldo empleada', cat: 'Sueldos', amount: 950000, day: 4 },
    { concept: 'Luz (heladera y balanza)', cat: 'Servicios', amount: 96000, day: 15 },
    { concept: 'Monotributo', cat: 'Impuestos', amount: 112000, day: 20 },
    { concept: 'Envíos en moto', cat: 'Otros', amount: 140000, day: 28 },
  ],
}
export default cfg
