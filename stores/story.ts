import { defineStore } from "pinia";
import axios from "axios";

export const useStoryStore = defineStore('storyStore', {
    state: () => ({
        storyList: [],
        story: {}
    }),
    actions: {
        async getAllStory() {
            const { data } = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories?keyword&author=1&page`)
            this.storyList = data.data
            
        },

        async getStoryById(id: string) {
            const { data } = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`)
            this.story = data.data
        },
    }
})