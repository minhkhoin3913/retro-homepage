import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/retro-homepage/',  // Replace with your actual repo name
  build: {
    assetsInlineLimit: 0, // Ensures proper asset handling
  }
});