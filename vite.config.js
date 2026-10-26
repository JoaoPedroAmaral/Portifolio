import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const DEFAULT_BASE = '/'

export default defineConfig(() => ({
  base: process.env.VITE_BASE ?? DEFAULT_BASE,
  plugins: [react(), tailwindcss()],
}))
