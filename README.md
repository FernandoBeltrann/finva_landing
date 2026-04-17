# Finva Landing

Landing web de Finva hecha con React + Vite, pensada para ser fácil de editar y sencilla de desplegar en Railway.

## Stack

- React
- Vite
- CSS puro
- `serve` para servir el build en Railway

## Cómo correrla localmente

```bash
npm install
npm run dev
```

## Cómo generar producción

```bash
npm install
npm run build
npm run start
```

## Deploy en Railway

1. Sube esta carpeta a GitHub.
2. En Railway, crea un proyecto nuevo desde ese repositorio.
3. Railway normalmente detectará Node.js automáticamente.
4. Usa estos comandos si te los pide:
   - Build command: `npm run build`
   - Start command: `npm run start`
5. Si quieres que el formulario sí envíe datos, agrega una variable de entorno:
   - `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/tu-endpoint`

## Formulario

La landing ya trae el formulario hecho. Hay dos comportamientos:

- Si configuras `VITE_FORMSPREE_ENDPOINT`, enviará el formulario a ese endpoint.
- Si no configuras nada todavía, el formulario mostrará éxito visual para que puedas seguir viendo el flujo y luego conectarlo.

## Qué puedes cambiar fácil después

- Textos en `src/App.jsx`
- Colores y estilo en `src/styles.css`
- Meta tags del sitio en `index.html`

## Siguientes mejoras recomendadas

- Agregar logo oficial de Finva
- Conectar el formulario a correo / CRM / webhook
- Agregar casos de uso o logos de aliados
- Agregar analytics (PostHog, GA4 o Meta Pixel)
