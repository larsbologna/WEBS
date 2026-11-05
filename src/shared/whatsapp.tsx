import type { CSSProperties, ReactNode } from 'react'
import { DEMOS } from '../demos/meta'
import { orderText, type CartLine } from './useCart'
import { cx } from './format'

/**
 * Número de WhatsApp de cada negocio (formato internacional, solo dígitos: 5491112345678).
 * Se toma de `whatsapp` en src/demos/meta.ts. Si está vacío, WhatsApp abre el mensaje
 * armado y deja elegir a quién mandarlo (útil para mostrar la demo).
 */
export function whatsappLink(text: string, phone = '') {
  const n = phone.replace(/\D/g, '')
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
    </svg>
  )
}

/**
 * Botón final del carrito: abre WhatsApp con el pedido armado (productos, cantidades,
 * precios y total). Envío, pago y stock los coordina el negocio por el chat.
 */
export function WhatsAppOrderButton({ slug, business, lines, total, extra = [], text, className, style, children, note = true }: {
  slug: string; business: string; lines: CartLine[]; total: number; extra?: string[]
  /** Mensaje completo, si el pedido no se arma con el formato estándar (p. ej. precios en dólares). */
  text?: string
  className?: string; style?: CSSProperties; children?: ReactNode; note?: boolean
}) {
  const phone = DEMOS.find((d) => d.slug === slug)?.whatsapp ?? ''
  const href = whatsappLink(text ?? orderText(business, lines, total, extra), phone)
  return (
    <>
      <a
        href={lines.length ? href : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!lines.length}
        className={cx('flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] py-4 font-extrabold text-white transition hover:brightness-105 active:scale-[.98]', !lines.length && 'pointer-events-none opacity-40', className)}
        style={style}
      >
        <WhatsAppIcon className="h-5 w-5" />
        {children ?? 'Pedir por WhatsApp'}
      </a>
      {note && <p className="mt-2 text-center text-[12px] leading-snug opacity-60">Se abre WhatsApp con tu pedido armado. Ahí te confirmamos stock, entrega y forma de pago.</p>}
    </>
  )
}
