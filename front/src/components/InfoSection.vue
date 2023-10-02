<template>
  <div
    class="info-section"
    v-if="dataStore.weatherList.length"
  >
    <div class="curr-day">
      <div class="hours grid">
        <div
          v-for="(hour, index) of times"
          :key="index"
        >
          {{ hour }}
        </div>
      </div>
      <div class="weather grid">
        <div
          v-for="(desc, index) of weatherDescs"
          :key="index"
        >
          {{ desc }}
        </div>
      </div>
      <div class="text-section">Температура, °C</div>
      <div class="temp grid">
        <div
          v-for="(temp, index) of temps"
          :key="index"
        >
          {{ temp }}
        </div>
      </div>
      <div class="text-section">Ветер, м/с</div>
      <div class="wind grid">
        <div
          v-for="(dir, index) of windDirs"
          :key="index"
        >
          {{ dir }}, {{ windSpeeds[index] }}
        </div>
      </div>
      <div class="days">
        <div class="days-info">
          <div
            v-for="(day, index) of days"
            :key="index"
            class="day"
            :class="{ 'active-day': currentDay === day }"
            @click="currentDay = day"
          >
            {{ getDate(day) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/data';
import { computed, ref } from 'vue';
const dataStore = useDataStore();

const times = computed(() => {
  const list = dayFilter(dataStore.weatherList);
  return list.map((data) => {
    const date = new Date(data.time);
    return `${date.getHours()}:00`;
  });
});

const weatherDescs = computed(() => {
  const list = dayFilter(dataStore.weatherList);
  return list.map((data) => {
    return data.weather;
  });
});

const windSpeeds = computed(() => {
  const list = dayFilter(dataStore.weatherList);
  return list.map((data) => {
    return data.windSpeed;
  });
});

const windDirs = computed(() => {
  const list = dayFilter(dataStore.weatherList);
  return list.map((data) => {
    return data.windDir;
  });
});

const temps = computed(() => {
  const list = dayFilter(dataStore.weatherList);
  return list.map((data) => {
    return data.temp;
  });
});

const imgs = computed(() => {
  const list = dayFilter(dataStore.weatherList);
  return list.map((data) => {
    return data.img;
  });
});

const days = [0, 1, 2, 3, 4];

const currentDay = ref(0);

function dayFilter<T>(array: T[]) {
  const indexes = dataStore.weatherList
    .map(({ time }, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      const day = new Date(time);
      date.setDate(date.getDate() + currentDay.value);
      return date.getDate() === day.getDate() ? index : false;
    })
    .filter((r) => r !== false);
  return array.filter((_, index) => indexes.includes(index));
}

function getDate(index: number) {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return date.toLocaleDateString('ru-RU');
}
</script>

<style scoped>
.info-section {
  height: 100%;
  background: rgb(221, 221, 221);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.curr-day {
  background: rgb(146, 146, 146);
  margin: 12px;
  border: 1px solid black;
  border-radius: 20px;
  height: min-content;
}
.grid {
  display: grid;
  grid-template-columns: repeat(v-bind('times.length'), 1fr);
  text-align: center;
}
.grid > div {
  align-content: center;
  display: inherit;
}
.text-section {
  width: 100%;
  height: 20px;
  margin: 4px;
}
.hours {
  height: 40px;
  background: rgb(167, 167, 167);
  border-radius: 20px 20px 0 0;
}
.weather {
  height: 80px;
  background: rgb(197, 197, 197);
}
.temp {
  height: 80px;
  background: rgb(197, 197, 197);
}
.wind {
  height: 80px;
  background: rgb(197, 197, 197);
  border-radius: 0 0 20px 20px;
}
.days-info {
  display: grid;
  /* height: 100%; */
  grid-template-columns: repeat(5, 1fr);
}
.day {
  /* height: 100%; */
  background: rgb(255, 255, 255);
  border-radius: 20px;
  margin: 4px;
  text-align: center;
  font-size: 20px;
  height: 30px;
}
.active-day {
  background: rgb(151, 205, 255);
}
.days {
  height: max-content;
  margin: 12px;
  cursor: pointer;
}
</style>
