import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'sierra-nonreceptive-fallon.ngrok-free.dev',
      '.ngrok-free.dev', // Allow any ngrok subdomain
    ],
  },
})
