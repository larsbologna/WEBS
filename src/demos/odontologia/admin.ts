import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Dra. Sofía Méndez",
  "accent": "#0e8fa8",
  "kind": "services",
  "perDay": [
    8,
    14
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
    "Dra. Méndez",
    "Dr. Paz"
  ],
  "services": [
    {
      "name": "Control y limpieza",
      "price": 35000,
      "weight": 4
    },
    {
      "name": "Arreglo de caries",
      "price": 45000,
      "weight": 3
    },
    {
      "name": "Blanqueamiento",
      "price": 120000,
      "weight": 1
    },
    {
      "name": "Ortodoncia (control)",
      "price": 60000,
      "weight": 2
    },
    {
      "name": "Urgencia",
      "price": 40000,
      "weight": 1
    }
  ],
  "products": [
    {
      "name": "Anestesia (carpules)",
      "cat": "Insumos",
      "cost": 18000,
      "price": 0,
      "stock": 6,
      "min": 4,
      "unit": "cajas"
    },
    {
      "name": "Resinas compuestas",
      "cat": "Insumos",
      "cost": 32000,
      "price": 0,
      "stock": 3,
      "min": 3
    },
    {
      "name": "Guantes de nitrilo",
      "cat": "Descartables",
      "cost": 9500,
      "price": 0,
      "stock": 8,
      "min": 5,
      "unit": "cajas"
    },
    {
      "name": "Gel de blanqueamiento",
      "cat": "Insumos",
      "cost": 42000,
      "price": 0,
      "stock": 2,
      "min": 2
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 450000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 56250,
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
      "amount": 75000,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Laboratorio dental",
      "cat": "Proveedores",
      "amount": 420000,
      "day": 12,
      "provider": "Lab. Dental Sur"
    },
    {
      "concept": "Asistente",
      "cat": "Sueldos",
      "amount": 720000,
      "day": 1
    },
    {
      "concept": "Matrícula y seguro de mala praxis",
      "cat": "Otros",
      "amount": 85000,
      "day": 25
    }
  ]
}
export default cfg
