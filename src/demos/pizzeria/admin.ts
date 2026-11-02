import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Forno Napoli', accent: '#e63922', kind: 'shop', perDay: [30, 55], itemsPerSale: [1, 3], hours: [19, 24], closedDows: [1],
  channels: ['Web', 'WhatsApp', 'Mostrador'],
  products: [
    { name: 'Pizza Muzzarella grande', cat: 'Pizzas', cost: 3600, price: 11900, stock: 60, min: 25, unit: 'bollos' },
    { name: 'Fugazzeta rellena', cat: 'Pizzas', cost: 5100, price: 15900, stock: 22, min: 15, unit: 'bollos' },
    { name: 'Pepperoni grande', cat: 'Pizzas', cost: 4900, price: 14800, stock: 28, min: 15 },
    { name: 'Combo Amigos', cat: 'Combos', cost: 8900, price: 23900, stock: 40, min: 10 },
    { name: 'Margherita DOP', cat: 'Pizzas', cost: 4400, price: 13400, stock: 18, min: 12 },
    { name: 'Empanada de carne', cat: 'Acompañamientos', cost: 600, price: 1700, stock: 90, min: 40 },
    { name: 'Fainá', cat: 'Acompañamientos', cost: 700, price: 2400, stock: 7, min: 10 },
    { name: 'Gaseosa 1,5 L', cat: 'Bebidas', cost: 1900, price: 3900, stock: 48, min: 24 },
    { name: 'Cerveza artesanal 1 L', cat: 'Bebidas', cost: 2900, price: 6200, stock: 30, min: 18 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 980000, day: 5, provider: 'Propietario' },
    { concept: 'Muzzarella (horma x 30)', cat: 'Proveedores', amount: 1650000, day: 9, provider: 'Lácteos La Serenísima' },
    { concept: 'Harina 000 y semolín', cat: 'Proveedores', amount: 420000, day: 11, provider: 'Molino Campodónico' },
    { concept: 'Leña para el horno', cat: 'Proveedores', amount: 210000, day: 14, provider: 'Leñera Don Pedro' },
    { concept: 'Bebidas', cat: 'Proveedores', amount: 640000, day: 19, provider: 'Distribuidora Quilmes' },
    { concept: 'Sueldos (pizzero, cajera, 3 cadetes)', cat: 'Sueldos', amount: 3600000, day: 4 },
    { concept: 'Luz', cat: 'Servicios', amount: 265000, day: 15 },
    { concept: 'Gas', cat: 'Servicios', amount: 120000, day: 21 },
    { concept: 'Monotributo / IIBB', cat: 'Impuestos', amount: 290000, day: 20 },
  ],
}
export default cfg
