import { ref } from 'vue';

export const apiUrl = 'https://storytime-api.strapi.timedoor-js.web.id/api/'
export const imageUrl = 'https://storytime-api.strapi.timedoor-js.web.id'
export let alertMessage: string = '';
export let alertPage: string = '';
// export const routeName = ref('');

export function setAlert(message: string, page: string) {
    alertMessage = message;
    alertPage = page;
}

export function resetAlert() {
    alertMessage = '';
    alertPage = '';
}