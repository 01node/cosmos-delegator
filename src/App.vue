<template>
  <div id="app">
    <app-header />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'app',
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800');
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');

#app {
  font-family: 'Poppins', 'Roboto', 'Open Sans', sans-serif;
}
</style>