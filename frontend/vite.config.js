import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium'; 

export default defineConfig({
  plugins: [cesium()], 

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});