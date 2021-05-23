<template>
  <div class="libraries-container">
    <div v-for="lib in librariesList" :key="lib.data.general.id">
      <header class="lib-header">
        <div class="lib-image-container">
          <img
            :src="lib.data.general.image.url"
            :alt="lib.data.general.image.title"
            class="lib-img"
          />
        </div>
        <h3 class="lib-title">{{ lib.data.general.name }}</h3>
        <p v-html="lib.data.general.description"></p>
      </header>
    </div>
  </div>
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
