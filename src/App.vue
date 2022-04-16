<template>
  <div id="app">
    <keep-alive exclude="Detail">
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
