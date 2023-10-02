import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { Api } from '@/services/Api';
import { v4 as uuidv4 } from 'uuid';
import { useNotify } from '@/stores/notify';
import { useDataStore } from './data';
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const username = ref('');
  const isAuth = ref(false);
  const _token = ref('');
  const token = computed({
    get: () => {
      return _token.value || (localStorage.getItem('token') as string) || '';
    },
    set: (value: string) => {
      _token.value = value;
      localStorage.setItem('token', value);
    }
  });
  async function singIn(user: string, password: string) {
    const response = await Api.signIn(user, password);
    token.value = response.token;
    username.value = user;
    isAuth.value = true;
    router.push({ path: '/' });
    const { addNotify } = useNotify();
    addNotify({ type: 'positive', message: 'Вход выполнен' });
  }
  async function singUp(user: string, password: string) {
    const response = await Api.signUp(user, password);
    token.value = response.token;
    username.value = user;
    isAuth.value = true;
    const { addNotify } = useNotify();
    addNotify({ type: 'positive', message: 'Регистрация успешна' });
  }
  async function singOut() {
    await Api.signOut(token.value);
    token.value = '';
    username.value = '';
    isAuth.value = false;
    router.push({ path: '/auth' });
    const dataStore = useDataStore();
    dataStore.$reset();
  }
  async function getMe() {
    const response = await Api.getMe(token.value);
    isAuth.value = response.isAuth;

    if (response.isAuth && response.username) {
      username.value = response.username;
    } else if (token.value === '') {
      token.value = uuidv4();
    }
  }
  return {
    username,
    isAuth,
    token,
    singIn,
    singUp,
    singOut,
    getMe
  };
});
