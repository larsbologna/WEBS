import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Arq. Julieta Moreno",
  "accent": "#9c6b4a",
  "kind": "services",
  "perDay": [
    1,
    4
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
    "Julieta",
    "Franco (dibujante)"
  ],
  "services": [
    {
      "name": "Anteproyecto",
      "price": 850000,
      "weight": 1
    },
    {
      "name": "Visita de obra",
      "price": 60000,
      "weight": 4
    },
    {
      "name": "Planos municipales",
      "price": 380000,
      "weight": 1
    },
    {
      "name": "Consulta",
      "price": 45000,
      "weight": 2
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
      "amount": 300000,
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
      "concept": "Dibujante",
      "cat": "Sueldos",
      "amount": 700000,
      "day": 1
    },
    {
      "concept": "Licencias de software (CAD/3D)",
      "cat": "Servicios",
      "amount": 90000,
      "day": 4
    },
    {
      "concept": "Colegio de Arquitectos",
      "cat": "Otros",
      "amount": 40000,
      "day": 25
    }
  ]
}
export default cfg
