import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Ferrari & Asociados",
  "accent": "#8a6d3b",
  "kind": "services",
  "perDay": [
    4,
    9
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
    "Dr. Ferrari",
    "Dra. Ibáñez",
    "Dr. Luna"
  ],
  "services": [
    {
      "name": "Consulta",
      "price": 45000,
      "weight": 4
    },
    {
      "name": "Redacción de contrato",
      "price": 180000,
      "weight": 1
    },
    {
      "name": "Honorarios por avance de causa",
      "price": 350000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Resmas A4",
      "cat": "Oficina",
      "cost": 7500,
      "price": 0,
      "stock": 6,
      "min": 4,
      "unit": "resmas"
    },
    {
      "name": "Bonos de matrícula",
      "cat": "Oficina",
      "cost": 4500,
      "price": 0,
      "stock": 20,
      "min": 10
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 700000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 87500,
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
      "amount": 116666,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Secretaria",
      "cat": "Sueldos",
      "amount": 850000,
      "day": 1
    },
    {
      "concept": "Colegio de Abogados",
      "cat": "Otros",
      "amount": 60000,
      "day": 25
    },
    {
      "concept": "Tasas y bonos judiciales",
      "cat": "Impuestos",
      "amount": 180000,
      "day": 18
    }
  ]
}
export default cfg
