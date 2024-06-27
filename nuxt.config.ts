// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/css/style.css',
    '@/assets/css/responsive.css',
    '@/assets/css/all.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  components: [{ path: '~/components', pathPrefix: true }],
  modules: ['@pinia/nuxt'],
  plugins: [
    '~/plugins/js-cookie.ts',
    { src: '~/plugins/vee-validate.ts', ssr: true },
  ],
  build: {
    transpile: ['vee-validate']
  },
})
