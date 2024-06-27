<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import Navbar from '~/components/Navbar.vue';
import { navigateTo } from "nuxt/app";

const authStore = useAuthStore();

const logout = async (event: any) => {
  event.preventDefault();
  await authStore.logout();
  navigateTo('/login');
};
</script>

<template>
  <div>
    <Navbar />
    <div class="container">
      <section class="user">
        <div class="row justify-content-center">
          <div class="col-3">
            <div class="card-sidebar d-flex flex-column">
              <NuxtLink to="/user" class="sidebar-link d-flex align-items-center gap-2" :class="{active: $route.path === '/user' || $route.path === '/user/edit',}">
                <img src="~/assets/images/icons/user.svg" width="17" height="17" alt="User Icon"/>
                <span>My Profile</span>
                <img src="~/assets/images/icons/arrow-dark.svg" width="24" alt="Arrow Icon"/>
              </NuxtLink>
              <NuxtLink href="/user/story" class="sidebar-link d-flex align-items-center gap-2" :class="{ active: $route.path === '/user/story' }">
                <img src="~/assets/images/icons/story.svg" width="17" height="17" alt="Story Icon"/>
                <span>Story List</span>
                <img src="~/assets/images/icons/arrow-dark.svg" width="24" alt="Arrow Icon"/>
              </NuxtLink>
              <NuxtLink to="/user/bookmark" class="sidebar-link d-flex align-items-center gap-2" :class="{ active: $route.path === '/user/bookmark' }">
                <img src="~/assets/images/icons/bookmark.svg" width="17" height="17" alt="Bookmark Icon"/>
                <span>Bookmark</span>
                <img src="~/assets/images/icons/arrow-dark.svg" width="24" alt="Arrow Icon"/>
              </NuxtLink>
              <form class="w-100 d-flex align-items-center gap-2" @submit.prevent="logout">
                <button type="submit" class="w-100 sidebar-link d-flex align-items-center gap-2" style="border: none; background-color: white !important;">
                  <img src="~/assets/images/icons/logout.svg" width="17" height="17" alt="Bookmark Icon"/>
                  <span class="w-100 text-start">Logout</span>
                  <img src="~/assets/images/icons/arrow-dark.svg" width="24" alt="Arrow Icon"/>
                </button>
              </form>
            </div>
          </div>
          <slot />
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>