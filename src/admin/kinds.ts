/** Rubros que venden productos (pedidos + stock). El resto trabaja con agenda de turnos. */
const SHOPS = new Set(['restaurante', 'pizzeria', 'cafeteria', 'ropa', 'perfumeria', 'dietetica', 'tecnologia', 'iphones', 'petshop', 'libreria', 'ferreteria', 'floreria'])
export const KIND = (slug: string): 'shop' | 'services' => (SHOPS.has(slug) ? 'shop' : 'services')
