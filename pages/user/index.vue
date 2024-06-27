<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { imageUrl } from "~/helpers/globalVariable";

definePageMeta({
  layout: 'user',
})

const authStore = useAuthStore();
await authStore.loadUserFromCookies();
</script>

<template>
  <div class="col-6">
    <div class="card-user">
      <div class="wrapper-header d-flex align-items-center justify-content-between">
        <h5 class="header-title mb-0">My Profile</h5>
        <NuxtLink to="/user/edit" class="button-outline-dark">Edit Profile</NuxtLink>
      </div>
      <div class="wrapper-body">
        <div class="row">
          <div class="col-4">
            <img :src="authStore.user.profile_picture ? imageUrl + authStore.user.profile_picture.url : 'https://placehold.co/600x400?text=Image+Not+Found'" class="profile-image" alt="Profile Image"/>
          </div>
          <div class="col-8 d-flex flex-column gap-3">
            <div class="wrapper-data d-flex">
              <p>Name</p>
              <p>{{ authStore.user.name }}</p>
            </div>
            <div class="wrapper-data d-flex">
              <p>Email</p>
              <p>{{ authStore.user.email }}</p>
            </div>
            <div class="wrapper-data d-flex">
              <p>Biodata</p>
              <p>{{ authStore.user.biodata ? authStore.user.biodata : '-' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
