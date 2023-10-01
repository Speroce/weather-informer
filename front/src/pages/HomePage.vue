<template>
  <main>
    <header>
      <div class="title">Weather Informer</div>
      <div class="user-toolbar">
        <div class="username">{{ authStore.username }}</div>
        <IconButton
          :title="authStore.isAuth ? 'Выйти' : 'На страницу входа'"
          :icon="authStore.isAuth ? 'logout' : 'login'"
          @click="toAuth"
        />
      </div>
    </header>
    <div class="home-container">
      <MenuSection />
      <WeatherSection />
    </div>
  </main>
</template>

<script setup lang="ts">
import 'material-icons/iconfont/material-icons.css';
import { useAuthStore } from '@/stores/auth';
import MyInput from '@/components/MyInput.vue';
import IconButton from '@/components/IconButton.vue';
import { useRouter } from 'vue-router';
import WeatherSection from '@/components/WeatherSection.vue';
import MenuSection from '@/components/MenuSection.vue';
const router = useRouter();
const authStore = useAuthStore();
async function toAuth() {
  if (authStore.isAuth) {
    await authStore.singOut();
  } else {
    router.push('/auth');
  }
}
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  height: 55px;
  background: rgb(247, 109, 67);
  align-items: center;
  justify-content: space-between;
  display: flex;
}
header > * {
  margin: 0 8px;
}
.home-container {
  height: 100%;
  width: 100%;
  display: flex;
}
.menu-section {
  width: 300px;
  height: 100%;
  background: sandybrown;
}
.title {
  margin-left: 4px;
  font-size: 32px;
  font-weight: bold;
  text-wrap: nowrap;
}
.user-toolbar {
  display: flex;
  align-items: center;
  font-size: 22px;
}
.username {
  font-size: 24px;
  margin-right: 8px;
}
</style>
