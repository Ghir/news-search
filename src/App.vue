<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},

  created(): void {
    this.$store.dispatch("setInitialFavorites");
  }
});
</script>
<style scoped>
::v-deep .v-application--wrap {
  background-color: #f5f5f5 !important;
}
</style>