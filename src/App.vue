<template>
  <div id="app">
    <Libraries />
  </div>
</template>

<script>
import Libraries from "@/components/libraries/libraries.vue";
export default {
  name: "App",
  components: {
    Libraries,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
