import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Escribanía Ledesma",
  "accent": "#1f3a68",
  "kind": "services",
  "perDay": [
    10,
    20
  ],
  "hours": [
    9,
    17
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
    "Esc. Ledesma",
    "Esc. adscripta"
  ],
  "services": [
    {
      "name": "Certificación de firma",
      "price": 25000,
      "weight": 5
    },
    {
      "name": "Poder",
      "price": 65000,
      "weight": 2
    },
    {
      "name": "Escritura (honorarios)",
      "price": 1200000,
      "weight": 0.4
    },
    {
      "name": "Autorización de viaje",
      "price": 45000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Folios notariales",
      "cat": "Insumos",
      "cost": 2500,
      "price": 0,
      "stock": 80,
      "min": 100
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
      "amount": 650000,
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
      "amount": 130000,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Empleados (2)",
      "cat": "Sueldos",
      "amount": 1600000,
      "day": 1
    },
    {
      "concept": "Colegio de Escribanos",
      "cat": "Otros",
      "amount": 120000,
      "day": 25
    },
    {
      "concept": "Folios de actuación notarial",
      "cat": "Proveedores",
      "amount": 160000,
      "day": 9
    }
  ]
}
export default cfg
