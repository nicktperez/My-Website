import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))
const serveWorkDocument = (): Plugin => ({
  name: 'serve-work-document',
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url === '/work' || request.url?.startsWith('/work?')) {
        request.url = request.url.replace('/work', '/work/')
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url === '/work' || request.url?.startsWith('/work?')) {
        request.url = request.url.replace('/work', '/work/')
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [serveWorkDocument(), react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        work: resolve(projectRoot, 'work/index.html'),
      },
    },
  },
})
