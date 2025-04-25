// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  css: ['./layers/base/app/assets/css/main.css'],

  modules: ['@nuxt/ui', '@nuxtjs/mdc'],

  mdc: {
    highlight: {
      theme: 'material-theme-palenight',
      langs: [
        'html',
        'markdown',
        'vue',
        'typescript',
        'javascript',
      ],
    },
  },
})
