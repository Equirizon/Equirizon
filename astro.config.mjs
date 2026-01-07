// @ts-check
import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'

const isBuilding = process.env.NODE_ENV === 'production' || process.argv.includes('build')

export default defineConfig({
  integrations: [react()],

  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),

  // 2. output: 'static' is default, but ensuring hybrid mode works
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: isBuilding
        ? {
            'react-dom/server': 'react-dom/server.edge',
            crypto: 'node:crypto',
          }
        : {},
    },
    ssr: {
      noExternal: isBuilding ? ['@otplib/plugin-crypto'] : [],
      external: ['node:crypto', 'node:worker_threads', 'node:condition-hooks'],
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
