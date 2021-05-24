<template>
  <div class="lib-container">
    <header v-if="currentLibrary" class="lib-header">
      <v-img
        height="420"
        :src="currentLibrary.data.general.image.url"
        :alt="currentLibrary.data.general.image.title"
        class="lib-img"
      ></v-img>
      <v-card-title class="lib-title">{{
        currentLibrary.data.general.name
      }}</v-card-title>
      <v-card-subtitle
        v-html="currentLibrary.data.general.description"
        class="text-left"
      ></v-card-subtitle>
      <v-row>
        <v-col cols="5" class="text-left ml-4">
          <p v-if="currentLibrary.data.general.address.fullAddress">
            <strong>Адрес:</strong>
            {{ currentLibrary.data.general.address.fullAddress }}
          </p>
          <p v-if="currentLibrary.data.general.contacts.email">
            <strong> Email:</strong>
            {{ currentLibrary.data.general.contacts.email }}
          </p>
          <p v-if="currentLibrary.data.general.contacts.website">
            <strong>Вебсайт: </strong
            >{{ currentLibrary.data.general.contacts.website }}
          </p>
        </v-col>
      </v-row>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Library",
  async mounted() {
    this.$store.dispatch("fetchLibrary", this.$route.params.id);
  },
  computed: {
    ...mapGetters(["currentLibrary"]),
  },
};
</script>

<style lang="scss" scoped>
.lib-container {
  width: 100%;
  max-width: 1200px;
}
</style>
