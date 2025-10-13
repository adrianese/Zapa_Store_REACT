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
*   **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio, gracias al uso de Media Queries.

## Ventajas del Proyecto

*   **Modularidad:** Al estar construido con React, el proyecto se beneficia de una alta modularidad. Componentes como `Boton` y `Buscador` son reutilizables y pueden ser mantenidos de forma independiente, lo que facilita la escalabilidad y las actualizaciones.
*   **Mantenibilidad:** La separación de la lógica (componentes JSX), los estilos (archivos CSS dedicados) y la estructura (HTML en `public`) hace que el código sea más limpio y fácil de mantener.
*   **Experiencia de Usuario Dinámica:** React permite crear una interfaz de usuario rápida y reactiva. Las acciones como filtrar productos o agregarlos al carrito se reflejan instantáneamente sin necesidad de recargar la página completa.
*   **Código Optimizado:** El proyecto está estructurado para evitar la redundancia de código, centralizando los estilos globales y manteniendo los estilos específicos a nivel de componente.

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

## Uso e Instalación

Para ejecutar este proyecto en un entorno de desarrollo local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    cd ReactProyect
    ```

2.  **Instalar dependencias:**
    Se necesita Node.js y npm instalados. Ejecuta el siguiente comando en la raíz del proyecto.
    ```bash
    npm install
    ```

3.  **Iniciar la aplicación:**
    Este comando iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador.
    ```bash
    npm start
    ```

4.  **Construir para producción:**
    Para crear una versión optimizada para producción, ejecuta:
    ```bash
    npm run build
    ```