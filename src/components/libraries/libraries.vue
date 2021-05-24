<template>
  <v-container class="libraries-container">
    <v-row class="d-flex flex-column flex-md-row">
      <v-col cols="12" md="6">
        <h3>Фильтровать по:</h3>
        <v-chip-group active-class="primary--text" column>
          <v-chip
            v-for="(city, cityIdx) in listOfCities"
            :key="cityIdx"
            @click="filterByCity(city)"
          >
            {{ city }}
          </v-chip>
        </v-chip-group>
        <v-btn
          v-show="filteredLibs.length > 0"
          color="primary"
          @click="resetFilters()"
          >Сбросить фильтр</v-btn
        >
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-start flex-column">
        <h3>Сортировать по:</h3>
        <v-chip @click="sortByTitle"> Названию </v-chip>
        <v-btn
          v-show="sortedLibsByTitle.length > 0"
          color="primary"
          @click="resetSort"
          class="mt-3"
          >Сбросить сортировку</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-row flex-wrap justify-center">
        <v-virtual-scroll
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
                <v-card-subtitle
                  v-html="item.data.general.description"
                ></v-card-subtitle>
                <v-card-actions>
                  <router-link :to="`library/${item.data.general.id}`"
                    >Подробнее</router-link
                  >
                </v-card-actions>
              </header>
            </v-card>
          </template>
        </v-virtual-scroll>
        <!-- <v-col
          v-for="lib in libs"
          :key="lib.data.general.id"
          cols="10"
          sm="8"
          md="5"
          lg="4"
          class="mb-12"
        >
          <v-card max-width="450px">
            <header class="lib-header">
              <v-img
                height="120"
                :src="lib.data.general.image.url"
                :alt="lib.data.general.image.title"
                class="lib-img"
              ></v-img>
              <v-card-title class="lib-title">{{
                lib.data.general.name
              }}</v-card-title>
              <v-card-subtitle
                v-html="lib.data.general.description"
              ></v-card-subtitle>
              <v-card-actions>
                <router-link :to="`library/${lib.data.general.id}`"
                  >Подробнее</router-link
                >
              </v-card-actions>
            </header>
          </v-card>
        </v-col> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async mounted() {
    this.$store.dispatch("fetchLibrariesList");
  },
  data() {
    return {
      sortedLibsByTitle: [],
    };
  },
  computed: {
    ...mapGetters(["librariesList", "filteredLibs"]),
    /**
     * Получаем список городов для фильтрации
     */
    listOfCities() {
      const cities = this.librariesList.map(
        (el) => el.data.general.locale.name
      );
      return [...new Set(cities)];
    },
    /**
     * Отображаем массив с библиотеками в зависимости от активных сортировок/фильтров
     */
    libs() {
      if (this.sortedLibsByTitle.length > 0) {
        return this.sortedLibsByTitle;
      }
      return this.filteredLibs.length > 0
        ? this.filteredLibs
        : this.librariesList;
    },
  },
  methods: {
    /**
     * Фильтрация по названию города/области
     */
    filterByCity(city) {
      const obj = {
        libs: this.librariesList,
        city: city,
      };
      this.$store.dispatch("filterByCity", obj);
    },
    /**
     * Сортировка по названию библиотеки
     */
    sortByTitle() {
      const libs = this.libs.slice();
      const sortedList = libs.sort((lib1, lib2) => {
        return lib1.data.general.name.toLowerCase() >
          lib2.data.general.name.toLowerCase()
          ? 1
          : -1;
      });
      this.sortedLibsByTitle = sortedList;
    },
    /**
     * Сброс фильтров
     */
    resetFilters() {
      this.$store.dispatch("resetFilters");
    },
    /**
     * Сброс сортировки
     */
    resetSort() {
      this.sortedLibsByTitle = [];
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
