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
