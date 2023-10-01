<template>
  <RouterView />
  <NotifyContainer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NotifyContainer from './components/NotifyContainer.vue';
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
