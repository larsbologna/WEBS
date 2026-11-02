import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Casa del Sabor', accent: '#b4441f', kind: 'shop', perDay: [22, 38], itemsPerSale: [1, 4], hours: [12, 23], closedDows: [],
  channels: ['WhatsApp web', 'Salón', 'Take away'],
  products: [
    { name: 'Empanadas cortadas a cuchillo', cat: 'Entradas', cost: 650, price: 1900, stock: 140, min: 60 },
    { name: 'Ojo de bife 400 g', cat: 'Parrilla', cost: 9800, price: 24900, stock: 18, min: 12 },
    { name: 'Sorrentinos de jamón y queso', cat: 'Pastas', cost: 3900, price: 13900, stock: 42, min: 20 },
    { name: 'Milanesa napolitana', cat: 'Principales', cost: 4600, price: 14900, stock: 30, min: 15 },
    { name: 'Asado de tira', cat: 'Parrilla', cost: 8200, price: 19800, stock: 9, min: 10 },
    { name: 'Hamburguesa del bodegón', cat: 'Principales', cost: 4300, price: 13500, stock: 35, min: 15 },
    { name: 'Panqueques con dulce de leche', cat: 'Postres', cost: 1500, price: 6400, stock: 26, min: 10 },
    { name: 'Malbec reserva', cat: 'Bebidas', cost: 8500, price: 18900, stock: 24, min: 12 },
    { name: 'Cerveza artesanal IPA', cat: 'Bebidas', cost: 2100, price: 5400, stock: 60, min: 30 },
    { name: 'Limonada con menta', cat: 'Bebidas', cost: 1300, price: 6200, stock: 4, min: 8, unit: 'jarras' },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 1450000, day: 5, provider: 'Inmobiliaria Sur' },
    { concept: 'Carnes y achuras', cat: 'Proveedores', amount: 2380000, day: 8, provider: 'Frigorífico La Pampa' },
    { concept: 'Verdulería', cat: 'Proveedores', amount: 520000, day: 12, provider: 'Mercado Central' },
    { concept: 'Bebidas', cat: 'Proveedores', amount: 870000, day: 18, provider: 'Distribuidora Quilmes' },
    { concept: 'Sueldos (6 empleados)', cat: 'Sueldos', amount: 5100000, day: 4 },
    { concept: 'Luz (Edesur)', cat: 'Servicios', amount: 410000, day: 15 },
    { concept: 'Gas (Metrogas)', cat: 'Servicios', amount: 238000, day: 20 },
    { concept: 'Internet y teléfono', cat: 'Servicios', amount: 42000, day: 10 },
    { concept: 'Ingresos Brutos (ARBA)', cat: 'Impuestos', amount: 360000, day: 16 },
    { concept: 'Contador', cat: 'Otros', amount: 150000, day: 25 },
  ],
}
export default cfg
