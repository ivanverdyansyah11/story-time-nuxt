<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useStoryStore } from '~/stores/story'
import { imageUrl } from "~/helpers/globalVariable";
import { formatDateTime } from "~/helpers/formatDate";
import Cookies from "js-cookie";

definePageMeta({
  layout: 'user',
})

const storyStore = useStoryStore()
let storyLength = ref(0)
const bookmarksState = ref({});
const bookmarkedStories = ref([]);

const getBookmarkedStories = async () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
  const storyIds = bookmarks[JSON.parse(Cookies.get('auth-user')).id] || [];

  const stories = [];
  for (const id of storyIds) {
    await storyStore.getStoryById(id);
    const story = storyStore.story
    stories.push(story);
  }
  return stories;
};

const checkIfBookmarked = (storyId: number) => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
  return bookmarks[JSON.parse(Cookies.get('auth-user'))] ? bookmarks[JSON.parse(Cookies.get('auth-user'))].includes(storyId) : false;
};

const addBookmark = (id: number) => {
  const storyId = id;
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};

  if (!bookmarks[JSON.parse(Cookies.get('auth-user'))]) {
    bookmarks[JSON.parse(Cookies.get('auth-user'))] = [];
  }

  if (!bookmarks[JSON.parse(Cookies.get('auth-user'))].includes(storyId)) {
    bookmarks[JSON.parse(Cookies.get('auth-user'))].push(storyId);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    bookmarksState.value[storyId] = true;
  }
};

const removeBookmark = (id: number) => {
  const storyId = id;
  const userId = JSON.parse(Cookies.get('auth-user')).id;
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};

  if (bookmarks[userId]) {
    const index = bookmarks[userId].indexOf(storyId);
    if (index !== -1) {
      bookmarks[userId].splice(index, 1);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      bookmarksState.value[storyId] = false;

      const storyIndex = bookmarkedStories.value.findIndex(story => story.id === storyId);
      if (storyIndex !== -1) {
        bookmarkedStories.value.splice(storyIndex, 1);
      }
    }
  }
};

const toggleBookmark = (id: number) => {
  if (bookmarksState.value[id]) {
    removeBookmark(id);
  } else {
    addBookmark(id);
  }
};

onMounted(async () => {
  const stories = await getBookmarkedStories();
  bookmarkedStories.value = stories;
  storyLength.value = bookmarkedStories.value.length
  const initialBookmarks = {};
  stories.forEach(story => {
    initialBookmarks[story.id] = true;
  });
  bookmarksState.value = initialBookmarks;
});
</script>

<template>
  <div class="col-6">
    <div class="card-user">
      <h5 class="header-title mb-3">My Bookmark</h5>
      <div class="wrapper-body">
        <div class="row">
          <div v-if="storyLength > 0" class="col-md-6 mb-3 mb-lg-4" v-for="(story, index) in bookmarkedStories" :key="index">
            <div class="card w-100" style="width: 18rem">
              <div class="wrapper-image position-relative">
                <img :src="story.cover_image ? imageUrl + story.cover_image.url : 'https://placehold.co/600x400?text=Image+Not+Found'" class="card-img-top thumbnail-story position-relative" alt="Story Thumbnail"/>
                <button type="button"
                        class="wrapper-icon position-absolute d-flex align-items-center justify-content-center"
                        @click="toggleBookmark(story.id)">
                  <div :class="{'bookmark-icon': true, 'bookmark-add': !bookmarksState[story.id], 'bookmark-remove': bookmarksState[story.id]}"></div>
                </button>
              </div>
              <NuxtLink :to="{path: `story/${story.id}`}" class="card-body">
                <div class="card-text">
                  <div class="wrapper d-flex align-items-center gap-3 justify-content-between mb-1">
                    <h6 class="card-title">{{ story.title }}</h6>
                    <p class="card-caption" style="text-wrap: nowrap" v-if="story.author">by {{ story.author.name }}</p>
                  </div>
                  <p class="card-caption description mb-1" v-html="story.content"></p>
                  <p class="card-caption date">{{ formatDateTime(story.createdAt) }}</p>
                  <p class="card-tag" v-if="story.category">{{ story.category.name }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div v-else class="col-12 text-center d-flex justify-content-center">
            <img src="~/assets/images/other/empty-data.svg" alt="Empty Data" class="img-fluid" style="aspect-ratio: 1/1; width: 30%;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

