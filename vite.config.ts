import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'pixi': ['pixi.js'],
          'vue-vendor': ['vue', 'pinia']
        }
      }
    }
  },
  server: {
    port: 3000
  }
})
