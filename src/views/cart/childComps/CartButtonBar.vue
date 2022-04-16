<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton :isActive="Active"  @click.native="allCheck"></CheckButton>
      <span>全选</span>
    </div>
    <div class="total">
      合计:<span>{{allCount}}</span>
      <button @click="toBuy">结算({{checkLength}})</button>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
    components:{
        CheckButton
    },
    data(){
        return {
        }
    },
    methods:{
        allCheck(){        
            // console.log('全选');
            // 第一种
            // if(!this.$store.getters.cartList.find(item=>!item.checked)){
            //     for (const item of this.$store.getters.cartList) {
            //         item.checked = false
            //     }
            // }else{
            //     for (const item of this.$store.getters.cartList) {
            //         item.checked = true
            //     }
            // }
            // 第二种
            if(this.Active){//全部选中
                this.cartList.forEach(item => {
                    item.checked = false
                });
            }else{//有一个或多个不选中
                 this.cartList.forEach(item => {
                    item.checked = true
                });
            }
        },
        toBuy(){
          if(this.checkLength == 0){
            this.$toast.methods.show('您没选中商品哦',2000)
          }
          
        }
    },
  
    computed:{
        ...mapGetters(['cartList']),
        // 价格总数
        allCount(){
            return '￥' + this.cartList
                .filter(item => {return item.checked == true})
                .reduce((preValue,item)=>{
                    return preValue + item.price * item.count
                },0).toFixed(2)
        },
        // 总计选中个数
        checkLength(){
            return this.cartList.filter(item=>{
                return item.checked == true
            }).length
        },
        // 全选是否选中
        Active(){
            // 在计算属性中，checkLength也是计算属性，那么用this.checkLength也能那么该计算属性的结果
            // if(this.cartList.length == 0) return false
            // if(this.checkLength == this.$store.state.cartList.length){
            //     return true
            // }else{
            //     return false
            // }
            // 性能考虑
            if(this.cartList.length == 0) return false
            return !this.cartList.find(item => !item.checked)
        }
    },

}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: white;
    align-items: center;
    border-top: 1px solid #cccccc;
    padding: 0px 10px;

  }
  .check-content {
    display: flex;
    flex: 1;
    height: 18px;

  }
  .check-button {
    border: 1px solid #aaaaaa;
    margin-right: 10px;
  }
  .active-button{
    border-color: red;
    background-color: red;
   }
  .total span{
    color: var(--color-tint);
    margin-right: 8px;
  }
  .total button{
    border-radius: 24px;
    padding: 6px 18px;
    background-color: var(--color-tint);
    border: 1px solid var(--color-tint);
    line-height: 1;
    color: white;
  }
</style>