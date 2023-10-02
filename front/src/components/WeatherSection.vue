<template>
  <div class="weather-section">
    <header>
      <div class="city-name">
        {{ dataStore.currentCity || 'Введите название города' }}
      </div>
      <div class="search">
        <MyInput
          v-model="searchString"
          @keydown.enter="search"
        />
        <IconButton
          icon="search"
          @click="search"
        />
      </div>
    </header>
    <!-- <img src="https://openweathermap.org/img/wn/10d@2x.png"/> -->
    <div class="city-options">
      <CityOption
        v-for="key of dataStore.search"
        :key="key"
        :label="key"
        :isFavorite="false"
        @click="getWeather(key)"
      />
    </div>
    <InfoSection />
  </div>
</template>

<script setup lang="ts">
import 'material-icons/iconfont/material-icons.css';
import MyInput from '@/components/MyInput.vue';
import IconButton from '@/components/IconButton.vue';
import InfoSection from '@/components/InfoSection.vue';
import { ref } from 'vue';
import CityOption from './CityOption.vue';
import { useDataStore } from '@/stores/data';
const dataStore = useDataStore();
const searchString = ref('');

async function search() {
  if (searchString.value) {
    await dataStore.searchCities(searchString.value);
  }
}
async function getWeather(key: string) {
  await dataStore.getWeatherData(key);
}
</script>

<style scoped>
.weather-section {
  border-left: black solid 1px;
  background: papayawhip;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
header {
  height: 50px;
  background: rgb(35, 185, 255);
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
