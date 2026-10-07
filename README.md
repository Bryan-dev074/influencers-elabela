# ElaBela Influencers

Landing informativa para presentar el programa de cupones de ElaBela: **7% de descuento para el cliente** y **3% de comisión para el influencer**. El nombre y el diseño del cupón se eligen como muestra y preparan una consulta por WhatsApp para conversar sobre la colaboración.

La página no registra influencers, no activa cupones y no procesa ventas ni comisiones. Las condiciones adicionales se acuerdan con ElaBela.

## Desarrollo local

Requiere **Node.js >=22.12.0** y npm. El entorno local de esta entrega utiliza Node.js 24.17.0. Mantener `package-lock.json` y usar npm como único gestor.

```sh
npm ci
npm run dev
```

Vite muestra la dirección local en la terminal. Para comprobar la entrega:

```sh
npm test
npm run lint
npm run format:check
npm run build
npm run preview
```

`npm test` ejecuta los contratos de interacción con `node:test`. `npm run lint` revisa JavaScript, JSX y hooks. Prettier es el único formateador: `npm run format` escribe el formato y `npm run format:check` lo comprueba. `npm run build` genera el sitio estático en `dist/`; `npm run preview` permite revisar esa compilación. `npm run check` agrupa pruebas, lint, formato y build.

## Importación en Vercel

Importar el repositorio **[Bryan-dev074/influencers-elabela](https://github.com/Bryan-dev074/influencers-elabela)** con estos ajustes:

| Ajuste               | Valor                                 |
| -------------------- | ------------------------------------- |
| Rama de producción   | `main`                                |
| Framework Preset     | `Vite`                                |
| Root Directory       | Raíz del repositorio                  |
| Install Command      | `npm ci`                              |
| Build Command        | `npm run build`                       |
| Output Directory     | `dist`                                |
| Node.js              | 24.x o una versión admitida >=22.12.0 |
| Variables de entorno | Ninguna                               |

No necesita backend ni credenciales. La importación y publicación en Vercel corresponden a Bryan; este README no confirma un despliegue público.

## Contacto y personalización

El WhatsApp comercial confirmado es **+595 993 038777**. `CONTACT_PHONE`, la dirección de la tienda, los nombres de ejemplo y los cuatro diseños se configuran en `src/config.js`.

Si cambia el número, actualizar también el enlace dentro de `<noscript>` en `index.html` para conservar el mismo contacto cuando JavaScript está desactivado. El mensaje se construye y codifica en `src/lib/contact.js`; abrir WhatsApp no envía el mensaje automáticamente.

Los textos en español y portugués están en `src/data/content.js`. La versión inicial es español. La personalización prepara el nombre y el diseño elegidos para la consulta; también permite solicitar un diseño propio. El límite visual de 20 puntos de código del nombre es una ayuda para esta muestra, no una regla comercial del programa.

## Movimiento e identidad

- Los nombres de ejemplo cambian cada **2 segundos** y los diseños cada **4,8 segundos** mientras el bloque está visible y la página está activa. La rotación se pausa al editar o elegir un diseño, al enfocar o pasar el puntero sobre los controles, al salir del viewport, al ocultar la pestaña y al desactivar los efectos o solicitar movimiento reducido. El control de reproducción permite volver a los ejemplos.
- La intro utiliza el logo real grande, un brillo recortado y una silueta de cupón. El logo se desplaza hacia la izquierda y “Influencers” aparece letra por letra con un cupón en su esquina. Dos paneles se abren mientras entra la página: el revelado empieza a **3,75 segundos** y la intro termina a **4,55 segundos**. Se puede omitir, cerrar con Escape y repetir; con movimiento reducido es estática y se acorta a **650 ms**. En pantallas estrechas, logo y título forman un grupo centrado en la misma fila, con espacio reservado para el cupón.
- El fondo responde al puntero mediante `requestAnimationFrame`; los brillos y revelados utilizan CSS. Los efectos tienen control global y respetan `prefers-reduced-motion`.
- Los activos originales de ElaBela se conservan en `public/brand/`. Playfair Display y Poppins se cargan desde Google Fonts con `display=swap` y fuentes de respaldo; esta carga remota depende de conectividad y se mide aparte del JS/CSS de la aplicación.

## Dependencias y documentación

React 18.3.1, React DOM 18.3.1 y Vite 6.4.3 forman el sitio estático; Lucide React 0.469.0 aporta los iconos. No se incorporan GSAP, Motion, WebGL ni un controlador externo de scroll.

El catálogo y los criterios de adopción están en [LIBRERIAS.md](LIBRERIAS.md). Los avisos de licencias de las dependencias y las referencias de las fuentes están en [public/THIRD-PARTY-NOTICES.txt](public/THIRD-PARTY-NOTICES.txt). La decisión de arquitectura está en [docs/adr/001-static-landing.md](docs/adr/001-static-landing.md).

Las evidencias de build, auditoría, pruebas y revisión de navegador se registran en `docs/verification.md` al cerrar la entrega. Publicar el repositorio y comprobar el sitio después de importarlo en Vercel son pasos separados.
