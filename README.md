# Showroom de webs comerciales — Iván | Gestor de Presencia Online

Herramienta de venta: 13 demos interactivas, cada una con su panel de administración, de páginas web para comercios locales, pensadas para mostrar desde el celular en menos de dos minutos.

> Son **demostraciones comerciales**. Negocios, productos, precios, profesionales y reseñas son ficticios. No hay backend: pedidos, turnos, pagos y WhatsApp están simulados visualmente.

## Cómo usarlo en una visita

1. Abrí el showroom en el celular (`/#/showroom`).
2. Buscá el rubro del comercio o filtrá por categoría y tocá **Ver demostración**.
3. Dentro de cada demo, el botón flotante **Showroom** (abajo a la izquierda) permite:
   - volver al showroom,
   - pasar a la demo siguiente o anterior,
   - activar o desactivar las **notas de beneficios** (etiquetas violetas "Para tu negocio: …" que explican al comerciante para qué sirve cada sección). Conviene apagarlas para que el dueño vea la web "limpia" y prenderlas para argumentar.
4. **Panel de administración:** botón **Panel** en cada tarjeta del showroom, o "Panel de administración" en el menú flotante (ruta `/#/demo/<rubro>/admin`). Muestra cómo el dueño vería su negocio: ingresos, ganancia neta, gráfico diario, lo más vendido, pedidos o agenda, stock con márgenes y pedidos al proveedor, y pagos del mes (alquiler, proveedores, servicios, sueldos, impuestos) que se marcan como pagados. El ingreso es de demostración: tocá "Ingresar".
5. Cada carrito, favorito o turno de prueba queda guardado en el navegador del celular (localStorage), así que la demo se puede retomar.

## Ejecutar en tu computadora

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de producción y vista previa:

```bash
npm run build      # genera /dist
npm run preview    # http://localhost:4173
```

## Publicar

El proyecto usa `HashRouter` y `base: './'`, así que funciona en cualquier hosting estático sin configurar redirecciones.

### Opción A: Vercel (la más simple)
1. Subí el proyecto a un repositorio de GitHub.
2. En vercel.com: **Add New → Project →** elegí el repo.
3. Vercel detecta Vite automáticamente (build `npm run build`, salida `dist`). Tocá **Deploy**.
4. Opcional: en **Settings → Domains** conectá un dominio propio (ej. `ivanweb.com.ar`).

### Opción B: GitHub Pages
1. Subí el proyecto a GitHub en la rama `main`.
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. El workflow incluido (`.github/workflows/deploy.yml`) compila y publica en cada push. La URL queda como `https://<usuario>.github.io/<repo>/`.

### Antes de usarlo con clientes
- Cambiá tu número real en `src/demos/meta.ts` (`BRAND.whatsapp`) si querés mostrarlo, y el texto del botón "Hablemos de tu web" en `src/showroom/Showroom.tsx`.
- Las fotos se cargan desde Unsplash por internet. Si alguna no carga, la tarjeta muestra un fondo de color con su nombre, así que la demo nunca queda rota.

## Estructura

```
src/
  App.tsx                 rutas (/showroom y /demo/:slug, carga diferida por demo)
  showroom/Showroom.tsx   página principal con buscador, filtros y tarjetas
  demos/meta.ts           listado de demos (nombre, rubro, categoría, imagen)
  demos/<slug>/index.tsx  cada demo, con su identidad visual propia
  shared/                 carrito, turnos, toasts, modal de WhatsApp, botón flotante
  admin/                  panel de administración compartido (datos de ejemplo determinísticos)
  demos/<slug>/admin.ts   configuración del panel de cada negocio (productos, insumos, servicios, gastos)
```

Para agregar un rubro nuevo: creá `src/demos/<slug>/index.tsx` y `admin.ts`, y sumá su entrada en `meta.ts`. Las rutas se registran solas.

## Resumen de funcionalidades por rubro

| # | Rubro | Negocio | Identidad visual | Funciones |
|---|---|---|---|---|
| 01 | Restaurante | Casa del Sabor | Bodegón moderno, crema y terracota, Playfair Display | Portada con estado "abierto/cerrado" en tiempo real, promos destacadas que se agregan al pedido, menú por categorías con fotos y precios, filtro veggie, ficha de plato con punto de cocción o salsa y selector de cantidad, carrito con delivery o retiro, envío gratis desde un monto, forma de pago, pedido armado por WhatsApp, reseñas, mapa, horarios con el día de hoy resaltado |
| 02 | Pizzería | Forno Napoli | Oscuro, rojo tomate, Anton | Catálogo por variedad, armador de pizza (3 tamaños, **mitad y mitad** con pizza ilustrada, masa, adicionales), combos con % de ahorro, acompañamientos, carrito, confirmación con **seguimiento del pedido** (recibido → en el horno → en camino → entregado) y resumen por WhatsApp |
| 03 | Cafetería | Moka Café | Editorial cálido, imágenes en arco, Fraunces | Destacados, combos por horario, carta digital por categorías, café personalizable (tamaño y tipo de leche), pedido para llevar con horario de retiro, **ticket con código para retirar sin fila**, tarjeta de sellos digital (Club Moka), info del local (wifi, enchufes, pet friendly) |
| 04 | Barbería | Aurum Barber Club | Negro y dorado premium, Cinzel | Carta de servicios con duración y precio, perfiles de barberos, galería filtrable con visor, **reserva en 4 pasos** (servicios múltiples, barbero, calendario de 14 días, horarios libres/ocupados, datos), confirmación, recordatorio por WhatsApp, aviso de "tu próximo turno" con cancelación |
| 05 | Peluquería | Studio Bella | Rosa nude, Cormorant Garamond | Selector de servicios por categoría (cortes, coloración, tratamientos, peinados) con barra de resumen, **comparador antes/después deslizable**, equipo, reserva con **calendario mensual**, horarios de mañana y tarde, estilista preferida, consulta por WhatsApp |
| 06 | Tienda de ropa | Distrito Clothing | E-commerce urbano en blanco y negro con naranja, Archivo Black | Buscador, categorías, filtros y orden (precio, ofertas), favoritos, ficha con color, talle (con stock y guía de talles), carrito con barra de envío gratis, **checkout en 3 pasos** (datos, entrega, pago), cupón `DISTRITO10`, 10% off por transferencia, confirmación de compra |
| 07 | Perfumería | Essence Store | Lujo editorial marfil y ciruela, Bodoni Moda | Marcas, categorías por género, destacados, filtros por familia olfativa, marca y precio, ficha con galería, **pirámide olfativa**, duración, estela y tamaño, promo automática del 20% en la 2.ª fragancia, envoltorio de regalo con tarjeta, **test "encontrá tu fragancia"** |
| 08 | Dietética | Natural Market | Natural kraft, Nunito y Caveat | Buscador, categorías con íconos, filtros (Sin TACC, vegano, orgánico, keto, ofertas), **venta por peso** (100 g a 1 kg y ajuste de a 50 g con precio en vivo), productos por unidad, ofertas con **cuenta regresiva**, retiro o envío, simulación de armado del pedido y WhatsApp |
| 09 | Óptica | Visión Óptica | Clínico moderno blanco y azul, Outfit | **Guía por forma de rostro** que filtra estilos, catálogo de recetados y de sol, filtros por estilo, ficha con color y cristales (estimación de precio), "mi selección" para probar en el local, servicios ópticos, **solicitud de turno** con motivo y obra social, contacto |
| 10 | Veterinaria | Huellitas Veterinaria | Cálido y amigable, verde azulado y naranja, Baloo 2 | Servicios con precio orientativo, **calculadora de vacunas** (perro o gato, según fecha de nacimiento), profesionales con matrícula, cómo atendemos y preguntas frecuentes, consejos con artículos, **turno con perfil de mascota** (especie, nombre, servicio, opción a domicilio), modal de guardia 24 h, WhatsApp |

| 11 | Tecnología | Conecta Tech | Retail tech blanco y cobalto, Plus Jakarta Sans + mono | Buscador con sugerencias, 8 categorías (cables, streaming, cargadores, almacenamiento, audio, periféricos, redes, gaming), **asistente "¿qué cable necesito?"**, stock visible y "últimas unidades", ficha con especificaciones y compatibilidad, **comprados juntos**, carrito con envío gratis y checkout con cuotas |
| 12 | Tienda de iPhones | Órbita Mobile | Nocturno índigo y menta, Urbanist + mono | Nuevos y seleccionados (batería y estado), **precio en USD o ARS**, capacidad y color con teléfono ilustrado, accesorios, **plan canje** que descuenta el usado en el carrito, reserva sin cargo con código y WhatsApp |
| 13 | Petshop | Colita Feliz | Alegre amarillo y ciruela, Fredoka | Filtro por especie, bolsas de alimento por tamaño con precio por kg, **compra programada con 10% off**, **calculadora de ración** y duración de la bolsa, 2x1 en snacks automático, envío en el día |

**Panel de administración (las 13 demos):** acceso de demostración, resumen de 30 días contra los 30 anteriores (ingresos, ganancia neta, gastos, ticket o turnos), gráfico de ingresos diarios, ranking de productos o servicios, medios de pago, resultado del mes por categoría de gasto, alertas de stock bajo y pagos vencidos; pedidos con estados (tiendas) o agenda por profesional con atendido o ausente (servicios); stock o insumos con márgenes, ajuste y pedido al proveedor; pagos con vencimientos y alta de gastos nuevos. Los cambios se guardan en el celular.

**Showroom:** buscador por rubro (sin importar acentos), filtros por categoría (Gastronomía, Belleza y cuidado, Comercios, Salud), tarjetas con imagen, rubro, nombre, descripción, etiqueta "Demo interactiva" y botón "Ver demostración", sección de beneficios, proceso de trabajo y contacto con Iván por WhatsApp (simulado).

## Tecnología

React 19 + TypeScript + Vite + Tailwind CSS v4 + lucide-react. Cada demo se carga bajo demanda (code splitting) para que abra rápido en datos móviles.
