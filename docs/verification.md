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

Publicación Git confirmada: `git push -u origin HEAD:main` terminó con exit 0 y `git ls-remote --symref origin HEAD refs/heads/main` devolvió `0a5b57775956d5aaeb5ce958722c06768355b164` para `main` y `HEAD`. Rama predeterminada remota: `main`. Repositorio: https://github.com/Bryan-dev074/influencers-elabela. El siguiente commit solamente registra esta confirmación y cierra el plan; su SHA final se verifica en la entrega.

El despliegue público de Vercel queda a cargo de Bryan; esta evidencia local no afirma que exista una URL pública de la landing.

## Actualización — CTA de WhatsApp y compra por WhatsApp

Solicitud posterior de Bryan, 2026-10-07: mejorar el botón y explicar que el cliente también puede comprar por WhatsApp usando el cupón o mencionando el video del influencer.

- `WhatsAppButton` compartido en hero y cierre: verde profundo, icono de conversación/teléfono, flecha externa, texto principal y apoyo, brillo, relieve y estados hover/active/foco. Cierre con variante clara; no cambia el número ni el helper del mensaje.
- FAQ nueva en ES/PT: dar el cupón o mencionar el video y nombre del influencer aplica el 7% de descuento correspondiente. No se añaden reglas de comisión ni se afirma que el sitio automatice la atribución de ventas por WhatsApp.
- `npm run check` completo: tests 12/12, lint, formato y build con exit 0. JS **55,81 KB gzip**; CSS **10,25 KB gzip**. Activos de producción nuevos: `index-BKdJr3Dn.js` y `index-Csy5cvLX.css`.
- Navegador en 1366×900, 390×844 y 320×760. Ambos CTA conservan toda la copia y apoyo a 12 px; en 320 px, `scrollWidth=clientWidth=305`, y el ancho de contenido de cada CTA coincide con su ancho disponible. Iconos de conversación cuadrados: 29×29 px en móvil normal y 26×26 px en móvil pequeño. Se corrigió una regla heredada que comprimía el icono del cierre.
- Pregunta y respuesta abiertas y verificadas en ambos idiomas. CTA de inicio y cierre producen la misma URL, con `BRYAN & GLOW`/Cacao codificados correctamente y teléfono 595993038777. No se envió ningún mensaje.
- Foco de teclado visible en el enlace; en pausa, `animation-name:none` en su brillo y transición del icono `0s`. Consola sin errores ni warnings en el recorrido actualizado. Revisión independiente aprobada tras retirar la colisión de icono.
- Capturas locales: `qa/whatsapp-update-desktop.jpg` y `qa/faq-whatsapp-mobile.jpg`. El despliegue en Vercel continúa separado de la subida del código.

## Actualización — nombres más rápidos e icono de comisión

Solicitud posterior de Bryan, 2026-10-07: acelerar los nombres de ejemplo y cambiar la estrella del badge de comisión por `+$`.

- Nombres cada **2 segundos**; diseños cada **4,8 segundos**. Ambos temporizadores conservan la misma condición de pausa y se limpian juntos. El icono combina `Plus` y `DollarSign` de Lucide, sin dependencias nuevas.
- Observación controlada en producción: LARABELA/Cacao al reanudar, TUNOMBRE/Cacao a 2,23 s, MARIAGLOW/Cacao a 4,46 s y MARIAGLOW/Sage a 5,09 s. Pausar conservó nombre y diseño otros 2,2 s.
- Badge verificado en 1366×900 y 320×760: icono completo, sin compresión; a 320 px, `clientWidth=scrollWidth=305`. Consola sin errores ni warnings. Revisión independiente aprobada sin regresiones P1/P2.
- `npm run check`: tests 12/12, lint, formato y build con exit 0. JS **55,95 KB gzip**; CSS **10,26 KB gzip**. Capturas: `qa/coupon-speed-commission-desktop.jpg` y `qa/coupon-speed-commission-mobile.jpg`.

## Actualización — símbolo de WhatsApp

Corrección visual solicitada por Bryan, 2026-10-07: sustituir el icono compuesto del botón.

- Se retiran la burbuja/teléfono superpuestos, el recuadro y su giro. Se utilizan los SVG originales blanco y negro del paquete oficial de Meta de 2026, sin modificar trazos ni colores. Fuente y titular registrados en `public/THIRD-PARTY-NOTICES.txt`.
- Dimensiones comprobadas en producción: 32×32 px en escritorio, 30×30 a 390 px y 28×28 a 320 px. Ambos recursos cargan; el contenedor no tiene fondo ni transformación. El cierre claro usa el símbolo negro y conserva el nombre accesible con “WhatsApp”.
- ES/PT: ambos enlaces conservan el teléfono 595993038777 y su mensaje correspondiente. En 320 px, contenido del CTA hero ocupa 249 px de 249 disponibles; cierre 211 de 211. En 390 px, 305 de 305 y 267 de 267 respectivamente. Sin desbordamiento del documento: `clientWidth=scrollWidth=305` a 320 y 375 a 390. El brillo decorativo se recorta dentro del botón.
- Foco de teclado visible y consola sin errores ni warnings en el recorrido. Revisión independiente de código y activos sin regresiones concretas.
- `npm run check` completo: tests 12/12, lint, formato y build con exit 0. JS **55,83 KB gzip**, CSS **10,17 KB gzip**, SVG externos 2.349 bytes en total. Capturas: `qa/whatsapp-glyph-button.jpg` y `qa/whatsapp-glyph-mobile-closing.jpg`.

## Actualización — intro y transición hacia la landing

Rediseño solicitado por Bryan, 2026-10-07: mejorar de forma visible la presentación inicial.

- Nuevo escenario chocolate con luz tenue y silueta de cupón, logo original grande, brillo recortado, desplazamiento mediante transform, letras escalonadas y badge de cupón. Se retiran la gota, ondas y keyframes de layout antiguos. CSS de la intro separado en `src/components/Intro.css`, sin otra dependencia ni motor.
- Línea de tiempo centralizada: comienzo de apertura y revelado a 3.750 ms; retirada completa a 4.550 ms. La página empieza sus entradas durante la apertura, conserva `inert` hasta el cierre y devuelve foco al título después del commit. Se observaron letras visibles (`opacity≈0,92`) con diálogo todavía presente y panel superior desplazado; después, diálogo ausente, `inert` retirado y `overflow` restaurado.
- Composición comprobada en 1366×900, 320×760, 390×844 y 561×820. Logo inicial 200 px en escritorio/164 px en móvil; final 116 px/73,8 px. A 320 y 561, título y logo ocupan dos niveles y no se cruzan; texto y badge quedan dentro del viewport. ES/PT verificados, incluyendo el subtítulo portugués completo.
- Teclado: Tab y Shift+Tab mantienen el foco en Entrar ahora; Escape y clic omiten la intro y devuelven foco a `main-title`. Replay vuelve a ocultar la escena y reinicia los efectos. El cupón automático espera hasta el cierre.
- Movimiento reducido: composición final estática, `animation-name:none`, cierre tras 650 ms. Activar la preferencia en medio de una intro y desactivarla 150 ms después mantuvo la versión abreviada y cerró sin extenderse. Emulación retirada al terminar. Consola sin errores ni warnings en el recorrido.
- `npm run check`: tests 12/12, lint, formato y build con exit 0. JS **56,30 KB gzip**, CSS **10,33 KB gzip**. Capturas: `qa/intro-logo-desktop.jpg`, `qa/intro-lockup-desktop.jpg`, `qa/intro-exit-desktop.jpg`, `qa/intro-lockup-mobile.jpg`, `qa/intro-lockup-portuguese.jpg` y `qa/intro-reduced-mobile.jpg`.

## Corrección — composición y desplazamiento del loader móvil

- Reproducida la composición despareja en 390×844: logo en x25–99/y321–388 y título en x116–274/y430–468. El logo quedaba aislado en otra fila. Se sustituye por un grupo centrado, con logo y título alineados y espacio reservado para el badge. El logo inicial conserva 164×149 px; el final ocupa 59,04×53,64 px. En 320×760, logo x29–88 y título x108–271, ambos con centro vertical y352; badge dentro del viewport y sin desbordamiento horizontal.
- Reproducido también un desplazamiento interno durante el enfoque del botón en QA: `intro.scrollTop` pasó de 0 a 152 px aunque su rectángulo seguía cubriendo 390×844; la composición subió de y292 a y140. `overflow: hidden` permitía ese desplazamiento y las luces ampliaban `scrollHeight` a aproximadamente 998 px. Con `overflow: clip`, Tab/Shift+Tab mantienen `scrollTop: 0` y el rectángulo de la composición estable. Escape devuelve foco a `main-title`, retira `inert` y restaura overflow del body.
- Revisadas visualmente la entrada del logo y la composición final en 320×760 y 390×844; horizontal de poca altura en 700×320; límite de escritorio en 701×820; escritorio en 1366×900. Logo, texto, cupón y controles sin cruces. El subtítulo PT se adapta a dos líneas en 320 px sin chocar con la línea decorativa.
- Movimiento reducido: posición final idéntica, animaciones desactivadas, diálogo ausente y foco restaurado al comprobar después de 800 ms. Emulación retirada. Apertura normal: escena lista mientras el diálogo y `inert` siguen presentes; al finalizar se libera la página. Consola sin errores ni warnings. Revisión estática independiente sin problemas accionables.
- `npm run check`: tests 12/12, lint, formato y build con exit 0. JS **56,31 KB gzip**, CSS **10,44 KB gzip**; sin nuevas dependencias. Capturas en `qa/intro-mobile-320-fixed.jpg`, `qa/intro-mobile-390-fixed.jpg`, `qa/intro-mobile-landscape-fixed.jpg`, `qa/intro-mobile-pt-fixed.jpg`, `qa/intro-mobile-reduced-fixed.jpg` y `qa/intro-desktop-after-mobile-fix.jpg`.
- Alcance de la evidencia: viewport emulado en el navegador Chromium del host. No se verificó un teléfono físico ni Safari móvil.

## Actualización — IVA absorbido y envío gratis

- Contenido solicitado y confirmado por Bryan: ElaBela absorbe el IVA para clientes paraguayos; envío gratis a todo Paraguay, sin compra mínima. El bloque aparece inmediatamente bajo 7%/3%, con tarjeta chocolate, títulos crema, iconos Lucide de comprobante y camión, separador y brillo tenue. Copys equivalentes en ES/PT; no se presenta como exención tributaria ni se agregan otras condiciones.
- `CommunityPerks` conserva iconos decorativos y una sección con nombre accesible, h2 de audiencia y h3 por beneficio. Títulos y párrafos se adaptan al ancho mediante saltos naturales equilibrados. En 390×844, bloque de 335×221 px; en 320×760, 273×291 px, texto de apoyo de 12 px y sin desbordamiento de texto ni horizontal. Revisado además en escritorio 1366×1000, separado del cupón y los controles.
- Pausa global y movimiento reducido emulado: entrada y pseudoelemento de brillo con `animation-name: none`, opacidad 1 y contenido completo. Preferencias restauradas tras QA. Sin errores ni warnings de consola en el recorrido. Revisión estática independiente sin problemas accionables.
- Alternativa sin JavaScript comprobada en navegador con ejecución desactivada: el programa, los dos beneficios completos y el WhatsApp comercial siguen visibles. Emulación desactivada al terminar.
- `npm run check`: tests 12/12, lint, formato y build con exit 0. JS **56,79 KB gzip**, CSS **10,82 KB gzip**; sin dependencias nuevas. Capturas: `qa/perks-mobile-390.jpg`, `qa/perks-mobile-320.jpg`, `qa/perks-mobile-pt-320.jpg`, `qa/perks-desktop.jpg` y `qa/perks-no-js.jpg`.
- Verificación visual en Chromium con tamaños emulados; no se verificó un teléfono físico ni Safari móvil.
