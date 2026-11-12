import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Bianchi Propiedades",
  "accent": "#e4572e",
  "kind": "services",
  "perDay": [
    6,
    14
  ],
  "hours": [
    9,
    18
  ],
  "closedDows": [
    0
  ],
  "channels": [
    "Web",
    "WhatsApp",
    "Recomendación"
  ],
  "staff": [
    "Diego",
    "Mariana",
    "Javier"
  ],
  "services": [
    {
      "name": "Visita a propiedad",
      "price": 0,
      "weight": 5
    },
    {
      "name": "Tasación",
      "price": 0,
      "weight": 2
    },
    {
      "name": "Comisión de venta",
      "price": 2800000,
      "weight": 0.3
    },
    {
      "name": "Comisión de alquiler",
      "price": 450000,
      "weight": 0.6
    }
  ],
  "products": [
    {
      "name": "Carteles de venta / alquiler",
      "cat": "Insumos",
      "cost": 9000,
      "price": 0,
      "stock": 6,
      "min": 8
    },
    {
      "name": "Resmas A4",
      "cat": "Oficina",
      "cost": 7500,
      "price": 0,
      "stock": 5,
      "min": 4,
      "unit": "resmas"
    },
    {
      "name": "Tóner impresora",
      "cat": "Oficina",
      "cost": 38000,
      "price": 0,
      "stock": 1,
      "min": 1
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler de oficina",
      "cat": "Alquiler",
      "amount": 550000,
      "day": 5
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
      "amount": 110000,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Portales inmobiliarios",
      "cat": "Servicios",
      "amount": 180000,
      "day": 6
    },
    {
      "concept": "Asistente",
      "cat": "Sueldos",
      "amount": 800000,
      "day": 1
    },
    {
      "concept": "Colegio de Martilleros",
      "cat": "Otros",
      "amount": 35000,
      "day": 25
    }
  ]
}
export default cfg
