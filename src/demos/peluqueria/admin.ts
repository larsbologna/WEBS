import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Studio Bella', accent: '#b97a72', kind: 'services', perDay: [10, 18], hours: [9, 20], closedDows: [0, 1],
  channels: ['Web', 'WhatsApp', 'Instagram'], staff: ['Belén', 'Carla', 'Romina', 'Juli'],
  services: [
    { name: 'Corte y brushing', price: 16000, weight: 5 }, { name: 'Balayage', price: 75000, weight: 1.2 }, { name: 'Color completo', price: 38000, weight: 2 },
    { name: 'Retoque de raíz', price: 26000, weight: 2 }, { name: 'Alisado con keratina', price: 62000, weight: 1 }, { name: 'Nutrición intensiva', price: 15000, weight: 2 }, { name: 'Peinado de fiesta', price: 28000, weight: 1 },
  ],
  products: [
    { name: 'Tintura profesional (tubo)', cat: 'Color', cost: 5600, price: 0, stock: 38, min: 20 },
    { name: 'Oxidante 1 L', cat: 'Color', cost: 4900, price: 0, stock: 6, min: 4 },
    { name: 'Decolorante 500 g', cat: 'Color', cost: 12800, price: 0, stock: 2, min: 3 },
    { name: 'Keratina 1 L', cat: 'Tratamientos', cost: 46000, price: 0, stock: 2, min: 1 },
    { name: 'Máscara nutritiva 1 kg', cat: 'Tratamientos', cost: 18500, price: 0, stock: 4, min: 2 },
    { name: 'Shampoo 5 L', cat: 'Lavado', cost: 21000, price: 0, stock: 3, min: 2 },
    { name: 'Papel aluminio (rollo)', cat: 'Descartables', cost: 6900, price: 0, stock: 5, min: 3 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 820000, day: 5, provider: 'Propietaria' },
    { concept: 'Comisiones estilistas', cat: 'Sueldos', amount: 2900000, day: 1 },
    { concept: 'Coloración y tratamientos', cat: 'Proveedores', amount: 680000, day: 10, provider: 'Distribuidora L. Profesional' },
    { concept: 'Luz', cat: 'Servicios', amount: 145000, day: 15 },
    { concept: 'Agua', cat: 'Servicios', amount: 39000, day: 18 },
    { concept: 'Internet', cat: 'Servicios', amount: 32000, day: 12 },
    { concept: 'Monotributo', cat: 'Impuestos', amount: 112000, day: 20 },
    { concept: 'Lavandería de toallas', cat: 'Otros', amount: 70000, day: 24 },
  ],
}
export default cfg
