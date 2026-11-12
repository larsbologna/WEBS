import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Agustina Vera",
  "accent": "#ff4d8d",
  "kind": "services",
  "perDay": [
    1,
    4
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
    "Instagram"
  ],
  "staff": [
    "Agus",
    "Lean (diseño)"
  ],
  "services": [
    {
      "name": "Plan Arranque",
      "price": 180000,
      "weight": 3
    },
    {
      "name": "Plan Crecimiento",
      "price": 320000,
      "weight": 2
    },
    {
      "name": "Consultoría",
      "price": 120000,
      "weight": 1
    },
    {
      "name": "Producción de contenido",
      "price": 90000,
      "weight": 2
    }
  ],
  "products": [
    {
      "name": "Créditos de bancos de imágenes",
      "cat": "Herramientas",
      "cost": 25000,
      "price": 0,
      "stock": 3,
      "min": 2
    }
  ],
  "expenses": [
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
      "concept": "Diseñador freelance",
      "cat": "Sueldos",
      "amount": 650000,
      "day": 1
    },
    {
      "concept": "Software (Canva, Meta, CapCut)",
      "cat": "Servicios",
      "amount": 45000,
      "day": 3
    }
  ]
}
export default cfg
