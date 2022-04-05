<template>
  <div id="app">
    <router-view/>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
export default {
  name: 'App',
  components:{
    TabBar
  }

}
</script>

<style>

</style>
