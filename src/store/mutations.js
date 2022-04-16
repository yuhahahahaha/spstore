export default {
    addCounter(state,payload){
        payload.count++
    },
    addToCartList(state,payload){
        // 记录默认复选框选中状态
        payload.checked = true
        state.cartList.push(payload)
    }
}