import { defineStore } from "pinia";
import { apiUrl } from "~/helpers/globalVariable";

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categoryAll: [],
        category: {},
        error: null as any,
        loading: false as any,
    }),
    actions: {
        async getAllCategory() {
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch(`${apiUrl}categories`);
                this.categoryAll = data?.data;
            } catch (error) {
                this.error = error;
                console.error('Error fetching categories:', this.error);
            } finally {
                this.loading = false;
            }
        },
    }
})