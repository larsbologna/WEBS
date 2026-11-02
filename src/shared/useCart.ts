import { useCallback, useEffect, useMemo, useState } from 'react'
import { safeRead, safeWrite } from './store'

export type CartLine = {
  key: string // identifica variante (ej: pizza grande + extra queso)
  name: string
  price: number // precio unitario final
  qty: number
  image?: string
  detail?: string
  unit?: string // "u", "kg", "g"
  step?: number // incremento de cantidad (ej 0.25 kg)
}

/** Carrito demostrativo persistido en localStorage por demo */
export function useCart(demoId: string) {
  const storageKey = `demo-cart:${demoId}`
  const [lines, setLines] = useState<CartLine[]>(() => safeRead(storageKey, []))

  useEffect(() => safeWrite(storageKey, lines), [lines, storageKey])

  const add = useCallback((line: Omit<CartLine, 'qty'> & { qty?: number }) => {
    setLines((ls) => {
      const q = line.qty ?? line.step ?? 1
      const found = ls.find((l) => l.key === line.key)
      if (found) return ls.map((l) => (l.key === line.key ? { ...l, qty: round(l.qty + q) } : l))
      return [...ls, { ...line, qty: q }]
    })
  }, [])

  const inc = useCallback((key: string, dir: 1 | -1) => {
    setLines((ls) =>
      ls
        .map((l) => (l.key === key ? { ...l, qty: round(l.qty + dir * (l.step ?? 1)) } : l))
        .filter((l) => l.qty > 0.0001),
    )
  }, [])

  const remove = useCallback((key: string) => setLines((ls) => ls.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])

  const total = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines])
  const count = useMemo(() => lines.reduce((s, l) => s + (l.step && l.step < 1 ? 1 : l.qty), 0), [lines])

  return { lines, add, inc, remove, clear, total, count }
}

const round = (n: number) => Math.round(n * 1000) / 1000
export type Cart = ReturnType<typeof useCart>

/** Arma el texto del pedido como se enviaría por WhatsApp */
export function orderText(business: string, lines: CartLine[], total: number, extra: string[] = []) {
  const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
  const body = lines
    .map((l) => {
      const q = l.unit && l.unit !== 'u' ? `${formatQty(l.qty, l.unit)}` : `${l.qty}x`
      return `• ${q} ${l.name}${l.detail ? ` (${l.detail})` : ''} — ${fmt.format(l.price * l.qty)}`
    })
    .join('\n')
  return [`¡Hola ${business}! Quiero hacer este pedido:`, '', body, '', `*Total: ${fmt.format(total)}*`, ...extra].join('\n')
}

export function formatQty(qty: number, unit?: string) {
  if (unit === 'kg') return qty < 1 ? `${Math.round(qty * 1000)} g` : `${qty.toLocaleString('es-AR')} kg`
  if (unit === 'u' || !unit) return `${qty}`
  return `${qty} ${unit}`
}
