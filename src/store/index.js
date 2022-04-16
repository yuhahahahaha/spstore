import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    // mutations每个方法尽可能完成的事件比较单一，复杂的多样的事件或异步操作要在actions中执行
    mutations
        // addCart(state,payload){
        //     // find()返回的数据是浅拷贝数据，也就是该内存指向依然是存在时所指向的内存地址
        //     let oldCartItem = state.cartList.find(item => item.iid === payload.iid)
        //     // console.log(oldCartItem);
        //     if(oldCartItem){
        //         oldCartItem.count += 1
        //     }else{
        //         payload.count = 1
        //         state.cartList.push(payload)
        //     }
        // }
       
    ,
    // 
    actions,
    getters
})
export default store