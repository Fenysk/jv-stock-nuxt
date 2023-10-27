import { resolve } from "path";

export default defineNuxtConfig({
    alias: {
        "@": resolve(__dirname, "/"),
    },
    css: ["~/assets/css/main.css"],
    devtools: { enabled: false },
    modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@pinia/nuxt"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
});
