import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  name: 'Conecta Tech', accent: '#1d4ed8', kind: 'shop', perDay: [14, 26], itemsPerSale: [1, 3], hours: [9, 20], closedDows: [0],
  channels: ['Tienda online', 'Local', 'WhatsApp'],
  products: [
    { name: 'Cable HDMI 2.1 8K', cat: 'Cables', cost: 4800, price: 12900, stock: 42, min: 15 },
    { name: 'Adaptador USB-C a HDMI 4K', cat: 'Adaptadores', cost: 8200, price: 18500, stock: 6, min: 10 },
    { name: 'Chromecast con Google TV 4K', cat: 'Streaming', cost: 52000, price: 79900, stock: 11, min: 6 },
    { name: 'Cargador USB-C 25 W', cat: 'Energía', cost: 7100, price: 16900, stock: 50, min: 20 },
    { name: 'Cable HDMI 2.0 4K', cat: 'Cables', cost: 2200, price: 6900, stock: 80, min: 25 },
    { name: 'Pendrive 64 GB', cat: 'Almacenamiento', cost: 5600, price: 11900, stock: 70, min: 20 },
    { name: 'Power bank 20.000 mAh', cat: 'Energía', cost: 23000, price: 42900, stock: 20, min: 8 },
    { name: 'Auriculares Bluetooth in-ear', cat: 'Audio', cost: 19500, price: 39900, stock: 28, min: 10 },
    { name: 'Cable Lightning a USB-C', cat: 'Cables', cost: 3400, price: 8900, stock: 3, min: 12 },
    { name: 'Webcam Full HD', cat: 'Periféricos', cost: 24000, price: 42900, stock: 4, min: 5 },
    { name: 'Router Wi-Fi 6', cat: 'Redes', cost: 55000, price: 89900, stock: 7, min: 4 },
    { name: 'Disco SSD externo 1 TB', cat: 'Almacenamiento', cost: 84000, price: 129000, stock: 5, min: 3 },
  ],
  expenses: [
    { concept: 'Alquiler del local', cat: 'Alquiler', amount: 1050000, day: 5 },
    { concept: 'Mayorista de accesorios', cat: 'Proveedores', amount: 3200000, day: 9, provider: 'Importadora Tecno Sur' },
    { concept: 'Streaming y redes', cat: 'Proveedores', amount: 1450000, day: 16, provider: 'Distribuidor oficial' },
    { concept: 'Sueldos (2 vendedores)', cat: 'Sueldos', amount: 1950000, day: 4 },
    { concept: 'Comisiones Mercado Pago', cat: 'Servicios', amount: 210000, day: 2 },
    { concept: 'Plataforma tienda online', cat: 'Servicios', amount: 45000, day: 11 },
    { concept: 'Luz', cat: 'Servicios', amount: 110000, day: 15 },
    { concept: 'IIBB + IVA', cat: 'Impuestos', amount: 690000, day: 20 },
    { concept: 'Envíos (moto)', cat: 'Otros', amount: 160000, day: 26 },
  ],
}
export default cfg
