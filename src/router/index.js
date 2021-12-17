import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
// 安装路由
Vue.use(VueRouter)

// 配置路由/定义路由
const routes = [
  {
    // 路径
    path: '/',
    name: 'Login',
    // 需要跳转的组件
    component: Login
  },
]
// 创建实例
const router = new VueRouter({
  routes
})
// 导出路由
export default router
