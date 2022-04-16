<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
//  import Pullup from '@better-scroll/pull-up'
//  BScroll.use(Pullup)
export default {
    data(){
        return{
            scroll:null
        }
    },
    props:{
        // 让父组件传过来一个数字，由父组件决定是否采用监听滚动位置
        probeType:{
            type:Number,
            default(){
                return 0
            }
        },
        pullUpLoad:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
     // 组件挂载完之后调用
    mounted(){
     this.scroll = new BScroll(this.$refs.wrapper, {
        //  要设置这个，要不然里面的点击事件会失效
         click:true,
        //  3表示监听所有滚动位置，包括拖拉松手后惯性位置
         probeType:this.probeType,
         pullUpLoad:this.pullUpLoad
     })
    //  监听滚动位置
     this.scroll.on('scroll',(position)=>{
        //  console.log(position);
        this.$emit('scroll',position)
     })
    //  监听上拉加载更多
     this.scroll.on('pullingUp',()=>{
    //  console.log('加载更多');
     this.$emit('pullingUp')
     }      
     )
    },
    methods:{
        scrollTo(x,y,time=300){
            // 判断 this.scroll有值了才继续往下执行
            this.scroll && this.scroll.scrollTo(x,y);
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp();
        },
        refresh(){
            // console.log('刷新-----');
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }

}
</script>

<style scoped>

</style>