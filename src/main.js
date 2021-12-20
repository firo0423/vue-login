// 整个程序的目录
// 通过import来导入组件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';

// 响应拦截器 也就写着玩玩 没后端
// import {postRequest} from "./utils/api";

Vue.prototype.HOST = "http://localhost:4000"
Vue.prototype.$axios = Axios
// 响应拦截器 也就写着玩玩 没后端 this.postRequest就可以用了
// Vue.prototype.postRequest=postRequest;


Vue.use(ElementUI);
// 把生产提示信息去掉
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 箭头函数 render指的是要渲染 渲染app组件里的内容
  render: h => h(App)
}).$mount('#app')
// 与el相同 这就是手动挂载
