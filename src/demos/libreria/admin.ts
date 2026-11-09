import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Punto y Coma",
  "accent": "#d9542b",
  "kind": "shop",
  "perDay": [
    12,
    24
  ],
  "itemsPerSale": [
    1,
    4
  ],
  "hours": [
    9,
    20
  ],
  "closedDows": [
    0
  ],
  "channels": [
    "WhatsApp",
    "Local",
    "Instagram"
  ],
  "products": [
    {
      "name": "El jardín de los relojes",
      "cat": "Libros",
      "cost": 14900,
      "price": 24900,
      "stock": 12,
      "min": 4
    },
    {
      "name": "Lo que el río no dijo",
      "cat": "Libros",
      "cost": 13500,
      "price": 22500,
      "stock": 3,
      "min": 4
    },
    {
      "name": "Antología del cuento",
      "cat": "Libros",
      "cost": 9500,
      "price": 15900,
      "stock": 8,
      "min": 3
    },
    {
      "name": "El dragón que no quería volar",
      "cat": "Infantiles",
      "cost": 8900,
      "price": 14900,
      "stock": 10,
      "min": 4
    },
    {
      "name": "Cuaderno tapa dura 48 h",
      "cat": "Escolar",
      "cost": 2600,
      "price": 4900,
      "stock": 80,
      "min": 30
    },
    {
      "name": "Lápices de colores x 24",
      "cat": "Escolar",
      "cost": 4900,
      "price": 8900,
      "stock": 25,
      "min": 15
    },
    {
      "name": "Carpeta N° 3",
      "cat": "Escolar",
      "cost": 3800,
      "price": 6900,
      "stock": 9,
      "min": 15
    },
    {
      "name": "Agenda 2027",
      "cat": "Papelería",
      "cost": 8900,
      "price": 15900,
      "stock": 14,
      "min": 6
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 650000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 81250,
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
      "amount": 108333,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Editoriales y distribuidoras",
      "cat": "Proveedores",
      "amount": 1400000,
      "day": 8,
      "provider": "Distribuidora del Sur"
    },
    {
      "concept": "Sueldo vendedora",
      "cat": "Sueldos",
      "amount": 780000,
      "day": 1
    }
  ]
}
export default cfg
