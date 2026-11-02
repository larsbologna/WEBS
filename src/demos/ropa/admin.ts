import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Distrito Clothing', accent: '#ff4b12', kind: 'shop', perDay: [8, 16], itemsPerSale: [1, 3], hours: [10, 20], closedDows: [0],
  channels: ['Tienda online', 'Local', 'Instagram'],
  products: [
    { name: 'Remera Oversize Essential', cat: 'Remeras', cost: 7200, price: 18900, stock: 64, min: 20 },
    { name: 'Hoodie Heavyweight', cat: 'Buzos', cost: 19500, price: 45900, stock: 22, min: 10 },
    { name: 'Jean Recto 90s', cat: 'Jeans', cost: 17800, price: 42900, stock: 30, min: 12 },
    { name: 'Remera Boxy Negra', cat: 'Remeras', cost: 6800, price: 17500, stock: 9, min: 15 },
    { name: 'Campera Biker Eco Cuero', cat: 'Camperas', cost: 41000, price: 89900, stock: 6, min: 4 },
    { name: 'Vestido Midi Satén', cat: 'Vestidos', cost: 21500, price: 52900, stock: 11, min: 6 },
    { name: 'Zapatillas Urban White', cat: 'Zapatillas', cost: 46000, price: 84900, stock: 3, min: 5 },
    { name: 'Buzo Crew Neck', cat: 'Buzos', cost: 16200, price: 38900, stock: 18, min: 8 },
    { name: 'Camisa Oxford', cat: 'Camisas', cost: 14500, price: 36900, stock: 15, min: 6 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 1250000, day: 5, provider: 'Galería Centro' },
    { concept: 'Taller de confección', cat: 'Proveedores', amount: 2200000, day: 10, provider: 'Taller Flores' },
    { concept: 'Zapatillas (importador)', cat: 'Proveedores', amount: 960000, day: 17, provider: 'Importadora Norte' },
    { concept: 'Packaging y bolsas', cat: 'Proveedores', amount: 140000, day: 13 },
    { concept: 'Sueldos (2 vendedoras)', cat: 'Sueldos', amount: 1900000, day: 4 },
    { concept: 'Plataforma tienda online', cat: 'Servicios', amount: 45000, day: 2 },
    { concept: 'Luz', cat: 'Servicios', amount: 120000, day: 15 },
    { concept: 'IIBB + IVA', cat: 'Impuestos', amount: 540000, day: 20 },
    { concept: 'Publicidad redes', cat: 'Otros', amount: 180000, day: 22 },
  ],
}
export default cfg
