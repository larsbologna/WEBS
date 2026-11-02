import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Essence Store', accent: '#3d1530', kind: 'shop', perDay: [6, 13], itemsPerSale: [1, 2], hours: [9, 20], closedDows: [0],
  channels: ['Web + WhatsApp', 'Local'],
  products: [
    { name: 'Rose Éternelle 100 ml', cat: 'Mujer', cost: 82000, price: 148000, stock: 12, min: 5 },
    { name: 'Noir Absolu 100 ml', cat: 'Hombre', cost: 91000, price: 162000, stock: 9, min: 5 },
    { name: 'Océan Bleu 100 ml', cat: 'Hombre', cost: 56000, price: 104000, stock: 15, min: 6 },
    { name: 'Agrumi di Capri 100 ml', cat: 'Unisex', cost: 64000, price: 118000, stock: 7, min: 4 },
    { name: 'Velours d’Ambre 100 ml', cat: 'Mujer', cost: 88000, price: 156000, stock: 3, min: 4 },
    { name: 'Oud Mystique 100 ml', cat: 'Hombre', cost: 108000, price: 189000, stock: 4, min: 3 },
    { name: 'Jardin Secret 100 ml', cat: 'Mujer', cost: 73000, price: 132000, stock: 10, min: 4 },
    { name: 'Santal Royal 100 ml', cat: 'Unisex', cost: 99000, price: 174000, stock: 5, min: 3 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 1100000, day: 5 },
    { concept: 'Compra de fragancias', cat: 'Proveedores', amount: 4800000, day: 12, provider: 'Distribuidora Oficial' },
    { concept: 'Packaging de regalo', cat: 'Proveedores', amount: 160000, day: 15 },
    { concept: 'Sueldo asesora', cat: 'Sueldos', amount: 1050000, day: 4 },
    { concept: 'Seguro de mercadería', cat: 'Servicios', amount: 95000, day: 9 },
    { concept: 'Luz', cat: 'Servicios', amount: 88000, day: 15 },
    { concept: 'IIBB + IVA', cat: 'Impuestos', amount: 620000, day: 20 },
  ],
}
export default cfg
