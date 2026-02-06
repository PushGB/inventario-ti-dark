# Inventario IT - Dark Mode

Application web para gestión de inventario IT con diseño corporativo oscuro.

## Requisitos Previos

- **Node.js**: Debes tener instalado Node.js (v18 recomendada). Puedes descargarlo en [nodejs.org](https://nodejs.org).

## Instalación

1. Abre una terminal en esta carpeta.
2. Ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   npm install
   ```
   Si tienes problemas con `npm`, asegúrate de que Node.js esté correctamente instalado y en tu PATH.

## Ejecución

Para levantar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Estructura del Proyecto

- `src/components`: Componentes reutilizables (UI, Dashboard, Inventario).
- `src/data/mock.ts`: Datos de prueba generados.
- `src/types`: Definiciones de TypeScript.
- `tailwind.config.js`: Configuración de temas y colores.
