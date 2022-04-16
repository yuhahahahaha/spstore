<template>
  <div>
      <NavBar>
          <div slot="left" class="back-img" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
          <div slot="center" class="title">
              <div class="item-title" v-for="(item,index) in title" 
              @click="titleClick(index)"
              :class="{active:index == currentIndex}"
              >{{item}}</div>
          </div>
      </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return {
            title:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex = index,
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }

}
</script>

<style scoped>
 
    .active{
        color: var(--color-high-text);
    }
    .title{
        display: flex;
        font-size: 18px;
    }
    .item-title{
        flex: 1;
        text-align: center;
    }
    .back-img{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .back-img img{
        width: 22px;
        height: 22px;
        margin-top: 10px;
    }
</style>