import type { AdminConfig } from './types'
import type { Vertical } from './verticals'

export type SaleItem = { name: string; qty: number; price: number; cost: number }
export type Sale = {
  id: string; date: Date; dayKey: string; time: string; customer: string; items: SaleItem[]
  total: number; cost: number; channel: string; pay: string; status: string; staff?: string
  /** servicios: duración en minutos y datos propios del rubro (mascota, obra social, propiedad…) */
  min?: number; extras?: { label: string; value: string }[]
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

/** Historial de 60 días determinístico para cada negocio (y, en servicios, la agenda de los próximos 6 días) */
export function generateSales(slug: string, cfg: AdminConfig, v?: Vertical): Sale[] {
  return cfg.kind === 'services' ? generateAgenda(slug, cfg, v) : generateOrders(slug, cfg)
}

function generateOrders(slug: string, cfg: AdminConfig): Sale[] {
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
    if (isToday) count = Math.max(2, Math.round(count * Math.min(1, Math.max(0.25, (now.getHours() - h0) / (h1 - h0)))))
    const times = Array.from({ length: count }, () => r.int(h0 * 60, h1 * 60 - 30)).sort((a, b) => a - b)
    for (const m of times) {
      const items: SaleItem[] = []
      const k = r.int(...(cfg.itemsPerSale ?? [1, 3]))
      for (let i = 0; i < k; i++) {
        const p = r.weighted(cfg.products.map((x, idx) => ({ ...x, weight: idx < 4 ? 3 : 1 })))
        const ex = items.find((x) => x.name === p.name)
        if (ex) ex.qty++
        else items.push({ name: p.name, qty: 1, price: p.price, cost: p.cost })
      }
      const time = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
      const minuteNow = now.getHours() * 60 + now.getMinutes()
      const status = !isToday ? (r.next() < 0.03 ? 'Cancelado' : 'Entregado') : m > minuteNow - 40 ? r.pick(['Nuevo', 'Nuevo', 'Preparando']) : m > minuteNow - 120 ? r.pick(['Preparando', 'Listo', 'Entregado']) : 'Entregado'
      const total = items.reduce((s, x) => s + x.price * x.qty, 0)
      out.push({ id: `#${++n}`, date: d, dayKey: dayKeyOf(d), time, customer: r.pick(NAMES), items, total, cost: items.reduce((s, x) => s + x.cost * x.qty, 0), channel: r.pick(cfg.channels), pay: r.pick(PAYS), status })
    }
  }
  return out
}

/**
 * Agenda realista: cada profesional tiene su columna sin superposiciones, cada servicio dura lo
 * que dura, y además de los últimos 60 días se generan los próximos 6 (turnos confirmados o
 * por confirmar). Estados: Atendido · Ausente · Confirmado · A confirmar.
 */
function generateAgenda(slug: string, cfg: AdminConfig, v?: Vertical): Sale[] {
  const r = rng(slug + ':agenda')
  const out: Sale[] = []
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const now = new Date()
  const minuteNow = now.getHours() * 60 + now.getMinutes()
  const [h0, h1] = cfg.hours ?? [9, 20]
  const staff = cfg.staff?.length ? cfg.staff : [undefined]
  const services = cfg.services ?? [{ name: 'Turno', price: 0 }]
  const dur = (name: string) => services.find((s) => s.name === name)?.min ?? v?.duration ?? 30
  const step = (v?.duration ?? 30) <= 20 ? 20 : 30
  const slotsPerDay = ((h1 - h0) * 60) / step
  const avgSlots = (v?.duration ?? 30) / step
  let n = 1000
  for (let back = 59; back >= -6; back--) {
    const d = new Date(today); d.setDate(today.getDate() - back)
    if (cfg.closedDows?.includes(d.getDay())) continue
    const weekendBoost = d.getDay() === 5 || d.getDay() === 6 ? 1.2 : 1
    const trend = 0.85 + ((60 - Math.max(back, 0)) / 60) * 0.25
    const target = r.int(cfg.perDay[0], cfg.perDay[1]) * weekendBoost * trend * (back < 0 ? 0.8 - (-back) * 0.07 : 1)
    const p = Math.min(0.92, Math.max(0.12, (target * avgSlots) / (staff.length * slotsPerDay)))
    for (const st of staff) {
      let m = h0 * 60
      while (m < h1 * 60) {
        if (r.next() >= p) { m += step; continue }
        const s = r.weighted(services)
        const len = dur(s.name)
        if (m + len > h1 * 60) break
        const items: SaleItem[] = [{ name: s.name, qty: 1, price: s.price, cost: Math.round(s.price * 0.12) }]
        let status: string
        if (back > 0 || (back === 0 && m + len <= minuteNow)) status = r.next() < 0.06 ? 'Ausente' : 'Atendido'
        else status = r.next() < (back === 0 ? 0.15 : 0.3) ? 'A confirmar' : 'Confirmado'
        const total = items[0].price
        out.push({
          id: `#${++n}`, date: d, dayKey: dayKeyOf(d), time: `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`,
          customer: r.pick(NAMES), items, total, cost: items[0].cost, channel: r.pick(cfg.channels), pay: r.pick(PAYS), status, staff: st,
          min: len, extras: v?.extras?.map((e) => ({ label: e.label, value: r.pick(e.values) })),
        })
        m = Math.ceil((m + len) / step) * step
      }
    }
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime() || a.time.localeCompare(b.time))
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
