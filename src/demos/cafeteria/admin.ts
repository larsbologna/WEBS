import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Moka Café', accent: '#7a5134', kind: 'shop', perDay: [45, 80], itemsPerSale: [1, 3], hours: [8, 20],
  channels: ['Take away web', 'Mostrador', 'Mesas'],
  products: [
    { name: 'Flat white', cat: 'Cafés', cost: 950, price: 4200, stock: 300, min: 80, unit: 'porciones' },
    { name: 'Medialunas de manteca', cat: 'Pastelería', cost: 280, price: 900, stock: 120, min: 60 },
    { name: 'Cappuccino', cat: 'Cafés', cost: 900, price: 3900, stock: 300, min: 80, unit: 'porciones' },
    { name: 'Desayuno Moka', cat: 'Combos', cost: 2300, price: 7900, stock: 60, min: 20 },
    { name: 'Avocado toast', cat: 'Desayunos', cost: 2600, price: 7900, stock: 14, min: 10 },
    { name: 'Torta de chocolate', cat: 'Pastelería', cost: 1500, price: 5400, stock: 8, min: 6, unit: 'porciones' },
    { name: 'Cheesecake de frutos rojos', cat: 'Pastelería', cost: 1700, price: 5600, stock: 5, min: 6, unit: 'porciones' },
    { name: 'Iced latte', cat: 'Fríos', cost: 1000, price: 4300, stock: 200, min: 60, unit: 'porciones' },
    { name: 'Café en grano 1 kg', cat: 'Insumos', cost: 24000, price: 38000, stock: 6, min: 4, unit: 'kg' },
  ],
  expenses: [
    { concept: 'Alquiler', cat: 'Alquiler', amount: 890000, day: 5, provider: 'Inmobiliaria Plaza' },
    { concept: 'Café de especialidad (20 kg)', cat: 'Proveedores', amount: 480000, day: 7, provider: 'Tostadero Puerto Blest' },
    { concept: 'Leche y lácteos', cat: 'Proveedores', amount: 390000, day: 10, provider: 'Tambo La Elisa' },
    { concept: 'Pastelería', cat: 'Proveedores', amount: 560000, day: 14, provider: 'Panificados Del Sur' },
    { concept: 'Sueldos (3 baristas)', cat: 'Sueldos', amount: 2550000, day: 4 },
    { concept: 'Luz', cat: 'Servicios', amount: 180000, day: 15 },
    { concept: 'Internet (wifi clientes)', cat: 'Servicios', amount: 38000, day: 12 },
    { concept: 'Monotributo', cat: 'Impuestos', amount: 98000, day: 20 },
    { concept: 'Mantenimiento cafetera', cat: 'Otros', amount: 85000, day: 26 },
  ],
}
export default cfg
