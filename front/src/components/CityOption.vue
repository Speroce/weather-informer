<template>
  <div class="city-option">
    <span @click="click">{{ label }}</span>
    <IconButton
      :icon="isFavorite ? 'star' : 'star_border'"
      @click="favClick"
    />
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import { toRefs } from 'vue';

const props = defineProps<{
  label: string;
  isFavorite: boolean;
}>();

const { isFavorite, label } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:isFavorite', value: boolean): void;
  (e: 'click', value: string): void;
}>();
function favClick() {
  emit('update:isFavorite', !isFavorite.value);
}
function click() {
  emit('click', label.value);
}
</script>

<style scoped>
.city-option {
  border: 1px solid black;
  border-radius: 20px;
  padding: 4px;
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
}
span {
  margin-right: 8px;
}
</style>
