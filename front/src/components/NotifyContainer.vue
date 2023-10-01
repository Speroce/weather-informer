<template>
  <div class="notify-container">
    <div
      v-for="(notify, index) of notifyStore.shownNotifies"
      :key="index"
      class="notify"
    >
      <div
        class="notify"
        :class="{ [getNotifyClassName(notify.type)]: true }"
      >
        <div class="notify-label">
          {{ notify.label ?? getDefaultNotifyLabel(notify.type) }}
        </div>
        <div
          v-if="notify.message"
          class="notify-message"
        >
          {{ notify.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotify, type NotifyType } from '@/stores/notify';
const notifyStore = useNotify();

const getNotifyClassName = (type: NotifyType) => `notify-${type}` as const;
const getDefaultNotifyLabel = (type: NotifyType) => {
  const defaultLabesDict = {
    positive: 'Успешно!',
    negative: 'Ошибка!',
    warning: 'Внимание!',
    info: 'Информация!'
  };
  return defaultLabesDict[type];
};
</script>

<style scoped>
.notify-container {
  position: fixed;
  height: max-content;
  display: flex;
  flex-direction: row;
  width: 100%;
  bottom: 30px;
  justify-content: center;
}

.notify-info {
  background: rgb(0, 217, 255);
}
.notify-positive {
  background: rgb(139, 202, 67);
}
.notify-negative {
  background: rgb(255, 100, 80);
}
.notify-warning {
  background: rgb(248, 237, 82);
}
.notify {
  width: max-content;
  height: max-content;
  padding: 15px;
  font-size: 18px;
  margin: 10px;
  border-radius: 15px;
  max-width: 250px;
}

.notify-label {
  font-weight: bold;
}
.notify-message {
  margin-top: 8px;
  text-wrap: wrap;
  white-space: pre-line;
}
</style>
