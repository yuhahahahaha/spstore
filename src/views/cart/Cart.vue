<template>
  <div id="cart">
      <NavBar class="cart-navbar"><div slot="center">购物车({{cartLength}})</div></NavBar>
    <Scroll ref="scroll">
      <CartList :cartList="cartList" @imgLoad="imgLoad"></CartList>
    </Scroll> 
    <CartButtonBar></CartButtonBar>  
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartList from './childComps/CartList.vue'
import CartButtonBar from './childComps/CartButtonBar.vue'
import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    components:{
      NavBar,
      Scroll,
      CartList,
      CartButtonBar
    },
    computed:{
      // mapGetters两种写法 能遍历vuex中getters中的属性当computed的属性使用
      // 第一种
      ...mapGetters(['cartLength','cartList'])
      // 第二种 起别名
      // ...mapGetters({
      //   length:'cartLength'
      // })
    },
    methods:{
      imgLoad(){
        // console.log('图片被加载了');
        this.$refs.scroll.refresh
      }
    }
}
</script>

<style>
#cart{
  height: 100vh;
  padding-top: 44px;
}
.wrapper{
  height: calc(100% - 55px - 40px);
  overflow: hidden;
}
.cart-navbar{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  background-color: var(--color-tint);
  font-size: 20px;
  color: #fff;
  font-weight: 800;
}
</style>