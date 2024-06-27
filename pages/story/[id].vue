<script setup lang="js">
import { useRoute } from 'vue-router'
import { useStoryStore } from '~/stores/story'
import { formatDateTime } from '~/helpers/formatDate.ts'
import { imageUrl } from "~/helpers/globalVariable";

const routes = useRoute();
const story = useStoryStore();
await story.getStoryById(routes.params.id)
const storyDetail = story.$state.story;
</script>

<template>
  <div class="mt-5 pt-5">
    <section class="detail-story">
      <div class="row">
        <div class="col-lg-8 mb-4 mb-lg-0">
          <h2 class="title">{{ storyDetail.title }}</h2>
          <p class="date">{{ formatDateTime(storyDetail.createdAt) }}</p>
          <img :src="storyDetail.cover_image ? imageUrl + storyDetail.cover_image.url : 'https://placehold.co/600x400?text=Image+Not+Found'" class="thumbnail-story" alt="Story Image"/>
          <div class="story-detail d-flex flex-column gap-2">
            <p v-html="storyDetail.content"></p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-author d-flex justify-content-center align-items-center flex-column">
            <h6 class="author-caption">Author</h6>
            <img :src="storyDetail.profile_picture ? imageUrl + storyDetail.profile_picture : 'https://placehold.co/600x400?text=Image+Profile'" width="70" height="70" alt="Author Image" style="object-fit: cover"/>
            <h6 class="author-name">{{ storyDetail.author ? storyDetail.author.name : 'Profile Not Found' }}</h6>
            <p class="author-caption">My name is {{ storyDetail.author ? storyDetail.author.name : 'Profile Not Found' }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
