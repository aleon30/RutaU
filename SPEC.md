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
│   ├── styles.css                   # Único CSS con los estilos de todas las pantallas
│   └── tokens.css                   # Único CSS con variables para todas las pantallas
├── js/                              # Vacía por ahora, sin archivos
├── img/                             # Imágenes del sitio
└── pages/
    ├── auth/                        # Grupo de acceso (se nombra por su función)
    │   ├── login.html
    │   └── registro.html
    ├── help/
    │   └── ayuda.html
    ├── user/
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
- **Archivos:** un `.html` por pantalla dentro de la carpeta de su grupo en `pages/`, y un solo `css/styles.css` para todo el sitio. Nombres en minúsculas y guiones.
- **HTML:** semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), un solo `<h1>` por página, `alt` en todas las imágenes y `<label>` en cada campo.
- **CSS:** clases con nombres claros (estilo BEM), sin estilos inline ni `!important`. Colores, fuentes y espacios van como variables al inicio de `css/styles.css`, y los estilos de cada pantalla van en su propia sección con un comentario.
- **Formularios:** cada campo con su `<label>`, `name` y validación HTML. El mensaje de error va debajo del campo, en el idioma del Figma.
- **Navegación:** todos los botones y enlaces usan `<a href>`, también el que envía un formulario.
- **Rutas:** son relativas. `index.html` usa `css/styles.css` e `img/...`. Las páginas de `pages/<grupo>/` usan `../../css/styles.css` e `../../img/...`. Para ir a otra página de otro grupo: `../participante/events.html`; para volver al inicio: `../../index.html`.
- **Landing (index.html):** es una sola página en la raíz, fuera de `pages/`. Lleva su propia cabecera y pie, y sus botones salen hacia los demás grupos.
- **Responsive:** el Figma trae dos diseños por pantalla, escritorio y móvil. Impleméntalos en el mismo `.html` con `@media` en `css/styles.css`: empieza por el móvil y usa `@media (min-width: 768px)` para el escritorio. Usa Flexbox o Grid, sin archivos ni páginas aparte para móvil.
- **Diseño:** respeta el Figma en ambos tamaños y usa las variables de `css/styles.css`.
- **Pantallas alternativas (error, vacío, rechazo):** son estados de la misma pantalla, no páginas nuevas. Por ahora solo los errores de formulario.
- Si dudas, pregunta. No inventes pantallas.