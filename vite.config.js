import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const catalogDevOrigin = process.env.CATALOG_DEV_ORIGIN || 'http://127.0.0.1:4174'
const catalogProxy = {
  '/data': {
    target: catalogDevOrigin,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/data/, ''),
  },
}

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
    host: true,
    proxy: catalogProxy,
  },
  preview: {
    proxy: catalogProxy,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
})
