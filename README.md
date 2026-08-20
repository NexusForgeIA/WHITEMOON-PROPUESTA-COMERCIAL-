# Guía de venta · WhiteMoon

Herramienta comercial interactiva de **WhiteMoon Agencia IA**. El comercial envía el
enlace al móvil del cliente y recorren juntos las 7 pantallas: engancha, demuestra,
diagnostica el pack ideal y cierra.

**Enlace:** https://nexusforgeia.github.io/WHITEMOON-PROPUESTA-COMERCIAL-/

## Cómo se usa en una visita

1. **Portada** — se abre con el cliente delante.
2. **El problema** — despierta la necesidad, sin vender todavía.
3. **Míralo funcionando** — busca el sector del cliente en el buscador y abre esa demo.
4. **Diagnóstico** — tres preguntas respondidas con el cliente. El pack se recalcula al instante.
5. **Packs** — el recomendado sale primero y resaltado en verde.
6. **Comparativa** — tabla rápida para comparar delante del cliente.
7. **Cierre** — agendar reunión, WhatsApp o teléfono.

Atajos: flechas ← / → para navegar, los puntos de la cabecera saltan a cualquier paso,
`#paso-4` en la URL abre directamente ese paso.

## Lógica del diagnóstico

| Documentación | Web | Canal | Recomendación |
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
la tabla comparativa y el resultado del diagnóstico, así que no pueden desincronizarse.

La fuente de verdad de precios es siempre https://whitemoon.es/precios/. Si esa página
cambia, hay que actualizar `PACKS` — nunca al revés.

## Notas técnicas

- HTML/CSS/JS puros, sin dependencias ni build. Un solo archivo.
- Mobile-first, breakpoints en 600 px y 900 px.
- `noindex, nofollow` + `robots.txt` con `Disallow: /` para que no compita con
  whitemoon.es en Google ni en los motores de respuesta IA.
- Sin imágenes raster: iconografía en SVG inline, así que no hay CLS ni peticiones extra.
- Respeta `prefers-reduced-motion`. Un solo `<main>`, jerarquía h1 → h2 → h3, contraste AA.
