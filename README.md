# Tu agente IA · guía de acompañamiento

Guía interactiva de **WhiteMoon Agencia IA** para ver **junto al cliente**. No es un
argumentario ni material interno: la página le habla directamente a él, resuelve sus
dudas y llega a lo que encaja con su negocio. El comercial acompaña, no expone.

**Enlace:** https://nexusforgeia.github.io/WHITEMOON-PROPUESTA-COMERCIAL-/

## Los 8 pasos

| # | Paso | Para qué sirve en la conversación |
|---|---|---|
| 1 | Portada | Abrir sin presión: "vamos a encontrar juntos lo que necesitas" |
| 2 | ¿Te suena esto? | Que se reconozca en el problema, sin vender nada aún |
| 3 | Así se vería en tu sector | Abrir la demo de **su** sector y que hable él con el agente |
| 4 | Resolvemos tus dudas | Las 7 objeciones de siempre, en acordeón, para sacarlas antes de hablar de packs |
| 5 | Encontremos lo que encaja | Tres preguntas respondidas por él |
| 6 | Los packs | El que encaja aparece primero |
| 7 | De un vistazo | Tabla para comparar |
| 8 | Tu siguiente paso | Reunión, WhatsApp o teléfono, sin compromiso |

Atajos: flechas ← / → para navegar, los puntos de la cabecera saltan a cualquier paso,
`#paso-4` en la URL abre directamente ese paso.

## Tono

Todo está escrito **hablándole al cliente de tú**, cálido y sin jerga. Si tocas textos,
mantén esa voz: nada de "lead", "cierre", "prospecto" ni "recomendación comercial". El
paso 5 no recomienda: acompaña a ver qué encaja.

## Lógica del paso 5

| Documentación | Web | Canal | Encaja |
|---|---|---|---|
| Sí | — | — | **Core RAG** |
| No | No | Voz | **Core Orion** |
| No | No | Chat | **Core Spark Web** |
| No | Sí | Voz | **Orion IA Agent** |
| No | Sí | Chat | **Spark** |

La respuesta de documentación tiene prioridad sobre las demás.

## Mantenimiento

Todo el contenido vive en `index.html`, en dos arrays al principio del `<script>`:

- `DEMOS` — las 15 demos publicadas en https://whitemoon.es/demos/
- `PACKS` — los 10 productos publicados en https://whitemoon.es/precios/

**Los precios se cambian solo en `PACKS`.** De ahí salen a la vez las tarjetas de packs,
la tabla comparativa y el resultado del paso 5, así que no pueden desincronizarse.

La fuente de verdad de precios es siempre https://whitemoon.es/precios/. Si esa página
cambia, hay que actualizar `PACKS` — nunca al revés.

Las respuestas del paso 4 son texto plano en el HTML. **No inventes datos ahí**: cada
cifra (5-7 días, 48 h, 499 €, dominio primer año, SSL + hosting + mantenimiento) está
contrastada con whitemoon.es.

## Garantía de puesta en marcha

> Si en 7 días laborables no lo tienes funcionando en tu web, no empiezas a pagar la
> cuota mensual.

Es **la única garantía** que ofrece la página. No hay devolución del setup ni ninguna otra
promesa: el setup es un pago único por trabajo hecho. Si alguien añade otra garantía aquí,
tiene que estar publicada antes en whitemoon.es.

Aparece en tres sitios, todos desde el mismo texto:

- la duda "¿Y si luego veo que no me sirve?" y la de "¿Cuánto tarda?" (paso 4),
- el micro-sello junto al precio de cada pack y en el resultado del paso 5,
- el bloque del paso 8.

El plazo de 7 días laborables es el **extremo alto** del "5-7 días laborables" que ya
usaban las fichas de pack, así que no se contradicen: la garantía cubre el peor caso.

### A qué packs se les pone el sello

Lo controla el campo `warranty:true` en `PACKS`. Lo llevan los ocho packs que tienen
**puesta en marcha y cuota mensual**. Se quedan fuera a propósito:

- **Pack Ads** — no tiene setup, así que no hay puesta en marcha que garantizar.
- **Auditoría GEO IA** — es un pago único de 899 € sin cuota mensual, así que "no empiezas
  a pagar la cuota" no querría decir nada. Su plazo propio son 48 h.

## Notas técnicas

- HTML/CSS/JS puros, sin dependencias ni build. Un solo archivo.
- Mobile-first, breakpoints en 600 px y 900 px.
- `noindex, nofollow` + `robots.txt` con `Disallow: /` para que no compita con
  whitemoon.es en Google ni en los motores de respuesta IA.
- Sin imágenes raster: iconografía en SVG inline, así que no hay CLS ni peticiones extra.
- Acordeón con `<details>`/`<summary>` nativos y la pregunta como `h3`, para navegar
  por encabezados con lector de pantalla.
- Los 8 puntos de progreso miden 24×24 px (mínimo táctil). Por debajo de 480 px el
  nombre de la marca se oculta visualmente para que la cabecera quepa.
- El pack que encaja se ordena **en el DOM**, no con `order` de CSS, para que el orden
  visual, el de tabulación y el del lector de pantalla coincidan.
- Respeta `prefers-reduced-motion`. Un solo `<main>`, jerarquía h1 → h2 → h3, contraste AA.
