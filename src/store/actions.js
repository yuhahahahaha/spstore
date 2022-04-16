export default {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        let oldCartItem = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldCartItem){
            context.commit('addCounter',oldCartItem)
            resolve('商品数量加1！')
        }else{
            payload.count = 1
            context.commit('addToCartList',payload)
            resolve('商品添加成功！')
        }
      })
    }
}