import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mmy2.pythonanywhere.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
