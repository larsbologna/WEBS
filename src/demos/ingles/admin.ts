import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Miss Lucía Ortiz",
  "accent": "#2f5bea",
  "kind": "services",
  "perDay": [
    6,
    12
  ],
  "hours": [
    9,
    21
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
    "Lucía",
    "Mica"
  ],
  "services": [
    {
      "name": "Cuota mensual grupal",
      "price": 52000,
      "weight": 5
    },
    {
      "name": "Clase individual",
      "price": 18000,
      "weight": 2
    },
    {
      "name": "Preparación de examen",
      "price": 64000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Libros de texto",
      "cat": "Material",
      "cost": 28000,
      "price": 0,
      "stock": 8,
      "min": 6
    },
    {
      "name": "Fotocopias y material",
      "cat": "Material",
      "cost": 6000,
      "price": 0,
      "stock": 10,
      "min": 5,
      "unit": "packs"
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler de oficina",
      "cat": "Alquiler",
      "amount": 220000,
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
      "concept": "Profesora asistente",
      "cat": "Sueldos",
      "amount": 550000,
      "day": 1
    },
    {
      "concept": "Plataforma de videollamadas",
      "cat": "Servicios",
      "amount": 15000,
      "day": 3
    }
  ]
}
export default cfg
