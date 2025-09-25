// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,
  css: ["./app/assets/css/tailwind.css"],
  components: {
    dirs: ["~/components"],
  },

  build: {
    transpile: ["tailwindcss"],
  },

  modules: ["@nuxtjs/tailwindcss"],
  plugins: ["~/plugins/sweetalert.ts"],

  // connect to express
  nitro: {
    devProxy: {
      "/api/": { target: process.env.NUXT_PUBLIC_API_URL, changeOrigin: true },
    },
  },

  // runtimeConfig: {
  //   // Private vars (server-side only)
  //   jwtSecret: process.env.JWT_SECRET_KEY,
  //   jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  //   // Public vars (exposed to browser)
  //   public: {
  //     apiUrl: process.env.NUXT_PUBLIC_API_URL,
  //   },
  // },
});
