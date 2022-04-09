<template>
  <div class="recommend">
      <div class="item" v-for="item in recommends">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    height: 120px;
    margin-top: 10px;
    display: flex;
    font-size: 15px;
    border-bottom: 12px solid #eee;
}
.item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item img{
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
}

</style>