const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
export const money = (n: number) => fmt.format(Math.round(n))

/** Imagen de Unsplash optimizada para móvil */
export const img = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
