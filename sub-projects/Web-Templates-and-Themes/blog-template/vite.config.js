import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', // Ensures assets use relative paths for GitHub pages compatibility
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        smm: resolve(__dirname, 'smm.html'),
      }
    }
  }
})
