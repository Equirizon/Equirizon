// @ts-check
import { defineConfig, envField } from 'astro/config'

import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  adapter: cloudflare(),

  platformProxy: {
    enabled: true,
  },
  // This is the important part for Node libraries
  nodejsCompat: true,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      // @ts-expect-error: https://github.com/withastro/astro/issues/12824
      alias: import.meta.env.PROD && {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },

  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'client', access: 'public' }),
      SUPABASE_ANON_KEY: envField.string({ context: 'client', access: 'public' }),
      TOTP_SECRET: envField.string({ context: 'server', access: 'secret' }),
      APP_MODE: envField.enum({
        values: ['development', 'preview', 'production'],
        context: 'client',
        access: 'public',
        default: 'production',
      }),
    },
  },
})
