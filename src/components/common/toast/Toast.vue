<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name:'Toast',
    data(){
        return{
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message="默认标题",duration=2000){
            // console.log('------');
            console.log(message,duration);
            this.isShow = true;
            this.message = message;
            setTimeout(() => {
                this.isShow = false
                this.message = '';
            }, duration);
            }
        
    }
}
</script>

<style>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 20px 15px;
    color: #fff;
    font-size: 20px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
}
</style>