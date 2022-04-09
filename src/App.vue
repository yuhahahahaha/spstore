<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
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
  @import 'assets/css/base.css';
</style>
