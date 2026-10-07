# Verificación de entrega

Fecha: 2026-10-07. Entorno Windows, PowerShell, Node 24.17.0 y npm 11.13.0. Repositorio independiente de `LinksElaBela`.

## Comprobaciones ejecutadas

| Comprobación                         | Resultado                                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Contratos (`npm test`)               | 12 pasan, 0 fallan: Unicode/nombres, rotación, teléfono válido, codificación ES/PT y entradas peligrosas como texto |
| ESLint (`npm run lint`)              | Exit 0                                                                                                              |
| Prettier (`npm run format:check`)    | Exit 0                                                                                                              |
| Build (`npm run build`)              | Exit 0; Vite 6.4.3                                                                                                  |
| `npm audit` y `npm audit --omit=dev` | 0 vulnerabilidades reportadas                                                                                       |
| Revisión independiente               | 3 hallazgos P2 corregidos y aprobados; sin P0/P1 nuevos                                                             |
| Typecheck                            | No aplica: JavaScript/JSX, sin TypeScript                                                                           |

Build final: JavaScript 174,00 KB / **55,30 KB gzip**; CSS 38,49 KB / **9,70 KB gzip**; HTML 2,43 KB / 1,00 KB gzip. Dentro de presupuestos JS <100 KB y CSS <25 KB. Fuentes de Google y logos se cargan aparte; el PNG original de marca es aproximadamente 692 KB y el SVG crema 10 KB.

## Navegador

Recorridos reales mediante navegador del host; desarrollo en `127.0.0.1:5187` y compilación de producción en `127.0.0.1:4187`. La producción utiliza `/assets/index-DEe3KPrs.js` y `/assets/index-CJ42v6S5.css`.

- Escritorio 1366×900, móvil 390×844 y móvil pequeño 320×760. Sin desbordamiento horizontal al cerrar QA: a 320 px, `clientWidth=scrollWidth=305` por la barra vertical del navegador; a 390 px, ambos 375; en escritorio, ambos 1351. El portugués permite envolver el título en móvil.
- Intro normal: foco en “Entrar ahora”, fondo chocolate, logo gráfico original, llegada al centro, desplazamiento final a izquierda, “Influencers” centrado e icono de cupón en su esquina. A los 3,4 s, logo `left=0` y palabra `opacity=1`; sin superposición en móvil. Cierre automático y omisión restituyen foco al título y retiran `inert` del contenido. Replay reinicia las entradas.
- Letras y tarjeta aparecen después de la intro: entrada de letra observada en ejecución (`letter-enter`, opacidad intermedia) después de omitir; no consume la animación detrás de la intro.
- Rotación automática: se observaron cambios CAMIBEAUTY/Rosé → LARABELA/Cacao después de 5 s. Pausa mantuvo el mismo nombre otros 5 s. Selección manual y edición detienen los ejemplos.
- Teclado: avanzar desde la pausa al swatch Nude, sacar el pointer de los controles y esperar 5 s conservó el nombre; foco y hover no se pisan. Los campos tienen label y los estilos exponen `aria-pressed`.
- WhatsApp: enlaces de ambos CTA apuntan a **595993038777**. Elección `Ñandú 💖 & Glow` y “A tu manera” produjo el mensaje codificado con el nombre completo y otro diseño a acordar. Se verificó la URL; no se enviaron mensajes.
- Fondo con mouse: desplazamiento real actualizó `--pointer-x` y `--pointer-y` mediante rAF. No usa movimiento de scroll externo.
- Pausa global: animación de tarjeta `none`, HTML con `scroll-behavior:auto`. Movimiento reducido del sistema: fondo `animation-name:none`, control explicativo deshabilitado, intro estática que cierra en 650 ms, ejemplos detenidos. Se retiró la emulación al terminar.
- ES/PT: textos, label del título, idioma del documento y mensaje de contacto cambian juntos.
- FAQ: apertura nativa y explicación de 7%/3%, sin inventar forma de pago, base de cálculo o plazos.
- JavaScript desactivado: el `<noscript>` de producción muestra logo, programa, tasas y enlace de contacto. Se restauró JavaScript al finalizar.
- Producción: ningún logo roto y ningún error/warning de consola registrado durante el recorrido final. No se dejaron overrides de viewport.

Capturas locales en `qa/desktop-production.jpg`, `qa/mobile-production.jpg` y `qa/intro-mobile.jpg` (carpeta excluida de Git). Se entrega la vista principal en la conversación y la preview local editable mediante el repositorio.

## Alcance de la evidencia

Revisión visual e interacciones en Chromium del host. No se realizó certificación completa de accesibilidad con lector de pantalla/axe, ni prueba en dispositivos físicos Safari/iOS. La landing es informativa y prepara una consulta; no activa cupones ni calcula pagos.

La publicación Git se confirma con lectura del SHA remoto al cerrar. El despliegue público de Vercel queda a cargo de Bryan; esta evidencia local no afirma que exista una URL pública de la landing.
