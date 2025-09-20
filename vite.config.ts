import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/tokens.scss" as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Add timestamp to CSS files for cache busting
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return `assets/[name]-[hash]-${Date.now()}[extname]`;
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    port: 5174,
    open: true
  }
})
