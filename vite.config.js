import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const GITHUB_PAGES_BASE = '/Portifolio/'
const DEV_BASE = '/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.VITE_BASE ?? GITHUB_PAGES_BASE : DEV_BASE,
  plugins: [react(), tailwindcss()],
}))
