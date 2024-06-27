import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'
import Cookies from 'js-cookie'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const token = ref(Cookies.get('auth-token'))

    if (token.value !== undefined) {
        authStore.user = JSON.parse(Cookies.get('auth-user'))
        authStore.isLoggedIn = true
    }

    if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/')
    }

    if (!authStore.isLoggedIn && to.path.startsWith('/user')) {
        return navigateTo('/login')
    }
})