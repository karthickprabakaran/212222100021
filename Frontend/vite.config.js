// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  proxy: {
    '/api/logs': {
      target: 'http://20.244.56.144',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/logs/, '/evaluation-service/logs'),
    }
  },
});
