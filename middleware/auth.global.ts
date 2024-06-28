import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'
import Cookies from 'js-cookie'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    const authToken = useCookie('auth-token')
    const authUser = useCookie('auth-user')

    if(authToken.value) {
        authStore.token = authToken.value
    }

    if(authUser.value) {
        authStore.user = authUser.value
    }

    if (!authStore.isLoggedIn && to.path !== '/login') {
        return navigateTo('/login')
    } else if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/')
    }
})