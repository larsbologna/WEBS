export type ExpenseCat = 'Alquiler' | 'Proveedores' | 'Servicios' | 'Sueldos' | 'Impuestos' | 'Otros'

export type AdminConfig = {
  name: string
  accent: string
  /** tienda: vende productos del stock · servicios: vende turnos y usa insumos */
  kind: 'shop' | 'services'
  /** stock (tienda) o insumos (servicios). cost = costo unitario, price = precio de venta (solo tienda) */
  products: { name: string; cat: string; cost: number; price: number; stock: number; min: number; unit?: string }[]
  /** solo servicios: lo que se vende en cada turno */
  services?: { name: string; price: number; weight?: number }[]
  staff?: string[]
  /** cantidad de ventas/turnos por día [mín, máx] */
  perDay: [number, number]
  /** ítems por venta [mín, máx] (tiendas) */
  itemsPerSale?: [number, number]
  channels: string[]
  closedDows?: number[]
  hours?: [number, number]
  expenses: { concept: string; cat: ExpenseCat; amount: number; day: number; provider?: string }[]
}
