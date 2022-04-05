<template>
 <div class="tabbar">
    <TabBarItem path="/home">
        <img class="item_img"  slot="item_img" src="~assets/img/shouye.svg" alt="">
        <img class="item_img_active"  slot="item_img_active" src="~assets/img/shouye_a.svg" alt="">
        <div class="item_name" slot="item_name">首页</div>
    </TabBarItem>
    <TabBarItem path="/category">
        <img class="item_img"  slot="item_img" src="~assets/img/fenlei.svg" alt="">
        <img class="item_img_active"  slot="item_img_active" src="~assets/img/fenlei_a.svg" alt="">
        <div class="item_name" slot="item_name">分类</div>
    </TabBarItem>
    <TabBarItem path="/cart">
        <img class="item_img"  slot="item_img" src="~assets/img/shopping.svg" alt="">
        <img class="item_img_active"  slot="item_img_active" src="~assets/img/shopping_a.svg" alt="">
        <div class="item_name" slot="item_name">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile">
        <img class="item_img"  slot="item_img" src="~assets/img/profile.svg" alt="">
        <img class="item_img_active"  slot="item_img_active" src="~assets/img/profile_a.svg" alt="">
        <div class="item_name" slot="item_name">我的</div>
    </TabBarItem>
  </div>
</template>

<script>
// import TabBar from 'components/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
    name:"maintabbar",
      components:{
        TabBarItem
    }
}
</script>

<style>

</style>