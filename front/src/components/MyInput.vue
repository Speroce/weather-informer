<template>
  <input
    :type="type"
    :value="modelValue"
    @keydown="update"
    :placeholder="placeholder"
  />
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    type?: string;
    placeholder?: string;
  }>(),
  {
    type: 'text'
  }
);
const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void;
}>();

function update(event: KeyboardEvent) {
  setTimeout(() => {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
  });
}
</script>
<style scoped>
input {
  padding: 8px;
  border-radius: 20px;
  border: 0;
  background: #ccc;
  color: rgb(0, 0, 0);
  transition: all 0.2s linear;
  max-width: 200px;
  max-height: 50px;
  min-width: 50px;
}
</style>
