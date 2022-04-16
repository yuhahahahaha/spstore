import {debounce} from './utils'
// import BackTop from 'components/content/backtop/BackTop.vue'
export const itemListenerMixin = {
    data(){
        return{
            itemImgListener:null
        }
    },
    mounted(){
        let newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = ()=>{
            newRefresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
        // this.$bus.$on('itemImgLoad',this.$refs.scroll.refresh)
        // console.log('我是混入中的内容');
    }
}
// export const backTopMixin = {
//     components:{
//         BackTop
//     },
//     data(){
//         return {
//             showBackTop:false
//         }
//     },
//     methods:{
//         backTop(){
//             // this.$refs.scroll.scroll.scrollTo(0,0)
//             this.$refs.scroll.scrollTo(0,0)
//           },
//         contentScroll(position){
//             // 判断backTop是否显示
//             this.showBackTop = position.y < -1000 ? true : false
//         }
//     }
// }