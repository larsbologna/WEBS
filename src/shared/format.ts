const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
export const money = (n: number) => fmt.format(Math.round(n))

/**
 * Imagen de un producto o sección. Acepta un id de Unsplash (optimizado para móvil) o
 * una foto propia guardada en public/ ("fotos/<tienda>/<producto>.jpg").
 */
export const img = (id: string, w = 800, h?: number) =>
  id.startsWith('fotos/')
    ? `${import.meta.env.BASE_URL}${id}`
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
