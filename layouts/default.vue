<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
</script>

<template>
  <div>
    <Navbar />
    <div class="container">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>