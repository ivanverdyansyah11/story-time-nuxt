// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css', '@/assets/css/style.css', '@/assets/css/responsive.css', '@/assets/css/all.min.css'],
  components: [{ path: '~/components', pathPrefix: false, }],
  modules: ['@pinia/nuxt'],
})
