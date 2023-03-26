<template>
  <div id="app">
    <Topbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Topbar from "./components/topbar.vue";

export default {
  name: "App",
  components: {
    Topbar,
  },
  data() {
    return {
      topbarClassName: "pattern1",
    };
  },
  methods: {},
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  min-width: 1200px;
  max-width: 1920px;
  overflow: hidden;
  background: #f5f5f5;
}
</style>
