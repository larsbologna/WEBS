import { BookOpen, Gift, PencilLine } from 'lucide-react'
import { ShopTemplate, type ShopConfig } from '../../shared/templates/ShopTemplate'

const cfg: ShopConfig = {
  slug: 'libreria',
  name: 'Punto y Coma',
  logo: BookOpen,
  theme: {
    bg: '#fbf6ee', surface: '#ffffff', ink: '#2b2118', muted: '#76675a', accent: '#d9542b', accentInk: '#ffffff', soft: '#f7e2d6', line: '#ece2d4', dark: '#2b2118',
    fonts: 'family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,500&family=DM+Sans:wght@400;500;600;700',
    display: '"Fraunces", serif', body: '"DM Sans", sans-serif', shape: 'soft', italic: true,
  },
  announce: '📚 Armá tu pedido y lo cerrás por WhatsApp · Te separamos los libros',
  hero: {
    kicker: 'Librería y papelería de barrio',
    title: 'Historias para *leer*, útiles para *crear*.',
    text: 'Novedades, clásicos, libros infantiles y todo lo que necesitás para el cole. Elegí online y pasá a retirar o te lo llevamos.',
    images: ['1529473814998-077b4fec6770', '1531988042231-d39a9cc12a9a', '1544716278-ca5e3f4abd8c'],
    cta: 'Ver el catálogo', layout: 'collage',
  },
  categories: [
    { name: 'Novedades', img: '1497633762265-9d179a990aa6' },
    { name: 'Clásicos', img: '1474932430478-367dbb6832c1' },
    { name: 'Infantiles', img: '1491841550275-ad7854e35ca6' },
    { name: 'Escolar', img: '1503676260728-1c00da094a0b' },
    { name: 'Papelería', img: '1456735190827-d1262f71b8a3' },
    { name: 'Para regalar', img: '1576872381149-7847515ce5d8' },
  ],
  featuredTitle: 'Lo más *leído* del mes',
  products: [
    { id: 'n1', name: 'El jardín de los relojes', brand: 'Mara Ledesma', cat: 'Novedades', price: 24900, img: '1589998059171-988d887df646', tag: 'Más vendido', desc: 'Una novela sobre tres generaciones de una familia de relojeros en un pueblo de la costa. Tapa blanda, 312 páginas.' },
    { id: 'n2', name: 'Lo que el río no dijo', brand: 'Joaquín Ferro', cat: 'Novedades', price: 22500, img: '1543002588-bfa74002ed7e', tag: 'Nuevo', desc: 'Thriller ambientado en el delta. Ideal para leer de un tirón. 280 páginas.' },
    { id: 'n3', name: 'Cuadernos de viaje', brand: 'Inés Arrieta', cat: 'Novedades', price: 27900, img: '1456513080510-7bf3a84b82f8', desc: 'Crónicas de viaje por el norte argentino, con fotos e ilustraciones. 240 páginas.' },
    { id: 'n4', name: 'Pequeños hábitos, grandes cambios', brand: 'Lucía Benítez', cat: 'Novedades', price: 19900, was: 23900, img: '1509266272358-7701da638078', desc: 'Guía práctica de bienestar y organización personal. 196 páginas.' },
    { id: 'c1', name: 'Antología del cuento latinoamericano', brand: 'Edición de bolsillo', cat: 'Clásicos', price: 15900, img: '1476275466078-4007374efbbe', desc: 'Treinta cuentos esenciales de autores clásicos de la región. 420 páginas.' },
    { id: 'c2', name: 'Poesía reunida', brand: 'Edición ilustrada', cat: 'Clásicos', price: 18500, img: '1490633874781-1c63cc424610', tag: 'Recomendado', desc: 'Selección de poemas clásicos en edición cuidada, ideal para regalar.' },
    { id: 'c3', name: 'Colección clásicos x 3', brand: 'Tapa dura', cat: 'Clásicos', price: 42900, img: '1550399105-c4db5fb85c18', desc: 'Tres títulos clásicos de la literatura universal en tapa dura.' },
    { id: 'i1', name: 'El dragón que no quería volar', brand: 'Infantil · 4 a 7 años', cat: 'Infantiles', price: 14900, img: '1513475382585-d06e58bcb0e0', tag: 'Para los chicos', desc: 'Cuento ilustrado sobre animarse a probar cosas nuevas. Tapa dura.' },
    { id: 'i2', name: 'Aventuras en la biblioteca', brand: 'Infantil · 8 a 12 años', cat: 'Infantiles', price: 16900, img: '1516979187457-637abb4f9353', desc: 'Novela juvenil de misterio con capítulos cortos.' },
    { id: 'i3', name: 'Mi primer libro de cuentos', brand: 'Infantil · 2 a 5 años', cat: 'Infantiles', price: 12900, img: '1535905557558-afc4877a26fc', desc: 'Diez cuentos cortos para leer antes de dormir.' },
    { id: 'e1', name: 'Cuaderno tapa dura 48 hojas', brand: 'Rayado / cuadriculado', cat: 'Escolar', price: 4900, img: '1531346878377-a5be20888e57', options: { label: 'Hojas', values: ['Rayadas', 'Cuadriculadas'] }, desc: 'Cuaderno escolar tapa dura forrado, 48 hojas.' },
    { id: 'e2', name: 'Lápices de colores x 24', brand: 'Largos', cat: 'Escolar', price: 8900, img: '1513542789411-b6a5d4f31634', tag: 'Vuelta al cole', desc: 'Lápices de colores largos con mina resistente.' },
    { id: 'e3', name: 'Carpeta N° 3 con anillos', brand: 'Escolar', cat: 'Escolar', price: 6900, img: '1517842645767-c639042777db', options: { label: 'Color', values: ['Azul', 'Roja', 'Verde', 'Negra'] }, desc: 'Carpeta escolar N° 3 con 3 anillos y elástico.' },
    { id: 'e4', name: 'Kit escolar completo', brand: 'Primaria', cat: 'Escolar', price: 29900, was: 34900, img: '1503676260728-1c00da094a0b', desc: 'Cuaderno, carpeta, lápices, goma, regla, tijera, plasticola y cartuchera.' },
    { id: 'p1', name: 'Agenda 2027 semanal', brand: 'Tapa dura', cat: 'Papelería', price: 15900, img: '1471107340929-a87cd0f5b5f3', tag: 'Nuevo', desc: 'Agenda semanal con planificador mensual y hojas de notas.' },
    { id: 'p2', name: 'Lapicera de tinta', brand: 'Trazo fino', cat: 'Papelería', price: 5900, img: '1585336261022-680e295ce3fe', desc: 'Lapicera de tinta azul con trazo suave.' },
    { id: 'p3', name: 'Libreta de notas', brand: 'Hojas lisas', cat: 'Papelería', price: 7500, img: '1583485088034-697b5bc54ccd', desc: 'Libreta A5 de hojas lisas, ideal para bocetos y notas.' },
    { id: 'p4', name: 'Set de cintas y washi tape', brand: 'Decoración', cat: 'Papelería', price: 6500, img: '1452860606245-08befc0ff44b', desc: 'Cintas decoradas para cuadernos, agendas y regalos.' },
    { id: 'r1', name: 'Tote bag de lona', brand: 'Punto y Coma', cat: 'Para regalar', price: 9900, img: '1544816155-12df9643f363', desc: 'Bolsa de lona resistente para llevar tus libros.' },
    { id: 'r2', name: 'Gift card', brand: 'Para regalar', cat: 'Para regalar', price: 20000, img: '1576872381149-7847515ce5d8', desc: 'Tarjeta de regalo para elegir cualquier libro o producto del local.' },
  ],
  features: [
    { icon: BookOpen, t: 'Te separamos los libros', d: 'Pedís online y lo retirás cuando quieras' },
    { icon: PencilLine, t: 'Lista escolar', d: 'Mandala y te la presupuestamos' },
    { icon: Gift, t: 'Envolvemos para regalo', d: 'Sin cargo, con dedicatoria' },
  ],
  special: {
    kicker: 'Vuelta al cole',
    title: 'Mandanos la *lista escolar*',
    text: 'Pegá o escribí la lista del colegio y te la presupuestamos completa. Te la dejamos lista para retirar.',
    placeholder: 'Ej: 2 cuadernos tapa dura rayados, 1 carpeta N° 3, lápices de colores x 12…',
    button: 'Enviar lista por WhatsApp',
    message: (txt) => `¡Hola Punto y Coma! Les paso la lista escolar para que me la presupuesten:\n\n${txt}`,
    image: '1588072432836-e10032774350',
  },
  cartNote: { label: '¿Es para regalo? Dejanos la dedicatoria', placeholder: 'Ej: Feliz cumple, Lu. ¡Que lo disfrutes!', prefix: '🎁 Para regalo, con dedicatoria:' },
  info: { address: 'Av. 14 N° 4120', city: 'Berazategui', hours: ['Lunes a sábado', '9 a 13 y 16 a 20 h'], instagram: '@puntoycoma.libreria', note: 'Librería y papelería de barrio desde 1998.' },
  tips: {
    categories: 'el cliente ve qué tenés antes de venir: menos "¿tenés tal libro?" por mensaje y más ventas.',
    catalog: 'precios a la vista y botón de agregar: el pedido te llega armado por WhatsApp, listo para separar.',
    special: 'en febrero y marzo la lista escolar es tu mejor venta: te llega escrita y la presupuestás sin cortar el mostrador.',
  },
}

export default function Libreria() {
  return <ShopTemplate cfg={cfg} />
}
