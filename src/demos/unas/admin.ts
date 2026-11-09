import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Coral Nail Bar",
  "accent": "#e8735a",
  "kind": "services",
  "perDay": [
    12,
    20
  ],
  "hours": [
    10,
    20
  ],
  "closedDows": [
    0
  ],
  "channels": [
    "Web",
    "WhatsApp",
    "Instagram"
  ],
  "staff": [
    "Meli",
    "Caro",
    "Juli"
  ],
  "services": [
    {
      "name": "Semipermanente",
      "price": 12000,
      "weight": 4
    },
    {
      "name": "Kapping en gel",
      "price": 16000,
      "weight": 3
    },
    {
      "name": "Esculpidas",
      "price": 22000,
      "weight": 2
    },
    {
      "name": "Spa de manos",
      "price": 10000,
      "weight": 1
    },
    {
      "name": "Pedicura spa",
      "price": 15000,
      "weight": 2
    }
  ],
  "products": [
    {
      "name": "Esmaltes semipermanentes",
      "cat": "Insumos",
      "cost": 6500,
      "price": 0,
      "stock": 48,
      "min": 20
    },
    {
      "name": "Gel constructor",
      "cat": "Insumos",
      "cost": 14000,
      "price": 0,
      "stock": 5,
      "min": 4
    },
    {
      "name": "Acrílico en polvo",
      "cat": "Insumos",
      "cost": 18000,
      "price": 0,
      "stock": 2,
      "min": 3
    },
    {
      "name": "Limas descartables x50",
      "cat": "Descartables",
      "cost": 5200,
      "price": 0,
      "stock": 9,
      "min": 5,
      "unit": "paquetes"
    },
    {
      "name": "Algodón y removedor",
      "cat": "Descartables",
      "cost": 4800,
      "price": 0,
      "stock": 7,
      "min": 4
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 480000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 60000,
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
      "amount": 80000,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Comisiones manicuras (45%)",
      "cat": "Sueldos",
      "amount": 2100000,
      "day": 1
    },
    {
      "concept": "Insumos y descartables",
      "cat": "Proveedores",
      "amount": 260000,
      "day": 9,
      "provider": "Distribuidora Nails Pro"
    }
  ]
}
export default cfg
