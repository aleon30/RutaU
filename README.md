# 🚗 RutaU — Carpooling Universitario

<p align="center" style="background-color: white">
  <img src="img/ruta-u-logo.png">
</p>

Plataforma web de carpooling eficiente, accesible y segura diseñada para conectar a la comunidad universitaria de Lima Metropolitana mediante un modelo de economía colaborativa y conectividad inteligente.

---

## 📌 Contexto y Problemática

Moverse por Lima Metropolitana representa un reto diario para la comunidad universitaria debido a la alta congestión vehicular, los largos tiempos de viaje y las deficiencias del transporte público en términos de comodidad y seguridad. 
- **Estudiantes sin vehículo:** Enfrentan trayectos largos y aglomeraciones en transporte público o deben asumir altos costos en taxis por aplicación.
- **Estudiantes con vehículo:** Realizan recorridos diarios con asientos vacíos, asumiendo en solitario el costo completo del combustible y mantenimiento.

**RutaU** soluciona esta problemática automatizando el *matching* entre estudiantes que comparten rutas y horarios compatibles, garantizando la identidad mediante validación de correo institucional y reduciendo drásticamente los gastos de transporte.

---

## 🎯 Propuesta de Valor

* **Para el Pasajero:** Un traslado más cómodo y seguro que el transporte público, significativamente más económico que un taxi privado, viajando exclusivamente con miembros verificados de su comunidad universitaria.
* **Para el Conductor:** Una alternativa sencilla para monetizar los asientos libres de su vehículo, dividiendo y reduciendo los gastos de combustible y mantenimiento habituales.

---

## 🛠️ Stack Tecnológico y Diseño

* **Frontend:** HTML y CSS.
* **Diseño UI/UX:** Mockframes y Mockups oficiales diseñados en [Figma de RutaU](https://www.figma.com/design/MSs2wWWnPmxHptLHo3lsGn/RutaU?node-id=41-500&m=dev&t=Ugnw5NFw4MgDYzqP-1).
* **Control de Versiones:** Git y GitHub.

---

## 📂 Estructura del Repositorio

La organización del proyecto sigue una estructura modular orientada a separar la interfaz estática, los estilos, los scripts y la documentación del MVP:

```text
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

## 📝 Informe del proyecto

https://docs.google.com/document/d/1hn2dCoQcDkXkMCyznTd8IQAnJhfXsNnR/edit