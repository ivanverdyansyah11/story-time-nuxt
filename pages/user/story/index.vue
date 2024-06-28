<script setup lang="ts">
import { useStoryStore } from "~/stores/story";
import { alertPage, resetAlert, alertMessage, setAlert } from "~/helpers/globalVariable";
import { formatDateTime } from "~/helpers/formatDate";
import Cookies from "js-cookie";
import { navigateTo } from "nuxt/app";

definePageMeta({
  layout: 'user',
})

const storyStore = useStoryStore();
const storyToDelete = ref(null);

await storyStore.getStoryByAuthor(JSON.parse(Cookies.get('auth-user')).id)

const confirmDeleteStory = async () => {
  if (storyToDelete.value) {
    await storyStore.deleteStory(storyToDelete.value.id);
    if (storyStore.status_code === 200) {
      setAlert('Successfully delete story', 'Story');
    }
    if (storyToDelete.value.cover_image) {
      await storyStore.removeStoryImage(storyToDelete.value.cover_image.id);
    }
    storyToDelete.value = null;
    navigateTo('/user/story')
  }
};

onBeforeRouteLeave((to, from, next) => {
  resetAlert();
  next();
});

onBeforeRouteUpdate((to, from, next) => {
  resetAlert();
  next();
});
</script>

<template>
  <div class="col-6">
    <div v-if="alertPage == 'Story'" class="alert alert-success w-100" role="alert">
      {{ alertMessage }}
    </div>
    <div class="card-user">
      <div class="wrapper-header d-flex align-items-center justify-content-between">
        <h5 class="header-title mb-0">Story List</h5>
        <NuxtLink to="/user/story/create" class="button-outline-dark d-flex align-items-center gap-2">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add Story
        </NuxtLink>
      </div>
      <div class="wrapper-body d-flex flex-column align-items-center">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <td>Title</td>
              <td>Last Update</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="story in storyStore.storyAllByAuthor" :key="story.id">
              <td>{{ story.title }}</td>
              <td>{{ formatDateTime(story.updatedAt) }}</td>
              <td class="d-flex gap-2">
                <NuxtLink :to="`/user/story/${story.id}/edit`" class="button-small d-flex align-items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  Edit
                </NuxtLink>
                <button type="button" class="button-small delete d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="storyToDelete = story">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button v-if="storyStore.storyAllByAuthor > 10" type="button" class="button-outline-dark text-center">Load More</button>
      </div>
    </div>
  </div>

  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Story</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.913rem">Are you sure want to delete this story?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="button-outline-dark" data-bs-dismiss="modal">Cancel Delete</button>
          <button type="button" class="button-dark" @click="confirmDeleteStory" data-bs-dismiss="modal">Delete Story</button>
        </div>
      </div>
    </div>
  </div>
</template>
