import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Pulso",
  "accent": "#9acd00",
  "kind": "services",
  "perDay": [
    30,
    55
  ],
  "hours": [
    7,
    23
  ],
  "closedDows": [
    0
  ],
  "channels": [
    "Web",
    "WhatsApp",
    "Recepción"
  ],
  "staff": [
    "Fede",
    "Agus",
    "Lu",
    "Martín"
  ],
  "services": [
    {
      "name": "Plan libre",
      "price": 36000,
      "weight": 5
    },
    {
      "name": "Plan 2 veces",
      "price": 28000,
      "weight": 3
    },
    {
      "name": "Pase diario",
      "price": 5000,
      "weight": 2
    },
    {
      "name": "Personal trainer",
      "price": 15000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Agua mineral 500 ml",
      "cat": "Bar",
      "cost": 500,
      "price": 0,
      "stock": 48,
      "min": 24
    },
    {
      "name": "Bebida isotónica",
      "cat": "Bar",
      "cost": 900,
      "price": 0,
      "stock": 12,
      "min": 24
    },
    {
      "name": "Desinfectante para máquinas",
      "cat": "Limpieza",
      "cost": 4800,
      "price": 0,
      "stock": 6,
      "min": 4
    },
    {
      "name": "Bandas elásticas",
      "cat": "Equipamiento",
      "cost": 6500,
      "price": 0,
      "stock": 10,
      "min": 6
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 1600000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 200000,
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
      "amount": 266666,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Sueldos profesores",
      "cat": "Sueldos",
      "amount": 3800000,
      "day": 1
    },
    {
      "concept": "Mantenimiento de máquinas",
      "cat": "Proveedores",
      "amount": 220000,
      "day": 14
    },
    {
      "concept": "Limpieza",
      "cat": "Servicios",
      "amount": 380000,
      "day": 10
    }
  ]
}
export default cfg
