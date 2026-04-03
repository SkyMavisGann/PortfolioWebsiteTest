import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Tells Vite your app lives in a sub-directory on GitHub
  base: '/PortfolioWebsiteTest/', 
})