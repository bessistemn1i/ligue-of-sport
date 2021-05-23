<template>
  <v-app>
    <v-main>
      <v-app-bar class="mb-7">
        <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      </v-app-bar>
      <Libraries />
    </v-main>
  </v-app>
</template>

<script>
import Libraries from "@/components/libraries/libraries.vue";
export default {
  name: "App",

  components: {
    Libraries,
  },

  data: () => ({
    appTitle: "Список библиотек",
  }),
};
</script>
