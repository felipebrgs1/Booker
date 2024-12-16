<template>
  <div class="d-flex flex-column min-vh-100 bg-dark">
    <Navbar />
    <RouterView></RouterView>

  </div>
</template>

<script setup lang="ts">
import Navbar from './Layout/Navbar.vue';
</script>