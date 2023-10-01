import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export type NotifyType = 'positive' | 'negative' | 'warning' | 'info';

interface NotifyOption {
  type: NotifyType;
  timeout?: number;
  label?: string;
  message?: string;
}

export const useNotify = defineStore('notify', () => {
  const LIMIT = 4;
  const DEFAULT_TIMEOUT = 4000;
  const notifies = reactive(new Set<NotifyOption>());
  const queue = reactive(new Set<NotifyOption>());

  const shownNotifies = computed(() => [...notifies.values()]);

  function updateShownNotify(notify?: NotifyOption) {
    notify && notifies.delete(notify);
    let nextNotify: NotifyOption | null = null;
    for (const n of queue) {
      nextNotify = n;
      break;
    }
    if (!nextNotify) {
      return;
    }
    queue.delete(nextNotify);
    notifies.add(nextNotify);
    setTimeout(
      updateShownNotify,
      notify?.timeout ?? DEFAULT_TIMEOUT,
      nextNotify
    );
  }

  function addNotify(option: NotifyOption) {
    queue.add(option);
    if (notifies.size < LIMIT) {
      updateShownNotify();
    }
  }
  return {
    shownNotifies,
    addNotify
  };
});
