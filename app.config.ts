import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['better-auth-harmony', 'validator'],
    },
    plugins: [tailwindcss()],
  },
})
