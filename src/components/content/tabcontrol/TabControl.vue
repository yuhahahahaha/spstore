<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" 
      class="title" 
      :class="{active:index == currentIndex}"
      @click="btnClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:"TabControl",
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
    btnClick(index){
        this.currentIndex = index,
        this.$emit('tabClick',index)
    }
    },
    props:{
        titles:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    height: 44px;
    background-color: white;
    z-index: 1;
}
.title{
    flex: 1;
    text-align: center;
    height: 44px;
    line-height: 44px;
}
.tab-control span{
    padding-bottom: 7px;
}
.active span{
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
}
</style>