import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('lightweight-charts') || id.includes('echarts')) {
            return 'charts'
          }
        },
      },
    },
  },
})
