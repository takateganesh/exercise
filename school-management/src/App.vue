<template>
  <div id="app" class="main-body">
    <v-app color="white" class="">
        <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #131414;
  background: #e7eaec;
  height: 100%;
}
</style>
<style src="./styles/_app.scss" lang="scss" /> 
