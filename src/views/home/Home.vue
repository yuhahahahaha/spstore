<template>
  <div id="home" class="wrapper">
    <NavBar class="home-nav"><div slot="center">购物城</div></NavBar>
     <TabControl 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tbl"
      v-show="isTabFixed"
      ></TabControl>
    <Scroll class="content" ref="scroll" 
    :probeType="3" 
    :pullUpLoad="true" 
    @scroll="contentScroll"
    @pullingUp="contentUpLoad">
      <HomeSwiper :banners="banners" @imgLoad="swiperImgLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      ></TabControl>
      <GoodsList :goodslist="showGoods"></GoodsList>
    </Scroll>
    <BackTop v-show="showBackTop" @click.native="backTop"></BackTop>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
// import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'
export default {
    name:"Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currenType:'pop',
        showBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currenType].list
      }
    },
    methods:{
      swiperImgLoad(){
        // console.log('---');
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      contentScroll(position){
        // console.log(position);
        // 判断backTop是否显示
        this.showBackTop = position.y < -1000 ? true : false
        // 判断 tabContral是否吸顶
        this.isTabFixed = -(position.y) > this.tabOffsetTop - 44
        // 保存用户离开首页前的位置
        // this.saveY = position.y
      },
      contentUpLoad(){
        this.getHomeGoods(this.currenType)
        // 修复上拉时scroll组件中.content高度不刷新问题（原因是有时候请求数据过慢，content高度被固定死了）。
        // this.$refs.scroll.refresh()
      },
      // 多个组件用到，在mixin混入当中写
      backTop(){
        // this.$refs.scroll.scroll.scrollTo(0,0)
        this.$refs.scroll.scrollTo(0,0)
      },
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currenType = 'pop'
            break;
          case 1:
            this.currenType = 'new'
            break;
          case 2:
            this.currenType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      getHomeMultidata(){
    // 请求多个数据
        getHomeMultidata()
        .then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
      // 请求商品数据
      const page = this.goods[type].page + 1
        getHomeGoods(type,page)
        .then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;
          // 修改scroll的finishPullUp方法，没有调这个方法上拉加载只能加载一次
          this.$refs.scroll.finishPullUp()
          
      })
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    // 组件加载完后生命周期函数
    mounted(){
      // const refresh = debounce(this.$refs.scroll.refresh,300)
      //   // 监听每一张图片加载完成
      // this.$bus.$on('itemImgLoad',()=>{
      //   // console.log('-----');
      // // this.$refs.scroll.refresh()
      // refresh()
      // })
      // 采用混入
      // console.log('home大傻逼');
      
    },
    // activated()和deactivated()只有在路由占位标签用keep-alive标签包裹才会产生或生效
    activated(){
      // console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
      // console.log(this.saveY);
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
      // 跳出组件时关闭监听图片加载
       this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
}
</script>

<style scoped>
/* scoped是作用域 */
  #home{
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    text-align: center;
    font-size: 20px;
    color: #fff;
    font-weight: 800;
    background-color: var(--color-tint);
  }
  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .content{
    height: 700px;
    overflow: hidden;
  }
  .tbl{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>