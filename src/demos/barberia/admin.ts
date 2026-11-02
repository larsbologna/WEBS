import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Aurum Barber Club', accent: '#a07c2c', kind: 'services', perDay: [18, 28], hours: [10, 21], closedDows: [0, 1],
  channels: ['Web', 'WhatsApp', 'Walk-in'], staff: ['Nico', 'Tomi', 'Lucas'],
  services: [
    { name: 'Fade / degradé', price: 13500, weight: 4 }, { name: 'Corte + barba', price: 19000, weight: 3 }, { name: 'Corte clásico', price: 12000, weight: 3 },
    { name: 'Barba completa', price: 8500, weight: 2 }, { name: 'Afeitado a navaja', price: 10000, weight: 1 }, { name: 'Platinado / color', price: 38000, weight: 0.4 }, { name: 'Corte kids', price: 9000, weight: 1 },
  ],
  products: [
    { name: 'Cera mate 100 g', cat: 'Productos', cost: 4200, price: 0, stock: 14, min: 6 },
    { name: 'Aceite para barba', cat: 'Productos', cost: 3800, price: 0, stock: 4, min: 5 },
    { name: 'Hojas de navaja (x100)', cat: 'Insumos', cost: 6500, price: 0, stock: 3, min: 2, unit: 'cajas' },
    { name: 'Toallas descartables (x50)', cat: 'Insumos', cost: 5200, price: 0, stock: 6, min: 4, unit: 'paquetes' },
    { name: 'Shampoo profesional 1 L', cat: 'Insumos', cost: 7900, price: 0, stock: 5, min: 3 },
    { name: 'Decolorante 500 g', cat: 'Color', cost: 11200, price: 0, stock: 1, min: 2 },
    { name: 'Desinfectante para máquinas', cat: 'Insumos', cost: 4800, price: 0, stock: 7, min: 3 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 750000, day: 5, provider: 'Propietario' },
    { concept: 'Comisión barberos (40%)', cat: 'Sueldos', amount: 3100000, day: 1 },
    { concept: 'Productos y descartables', cat: 'Proveedores', amount: 240000, day: 9, provider: 'Distribuidora Barber Pro' },
    { concept: 'Bebidas para clientes', cat: 'Proveedores', amount: 65000, day: 13 },
    { concept: 'Luz', cat: 'Servicios', amount: 98000, day: 15 },
    { concept: 'Internet + música', cat: 'Servicios', amount: 36000, day: 11 },
    { concept: 'Monotributo', cat: 'Impuestos', amount: 112000, day: 20 },
    { concept: 'Publicidad Instagram', cat: 'Otros', amount: 60000, day: 22 },
  ],
}
export default cfg
