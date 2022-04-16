<template>
  <div class="check-button" :class="{check:isActive}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    props:{
        isActive:{
            type:Boolean,
            default(){
               return true 
            }
        }
    }
}
</script>

<style scoped>
   .check-button{
       border: 2px solid #aaa;
       border-radius: 50%;
   } 
   .check{
       border-color: red;
       background-color: red;
   }
</style>