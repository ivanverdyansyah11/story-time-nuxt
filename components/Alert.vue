<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ message: string }>();
const showAlert = ref(true);

watch(showAlert, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      showAlert.value = false;
    }, 2000);
  }
});
</script>

<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" v-if="showAlert">
    <div class="toast-header">
      <img src="~/assets/images/brand/brand-logo.svg" class="rounded me-2" alt="Brand Logo" height="32">
      <strong class="me-auto">Notification</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" style="font-size: 0.875rem; border-radius: 4px;">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>

</style>