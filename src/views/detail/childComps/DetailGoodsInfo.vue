<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <div class="info-desc clear-fix">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>

    <div v-for="item in detailInfo.detailImage">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item2, index) in item.list" :src="item2|Imgfilter" :key="index" alt="" @load="imgLoad">
      </div>
    </div>

  </div>
</template>

<script>
export default {
 name: 'DetailGoodsInfo',
  props:{
      detailInfo:{
          type: Object,
          default(){
              return {};
          }
      }
  },

  filters:{
      Imgfilter: function(value){
          return "http:" + value
      }
  },
    data() {
    return {
    }
  },
  //防止详情页内图片加载不完全而导致的better-scroll插件滚动中断
  methods:{
      imgLoad(){
        //   等所有图片加载完，name进行一次回调即可
        //   if(++this.counter === this.imagesLength){/*所有图片加载完毕再重新计算滚动高度，提高性能，也可不进行判断，提高用户体验*/
        //     this.$emit('imageLoad');
        //   }
        this.$emit('imageLoad');
      }
  },
  created(){

  }
//   监听某个属性的变化
//   watch:{
//       detailInfo(){
//         //   获取图片个数
//           this.imagesLength = this.detailInfo.detailImage[0].list.length;
//       }
//   }
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>