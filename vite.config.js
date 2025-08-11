import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Mayank_Portfolio/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          icons: ['react-icons/fa', 'react-icons/si', 'react-icons/fi']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
