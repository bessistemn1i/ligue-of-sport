<template>
  <v-container class="libraries-container">
    <v-row>
      <v-col cols="12" class="d-flex flex-row flex-wrap justify-space-between">
        <v-card
          v-for="lib in librariesList"
          :key="lib.data.general.id"
          max-width="450px"
          class="mb-6"
        >
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
              <v-btn outlined rounded text>
                Подробнее
              </v-btn>
            </v-card-actions>
          </header>
        </v-card>
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
  computed: {
    ...mapGetters(["librariesList"]),
  },
};
</script>

<style lang="scss" scoped></style>
