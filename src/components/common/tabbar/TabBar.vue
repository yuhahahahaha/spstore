<template>
    <div>
        <MainTabbar></MainTabbar>
    </div>
</template>

<script>
// import TabBarItem from './TabBarItem.vue'
import MainTabbar from 'components/content/MainTabbar/maintabbar.vue' 
export default {
    name:"TabBar",
    components:{
        // TabBarItem
        MainTabbar
    }
}
</script>

<style>
    .tabbar{
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        height: 55px;
        width: 100%;
        box-shadow: 0px -2px rgba(137, 137, 143, .2);
        background: #f1f2f6;
        /* background: red; */
    }
</style>