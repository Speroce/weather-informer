<template>
  <div class="list">
    <div class="scroll-area">
      <div
        v-for="item of items"
        :key="item.label"
        class="item"
        :class="{ selected: selected.label === item.label }"
        @click="select(item)"
      >
        <div class="label">{{ item.label }}</div>
        <IconButton
          @click="deleteItem(item)"
          v-if="withDeleteBtn"
          icon="cancel"
          title="Удалить из избранного"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import { toRefs } from 'vue';

type Item = { label: string };

const props = defineProps<{
  items: Item[];
  withDeleteBtn?: boolean;
  selected: Item;
}>();

const { items } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:selected', value: Item): void;
  (e: 'delete', value: Item): void;
}>();
function select(item: Item) {
  emit('update:selected', item);
}
function deleteItem(item: Item) {
  emit('delete', item);
}
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
  background: rgb(255, 255, 255);
  height: 40px;
  display: flex;
  padding: 4px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid;
}
.item:last-child {
  border-bottom: 1px solid;
}
.selected {
  background: rgb(190, 190, 190);
}
</style>
