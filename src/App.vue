<template>
  <div id="app">
    <AppHeader />
    <AppBody />
  </div>
</template>

<script>

import AppHeader from "@/components/appHeader/AppHeader.vue";
import AppBody from "@/components/appBody/AppBody.vue";

export default {
  name: 'App',
  components: {
    AppBody,
    AppHeader

  }
}
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
  }
</style>
