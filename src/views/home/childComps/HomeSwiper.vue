<template>
    <swiper class="swiper">
      <swiperItem :key="item.image" v-for="item in banners">
          <a :href="item.link">
              <img :src="item.image" alt="" @load="imgLoad">
          </a>
      </swiperItem>
  </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
    name:"HomeSwiper",
    components:{
        Swiper,
        SwiperItem
    },
    data(){
        return {
            isLoad:false
        }
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        imgLoad(){
            if(!this.isLoad){
                this.$emit('imgLoad')
                this.isLoad = true
            }
        }
    }
}
</script>

<style>

</style>