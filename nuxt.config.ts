// https://nuxt.com/docs/api/configuration/nuxt-config

import { vueI18nConfig } from "./i18n.config";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,
  css: ["./app/assets/css/tailwind.css", "./app/assets/css/main.scss"],
  components: [
    {
      global: true,
      dirs: ["~/components"],
    },
  ],

  i18n: {
    locales: [
      { code: "kh", name: "Khmer", file: "kh.js" },
      { code: "en", name: "English", file: "en.js" },
    ],
    defaultLocale: "kh",
    langDir: "locales/",
    vueI18n: "./i18n.config.ts",
  },

  build: {
    transpile: ["tailwindcss"],
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  plugins: ["~/plugins/sweetalert.ts"],

  // connect to express
  nitro: {
    devProxy: {
      "/api/": { target: process.env.NUXT_PUBLIC_API_URL, changeOrigin: true },
    },
  },
});
