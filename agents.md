# 🤖 Instrucciones para Agentes de IA – Proyecto RutaU

Este documento establece las reglas de arquitectura, diseño, alcance funcional y restricciones técnicas que **deben** seguir estrictamente todos los agentes de IA al generar, modificar o revisar código en este repositorio.

---

## 1. Contexto del Proyecto y Problemática (Source of Truth)
- **Producto:** RutaU (Startup: RutaLabs). Plataforma web de carpooling orientada a estudiantes universitarios en Lima Metropolitana.
- **Problemática Principal:** La alta congestión vehicular, los tiempos de desplazamiento elevados y los costos de transporte público/privado en Lima. El sistema busca conectar de forma segura a estudiantes con vehículo propio (para reducir gastos de combustible) con estudiantes sin vehículo (buscando seguridad, comodidad y economía frente a los taxis).
- **Seguridad y Confianza (Crítico):** Toda interacción y registro debe reflejar un entorno seguro basado estrictamente en la validación de la comunidad universitaria (correo institucional y perfiles verificados).

---

## 2. Restricciones Absolutas de Diseño y Funcionalidad
- **Fidelidad al Figma:** La interfaz de usuario debe replicar exactamente los diseños, estructura y componentes definidos en el [Figma de RutaU](https://www.figma.com/design/MSs2wWWnPmxHptLHo3lsGn/RutaU?node-id=41-500&m=dev&t=Ugnw5NFw4MgDYzqP-1).
- **Prohibición de Elementos Adicionales:** **No** agregues más páginas, secciones, elementos flotantes ni funcionalidades fuera de los mockups aprobados y las 22 Historias de Usuario (US_01 a US_22) descritas en el reporte del proyecto.
- **Guía de Estilos Oficial:** Respeta rigurosamente los colores, tipografía (`Montserrat`), estados de botones y componentes de formulario especificados en el sistema de diseño del Figma:
  - **Color Primario:** `#2E94F1` (Azul principal de acción).
  - **Color Secundario:** `#FAA927` (Naranja de realce/dirección).
  - **Color Terciario / Texto Oscuro:** `#13263E`.
  - **Fondos:** `#FFFFFF` y `#D9D9D9` (Fondo 2).
  - **Colores Semánticos:** Éxito (`#17C800`), Fracaso/Error (`#EB0000`).

---

## 3. Arquitectura y Reglas de Implementación
- **Alcance por Fases (Sprints):**
  - *Sprint 1:* Landing Page y Web Application base en HTML, CSS y JavaScript estructurados según los flujos de usuario (Registro, Login, Búsqueda, Detalles del viaje, Publicación de viaje y Perfil).
  - *Sprint 2:* Integración de lógica avanzada, APIs y modelo de IA conversacional para asistencia personalizada (US_19).
- **Manejo de Errores y Validaciones:**
  - Los formularios deben validar campos obligatorios y resaltar los errores en rojo (`#EB0000`), mostrando mensajes claros tal como se define en los criterios de aceptación de las User Stories (ej. validación estricta de correo institucional).
  - Las acciones destructivas o críticas (como cancelar un viaje o anular una reserva) deben implementar modales de confirmación de doble vía (Volver / Sí, cancelar) para prevenir errores del usuario (Heurística de Nielsen 5).

---

## 4. Protocolo de Respuesta para el Agente de IA
1. **Verificar Alcance:** Antes de implementar un componente o vista, revisa si forma parte de los mockups del Figma y del Product Backlog. Si no está contemplado, detente y solicita confirmación.
2. **Modularidad y Limpieza:** Mantén la separación de responsabilidades en el código front-end (HTML semántico, estilos organizados y scripts limpios).
3. **No inventar librerías:** Utiliza únicamente las tecnologías y dependencias acordadas para el desarrollo web base de RutaU.