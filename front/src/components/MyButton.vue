<template>
  <button>{{ label }}</button>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
<style scoped>
button {
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  border: 0;
  background: #ccc;
  color: rgb(0, 0, 0);
  transition: all 0.2s linear;
}
button:hover {
  background: #666;
  color: #fff;
}
</style>
