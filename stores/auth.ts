import { defineStore } from 'pinia';
import { apiUrl } from "~/helpers/globalVariable";
import { navigateTo } from 'nuxt/app';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        token: '',
        user: {},
        status_code: null,
    }),
    actions: {
        async loadUserFromCookies() {
            const token = Cookies.get('auth-token');
            if (token) {
                this.token = token;
                try {
                    const data = await $fetch(`${apiUrl}users/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    this.user = data?.data;
                } catch (error) {
                    this.logout();
                }
            }
        },
        async login(credentials: any) {
            try {
                const response = await $fetch(`${apiUrl}auth/local`, {
                    method: 'POST',
                    body: credentials
                });
                this.token = response?.data.jwt;
                this.user = response?.data.user;
                this.isLoggedIn = true;
                Cookies.set('auth-token', this.token);
                Cookies.set('auth-user', JSON.stringify(this.user));
                this.status_code = response?.data ? 200 : null;
            } catch (error) {
                console.log(error.message)
            }
        },
        async register(registerData: any) {
            try {
                const response = await $fetch(`${apiUrl}auth/local/register`, {
                    method: 'POST',
                    body: registerData,
                });
                this.status_code = response?.data ? 200 : null;
            } catch (error) {
                console.log(error.message)
            }
        },
        async updateProfile(updateData: any) {
            try {
                const token = Cookies.get('auth-token');
                const response = await $fetch(`${apiUrl}users/me`, {
                    method: 'PATCH',
                    body: updateData,
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                this.user = response.data;
                Cookies.set('auth-user', JSON.stringify(this.user));
                this.status_code = response.data ? 200 : null;
            } catch (error) {
                console.log(error.message)
            }
        },
        async uploadProfilePicture(updateDataImage: any) {
            try {
                const token = Cookies.get('auth-token');
                await $fetch(`${apiUrl}upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: updateDataImage,
                });
            } catch (error) {
                console.log(error.message)
            }
        },
        async removeProfilePicture(profilePicture: number) {
            try {
                const token = Cookies.get('auth-token');
                await $fetch(`${apiUrl}upload/files/${profilePicture}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.log(error.message)
            }
        },
        async logout() {
            this.token = null;
            this.user = null;
            this.isLoggedIn = false;
            Cookies.remove('auth-token');
            Cookies.remove('auth-user');
        },
    },
});