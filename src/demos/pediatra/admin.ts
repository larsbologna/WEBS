import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Dra. Paula Correa",
  "accent": "#2bb3a3",
  "kind": "services",
  "perDay": [
    12,
    22
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
    "Dra. Correa"
  ],
  "services": [
    {
      "name": "Control niño sano",
      "price": 32000,
      "weight": 5
    },
    {
      "name": "Consulta por enfermedad",
      "price": 32000,
      "weight": 3
    },
    {
      "name": "Recién nacido",
      "price": 40000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Bajalenguas",
      "cat": "Descartables",
      "cost": 3500,
      "price": 0,
      "stock": 4,
      "min": 3,
      "unit": "cajas"
    },
    {
      "name": "Conos de otoscopio",
      "cat": "Descartables",
      "cost": 6500,
      "price": 0,
      "stock": 2,
      "min": 3,
      "unit": "cajas"
    },
    {
      "name": "Alcohol en gel",
      "cat": "Descartables",
      "cost": 4200,
      "price": 0,
      "stock": 6,
      "min": 4
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler de oficina",
      "cat": "Alquiler",
      "amount": 350000,
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
      "amount": 70000,
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
      "amount": 680000,
      "day": 1
    },
    {
      "concept": "Seguro de mala praxis",
      "cat": "Otros",
      "amount": 55000,
      "day": 25
    }
  ]
}
export default cfg
