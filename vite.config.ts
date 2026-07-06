import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/NY-DMV-Class-D-Prep/',
  plugins: [react()],
})
