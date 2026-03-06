// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

<<<<<<< HEAD
  modules: ['@nuxt/eslint', '@nuxt/image'],

  vite: {
    optimizeDeps: {
      include: ['debug'],
    },
  },

  nitro: {
    storage: {
      db: {
        driver: 'fs',
        base: './.data',
      },
    },
  },

  $production: {
    nitro: {
      storage: {
        db: {
          driver: 'netlify-blobs',
          name: 'db',
        },
      },
    },
  },
=======
  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/ui', '@nuxt/eslint'],
>>>>>>> origin/3-1-start
})
