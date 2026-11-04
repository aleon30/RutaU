# 🚗 RutaU

Este documento establece las reglas de arquitectura, diseño, alcance funcional y restricciones técnicas que **deben** seguir estrictamente todos las herramientas de Inteligencia Artificial al generar, modificar o revisar código en este repositorio.

Ruta U es un sitio web responsivo para reservar viajes compartidos bajo el modelo de carpooling.

> Solo **Datos** y **Estructura** son de este proyecto. El resto sirve de punto de partida para cualquier proyecto HTML y CSS con Figma.

---

## 1. Datos

- Figma: https://www.figma.com/design/MSs2wWWnPmxHptLHo3lsGn/RutaU?node-id=41-500&m=dev&t=Ugnw5NFw4MgDYzqP-1
- UI: **Solo** HTML y CSS
- Gráficos: Ninguno

---

## 2. Cómo trabajar
Haz solo la pantalla que te pida. Léela en el Figma, impleméntala y verifica que se vea bien al abrirla en el navegador. Al terminar, lista los archivos creados y qué quedó pendiente. No cambies las variables ni los estilos de otras pantallas.

## 3. Estructura

Sigue la siguiente estructura:
```
├── index.html                       # Landing, con su propia cabecera y pie
├── css/
│   ├── styles.css                   # Estilos base, cabecera global y estilos de portada/componentes
│   ├── tokens.css                   # Variables compartidas y algunos valores base del documento
│   ├── help.css                     # Centro de ayuda y reglas de cabecera usadas por varias páginas
│   ├── login.css                    # Estilos específicos de acceso
│   ├── register.css                 # Estilos específicos de registro
│   ├── menu.css                     # Estilos del menú desplegable
│   ├── search-trips.css             # Búsqueda de viajes
│   ├── trip-details.css             # Detalle de viaje
│   ├── publish-trip.css             # Publicación de viaje
│   ├── planned-trips.css            # Viajes planeados
│   ├── profile.css                  # Perfil
│   └── notifications.css            # Notificaciones
├── js/
│   └── login.js                     # Archivo placeholder; no implementa lógica de la pantalla
├── img/                             # Imágenes del sitio
└── pages/
    ├── auth/                        # Grupo de acceso (se nombra por su función)
    │   ├── login.html
    │   └── registro.html
    ├── help/
    │   └── ayuda.html
    ├── user/
    │   ├── menu_desplegable.html
    │   ├── notificaciones.html
    │   └── perfil.html
    └── viajes/
        ├── buscar_viaje.html
        ├── detalles_viaje.html
        ├── publicar_viaje.html
        └── viajes_planeados.html
```

## 4. Alcance
Solo dibuja cada pantalla y conéctala: formularios con sus campos, listas con datos de ejemplo y enlaces entre pantallas. La lógica no existe en este proyecto.

- **Sí:** HTML semántico, CSS, `<form>` con atributos de validación (`required`, `type="email"`, `minlength`), listas con datos de ejemplo fijos, navegación con `<a href>`.
- **No:** JavaScript (la carpeta `js/` queda vacía; ni `<script>` ni `onclick`), frameworks, librerías, CDNs ni preprocesadores. No calcules, filtres ni busques. Usa los valores del Figma, tal cual.
- **Contadores, chips y buscadores:** déjalos dibujados, sin comportamiento.
- Si dudas, déjalo fijo.

## 5. Reglas
- **Archivos (estado actual):** las páginas están en `pages/` por grupo. El CSS está distribuido entre `styles.css`, `tokens.css` y hojas específicas por pantalla. No asumir que todos los estilos están unificados en `styles.css`; al editar una página, revisar qué hojas carga su HTML y respetar su alcance. Nombres en minúsculas y guiones.
- **HTML:** semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), un solo `<h1>` por página, `alt` en todas las imágenes y `<label>` en cada campo.
- **CSS:** clases con nombres claros (estilo BEM), sin estilos inline ni `!important`. Las variables compartidas se declaran en `css/tokens.css`. `css/styles.css` contiene estilos base, la cabecera global y también reglas de la portada y componentes. Las hojas específicas actuales son `help.css`, `login.css`, `register.css`, `menu.css`, `search-trips.css`, `trip-details.css`, `publish-trip.css`, `planned-trips.css`, `profile.css` y `notifications.css`. Antes de mover o generalizar una regla, comprobar sus usos y el orden de carga de las hojas en los HTML.
- **Formularios:** cada campo con su `<label>`, `name` y validación HTML. El mensaje de error va debajo del campo, en el idioma del Figma.
- **Navegación:** todos los botones y enlaces usan `<a href>`, también el que envía un formulario.
- **Rutas:** son relativas. `index.html` carga `css/tokens.css` y `css/styles.css`. Las páginas de `pages/<grupo>/` cargan `../../css/tokens.css`, `../../css/styles.css` y, según la página, una o más hojas específicas; revisar las etiquetas `<link>` existentes para conocer la lista real. Las imágenes usan rutas relativas. Para volver al inicio: `../../index.html`.
- **Landing (index.html):** es una sola página en la raíz, fuera de `pages/`. Lleva su propia cabecera y pie, y sus botones salen hacia los demás grupos.
- **Responsive:** las adaptaciones actuales están repartidas entre `styles.css` y las hojas específicas. Los `max-width` existentes incluyen 1400, 1200, 1100, 960, 900, 760, 700, 640, 560 y 420 px; los puntos varían por hoja. No asumir un breakpoint único ni mover reglas a `styles.css` sin revisar la página y sus dependencias. Usa Flexbox o Grid, sin archivos ni páginas aparte para móvil.
- **Diseño:** respeta el Figma en los tamaños implementados y usa las variables compartidas de `css/tokens.css`.
- **Pantallas alternativas (error, vacío, rechazo):** son estados de la misma pantalla, no páginas nuevas. Por ahora solo los errores de formulario.
- Si dudas, pregunta. No inventes pantallas.
