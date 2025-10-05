// vite.config.js
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium'; // Importa o plugin

export default defineConfig({
  plugins: [cesium()] // Usa o plugin
});