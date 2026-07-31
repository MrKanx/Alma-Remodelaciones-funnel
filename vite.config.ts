import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const pixelId = env.VITE_PIXEL_ID || ''

  return {
    plugins: [
      vue(),
      vueDevTools(),
      {
        name: 'html-transform-pixel',
        transformIndexHtml(html: string) {
          return html.replace(/%VITE_PIXEL_ID%/g, pixelId)
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/colorVariables.module.scss" as *;`,
        },
      },
    },
    server: {
      allowedHosts: ['38828430451a.ngrok-free.app'],
    },
  }
})
