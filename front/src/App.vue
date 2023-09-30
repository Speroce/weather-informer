<template>
  <!-- <header> -->
  <!-- <div class="wrapper"> -->
  <!-- <nav> -->
  <!-- <RouterLink to="/">Home</RouterLink> -->
  <!-- <RouterLink to="/about">About</RouterLink> -->
  <!-- <MyButton label="OK" /> -->
  <!-- <MyInput v-model="v"/> -->
  <!-- {{ v }} -->
  <!-- </nav> -->
  <!-- </div> -->
  <!-- </header> -->

  <RouterView />
</template>

<script setup lang="ts">
import {
  // RouterLink,
  RouterView
} from 'vue-router';
import MyButton from './components/MyButton.vue';
import MyInput from './components/MyInput.vue';
import { ref } from 'vue';
const v = ref('asdasd');
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
