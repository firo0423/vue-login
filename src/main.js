// 整个程序的目录
// 通过import来导入组件
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import Axios from "axios";
import "element-ui/lib/theme-chalk/index.css";

// 响应拦截器
import { postRequest } from "./utils/api";
import { getRequest } from "./utils/api";

Vue.prototype.HOST = "http://localhost:4000";
Vue.prototype.$axios = Axios;
// 响应拦截器
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;

Vue.use(ElementUI);
// 把生产提示信息去掉
Vue.config.productionTip = false;

//路由导航守卫
// 前置钩子(guard)
router.beforeEach((to, from, next) => {
  // 设置白名单
  const whiteList = ["/", "/Register"]
  // console.log(whiteList.indexOf(to.path));
  if (whiteList.indexOf(to.path) == -1){
    if(!localStorage.getItem("tokenStr")) {
      Vue.prototype.$message({
        showClose: true,
        message: "需要登录，请登录",
        type: "error",
      });
      next({ name: "Login" });
      return
    } else next()
  }else next()
});

new Vue({
  router,
  store,
  // 箭头函数 render指的是要渲染 渲染app组件里的内容
  render: (h) => h(App),
}).$mount("#app");
// 与el相同 这就是手动挂载
