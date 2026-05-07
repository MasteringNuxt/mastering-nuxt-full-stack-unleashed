// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxtjs/mdc"],

  runtimeConfig: {
    openaiApiKey: "",
    anthropicApiKey: "",
  },

  vite: {
    optimizeDeps: {
      include: ["debug"],
    },
  },

  mdc: {
    highlight: {
      theme: {
        default: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      langs: ["html", "markdown", "vue", "typescript", "javascript"],
    },
  },
})
