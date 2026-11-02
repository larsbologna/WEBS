import type { AdminConfig } from './types'

export type SaleItem = { name: string; qty: number; price: number; cost: number }
export type Sale = {
  id: string; date: Date; dayKey: string; time: string; customer: string; items: SaleItem[]
  total: number; cost: number; channel: string; pay: string; status: string; staff?: string
}

const NAMES = ['Lucía Fernández', 'Martín Gómez', 'Sofía Romero', 'Juan Pérez', 'Valentina Díaz', 'Mateo Álvarez', 'Camila Torres', 'Nicolás Ruiz', 'Florencia Sosa', 'Agustín Benítez', 'Micaela Herrera', 'Tomás Acosta', 'Julieta Medina', 'Facundo Castro', 'Rocío Molina', 'Lautaro Suárez', 'Paula Ortiz', 'Gonzalo Ramos', 'Carla Giménez', 'Ezequiel Rojas', 'Brenda Luna', 'Santiago Vera', 'Milagros Ríos', 'Diego Navarro']
const PAYS = ['Efectivo', 'Transferencia', 'Mercado Pago', 'Débito', 'Crédito']

export function rng(seedStr: string) {
  let h = 1779033703 ^ seedStr.length
  for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19) }
  let a = h >>> 0
  const next = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  return {
    next,
    int: (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min,
    pick: <T,>(arr: T[]) => arr[Math.floor(next() * arr.length)],
    weighted: <T extends { weight?: number }>(arr: T[]) => {
      const tot = arr.reduce((s, x) => s + (x.weight ?? 1), 0)
      let r = next() * tot
      for (const x of arr) { r -= x.weight ?? 1; if (r <= 0) return x }
      return arr[arr.length - 1]
    },
  }
}

export const dayKeyOf = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Historial de 60 días determinístico para cada negocio */
export function generateSales(slug: string, cfg: AdminConfig): Sale[] {
  const r = rng(slug + ':sales')
  const out: Sale[] = []
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const now = new Date()
  const [h0, h1] = cfg.hours ?? [9, 20]
  let n = 1000
  for (let back = 59; back >= 0; back--) {
    const d = new Date(today); d.setDate(today.getDate() - back)
    if (cfg.closedDows?.includes(d.getDay())) continue
    const weekendBoost = d.getDay() === 5 || d.getDay() === 6 ? 1.3 : 1
    const trend = 0.85 + ((60 - back) / 60) * 0.25 // leve crecimiento
    let count = Math.round(r.int(cfg.perDay[0], cfg.perDay[1]) * weekendBoost * trend)
    const isToday = back === 0
    if (isToday && cfg.kind === 'shop') count = Math.max(2, Math.round(count * Math.min(1, Math.max(0.25, (now.getHours() - h0) / (h1 - h0)))))
    const times = Array.from({ length: count }, () => r.int(h0 * 60, h1 * 60 - 30)).sort((a, b) => a - b)
    for (const m of times) {
      const items: SaleItem[] = []
      if (cfg.kind === 'shop') {
        const k = r.int(...(cfg.itemsPerSale ?? [1, 3]))
        for (let i = 0; i < k; i++) {
          const p = r.weighted(cfg.products.map((x, idx) => ({ ...x, weight: idx < 4 ? 3 : 1 })))
          const ex = items.find((x) => x.name === p.name)
          if (ex) ex.qty++
          else items.push({ name: p.name, qty: 1, price: p.price, cost: p.cost })
        }
      } else {
        const s = r.weighted(cfg.services!)
        items.push({ name: s.name, qty: 1, price: s.price, cost: Math.round(s.price * 0.12) })
        if (r.next() < 0.15) { const s2 = r.weighted(cfg.services!); if (s2.name !== s.name) items.push({ name: s2.name, qty: 1, price: s2.price, cost: Math.round(s2.price * 0.12) }) }
      }
      const time = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60 - (m % 60) % (cfg.kind === 'services' ? 30 : 1)).padStart(2, '0')}`
      const minuteNow = now.getHours() * 60 + now.getMinutes()
      let status: string
      if (cfg.kind === 'shop') {
        status = !isToday ? (r.next() < 0.03 ? 'Cancelado' : 'Entregado') : m > minuteNow - 40 ? r.pick(['Nuevo', 'Nuevo', 'Preparando']) : m > minuteNow - 120 ? r.pick(['Preparando', 'Listo', 'Entregado']) : 'Entregado'
      } else {
        status = isToday && m > minuteNow ? 'Confirmado' : r.next() < 0.05 ? 'Ausente' : 'Atendido'
      }
      const total = items.reduce((s, x) => s + x.price * x.qty, 0)
      out.push({
        id: `#${++n}`, date: d, dayKey: dayKeyOf(d), time, customer: r.pick(NAMES), items, total,
        cost: items.reduce((s, x) => s + x.cost * x.qty, 0), channel: r.pick(cfg.channels), pay: r.pick(PAYS), status,
        staff: cfg.staff ? r.pick(cfg.staff) : undefined,
      })
    }
  }
  return out
}

export type Expense = { id: string; concept: string; cat: string; amount: number; due: Date; provider?: string; paid: boolean; custom?: boolean }

export function generateExpenses(slug: string, cfg: AdminConfig): Expense[] {
  const r = rng(slug + ':exp')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return cfg.expenses.map((e, i) => {
    // vencimientos repartidos alrededor de hoy (≈ -14 a +13 días) para que la demo siempre muestre pagos hechos, vencidos y por vencer
    const due = new Date(today); due.setDate(today.getDate() + Math.min(e.day, 28) - 15)
    const daysPast = (today.getTime() - due.getTime()) / 864e5
    const paid = daysPast > 2 ? r.next() < 0.85 : daysPast > 0 ? r.next() < 0.5 : false
    return { id: `e${i}`, ...e, due, paid }
  })
}
