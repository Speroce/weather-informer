<template>
  <div class="list">
    <div class="scroll-area">
      <div
        v-for="item of items"
        :key="item.label"
        class="item"
        :class="{ selected: selected.label === item.label }"
      >
      <div class="label">{{ item.label }}</div>
      <IconButton icon="delete"/>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';

type Item = { label: string };

const props = defineProps<{
  items: Item[];
  withDeleteBtn?: boolean;
  selected: Item;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: Item): void;
}>();
</script>
<style scoped>
.list {
  width: 100%;
  height: 100%;
  background: sandybrown;
  display: flex;
  flex-direction: column;
}
.scroll-area {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.item {
    font-size: 18px;
    background: rgb(173, 190, 20);
    height: 40px;
}
.selected {
    background: rgb(59, 17, 128);
}
</style>
