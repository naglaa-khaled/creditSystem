import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
    },
    allowedHosts: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
})