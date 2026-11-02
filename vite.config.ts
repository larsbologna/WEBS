import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base './' permite publicar en GitHub Pages (subcarpeta) o Vercel sin cambios
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
