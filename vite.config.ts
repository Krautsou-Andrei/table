/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svg from '@neodx/svg/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svg({
      group: true,
      root: 'src/assets/svg',
      output: 'public/sprite',
      metadata: 'src/components/ui/app-icon/sprite.h.ts',
      resetColors: {
        exclude: [/^app/],
        replaceUnknown: 'currentColor',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
