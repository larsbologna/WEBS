import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Colita Feliz', accent: '#ff6b5b', kind: 'shop', perDay: [18, 32], itemsPerSale: [1, 3], hours: [9, 20], closedDows: [0],
  channels: ['Tienda online', 'Local', 'WhatsApp', 'Compra programada'],
  products: [
    { name: 'NutriCan Adulto 15 kg', cat: 'Alimento perro', cost: 52000, price: 69900, stock: 24, min: 10, unit: 'bolsas' },
    { name: 'Piedras sanitarias 4 kg', cat: 'Higiene gato', cost: 5200, price: 8900, stock: 40, min: 20 },
    { name: 'Gatuno Adulto 3 kg', cat: 'Alimento gato', cost: 19500, price: 26900, stock: 18, min: 10, unit: 'bolsas' },
    { name: 'Huesitos dentales x7', cat: 'Snacks', cost: 2400, price: 4900, stock: 55, min: 20 },
    { name: 'NutriCan Cachorro 7,5 kg', cat: 'Alimento perro', cost: 34500, price: 46900, stock: 6, min: 8, unit: 'bolsas' },
    { name: 'Gatuno Castrados 7,5 kg', cat: 'Alimento gato', cost: 46000, price: 62900, stock: 9, min: 6, unit: 'bolsas' },
    { name: 'Pipeta antipulgas', cat: 'Salud', cost: 5600, price: 9900, stock: 30, min: 15 },
    { name: 'Pelota indestructible', cat: 'Juguetes', cost: 3100, price: 6900, stock: 22, min: 10 },
    { name: 'Cama acolchada mediana', cat: 'Accesorios', cost: 19800, price: 34900, stock: 4, min: 5 },
    { name: 'Rascador torre 80 cm', cat: 'Accesorios', cost: 36000, price: 59900, stock: 3, min: 2 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 720000, day: 5 },
    { concept: 'Alimento balanceado', cat: 'Proveedores', amount: 3900000, day: 8, provider: 'Distribuidora Mascotas Sur' },
    { concept: 'Accesorios y juguetes', cat: 'Proveedores', amount: 640000, day: 15, provider: 'Importadora Pet' },
    { concept: 'Piedras sanitarias', cat: 'Proveedores', amount: 380000, day: 19 },
    { concept: 'Sueldo vendedora', cat: 'Sueldos', amount: 980000, day: 4 },
    { concept: 'Repartidor (moto)', cat: 'Sueldos', amount: 760000, day: 4 },
    { concept: 'Combustible reparto', cat: 'Otros', amount: 180000, day: 24 },
    { concept: 'Luz', cat: 'Servicios', amount: 85000, day: 15 },
    { concept: 'Monotributo', cat: 'Impuestos', amount: 112000, day: 20 },
  ],
}
export default cfg
