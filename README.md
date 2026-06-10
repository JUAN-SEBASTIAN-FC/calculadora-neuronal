# 🌌 Converge — Visualizador de Métodos Numéricos

<div align="center">
  <img src="public/assets/logo-light-theme.png" alt="Converge Logo" width="120" />
  <p><strong>Un entorno premium e interactivo para explorar la convergencia matemática en tiempo real.</strong></p>

  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev/)
  [![License](https://img.shields.io/badge/Licencia-MIT-green?style=flat-square)](LICENSE)
</div>

---

## 🎨 Características Destacadas

*   **Visualización Científica Activa**: Analizá el comportamiento de métodos iterativos clásicos paso a paso en un lienzo vectorial moderno.
*   **Aparato Estético de Vanguardia**: Tematizado en modo claro y un rediseño de modo oscuro inspirado en índigos profundos y luces de neón, con auras animadas y órbitas en el fondo.
*   **Parámetros Apilados**: Interfaz de control limpia y ergonómica para configurar ecuaciones, tolerancias, límites e iteraciones.
*   **Design System Pro**: Basado en tokens visuales y una tipografía moderna (*Plus Jakarta Sans* y *Space Grotesk*) para una máxima legibilidad numérica.

---

## 🛠️ Tecnologías Core

*   **Framework**: [React 18](https://react.dev/)
*   **Bundler & Dev Server**: [Vite](https://vitejs.dev/) (con `@vitejs/plugin-react`)
*   **Estilos**: CSS Vanilla con Arquitectura de Tokens (Design System local en `design/`)
*   **Iconografía**: [Lucide](https://lucide.dev/) (integración local y dinámica via NPM)

---

## 📂 Estructura del Proyecto

```bash
├── design/                # Hojas de estilo globales, variables de color, tipografías y fuentes
├── public/
│   └── assets/            # Logos, marcas y recursos gráficos estáticos
├── src/
│   ├── components.jsx     # Componentes encapsulados del Design System (Button, Badges, Inputs, etc.)
│   ├── Plot.jsx           # Escena gráfica para la renderización del lienzo matemático
│   ├── App.jsx            # Controlador de estado principal y Shell de la aplicación
│   ├── index.jsx          # Punto de entrada de inicialización de React y stylesheets
│   └── app.css            # Estilos dedicados de la UI y el layout
├── index.html             # Entrypoint estándar de la aplicación
├── package.json           # Declaración de dependencias y scripts de ejecución
└── vite.config.js         # Configuración del servidor de desarrollo y plugins de Vite
```

---

## 🚀 Guía de Inicio Rápido

### 1. Requisitos Previos

Asegurate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### 2. Instalación de Dependencias

Ejecutá el siguiente comando para instalar las librerías necesarias de forma local:

```bash
npm install
```

### 3. Servidor de Desarrollo

Iniciá el servidor de Vite con recarga rápida (HMR):

```bash
npm run dev
```

El proyecto se abrirá automáticamente en tu navegador por defecto en:
👉 `http://localhost:5173`

### 4. Compilación para Producción

Si necesitás compilar el bundle optimizado para su despliegue:

```bash
npm run build
```

---

## ⚖️ Licencia

Este proyecto está bajo la Licencia MIT.
