import { defineStore } from "pinia";
import { apiUrl } from "~/helpers/globalVariable";
import { useAuthStore } from "~/stores/auth";
import Cookies from "js-cookie";

export const useStoryStore = defineStore('storyStore', {
    state: () => ({
        storyAll: [],
        storyAllByAuthor: [],
        story: {},
        keyword: ref(''),
        page: 1,
        totalPages: 0,
        error: null as any,
        loading: false as any,
        status_code: ref<number | null>(null),
    }),
    actions: {
        async getAllStory() {
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch(`${apiUrl}stories?keyword&author&page=${this.page}`);
                this.storyAll = data?.data;
                this.totalPages = data?.meta?.pagination?.pageCount;
            } catch (error) {
                this.error = error;
                console.error('Error fetching stories:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async getStoryById(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch(`${apiUrl}stories/${id}`);
                this.story = data?.data;
            } catch (error) {
                this.error = error;
                console.error('Error fetching stories:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async getStoryByAuthor(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch(`${apiUrl}stories?keyword&author=${id}&page`);
                this.storyAllByAuthor = data?.data;
            } catch (error) {
                this.error = error;
                console.error('Error fetching stories:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async searchStory() {
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch(`${apiUrl}stories?&keyword=${this.keyword}`)
                this.storyAll = data?.data
                if (this.keyword === '') {
                    await this.getAllStory()
                }
            } catch(error) {
                this.error = error;
                console.error('Error fetching stories:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async sortAsc () {
            this.storyAll.sort(function (a,b) {return a.createdAt.localeCompare(b.createdAt)})
        },
        async sortDesc () {
            this.storyAll.sort(function (a,b) {return b.createdAt.localeCompare(a.createdAt)})
        },
        async loadMoreStories() {
            if (this.page >= this.totalPages) return;
            this.page++;
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch(`${apiUrl}stories?keyword&author&page=${this.page}`);
                this.storyAll = [...this.storyAll, ...data?.data];
            } catch (error) {
                this.error = error;
                console.error('Error fetching more stories:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async createStory(createData: any) {
            this.loading = true;
            this.error = null;
            try {
                const token = Cookies.get('auth-token');
                const response = await $fetch(`${apiUrl}stories`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: createData
                });
                this.status_code = response.data ? 200 : null;
            } catch (error) {
                this.error = error;
                console.error('Error create story:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async updateStory(id: number, updateData: any) {
            this.loading = true;
            this.error = null;
            try {
                const token = Cookies.get('auth-token');
                const response = await $fetch(`${apiUrl}stories/${id}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: updateData,
                });
                this.status_code = response.data ? 200 : null;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async uploadImageStory(createDataImage: any) {
            this.loading = true;
            this.error = null;
            try {
                const token = Cookies.get('auth-token');
                await $fetch(`${apiUrl}upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: createDataImage,
                });
            } catch (error) {
                this.error = error;
                console.error('Error uploading image:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async removeStoryImage(storyImage: number) {
            this.loading = true;
            this.error = null;
            try {
                const token = Cookies.get('auth-token');
                await $fetch(`${apiUrl}upload/files/${storyImage}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } catch (error) {
                this.error = error;
                console.error('Error removing image:', this.error);
            } finally {
                this.loading = false;
            }
        },
        async deleteStory(storyId: number) {
            this.loading = true;
            this.error = null;
            try {
                const token = Cookies.get('auth-token');
                const response = await fetch(`${apiUrl}stories/${storyId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                })
                this.status_code = response.data ? 200 : null;
                await this.getStoryByAuthor(JSON.parse(Cookies.get('auth-user')).id)
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
    }
})