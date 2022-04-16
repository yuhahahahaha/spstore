import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import toast from 'components/common/toast/index'
// 解决移动端300s延迟
import FastClick from 'fastclick'
// 使用懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// Vue实例可以作为事件总线
Vue.prototype.$bus = new Vue()

// 安装taost插件
Vue.use(toast)//调用.use默认会找到toast中的install方法并执行
/* eslint-disable no-new */
FastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/nofind.jpg')
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
