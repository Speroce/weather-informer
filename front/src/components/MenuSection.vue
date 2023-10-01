<template>
  <div class="menu-section">
    <div class="inner-list">
      <MyList
        :selected="selected"
        :items="items"
      />
    </div>
    <div class="inner-list"></div>
  </div>
</template>

<script setup lang="ts">
import MyList from '@/components/MyList.vue';
// import { v4 as uuidv4 } from 'uuid';

import { ref } from 'vue';
const items = [
  { label: v4() },
  { label: 'adfsasddfdsfs' },
  { label: 'adfsaesfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdesfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsadsfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' },
  { label: 'adfsasfdsfs' }
];
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
}
.inner-list:first-child {
  border-bottom: 1px solid;
}
</style>
