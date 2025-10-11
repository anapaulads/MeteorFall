import { resolve } from 'path';
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [cesium()],

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        casosReais: resolve(__dirname, 'pages/casos-reais.html'),
        cenariosDeImpacto: resolve(__dirname, 'pages/cenarios-de-impacto.html'),
        consequenciasGlobais: resolve(__dirname, 'pages/consequencias-globais.html'),
        escalasDeRisco: resolve(__dirname, 'pages/escalas-de-risco.html'),
        historias: resolve(__dirname, 'pages/historias.html'),
        lista: resolve(__dirname, 'pages/lista.html'),
        missao: resolve(__dirname, 'pages/missao.html'),
        projeto: resolve(__dirname, 'pages/projeto.html'),
        quiz: resolve(__dirname, 'pages/quiz.html'),
        simulador: resolve(__dirname, 'pages/simulador.html'),
        sobreNos: resolve(__dirname, 'pages/sobre-nos.html'),
        testeChave: resolve(__dirname, 'pages/teste_chave.html'),
      },
    },
  },
});