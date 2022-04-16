<template>
  <div class="goods-item" @click="itemClick">
      <img v-lazy="showImg" alt="" @load="imgLoad">
      <div class="goods-info">
          <p>{{gooditems.title}}</p>
          <span class="price">{{gooditems.price}}</span>
          <span class="collect">{{gooditems.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        gooditems:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
      // 传过来的参数名不一样，用计算属性判断
      showImg(){
        return this.gooditems.image || this.gooditems.show.img
      }
    },
    methods:{
      imgLoad(){
        // console.log('监听图片');
        // 向事件总线发射方法
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.gooditems.iid)

      }
    }
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>