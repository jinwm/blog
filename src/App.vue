<template>
  <div id="app">
    <div class="header" ref="header">
      <TopBar />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from "./components/topbar.vue";

export default {
  name: "App",
  components: {
    TopBar,
  },
  data() {
    return {
      topbarClassName: "pattern1",
    };
  },
  mounted() {
    setTimeout(() => this.$refs.header.classList.add("on"));
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
  // min-width: 1200px;
  // max-width: 1920px;
  overflow: hidden;
  background: #f5f5f5;

  .header {
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    height: fit-content;
    transform: translate(-50%, -100%);
    transition: transform 1s;
    opacity: 0;
    z-index: 10;

    &.on {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
}
</style>
