import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/caveat/wght.css'
import '@fontsource/libre-caslon-display/400.css'
import './index.css'
import App from './App.tsx'
import { initializeTheme } from './theme.ts'

initializeTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
