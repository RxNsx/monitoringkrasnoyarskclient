import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 3000,
    strictPort: true
  },
  server: {
    allowedHosts: ['monitoring_client_container'],
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://localhost:3000"
  }
})
