import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "El Tornillo",
  "accent": "#e0a100",
  "kind": "shop",
  "perDay": [
    25,
    45
  ],
  "itemsPerSale": [
    1,
    5
  ],
  "hours": [
    8,
    19
  ],
  "closedDows": [
    0
  ],
  "channels": [
    "Mostrador",
    "WhatsApp",
    "Presupuestos"
  ],
  "products": [
    {
      "name": "Taladro percutor 18 V",
      "cat": "Eléctricas",
      "cost": 88000,
      "price": 129900,
      "stock": 4,
      "min": 3
    },
    {
      "name": "Amoladora 115 mm",
      "cat": "Eléctricas",
      "cost": 49000,
      "price": 74900,
      "stock": 6,
      "min": 3
    },
    {
      "name": "Martillo carpintero",
      "cat": "Manuales",
      "cost": 7200,
      "price": 12900,
      "stock": 22,
      "min": 8
    },
    {
      "name": "Látex interior 20 L",
      "cat": "Pintura",
      "cost": 61000,
      "price": 89900,
      "stock": 9,
      "min": 6
    },
    {
      "name": "Rodillo antigota 22 cm",
      "cat": "Pintura",
      "cost": 4900,
      "price": 8900,
      "stock": 30,
      "min": 12
    },
    {
      "name": "Cable 2,5 mm x 100 m",
      "cat": "Electricidad",
      "cost": 46000,
      "price": 64900,
      "stock": 2,
      "min": 4,
      "unit": "rollos"
    },
    {
      "name": "Tornillos autoperforantes x100",
      "cat": "Tornillería",
      "cost": 3100,
      "price": 5900,
      "stock": 60,
      "min": 20,
      "unit": "cajas"
    },
    {
      "name": "Tarugos N° 8 x100",
      "cat": "Tornillería",
      "cost": 2100,
      "price": 4200,
      "stock": 45,
      "min": 20,
      "unit": "cajas"
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 900000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 112500,
      "day": 15
    },
    {
      "concept": "Internet y teléfono",
      "cat": "Servicios",
      "amount": 32000,
      "day": 11
    },
    {
      "concept": "Monotributo / impuestos",
      "cat": "Impuestos",
      "amount": 150000,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Mayorista de herramientas",
      "cat": "Proveedores",
      "amount": 2600000,
      "day": 7,
      "provider": "Herramientas Sur SA"
    },
    {
      "concept": "Pinturería mayorista",
      "cat": "Proveedores",
      "amount": 1300000,
      "day": 12,
      "provider": "Colorpro"
    },
    {
      "concept": "Sueldos (2 empleados)",
      "cat": "Sueldos",
      "amount": 1700000,
      "day": 1
    }
  ]
}
export default cfg
