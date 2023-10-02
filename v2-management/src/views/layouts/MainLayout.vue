<template>
  <div class="main-layout">
    <NavBar></NavBar>
    <div class="layout-right">
      <MainHeader></MainHeader>
      <ContentView></ContentView>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import MainHeader from './MainHeader'
import ContentView from './ContentView'

export default {
  name: 'MainLayout',

  data () {
    return {

    }
  },
  components: {
    NavBar,
    MainHeader,
    ContentView
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .main-layout {
    display: flex;
    width: 100%;
    height: 100%;
    .layout-right {
      flex: 1;
    }
  }
</style>
