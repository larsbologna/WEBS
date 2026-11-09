import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Kinesio Movimiento",
  "accent": "#ff6a3d",
  "kind": "services",
  "perDay": [
    14,
    24
  ],
  "hours": [
    8,
    20
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
    "Tomás",
    "Carla"
  ],
  "services": [
    {
      "name": "Sesión de kinesiología",
      "price": 20000,
      "weight": 6
    },
    {
      "name": "RPG",
      "price": 22000,
      "weight": 2
    },
    {
      "name": "Masoterapia",
      "price": 18000,
      "weight": 2
    }
  ],
  "products": [
    {
      "name": "Gel conductor",
      "cat": "Insumos",
      "cost": 6500,
      "price": 0,
      "stock": 5,
      "min": 4
    },
    {
      "name": "Electrodos",
      "cat": "Insumos",
      "cost": 9800,
      "price": 0,
      "stock": 3,
      "min": 4,
      "unit": "packs"
    },
    {
      "name": "Sábanas descartables",
      "cat": "Descartables",
      "cost": 12000,
      "price": 0,
      "stock": 6,
      "min": 4,
      "unit": "rollos"
    },
    {
      "name": "Bandas elásticas",
      "cat": "Equipamiento",
      "cost": 7500,
      "price": 0,
      "stock": 8,
      "min": 4
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 380000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 47500,
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
      "amount": 63333,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Kinesióloga asociada",
      "cat": "Sueldos",
      "amount": 900000,
      "day": 1
    },
    {
      "concept": "Mantenimiento de equipos",
      "cat": "Proveedores",
      "amount": 90000,
      "day": 14
    }
  ]
}
export default cfg
