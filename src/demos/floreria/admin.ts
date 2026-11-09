import type { AdminConfig } from '../../admin/types'
const cfg: AdminConfig = {
  "name": "Lirio",
  "accent": "#c2416b",
  "kind": "shop",
  "perDay": [
    10,
    22
  ],
  "itemsPerSale": [
    1,
    2
  ],
  "hours": [
    9,
    20
  ],
  "closedDows": [],
  "channels": [
    "WhatsApp",
    "Local",
    "Instagram"
  ],
  "products": [
    {
      "name": "Ramo silvestre con girasoles",
      "cat": "Ramos",
      "cost": 14000,
      "price": 32900,
      "stock": 6,
      "min": 4
    },
    {
      "name": "Docena de rosas",
      "cat": "Rosas",
      "cost": 26000,
      "price": 54900,
      "stock": 8,
      "min": 5
    },
    {
      "name": "Box rosas y peonías",
      "cat": "Arreglos",
      "cost": 34000,
      "price": 69900,
      "stock": 3,
      "min": 2
    },
    {
      "name": "Tulipanes x 10",
      "cat": "Tulipanes",
      "cost": 21000,
      "price": 42900,
      "stock": 4,
      "min": 3
    },
    {
      "name": "Suculenta en maceta",
      "cat": "Plantas",
      "cost": 4200,
      "price": 9900,
      "stock": 20,
      "min": 8
    },
    {
      "name": "Rosa roja premium",
      "cat": "Rosas",
      "cost": 2200,
      "price": 5900,
      "stock": 60,
      "min": 30
    }
  ],
  "expenses": [
    {
      "concept": "Alquiler del local",
      "cat": "Alquiler",
      "amount": 520000,
      "day": 5,
      "provider": "Propietario"
    },
    {
      "concept": "Luz",
      "cat": "Servicios",
      "amount": 65000,
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
      "amount": 86666,
      "day": 20
    },
    {
      "concept": "Publicidad en redes",
      "cat": "Otros",
      "amount": 50000,
      "day": 22
    },
    {
      "concept": "Mercado de flores",
      "cat": "Proveedores",
      "amount": 1500000,
      "day": 3,
      "provider": "Mercado de Flores"
    },
    {
      "concept": "Papel, cintas y macetas",
      "cat": "Proveedores",
      "amount": 180000,
      "day": 10
    },
    {
      "concept": "Sueldo florista",
      "cat": "Sueldos",
      "amount": 750000,
      "day": 1
    }
  ]
}
export default cfg
