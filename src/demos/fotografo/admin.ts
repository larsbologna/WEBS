import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Tomás Ibarra",
  "accent": "#c9a96e",
  "kind": "services",
  "perDay": [
    1,
    4
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
    "Tomás",
    "Segundo fotógrafo"
  ],
  "services": [
    {
      "name": "Boda",
      "price": 950000,
      "weight": 0.4
    },
    {
      "name": "Book",
      "price": 180000,
      "weight": 2
    },
    {
      "name": "Sesión familiar",
      "price": 160000,
      "weight": 2
    },
    {
      "name": "Alquiler de estudio (hora)",
      "price": 45000,
      "weight": 2
    }
  ],
  "products": [
    {
      "name": "Tarjetas SD 128 GB",
      "cat": "Equipo",
      "cost": 32000,
      "price": 0,
      "stock": 4,
      "min": 4
    },
    {
      "name": "Baterías de cámara",
      "cat": "Equipo",
      "cost": 45000,
      "price": 0,
      "stock": 3,
      "min": 4
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler de oficina",
      "cat": "Alquiler",
      "amount": 280000,
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
      "concept": "Segundo fotógrafo",
      "cat": "Sueldos",
      "amount": 400000,
      "day": 1
    },
    {
      "concept": "Almacenamiento en la nube",
      "cat": "Servicios",
      "amount": 25000,
      "day": 3
    },
    {
      "concept": "Mantenimiento de equipo",
      "cat": "Proveedores",
      "amount": 80000,
      "day": 14
    }
  ]
}
export default cfg
