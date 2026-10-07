# ADR 001 — Landing estática de ElaBela Influencers

Fecha: 2026-10-07. Estado: aceptado para esta implementación.

## Contexto

Bryan aprobó una landing directa para explicar el descuento del 7%, la comisión del 3% y abrir una negociación por WhatsApp. Solicitó el logo original, una intro de marca, fondo que responda al mouse, brillos continuos y un cupón con nombres y diseños intercambiables. La página debe publicarse en un repositorio nuevo e importarse posteriormente en Vercel.

El alcance no requiere cuentas, registro, creación real de cupones ni cálculo o pago de comisiones. Esas operaciones y las condiciones adicionales quedan fuera de esta landing informativa.

## Decisión

Usar **React 18.3.1 y React DOM 18.3.1 con Vite 6.4.3**, reutilizando versiones del stack local existente. Compilar archivos estáticos en `dist/`, con npm y un único lockfile. Mantener contacto y ejemplos en `src/config.js`, textos ES/PT en un módulo de contenido y construcción segura del enlace de WhatsApp en un helper probado.

Usar CSS propio y las APIs nativas del navegador para el movimiento: keyframes y transiciones CSS para intro, brillo y capas decorativas; `requestAnimationFrame` para variables del fondo que responde al puntero; `IntersectionObserver` para revelados y visibilidad de los ejemplos. El scroll permanece nativo. Cada propiedad animada tiene un único responsable; las capas controladas por pointer y las capas con keyframes son distintas.

Para la intro refinada, distinguir revelado visual y final del diálogo. `Intro` centraliza el inicio de salida y la duración total, pasa los tiempos a CSS y avisa a `App` con `onReveal` antes de `onComplete`. La escena puede empezar a aparecer mientras el diálogo todavía conserva `inert` y el foco. Omitir salta directamente al cierre; una preferencia reducida abrevia la secuencia sin extender una ya iniciada. Los estilos propios quedan en `src/components/Intro.css`.

No incorporar GSAP ni Motion para esta entrega. La secuencia actual no justifica un runtime adicional. Tampoco incorporar WebGL, Tailwind, otro set de iconos o primitivas headless: los controles nativos cubren las interacciones presentes y Lucide React 0.469.0 aporta el único set de iconos.

Mantener botones, inputs, fieldsets y details nativos; texto legible, nombres accesibles, foco y estados de selección explícitos. Ofrecer pausa de ejemplos, control global de efectos y omisión/repetición de intro. Respetar `prefers-reduced-motion`, detener actividad no visible y proporcionar contenido y contacto mediante `<noscript>` cuando JavaScript esté desactivado. La revisión visual, de teclado y de accesibilidad se registra por separado; esta decisión no sustituye esas comprobaciones.

Usar los activos originales de marca en `public/brand/`, sin recrear el logo como texto. Cargar Playfair Display y Poppins desde Google Fonts con `display=swap` y fallbacks; sus avisos upstream quedan referenciados en `public/THIRD-PARTY-NOTICES.txt` junto a las licencias de dependencias. No se redistribuyen archivos de fuente descargados.

Establecer un presupuesto inicial de **JS de entrada gzip <100 KB** y **CSS gzip <25 KB**. Medir ambos con el build. Los logos y las fuentes remotas se evalúan aparte de ese presupuesto.

## Consecuencias

La landing puede alojarse como sitio estático sin secretos ni variables de entorno. El usuario puede elegir una muestra y preparar el mensaje de WhatsApp sin que el sitio active un cupón o envíe el mensaje. Cambiar el número exige sincronizar `src/config.js` con el contacto de `<noscript>` en `index.html`.

El comportamiento visual depende de JavaScript y navegadores modernos; el contenido y el contacto disponen de una alternativa sin JavaScript. Las fuentes remotas pueden llegar tarde o no estar disponibles, por lo que se conserva el texto con fuentes de respaldo. Si la secuencia de animación crece y la solución nativa deja de ser mantenible, se revisará la decisión y el catálogo antes de añadir otro motor.

La publicación en GitHub, la importación en Vercel y la verificación del sitio público son comprobaciones distintas. Sus resultados se documentan en el cierre de la entrega y no se presuponen en este ADR.
