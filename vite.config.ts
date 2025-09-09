import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        onProxyReq(proxyReq, req, res) {
          console.log('Proxying request:', req.url);
        },
        onError(err, req, res) {
          console.error('Proxy error:', err);
        }
      },
    },
  },
});
