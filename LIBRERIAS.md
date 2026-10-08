# LIBRERÍAS — ElaBela Influencers

Revisión: 2026-10-07. Leer completo antes de cambiar UI, animaciones o efectos.

## Contexto

- Landing comercial autorizada por Bryan para `Bryan-dev074/influencers-elabela`, repositorio nuevo y separado del link-in-bio.
- Dirección aprobada: Glow Studio; ampliar profundidad, movimiento, personalización y secuencia de intro.
- Stack seleccionado: React 18.3.1 + React DOM 18.3.1, Vite 6.4.3, plugin React 4.7.0, npm y un único `package-lock.json`.
- Estilos: CSS propio. No se necesita Tailwind para esta landing; evita duplicar clases y tokens.
- Animación: CSS nativo para keyframes, React para estado/secuencia, un listener de pointer con requestAnimationFrame para fondo y perspectiva. No controlar la misma propiedad desde dos motores.
- Scroll: nativo; IntersectionObserver para revelados. Sin scroll hijacking.
- Presupuesto inicial: JS de entrada gzip <100 KB; CSS gzip <25 KB. Medir con `npm run build`.
- Distribución: web comercial informativa; no kit ni biblioteca de componentes.

## Adoptadas / seleccionadas

### React / React DOM y Vite

- Fuente: https://react.dev/ y https://vite.dev/; versiones reutilizadas del stack local existente.
- Licencia MIT comprobada en los paquetes locales de LinksElaBela; verificar también la instalación de este repo.
- Caso: estado de cupones, idioma, intro y compilación estática para Vercel.
- Compatibilidad: Node 24.17.0/npm 11.13.0 comprobados. Vite React 4.7.0 con Vite 6.4.3.
- Duplicación: un framework y compilador; sin SSR ni backend innecesario.
- Peso: pendiente del build inicial; registrar resultados abajo.
- Accesibilidad: controles nativos, texto real, foco, idioma del documento y contenido usable con movimiento reducido.
- Retirada: reescribir el montaje y estado; no se propone.

### Lucide React 0.469.0

- Fuente: https://lucide.dev/; paquete existente con licencia ISC y atribuciones MIT de Feather comprobadas localmente.
- Caso: cupón, pasos, pausa, idioma y controles. Importaciones individuales.
- Duplicación: único set de iconos; no fuentes de iconos ni otra librería.
- Peso: incluido en la métrica del build.
- Accesibilidad: decorativos aria-hidden; controles con nombre visible o aria-label.
- Retirada: sustituir importaciones y componentes de icono.

### CSS, requestAnimationFrame, IntersectionObserver

- Fuente: APIs nativas del navegador; sin dependencia adicional.
- Caso: brillo continuo, fondo que responde al mouse, relieve de cupón, intro y revelado de contenido.
- Compatibilidad: navegadores modernos; lectura completa y acciones disponibles si falla un efecto.
- Duplicación: un responsable por efecto; CSS anima transform de capas internas, pointer actualiza variables de capas externas.
- Peso: medir CSS en build; no runtime de animación.
- Accesibilidad: `prefers-reduced-motion`, control global de efectos y pausa del carrusel; detener fondo en pestañas ocultas; detener rotación al editar/elegir.
- Retirada: conservar contenido y estado; quitar capas decorativas y sus listeners.

### Fuentes Playfair Display / Poppins

- Reutilizan la identidad de ElaBela: Playfair para títulos; Poppins para cuerpo y números, evitando los dígitos serif que Bryan rechazó.
- Carga única por Google Fonts con display=swap y fallbacks. No se redistribuyen archivos de fuente descargados.
- Fuentes oficiales: https://fonts.google.com/specimen/Playfair+Display y https://fonts.google.com/specimen/Poppins.
- Licencias SIL OFL 1.1 comprobadas en el repositorio primario `google/fonts/main/ofl/poppins/OFL.txt` y `google/fonts/main/ofl/playfairdisplay/OFL.txt`; uso web comercial permitido. Playfair conserva nombre reservado para derivados. Peso remoto separado del JS/CSS.
- Accesibilidad: campos >=16 px y texto de apoyo >=12 px; contrastes y fallback a comprobar en navegador.

### Activos de marca

- Logo oscuro original: `D:/CODE/LinksElaBela/public/logoelabela/logo.png`.
- Logo crema oficial servido por tienda: https://www.elabela.com.py/img/elabela_FCEBDB_logo.svg, `viewBox="0 0 220 200"`.
- Usar los originales sin recrear la marca como texto ni alterar sus píxeles/trazos.
- PNG propio de marca; SVG desde el sitio autorizado por su propietario para esta página.

## Evaluadas y descartadas

| Recurso           | Motivo para esta entrega                                                                                     | Reconsiderar si                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Motion / GSAP     | CSS y estado nativo resuelven secuencia y gestos sin otro runtime                                            | QA demuestra una secuencia imposible de mantener con la solución actual; revisar licencia/versión/peso antes |
| shadcn/ui / Radix | Botones, inputs y details nativos cubren las interacciones; no hay diálogos complejos                        | Se añaden flujos con gestión de foco compleja                                                                |
| React Bits        | Efectos propios con presupuesto y movimiento controlado; no copiar componentes sin revisar licencia concreta | Un componente aporta valor específico medible                                                                |
| Uiverse           | Referencia posible, sin copiar código; identidad diseñada para ElaBela                                       | Hace falta comparar un patrón puntual                                                                        |
| Three.js / WebGL  | Profundidad de cupón y luces resueltas con CSS; evitar coste móvil                                           | Se acuerda valor claro y presupuesto para 3D                                                                 |
| Tailwind          | Proyecto nuevo con CSS acotado; no duplicar sistemas de estilos                                              | Necesidad de componentes compartidos que lo requieran                                                        |

## Herramientas de calidad adoptadas

- ESLint 9 y plugins React/hooks: lint de JSX y errores/hooks, sin reglas de formato competidoras. Licencias de paquetes instalados comprobadas; uso solo de desarrollo.
- Prettier 3.9.9: único formateador local para JSX, CSS, JSON y Markdown. Fuente primaria https://prettier.io/docs/install.html y registro npm: MIT, 9.96 MB descomprimidos de desarrollo, 0 KB en bundle. No hooks ni otra suite. Versionado exacto para que futuras ediciones conserven formato legible; compatible con los formatos del proyecto. Evaluada y adoptada después del primer prototipo, antes de formatear el código final.
- Node `node:test`: pruebas de contrato del nombre de ejemplo y URL de WhatsApp, sin dependencia de test adicional.
- Browser Use nativo del host para QA visual/interacciones; agent-browser no está instalado. No instalar una segunda ruta de navegador.

## Tarjeta para compartir — 2026-10-08

- Reutilizar logos originales, Poppins/Playfair y CSS nativo de la identidad Glow Studio para una composición estática de 1200×630 px. Fuente editable en `design/share-card.html`; exportar PNG mediante captura del navegador ya adoptado. Sin generador en producción, dependencia adicional ni nuevos archivos de fuente.
- Imagen pública versionada en `public/brand/influencers-share-v1.png`, con presupuesto de 300 KB como objetivo propio de rendimiento. Es un recurso de vista previa, sin carga adicional dentro de la landing ni aumento del runtime.
- Open Graph y Twitter Card en el HTML estático: dirección absoluta HTTPS, dimensiones, MIME y descripción alternativa. Disponible para crawlers sin ejecutar React. Verificar PNG, metadatos, acceso público y consistencia con el despliegue; la presentación final depende del cliente que comparte el enlace.
- Exportación: PNG verificado de 1200×630 px, 325.902 bytes (325,9 KB), ligeramente por encima del objetivo de 300 KB. Se conserva la composición con sombras y gradientes; la imagen no se descarga al abrir la landing. Sin aumento del runtime por los metadatos o el arte.

## Comprobaciones y resultados

- Antes de publicar: tests, lint, build, auditoría npm, intro, cambio automático/manual de cupón, WhatsApp, ES/PT, teclado, 320/390/escritorio, movimiento reducido, ausencia de errores de consola.
- Build final: JS 174,00 KB / 55,30 KB gzip; CSS 38,49 KB / 9,70 KB gzip. Cumple ambos presupuestos. Los originales PNG (~692 KB) y SVG (~10 KB), además de las fuentes remotas, se miden aparte.
- Tests 12/12, lint, formato, build y auditoría npm completos; 0 vulnerabilidades reportadas. Fuente/activos/licencias comprobados, avisos conservados en `public/THIRD-PARTY-NOTICES.txt`.
- Navegador: producción y desarrollo, 320/390/escritorio, ES/PT, intro normal/reducida, omisión/replay, foco/hover, pausa, elección, WhatsApp codificado, fondo con pointer y fallback no-JS. Evidencia y límites en `docs/verification.md`; revisión independiente aprobada tras corregir 3 P2.

### Refinamiento de CTA — 2026-10-07

- Reutilizar Lucide para conversación/teléfono y flecha externa, CSS nativo para relieve/brillo/hover. Sin nueva dependencia, motor ni set de iconos. Componente `WhatsAppButton` compartido en hero y cierre, verde profundo coordinado con Glow Studio.
- Control de efectos y movimiento reducido existentes cubren los nuevos brillos y transiciones. Conservar enlace nativo, foco visible, texto de ayuda >=12 px y adaptación a 320 px; incluir consulta con selección codificada mediante el helper existente.
- Añadir FAQ autorizada ES/PT sobre compra por WhatsApp con cupón o mención del video del influencer, aplicando 7% de descuento. No cambiar condiciones de comisión ni inventar atribución técnica automática.
- Medición actualizada: JS 55,81 KB gzip (+0,51 KB), CSS 10,25 KB gzip (+0,55 KB). Sin nuevas dependencias. Verificados ambos CTA y FAQ ES/PT en 320/390/escritorio, foco, pausa y mensajes con selección; detalles en `docs/verification.md`.

### Refinamiento de ejemplos y comisión — 2026-10-07

- Nombres cada 2 segundos y diseños cada 4,8 segundos mediante temporizadores nativos independientes; conservar las pausas por interacción, visibilidad y preferencias de movimiento. Sin motor adicional.
- Reutilizar `Plus` y `DollarSign` de Lucide para componer el icono `+$` solicitado en la comisión. Mismo set MIT adoptado, sin dependencias nuevas; decoración oculta a lectores de pantalla y espacio reservado para evitar compresión en móvil.
- Medición actualizada: JS 55,95 KB gzip y CSS 10,26 KB gzip. Rotación y pausa observadas en navegador; badge comprobado en escritorio y a 320 px, sin desbordamiento ni errores de consola.

### Corrección del símbolo de WhatsApp — 2026-10-07

- Adoptado: SVG original de WhatsApp desde el centro de marca de Meta (https://www.meta.com/es-la/brand/resources/whatsapp/whatsapp-brand/), para sustituir la burbuja/teléfono superpuestos. Variantes blanca (1.168 bytes, hero) y negra (1.181 bytes, cierre), `viewBox="0 0 720 720"`, del ZIP oficial de 2026. Conservadas sin modificar. El recurso está sujeto a las normas de marca de Meta; fuente registrada en los avisos.
- Diseño: un símbolo con proporciones originales, sin recuadro ni giro; conservar colores de la variante oficial. Lucide sigue cubriendo los controles genéricos; el recurso de marca no incorpora otro set ni runtime. Renderizar como imagen decorativa con tamaño reservado y enlace con texto visible.
- Descartar una instalación de Simple Icons: un único activo oficial satisface esta corrección. CC0 del catálogo no sustituye las condiciones de la marca.
- Medición: JS 55,83 KB gzip; CSS 10,17 KB gzip; SVG externos 2,35 KB en total sin comprimir. QA de ambos botones en 1366/320/390 px y ES/PT, imágenes cargadas, proporciones intactas, texto completo y foco visible. Detalles en `docs/verification.md`.

### Rediseño de la intro — 2026-10-07

- Reutilizar el SVG real, Playfair/Poppins, Lucide y CSS nativo. Logo grande, luz recortada, silueta de cupón, letras escalonadas y apertura de dos paneles. Sin nuevas dependencias ni motores; transform/opacity para el movimiento.
- Centralizar duración (4,55 s) y comienzo de salida (3,75 s) en el componente y pasarlos a CSS. Revelar la página antes de retirar el diálogo, manteniendo `inert` hasta el cierre. Adaptar la composición a 700 px o menos; ver el ajuste móvil siguiente.
- Conservar omisión/replay, foco y preferencia de efectos; versión estática de 650 ms, sin extender una intro ya abreviada. Verificar teclado, cancelación de temporizadores y salida integrada en navegador.
- Medición final: JS 56,30 KB gzip (+0,47 KB) y CSS 10,33 KB gzip (+0,16 KB). Verificadas secuencia, apertura, teclado, replay, ES/PT, 320/390/561/escritorio y movimiento reducido; ver `docs/verification.md`.

### Corrección de la intro móvil — 2026-10-07

- Reutilizar flex y transform de CSS nativo para agrupar logo y título en la misma fila a 700 px o menos. El ancho del texto determina el grupo; reservar el ancho final del logo y el badge evita posiciones independientes desparejas. Logo original de 164 px al inicio y 59,04 px al terminar, texto adaptable de 33 a 56 px. Sin otra librería ni medición JavaScript.
- Cambiar el recorte del overlay a `overflow: clip`: las luces decorativas ampliaban su área desplazable y el enfoque del botón durante QA movía internamente la composición. Conservar foco, omisión, temporizadores y alternativa reducida.
- Medición actualizada: JS 56,31 KB gzip; CSS 10,44 KB gzip. Comprobados 320/390 px, horizontal 700×320, breakpoint 701 px, escritorio, ES/PT y movimiento reducido. Evidencia en `docs/verification.md`.

### Beneficios de IVA y envío — 2026-10-07

- Reutilizar `ReceiptText` y `Truck` del set Lucide ya adoptado, tipografía existente y CSS nativo para un bloque chocolate bajo el 7%/3%. Sin nuevas dependencias, activos ni otro motor. Iconos decorativos, jerarquía semántica y texto de apoyo >=12 px.
- Contenido comercial confirmado por Bryan: ElaBela absorbe el IVA para clientes paraguayos; envío gratis a todo Paraguay, sin compra mínima. Presentar la absorción como beneficio de ElaBela y conservar el significado en ES/PT.
- Entrada y brillo mediante keyframes existentes, cubiertos por pausa global y movimiento reducido. Medir peso y comprobar escritorio/320/390 px, traducción y lectura sin JavaScript.
- Medición: JS 56,79 KB gzip (+0,48 KB); CSS 10,82 KB gzip (+0,38 KB). Verificados ES/PT en 320/390/escritorio, saltos de línea, ausencia de desbordamiento, pausa y movimiento reducido. Beneficios y contacto visibles con JavaScript desactivado. Detalles en `docs/verification.md`.

### Composición abierta de beneficios — 2026-10-07

- Bryan rechazó la tarjeta chocolate anterior. Sustituirla por dos beneficios sobre el fondo existente, sin contenedor con fondo, borde o sombra. Reutilizar Playfair/Poppins y Lucide, con acentos rosa y verde de la identidad; no incorporar recursos de catálogo ni dependencias.
- Movimiento continuo solicitado: comprobante con flotación y oscilación suave; camión con avance corto y trazos de recorrido. CSS controla transform/opacity de capas decorativas independientes, con texto estático. Pausa global y movimiento reducido existentes deben detener todos los loops.
- Conservar audiencia paraguaya, absorción de IVA por ElaBela y envío gratis a todo Paraguay sin mínimo en ES/PT. Comprobar lectura, iconos en movimiento, ausencia de desplazamientos de layout y adaptación a 320/390/escritorio antes de publicar.
- Medición actualizada: JS 56,83 KB gzip (+0,04 KB); CSS 10,93 KB gzip (+0,11 KB). Iconos animados con geometría de filas estable; pausa y movimiento reducido eliminan entrada y loops. Revisados ES/PT y tamaños 320/390/escritorio sin desbordamiento del documento.

### Invitación a la tienda en el pie — 2026-10-08

- Convertir el enlace existente en un botón chocolate visible, con nombre de acción ES/PT, dominio de destino y bolsa/flecha de Lucide ya adoptado. Conservar el logo real, `STORE_URL` y enlace nativo externo; anunciar la nueva pestaña a lectores de pantalla y mantener foco visible.
- Reutilizar el brillo CSS existente y añadir un avance corto de flecha con transform; sin dependencias ni otro motor. Los controles globales de pausa, la intro y movimiento reducido cubren ambos loops. A 560 px o menos, dar al botón una fila completa con texto adaptable y espacios reservados para iconos.
- Verificación integrada: tests 12/12, lint, formato y build completos. JS 56,93 KB gzip (+0,10 KB); CSS 11,31 KB gzip (+0,38 KB). Botón comprobado en 1366/320/390 px, ES/PT, con foco visible, sin desbordamiento y animaciones detenidas mediante pausa y movimiento reducido. Evidencia en `docs/verification.md`.

### Opciones de luces para WhatsApp — preview, 2026-10-08

- Bryan pidió comparar alternativas antes de aplicar cambios a ambos CTA. Prototipo aislado: órbita de luz exterior con gradiente cónico y `@property`, ondas de contorno y destellos que salen del botón. Reutilizar CSS nativo, Poppins/Playfair y SVG originales de WhatsApp sin alterar sus trazos; ninguna dependencia nueva en la landing.
- Órbita recomendada por continuidad, protagonismo y coherencia con Glow Studio. Las tres propuestas se presentan sobre los fondos reales del hero y cierre; velocidad, intensidad y pausa se pueden comparar en la preview. Movimiento reducido y decoraciones sin eventos de puntero conservan lectura e interacción.
- Son candidatas pendientes de elección, sin cambiar `WhatsAppButton`, CSS de producción ni publicación. Para integrar la elegida, usar una capa exterior porque el enlace actual recorta su brillo interno; limitar extensión móvil, preservar foco y conectar la pausa global existente. No adoptar otro motor de animación.

### Combinación de luces y llamada — preview, 2026-10-08

- Bryan pidió ver la combinación de órbita y destellos con el icono de WhatsApp en movimiento constante de llamada. Preview aislada: dos estelas exteriores cada 4,8 s, destellos desfasados y el SVG original vibrando con balanceo de ±9° cada 1,6 s; en móvil, ±7° y menor desplazamiento. Ondas pequeñas alrededor del icono, con texto y flecha estables. CSS nativo, sin incorporar dependencias.
- Revisada en navegador a 736 y 320 px: ambos botones y logos visibles, sin desbordamiento horizontal; pausa funcional y movimiento reducido detienen todos los efectos. Sin errores ni avisos en consola. Continúa como propuesta para elegir, sin modificar ni publicar el componente de producción.

### Combinación aprobada para ambos CTA — 2026-10-08

- Bryan aprobó la combinación de órbita, destellos y efecto de llamada. Integrar en el componente compartido con una capa exterior no interactiva y un único enlace nativo; conservar los SVG originales, los textos ES/PT y el número comercial. Los recursos existentes satisfacen el alcance; no adoptar dependencias ni otro motor.
- Encapsular los estilos en `WhatsAppButton.css`. Dos estelas recorren una máscara de borde fija mediante un gradiente que rota con transform cada 4,8 s; halo, seis destellos desfasados y vibración constante del icono cada 1,6 s. Animar únicamente transform/opacity; reducir ángulo y salida de luces en móvil. El símbolo original no cambia sus trazos.
- Mantener enlace y luces con el mismo ancho/altura, llevar el margen del cierre a la capa exterior y reservar espacio para el texto de ayuda. Atenuar luces durante foco visible; aplicar pausa global, pausa de la intro y movimiento reducido a todas las capas. Comprobar 320/390/500/escritorio, idiomas, foco y ausencia de desbordamiento antes de publicar.
- Verificados 1366/320/390/500/560 px, ES/PT, símbolos cargados y destinos de WhatsApp intactos. Pausa y movimiento reducido detienen iconos, ondas, destellos y las capas de órbita. Revisión independiente cerrada tras quitar el max-width heredado del cierre. Peso actual: JS 57,04 KB gzip (+0,11 KB), CSS 12,40 KB gzip (+1,09 KB), dentro de los presupuestos existentes.
