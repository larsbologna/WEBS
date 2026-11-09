import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Lic. Camila Ruiz",
  "accent": "#5b8c3a",
  "kind": "services",
  "perDay": [
    6,
    11
  ],
  "hours": [
    9,
    20
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
    "Camila"
  ],
  "services": [
    {
      "name": "Consulta inicial",
      "price": 28000,
      "weight": 2
    },
    {
      "name": "Control",
      "price": 24000,
      "weight": 5
    },
    {
      "name": "Consulta online",
      "price": 22000,
      "weight": 3
    }
  ],
  "products": [
    {
      "name": "Planes impresos",
      "cat": "Insumos",
      "cost": 3500,
      "price": 0,
      "stock": 40,
      "min": 20
    },
    {
      "name": "Cinta antropométrica",
      "cat": "Equipamiento",
      "cost": 12000,
      "price": 0,
      "stock": 2,
      "min": 1
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 220000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 27500,
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
      "amount": 36666,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Alquiler de consultorio por hora",
      "cat": "Alquiler",
      "amount": 180000,
      "day": 5
    },
    {
      "concept": "Plataforma de videollamadas",
      "cat": "Servicios",
      "amount": 15000,
      "day": 3
    },
    {
      "concept": "Matrícula profesional",
      "cat": "Otros",
      "amount": 28000,
      "day": 25
    }
  ]
}
export default cfg
