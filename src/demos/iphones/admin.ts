import type { AdminConfig } from '../../admin/types'
// importes en pesos (cotización de referencia USD 1 = $ 1.450)
const usd = (n: number) => n * 1450
const cfg: AdminConfig = {
  name: 'Órbita Mobile', accent: '#6366f1', kind: 'shop', perDay: [2, 5], itemsPerSale: [1, 2], hours: [10, 20], closedDows: [0],
  channels: ['Web + reserva', 'Instagram', 'Local'],
  products: [
    { name: 'iPhone 17 256 GB', cat: 'Nuevos', cost: usd(1020), price: usd(1199), stock: 6, min: 3 },
    { name: 'iPhone 16 128 GB', cat: 'Nuevos', cost: usd(810), price: usd(949), stock: 4, min: 3 },
    { name: 'iPhone 15 Pro 128 GB (seleccionado)', cat: 'Seleccionados', cost: usd(640), price: usd(799), stock: 3, min: 2 },
    { name: 'Vidrio templado', cat: 'Accesorios', cost: usd(3), price: usd(12), stock: 60, min: 25 },
    { name: 'iPhone 17 Pro 256 GB', cat: 'Nuevos', cost: usd(1380), price: usd(1599), stock: 2, min: 2 },
    { name: 'iPhone 17 Pro Max 256 GB', cat: 'Nuevos', cost: usd(1560), price: usd(1799), stock: 1, min: 2 },
    { name: 'iPhone 15 128 GB (seleccionado)', cat: 'Seleccionados', cost: usd(500), price: usd(629), stock: 5, min: 2 },
    { name: 'iPhone 13 128 GB (seleccionado)', cat: 'Seleccionados', cost: usd(320), price: usd(419), stock: 4, min: 2 },
    { name: 'Funda MagSafe', cat: 'Accesorios', cost: usd(8), price: usd(25), stock: 35, min: 15 },
    { name: 'Cargador USB-C 20 W', cat: 'Accesorios', cost: usd(9), price: usd(25), stock: 9, min: 12 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 780000, day: 5 },
    { concept: 'Compra de equipos nuevos', cat: 'Proveedores', amount: usd(9800), day: 8, provider: 'Importador mayorista' },
    { concept: 'Equipos usados (canjes)', cat: 'Proveedores', amount: usd(2100), day: 14 },
    { concept: 'Accesorios', cat: 'Proveedores', amount: 420000, day: 18, provider: 'Distribuidora Accesorios' },
    { concept: 'Técnico (revisión y baterías)', cat: 'Sueldos', amount: 900000, day: 4 },
    { concept: 'Vendedor', cat: 'Sueldos', amount: 1100000, day: 4 },
    { concept: 'Seguro contra robo', cat: 'Servicios', amount: 140000, day: 10 },
    { concept: 'Publicidad Instagram', cat: 'Otros', amount: 250000, day: 22 },
    { concept: 'IIBB + IVA', cat: 'Impuestos', amount: 980000, day: 20 },
  ],
}
export default cfg
