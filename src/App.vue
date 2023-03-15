<template>
  <div id="app">
    <Topbar />
    <!-- <Index/> -->
    <Picture />
  </div>
</template>

<script>
import Topbar from "./components/topbar.vue";
// import Index from './components/index.vue'
import Picture from './components/picture.vue'

export default {
  name: 'App',
  components: {
    Topbar,
    // Index,
    Picture
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
  
}
</style>
