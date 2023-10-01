<template>
  <div class="weather-section">
    <header>
      <div class="city-name">Введите название города</div>
      <div class="search">
        <MyInput v-model="searchString" />
        <IconButton icon="search" />
      </div>
    </header>
    <!-- <img src="https://openweathermap.org/img/wn/10d@2x.png"/> -->
    <div class="city-options">
      <CityOption
        label="Chechnya, Rostovska Oblast, CH"
        :isFavorite="true"
      />
      <CityOption
        label="Chechnya, Rostovska Oblast, CH"
        :isFavorite="true"
      />
      <CityOption
        label="Chechnya, Rostovska Oblast, CH"
        :isFavorite="true"
      />
      <CityOption
        label="Chechnya, Rostovska Oblast, CH"
        :isFavorite="true"
      />
      <CityOption
        label="Chechnya, Rostovska Oblast, CH"
        :isFavorite="true"
      />
      <CityOption
        label="Chechnya, Rostovska Oblast, CH"
        :isFavorite="false"
      />
    </div>
    <InfoSection />
  </div>
</template>

<script setup lang="ts">
import 'material-icons/iconfont/material-icons.css';
import { useAuthStore } from '@/stores/auth';
import MyInput from '@/components/MyInput.vue';
import IconButton from '@/components/IconButton.vue';
import InfoSection from '@/components/InfoSection.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import CityOption from './CityOption.vue';
const searchString = ref('');
</script>

<style scoped>
.weather-section {
  background: papayawhip;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
header {
  height: 50px;
  background: pink;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
}
.search {
  display: flex;
  align-items: center;
}
.search > * {
  margin: 0 4px;
  font-size: 18px;
}
.city-name {
  font-size: 24px;
  font-weight: bold;
}
.city-options {
  height: max-content;
  display: flex;
  padding: 4px;
  background: white;
}
.city-options > * {
  margin: 0 4px;
}
</style>
