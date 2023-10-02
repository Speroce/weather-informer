import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { Api, type Weather } from '@/services/Api';
import { useAuthStore } from './auth';

export const useDataStore = defineStore('data', () => {
  const search: string[] = reactive([]);
  const favorite: string[] = reactive([]);
  const history: string[] = reactive([]);
  const currentCity = ref('');
  const weatherList = ref<Weather[]>([]);
  function clearSearch() {
    search.length = 0;
  }

  async function searchCities(searchStr: string) {
    const cities = await Api.searchCities(searchStr);
    clearSearch();
    search.push(...cities);
  }
  async function getWeatherData(key: string) {
    const auth = useAuthStore();
    const token = auth.token;
    const response = await Api.weatherData(key, token);
    weatherList.value = response;
    currentCity.value = key;
  }
  return {
    search,
    favorite,
    history,
    clearSearch,
    searchCities,
    currentCity,
    weatherList,
    getWeatherData
  };
});
