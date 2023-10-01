<template>
  <main>
    <div class="auth-container">
      <div class="auth">
        <MyInput
          v-model="username"
          placeholder="Имя пользователя"
          @keydown.enter="sign"
        ></MyInput>
        <MyInput
          v-model="password"
          placeholder="Пароль"
          type="password"
          @keydown.enter="sign"
        ></MyInput>
        <MyInput
          v-if="mode === 'sign up'"
          v-model="confirm"
          placeholder="Подтверждение пароля"
          type="password"
          @keydown.enter="sign"
        ></MyInput>
        <MyButton
          :label="mode === 'sign in' ? 'Войти' : 'Зарегистирироваться'"
          @click="sign"
        ></MyButton>
        <MyButton
          :label="mode === 'sign in' ? 'Регистрация' : 'Вход'"
          @click="changeMode"
        ></MyButton>
        <MyButton
          label="Войти без авторизации"
          @click="notAuthenticatedEnter"
        ></MyButton>
      </div>
    </div>
    <div class="warning">{{ warning }}</div>
  </main>
</template>

<script setup lang="ts">
import MyInput from '@/components/MyInput.vue';
import MyButton from '@/components/MyButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useNotify } from '@/stores/notify';
const notifyStore = useNotify();
const router = useRouter();

const authStore = useAuthStore();

type Mode = 'sign up' | 'sign in';

const username = ref('');
const password = ref('');
const confirm = ref('');
const mode = ref<Mode>('sign in');
const warning = ref('');

function changeMode() {
  mode.value = mode.value === 'sign in' ? 'sign up' : 'sign in';
  username.value = '';
  password.value = '';
  confirm.value = '';
  warning.value = '';
}

function check() {
  if (
    !username.value ||
    !password.value ||
    (mode.value === 'sign up' && !confirm.value)
  ) {
    warning.value = 'Заполните все поля';
    return false;
  }
  if (mode.value === 'sign up' && password.value !== confirm.value) {
    warning.value = 'Пароли не совпадают';
    return false;
  }
  return true;
}
async function sign() {
  if (!check()) {
    return;
  }
  if (mode.value === 'sign in') {
    await authStore.singIn(username.value, password.value);
  } else {
    await authStore.singUp(username.value, password.value);
  }
}
function notAuthenticatedEnter() {
  router.push({ path: '/' });
  notifyStore.addNotify({
    type: 'warning',
    message:
      'Вы можете отправлять не больше 15 запросов на прогноз погоды\n Для снятия ограничений авторизуйтесь',
    timeout: 8000
  });
}
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-container {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgb(255, 191, 118);
}

.auth {
  height: 100%;
  width: 300px;
  background: #ffeb9c;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  user-select: none;
  flex-wrap: wrap;
  padding-bottom: 32px;
  margin-bottom: -32px;
  border-radius: 0 0 32px 32px;
}

.auth > * {
  margin: 4px 0;
}

.warning {
  color: #e92400;
  margin-top: 4px;
}
</style>
