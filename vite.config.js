import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://evilcatkimi.github.io/cmc-interview-ai/
  base: '/cmc-interview-ai/',
  plugins: [react()],
})
