⚠️ Disclaimer
Este proyecto, Zapa-Store-React, ha sido desarrollado exclusivamente con fines educativos y demostrativos. No está diseñado para entornos de producción. El código puede contener fallas de seguridad, lógica no optimizada y carece de validaciones exhaustivas y controles de acceso.
No se recomienda su uso en aplicaciones reales sin una auditoría completa, pruebas rigurosas y fortalecimiento de seguridad.

Sitio Web:
https://react-proyecto-czfhznp11-adrianeses-projects.vercel.app/

Sitio Web:
https://react-proyecto-nu.vercel.app/

# Proyecto E-commerce con React

Este es el repositorio de un proyecto de E-commerce desarrollado con React. La aplicación simula una tienda en línea, permitiendo a los usuarios explorar un catálogo de productos, filtrarlos según sus necesidades, compararlos y gestionar un carrito de compras.

## Descripción General

La aplicación está diseñada para ser una plataforma de comercio electrónico robusta y moderna. Utiliza una arquitectura basada en componentes de React para crear una interfaz de usuario interactiva y reutilizable. El enfoque principal es ofrecer una experiencia de usuario fluida para la búsqueda y selección de productos.

## Características Principales

*   **Catálogo de Productos:** Muestra una lista de productos en un diseño de cuadrícula (grid) fácil de navegar.
*   **Búsqueda y Filtrado:** Incluye un potente componente de búsqueda que permite a los usuarios filtrar productos por:
    *   Marca
    *   Actividad o categoría
    *   Ordenar por precio (ascendente/descendente)
*   **Comparador de Productos:** Una funcionalidad que permite a los usuarios seleccionar varios productos y ver sus especificaciones lado a lado en una vista dedicada.
*   **Carrito de Compras:** Los usuarios pueden agregar productos a un carrito, ver un resumen de su selección y simular el proceso de compra.
*   **Páginas Estáticas:** Incluye secciones informativas como "Nosotros" y un formulario de "Contacto".
*   **Páginas Dinámicas:** Incluye secciones informativas con Detalles de Productos y un formulario de "Inicio de Sesión".
*   **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio, gracias al uso de Media Queries.


## Estructura del Proyecto

El proyecto sigue una estructura estándar para aplicaciones creadas con `create-react-app`.

```
ReactProyect/
├── public/
│   ├── index.html      # Plantilla HTML principal
│   ├── favicon.ico     # Icono de la aplicación
│   └── ...             # Otros assets estáticos
│
└── src/
    ├── components/     # Componentes reutilizables de React (Boton, Buscador, etc.)
    ├── css/            # Hojas de estilo globales y específicas
    ├── assets/         # Imágenes y otros recursos para los componentes
    ├── App.js          # Componente principal de la aplicación y enrutamiento
    └── index.js        # Punto de entrada de la aplicación
```

