import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
const redirectArchivedWork = (): Plugin => {
  const install = (server: { middlewares: { use: (handler: (request: { url?: string }, response: { writeHead: (status: number, headers: Record<string,string>) => void; end: () => void }, next: () => void) => void) => void } }) => {
    server.middlewares.use((request, response, next) => {
      if (/^\/work(?:[/?]|$)/.test(request.url || '')) { response.writeHead(302, { Location: '/#work' }); response.end(); return }
      next()
    })
  }
  return { name: 'redirect-archived-work', configureServer: install, configurePreviewServer: install }
}
export default defineConfig({ plugins: [redirectArchivedWork(), react()] })
