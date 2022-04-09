<template>
  <div>详情页
    <span>{{iid}}</span>
  </div>

</template>

<script>
export default {
  data(){
    return {
      iid:null
    }
  },
  created(){
    console.log(this.$route);
    this.iid = this.$route.params.id
  }

}
</script>

<style>

</style>