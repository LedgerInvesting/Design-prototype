import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@design-library': path.resolve(__dirname, '../design-library/src')
    },
    // Allow Vite to resolve dependencies from the design-library's node_modules
    preserveSymlinks: false
  },
  optimizeDeps: {
    include: ['recharts']
  }
})