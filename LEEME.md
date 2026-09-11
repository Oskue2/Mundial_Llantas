# Mundial Llantas — sitio web promocional

Sitio **informativo** de una sola página hecho solo con **HTML, CSS y JavaScript**.
No tiene backend, ni base de datos, ni inicio de sesión, ni pagos: todas las
acciones de compra redirigen a **WhatsApp o teléfono** para cotizar.

## Cómo verlo

Haz doble clic en `index.html`. Se abre en cualquier navegador, sin instalar nada.

## Estructura de archivos

```
index.html            La página completa (todas las secciones)
css/styles.css        Todos los estilos
js/config.js          <-- DATOS DE LA EMPRESA (edita solo este archivo)
js/productos.js       El catálogo de productos y servicios
js/app.js             Filtros, buscador, menú, modal y formulario
assets/img/*.svg      Ilustraciones de los productos
```

## 1. Poner los datos reales (obligatorio)

Abre `js/config.js` con el Bloc de notas o VS Code y cambia:

| Campo | Qué poner |
|---|---|
| `whatsapp` | Número con indicativo, sin `+` ni espacios. Colombia: `573001234567` |
| `telefono` / `telefonoLink` | Como se ve en pantalla / como lo marca el celular |
| `correo` | Correo de contacto |
| `direccion`, `ciudad`, `horario` | Datos del punto de venta |
| `mapa` | Enlace de Google Maps del local |
| `instagram`, `facebook`, `tiktok` | URL de cada red. Déjalo en `''` para ocultar el ícono |
| `stats` | Las 4 cifras que salen debajo del inicio |

Con eso quedan actualizados a la vez: la barra superior, el botón flotante,
las tarjetas de contacto, el pie de página y **todos** los botones de cotizar.

## 2. Agregar o cambiar productos

En `js/productos.js`, copia un bloque completo `{ ... }`, pégalo debajo y edita.

```js
{ id: 39, nombre: 'Llanta Michelin Pilot Sport 4', categoria: 'llantas',
  marca: 'Michelin', precio: 890000,
  medida: { ancho: 245, perfil: 40, rin: 18 },
  img: 'llanta.svg', etiqueta: 'Nuevo',
  desc: 'Descripción corta del producto.' },
```

Reglas:

- `id` debe ser **único**.
- `categoria` solo puede ser: `llantas`, `rines`, `accesorios`, `repuestos`, `servicios`.
- `precio` va sin puntos ni `$` (ej: `890000`). El sitio lo formatea solo.
- `medida` solo en llantas; `rin: 17` solo en rines.
- `desde: true` muestra "Desde $..." (útil en servicios).
- `img` es un archivo de `assets/img/`. Si pones una foto real (`.jpg`/`.png`),
  guárdala en esa carpeta y escribe su nombre aquí.

Los filtros de marca, ancho, perfil, rin y el precio máximo del deslizador se
generan **automáticamente** a partir de esta lista: no hay que tocar nada más.

## 3. Cambiar los colores

En `css/styles.css`, arriba del todo, en el bloque `:root`. Cambia `--ambar`
por el color de la marca y todo el sitio se actualiza.

## Qué hace el JavaScript

- Filtra por categoría, marca, medida (ancho / perfil / rin), precio máximo y texto.
- Buscador que ignora tildes y mayúsculas ("bateria" encuentra "Batería").
- Ordena por precio o nombre y muestra el número de resultados.
- Ventana de detalle de cada producto con botón de cotizar.
- Menú hamburguesa, panel de filtros colapsable en celular y resaltado del menú.
- Formulario que arma un mensaje y abre WhatsApp (no envía datos a ningún servidor).

## Aviso legal incluido

El sitio muestra en el catálogo y en el pie de página que los precios son de
referencia y que **no se realizan ventas ni pagos en línea**. Ese texto se
edita en `js/config.js`, en la variable `AVISO_PRECIOS`.

## Publicarlo (opcional)

Al ser archivos estáticos sirve cualquier hosting gratuito: GitHub Pages,
Netlify (arrastrar la carpeta) o el hosting del dominio de la empresa.
