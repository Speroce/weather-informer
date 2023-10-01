<template>
  <button>
    <span
      v-if="icon"
      class="material-icons"
      :title="title"
      >{{ icon }}</span
    >
  </button>
</template>
<script setup lang="ts">
import 'material-icons/iconfont/material-icons.css';

defineProps<{
  title?: string;
  icon: string;
}>();
</script>
<style scoped>
button {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  border: 0;
  background: #ccc;
  color: rgb(0, 0, 0);
  transition: all 0.2s linear;
  width: 40px;
  height: 40px;
}
button:hover {
  background: #666;
  color: #fff;
}
</style>
