import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Estudio Gómez",
  "accent": "#12795f",
  "kind": "services",
  "perDay": [
    6,
    12
  ],
  "hours": [
    9,
    18
  ],
  "closedDows": [
    0,
    6
  ],
  "channels": [
    "Web",
    "WhatsApp",
    "Recomendación"
  ],
  "staff": [
    "Laura",
    "Pablo"
  ],
  "services": [
    {
      "name": "Abono monotributo",
      "price": 25000,
      "weight": 5
    },
    {
      "name": "Abono comercio",
      "price": 60000,
      "weight": 2
    },
    {
      "name": "Liquidación de sueldos",
      "price": 8000,
      "weight": 2
    },
    {
      "name": "Reunión inicial",
      "price": 0,
      "weight": 1
    }
  ],
  "products": [
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
      "name": "Carpetas de clientes",
      "cat": "Oficina",
      "cost": 2200,
      "price": 0,
      "stock": 30,
      "min": 15
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 550000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 68750,
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
      "amount": 91666,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Asistente contable",
      "cat": "Sueldos",
      "amount": 950000,
      "day": 1
    },
    {
      "concept": "Software contable",
      "cat": "Servicios",
      "amount": 65000,
      "day": 4
    },
    {
      "concept": "Consejo Profesional",
      "cat": "Otros",
      "amount": 45000,
      "day": 25
    }
  ]
}
export default cfg
