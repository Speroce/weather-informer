<template>
  <div class="menu-section">
    <div class="inner-list">
      <div class="list-header">Избранное</div>
      <MyList
        v-model:selected="selected"
        :items="items"
        :withDeleteBtn="true"
      />
    </div>
    <div class="inner-list">
      <div class="list-header">
        <div>История поиска</div>
        <IconButton
          icon="delete"
          title="Очистить историю поиска"
        />
      </div>
      <MyList
        v-model:selected="selected"
        :items="items"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyList from '@/components/MyList.vue';
import IconButton from '@/components/IconButton.vue';

import { ref } from 'vue';
const items = [{ label: 'Example1' }, { label: 'Example2' }];
const selected = ref(items[0]);
</script>
<style scoped>
.menu-section {
  width: 300px;
  height: 100%;
  background: sandybrown;
  display: flex;
  flex-direction: column;
}
.inner-list {
  height: 50%;
  display: flex;
  flex-direction: column;
}
.inner-list:first-child {
  border-bottom: 1px solid;
}
.list-header {
  height: min-content;
  padding: 4px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
