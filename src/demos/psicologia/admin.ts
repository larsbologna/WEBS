import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Lic. Valeria Sosa",
  "accent": "#7a6aa8",
  "kind": "services",
  "perDay": [
    6,
    10
  ],
  "hours": [
    9,
    21
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
    "Valeria"
  ],
  "services": [
    {
      "name": "Sesión individual",
      "price": 30000,
      "weight": 6
    },
    {
      "name": "Sesión de pareja",
      "price": 40000,
      "weight": 1
    },
    {
      "name": "Primera entrevista",
      "price": 30000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Material para talleres",
      "cat": "Insumos",
      "cost": 8000,
      "price": 0,
      "stock": 6,
      "min": 3
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 200000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 25000,
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
      "amount": 33333,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Supervisión clínica",
      "cat": "Otros",
      "amount": 60000,
      "day": 10
    },
    {
      "concept": "Plataforma de videollamadas",
      "cat": "Servicios",
      "amount": 15000,
      "day": 3
    },
    {
      "concept": "Matrícula y seguro",
      "cat": "Otros",
      "amount": 40000,
      "day": 25
    }
  ]
}
export default cfg
