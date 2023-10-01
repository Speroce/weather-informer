<template>
  <div class="info-section">
    <div class="curr-day">
      <div class="hours grid-8">
        <div
          v-for="hour of hours"
          :key="hour"
        ></div>
      </div>
      <div class="weather grid-8">
        <div
          v-for="hour of hours"
          :key="hour"
        ></div>
      </div>
      <div class="text-section">Температура</div>
      <div class="temp grid-8">
        <div
          v-for="hour of hours"
          :key="hour"
        ></div>
      </div>
      <div class="text-section">Ветер, м/с</div>
      <div class="wind grid-8">
        <div
          v-for="hour of hours"
          :key="hour"
        ></div>
      </div>
    </div>
    <div class="days">
      <div class="days-info">
        <div
          v-for="day of days"
          :key="day"
          class="day"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const timezoneOffset = -new Date().getTimezoneOffset() / 60;

const remainder = timezoneOffset % 3;
const hoursOffset = remainder < 0 ? 3 + remainder : remainder;
const hours: number[] = [];
for (let i = 0; i < 24; i += 3) {
  hours.push(i + hoursOffset);
}

const days = [0, 1, 2, 3, 4];
</script>

<style scoped>
.info-section {
  height: 100%;
  background: cadetblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.curr-day {
  background: chocolate;
  margin: 12px;
  border: 1px solid black;
  border-radius: 20px;
  height: min-content;
}
.grid-8 {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
.text-section {
  width: 100%;
  height: 20px;
  margin: 4px;
}
.hours {
  height: 40px;
  background: #982;
  border-radius: 20px 20px 0 0;
}
.weather {
  height: 80px;
  background: rgb(127, 173, 163);
}
.temp {
  height: 80px;
  background: rgb(162, 127, 173);
}
.wind {
  height: 80px;
  background: rgb(127, 168, 173);
  border-radius: 0 0 20px 20px;
}
.days-info {
  display: grid;
  /* height: 100%; */
  height: 200px;
  grid-template-columns: repeat(5, 1fr);
}
.day {
  /* height: 100%; */
  background: rgb(66, 143, 173);
  border-radius: 20px;
  margin: 4px;
}
.days {
  background: wheat;
  height: 200px;
  margin: 12px;
}
</style>
