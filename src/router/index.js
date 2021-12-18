import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Test1 from "../views/Test1";
import Test2 from "../views/Test2";
// 安装路由
Vue.use(VueRouter);

// 配置路由/定义路由

const routes = [
  // 登录页面
  {
    // 路径
    path: "/",
    name: "Login",
    // 需要跳转的组件
    component: Login,
    hidden: true,
  },
  // 注册页面
  {
    path: "/Register",
    name: "Register",
    component: Register,
    hidden: true,
  },
  // Home 主页面
  {
    path: "/Home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "test1",
        name: "Test1",
        component: Test1,
      },
      {
        path: "test2",
        name: "Test2",
        component: Test2,
      },
    ],
  },
];
// 创建实例
const router = new VueRouter({
  routes,
});
// 导出路由
export default router;
