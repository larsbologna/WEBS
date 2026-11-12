import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Romina Paz Seguros",
  "accent": "#1d64f2",
  "kind": "services",
  "perDay": [
    3,
    8
  ],
  "hours": [
    9,
    19
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
    "Romina",
    "Sofi (administración)"
  ],
  "services": [
    {
      "name": "Póliza auto (comisión)",
      "price": 38000,
      "weight": 5
    },
    {
      "name": "Póliza hogar (comisión)",
      "price": 15000,
      "weight": 2
    },
    {
      "name": "Integral comercio (comisión)",
      "price": 42000,
      "weight": 1
    },
    {
      "name": "Vida (comisión)",
      "price": 22000,
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
      "amount": 250000,
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
      "amount": 60000,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Administrativa",
      "cat": "Sueldos",
      "amount": 650000,
      "day": 1
    },
    {
      "concept": "Matrícula SSN",
      "cat": "Otros",
      "amount": 30000,
      "day": 25
    }
  ]
}
export default cfg
