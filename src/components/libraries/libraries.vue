<template>
  <v-container class="libraries-container">
    <v-row class="d-flex flex-column flex-md-row">
      <v-col cols="12" md="6">
        <h3>Фильтровать по:</h3>
        <v-chip-group active-class="primary--text" column>
          <v-chip
            v-for="(city, cityIdx) in listOfCities"
            :key="cityIdx"
            @click="filterLibsByTitle(city, libs)"
          >
            {{ city }}
          </v-chip>
        </v-chip-group>
        <v-btn v-show="selectedFilter" color="primary" @click="resetFilters"
          >Сбросить фильтр</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-form>
          <h3>Или ведите названию населенного пункта</h3>
          <v-text-field
            v-model="nameOfCity"
            clearable
            label="Название населенного пункта"
          >
          </v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-start flex-column">
        <h3>Сортировать по:</h3>
        <v-chip @click="sortLibsByTitle(libs)"> Названию </v-chip>
        <v-btn v-show="sortType" @click="resetSort" color="primary" class="mt-3"
          >Сбросить сортировку</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"></v-col>
      <v-col v-if="nameOfCity && libs && libs.length === 0" cols="12">
        <p>К сожалению, библиотек по вашему запросу не найдено</p>
      </v-col>
      <v-col
        v-if="libs"
        cols="12"
        class="d-flex flex-row flex-wrap justify-center"
      >
        <v-virtual-scroll
          bench="10"
          :items="libs"
          item-height="600px"
          height="600"
          max-width="1185"
        >
          <template v-slot:default="{ item }">
            <v-card :key="item.data.general.id">
              <header class="lib-header">
                <v-img
                  height="250"
                  :src="item.data.general.image.url"
                  :alt="item.data.general.image.title"
                  class="lib-img"
                ></v-img>
                <v-card-title class="lib-title">{{
                  item.data.general.name
                }}</v-card-title>
                <p class="text-left">
                  Район/Город:
                  <strong>{{ item.data.general.locale.name }}</strong>
                </p>

                <v-card-subtitle>
                  {{ item.data.general.description | sliceText }}
                </v-card-subtitle>
                <v-card-actions>
                  <router-link :to="`library/${item.data.general.id}`"
                    >Подробнее</router-link
                  >
                </v-card-actions>
              </header>
            </v-card>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        v-show="libs && libs.length + 10 <= librariesLength && !nameOfCity"
      >
        <v-btn @click="loadMoreLibraries">Загрузить больше</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      nameOfCity: null, // название населенного пункта из строки поиска
      selectedFilter: null, // выбранный город
      sortType: "", // выбранный тип сортировки
      isSort: false, // если нажата кнопки отсортировать
      isFilter: false, // если нажата кнопки отфильтровать
      libsLength: 0,
    };
  },
  watch: {
    nameOfCity(city) {
      if (city) {
        this.filterByTitle = true;
        this.filterLibsByTitle(this.nameOfCity, this.libs);
      }
      if (!city) {
        this.resetFilters();
      }
    },
  },
  computed: {
    ...mapGetters(["librariesList", "downloadPosition", "librariesLength"]),
    /**
     * Получаем список городов для фильтрации
     */
    listOfCities() {
      const cities = this.libs.map((el) => el.data.general.locale.name);
      return [...new Set(cities)];
    },
    /**
     * Отображаем массив с библиотеками в зависимости от активных сортировок/фильтров
     */
    libs() {
      const filtered = this.isFilter
        ? this.filterLibsByTitle(this.selectedFilter, sorted)
        : this.nameOfCity
        ? this.filterLibsByTitle(this.nameOfCity, this.librariesList)
        : this.librariesList; // в переменную записываем либо отфильтрованный массив по текстовому полю, либо по выбранному городу (компонент v-chip), либо стартовый массив, если фильтрация не выбрана
      let sorted = []; // в зависимости от флага записываем либо отсортированный отфильтрованный массив, либо отсортированный стартовый массив
      if (this.isSort) {
        sorted = filtered
          ? this.sortLibsByTitle(filtered)
          : this.sortLibsByTitle(this.librariesList);
      }
      if (!this.isSort) {
        sorted = filtered ? filtered : this.librariesList;
      }
      return sorted;
    },
    filteredCity() {
      const nameOfCity = this.nameOfCity;
      const selectedFilter = this.selectedFilter;
      if (nameOfCity) {
        return nameOfCity;
      }
      return selectedFilter;
    },
  },
  filters: {
    sliceText(text) {
      if (!text) return "";
      const regExpRemoveTagsFromString = /<\/?[a-zA-Z]+>/gi;
      text = text.slice(0, 250).replace(regExpRemoveTagsFromString, "");
      return `${text}...`;
    },
  },
  methods: {
    /**
     * @librariesList Массив для проведения сортировки
     */
    sortLibsByTitle(librariesList) {
      this.sortType = "title"; // текущая сортировка - по заголовку
      this.isSort = true; // записываем флаг что используется сортировка массива
      if (librariesList) {
        // если в массиве есть данные
        const sorted = librariesList.slice(); // дубликат входящего массива
        const sortedList = sorted.sort((lib1, lib2) => {
          return lib1.data.general.name.toLowerCase() >
            lib2.data.general.name.toLowerCase()
            ? 1
            : -1;
        });
        return sortedList;
      }
      return [];
    },

    /**
     * @city Значение, получаемое из строки поиска. Если данное значение пустое, значит берем значение из выбора по городам - компонент v-chip
     * @librariesList Массив библиотек для фильтрации (дефолтное значение - стартовый массив)
     */
    filterLibsByTitle(
      city = this.nameOfCity,
      librariesList = this.librariesList
    ) {
      this.selectedFilter = city; // выбранный город
      this.isFilter = true; // записываем флаг - используется фильтрация
      const filtered = librariesList.slice(); // дублируем массив, сохраняя оригинал
      const result = filtered.filter(
        (el) =>
          el.data.general.locale.name
            .toLowerCase()
            .indexOf(city.toLowerCase()) >= 0
      );
      return result;
    },

    /**
     * Запрос на получение еще 10 библиотек
     */
    loadMoreLibraries() {
      this.libsLength += this.libs.length;
      this.$store.dispatch("fetchLibrariesList", {
        city: this.filteredCity,
        position: this.downloadPosition + 10,
      });
    },

    /**
     * Сброс сортировок
     */
    resetSort() {
      this.sortType = "";
      this.isSort = false;
    },

    /**
     * Сброс фильтров
     */
    resetFilters() {
      this.isFilter = false;
      this.selectedFilter = "";
      this.$store.dispatch("resetLibrariesList", 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.libraries-container {
  width: 100%;
  max-width: 1200px;
}
</style>
