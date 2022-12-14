import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "url";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/`,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build : {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
            return `assets/${extType}/[hash][extname]`;
          } else {
            return `assets/${extType}/[name]-[hash][extname]`;
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  }
})
