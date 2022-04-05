<template>
        <div class="tabbar_item" @click="itemClick">
           <div v-if="!isActive"> <slot name="item_img"></slot></div>
            <div v-else><slot name="item_img_active"></slot></div>
            <div :style="activeStyle"><slot name="item_name"></slot></div>
        </div>
</template>

<script>
export default {
    name:"TabBarItem",
    data(){
        return{
            // isActive:false
        }
    },
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'#dc4531'
        }
    },
    computed:{
        isActive:{
            get(){
                return this.$route.path.indexOf(this.path) != -1
            },
            set(v){
                return this.stepMap = v
            }   
        },
        activeStyle(){
            return this.isActive ? {color : this.activeColor} : {}
        }
        // isActive(){
        //     return this.$route.path.indexOf(this.path) != -1
        // },
        // activeStyle(){
        //     return this.isActive ? {color : this.activeColor} : {}
        // }
    },
    methods:{
        itemClick(){
            // console.log(this.path);
            this.isActive = !this.isActive
            this.$router.push(this.path).catch((err)=>err)

        }
    }
}
</script>

<style>
    .tabbar_item{
        flex: 1;
        text-align: center;
    }
    .item_img,.item_img_active{
        margin-top: 3px;
        height: 25px;
        width: 25px;
    }
    .active{
        color: #dc4531;
    }
</style>