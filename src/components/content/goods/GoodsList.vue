<template>
    <div class="goods">
        <GoodsListItem v-for="(item,index) in goodslist" :gooditems="item" :key="index"></GoodsListItem>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    components:{
        GoodsListItem
    },
    props:{
        goodslist:{
            type:Array,
             default(){
                return []
            }
        }
    }

}
</script>

<style>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>