<template>
  <div class="detail">
    <DetailNavBar @titleClick="titleClick" class="detail-navbar" ref="nav"></DetailNavBar>
    <Scroll class="centent" ref="scroll"  :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo> -->
      <DetailParamsInfo :paramInfo="paramInfo" ref="param" ></DetailParamsInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goodslist="recommends"  ref="recommend"></GoodsList>
    </Scroll>
    <DetailBottomBar @ClickToCart="ClickToCart"></DetailBottomBar>
    <BackTop v-show="showBackTop" @click.native="backTop"></BackTop>
  </div>
</template>

<script>
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {itemListenerMixin} from 'common/mixin.js'
import {mapActions} from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  mixins:[itemListenerMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      showBackTop:false,
      // isShow:false,
      // messages:''
    }
  },
  methods:{
    // 映射actions
    ...mapActions(['addCart']),
    // 加入购物车
    ClickToCart(){
      // console.log('加入购物车');
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice; 
      product.iid = this.iid
      // 提交事件
      // this.$store.commit('addCart',product)
      // actions方式
      // actions可以返回一个promise函数
 
      // 第一种方法
      this.$store.dispatch('addCart',product).then(res=>{
        // console.log(res);
        this.$toast.methods.show(res,2000)
        // console.log(this.$toast);
      })
      //  this.$store.dispatch('addCart',product)
      //       // 第二种方法
      //  this.addCart(product).then(res=>{
      //   console.log(res);
      // })
      
    },
    backTop(){
      // this.$refs.scroll.scroll.scrollTo(0,0)
      this.$refs.scroll.scrollTo(0,0)
    },
    imageLoad(){
      // console.log('图片加载');
      this.$refs.scroll.refresh();
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    // 监听滚动
    contentScroll(position){
      // 多个地方用到，在mixin中写
      // 判断backTop是否显示
      this.showBackTop = position.y < -1000 ? true : false


      const positionY = -position.y
      // console.log(positionY);
      const themeTopYslg = this.themeTopYs.length
      // [0, 783, 1711, 2040]
      // 0~783 :0 | 783~ 1711 :1 1711 ~2040 :2 >2040 :3
      for (const i in this.themeTopYs) {
       if(this.currentIndex !== i && ( (i <= themeTopYslg-2 && (positionY >= this.themeTopYs[parseInt(i)] && positionY <= this.themeTopYs[parseInt(i)+1]))||(i==themeTopYslg-1 && positionY >= this.themeTopYs[parseInt(i)]))){
        //  console.log(i);
        this.currentIndex = i
        this.$refs.nav.currentIndex = this.currentIndex;
        // console.log(this.currentIndex);
       }
      }
      // 使用这个要push一个无限值 Number.MAX_VALUE 所以就不用判断那么繁琐
      // for (let i = 0; i < themeTopYslg - 1; i++) {
      //   if((this.currentIndex != i) && (this.currentIndex > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
      //       this.currentIndex = i
      //       this.$refs.nav.currentIndex = this.currentIndex;
      //       console.log(this.currentIndex);
      //   }       
      // }
    }
  },
  created(){
    // 保存发送请求的iid
    // console.log(this.$route);
    this.iid = this.$route.params.id
    // 请求详情数据
    getDetail(this.iid)
    .then(res=>{
      // console.log(res);
      const data = res.result
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 保存详情展示图片
      this.detailInfo = data.detailInfo
      // 保存参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 保存评论信息
      if(data.rate.cRate){
        this.commentInfo = data.rate.list[0]
      }

      // created是不会进行dom渲染的，如果想拿到数据或者实时更新这个数据的话使用nextTick()
      this.$nextTick(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      })

    })
    // 请求推荐数据
    getRecommend().
    then(res=>{
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted(){
    // console.log('detail大傻逼');
  },
   // 组件销毁时关闭监听图片加载
  //  这里不使用跟Home组件中的deactivated()，是因为Detail组件已经被keep-alive除外了，没有相应的生命周期函数
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  updated(){
  
  }

}
</script>
<style>
.detail-navbar{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.centent{
  height: calc(100% - 44px - 55px);
  
}

</style>